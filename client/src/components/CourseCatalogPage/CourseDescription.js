import { Typography, Skeleton } from "@mui/material";

const CourseDescription = (props) => {
	const { course, loading } = props;

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
					{course?.description}
				</Typography>
			)}
		</>
	);
};

export default CourseDescription;
