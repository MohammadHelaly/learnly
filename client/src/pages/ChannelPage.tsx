import { useParams } from "react-router-dom";
import AnimatedPage from "./AnimatedPage";
import NavigationGuard from "../components/Navigation/NavigationGuard";
import Channel from "../components/ChannelPage/Channel";

const ChannelPage = () => {
	const { courseId, channelId } = useParams();

	return (
		<NavigationGuard>
			<AnimatedPage>
				<Channel
					courseId={courseId as string}
					channelId={channelId as string}
				/>
			</AnimatedPage>
		</NavigationGuard>
	);
};

export default ChannelPage;
