import { Grid } from "@mui/material";
import CourseCard from "../UI/Courses/CourseCard";

interface CoursesProps {
	loading: boolean;
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
	const { courses, loading } = props;

	return (
		<Grid
			maxWidth="lg"
			container
			justifyContent="center"
			alignContent="center"
			gap={2}
			sx={{
				mt: 14,
			}}>
			{courses?.map((course, index) => {
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
					<CourseCard
						key={course.id}
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
			})}
		</Grid>
	);
};

export default Courses;
