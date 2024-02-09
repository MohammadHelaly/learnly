import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { useState, useEffect } from "react";

const SearchBar = (props) => {
	const [scrolled, setScrolled] = useState(false);
	const [search, setSearch] = useState("");

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScrolled(window.scrollY > 25);
		});
	}, []);

	return (
		<Stack
			direction="row"
			spacing={2}
			alignItems="center"
			justifyContent="center"
			sx={{
				maxWidth: "100vw",
				width: "100vw",
				position: "fixed",
				backgroundColor: scrolled ? "white" : "transparent",
				py: scrolled ? 2 : 4,
				// mt: window.innerWidth > 600 ? 8 : 7,
				mx: 0,
				boxShadow: scrolled ? "0 0 10px 0 rgba(0, 0, 0, 0.25)" : "none",
				transition: "all 0.5s ease-in-out",
				zIndex: 2,
			}}>
			<TextField
				id="searchBar"
				placeholder={
					window.innerWidth > 600
						? "What do you want to learn today?"
						: "Learn anything..."
				}
				size="small"
				sx={{
					width: window.innerWidth > 600 ? 350 : 235,
					backgroundColor: "transparent",
				}}
				InputProps={{
					sx: {
						borderRadius: 5,
						px: 1,
						backgroundColor: "white",
						height: 37,
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
								onClick={() => {
									props.setSearchHandler(search);
								}}>
								<SearchOutlinedIcon
									sx={{
										color: "#9c27b0",
										// backgroundColor: "#9c27b0",
										borderRadius: 3,
									}}
								/>
							</Button>
						</InputAdornment>
					),
				}}
				variant="outlined"
				value={search}
				onChange={(event) => {
					setSearch(event.target.value);
				}}
			/>
			<Button
				variant="outlined"
				size="normal"
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
	);
};

export default SearchBar;
