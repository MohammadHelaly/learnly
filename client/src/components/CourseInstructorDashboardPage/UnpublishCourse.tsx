import React from "react";
import { Button, Stack } from "@mui/material";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import FormContainer from "../UI/PageLayout/FormContainer";

import UnpublishCourseForm from "./UnpublishCourseForm";
interface UnpublishCourseProps {
	courseName: string;
}

function UnpublishCourse(props: UnpublishCourseProps) {
	const { courseName } = props;
	return (
		<SectionWrapper>
			<FormContainer
				// large
				sx={{ mx: "auto", px: window.innerWidth < 600 ? 0 : 2 }}
			>
				<SectionWrapper>
					<SectionHeader
						heading="Unpublish Course"
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
						heading="Remove your course from the catalog."
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
					<UnpublishCourseForm courseName={courseName} />
				</SectionWrapper>
			</FormContainer>
		</SectionWrapper>
	);
}

export default UnpublishCourse;
