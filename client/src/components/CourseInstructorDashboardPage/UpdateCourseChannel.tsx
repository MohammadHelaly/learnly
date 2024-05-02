import React from "react";
import { Button, Stack } from "@mui/material";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import FormContainer from "../UI/PageLayout/FormContainer";

function UpdateCourseChannel() {
	return (
		<SectionWrapper>
			<FormContainer
				large
				sx={{ mx: "auto", px: window.innerWidth < 600 ? 0 : 2 }}>
				<SectionWrapper>
					<SectionHeader
						heading="Create Channel"
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
						heading="Create a channel to interact with your students."
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
						Create Channel
					</Button>
				</SectionWrapper>
				<SectionWrapper>
					<SectionHeader
						heading="Start Live Stream"
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
						heading="Start a live stream to interact with your students."
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
						Start Live Stream
					</Button>
				</SectionWrapper>
			</FormContainer>
		</SectionWrapper>
	);
}

export default UpdateCourseChannel;
