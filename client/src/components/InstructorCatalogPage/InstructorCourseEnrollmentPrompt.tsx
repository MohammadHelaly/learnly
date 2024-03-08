import { Stack, Button, Typography, Skeleton, SxProps } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

interface CourseEnrollmentPromptProps
	extends Pick<Course, "id" | "price" | "paid"> {
	isLoading: boolean;
	sx?: SxProps;
}

const InstructorCourseEnrollmentPrompt = (
	props: CourseEnrollmentPromptProps
) => {
	const { id, isLoading, paid, price, sx } = props;

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
		></Stack>
	);
};

export default InstructorCourseEnrollmentPrompt;
