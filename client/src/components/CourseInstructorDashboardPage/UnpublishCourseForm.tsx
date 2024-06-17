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
import { useQuery } from "@tanstack/react-query";
import DialogForm from "../Popup/DialogForm";

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

function UnpublishCourseForm(props: PublishCourseFormProps) {
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

	const {
		data, //: courses,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["courseEnrollments", { course: courseId }],
		queryFn: async () =>
			await api.get("/enrollments", {
				params: {
					course: courseId,
				},
			}),
		select: (response: any) => response.data.data.data,
	});

	const enrolledStudents = data;

	const {
		mutate: publishCourse,
		isError: isModuleError,
		isPending: isPendingModule,
		isSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.patch(`/courses/${courseId}`, {
				published: false,
			});
		},
		onSuccess: () => {
			handleClosePublishForm();
		},
	});

	const unpublishCourseContent =
		"Remove the course from the catalog.Note that if a student is currently enrolled in the course, they will still have access to the course content.\nAre you sure you want to unpublish this Course?";

	const handleUnpublishCourse = async () => {
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
				// disabled={enrolledStudents?.length > 0}
			>
				Unpublish Course
			</Button>
			{/* <Dialog
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
						heading="Unpublish Course"
						headingAlignment="left"
						sx={{ mb: 0, textAlign: "left" }}
					/>
					<SectionHeader
						heading="Remove the course from the catalog."
						headingAlignment="left"
						variant="h6"
						isSubHeading
						sx={{ mb: 0, textAlign: "left" }}
					/>
				</DialogTitle>
				<DialogContent>
					<SectionHeader
						heading="Note that if a student is currently enrolled in the course, they will still have access to the course content."
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
							Are you sure you want to unpublish this Course?
						</Button>
					</Stack>
				</DialogContent>
			</Dialog> */}
			<DialogForm
				openDialog={openPublishForm}
				closeDialog={handleClosePublishForm}
				heading="Unpublish Course"
				content={unpublishCourseContent}
				dialogFunction={handleUnpublishCourse}
			/>
			<Popup
				heading="Success!"
				content="Course Unpublished successfully!"
				openPopup={isSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
			<Popup
				heading="Error!"
				content="An error occurred. Please try again."
				openPopup={isError}
				buttonText="Ok!"
				popupFunction={() => {}}
			/>
		</>
	);
}

export default UnpublishCourseForm;
