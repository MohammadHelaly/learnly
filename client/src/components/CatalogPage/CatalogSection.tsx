import { useState, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Box, Pagination } from "@mui/material";
import SearchBar from "./SearchBar";
import Courses from "../UI/Courses/Courses";
import dummyCoursesData from "../../assets/data/dummyCoursesData";

interface Search {
	name?: string;
	category?: string;
	difficulty?: string;
}

const CatalogSection = () => {
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState(undefined);
	const [search, setSearch] = useState<Search>({
		name: undefined,
		category: undefined,
		difficulty: undefined,
	});

	const searchChangeHandler = (value: string) => {
		if (value === "") {
			setSearch((previousValue) => {
				return {
					...previousValue,
					name: undefined,
				};
			});
		} else {
			setSearch((previousValue) => {
				return {
					...previousValue,
					name: value,
				};
			});
		}
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
		queryKey: ["courses", { page, sort, search }],
		queryFn: async () =>
			await api.get("/courses", {
				params: {
					page,
					limit: 9,
					sort,
					...search,
				},
			}),
		select: (response) => response.data.data.data,
	});

	const courses = data ?? dummyCoursesData.slice(0, 9);

	const pagesCount = Math.ceil((courses?.length ?? 1) / 9);

	return (
		<Box
			sx={{
				minHeight: "75vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-between",
				backgroundColor: "white",
				mt: window.innerWidth > 600 ? 8 : 7,
			}}>
			<SearchBar setSearchHandler={searchChangeHandler} />
			<Courses
				courses={courses}
				isLoading={isLoading}
				isError={isError}
				maxLength={9}
				sx={{
					mt: 14,
				}}
			/>
			<Pagination
				count={pagesCount}
				page={page}
				onChange={pageChangeHandler}
				variant="outlined"
				sx={{
					mt: 8,
					mb: 10,
				}}
			/>
		</Box>
	);
};

export default CatalogSection;
