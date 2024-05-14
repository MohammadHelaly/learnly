import React, { useEffect } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogFormProps {
	openDialog: boolean;
	closeDialog: () => void;
	content: string;
	heading: string;
	dialogFunction: () => void;
}

function DialogForm(props: DialogFormProps) {
	const { content, heading, openDialog, closeDialog, dialogFunction } = props;

	const [openDialogForm, setOpenDialogForm] = useState(false);

	const handleOpenDialogForm = () => {
		setOpenDialogForm(true);
	};

	const handleCloseDialogForm = () => {
		setOpenDialogForm(false);
		closeDialog();
	};

	const handleDialogFunction = async () => {
		handleCloseDialogForm();
		dialogFunction();
	};

	useEffect(() => {
		setOpenDialogForm(openDialog);
	}, [openDialog]);

	return (
		<>
			<Dialog
				open={openDialogForm}
				TransitionComponent={Transition}
				keepMounted
				onClose={() => handleCloseDialogForm()}
				aria-describedby="success-dialog-slide-description"
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>
					<Stack direction="row" justifyContent="space-between">
						<SectionHeader
							heading={heading}
							headingAlignment="left"
							sx={{ mb: 0, textAlign: "left" }}
						/>
						<IconButton
							aria-label="close"
							onClick={() => handleCloseDialogForm()}
							sx={{ float: "right" }}
						>
							<CloseIcon />
						</IconButton>
					</Stack>
					<SectionHeader
						heading={content}
						headingAlignment="left"
						variant="h6"
						isSubHeading
						sx={{ mb: 0, textAlign: "left" }}
					/>
				</DialogTitle>
				<DialogContent>
					<Stack spacing={2} direction="row">
						<Button
							component="label"
							fullWidth
							disableElevation
							size="large"
							color="error"
							variant="contained"
							onClick={handleDialogFunction}
							sx={{
								mb: 2,
								color: "white",
							}}
						>
							Confirm
						</Button>
						<Button
							component="label"
							fullWidth
							disableElevation
							size="large"
							color="primary"
							variant="contained"
							onClick={() => handleCloseDialogForm()}
							sx={{
								mb: 2,
								color: "white",
							}}
						>
							Cancel
						</Button>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default DialogForm;
