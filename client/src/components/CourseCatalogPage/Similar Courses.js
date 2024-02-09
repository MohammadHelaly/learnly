import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import ApiInstance from "../../api/ApiInstance";
import PopularCoursesPreview from "../LandingPage/PopularCoursesPreview";
import CourseCard from "../CatalogPage/Courses/CourseCard";
import { Grid } from "@mui/material";
import dummyCoursesData from "../../assets/data/dummyCoursesData";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledNavLink = styled(NavLink)((theme) => ({
	color: " #9c27b0",
	transition: "all 1s ease",
	textDecoration: "none",
	marginLeft: window.innerWidth > 600 ? 10 : 2,
	"&:hover": {
		textDecoration: "underline",
	},
}));

const SimilarCourses = (props) => {
	const loading = props.loading;
	const [mostPopularCourses, setMostPopularCourses] = useState([]);
	const [error, setError] = useState(false);
	// const [loading, setLoading] = useState(false);

	const dummyCourses = dummyCoursesData.slice(0, 3);

	useEffect(() => {
		setError(false);
		// setLoading(true);
		ApiInstance.get("/courses", {
			params: {
				sort: "-ratingsQuantity",
				limit: 3,
			},
		})
			.then((response) => {
				// setMostPopularCourses(response.data.data.data);
				// setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				// setError(true);
				// setLoading(false);
			});
	}, []);
	return (
		<>
			<Typography
				// ref={elementRef}
				variant="h4"
				textAlign={window.innerWidth > 600 ? "left" : "center"}
				sx={{
					mb: 5,
					// opacity: 0,
					transition: "all 1s ease-in-out",
				}}>
				See Some Similar Courses
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
								ratingsAverage={popularCourse.ratingsAverage}
								ratingsQuantity={popularCourse.ratingsQuantity}
								difficulty={popularCourse.difficulty}
								instructor={popularCourse.instructor}
								duration={popularCourse.duration}
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
		</>
	);
};

export default SimilarCourses;
