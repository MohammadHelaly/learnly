import { Grid, SxProps } from "@mui/material";
import CourseCard from "./CourseCard";
import SkeletonCourseCard from "./SkeletonCourseCard";
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
	console.log("Courses.tsx", courses);
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
				// <ErrorWarning />
				// ) :
				isLoading
					? Array(maxLength)
							.fill(null)
							.map((_, index) => (
								<SkeletonCourseCard key={index} index={index} />
							))
					: courses?.map((course, index) => {
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

							const animated = cardsAnimated && !!course; //TODO: Fix this , may use isLoading or use a CardWrapper component

							return (
								<CourseCard
									key={id}
									index={index}
									animated={animated}
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
			}
		</Grid>
	);
};

export default Courses;
