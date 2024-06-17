import React, { useState } from "react";
import {
	Typography,
	Stack,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	Slide,
	TextField,
	Box,
} from "@mui/material";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import Popup from "../Popup/Popup";
import { TransitionProps } from "@mui/material/transitions";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../../api";
import { Add, Check } from "@mui/icons-material";
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

	const popupFunction = (type: any) => {
		queryClient.invalidateQueries({
			queryKey: ["sections", { courseId }],
		});
	};

	const handleOpenSectionForm = () => setOpenSectionForm(true);
	const handleCloseSectionForm = () => {
		setOpenSectionForm(false);
		resetSection();
	};

	const {
		mutate: mutateSection,
		isError: isMutateSectionError,
		isPending: isPendingSection,
		isSuccess,
	} = useMutation({
		mutationFn: (data: Pick<Section, "title" | "description">) => {
			return api.post(`/courses/${courseId}/sections`, {
				...data,
			});
		},
		onSuccess: (response) => {
			//  queryClient.invalidateQueries({
			// 	queryKey: ["sections", { courseId }],
			// });
		},
		onError: (error) => {},
	});

	const onSubmitSection = (data: AddSectionSchema) => {
		mutateSection(data);
		handleCloseSectionForm();
	};

	return (
		<>
			<Button
				startIcon={<Add />}
				disabled={isPendingSection}
				fullWidth
				size="large"
				sx={{ color: "black", height: 56 }}
				onClick={handleOpenSectionForm}
			>
				<Typography
					variant="h6"
					sx={{
						fontWeight: "400",
					}}
				>
					Add New Section
				</Typography>
			</Button>
			<Dialog
				open={openSectionForm}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleCloseSectionForm}
				aria-describedby="success-dialog-slide-description"
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>
					<SectionHeader
						heading="Add New Section"
						headingAlignment="left"
						sx={{ mb: 0 }}
					/>
					<SectionHeader
						heading="Add a new section to your course. Sections are used to organize your course content into topics. You can add modules to each section."
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
							<Button
								endIcon={<Check />}
								color="primary"
								variant="contained"
								disableElevation
								size="large"
								type="submit"
								fullWidth
							>
								Save New Section
							</Button>
						</Stack>
					</form>
				</DialogContent>
			</Dialog>

			<Popup
				heading="Success!"
				content="Section created"
				openPopup={isSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
			<Popup
				heading="Error!"
				content="An error occurred. Please try again."
				openPopup={isMutateSectionError}
				buttonText="ok!"
				popupFunction={() => {}}
			/>
		</>
	);
};

export default UpdateSectionsForm;
