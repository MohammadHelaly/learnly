import { useState, useContext, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import AuthContext from "../../store/auth-context";
import { Pagination, Grid } from "@mui/material";
import Courses from "../UI/Courses/Courses";
import PageWrapper from "../UI/PageLayout/PageWrapper";
import StyledNavLink from "../UI/Links/StyledNavLink";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";

const InstructorDashboard = () => {
	const [page, setPage] = useState(1);

	const limit = 3;

	const authContext = useContext(AuthContext);
	const { user } = authContext;

	const pageChangeHandler = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const {
		data, //: courses,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["userCourses", { page, user }],
		queryFn: async () =>
			await api.get("/courses", {
				params: {
					page,
					limit,
					instructors: {
						in: user?.id,
					},
				},
			}),
		select: (response) => response.data,
	});

	const courses = data?.data?.data;

	const count = data?.count ?? 1;

	const pagesCount = Math.ceil(count / limit);

	return (
		<PageWrapper>
			<SectionWrapper
				sx={{
					mb: 8,
					mt: 0,
					py: 0,
					alignItems: "center",
					display: "flex",
					flexDirection: "column",
				}}>
				<SectionHeader
					heading="Create a New Course"
					headingAlignment="center"
					sx={{
						mb: 4,
					}}
				/>
				<StyledNavLink to="/dashboard/teach/courses/create">
					<Button
						variant="contained"
						disableElevation
						color="primary"
						aria-label="create course"
						size="large"
						sx={{
							borderRadius: "100%",
							width: 60,
							height: 60,
							mb: 4,
						}}>
						<Add fontSize="large" />
					</Button>
				</StyledNavLink>
			</SectionWrapper>
			<Courses
				variant="instructorDashboard"
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

export default InstructorDashboard;
