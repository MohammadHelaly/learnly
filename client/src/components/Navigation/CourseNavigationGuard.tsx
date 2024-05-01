import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

interface NavigationGuardProps {
	guardWhileSignedIn?: boolean;
	isEnrolled?: boolean;
	courseId: string | undefined;
	children: React.ReactNode;
	role: "student" | "instructor" | "admin";
}

const CourseNavigationGuard = (props: NavigationGuardProps) => {
	const { guardWhileSignedIn, courseId, children, role } = props;
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const {
		data: course, //: course,
		isLoading: isCourseLoading,
		isError: isCourseError,
		refetch: refetchCourse,
	} = useQuery({
		queryKey: ["courses", { courseId }],
		queryFn: async () => await api.get(`/courses/${courseId}`),
		select: (response) => response.data.data.data,
		enabled: false,
	});

	const {
		data: userCourses, //: course,
		isLoading: isUserLoading,
		isError: isUserError,
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
		if (isCourseLoading || isUserLoading) return;

		if (role === "student") {
			const fetchUserCourses = async () => {
				await refetchUserCourses();
				if (userCourses === undefined) return;
				if (!userCourses.includes(courseId)) {
					// && !guardWhileEnrolled
					navigate("/dashboard");
					return;
				}
			};
			fetchUserCourses();
		} else if (role === "instructor") {
			const fetchCourse = async () => {
				await refetchCourse();
				if (course === undefined) return;

				if (
					!!!course?.instructors.some(
						(instructor: Instructor) =>
							instructor.id === authContext.user?.id
					)
				) {
					navigate("/dashboard");
					return;
				}
			};
			fetchCourse();
		}
	}, [
		authContext.isLoggedIn,
		navigate,
		guardWhileSignedIn,
		courseId,
		isCourseLoading,
		isUserLoading,
		userCourses,
		course,
		role,
		refetchCourse,
		refetchUserCourses,
	]);

	return <>{children}</>;
};

export default CourseNavigationGuard;
