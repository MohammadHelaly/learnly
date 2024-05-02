import React from "react";
import { Button, Stack } from "@mui/material";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import FormContainer from "../UI/PageLayout/FormContainer";

function CourseStudentChannel() {
	return (
		<FormContainer
			sx={{
				mx: "auto",
				px: window.innerWidth < 600 ? 0 : 2,
			}}>
			<SectionWrapper>
				<SectionHeader
					heading="Go to Channel"
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
					heading="Go to this course's channel to interact with your instructor and peers."
					keepHeadingAlignmentOnSmallScreens
					headingAlignment="left"
					headingAnimated={false}
					sx={{
						mb: 2,
					}}
				/>
				<Button
					variant="contained"
					fullWidth
					disableElevation
					size="large"
					sx={{ mb: 2 }}>
					Go to Channel
				</Button>
			</SectionWrapper>
			<SectionWrapper>
				<SectionHeader
					heading="Join Live Stream"
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
					heading="Join the instructors' live stream and ask questions in real-time."
					keepHeadingAlignmentOnSmallScreens
					headingAlignment="left"
					headingAnimated={false}
					sx={{
						mb: 2,
					}}
				/>
				<Button
					variant="contained"
					fullWidth
					disableElevation
					size="large">
					Join Live Stream
				</Button>
			</SectionWrapper>
		</FormContainer>
	);
}

export default CourseStudentChannel;
