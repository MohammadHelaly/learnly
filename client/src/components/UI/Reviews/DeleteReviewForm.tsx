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
import api from "../../../api";
import SectionHeader from "../../UI/PageLayout/SectionHeader";
import Popup from "../../Popup/Popup";
import { useNavigate, useParams } from "react-router-dom";
import DialogForm from "../../Popup/DialogForm";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

interface DeleteReviewFormProps {
	reviewId: string;
}

function DeleteReviewForm(props: DeleteReviewFormProps) {
	const { reviewId } = props;

	const [openReviewForm, setOpenReviewForm] = useState(false);

	const handleOpenDeleteReviewForm = () => {
		setOpenReviewForm(true);
	};

	const handleCloseDeleteReviewForm = () => {
		setOpenReviewForm(false);
	};

	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const popupFunction = () => {
		queryClient.invalidateQueries({ queryKey: ["courseReviews"] });
	};

	const {
		mutate: deleteReview,
		isError: isModuleError,
		isPending: isPendingModule,
		isSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.delete(`/reviews/${reviewId}`);
		},
		onSuccess: () => {
			handleCloseDeleteReviewForm();
		},
	});

	const handleDeleteReview = async () => {
		deleteReview();
	};

	return (
		<>
			<Button
				fullWidth
				size="medium"
				variant="outlined"
				color="error"
				disableElevation
				sx={{
					"&:hover": {
						backgroundColor: "error.main",
						color: "white",
					},
				}}
				onClick={handleOpenDeleteReviewForm}
			>
				Delete Review
			</Button>
			<DialogForm
				heading="Delete Review"
				content="Are you sure you want to delete this review?"
				openDialog={openReviewForm}
				closeDialog={handleCloseDeleteReviewForm}
				dialogFunction={handleDeleteReview}
			/>
			<Popup
				heading="Success!"
				content="Review deleted successfully!"
				openPopup={isSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
		</>
	);
}

export default DeleteReviewForm;
