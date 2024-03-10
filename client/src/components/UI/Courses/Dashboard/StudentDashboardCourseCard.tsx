import { Card, Typography, Rating, Stack, Box } from "@mui/material";
import CardNavLink from "../../Links/CardNavLink";

interface StudentDashboardCourseCardProps
	extends Pick<
		Course,
		| "id"
		| "name"
		| "imageCover"
		| "instructors"
		| "price"
		| "paid"
		| "ratingsAverage"
		| "ratingsQuantity"
		| "difficulty"
		| "duration"
	> {}

const CourseCard = (props: StudentDashboardCourseCardProps) => {
	const {
		id,
		name,
		imageCover,
		instructors,
		price,
		paid,
		ratingsAverage,
		ratingsQuantity,
		difficulty,
		duration,
	} = props;

	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				height: 356,
				width: window.innerWidth > 380 ? 356 : 328,
				transition: `all 0.6s ease-in-out`,
				borderRadius: 0,
				backgroundColor: "transparent",
				borderBottom: "1px solid #dddddd",
				boxShadow: "none",
				p: 0,
			}}
		>
			<CardNavLink to={`/courses/${id}`}>
				<Box sx={{ height: 200, width: "100%" }}>
					<img
						src={imageCover.url}
						alt="course"
						style={{
							objectFit: "cover",
							height: "100%",
							width: "100%",
							borderRadius: 12,
						}}
					/>
				</Box>
				<Box
					sx={{
						transition: "all 0.5s ease",
						py: 1,
					}}
				>
					<Typography
						variant="h6"
						color="common.black"
						sx={{
							fontWeight: 500,
							width: "100%",
						}}
					>
						{name?.length > 30
							? name?.slice(0, 30) + "..."
							: name ?? "[Course Name Unavailable]"}
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{
							fontWeight: 400,
							width: "100%",
						}}
					>
						{instructors &&
						instructors?.length > 0 &&
						instructors[0]?.name.length > 30
							? `${instructors[0]?.name.slice(0, 30)}...`
							: instructors?.[0]?.name ??
							  "[Instructor Name Unavailable]"}
					</Typography>
					<Stack direction="row" spacing={1} alignItems="center">
						<Rating
							name="read-only"
							value={ratingsAverage}
							readOnly
							precision={0.25}
							size="small"
							sx={{
								color: "secondary.main",
								// color: "black",
							}}
						/>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ fontWeight: 400 }}
						>
							{"("}
							{ratingsQuantity}
							{")"}
						</Typography>
					</Stack>
					{!paid || price === 0 ? (
						<Typography
							variant="h6"
							color="common.black"
							sx={{ fontWeight: 400 }}
						>
							{"Free"}
						</Typography>
					) : (
						<Typography
							variant="h6"
							color="common.black"
							sx={{ fontWeight: 400 }}
						>
							{"$"}
							{price}
						</Typography>
					)}
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ fontWeight: 400 }}
					>
						{duration}
						{" Hours"}
						{" - "}
						{difficulty?.charAt(0).toUpperCase() +
							difficulty?.slice(1)}
						{" Level"}
					</Typography>
				</Box>
			</CardNavLink>
		</Card>
	);
};

export default CourseCard;
