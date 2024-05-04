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

interface DeleteChannelFormProps {
	channelId: string;
}

function DeleteChannelForm(props: DeleteChannelFormProps) {
	const { channelId } = props;

	const [openDeleteChannelhForm, setOpenDeleteChannelhForm] = useState(false);

	const handleOpenDeleteChannelForm = () => {
		setOpenDeleteChannelhForm(true);
	};

	const handleCloseDeleteChannelForm = () => {
		setOpenDeleteChannelhForm(false);
	};

	const navigate = useNavigate();

	const queryClient = useQueryClient();
	const popupFunction = () => {};

	const {
		mutate: createChannel,
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
		createChannel();
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
			<Dialog
				open={openDeleteChannelhForm}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => handleCloseDeleteChannelForm()}
				aria-describedby="success-dialog-slide-description"
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>
					<SectionHeader
						heading="Delete Course"
						headingAlignment="left"
						sx={{ mb: 0, textAlign: "left" }}
					/>
					<SectionHeader
						heading="Remove this course channel"
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
							color="error"
							variant="contained"
							disabled={isPendingChannel}
							onClick={handleDeleteChannel}
							sx={{
								mb: 2,
								color: "white",
							}}
						>
							Delete Channel
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
			<Popup
				content="Channel deleted successfully!"
				openPopup={isChannelSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
		</>
	);
}

export default DeleteChannelForm;
