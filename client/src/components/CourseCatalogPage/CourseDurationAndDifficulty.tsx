import { Stack, Typography, Skeleton } from "@mui/material";
import { AccessTime, BarChart } from "@mui/icons-material";

interface CourseDurationAndDifficultyProps
	extends Pick<Course, "duration" | "difficulty"> {
	isLoading: boolean;
}

const CourseDurationAndDifficulty = (
	props: CourseDurationAndDifficultyProps
) => {
	const { duration, difficulty, isLoading } = props;

	return (
		<Stack
			direction="row"
			flexWrap="wrap"
			spacing={2}
			alignItems="center"
			justifyContent={window.innerWidth > 600 ? "left" : "center"}>
			<Typography
				variant="body2"
				sx={{
					p: 1,
					fontSize: "1rem",
					backgroundColor: "white",
					border: 1,
					borderColor: "primary.main",
					borderRadius: 10,
					display: "flex",
					flexDirection: "row",
					alignContent: "center",
					justifyContent: "center",
					gap: 1,
				}}>
				<AccessTime fontSize="small" />
				{isLoading ? (
					<Skeleton animation="wave" width="80px" />
				) : (
					`${duration ?? 0} Hours`
				)}
			</Typography>
			<Typography
				variant="body2"
				sx={{
					p: 1,
					fontSize: "1rem",
					backgroundColor: "white",
					border: 1,
					borderColor: "primary.main",
					borderRadius: 10,
					display: "flex",
					flexDirection: "row",
					alignContent: "center",
					justifyContent: "center",
					gap: 1,
				}}>
				<BarChart fontSize="small" />
				{isLoading ? (
					<Skeleton animation="wave" width="80px" />
				) : (
					difficulty + " Level"
				)}
			</Typography>
		</Stack>
	);
};

export default CourseDurationAndDifficulty;
