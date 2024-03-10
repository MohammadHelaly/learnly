import React, { useState } from "react";
import {
	Stack,
	Button,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { CloudUpload } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import SectionHeader from "../UI/PageLayout/SectionHeader";

interface UploadModuleVideosFormProps {
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

const UploadModuleVideosForm = (props: UploadModuleVideosFormProps) => {
	const { courseId, sectionId, moduleNumber } = props;

	const [video, setVideo] = useState<any>(null);
	const [openModuleForm, setOpenModuleForm] = useState(false);

	const handleOpenModuleForm = () => setOpenModuleForm(true);
	const handleCloseModuleForm = () => setOpenModuleForm(false);

	const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVideo(e?.target?.files?.[0]);
		console.log(e?.target?.files?.[0]);
	};

	const queryClient = useQueryClient();

	const {
		mutate: mutateModule,
		isError: isModuleError,
		isPending: isPendingModule,
	} = useMutation({
		mutationFn: (data: FormData) => {
			return api.post(
				`/courses/${courseId}/sections/${sectionId}/modules/${moduleNumber}`,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
		},
		onSuccess: (response) => {
			alert("Module added successfully");
			console.log("Sent!");

			queryClient.invalidateQueries({
				queryKey: ["sections", { courseId }],
			});
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const handleUploadModuleVideo = async () => {
		const videoData = new FormData();

		videoData.append("video", video);

		mutateModule(videoData);
	};

	return (
		<>
			<Button sx={{ color: "black" }} onClick={handleOpenModuleForm}>
				<CloudUpload />
				<Typography
					variant="body1"
					sx={{
						ml: 1,
						fontWeight: "400",
					}}>
					Upload Module Video
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
				<DialogTitle>
					<SectionHeader
						heading="Add New Module"
						headingAlignment="left"
						sx={{ mb: 0, textAlign: "left" }}
					/>
				</DialogTitle>
				<DialogContent>
					<Stack spacing={2} paddingTop={2}>
						<Button
							component="label"
							fullWidth
							variant="contained"
							disableElevation
							size="large"
							disabled={isPendingModule}
							sx={{
								mb: 2,
							}}>
							{" "}
							Choose Video
							<input
								disabled={isPendingModule}
								accept="video/*"
								style={{ display: "none" }}
								multiple={false}
								type="file"
								hidden
								onChange={handleVideoChange}
							/>
						</Button>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleUploadModuleVideo}
						fullWidth
						color="primary"
						variant="contained"
						disableElevation
						disabled={isPendingModule}
						size="large">
						{isModuleError
							? "Something went wrong..."
							: isPendingModule
							? "Uploading..."
							: "Upload Video"}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default UploadModuleVideosForm;
