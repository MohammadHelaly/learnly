import { Card, Typography, Rating, Stack, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink, useLocation } from "react-router-dom";
import useAnimate from "../../../hooks/use-animate";
import Skeleton from "@mui/material/Skeleton";

const StyledNavLink = styled(NavLink)((theme) => ({
	textDecoration: "none",
	color: "inherit",
}));

const CourseCard = (props) => {
	const elementRef = useAnimate("animate", false);

	const currentPath = useLocation().pathname;

	const delay = 0.2 + ((props.index % 3) + 1) * 0.2;

	return (
		<Card
			ref={elementRef}
			sx={{
				display: "flex",
				flexDirection: "column",
				// alignItems: "left",
				// justifyContent: "flex-end",
				// background: "rgb(155, 155, 155)",
				// width: window.innerWidth < 600 ? 170 : 195,
				height: 350,
				width: 350,
				margin: 1,
				// backgroundImage: `url(${props.image})`,
				// backgroundSize: "cover",
				// backgroundPosition: "center",
				// backgroundRepeat: "no-repeat",
				opacity: !currentPath.includes("/courses") ? 0 : 1,
				transition: `all 0.75s ease-in-out ${delay}s`,
				transform: !currentPath.includes("/courses")
					? "translateY(50%)"
					: "none",
				// borderRadius: "5%",
				// backgroundBlendMode: "multiply",

				borderRadius: 0,
				backgroundColor: "transparent",
				borderBottom: "1px solid #dddddd",
				boxShadow: "none",
				p: 0,
			}}>
			<StyledNavLink to={`/courses/${props.id}`} exact="true">
				{props.loading ? (
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
							src={props.image}
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
						// px: 2,
						py: 1,
						// "&:hover": {
						// 	backgroundColor: "rgba(0, 0, 0, 0.8)",
						// },
					}}>
					{props.loading ? (
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
							{props.name.length > 30
								? props.name.slice(0, 30) + "..."
								: props.name}
						</Typography>
					)}
					{props.loading ? (
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
							{props.instructor.length > 30
								? props.instructor.slice(0, 30) + "..."
								: props.instructor}
						</Typography>
					)}{" "}
					{props.loading ? (
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
								value={props.ratingsAverage}
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
								{props.ratingsQuantity}
								{")"}
							</Typography>
						</Stack>
					)}
					{props.loading ? (
						<Skeleton
							variant="text"
							animation="wave"
							height={30}
							sx={{
								width: "30%",
							}}
						/>
					) : (
						<Typography
							variant="h6"
							color="common.black"
							sx={{ fontWeight: 400 }}>
							{"$"}
							{props.price}
						</Typography>
					)}
					{props.loading ? (
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
							{props.duration}
							{" Hours"}
							{" - "}
							{props.difficulty?.charAt(0).toUpperCase() +
								props.difficulty?.slice(1)}
							{" Level"}
						</Typography>
					)}
					{/* <Typography
					variant="body2"
					color="common.white"
					sx={{ fontWeight: 300 }}>
					{props.category?.charAt(0).toUpperCase() +
						props.category?.slice(1)}
				</Typography> */}
				</Box>
			</StyledNavLink>
		</Card>
		// <StyledNavLink to={`/courses/${props.id}`}>
		// 	<Card
		// 		ref={elementRef}
		// 		sx={{
		// 			display: "flex",
		// 			flexDirection: "column",
		// 			alignItems: "left",
		// 			justifyContent: "flex-end",
		// 			background: "rgb(155, 155, 155)",
		// 			width: window.innerWidth < 600 ? 170 : 195,
		// 			height: 285,
		// 			margin: 1,
		// 			backgroundImage: `url(${props.image})`,
		// 			backgroundSize: "cover",
		// 			backgroundPosition: "center",
		// 			backgroundRepeat: "no-repeat",
		// 			opacity: 0,
		// 			transition: `background-color 0.5s ease-in-out 0s, opacity 0.75s ease-in-out ${delay}s, transform 0.75s ease-in-out ${delay}s`,
		// 			transform: "translateY(50%)",
		// 			backgroundBlendMode: "multiply",
		// 			// "&:hover": {
		// 			// 	backgroundColor: "rgba(0, 0, 0, 0.7)",
		// 			// },
		// 		}}
		// 		spacing={4}>
		// 		<Box
		// 			sx={{
		// 				transition: "all 0.5s ease",
		// 				p: 1,
		// 				"&:hover": {
		// 					backgroundColor: "rgba(0, 0, 0, 0.8)",
		// 				},
		// 			}}>
		// 			<Typography
		// 				variant="h6"
		// 				color="common.white"
		// 				sx={{
		// 					fontWeight: 500,

		// 					width: "100%",
		// 				}}>
		// 				{props.name.length > 32
		// 					? props.name.slice(0, 32) + "..."
		// 					: props.name}
		// 			</Typography>
		// 			<Typography
		// 				variant="body1"
		// 				color="common.white"
		// 				sx={{
		// 					fontWeight: 300,

		// 					width: "100%",
		// 				}}>
		// 				{props.instructor.length > 32
		// 					? props.instructor.slice(0, 32) + "..."
		// 					: props.instructor}
		// 			</Typography>

		// 			<Stack direction="row" spacing={1} alignItems="center">
		// 				<Rating
		// 					name="read-only"
		// 					value={props.ratingsAverage}
		// 					readOnly
		// 					precision={0.25}
		// 					size="small"
		// 					sx={{ color: "#00fb36" }}
		// 				/>
		// 				<Typography
		// 					variant="body2"
		// 					color="common.white"
		// 					sx={{ fontWeight: 300 }}>
		// 					{"("}
		// 					{props.ratingsQuantity}
		// 					{")"}
		// 				</Typography>
		// 			</Stack>
		// 			{/* <Typography variant="h6" color="common.white">
		// 		{props.summary}
		// 	</Typography> */}
		// 			<Typography
		// 				variant="h6"
		// 				color="common.white"
		// 				sx={{ fontWeight: 200 }}>
		// 				{props.price}
		// 			</Typography>

		// 			<Typography
		// 				variant="body2"
		// 				color="common.white"
		// 				sx={{ fontWeight: 300 }}>
		// 				{/* {props.duration} */}1 month(s)
		// 				{" - "}
		// 				{props.difficulty?.charAt(0).toUpperCase() +
		// 					props.difficulty?.slice(1)}
		// 				{" Level"}
		// 			</Typography>
		// 			{/* <Typography
		// 			variant="body2"
		// 			color="common.white"
		// 			sx={{ fontWeight: 300 }}>
		// 			{props.category?.charAt(0).toUpperCase() +
		// 				props.category?.slice(1)}
		// 		</Typography> */}
		// 		</Box>
		// 	</Card>
		// </StyledNavLink>
	);
};

export default CourseCard;
