import { Container, Stack } from "@mui/material";
import InstructorCard from "./InstructorCard";
import SkeletonInstructorCard from "./SkeletonInstructorCard";
import ErrorWarning from "../Messages/ErrorWarning";

interface InstructorsProps {
	isLoading: boolean;
	isError: boolean;
	instructors: Instructor[];
}

const Instructors = (props: InstructorsProps) => {
	const { instructors, isLoading, isError } = props;
	return (
		<Container maxWidth="lg">
			<Stack direction="column" gap={2} alignItems="center">
				{isError ? (
					<ErrorWarning />
				) : isLoading ? (
					Array(instructors?.length || 1)
						.fill(null)
						.map((_, index) => (
							<SkeletonInstructorCard key={index} />
						))
				) : (
					instructors?.map((instructor, index) => (
						<InstructorCard key={index} {...instructor} />
					))
				)}
			</Stack>
		</Container>
	);
};

export default Instructors;
