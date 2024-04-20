import { Stack, Button, Typography, Skeleton, SxProps } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import api from "../../api";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import StyledNavLink from "../UI/Links/StyledNavLink";
interface CourseEnrollmentPromptProps
	extends Pick<Course, "id" | "price" | "paid"> {
	isLoading: boolean;
	sx?: SxProps;
}

const CourseEnrollmentPrompt = (props: CourseEnrollmentPromptProps) => {
	const { id, isLoading, paid, price, sx } = props;
	const authContext = useContext(AuthContext);
	return (
		<Stack
			direction={window.innerWidth > 600 ? "row" : "column"}
			width="100%"
			alignItems="center"
			justifyContent="space-between"
			spacing={2}
			sx={{
				...sx,
				py: 2,
				borderBottom:
					window.innerWidth > 600 ? "1px solid #dddddd" : "none",
			}}
		>
			{isLoading ? (
				<Skeleton
					animation="wave"
					variant="text"
					width="15%"
					height={48}
				/>
			) : (
				<Typography
					variant="h4"
					sx={{
						textAlign: window.innerWidth > 600 ? "left" : "center",
						// fontWeight: "bold",
						// color: "#9c27b0",
					}}
				>
					{!paid || price === 0 ? "Free!" : "$" + price}
				</Typography>
			)}
			{authContext.user?.coursesEnrolled.includes(id) ? (
				<Button
					variant="contained"
					size="large"
					disableElevation
					component={StyledNavLink}
					to={`/dashboard/learn/courses/${id}`}
					sx={{
						// mb: 3,
						width: window.innerWidth > 600 ? "45%" : "100%",
						height: 50,
						fontSize: "1rem",
						backgroundColor: "secondary.main",
						// backgroundColor: "#9c27b0",

						color: "black",
						// border: "1px solid #00f3b6",
						"&:hover": {
							backgroundColor: "primary.main",
							color: "white",
							// backgroundColor: "transparent",
							// color: "#9c27b0",
							// border: "1px solid #9c27b0",
						},
					}}
					endIcon={<ArrowForward />}
				>
					Go to course
				</Button>
			) : (
				<Button
					variant="contained"
					size="large"
					component={StyledNavLink}
					to={`/courses/${id}/enroll`}
					disableElevation
					// onClick={() => {
					// 	if (authContext.user) {
					// 		api.patch(`/users/updateMe`, {
					// 			coursesEnrolled: [
					// 				...authContext.user.coursesEnrolled,
					// 				id,
					// 			],
					// 		});
					// 		// Add React Query mutation here

					// 		authContext.user.coursesEnrolled = [
					// 			...authContext.user.coursesEnrolled,
					// 			id,
					// 		];

					// 		localStorage.setItem(
					// 			"user",
					// 			JSON.stringify(authContext.user)
					// 		);

					// 		alert(
					// 			"You have successfully enrolled in this course!"
					// 		);
					// 	}
					// }}
					sx={{
						// mb: 3,
						width: window.innerWidth > 600 ? "45%" : "100%",
						height: 50,
						fontSize: "1rem",
						backgroundColor: "secondary.main",
						// backgroundColor: "#9c27b0",

						color: "black",
						// border: "1px solid #00f3b6",
						"&:hover": {
							backgroundColor: "primary.main",
							color: "white",
							// backgroundColor: "transparent",
							// color: "#9c27b0",
							// border: "1px solid #9c27b0",
						},
					}}
					endIcon={<ArrowForward />}
				>
					Enroll now
				</Button>
			)}
		</Stack>
	);
};

export default CourseEnrollmentPrompt;
