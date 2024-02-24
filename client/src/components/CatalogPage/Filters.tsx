import { useEffect, useState } from "react";
import {
	Button,
	SwipeableDrawer,
	Select,
	SelectChangeEvent,
	Checkbox,
	InputLabel,
	MenuItem,
	Stack,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	FormLabel,
} from "@mui/material";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import SectionHeader from "../UI/SectionHeader";
import FormContainer from "../UI/FormContainer";
import PageWrapper from "../UI/PageWrapper";
import categories from "../../assets/data/categories";

interface FiltersProps {
	setSearchHandler: (search: Partial<Search>) => void;
}

const Filters = (props: FiltersProps) => {
	const { setSearchHandler } = props;

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [hasFilters, setHasFilters] = useState(false); // Used to determine if the user has applied filters
	const [sort, setSort] = useState("");
	const [categoryArray, setCategoryArray] = useState<string[]>([]);
	const [pricing, setPricing] = useState("");
	const [difficulty, setDifficulty] = useState("");

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	const handleSortChange = (event: SelectChangeEvent<typeof sort>) => {
		setSort(event.target.value);
	};

	const renderSelectedCategories = (selected: string[]) => {
		return selected.join(", ");
	};

	const handleCategoryChange = (
		event: SelectChangeEvent<typeof categoryArray>
	) => {
		const value = event.target.value;
		setCategoryArray(typeof value === "string" ? value.split(",") : value);
	};

	const handlePricingChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setPricing(event.target.value);
	};

	const handleDifficultyChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setDifficulty(event.target.value);
	};

	const handleClearSearch = () => {
		setSort("");
		setCategoryArray([]);
		setPricing("");
		setDifficulty("");
		setSearchHandler({
			sort: undefined,
			categories: undefined,
			paid: undefined,
			difficulty: undefined,
		});
		setHasFilters(false);
	};

	const handleSetSearch = () => {
		setSearchHandler({
			sort: sort || undefined,
			categories: { in: categoryArray } || undefined,
			paid:
				pricing === "paid"
					? true
					: pricing === "free"
					? false
					: undefined,
			difficulty: difficulty || undefined,
		});
		setHasFilters(
			!!sort || !!categoryArray.length || !!pricing || !!difficulty
		);
	};

	useEffect(() => {
		handleSetSearch();
	}, [sort, categoryArray, pricing, difficulty]);

	return (
		<>
			<Button
				variant="outlined"
				size="medium"
				endIcon={<TuneOutlinedIcon />}
				onClick={handleDrawerOpen}
				sx={{
					backgroundColor:
						isDrawerOpen || hasFilters ? "primary.main" : "white",
					color:
						isDrawerOpen || hasFilters ? "white" : "primary.main",
					"&:hover": {
						backgroundColor: "primary.main",
						color: "white",
					},
				}}>
				Filters
			</Button>
			<SwipeableDrawer
				anchor="bottom"
				open={isDrawerOpen}
				onClose={handleDrawerClose}
				onOpen={handleDrawerOpen}>
				<PageWrapper modal>
					<FormContainer modal>
						<Stack
							direction="column"
							spacing={2}
							justifyContent="center"
							alignItems="flex-start">
							<SectionHeader
								heading="Filters"
								headingAlignment="left"
								sx={{
									mb: 0,
								}}
							/>
							<FormControl size="small" fullWidth>
								<InputLabel id="sort-select-label">
									Sort by
								</InputLabel>
								<Select
									labelId="sort-select-label"
									id="sort-select"
									label="Sort by"
									value={sort}
									defaultValue=""
									onChange={handleSortChange}
									variant="outlined"
									fullWidth>
									<MenuItem value="price">
										Price - Low to High
									</MenuItem>
									<MenuItem value="-price">
										Price - High to Low
									</MenuItem>
									<MenuItem value="-ratingsAverage">
										Rating
									</MenuItem>
									<MenuItem value="-ratingsQuantity">
										Popularity
									</MenuItem>
									<MenuItem value="-createdAt">
										Newest
									</MenuItem>
								</Select>
							</FormControl>
							<FormControl size="small" fullWidth>
								<InputLabel id="categories-select-label">
									Categories
								</InputLabel>
								<Select
									labelId="categories-select-label"
									id="categories-select"
									multiple
									size="small"
									label="Categories"
									value={categoryArray}
									renderValue={renderSelectedCategories}
									onChange={handleCategoryChange}
									variant="outlined"
									fullWidth>
									{categories.sort().map((category) => (
										<MenuItem
											key={category}
											value={category}>
											<Checkbox
												checked={
													categoryArray.indexOf(
														category
													) > -1
												}
											/>
											{category}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl component="fieldset">
								<FormLabel
									sx={{
										fontSize: 20,
									}}
									component="label">
									Pricing
								</FormLabel>
								<RadioGroup
									row
									aria-label="Free or Paid"
									name="freeOrPaid"
									value={pricing}
									defaultValue=""
									onChange={handlePricingChange}>
									<FormControlLabel
										value=""
										control={<Radio />}
										label="All"
									/>
									<FormControlLabel
										value="free"
										control={<Radio />}
										label="Free"
									/>
									<FormControlLabel
										value="paid"
										control={<Radio />}
										label="Paid"
									/>
								</RadioGroup>
							</FormControl>
							<FormControl component="fieldset">
								<FormLabel
									sx={{
										fontSize: 20,
									}}
									component="label">
									Difficulty
								</FormLabel>
								<RadioGroup
									row
									aria-label="Difficulty"
									name="difficulty"
									value={difficulty}
									defaultValue=""
									onChange={handleDifficultyChange}>
									<FormControlLabel
										value=""
										control={<Radio />}
										label="All"
									/>
									<FormControlLabel
										value="Beginner"
										control={<Radio />}
										label="Beginner"
									/>
									<FormControlLabel
										value="Intermediate"
										control={<Radio />}
										label="Intermediate"
									/>
									<FormControlLabel
										value="Advanced"
										control={<Radio />}
										label="Advanced"
									/>
								</RadioGroup>
							</FormControl>
							<Stack
								direction="row"
								spacing={2}
								justifyContent="space-between"
								width="100%">
								<Button
									size="medium"
									fullWidth
									variant="contained"
									disableElevation
									onClick={handleSetSearch}>
									Apply Filters
								</Button>
								<Button
									fullWidth
									size="medium"
									variant="outlined"
									color="error"
									onClick={handleClearSearch}
									sx={{
										"&:hover": {
											backgroundColor: "error.main",
											color: "white",
										},
									}}>
									Clear Filters
								</Button>
							</Stack>
						</Stack>
					</FormContainer>
				</PageWrapper>
			</SwipeableDrawer>
		</>
	);
};

export default Filters;
