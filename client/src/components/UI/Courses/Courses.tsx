import { Grid, SxProps } from "@mui/material";
import CourseCard from "./Catalog/CourseCard";
import SkeletonCourseCard from "./Catalog/SkeletonCourseCard";
import AnimatedCard from "../AnimatedCard";
import SkeletonInstructorDashboardCourseCard from "./Dashboard/SkeletonInstructorDashboardCourseCard";
import SkeletonStudentDashboardCourseCard from "./Dashboard/SkeletonStudentDashboardCourseCard";
import InstructorDashboardCourseCard from "./Dashboard/InstructorDashboardCourseCard";
import StudentDashboardCourseCard from "./Dashboard/StudentDashboardCourseCard";
import ErrorWarning from "../ErrorWarning";
import NothingFoundMessage from "../NothingFoundMessage";

interface CoursesProps {
	variant?: "studentDashboard" | "instructorDashboard";
	isLoading: boolean;
	isError: boolean;
	maxLength: number;
	cardsAnimated?: boolean;
	sx?: SxProps;
	courses: Course[];
}

const Courses = (props: CoursesProps) => {
	const {
		courses,
		maxLength,
		isLoading,
		isError,
		variant,
		cardsAnimated,
		sx,
	} = props;

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
				courses?.length === 0 || !courses ? (
					<NothingFoundMessage variant={variant} />
				) : (
					Array(maxLength)
						.fill(null)
						.map((_, index) => {
							if (isLoading) {
								return (
									<Grid
										item
										key={index}
										xs={
											variant === "instructorDashboard"
												? 12
												: "auto"
										}>
										<AnimatedCard
											index={index}
											animated={cardsAnimated}>
											{variant === "studentDashboard" ? (
												<SkeletonStudentDashboardCourseCard />
											) : variant ===
											  "instructorDashboard" ? (
												<SkeletonInstructorDashboardCourseCard />
											) : (
												<SkeletonCourseCard />
											)}
										</AnimatedCard>
									</Grid>
								);
							}

							if (index >= courses.length) return;

							const course = courses?.[index];

							return (
								course && (
									<Grid
										item
										key={index}
										xs={
											variant === "instructorDashboard"
												? 12
												: "auto"
										}>
										<AnimatedCard
											index={index}
											animated={cardsAnimated}>
											{variant === "studentDashboard" ? (
												<StudentDashboardCourseCard
													{...course}
												/>
											) : variant ===
											  "instructorDashboard" ? (
												<InstructorDashboardCourseCard
													{...course}
												/>
											) : (
												<CourseCard {...course} />
											)}
										</AnimatedCard>
									</Grid>
								)
							);
						})
				)
			}
		</Grid>
	);
};

export default Courses;
