import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Button,
	SwipeableDrawer,
	Select,
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

const schema = z.object({
	sort: z.string().optional(),
	selectedCategories: z.array(z.string()).optional(),
	pricing: z.string().optional(),
	difficulty: z.string().optional(),
});

type FiltersSchema = z.infer<typeof schema>;

interface FiltersProps {
	setSearchHandler: (search: Partial<Search>) => void;
}

const Filters = (props: FiltersProps) => {
	const { setSearchHandler } = props;

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { isDirty },
	} = useForm<FiltersSchema>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: {
			sort: "",
			selectedCategories: [],
			pricing: "",
			difficulty: "",
		},
	});

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	const renderSelectedCategories = (selected: string[]) => {
		return selected.join(", ");
	};

	const isSelected = (value: string) => {
		return watch().selectedCategories?.includes(value);
	};

	const handleClearSearch = () => {
		reset();
	};

	const onSubmit = (data: FiltersSchema) => {
		setSearchHandler({
			sort: data.sort || undefined,
			categories:
				{ in: data.selectedCategories as string[] } || undefined,
			paid:
				data.pricing === "paid"
					? true
					: data.pricing === "free"
					? false
					: undefined,
			difficulty: data.difficulty || undefined,
		});
	};

	useEffect(() => {
		const subscription = watch((value) => {
			setSearchHandler({
				sort: value.sort || undefined,
				categories:
					{ in: value.selectedCategories as string[] } || undefined,
				paid:
					value.pricing === "paid"
						? true
						: value.pricing === "free"
						? false
						: undefined,
				difficulty: value.difficulty || undefined,
			});
		});

		return () => subscription.unsubscribe();
	}, [watch]);

	return (
		<>
			<Button
				variant="outlined"
				size="medium"
				endIcon={<TuneOutlinedIcon />}
				onClick={handleDrawerOpen}
				sx={{
					backgroundColor:
						isDrawerOpen || isDirty ? "primary.main" : "white",
					color: isDrawerOpen || isDirty ? "white" : "primary.main",
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
						<form
							style={{ width: "100%" }}
							onSubmit={handleSubmit(onSubmit)}
							autoComplete="off"
							noValidate>
							<Stack
								maxWidth="lg"
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
									<Controller
										name="sort"
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												labelId="sort-select-label"
												id="sort-select"
												label="Sort by"
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
										)}
									/>
								</FormControl>
								<FormControl size="small" fullWidth>
									<InputLabel id="categories-select-label">
										Categories
									</InputLabel>
									<Controller
										name="selectedCategories"
										control={control}
										render={({ field }) => (
											<Select
												{...field}
												labelId="categories-select-label"
												id="categories-select"
												multiple
												size="small"
												label="Categories"
												renderValue={
													renderSelectedCategories
												}
												variant="outlined"
												fullWidth>
												{categories
													.sort()
													.map((category) => (
														<MenuItem
															key={category}
															value={category}>
															<Checkbox
																checked={isSelected(
																	category
																)}
															/>
															{category}
														</MenuItem>
													))}
											</Select>
										)}
									/>
								</FormControl>
								<FormControl component="fieldset">
									<FormLabel
										sx={{
											fontSize: 20,
										}}
										component="label">
										Pricing
									</FormLabel>
									<Controller
										name="pricing"
										control={control}
										render={({ field }) => (
											<RadioGroup
												{...field}
												row
												aria-label="Free or Paid"
												name="freeOrPaid"
												defaultValue="">
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
										)}
									/>
								</FormControl>
								<FormControl component="fieldset">
									<FormLabel
										sx={{
											fontSize: 20,
										}}
										component="label">
										Difficulty
									</FormLabel>
									<Controller
										name="difficulty"
										control={control}
										render={({ field }) => (
											<RadioGroup
												{...field}
												row
												aria-label="Difficulty"
												name="difficulty"
												defaultValue="">
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
										)}
									/>
								</FormControl>
								<Stack
									direction="row"
									spacing={2}
									justifyContent="space-between"
									width="100%">
									<Button
										type="submit"
										size="medium"
										fullWidth
										variant="contained"
										disableElevation>
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
						</form>
					</FormContainer>
				</PageWrapper>
			</SwipeableDrawer>
		</>
	);
};

export default Filters;
