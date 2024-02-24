import { Button, InputAdornment, Stack, TextField, Box } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState, useEffect } from "react";
import Filters from "./Filters";

interface SearchBarProps {
	setSearchHandler: (search: Partial<Search>) => void;
}

const SearchBar = (props: SearchBarProps) => {
	const { setSearchHandler } = props;
	const [scrolled, setScrolled] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const searchChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchTerm(event.target.value);
	};

	const handleSetSearch = () => {
		setSearchHandler({ name: searchTerm || undefined });
	};

	useEffect(() => {
		handleSetSearch();
	}, [searchTerm]);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScrolled(window.scrollY > 25);
		});
	}, []);

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			position="fixed"
			sx={{
				width: "100vw",
				backgroundColor: scrolled ? "white" : "transparent",
				py: scrolled ? 2 : 4,
				boxShadow: scrolled ? "0 0 10px 0 rgba(0, 0, 0, 0.25)" : "none",
				transition: "all 0.5s ease-in-out",
				zIndex: 2,
			}}>
			<Stack
				maxWidth="lg"
				direction="row"
				alignItems="center"
				justifyContent="center"
				spacing={2}>
				<TextField
					id="searchBar"
					placeholder={
						window.innerWidth > 600
							? "What do you want to learn today?"
							: "Learn anything..."
					}
					size="small"
					sx={{
						width: window.innerWidth > 600 ? 350 : 250,
						backgroundColor: "transparent",
					}}
					InputProps={{
						sx: {
							borderRadius: 5,
							px: 1,
							backgroundColor: "white",
							height: window.innerWidth > 600 ? 37 : 36,
						},
						endAdornment: (
							<InputAdornment position="end">
								<Button
									variant="text"
									disableElevation
									sx={{
										borderTopRightRadius: 30,
										borderBottomRightRadius: 30,
										borderTopLeftRadius: 0,
										borderBottomLeftRadius: 0,
										left: 8,
									}}
									onClick={handleSetSearch}>
									<SearchOutlinedIcon
										sx={{
											color: "#9c27b0",
											borderRadius: 3,
										}}
									/>
								</Button>
							</InputAdornment>
						),
					}}
					variant="outlined"
					value={searchTerm}
					onChange={searchChangeHandler}
				/>
				<Filters setSearchHandler={setSearchHandler} />
			</Stack>
		</Box>
	);
};

export default SearchBar;
