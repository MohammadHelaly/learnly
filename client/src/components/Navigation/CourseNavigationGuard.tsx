import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

interface NavigationGuardProps {
	guardWhileSignedIn?: boolean;
	courseId: string | undefined;
	children: React.ReactNode;
	role: string;
}

const CourseNavigationGuard = (props: NavigationGuardProps) => {
	const { guardWhileSignedIn, courseId, children, role } = props;
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const {
		data: course, //: course,
		isLoading: course_isLoading,
		isError: course_isError,
		refetch: refetchCourse,
	} = useQuery({
		queryKey: ["courses", { courseId }],
		queryFn: async () => await api.get(`/courses/${courseId}`),
		select: (response) => response.data.data.data,
		enabled: false,
	});
	const {
		data: user_courses, //: course,
		isLoading: user_isLoading,
		isError: user_isError,
		refetch: refetchUserCourses,
	} = useQuery({
		queryKey: ["courseEnrollments", { user: authContext.user?.id }],
		queryFn: async () =>
			await api.get("/courseEnrollments", {
				params: {
					user: authContext.user?.id ?? null,
				},
			}),
		select: (response) =>
			response.data.data.data.map(
				(courseEnrollment: any) => courseEnrollment.course.id
			) ?? [],
		enabled: false,
	});

	useEffect(() => {
		if (course_isLoading || user_isLoading) return;
		if (authContext.isLoggedIn && guardWhileSignedIn) {
			navigate("/dashboard");
			return;
		} else if (role === "Student" && authContext.isLoggedIn) {
			const fetchUserCourses = async () => {
				await refetchUserCourses();
				if (user_courses === undefined) return;
				if (!user_courses.includes(courseId)) {
					navigate("/dashboard");
					return;
				}
			};
			fetchUserCourses();
		} else if (role === "Instructor" && authContext.isLoggedIn) {
			const fetchCourse = async () => {
				await refetchCourse();
				if (course === undefined) return;
				if (course?.instructors[0].id !== authContext.user?.id) {
					navigate("/dashboard");
					return;
				}
			};
			fetchCourse();
		}

		const timeout = setTimeout(() => {
			if (!authContext.isLoggedIn && !guardWhileSignedIn) {
				navigate("/log-in");
				return;
			}
		}, 1);

		return () => {
			clearTimeout(timeout);
		};
	}, [
		authContext.isLoggedIn,
		navigate,
		guardWhileSignedIn,
		courseId,
		course_isLoading,
		user_isLoading,
		user_courses,
		course,
		role,
	]);

	return <>{children}</>;
};

export default CourseNavigationGuard;
