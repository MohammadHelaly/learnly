import {
	Typography,
	Stack,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { CloudUpload, ExpandMore, PlayCircle } from "@mui/icons-material";
import UpdateSectionsForm from "./UpdateSectionsForm";
import UpdateModulesForm from "./UpdateModulesForm";
import StyledNavLink from "../UI/Links/StyledNavLink";
import UploadModuleVideosForm from "./UploadModuleVideosForm";

interface UpdateCourseContentFormProps {
	courseId: number | string;
}

const UpdateCourseContentForm = (props: UpdateCourseContentFormProps) => {
	const { courseId } = props;

	const {
		data: sections,
		isLoading, //isError
		isError: isGetError,
	} = useQuery({
		queryKey: ["sections", { courseId }],
		queryFn: async () =>
			await api.get(`courses/${courseId}`, {
				params: {
					fields: "sections",
				},
			}),
		select: (response) => response.data.data.data.sections,
	});

	return (
		<Stack alignItems="center">
			{sections?.map((section: Section, index: number) => {
				const { id, title, description, modules, duration } = section;
				return (
					<Accordion
						key={id + "-accordion"}
						disableGutters={true}
						sx={{
							width: "100%",
							boxShadow: "none !important",
							overflow: "hidden",
							border: 1,
							borderBottom:
								index === sections.length - 1 ? 1 : "none", // Add bottom border for the last one
							borderColor: "divider",
						}}>
						<AccordionSummary
							key={id + "-summary"}
							expandIcon={<ExpandMore />}
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
									{title}
								</Typography>
								<Typography
									variant="body1"
									color="text.secondary"
									sx={{
										fontWeight: "400",
									}}>
									{`${modules?.length} Modules • ${
										duration ?? 0
									} Hours`}
								</Typography>
							</Stack>
						</AccordionSummary>
						<AccordionDetails
							key={id + "-details"}
							sx={{
								borderTop: 1,
								borderColor: "divider",
							}}>
							<Typography variant="h6" color="text.secondary">
								{description}
							</Typography>
						</AccordionDetails>
						{modules?.map((module: Module, index: number) => (
							<AccordionDetails key={index + "-" + module.title}>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="space-between">
									{module?.video?.url ? (
										<StyledNavLink
											to={module?.video?.url}
											rel="noreferrer"
											target="_blank"
											sx={{
												display: "flex",
												flexDirection: "row",
												alignItems: "center",
												gap: 1,
												"&:hover": {
													textDecoration: "underline",
												},
											}}>
											<PlayCircle fontSize="small" />
											<Typography variant="body1">
												{module?.title}
											</Typography>
										</StyledNavLink>
									) : (
										<Typography variant="body1">
											{module?.title}
										</Typography>
									)}
									<Stack direction="row" alignItems="center">
										<UploadModuleVideosForm
											courseId={courseId}
											sectionId={id}
											moduleNumber={index}
										/>
										{/* <Button
												sx={{ color: "black" }}
												// onClick={handleOpenModuleForm}
											>
												<CloudUpload />
												<Typography
													variant="body1"
													sx={{
														ml: 1,
														fontWeight: "400",
													}}>
													Upload Module Video
												</Typography>
											</Button> */}
									</Stack>
								</Stack>
							</AccordionDetails>
						))}
						<AccordionDetails>
							<UpdateModulesForm
								courseId={courseId}
								sectionId={id}
							/>
						</AccordionDetails>
					</Accordion>
				);
			})}
			<UpdateSectionsForm courseId={courseId} />
		</Stack>
	);
};

export default UpdateCourseContentForm;
