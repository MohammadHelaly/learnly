import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

interface NavigationGuardProps {
	courseId: string | undefined;
	children: React.ReactNode;
}

const PublishCourseNavigationGuard = (props: NavigationGuardProps) => {
	const { courseId, children } = props;
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const {
		data: course, //: course,
		isLoading: isCourseLoading,
		isError: isCourseError,
	} = useQuery({
		queryKey: ["courses", { courseId }],
		queryFn: async () => await api.get(`/courses/${courseId}`),
		select: (response) => response.data.data.data,
	});

	const {
		data: userCourses, //: course,
		isLoading: isUserLoading,
		isError: isUserError,
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
	});

	useEffect(() => {
		if (isCourseLoading || isUserLoading) return;

		const handleNavigation = () => {
			if (
				userCourses &&
				course &&
				course.published === false &&
				!userCourses?.includes(courseId)
			) {
				navigate("/dashboard");
				return;
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
	]);

	if (isCourseLoading || isUserLoading) return null;

	if (
		userCourses &&
		course &&
		course.published === false &&
		!userCourses?.includes(courseId)
	)
		return null;

	return <>{children}</>;
};

export default PublishCourseNavigationGuard;
