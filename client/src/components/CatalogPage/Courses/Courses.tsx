import { Box } from "@mui/system";
import CourseCard from "./CourseCard";

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
		<Box
			maxWidth="lg"
			sx={{
				minHeight: window.innerHeight < 1500 ? "70vh" : "65vh",

				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "center",
				pb: 3,
				pt: 8,
				px: window.innerWidth > 600 ? 8 : 7,
				mt: window.innerWidth > 600 ? 8 : 7,
				backgroundColor: "white",
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
		</Box>
	);
};

export default Courses;
