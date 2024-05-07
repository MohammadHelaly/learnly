import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container, Typography } from "@mui/material";
import CourseSelection from "../components/UI/Courses/Catalog/CourseSelection";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import ErrorWarning from "../components/UI/Messages/ErrorWarning";
import api from "../api";
import UserInformation from "../components/UserProfilePage/UserInformation";

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
							<CourseSelection
								heading={
									"Courses " +
									user?.name.split(" ")[0] +
									" Created"
								}
								headingAlignment="left"
								headingAnimated={false}
								variant="white"
								query={{
									url: "/courses",
									config: {
										params: {
											instructors: { in: [userId] },
											sort: "-ratingsQuantity",
										},
									},
								}}
							/>
						)}
						<CourseSelection
							heading={
								"Courses " +
								user?.name.split(" ")[0] +
								" Enrolled In"
							}
							headingAlignment="left"
							headingAnimated={false}
							variant="white"
							query={{
								key: "courseEnrollments",
								url: "/courseEnrollments",
								config: {
									params: {
										user: userId,
									},
								},
							}}
						/>
					</>
				)}
			</PageWrapper>
			<Footer />
		</AnimatedPage>
	);
};

export default UserProfilePage;
