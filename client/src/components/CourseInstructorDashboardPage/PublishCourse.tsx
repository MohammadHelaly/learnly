import React from "react";
import { Button, Stack } from "@mui/material";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import FormContainer from "../UI/PageLayout/FormContainer";
import PublishVideoForm from "./PublishCourseForm";
import PublishCourseForm from "./PublishCourseForm";

interface PublishCourseProps {
	courseName: string;
}

function PublishCourse(props: PublishCourseProps) {
	const { courseName } = props;
	return (
		<SectionWrapper>
			<FormContainer
				// large
				sx={{ mx: "auto", px: window.innerWidth < 600 ? 0 : 2 }}
			>
				<SectionWrapper>
					<SectionHeader
						heading="Publish Course"
						headingAlignment="left"
						keepHeadingAlignmentOnSmallScreens
						headingAnimated={false}
						sx={{
							mb: 0,
						}}
					/>
					<SectionHeader
						isSubHeading
						variant="h6"
						heading="Make your course available to students."
						keepHeadingAlignmentOnSmallScreens
						headingAlignment="left"
						headingAnimated={false}
						sx={{
							mb: 2,
						}}
					/>
					{/* <Button
						variant="contained"
						fullWidth
						disableElevation
						size="large"
						color="error"
						sx={{ mb: 2 }}
					>
						Publish Course
					</Button> */}
					<PublishCourseForm courseName={courseName} />
				</SectionWrapper>
			</FormContainer>
		</SectionWrapper>
	);
}

export default PublishCourse;
