import { Button, InputAdornment, Stack, TextField, Box } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { useState, useEffect } from "react";

interface SearchBarProps {
	setSearchHandler: (search: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
	const { setSearchHandler } = props;
	const [scrolled, setScrolled] = useState(false);
	const [search, setSearch] = useState("");

	const handleSetSearch = () => {
		setSearchHandler(search);
	};

	const searchChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchHandler(event.target.value); // Comment this line in case we don't want to update the search state in real time
		setSearch(event.target.value);
	};

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
					value={search}
					onChange={searchChangeHandler}
				/>
				<Button
					variant="outlined"
					size="medium"
					endIcon={<TuneOutlinedIcon />}
					sx={{
						backgroundColor: "white",
						"&:hover": {
							backgroundColor: "#9c27b0",
							color: "white",
						},
					}}>
					Filters
				</Button>
			</Stack>
		</Box>
	);
};

export default SearchBar;
