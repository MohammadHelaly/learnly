import { useState, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Pagination, Container } from "@mui/material";
import Courses from "../UI/Courses/Courses";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import SectionHeader from "../UI/PageLayout/SectionHeader";

interface UserCoursesEnrolledProps {
	userId: string;
	userName: string;
}

const UserCoursesEnrolled = (props: UserCoursesEnrolledProps) => {
	const { userId, userName } = props;
	const [page, setPage] = useState(1);

	const limit = 3;

	const pageChangeHandler = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const userFirstName = userName.split(" ")[0];

	const {
		data, //: courses,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["courseEnrollments", { user: userId, page }],
		queryFn: async () =>
			await api.get("/enrollments", {
				params: {
					page,
					limit,
					user: userId,
				},
			}),
		select: (response) => response.data,
	});

	const courses =
		data?.data?.data.map((course: any) =>
			course.course.published ? course.course : null
		) ?? [];

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
					heading={`Courses ${userFirstName} Enrolled In`}
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

export default UserCoursesEnrolled;
