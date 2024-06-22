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
import { Check, CloudUpload } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import Popup from "../Popup/Popup";
import { set } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";

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

	const [video, setVideo] = useState<File | undefined>(undefined);
	const [openModuleForm, setOpenModuleForm] = useState(false);

	const popupFunction = () => {
		queryClient.invalidateQueries({
			queryKey: ["sections", { courseId }],
		});
	};

	const handleOpenModuleForm = () => setOpenModuleForm(true);
	const handleCloseModuleForm = () => {
		setOpenModuleForm(false);
		setVideo(undefined);
	};

	const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVideo(e?.target?.files?.[0]);
		console.log(e?.target?.files?.[0]);
	};

	const queryClient = useQueryClient();

	const {
		mutate: mutateModule,
		isError: isModuleError,
		isPending: isPendingModule,
		isSuccess: isModuleSuccess,
	} = useMutation({
		mutationFn: (data: FormData) => {
			return api.post(
				`/courses/${courseId}/sections/${sectionId}/modules/${moduleNumber}/video`,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
		},
		onSuccess: (response) => {
			setOpenModuleForm(false);
		},
		onError: (error) => {
			console.error(error);
			//alert("An error occurred. Please try again.");
		},
	});

	const handleUploadModuleVideo = async () => {
		if (!video) return;

		const videoData = new FormData();

		videoData.append("video", video);

		mutateModule(videoData);
	};

	return (
		<>
			<Button
				sx={{ color: "black" }}
				startIcon={<CloudUpload />}
				onClick={handleOpenModuleForm}
			>
				Upload Module Video
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
						heading="Upload Module Video"
						headingAlignment="left"
						sx={{ mb: 0, textAlign: "left" }}
					/>
					<SectionHeader
						heading="Upload the video for this module."
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
							disabled={isPendingModule}
							startIcon={<CloudUpload />}
							sx={{
								mb: 2,
								color: "black",
								backgroundColor: video ? "lightgray" : "",
							}}
						>
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
						<Button
							onClick={handleUploadModuleVideo}
							fullWidth
							color="primary"
							variant="contained"
							disableElevation
							disabled={isPendingModule}
							endIcon={!isModuleError && <Check />}
							size="large"
						>
							{isModuleError ? (
								"Something went wrong..."
							) : isPendingModule ? (
								<CircularProgress size={24} />
							) : isModuleSuccess ? (
								"Uploaded!"
							) : (
								"Upload Video"
							)}
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
			<Popup
				heading="Success!"
				content="video uploaded successfully!"
				openPopup={isModuleSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
			<Popup
				heading="Something went wrong..."
				content="A problem occurred while processing your request. Please try again."
				openPopup={isModuleError}
				buttonText="Close"
				error={true}
				popupFunction={() => {}}
			/>
		</>
	);
};

export default UploadModuleVideosForm;
