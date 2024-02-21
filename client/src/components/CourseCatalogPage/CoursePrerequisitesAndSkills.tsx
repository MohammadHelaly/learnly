import {
	Box,
	Container,
	Typography,
	Skeleton,
	Stack,
	Grid,
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import SectionHeader from "../UI/SectionHeader";
import SectionWrapper from "../UI/SectionWrapper";
import ErrorWarning from "../UI/ErrorWarning";

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
		<SectionWrapper>
			<Stack
				direction={window.innerWidth > 600 ? "row" : "column"}
				spacing={4}
				alignItems="flex-start"
				justifyContent="space-between">
				{
					// isError ? (
					// 	<ErrorWarning />
					// ) :
					<>
						<Container
							maxWidth="sm"
							sx={{
								px: "0px !important",
							}}>
							<SectionHeader
								heading="Prerequisites"
								headingAlignment="left"
							/>
							<Grid
								container
								direction="row"
								rowSpacing="20px"
								alignItems="left"
								justifyContent="left">
								{isLoading ? (
									Array(9)
										.fill(null)
										.map((_, index) => (
											<Grid
												item
												xs={12}
												sm={6}
												key={index + "prerequisite"}>
												<Stack
													direction="row"
													spacing={1}
													alignItems="center"
													color="text.secondary">
													<ChecklistIcon />
													<Skeleton
														variant="text"
														animation="wave"
														sx={{
															width: "80%",
														}}
													/>
												</Stack>
											</Grid>
										))
								) : prerequisites?.length === 0 ||
								  !prerequisites ? (
									<Grid item xs={12} sm={6}>
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
									</Grid>
								) : (
									prerequisites?.map(
										(prerequisite, index) => (
											<Grid
												item
												xs={12}
												sm={6}
												key={index + "prerequisite"}>
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
																window.innerWidth >
																600
																	? "left"
																	: "center",
															my: 3,
														}}>
														{prerequisite}
													</Typography>
												</Stack>
											</Grid>
										)
									)
								)}
							</Grid>
						</Container>
						<Container
							maxWidth="sm"
							sx={{
								px: "0px !important",
							}}>
							<SectionHeader
								heading="What You'll Learn"
								headingAlignment="left"
							/>
							<Grid
								container
								direction="row"
								rowSpacing="20px"
								alignItems="left"
								justifyContent="left">
								{isLoading
									? Array(11)
											.fill(null)
											.map((_, index) => (
												<Grid
													item
													xs={12}
													sm={6}
													key={index + "skill"}>
													<Stack
														direction="row"
														spacing={1}
														alignItems="center"
														color="text.secondary">
														<ChecklistRtlIcon />
														<Skeleton
															variant="text"
															animation="wave"
															sx={{
																width: "80%",
															}}
														/>
													</Stack>
												</Grid>
											))
									: skills?.map((skill, index) => (
											<Grid
												item
												xs={12}
												sm={6}
												key={index + "skill"}>
												<Stack
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
																	window.innerWidth >
																	600
																		? "left"
																		: "center",
																my: 3,
															}}>
															{skill}
														</Typography>
													)}
												</Stack>
											</Grid>
									  ))}
							</Grid>
						</Container>
					</>
				}
			</Stack>
		</SectionWrapper>
	);
};

export default CoursePrerequisitesAndSkills;
