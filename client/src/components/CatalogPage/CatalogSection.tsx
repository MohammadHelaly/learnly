import { useState, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Pagination, Container } from "@mui/material";
import SearchBar from "./SearchBar";
import Courses from "../UI/Courses/Courses";
import dummyCoursesData from "../../assets/data/dummyCoursesData";
import PageWrapper from "../UI/PageWrapper";

const CatalogSection = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState<Search>({
		name: undefined,
		sort: undefined,
		paid: undefined,
		categories: undefined,
		difficulty: undefined,
	});

	const searchChangeHandler = (updatedSearch: Partial<Search>) => {
		setSearch((previousValue) => {
			return {
				...previousValue,
				...updatedSearch,
			};
		});
		setPage(1);
		refetch();
	};

	const pageChangeHandler = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const {
		data, //: courses,
		isLoading,
		isError,
		refetch,
	} = useQuery({
		queryKey: ["courses", { page, ...search }],
		queryFn: async () =>
			await api.get("/courses", {
				params: {
					page,
					limit: 9,
					...search,
				},
			}),
		select: (response) => response.data.data.data,
	});

	const courses = data ?? dummyCoursesData.slice(0, 9);

	const pagesCount = Math.ceil((courses?.length ?? 1) / 9);

	return (
		<PageWrapper>
			<SearchBar setSearchHandler={searchChangeHandler} />
			<Container maxWidth="lg">
				<Courses
					courses={courses}
					isLoading={isLoading}
					isError={isError}
					maxLength={9}
					sx={{
						mt: 14,
					}}
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
		</PageWrapper>
	);
};

export default CatalogSection;
