import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import AuthContext from "../store/auth-context";
import { useContext } from "react";
import PageWrapper from "../components/UI/PageLayout/PageWrapper";
import api from "../api";
import SectionHeader from "../components/UI/PageLayout/SectionHeader";
import FormContainer from "../components/UI/PageLayout/FormContainer";
import { Button, Typography } from "@mui/material";

function CourseEnrollmentPage() {
	const { courseId } = useParams();

	const queryClient = useQueryClient();
	const authContext = useContext(AuthContext);
	const {
		mutate: mutateUser,
		isError: isMutateSectionError,
		isPending: isPendingUser,
		isSuccess,
	} = useMutation({
		mutationFn: (data: any) => {
			return api.patch(`/users/updateMe`, {
				coursesEnrolled: [...data],
			});
		},
		onSuccess: (response) => {
			alert("Course enrolled successfully");
			if (authContext.user && courseId) {
				authContext.user.coursesEnrolled = [
					...authContext.user.coursesEnrolled,
					courseId,
				];

				localStorage.setItem("user", JSON.stringify(authContext.user));
			}
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	return (
		<AnimatedPage>
			<PageWrapper centered>
				<FormContainer>
					<Typography
						variant="h4"
						color="common.black"
						align="center"
					>
						Course Enrollment
					</Typography>
					<Button
						variant="contained"
						color="primary"
						size="large"
						disableElevation
						disabled={isPendingUser}
						sx={{ width: "100%", mt: 2 }}
						onClick={() => {
							if (authContext.user) {
								const data = [
									...authContext.user.coursesEnrolled,
									courseId,
								];
								mutateUser(data);
							}
						}}
					>
						Enroll in Course
					</Button>
				</FormContainer>
			</PageWrapper>

			<Footer />
		</AnimatedPage>
	);
}

export default CourseEnrollmentPage;
