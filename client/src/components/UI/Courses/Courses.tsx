import { Grid, SxProps } from "@mui/material";
import CourseCard from "./CourseCard";
import SkeletonCourseCard from "./SkeletonCourseCard";
import AnimatedCard from "../AnimatedCard";
import ErrorWarning from "../ErrorWarning";

interface CoursesProps {
	isLoading: boolean;
	isError: boolean;
	maxLength: number;
	cardsAnimated?: boolean;
	sx?: SxProps;
	courses: {
		id: number | string;
		name: string;
		price: number;
		summary: string;
		duration: number;
		difficulty: "Beginner" | "Intermediate" | "Advanced";
		ratingsAverage: number;
		ratingsQuantity: number;
		instructors: {
			id: number | string;
			name: string;
			photo?: string;
			ratingsAverage: number;
			ratingsQuantity: number;
			students: number;
			bio?: string;
		}[];
		image: string;
		paid: boolean;
	}[];
}

const Courses = (props: CoursesProps) => {
	const { courses, maxLength, isLoading, isError, cardsAnimated, sx } = props;

	return (
		<Grid
			maxWidth="lg"
			container
			justifyContent="center"
			alignContent="center"
			gap={2}
			sx={sx}>
			{
				// isError ? (
				// 	<ErrorWarning />
				// ) :
				Array(maxLength)
					.fill(null)
					.map((_, index) => {
						if (isLoading) {
							return (
								<AnimatedCard
									key={index}
									index={index}
									animated={cardsAnimated}>
									<SkeletonCourseCard key={index} />
								</AnimatedCard>
							);
						}

						if (index >= courses.length) return;

						const course = courses?.[index];

						const {
							id,
							name,
							price,
							summary,
							duration,
							difficulty,
							ratingsAverage,
							ratingsQuantity,
							instructors,
							image,
							paid,
						} = course;

						return (
							course && (
								<AnimatedCard
									key={index}
									index={index}
									animated={cardsAnimated}>
									<CourseCard
										key={id}
										id={id}
										name={name}
										image={image}
										summary={summary}
										duration={duration}
										difficulty={difficulty}
										instructors={instructors}
										paid={paid}
										price={price}
										ratingsAverage={ratingsAverage}
										ratingsQuantity={ratingsQuantity}
									/>
								</AnimatedCard>
							)
						);
					})
			}
		</Grid>
	);
};

export default Courses;
