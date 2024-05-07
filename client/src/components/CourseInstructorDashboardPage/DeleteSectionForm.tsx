import React, { useState } from "react";
import {
	Stack,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	Slide,
	IconButton,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Check, CloudUpload, Delete } from "@mui/icons-material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import Popup from "../Popup/Popup";
interface DeleteSectionFormProps {
	courseId: number | string;
	sectionId: number | string;
	section: Section;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteSectionForm = (props: DeleteSectionFormProps) => {
	const { courseId, sectionId, section } = props;

	const [openSectionForm, setOpenSectionForm] = useState(false);

	const handleOpenSectionForm = (
		event?: React.MouseEvent<HTMLButtonElement>
	) => {
		if (event) {
			event.stopPropagation();
		}
		setOpenSectionForm(true);
	};
	const handleCloseSectionForm = (
		event?: React.MouseEvent<HTMLButtonElement>
	) => {
		if (event) {
			event.stopPropagation();
		}
		setOpenSectionForm(false);
	};

	const queryClient = useQueryClient();
	const popupFunction = (type: any) => {
		queryClient.invalidateQueries({
			queryKey: ["sections", { courseId }],
		});
	};
	const {
		mutate: deleteSection,
		isError: isModuleError,
		isPending: isPendingModule,
		isSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.delete(`/courses/${courseId}/sections/${sectionId}`);
		},
		onSuccess: () => {
			setOpenSectionForm(false);
		},
	});

	const handleDeleteSection = async () => {
		section?.modules?.forEach(async (modules, index) => {
			if (modules?.video?.url) {
				await api.delete(
					`/courses/${courseId}/sections/${sectionId}/modules/${index}/video`
				);
			}
		});
		deleteSection();
	};

	return (
		<>
			<IconButton
				sx={{ color: "common.black", ml: 2 }}
				onClick={handleOpenSectionForm}>
				<RemoveCircleOutlineIcon />
			</IconButton>
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
				fullWidth>
				<DialogTitle>
					<SectionHeader
						heading="Delete Section"
						headingAlignment="left"
						sx={{ mb: 0, textAlign: "left" }}
					/>
					<SectionHeader
						heading="Remove the entire Section."
						headingAlignment="left"
						variant="h6"
						isSubHeading
						sx={{ mb: 0, textAlign: "left" }}
					/>
				</DialogTitle>
				<DialogContent>
					<Stack spacing={2} paddingTop={2}>
						<Button
							component="label"
							fullWidth
							disableElevation
							size="large"
							color="primary"
							variant="contained"
							disabled={isPendingModule}
							startIcon={<RemoveCircleOutlineIcon />}
							onClick={handleDeleteSection}
							sx={{
								mb: 2,
								color: "white",
							}}>
							Are you sure you want to remove this Section?
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
			<Popup
				content="Section removed successfully!"
				openPopup={isSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
		</>
	);
};

export default DeleteSectionForm;
