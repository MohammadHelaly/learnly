import { Container, Stack } from "@mui/material";
import InstructorCard from "./InstructorCard";
import SkeletonInstructorCard from "./SkeletonInstructorCard";
import ErrorWarning from "../ErrorWarning";

interface InstructorsProps {
	isLoading: boolean;
	isError: boolean;
	instructors: {
		id: number | string;
		name: string;
		photo?: string;
		ratingsAverage: number;
		ratingsQuantity: number;
		students: number;
		bio?: string;
		courses: (number | string)[];
	}[];
}

const Instructors = (props: InstructorsProps) => {
	const { instructors, isLoading, isError } = props;
	return (
		<Container maxWidth="lg">
			<Stack direction="column" gap={2} alignItems="center">
				{
					// isError ? (
					// 	<ErrorWarning />
					// ) :
					isLoading
						? Array(instructors?.length || 1)
								.fill(null)
								.map((_, index) => (
									<SkeletonInstructorCard key={index} />
								))
						: instructors?.map((instructor, index) => (
								<InstructorCard key={index} {...instructor} />
						  ))
				}
			</Stack>
		</Container>
	);
};

export default Instructors;
