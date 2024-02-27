import { useState, useContext, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import AuthContext from "../../store/auth-context";
import { Pagination } from "@mui/material";
import Courses from "../UI/Courses/Courses";
import PageWrapper from "../UI/PageLayout/PageWrapper";
import dummyCoursesData from "../../assets/data/dummyCoursesData";

const InstructorDashboard = () => {
	const [page, setPage] = useState(1);

	const authContext = useContext(AuthContext);
	const { user } = authContext;
	const coursesCreated = user?.coursesCreated.length
		? user?.coursesCreated
		: [user?.id]; // This is a hack to prevent the API from returning all courses when the user has not created any courses, axios removes empty arrays from the query params, look into a better solution

	const pageChangeHandler = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const {
		data, //: courses,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["userCourses", { page, coursesCreated }],
		queryFn: async () =>
			await api.get("/courses", {
				params: {
					page,
					limit: 3,
					_id: {
						in: coursesCreated,
					},
				},
			}),
		select: (response) => response.data.data.data,
	});

	const courses = data ?? dummyCoursesData.slice(0, 3);

	const pagesCount = Math.ceil((courses?.length ?? 1) / 3);

	return (
		<PageWrapper>
			<Courses
				variant="instructorDashboard"
				courses={courses}
				isLoading={isLoading}
				isError={isError}
				maxLength={3}
			/>
			<Pagination
				count={pagesCount}
				page={page}
				onChange={pageChangeHandler}
				variant="outlined"
				sx={{
					my: 8,
				}}
			/>
		</PageWrapper>
	);
};

export default InstructorDashboard;
