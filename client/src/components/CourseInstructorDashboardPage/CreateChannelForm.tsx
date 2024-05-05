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
			<Dialog
				open={openCreateChannelhForm}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => handleCloseCreateChannelForm()}
				aria-describedby="success-dialog-slide-description"
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>
					<SectionHeader
						heading="Create Channel"
						headingAlignment="left"
						sx={{ mb: 0, textAlign: "left" }}
					/>
					<SectionHeader
						heading="Create a channel for the course to interact with your students."
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
							variant="contained"
							disabled={isPendingChannel}
							onClick={handleCreateChannel}
							sx={{
								mb: 2,
								color: "white",
							}}
						>
							Create Channel
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
			<Popup
				content="Channel Created successfully!"
				openPopup={isChannelSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
		</>
	);
}

export default CreateChannelForm;
