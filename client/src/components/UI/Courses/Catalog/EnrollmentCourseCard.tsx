import { Card, Typography, Rating, Stack, Box } from "@mui/material";
import formatNumber from "../../../../helpers/formatNumber";

interface EnrollmentCourseCardProps
	extends Pick<
		Course,
		| "id"
		| "name"
		| "imageCover"
		| "price"
		| "paid"
		| "ratingsAverage"
		| "ratingsQuantity"
		| "difficulty"
		| "duration"
	> {}

const EnrollmentCourseCard = (props: EnrollmentCourseCardProps) => {
	const {
		id,
		name,
		imageCover,
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
				flexDirection: window.innerWidth > 600 ? "row" : "column",
				height: window.innerWidth < 600 ? 356 : 204,
				width: "100%",
				transition: `all 0.6s ease-in-out`,
				borderRadius: 0,
				backgroundColor: "transparent",
				borderBottom:
					window.innerWidth < 600 ? "1px solid #dddddd" : "none",
				boxShadow: "none",
				px: 0,
				py: window.innerWidth < 600 ? 0 : 1,
			}}>
			<Box
				sx={{
					height: 200,
					minWidth: window.innerWidth > 600 ? 356 : "100%",
					maxWidth: window.innerWidth > 600 ? 356 : "100%",
				}}>
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
					flexGrow: 1,
					transition: "all 0.5s ease",
					py: 1,
					px: window.innerWidth > 600 ? 2 : 0,
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
					}}></Typography>
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
				{!paid || price === 0 ? (
					<Typography
						variant="h6"
						color="common.black"
						sx={{ fontWeight: 400 }}>
						{"Free"}
					</Typography>
				) : (
					<Typography
						variant="h6"
						color="common.black"
						sx={{ fontWeight: 400 }}>
						{"$"}
						{price}
					</Typography>
				)}
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ fontWeight: 400 }}>
					{duration ?? 0}
					{" Hours"}
					{" - "}
					{difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
					{" Level"}
				</Typography>
			</Box>
		</Card>
	);
};

export default EnrollmentCourseCard;
