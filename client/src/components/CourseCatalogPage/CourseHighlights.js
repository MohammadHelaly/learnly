import { Card, Stack, Typography } from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

const CourseHighlights = (props) => {
	const { course, loading } = props;

	return (
		<Stack
			direction="column"
			spacing={1}
			alignItems={window.innerWidth > 600 ? "left" : "center"}
			justifyContent={window.innerWidth > 600 ? "left" : "center"}
			textAlign={window.innerWidth > 600 ? "left" : "center"}
			flexWrap="wrap"
			sx={{
				py: 3,
				gap: 2,
				// borderBottom: "1px solid #dddddd",
			}}>
			<Typography
				variant="h4"
				textAlign={window.innerWidth > 600 ? "left" : "center"}>
				This Course Includes
			</Typography>
			<Stack direction="row" spacing={1} alignItems="center">
				<OndemandVideoIcon sx={{ mr: 1, color: "text.secondary" }} />
				<Typography variant="body1" color="text.secondary">
					{course?.duration}
					{" hours of on-demand video lectures"}
				</Typography>
			</Stack>
			<Stack direction="row" spacing={1} alignItems="center">
				<AppShortcutIcon sx={{ mr: 1, color: "text.secondary" }} />
				<Typography variant="body1" color="text.secondary">
					Access on PC, TV and mobile
				</Typography>
			</Stack>
			<Stack direction="row" spacing={1} alignItems="center">
				<AllInclusiveIcon sx={{ mr: 1, color: "text.secondary" }} />
				<Typography variant="body1" color="text.secondary">
					Full lifetime access
				</Typography>
			</Stack>
		</Stack>
	);
};

export default CourseHighlights;
