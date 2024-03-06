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
		>
			<Button
				component="label"
				fullWidth
				variant="contained"
				disableElevation
				size="large"
				//disabled={isPending}
				sx={{
					mb: 2,
				}}
			>
				{/* {image?.preview
									? "Change Image"
									: "Upload Image"} */}
				upload Image
				<input
					//disabled={isPending}
					accept="image/*"
					style={{ display: "none" }}
					multiple={false}
					type="file"
					hidden
					// value={image.uploaded}
					// onChange={handleImageChange}
				/>
			</Button>
		</Stack>
	);
};

export default InstructorCourseEnrollmentPrompt;
