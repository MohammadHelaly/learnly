import { Box, Pagination, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ApiInstance from "../../api/ApiInstance";
import SearchBar from "./SearchBar";
import Courses from "./Courses/Courses";
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
		category: undefined,
		difficulty: undefined,
	});
	const [courses, setCourses] = useState<Course[]>([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const limit = 9;

	useEffect(() => {
		setError(false);
		setLoading(true);
		ApiInstance.get("/courses", {
			params: {
				page,
				limit,
				sort,
				...search,
			},
		})
			.then((response) => {
				setCourses(response.data.data.courses);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				// setError(true);
			});
	}, [page, search, sort]);

	return (
		<Box
			sx={{
				minHeight: window.innerHeight < 1500 ? "70vh" : "65vh",
				px: 0,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-between",
				backgroundColor: "white",
				mt: window.innerWidth > 600 ? 8 : 7,
			}}>
			<SearchBar
				setSearchHandler={(value: string) => {
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
				}}
			/>
			{error ? (
				<Typography
					variant="h4"
					color="error"
					sx={{
						mt: 20,
					}}>
					Something went wrong...
				</Typography>
			) : (
				<Courses courses={dummyCoursesData} loading={loading} />
			)}
			<Pagination
				count={10}
				page={page}
				onChange={(event, value) => {
					setPage(value);
				}}
				variant="outlined"
				sx={{
					mt: 5,
					mb: 10,
				}}
			/>
		</Box>
	);
};

export default CatalogSection;
