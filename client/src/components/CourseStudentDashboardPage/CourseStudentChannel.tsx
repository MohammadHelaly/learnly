import React from "react";
import { Button, Stack } from "@mui/material";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";

function CourseStudentChannel() {
	return (
		<SectionWrapper>
			<Stack spacing={12}>
				<SectionWrapper>
					<SectionHeader
						heading="Join Channel"
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
						heading="Join a channel to interact with your instructor and peers."
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
						sx={{ mb: 2 }}
					>
						Join Channel
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
						heading="Join a live stream to interact with your instructor and peers."
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
					>
						Join Live Stream
					</Button>
				</SectionWrapper>
			</Stack>
		</SectionWrapper>
	);
}

export default CourseStudentChannel;
