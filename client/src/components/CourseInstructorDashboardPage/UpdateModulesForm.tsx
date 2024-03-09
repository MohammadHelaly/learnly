import React, { useState } from "react";
import {
	Typography,
	Stack,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Slide,
	TextField,
} from "@mui/material";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import { TransitionProps } from "@mui/material/transitions";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../../api";
import { AddCircleOutlined } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UpdateModulesFormProps {
	courseId: number | string;
	sectionId: number | string;
}

const moduleSchema = z.object({
	title: z
		.string()
		.min(3, "Title is too short")
		.max(100, "Title is too long"),
	path: z.string().min(3, "Path is too short"),
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

const UpdateModulesForm = (props: UpdateModulesFormProps) => {
	const { courseId, sectionId } = props;

	const [openModuleForm, setOpenModuleForm] = useState(false);

	const {
		control: moduleControl,
		handleSubmit: moduleHandleSubmit,
		reset: resetModule,
		formState: { errors: moduleErrors },
	} = useForm<AddModuleSchema>({
		mode: "onBlur",
		defaultValues: {
			title: "",
			path: "",
		},
		resolver: zodResolver(moduleSchema),
	});

	const queryClient = useQueryClient();

	const handleOpenModuleForm = () => setOpenModuleForm(true);
	const handleCloseModuleForm = () => setOpenModuleForm(false);

	const {
		mutate: mutateModule,
		isError: isMutateModuleError,
		isPending: isPendingModule,
	} = useMutation({
		mutationFn: (data: any) => {
			//// <----- CHANGE THIS
			return api.patch(`/courses/${courseId}/sections/${sectionId}`, {
				...data,
			});
		},
		onSuccess: (response) => {
			alert("Module added successfully");
			queryClient.invalidateQueries({
				queryKey: ["sections", { courseId }],
			});
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const onSubmitModule = (data: AddModuleSchema) => {
		mutateModule(data);
		handleCloseModuleForm();
		resetModule();
	};

	return (
		<>
			<Button
				disabled={isPendingModule}
				sx={{ color: "black" }}
				onClick={handleOpenModuleForm}>
				<AddCircleOutlined />
				<Typography
					variant="h6"
					sx={{
						fontWeight: "400",
					}}>
					Add New Module
				</Typography>
			</Button>
			<Dialog
				open={openModuleForm}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleCloseModuleForm}
				aria-describedby="success-dialog-slide-description"
				maxWidth="sm"
				fullWidth>
				<form
					onSubmit={moduleHandleSubmit(onSubmitModule)}
					autoComplete="off"
					noValidate>
					<DialogTitle>
						<SectionHeader
							heading="Add New Module"
							headingAlignment="left"
							sx={{ mb: 0, textAlign: "left" }}
						/>
					</DialogTitle>
					<DialogContent>
						<Stack spacing={2} paddingTop={2}>
							<Controller
								name="title"
								control={moduleControl}
								render={({ field }) => (
									<TextField
										{...field}
										id="outlined-basic"
										label="Module Title"
										variant="outlined"
										error={!!moduleErrors.title}
										helperText={moduleErrors.title?.message}
									/>
								)}
							/>
							<Controller
								name="path"
								control={moduleControl}
								render={({ field }) => (
									<TextField
										{...field}
										id="outlined-multiline-static"
										label="Module path"
										multiline
										rows={4}
										variant="outlined"
										error={!!moduleErrors.path}
										helperText={moduleErrors.path?.message}
									/>
								)}
							/>
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button
							color="primary"
							variant="contained"
							disableElevation
							size="large"
							type="submit"
							sx={{ mr: 2 }}>
							Save
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default UpdateModulesForm;
