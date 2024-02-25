import { Card, Typography, Rating, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

interface CourseCardProps {
	id: number | string;
	name: string;
	image: string;
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

const CourseCard = (props: CourseCardProps) => {
	const {
		id,
		name,
		image,
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
				height: 360,
				width: 360,
				transition: `all 0.6s ease-in-out`,
				borderRadius: 0,
				backgroundColor: "transparent",
				borderBottom: "1px solid #dddddd",
				boxShadow: "none",
				p: 0,
			}}>
			<StyledNavLink to={`/courses/${id}`}>
				<Box sx={{ height: 200, width: "100%" }}>
					<img
						src={image}
						alt="course"
						style={{
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
			</StyledNavLink>
		</Card>
	);
};

export default CourseCard;
