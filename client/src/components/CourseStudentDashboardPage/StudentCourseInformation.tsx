import { Container, Stack } from "@mui/material";
import ErrorWarning from "../UI/Messages/ErrorWarning";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";

import CourseImage from "../UI/Courses/Catalog/CourseImage";
import CourseInformationContent from "../UI/Courses/CourseInformationContent";

interface CourseInformationProps
	extends Pick<
		Course,
		| "id"
		| "name"
		| "summary"
		| "duration"
		| "difficulty"
		| "ratingsAverage"
		| "ratingsQuantity"
		| "instructors"
		| "imageCover"
		| "paid"
		| "price"
	> {
	isLoading: boolean;
	isError: boolean;
}

const StudentCourseInformation = (props: CourseInformationProps) => {
	const {
		id,
		name,
		summary,
		duration,
		difficulty,
		ratingsAverage,
		ratingsQuantity,
		instructors,
		imageCover,
		paid,
		price,
		isLoading,
		isError,
	} = props;

	return (
		<SectionWrapper
			sx={{
				backgroundColor: "#f5f5f5",
				mt: window.innerWidth > 600 ? 8 : 7,
			}}>
			<Container maxWidth="lg">
				<Stack
					direction={
						window.innerWidth > 600 ? "row" : "column-reverse"
					}
					gap={window.innerWidth > 600 ? 4 : 0}
					alignItems="center"
					justifyContent="center"
					sx={{
						pb: 10,
						pt: window.innerWidth > 600 ? 10 : 0,
					}}>
					{isError ? (
						<ErrorWarning />
					) : (
						<>
							<Container
								maxWidth="sm"
								sx={{
									px: "0px !important",
									justifyContent:
										window.innerWidth > 600
											? "left"
											: "center",
									flexDirection: "column",
									display: "flex",
									gap: 2,
								}}>
								<CourseInformationContent
									name={name}
									summary={summary}
									duration={duration}
									difficulty={difficulty}
									ratingsAverage={ratingsAverage}
									ratingsQuantity={ratingsQuantity}
									instructors={instructors}
									isLoading={isLoading}
								/>
							</Container>
							<Container
								maxWidth="sm"
								sx={{
									px: "0px !important",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									pb: window.innerWidth > 600 ? 0 : 4,
								}}>
								<CourseImage
									imageCover={imageCover}
									name={name}
									isLoading={isLoading}
								/>
							</Container>
						</>
					)}
				</Stack>
			</Container>
		</SectionWrapper>
	);
};

export default StudentCourseInformation;
