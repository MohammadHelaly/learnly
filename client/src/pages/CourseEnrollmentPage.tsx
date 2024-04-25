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
import { Button, Container, Typography } from "@mui/material";
import Popup from "../components/Popup/Popup";
import { useNavigate } from "react-router-dom";
import CourseImage from "../components/UI/Courses/Catalog/CourseImage";

function CourseEnrollmentPage() {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const authContext = useContext(AuthContext);
	const popupFunction = () => {
		navigate("/dashboard");
	};

	const { data, isLoading, isError } = useQuery({
		queryKey: ["courses", { courseId }],
		queryFn: async () => await api.get(`/courses/${courseId}`),
		select: (response) => response.data.data.data,
	});
	const course = data;
	console.log(course);

	const {
		mutate: mutateUser,
		isError: isMutateSectionError,
		isPending: isPendingUser,
		isSuccess,
	} = useMutation({
		mutationFn: (data: any) => {
			return api.post(`/courseEnrollments/${courseId}`, {
				user: data,
			});
		},
		onSuccess: (response) => {
			if (authContext.user && courseId) {
				authContext.user.coursesEnrolled = [
					...authContext.user.coursesEnrolled,
					courseId,
				];
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
					<Container sx={{ pt: 1, pd: 1 }}>
						<CourseImage
							imageCover={course?.imageCover}
							name={course?.name}
							isLoading={isLoading}
						/>
						<Typography>{course?.name}</Typography>
					</Container>
					<Button
						variant="contained"
						color="primary"
						size="large"
						disableElevation
						disabled={isPendingUser}
						sx={{ width: "100%", mt: 2 }}
						onClick={() => {
							if (authContext.user) {
								mutateUser(authContext.user.id);
							}
						}}
					>
						Enroll in Course
					</Button>
				</FormContainer>
			</PageWrapper>

			<Footer />
			<Popup
				content="Course enrolled successfully!"
				openPopup={isSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
		</AnimatedPage>
	);
}

export default CourseEnrollmentPage;
