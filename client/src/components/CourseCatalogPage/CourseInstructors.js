import { Typography, Skeleton, Stack, Box } from "@mui/material";
import InstructorCard from "./InstructorCard";

const CourseInstructors = (props) => {
	const { course, loading } = props;

	return (
		<Box
			sx={{
				px: window.innerWidth > 600 ? 0 : 3,
			}}>
			<Typography
				variant="h4"
				sx={{
					textAlign: window.innerWidth > 600 ? "left" : "center",
					my: 5,
				}}>
				Who Will Teach You{" "}
			</Typography>
			<Stack direction="column" spacing={2} alignItems="center">
				{course.instructors?.map((instructor) => (
					<InstructorCard instructor={instructor} loading={loading} />
				))}
			</Stack>
		</Box>
	);
};

export default CourseInstructors;
