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
import SectionHeader from "../UI/PageLayout/SectionHeader";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import ErrorWarning from "../UI/Messages/ErrorWarning";
import CheckListItem from "../UI/Courses/CheckListItem";

interface CoursePrerequisitesAndSkillsProps
	extends Pick<Course, "prerequisites" | "skills"> {
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
				{isError ? (
					<ErrorWarning />
				) : (
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
												<CheckListItem skeleton />
											</Grid>
										))
								) : prerequisites?.length === 0 ||
								  !prerequisites ? (
									<Grid item xs={12} sm={6}>
										<CheckListItem item="No prerequisites needed." />
									</Grid>
								) : (
									prerequisites?.map(
										(prerequisite, index) => (
											<Grid
												item
												xs={12}
												sm={6}
												key={index + "prerequisite"}>
												<CheckListItem
													item={prerequisite}
												/>
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
													<CheckListItem skeleton />
												</Grid>
											))
									: skills?.map((skill, index) => (
											<Grid
												item
												xs={12}
												sm={6}
												key={index + "skill"}>
												<CheckListItem item={skill} />
											</Grid>
									  ))}
							</Grid>
						</Container>
					</>
				)}
			</Stack>
		</SectionWrapper>
	);
};

export default CoursePrerequisitesAndSkills;
