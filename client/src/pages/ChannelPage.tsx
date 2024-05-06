import { useParams } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import NavigationGuard from "../components/Navigation/NavigationGuard";
import Channel from "../components/ChannelPage/Channel";
import ChannelNavigationGuard from "../components/Navigation/ChannelNavigationGuard";
import { useQuery } from "@tanstack/react-query";
import ErrorWarning from "../components/UI/Messages/ErrorWarning";
import ScrollToBottom from "./ScrollToBottom";
import api from "../api";
const ChannelPage = () => {
	const { channelId } = useParams();
	const {
		data: channel, //: course,
		isLoading: isChannelLoading,
		isError: isChannelError,
	} = useQuery({
		queryKey: ["channel", { channelId }],
		queryFn: async () => await api.get(`/channels/${channelId}`),
		select: (response) => response.data.data.data,
	});
	const courseId = channel?.course;

	return (
		<ChannelNavigationGuard courseId={courseId} channelId={channelId}>
			<NavigationGuard>
				<AnimatedPage>
					{isChannelLoading ? (
						"Loading..."
					) : isChannelError ? (
						<ErrorWarning />
					) : (
						<Channel
							courseId={courseId as string}
							channelId={channelId as string}
						/>
					)}
				</AnimatedPage>
				<ScrollToBottom />
			</NavigationGuard>
		</ChannelNavigationGuard>
	);
};

export default ChannelPage;
