import { Box } from "@mui/system";
import CourseCard from "./CourseCard";

const Courses = (props) => {
	return (
		<Box
			maxWidth="lg"
			sx={{
				minHeight: window.innerHeight < 1500 ? "70vh" : "65vh",
				// width: "100vw",
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "center",
				pb: 3,
				pt: 8,
				px: window.innerWidth > 600 ? 8 : 7,
				mt: window.innerWidth > 600 ? 8 : 7,
				// backgroundColor: "#f5f5f5",
				backgroundColor: "white",
			}}>
			{props.courses?.map((course, index) => (
				<CourseCard
					key={course.id}
					index={index}
					id={course.id}
					name={course.name}
					image={course.image}
					summary={course.summary}
					instructor={course.instructor}
					price={course.price}
					ratingsAverage={course.ratingsAverage}
					ratingsQuantity={course.ratingsQuantity}
					categories={course.categories}
					difficulty={course.difficulty}
					duration={course.duration}
					loading={props.loading}
				/>
			))}
		</Box>
	);
};

export default Courses;
