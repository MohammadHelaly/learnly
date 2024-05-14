import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import ErrorWarning from "../components/UI/Messages/ErrorWarning";
import api from "../api";
import UserInformation from "../components/UserProfilePage/UserInformation";
import UserCoursesEnrolled from "../components/UserProfilePage/UserCoursesEnrolled";
import UserCoursesCreated from "../components/UserProfilePage/UserCoursesCreated";

const UserProfilePage = () => {
	const { userId } = useParams();

	const {
		data: user,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["users", { userId }],
		queryFn: async () => await api.get(`/users/${userId}`),
		select: (response) => response.data.data.data,
	});

	return (
		<AnimatedPage>
			<UserInformation
				{...user}
				isLoading={isLoading}
				isError={isError}
			/>
			<PageWrapper sx={{ mt: 0, pb: 0 }}>
				{isLoading ? null : isError ? (
					<ErrorWarning />
				) : (
					<>
						{user?.role === "instructor" && (
							<UserCoursesCreated
								userId={userId as string}
								userName={user?.name}
							/>
						)}
						<UserCoursesEnrolled
							userId={userId as string}
							userName={user?.name}
						/>
					</>
				)}
			</PageWrapper>
			<Footer />
		</AnimatedPage>
	);
};

export default UserProfilePage;
