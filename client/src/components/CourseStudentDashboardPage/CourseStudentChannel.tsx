import React from "react";
import { useEffect } from "react";
import { Button, Stack } from "@mui/material";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import FormContainer from "../UI/PageLayout/FormContainer";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { useParams } from "react-router-dom";
import StyledNavLink from "../UI/Links/StyledNavLink";

interface CourseStudentChannelProps {
	liveStream: string;
}

function CourseStudentChannel(props: CourseStudentChannelProps) {
	const { courseId } = useParams();
	const { liveStream } = props;
	const {
		data, //: course,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["channel", { courseId }],
		queryFn: async () =>
			await api.get(`/channels`, {
				params: {
					course: courseId,
				},
			}),
		select: (response) => response.data.data.data,
	});
	// const channelId = data?.[0].id ?? "";

	return (
		<FormContainer
			sx={{
				mx: "auto",
				px: window.innerWidth < 600 ? 0 : 2,
			}}>
			{data?.length !== 0 ? (
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
						component={StyledNavLink}
						to={`/channels/${data?.[0].id}`}
						disableElevation
						size="large"
						sx={{ mb: 2 }}>
						Go to Channel
					</Button>
				</SectionWrapper>
			) : (
				<SectionWrapper>
					<SectionHeader
						heading="No Channel Found"
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
						heading="No channel found for this course."
						keepHeadingAlignmentOnSmallScreens
						headingAlignment="left"
						headingAnimated={false}
						sx={{
							mb: 2,
						}}
					/>
				</SectionWrapper>
			)}

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
					size="large"
					component={StyledNavLink}
					to={`/livestream/${liveStream}`}>
					Join Live Stream
				</Button>
			</SectionWrapper>
		</FormContainer>
	);
}

export default CourseStudentChannel;
