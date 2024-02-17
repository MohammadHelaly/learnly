import {
	Button,
	Card,
	Container,
	Rating,
	Stack,
	Typography,
	Skeleton,
	Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import ArrowForward from "@mui/icons-material/ArrowForward";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";

interface CourseInformationProps {
	name: string;
	summary: string;
	duration: number;
	difficulty: string;
	ratingsAverage: number;
	ratingsQuantity: number;
	instructors: {
		id: number | string;
		name: string;
		photo?: string;
		ratingsAverage: number;
		ratingsQuantity: number;
		students: number;
		bio?: string;
	}[];
	image: string;
	paid: boolean;
	price: number;
	loading: boolean;
}

const StyledNavLink = styled(NavLink)((theme) => ({
	textDecoration: "none",
	color: "#9c27b0",
	"&:hover": {
		textDecoration: "underline",
	},
}));

const CourseInformation = (props: CourseInformationProps) => {
	const {
		name,
		summary,
		duration,
		difficulty,
		ratingsAverage,
		ratingsQuantity,
		instructors,
		image,
		paid,
		price,
		loading,
	} = props;

	return (
		<Box sx={{ backgroundColor: "#f5f5f5" }}>
			<Container maxWidth="lg">
				<Stack
					direction={
						window.innerWidth > 600 ? "row" : "column-reverse"
					}
					gap={window.innerWidth > 600 ? 4 : 0}
					alignItems="center"
					justifyContent="center"
					sx={{
						mt: window.innerWidth > 600 ? 8 : 7,
						pb: 6,
						pt: window.innerWidth > 600 ? 8 : 0,
					}}>
					<Container
						maxWidth="sm"
						sx={{
							px: "0px !important",
						}}>
						<Typography
							variant="h4"
							sx={{
								textAlign:
									window.innerWidth > 600 ? "left" : "center",
								// fontWeight: "bold",
								// color: "#9c27b0",
								mb: 2,
							}}>
							{loading ? (
								<>
									<Skeleton
										animation="wave"
										variant="text"
										height={48}
									/>
									<Skeleton
										animation="wave"
										variant="text"
										height={48}
										width="60%"
									/>
								</>
							) : (
								name
							)}
						</Typography>
						<Typography
							variant="h6"
							sx={{
								textAlign:
									window.innerWidth > 600 ? "left" : "center",
								maxWidth:
									window.innerWidth > 600 ? "70%" : "auto",
								// fontWeight: "bold",
								// color: "#9c27b0",
								my: 2,
							}}>
							{loading ? (
								<>
									<Skeleton animation="wave" variant="text" />
									<Skeleton animation="wave" variant="text" />
									<Skeleton
										animation="wave"
										variant="text"
										width="60%"
									/>
								</>
							) : (
								summary
							)}
						</Typography>
						<Stack
							direction="row"
							flexWrap="wrap"
							spacing={2}
							alignItems="center"
							justifyContent={
								window.innerWidth > 600 ? "left" : "center"
							}
							sx={{
								mb: 2,
							}}>
							<Card
								variant="outlined"
								// key={index}
								color="primary"
								sx={{
									mb: 2,
									mx: 2,
									pt: 1,
									pb: 2,
									px: 2,
									width: "auto",
									height: "10px",
									fontSize: "1rem",
									backgroundColor: "white",
									border: "1px solid #9c27b0",
									// color: "#9c27b0",
									borderRadius: 10,
								}}>
								<Stack direction="row" alignItems="center">
									<AccessTimeIcon fontSize="small" />
									<Typography
										variant="body2"
										sx={{
											fontWeight: 500,
											ml: 1,
											// color: "#9c27b0",
										}}>
										{loading ? (
											<Skeleton
												animation="wave"
												width="80px"
											/>
										) : (
											<>
												{duration}
												{" Hours"}
											</>
										)}
									</Typography>
								</Stack>
							</Card>
							<Card
								variant="outlined"
								// key={index}
								color="primary"
								sx={{
									mb: 2,
									mx: 2,
									pb: 2,
									pt: 1,
									px: 2,
									width: "auto",
									height: "10px",
									fontSize: "1rem",
									backgroundColor: "white",
									border: "1px solid #9c27b0",
									// color: "#9c27b0",
									borderRadius: 10,
								}}>
								<Stack direction="row" alignItems="center">
									<BarChartIcon fontSize="small" />
									<Typography
										variant="body2"
										sx={{
											fontWeight: 500,
											ml: 1,
											// color: "#9c27b0",
										}}>
										{loading ? (
											<Skeleton
												animation="wave"
												width="80px"
											/>
										) : (
											<>
												{difficulty}
												{" Level"}
											</>
										)}
									</Typography>
								</Stack>
							</Card>
						</Stack>
						<Stack
							direction="row"
							spacing={1}
							alignItems="center"
							justifyContent={
								window.innerWidth > 600 ? "left" : "center"
							}>
							{loading ? (
								<Skeleton animation="wave" width="40%" />
							) : (
								<>
									<Rating
										name="read-only"
										value={ratingsAverage}
										readOnly
										precision={0.25}
										size="large"
										sx={{ color: "#00f3b6" }}
									/>
									<Typography
										variant="h6"
										color="common.black"
										sx={{
											fontWeight: 300,
											textAlign:
												window.innerWidth > 600
													? "left"
													: "center",
										}}>
										{"("}
										{ratingsQuantity}
										{")"}
									</Typography>
								</>
							)}
						</Stack>
						<Typography
							variant="body2"
							sx={{
								textAlign:
									window.innerWidth > 600 ? "left" : "center",
								// fontWeight: "bold",
								// color: "#9c27b0",
								my: 2,
							}}>
							{loading ? (
								<Skeleton
									animation="wave"
									variant="text"
									width="25%"
								/>
							) : (
								<>
									{"Taught by"}
									<StyledNavLink
										to={`/users/${instructors[0].id}`}>
										{" "}
										{instructors[0].name}
									</StyledNavLink>
								</>
							)}
						</Typography>
						{window.innerWidth < 600 && (
							<>
								<Typography
									variant="h4"
									sx={{
										textAlign:
											window.innerWidth > 600
												? "left"
												: "center",
										// fontWeight: "bold",
										// color: "#9c27b0",
										my: 2,
									}}>
									{loading ? (
										<Skeleton
											animation="wave"
											variant="text"
											width="15%"
										/>
									) : !paid || price === 0 ? (
										"Free"
									) : (
										<>{"$" + price}</>
									)}
								</Typography>
								<Button
									variant="contained"
									size="large"
									disableElevation
									sx={{
										// mb: 3,
										width:
											window.innerWidth > 600
												? "45%"
												: "100%",
										height: 50,
										fontSize: "1rem",
										backgroundColor: "#00f3b6",
										// backgroundColor: "#9c27b0",

										color: "black",
										// border: "1px solid #00f3b6",
										"&:hover": {
											backgroundColor: "#9c27b0",
											color: "white",
											// backgroundColor: "transparent",
											// color: "#9c27b0",
											// border: "1px solid #9c27b0",
										},
									}}
									endIcon={<ArrowForward />}>
									Enroll now
								</Button>
							</>
						)}
					</Container>
					<Container
						maxWidth="sm"
						sx={{
							px: "0px !important",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							// justifyContent: "flex-start",
							pb: window.innerWidth > 600 ? 0 : 3,
						}}>
						{window.innerWidth < 600 && loading && (
							<Skeleton
								animation="wave"
								variant="rectangular"
								sx={{
									width:
										window.innerWidth > 600
											? "100%"
											: "100vw",
									height: "220px",
									borderRadius:
										window.innerWidth > 600 ? "20px" : "0",
								}}
							/>
						)}{" "}
						{!loading && window.innerWidth < 600 && (
							<img
								src={image}
								alt={name}
								style={{
									width:
										window.innerWidth > 600
											? "100%"
											: "100vw",
									borderRadius:
										window.innerWidth > 600 ? "20px" : "0",
									height: "220px",
								}}
							/>
						)}
						{window.innerWidth > 600 && (
							<Stack direction="column" width="100%">
								{loading ? (
									<Skeleton
										animation="wave"
										variant="rectangular"
										sx={{
											width:
												window.innerWidth > 600
													? "100%"
													: "100vw",
											height: "300px",
											borderRadius:
												window.innerWidth > 600
													? "20px"
													: "0",
										}}
									/>
								) : (
									<img
										src={image}
										alt={name}
										style={{
											width:
												window.innerWidth > 600
													? "100%"
													: "100vw",
											height: "300px",
											borderRadius:
												window.innerWidth > 600
													? "20px"
													: "0",
										}}
									/>
								)}
								<Stack
									direction="row"
									width="100%"
									alignItems="center"
									justifyContent="space-between"
									sx={{
										borderBottom:
											window.innerWidth > 600
												? "1px solid #dddddd"
												: "none",
									}}>
									<Typography
										variant="h4"
										sx={{
											textAlign:
												window.innerWidth > 600
													? "left"
													: "center",
											// fontWeight: "bold",
											// color: "#9c27b0",
											my: 2,
										}}>
										{loading ? (
											<Skeleton
												animation="wave"
												variant="text"
												width="100px"
											/>
										) : !paid || price === 0 ? (
											"Free"
										) : (
											<>{"$" + price}</>
										)}
									</Typography>
									<Button
										variant="contained"
										size="large"
										disableElevation
										sx={{
											// mb: 3,
											width:
												window.innerWidth > 600
													? "45%"
													: "100%",
											height: 50,
											fontSize: "1rem",
											backgroundColor: "#00f3b6",
											// backgroundColor: "#9c27b0",

											color: "black",
											// border: "1px solid #00f3b6",
											"&:hover": {
												backgroundColor: "#9c27b0",
												color: "white",
												// backgroundColor: "transparent",
												// color: "#9c27b0",
												// border: "1px solid #9c27b0",
											},
										}}
										endIcon={<ArrowForward />}>
										Enroll now
									</Button>
								</Stack>
							</Stack>
						)}
					</Container>
				</Stack>
			</Container>
		</Box>
	);
};

export default CourseInformation;
