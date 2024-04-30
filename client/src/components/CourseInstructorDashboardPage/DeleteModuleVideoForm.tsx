import React, { useState } from "react";
import {
	Stack,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Check, CloudUpload, Delete } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import SectionHeader from "../UI/PageLayout/SectionHeader";

interface DeleteModuleVideosFormProps {
	courseId: number | string;
	sectionId: number | string;
	moduleNumber: number;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteModuleVideoForm = (props: DeleteModuleVideosFormProps) => {
	const { courseId, sectionId, moduleNumber } = props;

	const [openModuleForm, setOpenModuleForm] = useState(false);

	const handleOpenModuleForm = () => setOpenModuleForm(true);
	const handleCloseModuleForm = () => {
		setOpenModuleForm(false);
	};

	const queryClient = useQueryClient();

	const {
		mutate: deleteVideo,
		isError: isModuleError,
		isPending: isPendingModule,
		isSuccess: isModuleSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.patch(
				`/courses/${courseId}/sections/${sectionId}/modules/${moduleNumber}/video`
			);
		},
		onSuccess: () => {
			alert("Video deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["sections", { courseId }],
			});
		},
	});

	return (
		<>
			<Button
				sx={{ color: "black" }}
				startIcon={<DeleteIcon />}
				onClick={handleOpenModuleForm}
			>
				Remove Module Video
			</Button>
			<Dialog
				open={openModuleForm}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleCloseModuleForm}
				aria-describedby="success-dialog-slide-description"
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>
					<SectionHeader
						heading="Delete Module Video"
						headingAlignment="left"
						sx={{ mb: 0, textAlign: "left" }}
					/>
					<SectionHeader
						heading="Delete the video for this module."
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
							startIcon={<DeleteIcon />}
							onClick={() => {
								deleteVideo();
							}}
							sx={{
								mb: 2,
								color: "white",
							}}
						>
							Are you sure you want to delete this video?
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default DeleteModuleVideoForm;
