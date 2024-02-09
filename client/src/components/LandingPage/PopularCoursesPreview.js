import { Box, Grid, Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import ApiInstance from "../../api/ApiInstance";
import useAnimate from "../../hooks/use-animate";
import CourseCard from "../CatalogPage/Courses/CourseCard";
import { NavLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material/styles";
import dummyCoursesData from "../../assets/data/dummyCoursesData";

const StyledNavLink = styled(NavLink)((theme) => ({
	color: " #9c27b0",
	transition: "all 1s ease",
	textDecoration: "none",
	marginLeft: window.innerWidth > 600 ? 10 : 2,
	"&:hover": {
		textDecoration: "underline",
	},
}));

const PopularCoursesPreview = () => {
	const elementRef = useAnimate("animate", false);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [mostPopularCourses, setMostPopularCourses] = useState([]);

	const dummyCourses = dummyCoursesData.slice(0, 3);

	useEffect(() => {
		setError(false);
		setLoading(true);
		ApiInstance.get("/courses", {
			params: {
				sort: "-ratingsQuantity",
				limit: 3,
			},
		})
			.then((response) => {
				setMostPopularCourses(response.data.data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				// setError(true);
				setLoading(false);
			});
	}, []);

	return (
		<Box
			sx={{
				py: 10,
				px: window.innerWidth > 600 ? 10 : 1,
				background: "rgb(245, 245, 245)",
			}}>
			<Container maxWidth="lg">
				<Typography
					ref={elementRef}
					variant="h4"
					textAlign={"center"}
					sx={{
						mb: 5,
						opacity: 0,
						transition: "all 1s ease-in-out",
					}}>
					Check Out our Most Popular Courses
				</Typography>
				<Grid container justifyContent="center">
					{error ? (
						<Typography
							variant="h4"
							color={"error"}
							textAlign={"center"}
							sx={{
								mb: 5,
								transition: "all 1s ease-in-out",
							}}>
							Something went wrong...
						</Typography>
					) : (
						dummyCourses?.map((popularCourse, index) => {
							return (
								<CourseCard
									key={index}
									index={index}
									id={popularCourse.id}
									name={popularCourse.name}
									image={popularCourse.image}
									// summary={popularCourse.summary}
									price={popularCourse.price}
									ratingsAverage={
										popularCourse.ratingsAverage
									}
									ratingsQuantity={
										popularCourse.ratingsQuantity
									}
									difficulty={popularCourse.difficulty}
									duration={popularCourse.duration}
									instructor={popularCourse.instructor}
									// category={popularCourse.categories[0]}
									loading={loading}
								/>
							);
						})
					)}
				</Grid>
				<Typography
					variant="h6"
					textAlign={"left"}
					sx={{ ml: window.innerWidth > 600 ? 3 : 10 }}>
					<StyledNavLink to="/courses" exact="true">
						See More Courses
						<ArrowForwardIcon
							sx={{
								mb: -1,
							}}
						/>
					</StyledNavLink>
				</Typography>
			</Container>
		</Box>
	);
};

export default PopularCoursesPreview;
