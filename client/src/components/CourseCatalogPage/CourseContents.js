import { Typography, Skeleton, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const CourseContents = (props) => {
	const {
		// course,
		loading,
	} = props;
	const course = {
		sections: [
			{
				title: "Section 1",
				description: "This is section 1",
				modules: [
					{ title: "Module 1" },
					{ title: "Module 2" },
					{ title: "Module 3" },
				],
				duration: 2,
			},
			{
				title: "Section 2",
				description: "This is section 2",
				modules: [
					{ title: "Module 1" },
					{ title: "Module 2" },
					{ title: "Module 3" },
				],
				duration: 2,
			},
			{
				title: "Section 3",
				description: "This is section 3",
				modules: [
					{ title: "Module 1" },
					{ title: "Module 2" },
					{ title: "Module 3" },
				],
			},
			{
				title: "Section 4",
				description: "This is section 4",
				modules: [
					{ title: "Module 1" },
					{ title: "Module 2" },
					{ title: "Module 3" },
				],
			},
		],
	};

	return (
		<>
			<Typography
				variant="h4"
				sx={{
					textAlign: window.innerWidth > 600 ? "left" : "center",
					my: 5,
				}}>
				Course Contents{" "}
			</Typography>

			{course?.sections?.map((section, index) => (
				<Accordion
					key={section.title}
					disableGutters={true}
					sx={{
						boxShadow: "none !important",
						border: `1px solid #dddddd`,
						borderBottom:
							index === course.sections.length - 1
								? `1px solid #dddddd`
								: "none", // Add bottom border for the last one
					}}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
						sx={{
							backgroundColor: "#f5f5f5",

							width: "100%",
							flexDirection: "row-reverse",
						}}>
						<Stack
							direction="row"
							spacing={1}
							alignItems="center"
							justifyContent="space-between"
							width="100%"
							sx={{
								ml: 1,
							}}>
							<Typography
								variant="h5"
								sx={{
									fontWeight: "400",
								}}>
								{loading ? (
									<Skeleton
										animation="wave"
										variant="text"
										height={48}
										width={200}
									/>
								) : (
									section.title
								)}
							</Typography>
							<Typography
								variant="body1"
								color="text.secondary"
								sx={{
									fontWeight: "400",
								}}>
								{loading ? (
									<Skeleton
										animation="wave"
										variant="text"
										height={48}
										width={200}
									/>
								) : (
									`${section.modules.length} Modules • ${section.duration} Hours`
								)}
							</Typography>
						</Stack>
					</AccordionSummary>
					<AccordionDetails
						sx={{
							borderTop: "1px solid #dddddd",
						}}>
						<Typography variant="h6" color="text.secondary">
							{loading ? (
								<>
									<Skeleton
										animation="wave"
										variant="text"
										// height={48}
										width={400}
									/>
									<Skeleton
										animation="wave"
										variant="text"
										// height={48}
										width={300}
									/>
								</>
							) : (
								section.description
							)}
						</Typography>
					</AccordionDetails>
					{section.modules.map((module) => (
						<AccordionDetails>
							<Stack
								direction="row"
								spacing={1}
								alignItems="center">
								<PlayCircleIcon fontSize="small" />
								<Typography variant="body1">
									{loading ? (
										<Skeleton
											animation="wave"
											variant="text"
											// height={48}
											width={300}
										/>
									) : (
										module.title
									)}
								</Typography>
							</Stack>
						</AccordionDetails>
					))}
				</Accordion>
			))}
		</>
	);
};

export default CourseContents;
