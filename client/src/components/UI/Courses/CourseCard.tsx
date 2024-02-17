import { Card, Typography, Rating, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink, useLocation } from "react-router-dom";
import useAnimate from "../../../hooks/use-animate";
import Skeleton from "@mui/material/Skeleton";

interface CourseCardProps {
	index: number;
	loading: boolean;
	id: number | string;
	name: string;
	image: string;
	summary: string;
	description: string;
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
		index,
		loading,
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

	const elementRef = useAnimate("animate", false);

	const currentPath = useLocation().pathname;

	const delay = 0.2 + ((index % 3) + 1) * 0.2;

	return (
		<Card
			ref={elementRef}
			sx={{
				display: "flex",
				flexDirection: "column",
				height: 360,
				width: 360,
				opacity: !currentPath.includes("/courses") ? 0 : 1,
				transition: `all 0.75s ease-in-out ${delay}s`,
				transform: !currentPath.includes("/courses")
					? "translateY(50%)"
					: "none",
				borderRadius: 0,
				backgroundColor: "transparent",
				borderBottom: "1px solid #dddddd",
				boxShadow: "none",
				p: 0,
			}}>
			<StyledNavLink to={`/courses/${id}`}>
				{loading ? (
					<Skeleton
						variant="rectangular"
						animation="wave"
						sx={{
							height: 200,
							width: "100%",
							borderRadius: "12px",
						}}
					/>
				) : (
					<Box sx={{ height: 200, width: "100%" }}>
						<img
							src={image}
							alt="course"
							style={{
								height: "100%",
								width: "100%",
								borderRadius: "12px",
							}}
						/>
					</Box>
				)}
				<Box
					sx={{
						transition: "all 0.5s ease",
						py: 1,
					}}>
					{loading ? (
						<Skeleton
							variant="text"
							animation="wave"
							height={40}
							sx={{
								width: "100%",
							}}
						/>
					) : (
						<Typography
							variant="h6"
							color="common.black"
							sx={{
								fontWeight: 500,
								width: "100%",
							}}>
							{name.length > 30
								? name.slice(0, 30) + "..."
								: name}
						</Typography>
					)}
					{loading ? (
						<Skeleton
							variant="text"
							animation="wave"
							sx={{
								width: "40%",
							}}
						/>
					) : (
						<Typography
							variant="body1"
							color="text.secondary"
							sx={{
								fontWeight: 400,

								width: "100%",
							}}>
							{instructors[0].name.length > 30
								? `${instructors[0].name.slice(0, 30)}...`
								: instructors[0].name}
						</Typography>
					)}{" "}
					{loading ? (
						<Skeleton
							variant="text"
							animation="wave"
							sx={{
								width: "50%",
							}}
						/>
					) : (
						<Stack direction="row" spacing={1} alignItems="center">
							<Rating
								name="read-only"
								value={ratingsAverage}
								readOnly
								precision={0.25}
								size="small"
								sx={{
									color: "#00f3b6",
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
					)}
					{loading ? (
						<Skeleton
							variant="text"
							animation="wave"
							height={30}
							sx={{
								width: "30%",
							}}
						/>
					) : !paid || price === 0 ? (
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
					{loading ? (
						<Skeleton
							variant="text"
							animation="wave"
							sx={{
								width: "60%",
							}}
						/>
					) : (
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
					)}
				</Box>
			</StyledNavLink>
		</Card>
	);
};

export default CourseCard;
