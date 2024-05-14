import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

interface NavigationGuardProps {
	guardWhileEnrolled?: boolean;
	courseId: string | undefined;
	children: React.ReactNode;
	role: "student" | "instructor" | "admin";
}

const CourseNavigationGuard = (props: NavigationGuardProps) => {
	const { courseId, children, role, guardWhileEnrolled } = props;
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
			await api.get("/enrollments", {
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

		const handleNavigation = () => {
			if (role === "student") {
				const fetchUserCourses = async () => {
					await refetchUserCourses();
					if (
						userCourses &&
						!userCourses?.includes(courseId) &&
						!guardWhileEnrolled
					) {
						navigate("/dashboard");
						return;
					}

					if (
						userCourses &&
						userCourses?.includes(courseId) &&
						guardWhileEnrolled
					) {
						navigate("/dashboard");
						return;
					}
				};
				fetchUserCourses();
			} else if (role === "instructor") {
				const fetchCourse = async () => {
					await refetchCourse();
					if (
						course &&
						!course?.instructors.some(
							(instructor: Instructor) =>
								instructor.id === authContext.user?.id
						) &&
						!guardWhileEnrolled
					) {
						navigate("/dashboard");
						return;
					}

					if (
						course &&
						course?.instructors.some(
							(instructor: Instructor) =>
								instructor.id === authContext.user?.id
						) &&
						guardWhileEnrolled
					) {
						navigate("/dashboard");
						return;
					}
				};
				fetchCourse();
			}
		};

		handleNavigation();
	}, [
		authContext.isLoggedIn,
		navigate,
		courseId,
		isCourseLoading,
		isUserLoading,
		userCourses,
		course,
		role,
		refetchCourse,
		refetchUserCourses,
	]);

	if (isCourseLoading || isUserLoading) return null;

	if (isCourseError || isUserError) return null;

	if (
		role === "student" &&
		userCourses &&
		!userCourses?.includes(courseId) &&
		!guardWhileEnrolled
	)
		return null;

	if (
		role === "student" &&
		userCourses &&
		userCourses?.includes(courseId) &&
		guardWhileEnrolled
	)
		return null;

	if (
		role === "instructor" &&
		course &&
		!course?.instructors.some(
			(instructor: Instructor) => instructor.id === authContext.user?.id
		) &&
		!guardWhileEnrolled
	)
		return null;

	if (
		role === "student" &&
		guardWhileEnrolled &&
		userCourses?.includes(courseId)
	)
		return null;

	if (
		role === "instructor" &&
		guardWhileEnrolled &&
		course?.instructors.some(
			(instructor: Instructor) => instructor.id === authContext.user?.id
		)
	)
		return null;

	if (
		role === "instructor" &&
		course &&
		course?.instructors.some(
			(instructor: Instructor) => instructor.id === authContext.user?.id
		) &&
		guardWhileEnrolled
	)
		return null;

	return <>{children}</>;
};

export default CourseNavigationGuard;
