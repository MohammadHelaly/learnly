import React from "react";
import { Button, Stack } from "@mui/material";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import FormContainer from "../UI/PageLayout/FormContainer";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { useParams } from "react-router-dom";
import StyledNavLink from "../UI/Links/StyledNavLink";
import CreateChannelForm from "./CreateChannelForm";
import DeleteChannelForm from "./DeleteChannelForm";

interface UpdateCourseChannelProps {
	courseName: string;
	liveStream: string;
}

function UpdateCourseChannel(props: UpdateCourseChannelProps) {
	const { courseId } = useParams();
	const { courseName, liveStream } = props;
	const {
		data, //: course,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["channels", { courseId }],
		queryFn: async () =>
			await api.get(`/channels`, {
				params: {
					course: courseId,
				},
			}),
		select: (response) => response.data.data.data,
	});

	//const channelId = data?.[0].id ?? "";

	return (
		<SectionWrapper>
			<FormContainer
				// large
				sx={{ mx: "auto", px: window.innerWidth < 600 ? 0 : 2 }}>
				<SectionWrapper>
					{data?.length !== 0 ? (
						<>
							{" "}
							<SectionHeader
								heading="Delete Channel"
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
								heading="Remove the course channel forever."
								keepHeadingAlignmentOnSmallScreens
								headingAlignment="left"
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<DeleteChannelForm channelId={data?.[0].id} />
						</>
					) : (
						<>
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
								heading="Create a channel for the course to interact with your students."
								keepHeadingAlignmentOnSmallScreens
								headingAlignment="left"
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<CreateChannelForm courseName={courseName} />
						</>
					)}
				</SectionWrapper>
				{data?.length !== 0 && (
					<SectionWrapper>
						<SectionHeader
							heading="Course Channel"
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
							heading="Go to channel to interact with your students."
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
							component={StyledNavLink}
							to={`/channels/${data?.[0].id}`}>
							Course Channel
						</Button>
					</SectionWrapper>
				)}

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
						size="large"
						component={StyledNavLink}
						to={`/livestream/${liveStream}`}>
						Start Live Stream
					</Button>
				</SectionWrapper>
			</FormContainer>
		</SectionWrapper>
	);
}

export default UpdateCourseChannel;
