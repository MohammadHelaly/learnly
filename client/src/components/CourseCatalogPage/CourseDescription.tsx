import { Typography, Skeleton } from "@mui/material";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import ErrorWarning from "../UI/Messages/ErrorWarning";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";

interface CourseDescriptionProps extends Pick<Course, "description"> {
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
							textAlign: "left",
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
