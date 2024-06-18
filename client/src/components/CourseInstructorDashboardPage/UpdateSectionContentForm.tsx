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
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import { TransitionProps } from "@mui/material/transitions";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../../api";
import { Add, Check, Edit } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import Popup from "../Popup/Popup";

interface UpdateSectionContentFormProps {
	title: string | undefined;
	description: string | undefined;
	sectionid: number | string;
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

function UpdateSectionContentForm(props: UpdateSectionContentFormProps) {
	const { title, description, sectionid, courseId } = props;

	const [openSectionForm, setOpenSectionForm] = useState(false);

	const {
		control: sectionControl,
		handleSubmit: handleSectionSubmit,

		formState: { errors: sectionErrors },
	} = useForm<AddSectionSchema>({
		mode: "onBlur",
		defaultValues: {
			title: title,
			description: description,
		},
		resolver: zodResolver(sectionSchema),
	});

	const queryClient = useQueryClient();

	const popupFunction = (type: any) => {
		queryClient.invalidateQueries({
			queryKey: ["sections", { courseId }],
		});
	};

	const handleOpenSectionForm = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.stopPropagation();
		setOpenSectionForm(true);
	};

	const handleCloseSectionForm = (
		event?: React.MouseEvent<HTMLButtonElement>
	) => {
		if (event) {
			event.stopPropagation();
		}
		setOpenSectionForm(false);
		//resetSection();
	};

	const {
		mutate: mutateSection,
		isError: isMutateSectionError,
		isPending: isPendingSection,
		isSuccess,
	} = useMutation({
		mutationFn: (data: Pick<Section, "title" | "description">) => {
			return api.patch(`/courses/${courseId}/sections/${sectionid}`, {
				...data,
			});
		},
		onSuccess: (response) => {},
		onError: (error) => {},
	});

	const onSubmitSection = (data: AddSectionSchema) => {
		mutateSection(data);
		handleCloseSectionForm();
	};

	return (
		<>
			<Button
				sx={{
					color: "common.black",
				}}
				endIcon={<Edit />}
				onClick={handleOpenSectionForm}
			>
				<Typography
					variant="h5"
					sx={{
						fontWeight: "400",
					}}
				>
					{title}
				</Typography>
			</Button>
			<Dialog
				open={openSectionForm}
				TransitionComponent={Transition}
				keepMounted
				onClose={(
					event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
					reason: "backdropClick" | "escapeKeyDown"
				) => handleCloseSectionForm(event)}
				aria-describedby="success-dialog-slide-description"
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>
					<SectionHeader
						heading="Modify Section Information"
						headingAlignment="left"
						sx={{ mb: 0 }}
					/>
					<SectionHeader
						heading="Update the Section Title and Description."
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
								Update Section
							</Button>
						</Stack>
					</form>
				</DialogContent>
			</Dialog>
			<Popup
				openPopup={isSuccess}
				heading="Success!"
				content="Section updated successfully"
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
			<Popup
				openPopup={isMutateSectionError}
				heading="Something went wrong..."
				content="A problem occurred while processing your request. Please try again."
				buttonText="Close"
				error={true}
				popupFunction={() => {}}
			/>
		</>
	);
}

export default UpdateSectionContentForm;
