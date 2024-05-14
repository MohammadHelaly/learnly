import { useState, useContext, ChangeEvent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import AuthContext from "../../store/auth-context";
import { Pagination } from "@mui/material";
import Courses from "../UI/Courses/Courses";
import PageWrapper from "../UI/PageLayout/PageWrapper";

const StudentDashboard = () => {
	const [page, setPage] = useState(1);

	const limit = 3;

	const authContext = useContext(AuthContext);
	const { user } = authContext;

	const coursesEnrolled = user?.coursesEnrolled.length
		? user?.coursesEnrolled
		: [user?.id]; // This is a hack to prevent the API from returning all courses when the user has not enrolled in any courses, axios removes empty arrays from the query params, look into a better solution

	const pageChangeHandler = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const {
		data, //: courses,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["courseEnrollments", { user: authContext.user?.id, page }],
		queryFn: async () =>
			await api.get("/enrollments", {
				params: {
					page,
					limit,
					user: authContext.user?.id ?? null,
				},
			}),
		select: (response) => response.data,
	});

	const courses = data?.data?.data.map((course: any) => course.course) ?? [];

	const count = data?.count ?? 1;

	const pagesCount = Math.ceil(count / limit);

	return (
		<PageWrapper>
			<Courses
				variant="studentDashboard"
				courses={courses}
				isLoading={isLoading}
				isError={isError}
				maxLength={limit}
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

export default StudentDashboard;
