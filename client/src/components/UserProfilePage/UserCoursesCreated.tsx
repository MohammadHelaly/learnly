import { useState, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Pagination, Container } from "@mui/material";
import Courses from "../UI/Courses/Courses";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";

interface UserCoursesCreatedProps {
	userId: string;
	userName: string;
}

const UserCoursesCreated = (props: UserCoursesCreatedProps) => {
	const { userId, userName } = props;
	const [page, setPage] = useState(1);

	const limit = 3;

	const userFirstName = userName.split(" ")[0];

	const pageChangeHandler = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const {
		data, //: courses,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["userCourses", { page, userId }],
		queryFn: async () =>
			await api.get("/courses", {
				params: {
					page,
					limit,
					published: true,
					instructors: {
						in: userId,
					},
				},
			}),
		select: (response) => response.data,
	});

	const courses = data?.data?.data;

	const count = data?.count ?? 1;

	const pagesCount = Math.ceil(count / limit);

	return (
		<SectionWrapper
			sx={{
				background: "white",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
			<Container maxWidth="lg">
				<SectionHeader
					heading={`Courses ${userFirstName} Created`}
					headingAlignment="center"
				/>
				<Courses
					courses={courses}
					isLoading={isLoading}
					isError={isError}
					maxLength={limit}
				/>
			</Container>
			<Pagination
				count={pagesCount}
				page={page}
				onChange={pageChangeHandler}
				variant="outlined"
				sx={{
					my: 8,
				}}
			/>
		</SectionWrapper>
	);
};

export default UserCoursesCreated;
