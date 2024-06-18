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
import DialogForm from "../Popup/DialogForm";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface CreateChannelFormProps {
	courseName: string;
}

function CreateChannelForm(props: CreateChannelFormProps) {
	const { courseName } = props;
	const { courseId } = useParams();
	const authContext = useContext(AuthContext);
	const [openCreateChannelhForm, setOpenCreateChannelhForm] = useState(false);

	const handleOpenCreateChannelForm = () => {
		setOpenCreateChannelhForm(true);
	};

	const handleCloseCreateChannelForm = () => {
		setOpenCreateChannelhForm(false);
	};

	const navigate = useNavigate();

	const queryClient = useQueryClient();
	const popupFunction = () => {
		queryClient.invalidateQueries({
			queryKey: ["channels", { courseId }],
		});
	};

	const {
		mutate: createChannel,
		isError: isChannelError,
		isPending: isPendingChannel,
		isSuccess: isChannelSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.post(`/channels/`, {
				course: courseId,
				admins: [authContext.user?.id],
				isCourseChannel: true,
				name: courseName,
			});
		},
		onSuccess: () => {
			handleCloseCreateChannelForm();
		},
	});

	const handleCreateChannel = async () => {
		createChannel();
	};
	return (
		<>
			<Button
				variant="contained"
				fullWidth
				disableElevation
				size="large"
				sx={{ mb: 2 }}
				onClick={handleOpenCreateChannelForm}
			>
				Create Channel
			</Button>

			<DialogForm
				heading="Create Channel"
				content="Create a channel for the course to interact with your students."
				openDialog={openCreateChannelhForm}
				closeDialog={handleCloseCreateChannelForm}
				dialogFunction={handleCreateChannel}
			/>
			<Popup
				heading="Success!"
				content="Channel Created successfully!"
				openPopup={isChannelSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
			<Popup
				heading="Something went wrong..."
				content="A problem occurred while processing your request. Please try again."
				openPopup={isChannelError}
				error={true}
				buttonText="Close"
				popupFunction={() => {}}
			/>
		</>
	);
}

export default CreateChannelForm;
