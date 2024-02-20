import { Box, Container, Typography, Skeleton, Stack } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";

interface CoursePrerequisitesAndSkillsProps {
	prerequisites: string[];
	skills: string[];
	isLoading: boolean;
	isError: boolean;
}

const CoursePrerequisitesAndSkills = (
	props: CoursePrerequisitesAndSkillsProps
) => {
	const { prerequisites, skills, isLoading, isError } = props;

	return (
		<Stack
			direction={window.innerWidth > 600 ? "row" : "column"}
			spacing={4}
			alignItems="flex-start"
			justifyContent="space-between">
			<Container
				maxWidth="sm"
				sx={{
					px: "0px !important",
				}}>
				<Typography
					variant="h4"
					sx={{
						textAlign: window.innerWidth > 600 ? "left" : "center",
						my: 5,
					}}>
					Prerequisites{" "}
				</Typography>
				<Box
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
					{prerequisites?.length === 0 || !prerequisites ? (
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
						prerequisites?.map((prerequisite, index) => (
							<Stack
								key={index + "prerequisite"}
								direction="row"
								spacing={1}
								alignItems="center"
								color="text.secondary">
								<ChecklistIcon />
								{isLoading ? (
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
			<Container
				maxWidth="sm"
				sx={{
					px: "0px !important",
				}}>
				<Typography
					variant="h4"
					sx={{
						textAlign: window.innerWidth > 600 ? "left" : "center",
						my: 5,
					}}>
					What You'll Learn{" "}
				</Typography>
				<Box
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
					{skills?.map((skill, index) => (
						<Stack
							key={index + "skill"}
							direction="row"
							spacing={1}
							alignItems="center"
							color="text.secondary">
							<ChecklistRtlIcon />
							{isLoading ? (
								<Skeleton
									variant="text"
									animation="wave"
									sx={{
										width: "80%",
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
