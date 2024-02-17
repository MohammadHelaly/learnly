import { Box, Grid, Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import ApiInstance from "../../../api/ApiInstance";
import useAnimate from "../../../hooks/use-animate";
import CourseCard from "./CourseCard";
import { NavLink } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material/styles";
import dummyCoursesData from "../../../assets/data/dummyCoursesData";
import { AxiosRequestConfig } from "axios";

interface CourseSelectionProps {
	query: {
		url: string;
		config?: AxiosRequestConfig;
	};
	variant: "grey" | "white";
	heading: string;
	headingAlignment: "left" | "center";
	headingAnimated?: boolean;
}

const StyledNavLink = styled(NavLink)((theme) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	color: " #9c27b0",
	transition: "all 1s ease",
	textDecoration: "none",
	"&:hover": {
		textDecoration: "underline",
	},
}));

const CourseSelection = (props: CourseSelectionProps) => {
	const { query, variant, heading, headingAlignment, headingAnimated } =
		props;
	const { url, config } = query;
	const elementRef = useAnimate("animate", false);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);

	const dummyCourses = dummyCoursesData.slice(0, 3);

	useEffect(() => {
		setError(false);
		setLoading(true);
		ApiInstance.get(url, {
			params: {
				sort: "-ratingsQuantity",
				limit: 3,
				...config?.params,
			},
		})
			.then((response) => {
				setSelectedCourses(response.data.data.data);
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
			display="flex"
			flexDirection="column"
			alignItems="center"
			sx={{
				py: 10,
				background: variant === "grey" ? "rgb(245, 245, 245)" : "white",
			}}>
			<Typography
				ref={headingAnimated ? elementRef : undefined}
				variant="h4"
				textAlign={
					window.innerWidth > 600 ? headingAlignment : "center"
				}
				sx={{
					mb: 5,
					opacity: headingAnimated ? 0 : 1,
					transition: "all 1s ease-in-out",
				}}>
				{heading}
			</Typography>
			<Grid container justifyContent="center" gap={2}>
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
						const {
							id,
							name,
							image,
							summary,
							duration,
							difficulty,
							ratingsAverage,
							ratingsQuantity,
							instructors,
							paid,
							price,
						} = popularCourse;
						return (
							<CourseCard
								key={index}
								index={index}
								loading={loading}
								id={id}
								name={name}
								image={image}
								summary={summary}
								description={summary}
								duration={duration}
								difficulty={difficulty}
								instructors={instructors}
								paid={paid}
								price={price}
								ratingsAverage={ratingsAverage}
								ratingsQuantity={ratingsQuantity}
							/>
						);
					})
				)}
			</Grid>
			<StyledNavLink
				to="/courses"
				sx={{
					mt: 5,
				}}>
				<Typography variant="h6" textAlign="center">
					See More Courses
				</Typography>
				<ArrowForwardIcon />
			</StyledNavLink>
		</Box>
	);
};

export default CourseSelection;
