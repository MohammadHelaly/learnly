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

interface DeleteChannelFormProps {
	channelId: string;
}

function DeleteChannelForm(props: DeleteChannelFormProps) {
	const { channelId } = props;
	const { courseId } = useParams();
	const [openDeleteChannelhForm, setOpenDeleteChannelhForm] = useState(false);

	const handleOpenDeleteChannelForm = () => {
		setOpenDeleteChannelhForm(true);
	};

	const handleCloseDeleteChannelForm = () => {
		setOpenDeleteChannelhForm(false);
	};

	const navigate = useNavigate();

	const queryClient = useQueryClient();
	const popupFunction = () => {
		queryClient.invalidateQueries({
			queryKey: ["channels", { courseId }],
		});
	};

	const {
		mutate: deleteChannel,
		isError: isChannelError,
		isPending: isPendingChannel,
		isSuccess: isChannelSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.delete(`/channels/${channelId}`);
		},
		onSuccess: () => {
			handleCloseDeleteChannelForm();
		},
	});

	const handleDeleteChannel = async () => {
		deleteChannel();
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
				onClick={handleOpenDeleteChannelForm}
			>
				Delete Channel
			</Button>
			<DialogForm
				openDialog={openDeleteChannelhForm}
				closeDialog={handleCloseDeleteChannelForm}
				content="Are you sure you want to delete this channel?"
				heading="Delete Channel"
				dialogFunction={handleDeleteChannel}
			/>
			<Popup
				heading="Success!"
				content="Channel deleted successfully!"
				openPopup={isChannelSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
			<Popup
				heading="Error!"
				content="An error occurred. Please try again."
				openPopup={isChannelError}
				buttonText="ok!"
				popupFunction={() => {}}
			/>
		</>
	);
}

export default DeleteChannelForm;
