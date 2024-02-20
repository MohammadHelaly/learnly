import { Stack, Button, Typography, Skeleton, SxProps } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

interface CourseEnrollmentPromptProps {
	courseId: string | number;
	isLoading: boolean;
	paid: boolean;
	price: number;
	sx?: SxProps;
}

const CourseEnrollmentPrompt = (props: CourseEnrollmentPromptProps) => {
	const { courseId, isLoading, paid, price, sx } = props;

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
			<Button
				variant="contained"
				size="large"
				disableElevation
				sx={{
					// mb: 3,
					width: window.innerWidth > 600 ? "45%" : "100%",
					height: 50,
					fontSize: "1rem",
					backgroundColor: "#00f3b6",
					// backgroundColor: "#9c27b0",

					color: "black",
					// border: "1px solid #00f3b6",
					"&:hover": {
						backgroundColor: "#9c27b0",
						color: "white",
						// backgroundColor: "transparent",
						// color: "#9c27b0",
						// border: "1px solid #9c27b0",
					},
				}}
				endIcon={<ArrowForward />}>
				Enroll now
			</Button>
		</Stack>
	);
};

export default CourseEnrollmentPrompt;
