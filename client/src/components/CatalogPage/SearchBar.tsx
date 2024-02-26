import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Button,
	InputAdornment,
	Stack,
	TextField,
	Box,
	Container,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Filters from "./Filters";

const schema = z.object({
	searchTerm: z.string({}).optional(),
});

type SearchTermSchema = z.infer<typeof schema>;

interface SearchBarProps {
	setSearchHandler: (search: Partial<Search>) => void;
}

const SearchBar = (props: SearchBarProps) => {
	const { setSearchHandler } = props;
	const [scrolled, setScrolled] = useState(false);

	const { control, handleSubmit, watch } = useForm<SearchTermSchema>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: {
			searchTerm: "",
		},
	});

	const onSubmit = (data: SearchTermSchema) => {
		setSearchHandler({ name: data.searchTerm || undefined });
	};

	useEffect(() => {
		const subscription = watch((value) => {
			setSearchHandler({ name: value.searchTerm || undefined });
		});

		return () => subscription.unsubscribe();
	}, [watch]);

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
			<Container maxWidth="lg">
				<form
					onSubmit={handleSubmit(onSubmit)}
					autoComplete="off"
					noValidate>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="center"
						spacing={2}>
						<Controller
							name="searchTerm"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									id="searchBar"
									placeholder={
										window.innerWidth > 600
											? "What do you want to learn today?"
											: "Learn anything..."
									}
									size="small"
									fullWidth
									sx={{
										maxWidth:
											window.innerWidth > 600 ? 350 : 250,
										backgroundColor: "transparent",
									}}
									InputProps={{
										sx: {
											borderRadius: 5,
											px: 1,
											backgroundColor: "white",
											height:
												window.innerWidth > 600
													? 37
													: 36,
										},
										endAdornment: (
											<InputAdornment position="end">
												<Button
													type="submit"
													variant="text"
													disableElevation
													sx={{
														borderTopRightRadius: 30,
														borderBottomRightRadius: 30,
														borderTopLeftRadius: 0,
														borderBottomLeftRadius: 0,
														left: 8,
													}}>
													<SearchOutlinedIcon
														sx={{
															color: "primary.main",
															borderRadius: 3,
														}}
													/>
												</Button>
											</InputAdornment>
										),
									}}
									variant="outlined"
								/>
							)}
						/>
						<Filters setSearchHandler={setSearchHandler} />
					</Stack>
				</form>
			</Container>
		</Box>
	);
};

export default SearchBar;
