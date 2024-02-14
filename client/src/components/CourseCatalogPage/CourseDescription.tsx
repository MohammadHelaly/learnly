import { Typography, Skeleton } from "@mui/material";

interface CourseDescriptionProps {
	description: string;
	loading: boolean;
}

const CourseDescription = (props: CourseDescriptionProps) => {
	const { description, loading } = props;

	return (
		<>
			<Typography
				variant="h4"
				sx={{
					textAlign: window.innerWidth > 600 ? "left" : "center",
					my: 5,
				}}>
				About this Course{" "}
			</Typography>
			{loading ? (
				<>
					<Skeleton variant="text" animation="wave" />
					<Skeleton variant="text" animation="wave" />
					<Skeleton variant="text" animation="wave" />
					<Skeleton variant="text" animation="wave" />
					<Skeleton variant="text" animation="wave" />
					<Skeleton variant="text" animation="wave" width="80%" />
				</>
			) : (
				<Typography
					variant="body1"
					color="text.secondary"
					sx={{
						textAlign: window.innerWidth > 600 ? "left" : "center",
						my: 5,
					}}>
					{description}
				</Typography>
			)}
		</>
	);
};

export default CourseDescription;
