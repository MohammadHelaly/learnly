import React from "react";
import { Box, Container, Typography, Skeleton, Stack } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";

const CoursePrerequisitesAndSkills = (props) => {
	const { course, loading } = props;

	return (
		<Stack
			direction={window.innerWidth > 600 ? "row" : "column"}
			// spacing={1}
			alignItems="flex-start">
			<Container
				maxWidth="sm"
				// sx={{ borderRight: "1px solid #dddddd" }}
			>
				<Typography
					variant="h4"
					sx={{
						textAlign: window.innerWidth > 600 ? "left" : "center",
						my: 5,
					}}>
					Prerequisites{" "}
				</Typography>
				<Box
					spacing={2}
					alignItems="center"
					justifyContent={window.innerWidth > 600 ? "left" : "center"}
					sx={{
						display: "grid",
						gridTemplateColumns:
							window.innerWidth > 600 ? "repeat(2,1fr)" : "1",
						gridGap: "0",
						gridTemplateRows:
							window.innerWidth > 600
								? "repeat(6,minmax(50px, 1fr))"
								: "repeat(12,minmax(50px, 1fr))",
					}}>
					{course.prerequisites?.length === 0 ||
					!course.prerequisites ? (
						<Stack
							direction="row"
							spacing={1}
							alignItems="center"
							color="text.secondary">
							<ChecklistIcon />

							<Typography
								variant="body1"
								color="text.secondary"
								sx={{
									textAlign:
										window.innerWidth > 600
											? "left"
											: "center",
									my: 3,
								}}>
								No prerequisites needed
							</Typography>
						</Stack>
					) : (
						course.prerequisites?.map((prerequisite) => (
							<Stack
								direction="row"
								spacing={1}
								alignItems="center"
								color="text.secondary">
								<ChecklistIcon />
								{loading ? (
									<Skeleton
										variant="text"
										animation="wave"
										sx={{
											width: "80%",
											// height: "100%",
										}}
									/>
								) : (
									<Typography
										variant="body1"
										color="text.secondary"
										sx={{
											textAlign:
												window.innerWidth > 600
													? "left"
													: "center",
											my: 3,
										}}>
										{prerequisite}
									</Typography>
								)}
							</Stack>
						))
					)}
				</Box>
			</Container>
			<Container maxWidth="sm">
				<Typography
					variant="h4"
					sx={{
						textAlign: window.innerWidth > 600 ? "left" : "center",
						my: 5,
					}}>
					What You'll Learn{" "}
				</Typography>
				<Box
					spacing={2}
					alignItems="center"
					justifyContent={window.innerWidth > 600 ? "left" : "center"}
					sx={{
						display: "grid",
						gridTemplateColumns:
							window.innerWidth > 600 ? "repeat(2,1fr)" : "1",
						gridGap: "0",
						gridTemplateRows:
							window.innerWidth > 600
								? "repeat(6,minmax(50px, 1fr))"
								: "repeat(12,minmax(50px, 1fr))",
					}}>
					{course.skills?.map((skill) => (
						<Stack
							direction="row"
							spacing={1}
							alignItems="center"
							color="text.secondary">
							<ChecklistRtlIcon />
							{loading ? (
								<Skeleton
									variant="text"
									animation="wave"
									sx={{
										width: "80%",
										// height: "100%",
									}}
								/>
							) : (
								<Typography
									variant="body1"
									color="text.secondary"
									sx={{
										textAlign:
											window.innerWidth > 600
												? "left"
												: "center",
										my: 3,
									}}>
									{skill}
								</Typography>
							)}
						</Stack>
					))}
				</Box>
			</Container>
		</Stack>
	);
};

export default CoursePrerequisitesAndSkills;
