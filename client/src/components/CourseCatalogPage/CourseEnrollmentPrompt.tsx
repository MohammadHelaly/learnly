import { Stack, Button, Typography, Skeleton, SxProps } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import api from "../../api";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import StyledNavLink from "../UI/Links/StyledNavLink";
import { useQuery } from "@tanstack/react-query";
interface CourseEnrollmentPromptProps
	extends Pick<Course, "id" | "price" | "paid"> {
	isLoading: boolean;
	sx?: SxProps;
}

const CourseEnrollmentPrompt = (props: CourseEnrollmentPromptProps) => {
	const { id, isLoading, paid, price, sx } = props;
	const authContext = useContext(AuthContext);

	const {
		data, //: courses,
		isLoading: isLoadingCourses,
		isError,
	} = useQuery({
		queryKey: ["courseEnrollments", { user: authContext.user?.id }],
		queryFn: async () =>
			await api.get("/enrollments", {
				params: {
					user: authContext.user?.id ?? null,
				},
			}),
		select: (response) => response.data,
	});

	const courses_ids =
		data?.data?.data.map((course: any) => course.course._id) ?? [];

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
			}}>
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
					}}>
					{!paid || price === 0 ? "Free!" : "$" + price}
				</Typography>
			)}
			{courses_ids.includes(id) ? (
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
					endIcon={<ArrowForward />}>
					Go to course
				</Button>
			) : (
				<Button
					variant="contained"
					size="large"
					component={StyledNavLink}
					to={`/courses/${id}/enroll`}
					disableElevation
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
					endIcon={<ArrowForward />}>
					Enroll now
				</Button>
			)}
		</Stack>
	);
};

export default CourseEnrollmentPrompt;
