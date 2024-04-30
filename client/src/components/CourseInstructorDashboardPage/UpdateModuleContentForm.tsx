import React, { useState } from "react";
import {
	Button,
	Typography,
	Slide,
	Stack,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	SlideProps,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import { TransitionProps } from "@mui/material/transitions";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../../api";
import { Add, Check } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useForm, Controller } from "react-hook-form";

interface UpdateModuleContentFormProps {
	courseId: number | string;
	title: string | undefined;
	sectionid: number | string;
	moduleIndex: number;
	modules: Module[];
}

const moduleSchema = z.object({
	title: z
		.string()
		.min(3, "Title is too short")
		.max(100, "Title is too long"),
});

type AddModuleSchema = z.infer<typeof moduleSchema>;

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function UpdateModuleContentForm(props: UpdateModuleContentFormProps) {
	const { title, sectionid, moduleIndex, modules, courseId } = props;

	const [openModuleForm, setOpenModuleForm] = useState(false);

	const {
		control: sectionControl,
		handleSubmit: handleSectionSubmit,

		formState: { errors: sectionErrors },
	} = useForm<AddModuleSchema>({
		mode: "onBlur",
		defaultValues: {
			title: title,
		},
		resolver: zodResolver(moduleSchema),
	});

	const queryClient = useQueryClient();

	const handleOpenModuleForm = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.stopPropagation();
		setOpenModuleForm(true);
	};

	const handleCloseModuleForm = (
		event?: React.MouseEvent<HTMLButtonElement>
	) => {
		if (event) {
			event.stopPropagation();
		}
		setOpenModuleForm(false);
		//resetSection();
	};

	const {
		mutate: mutateSection,
		isError: isMutateSectionError,
		isPending: isPendingSection,
		isSuccess,
	} = useMutation({
		mutationFn: (data: any) => {
			return api.patch(`/courses/${courseId}/sections/${sectionid}`, {
				modules: data,
			});
		},
		onSuccess: (response) => {
			alert("Module updated successfully");
			queryClient.invalidateQueries({
				queryKey: ["sections", { courseId }],
			});
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const onSubmitSection = (data: AddModuleSchema) => {
		modules[moduleIndex].title = data.title;
		mutateSection(modules);
		handleCloseModuleForm();
	};

	return (
		<>
			<Button
				sx={{ pl: 3, color: "black" }}
				startIcon={<EditIcon />}
				onClick={handleOpenModuleForm}
			></Button>
			<Dialog
				open={openModuleForm}
				TransitionComponent={Transition}
				keepMounted
				onClose={(
					event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
					reason: "backdropClick" | "escapeKeyDown"
				) => handleCloseModuleForm(event)}
				aria-describedby="success-dialog-slide-description"
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>
					<SectionHeader
						heading="Modify Module Information"
						headingAlignment="left"
						sx={{ mb: 0 }}
					/>
					<SectionHeader
						heading="Update the Module Title "
						isSubHeading
						variant="h6"
						headingAlignment="left"
						sx={{ mb: 0 }}
					/>
				</DialogTitle>
				<DialogContent>
					<form
						onSubmit={handleSectionSubmit(onSubmitSection)}
						autoComplete="off"
						noValidate
					>
						<Stack spacing={2} paddingTop={2}>
							<Controller
								name="title"
								control={sectionControl}
								render={({ field }) => (
									<TextField
										{...field}
										id="outlined-basic"
										label="Module Title"
										variant="outlined"
										error={!!sectionErrors.title}
										helperText={
											sectionErrors.title?.message
										}
									/>
								)}
							/>

							<Button
								endIcon={<Check />}
								color="primary"
								variant="contained"
								disableElevation
								size="large"
								type="submit"
								fullWidth
							>
								Update Module
							</Button>
						</Stack>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default UpdateModuleContentForm;
