import { Typography, Skeleton, Stack, Box, Container } from "@mui/material";
import InstructorCard from "../UI/InstructorCard";

interface CourseInstructorsProps {
	instructors: {
		id: number | string;
		name: string;
		photo?: string;
		ratingsAverage: number;
		ratingsQuantity: number;
		students: number;
		bio?: string;
	}[];
	loading: boolean;
}

const CourseInstructors = (props: CourseInstructorsProps) => {
	const { instructors, loading } = props;

	return (
		<>
			<Typography
				variant="h4"
				sx={{
					textAlign: window.innerWidth > 600 ? "left" : "center",
					my: 5,
				}}>
				Who Will Teach You{" "}
			</Typography>
			<Container maxWidth="lg">
				<Stack direction="column" gap={2} alignItems="center">
					{instructors?.map((instructor) => (
						<InstructorCard
							instructor={instructor}
							loading={loading}
						/>
					))}
				</Stack>
			</Container>
		</>
	);
};

export default CourseInstructors;
