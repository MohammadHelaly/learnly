import { Card, Typography, Rating, Stack, Box } from "@mui/material";
import CardNavLink from "../../Links/CardNavLink";
import formatNumber from "../../../../utils/formatNumber";
import formatDuration from "../../../../utils/formatDuration";
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
		<CardNavLink to={`/courses/${id}`}>
			<Card
				sx={{
					display: "flex",
					flexDirection: "column",
					height: "auto",
					width: window.innerWidth > 600 ? 352 : "100%",
					transition: `all 0.6s ease-in-out`,
					borderRadius: 0,
					backgroundColor: "transparent",
					borderBottom: "1px solid #dddddd",
					boxShadow: "none",
					p: 0,
				}}>
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
					}}>
					<Typography
						variant="h6"
						color="common.black"
						sx={{
							fontWeight: 500,
							width: "100%",
						}}>
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
						}}>
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
							sx={{ fontWeight: 400 }}>
							{"("}
							{formatNumber(ratingsQuantity)}
							{")"}
						</Typography>
					</Stack>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ fontWeight: 400 }}>
						{formatDuration(duration)}
						{" - "}
						{difficulty?.charAt(0).toUpperCase() +
							difficulty?.slice(1)}
						{" Level"}
					</Typography>
				</Box>
			</Card>
		</CardNavLink>
	);
};

export default CourseCard;
