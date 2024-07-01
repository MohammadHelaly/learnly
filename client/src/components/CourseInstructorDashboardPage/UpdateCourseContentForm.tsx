import {
	Typography,
	Stack,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import {
	AllOutSharp,
	CloudUpload,
	ExpandMore,
	PlayCircle,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import UpdateSectionsForm from "./UpdateSectionsForm";
import UpdateModulesForm from "./UpdateModulesForm";
import StyledNavLink from "../UI/Links/StyledNavLink";
import UploadModuleVideosForm from "./UploadModuleVideosForm";
import DeleteModuleVideoForm from "./DeleteModuleVideoForm";
import DeleteModule from "./DeleteModule";
import DeleteSectionForm from "./DeleteSectionForm";
import UpdateSectionContentForm from "./UpdateSectionContentForm";
import EditIcon from "@mui/icons-material/Edit";
import UpdateModuleContentForm from "./UpdateModuleContentForm";
import FormContainer from "../UI/PageLayout/FormContainer";
import formatDuration from "../../utils/formatDuration";
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

	const [sectionsContents, setSectionsContents] = useState([] as Section[]);

	const handleSectionDrag = (
		e: React.DragEvent<HTMLDivElement>,
		index: number
	) => {
		e.dataTransfer.setData("itemIndex", index.toString());
	};

	const handleSectionDrop = async (
		e: React.DragEvent<HTMLDivElement>,
		index: number
	) => {
		const movingSectionIndex = Number(e.dataTransfer.getData("itemIndex"));
		const targetItemIndex = index;
		let allSections = [...sectionsContents];

		let movingSection = allSections[movingSectionIndex];
		allSections.splice(movingSectionIndex, 1);
		allSections.splice(targetItemIndex, 0, movingSection);
		setSectionsContents(allSections);

		await api.patch(`courses/${courseId}`, {
			sections: allSections,
		});
	};

	const handleModuleDrag = (
		e: React.DragEvent<HTMLDivElement>,
		index: number,
		sectionId: number | string
	) => {
		e.dataTransfer.setData("moduleId", index.toString());
		e.dataTransfer.setData("sectionId", sectionId.toString());
	};

	const handleModuleDrop = async (
		e: React.DragEvent<HTMLDivElement>,
		index: number,
		sectionId: number | string
	) => {
		const movingModuleIndex = Number(e.dataTransfer.getData("moduleId"));
		const movingSectionId = e.dataTransfer.getData("sectionId");
		if (sectionId === movingSectionId) {
			const updatedSections = sectionsContents.map((section) => {
				if (section.id === sectionId) {
					const updatedModules = [...section.modules];
					const movedModule = updatedModules.splice(
						movingModuleIndex,
						1
					)[0];
					updatedModules.splice(index, 0, movedModule);
					return {
						...section,
						modules: updatedModules,
					};
				}
				return section;
			});
			setSectionsContents(updatedSections);

			await api.patch(`sections/${sectionId}`, {
				modules: updatedSections.find(
					(section) => section.id === sectionId
				)?.modules,
			});
		}
	};

	// const handleSectionRemoval = async (sectionId: number | string) => {
	// 	const section = sectionsContents.find(
	// 		(section) => section.id === sectionId
	// 	);

	// 	section?.modules?.forEach(async (modules, index) => {
	// 		if (modules?.video?.url) {
	// 			await api.delete(
	// 				`sections/${sectionId}/modules/${index}/video`
	// 			);
	// 		}
	// 	});

	// 	let updatedSections = sectionsContents.filter(
	// 		(section) => section.id !== sectionId
	// 	);

	// 	await api.delete(`sections/${sectionId}`);
	// 	alert("Section removed");

	// 	setSectionsContents(updatedSections);
	// };

	useEffect(() => {
		if (sections) {
			let updatedSections = sections;

			setSectionsContents(updatedSections);
			let totalDuration = 0;
			for (let i = 0; i < updatedSections.length; i++) {
				totalDuration += updatedSections[i].duration;
			}
			api.patch(`courses/${courseId}`, {
				duration: totalDuration,
			});
		}
	}, [sections]);

	return (
		<FormContainer
			large
			sx={{ mx: "auto", px: window.innerWidth < 600 ? 0 : 2 }}>
			{sectionsContents?.map((section: Section, index: number) => {
				const { id, title, description, modules, duration } = section;

				return (
					<Accordion
						onDragOver={(e) => e.preventDefault()}
						draggable={true}
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
							draggable={true}
							onDragStart={(e) => handleSectionDrag(e, index)}
							onDrop={(e) => handleSectionDrop(e, index)}
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
								{" "}
								<UpdateSectionContentForm
									title={title}
									description={description}
									sectionid={id}
									courseId={courseId}
								/>
								<Typography
									variant="body1"
									color="text.secondary"
									sx={{
										fontWeight: "400",
									}}>
									{`${
										modules?.length
									} Modules • ${formatDuration(duration)}`}
								</Typography>
							</Stack>
							{/* <Button onClick={() => handleSectionRemoval(id)}>
								<RemoveCircleOutlineIcon />
							</Button> */}
							<DeleteSectionForm
								courseId={courseId}
								sectionId={section.id}
								section={section}
							/>
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
							<AccordionDetails
								onDragOver={(e) => e.preventDefault()}
								key={index + "-" + module.title}
								draggable={true}
								onDragStart={(e) =>
									handleModuleDrag(e, index, id)
								}
								onDrop={(e) => handleModuleDrop(e, index, id)}>
								{" "}
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="space-between">
									{module?.video?.url ? (
										<Stack direction="row">
											<UpdateModuleContentForm
												title={module?.title}
												sectionid={section.id}
												moduleIndex={index}
												modules={section.modules}
												courseId={courseId}
											/>
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
														textDecoration:
															"underline",
													},
												}}>
												{" "}
												<PlayCircle fontSize="small" />
												<Typography variant="body1">
													{module?.title}
												</Typography>
											</StyledNavLink>
										</Stack>
									) : (
										<Typography variant="body1">
											<UpdateModuleContentForm
												title={module?.title}
												sectionid={section.id}
												moduleIndex={index}
												modules={section.modules}
												courseId={courseId}
											/>
											{module?.title}
										</Typography>
									)}
									{module?.video?.url ? (
										<Stack
											direction="row"
											alignItems="center">
											<DeleteModuleVideoForm
												courseId={courseId}
												sectionId={id}
												moduleNumber={index}
											/>
										</Stack>
									) : (
										<Stack
											direction="row"
											alignItems="center">
											<UploadModuleVideosForm
												courseId={courseId}
												sectionId={id}
												moduleNumber={index}
											/>
											<DeleteModule
												courseId={courseId}
												sectionId={id}
												moduleNumber={index}
											/>
										</Stack>
									)}
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
		</FormContainer>
	);
};

export default UpdateCourseContentForm;
