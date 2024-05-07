import { useState, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Pagination, Container } from "@mui/material";
import SearchBar from "./SearchBar";
import Courses from "../UI/Courses/Courses";
import PageWrapper from "../UI/PageLayout/PageWrapper";

const CatalogSection = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState<Search>({
		name: undefined,
		sort: undefined,
		paid: undefined,
		categories: undefined,
		difficulty: undefined,
	});

	const limit = 9;

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
					published: true,
					page,
					limit,
					...search,
				},
			}),
		select: (response) => response.data,
	});

	const courses = data?.data?.data;

	const count = data?.count ?? 1;

	const pagesCount = Math.ceil(count / limit);

	return (
		<PageWrapper>
			<SearchBar setSearchHandler={searchChangeHandler} />
			<Container maxWidth="lg">
				<Courses
					courses={courses}
					isLoading={isLoading}
					isError={isError}
					maxLength={limit}
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
