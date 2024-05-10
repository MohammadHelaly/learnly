import { Stack, Typography } from "@mui/material";
import { Rating } from "@mui/material";
import { CastForEducation, People } from "@mui/icons-material";
import formatNumber from "../../../helpers/formatNumber";

interface InstructorStatsProps {
	ratingsAverage: number;
	ratingsQuantity: number;
	courses: number;
	students: number;
}

const InstructorStats = (props: InstructorStatsProps) => {
	const { ratingsAverage, ratingsQuantity, courses, students } = props;

	return (
		<Stack
			gap={window.innerWidth > 600 ? 16 : 2}
			direction={window.innerWidth > 600 ? "row" : "column"}>
			<Stack direction="row" spacing={1} alignItems="center">
				<Rating
					name="read-only"
					value={ratingsAverage}
					precision={0.25}
					size="large"
					readOnly
					sx={{
						mb: 2,
						color: "secondary.main",
					}}
				/>
				<Typography variant="h5" color="text.primary">
					{"("}
					{formatNumber(ratingsQuantity)}
					{")"}
				</Typography>
			</Stack>
			<Stack
				direction="row"
				gap={2}
				justifyContent={
					window.innerWidth > 600 ? "flex-start" : "center"
				}
				alignContent="center"
				alignItems="center">
				<CastForEducation />
				<Typography variant="h5">
					{formatNumber(courses)} Course(s)
				</Typography>
			</Stack>
			<Stack
				direction="row"
				gap={2}
				justifyContent={
					window.innerWidth > 600 ? "flex-start" : "center"
				}
				alignContent="center"
				alignItems="center">
				<People />
				<Typography variant="h5">
					{formatNumber(students) + " Student(s)"}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default InstructorStats;
