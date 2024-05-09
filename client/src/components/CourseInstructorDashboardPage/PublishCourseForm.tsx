import React from "react";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { m } from "framer-motion";

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
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface PublishCourseFormProps {
	courseName: string;
}

function PublishCourseForm(props: PublishCourseFormProps) {
	const { courseName } = props;
	const authContext = useContext(AuthContext);
	const { courseId } = useParams();
	const [openPublishForm, setOpenPublishForm] = useState(false);

	const handleOpenPublishForm = () => {
		setOpenPublishForm(true);
	};

	const handleClosePublishForm = () => {
		setOpenPublishForm(false);
	};

	const navigate = useNavigate();

	const queryClient = useQueryClient();
	const popupFunction = () => {
		navigate("/courses");
	};

	// const {
	// 	mutate: createChannel,
	// 	isError: isChannelError,
	// 	isPending: isPendingChannel,
	// 	isSuccess: isChannelSuccess,
	// } = useMutation({
	// 	mutationFn: () => {
	// 		return api.post(`/channels/`, {
	// 			course: courseId,
	// 			admins: [authContext.user?.id],
	// 			isCourseChannel: true,
	// 			name: courseName,
	// 		});
	// 	},
	// 	onSuccess: () => {},
	// });

	const {
		mutate: publishCourse,
		isError: isModuleError,
		isPending: isPendingModule,
		isSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.patch(`/courses/${courseId}`, {
				published: true,
			});
		},
		onSuccess: () => {
			handleClosePublishForm();
			// createChannel();
		},
	});

	const handlePublishCourse = async () => {
		publishCourse();
	};
	return (
		<>
			<Button
				variant="contained"
				fullWidth
				disableElevation
				size="large"
				color="error"
				sx={{ mb: 2 }}
				onClick={handleOpenPublishForm}
			>
				Publish Course
			</Button>
			<Dialog
				open={openPublishForm}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => handleClosePublishForm()}
				aria-describedby="success-dialog-slide-description"
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>
					<SectionHeader
						heading="Publish Course"
						headingAlignment="left"
						sx={{ mb: 0, textAlign: "left" }}
					/>
					<SectionHeader
						heading="Make course publicily available to students."
						headingAlignment="left"
						variant="h6"
						isSubHeading
						sx={{ mb: 0, textAlign: "left" }}
					/>
				</DialogTitle>
				<DialogContent>
					<SectionHeader
						heading="Note that if you unpublish the course later, enrolled students will still have access to the course content."
						headingAlignment="left"
						variant="h6"
						isSubHeading
						sx={{ mb: 0, textAlign: "left" }}
					/>
					<Stack spacing={2} paddingTop={2}>
						<Button
							component="label"
							fullWidth
							disableElevation
							size="large"
							color="error"
							variant="contained"
							disabled={isPendingModule}
							onClick={handlePublishCourse}
							sx={{
								mb: 2,
								color: "white",
							}}
						>
							Publish Course
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
			<Popup
				heading="Success!"
				content="Course published successfully!"
				openPopup={isSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
		</>
	);
}

export default PublishCourseForm;
