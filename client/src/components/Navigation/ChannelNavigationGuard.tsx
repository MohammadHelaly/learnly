import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

interface ChannelNavigationGuardProps {
	guardWhileEnrolled?: boolean;
	courseId: string | undefined;
	children: React.ReactNode;
	role: "student" | "instructor" | "admin";
}

const ChannelNavigationGuard = (props: ChannelNavigationGuardProps) => {
	const { courseId, children, role, guardWhileEnrolled } = props;
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const {
		data: channel, //: course,
		isLoading: isChannelLoading,
		isError: isChannelError,
		refetch: refetchChannel,
	} = useQuery({
		queryKey: ["channels", { courseId }],
		queryFn: async () =>
			await api.get(`/channels/`, {
				params: {
					course: courseId,
				},
			}),
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
		if (isChannelLoading || isUserLoading) return;

		const handleNavigation = () => {
			if (role === "student") {
				const fetchUserCourses = async () => {
					await refetchUserCourses();
					if (
						userCourses &&
						!userCourses?.includes(courseId) &&
						!guardWhileEnrolled
					) {
						console.log("userCourses", userCourses);
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
					await refetchChannel();
					if (
						channel &&
						!channel?.admins.some(
							(instructor: Instructor) =>
								instructor.id === authContext.user?.id
						) &&
						!guardWhileEnrolled
					) {
						navigate("/dashboard");
						return;
					}

					if (
						channel &&
						channel?.admins.some(
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
		isChannelLoading,
		isUserLoading,
		userCourses,
		channel,
		role,
		refetchChannel,
		refetchUserCourses,
	]);

	return <>{children}</>;
};

export default ChannelNavigationGuard;
