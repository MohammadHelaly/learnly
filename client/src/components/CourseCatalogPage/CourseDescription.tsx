import { Typography, Skeleton } from "@mui/material";
import SectionHeader from "../UI/SectionHeader";
import ErrorWarning from "../UI/ErrorWarning";
import SectionWrapper from "../UI/SectionWrapper";

interface CourseDescriptionProps {
	description: string;
	isLoading: boolean;
	isError: boolean;
}

const CourseDescription = (props: CourseDescriptionProps) => {
	const { description, isLoading, isError } = props;

	return (
		<SectionWrapper>
			<SectionHeader
				heading="About This Course"
				headingAlignment="left"
				headingAnimated={false}
			/>
			{
				// isError ? (
				// 	<ErrorWarning />
				// ) :
				isLoading ? (
					<>
						<Skeleton variant="text" animation="wave" />
						<Skeleton variant="text" animation="wave" />
						<Skeleton variant="text" animation="wave" />
						<Skeleton variant="text" animation="wave" />
						<Skeleton variant="text" animation="wave" />
						<Skeleton variant="text" animation="wave" width="80%" />
					</>
				) : (
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{
							textAlign:
								window.innerWidth > 600 ? "left" : "center",
							my: 5,
						}}>
						{description}
					</Typography>
				)
			}
		</SectionWrapper>
	);
};

export default CourseDescription;
