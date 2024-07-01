import { Stack, Typography, Skeleton } from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import ErrorWarning from "../UI/Messages/ErrorWarning";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import formatDuration from "../../utils/formatDuration";
interface CourseHighlightsProps extends Pick<Course, "duration"> {
	isLoading: boolean;
	isError: boolean;
}

const CourseHighlights = (props: CourseHighlightsProps) => {
	const { duration, isLoading, isError } = props;

	return (
		<SectionWrapper>
			<SectionHeader
				heading="This Course Includes"
				headingAlignment="left"
			/>
			{isError ? (
				<ErrorWarning />
			) : (
				<Stack spacing={2}>
					<Stack direction="row" spacing={1} alignItems="center">
						<OndemandVideoIcon
							sx={{ mr: 1, color: "text.secondary" }}
						/>
						{isLoading ? (
							<Skeleton
								variant="text"
								width={300}
								height={20}
								animation="wave"
							/>
						) : (
							<Typography variant="body1" color="text.secondary">
								{formatDuration(duration)}
								{" of on-demand video lectures"}
							</Typography>
						)}
					</Stack>
					<Stack direction="row" spacing={1} alignItems="center">
						<AppShortcutIcon
							sx={{ mr: 1, color: "text.secondary" }}
						/>
						<Typography variant="body1" color="text.secondary">
							Access on PC, TV and mobile
						</Typography>
					</Stack>
					<Stack direction="row" spacing={1} alignItems="center">
						<AllInclusiveIcon
							sx={{ mr: 1, color: "text.secondary" }}
						/>
						<Typography variant="body1" color="text.secondary">
							Full lifetime access
						</Typography>
					</Stack>
				</Stack>
			)}
		</SectionWrapper>
	);
};

export default CourseHighlights;
