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
import { Add } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UpdateSectionsFormProps {
	courseId: number | string;
}

const sectionSchema = z.object({
	title: z
		.string()
		.min(3, "Title is too short")
		.max(100, "Title is too long"),
	description: z
		.string()
		.min(24, "Description is too short")
		.max(200, "Description is too long"),
});

type AddSectionSchema = z.infer<typeof sectionSchema>;

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateSectionsForm = (props: UpdateSectionsFormProps) => {
	const { courseId } = props;

	const [openSectionForm, setOpenSectionForm] = useState(false);

	const {
		control: sectionControl,
		handleSubmit: handleSectionSubmit,
		reset: resetSection,
		formState: { errors: sectionErrors },
	} = useForm<AddSectionSchema>({
		mode: "onBlur",
		defaultValues: {
			title: "",
			description: "",
		},
		resolver: zodResolver(sectionSchema),
	});

	const queryClient = useQueryClient();

	const handleOpenSectionForm = () => setOpenSectionForm(true);
	const handleCloseSectionForm = () => setOpenSectionForm(false);

	const {
		mutate: mutateSection,
		isError: isMutateSectionError,
		isPending: isPendingSection,
	} = useMutation({
		mutationFn: (data: Pick<Section, "title" | "description">) => {
			return api.post(`/courses/${courseId}/sections`, {
				...data,
			});
		},
		onSuccess: (response) => {
			alert("Section added successfully");
			queryClient.invalidateQueries({
				queryKey: ["sections", { courseId }],
			});
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const onSubmitSection = (data: AddSectionSchema) => {
		mutateSection(data);
		resetSection();
		handleCloseSectionForm();
	};

	return (
		<>
			<Button
				disabled={isPendingSection}
				fullWidth
				size="large"
				sx={{ color: "black", height: 56 }}
				onClick={handleOpenSectionForm}>
				<Add />
				<Typography
					variant="h6"
					sx={{
						ml: 1,
						fontWeight: "400",
					}}>
					Add new Section
				</Typography>
			</Button>
			<Dialog
				open={openSectionForm}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleCloseSectionForm}
				aria-describedby="success-dialog-slide-description"
				maxWidth="sm"
				fullWidth>
				<form
					onSubmit={handleSectionSubmit(onSubmitSection)}
					autoComplete="off"
					noValidate>
					<DialogTitle>
						<SectionHeader
							heading="Add New Section"
							headingAlignment="left"
							sx={{ mb: 0, textAlign: "left" }}
						/>
					</DialogTitle>
					<DialogContent>
						<Stack spacing={2} paddingTop={2}>
							<Controller
								name="title"
								control={sectionControl}
								render={({ field }) => (
									<TextField
										{...field}
										id="outlined-basic"
										label="Section Title"
										variant="outlined"
										error={!!sectionErrors.title}
										helperText={
											sectionErrors.title?.message
										}
									/>
								)}
							/>
							<Controller
								name="description"
								control={sectionControl}
								render={({ field }) => (
									<TextField
										{...field}
										id="outlined-multiline-static"
										label="Section Description"
										multiline
										rows={4}
										variant="outlined"
										error={!!sectionErrors.description}
										helperText={
											sectionErrors.description?.message
										}
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
							fullWidth>
							Save
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default UpdateSectionsForm;
