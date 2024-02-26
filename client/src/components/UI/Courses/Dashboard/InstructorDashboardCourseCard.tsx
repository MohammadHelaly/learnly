import { Card, Typography, Rating, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

interface CourseCardProps {
	id: number | string;
	name: string;
	imageCover: string;
	summary: string;
	instructors: {
		id: number | string;
		name: string;
		photo?: string;
		ratingsAverage: number;
		ratingsQuantity: number;
		students: number;
		bio?: string;
	}[];
	paid: boolean;
	price: number;
	ratingsAverage: number;
	ratingsQuantity: number;
	duration: number;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
}

const StyledNavLink = styled(NavLink)((theme) => ({
	textDecoration: "none",
	color: "inherit",
}));

const InstructorDashboardCourseCard = (props: CourseCardProps) => {
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
		<StyledNavLink to={`/courses/${id}`}>
			<Card
				sx={{
					display: "flex",
					flexDirection: window.innerWidth > 600 ? "row" : "column",
					gap: 2,
					// height: 356,
					width: "100%",
					transition: `all 0.6s ease-in-out`,
					borderRadius: 0,
					backgroundColor: "transparent",
					borderBottom: "1px solid #dddddd",
					boxShadow: "none",
					px: 0,
					py: 1,
				}}>
				<Box sx={{ height: 200, width: 356 }}>
					<img
						src={imageCover}
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
					}}>
					<Typography
						variant="h6"
						color="common.black"
						sx={{
							fontWeight: 500,
							width: "100%",
						}}>
						{name?.length > 30 && window.innerWidth < 600
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
							{ratingsQuantity}
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
						{duration}
						{" Hours"}
						{" - "}
						{difficulty?.charAt(0).toUpperCase() +
							difficulty?.slice(1)}
						{" Level"}
					</Typography>
				</Box>
			</Card>
		</StyledNavLink>
	);
};

export default InstructorDashboardCourseCard;