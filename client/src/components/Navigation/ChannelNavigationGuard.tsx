import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";

interface NavigationGuardProps {
	guardWhileEnrolled?: boolean;
	courseId: string | undefined;
	children: React.ReactNode;
	channelId: string | undefined;
}

const ChannelNavigationGuard = (props: NavigationGuardProps) => {
	const { courseId, children, channelId } = props;
	console.log(courseId, channelId);
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const {
		data: channel, //: course,
		isLoading: isChannelLoading,
		isError: isChannelError,
	} = useQuery({
		queryKey: ["channel", { channelId }],
		queryFn: async () => await api.get(`/channels/${channelId}`),
		select: (response) => response.data.data.data,
	});

	const {
		data: userCourses, //: course,
		isLoading: isUserLoading,
		isError: isUserError,
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
	});

	useEffect(() => {
		if (isChannelLoading || isUserLoading) return;

		const handleNavigation = () => {
			if (
				!(
					(userCourses && userCourses?.includes(courseId)) ||
					(channel && channel?.admins.includes(authContext.user?.id))
				)
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
		isChannelLoading,
		isUserLoading,
		userCourses,
		channel,
	]);

	return <>{children}</>;
};

export default ChannelNavigationGuard;
