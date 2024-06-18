import React from "react";
import { Stack, Button } from "@mui/material";
import api from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useState, useContext, ChangeEvent } from "react";
import AuthContext from "../../store/auth-context";
import Popup from "../Popup/Popup";
import DialogForm from "../Popup/DialogForm";

const DeleteMe = () => {
	const authContext = useContext(AuthContext);

	const [openDialog, setOpenDialog] = useState(false);

	const openDialogFunction = () => {
		setOpenDialog(true);
	};

	const closeDialogFunction = () => {
		setOpenDialog(false);
	};

	const popupFunction = () => {
		authContext.logout();
	};

	const dialogFunction = () => {
		mutateUser();
	};

	const {
		mutate: mutateUser,
		isError: isMutateUserError,
		isPending: isPendingUser,
		isSuccess: UserSuccess,
		isError,
	} = useMutation({
		mutationFn: () => {
			return api.delete(`/users/deleteMe`);
		},
		onSuccess: (response) => {},
		onError: (error) => {
			// console.error(error);
			// alert("An error occurred. Please try again.");
		},
	});
	return (
		<>
			<Button
				fullWidth
				variant="contained"
				disableElevation
				size="large"
				color="error"
				onClick={() => {
					openDialogFunction();
				}}
			>
				Delete Me
			</Button>
			<DialogForm
				heading="Delete User Account"
				content="Are you sure you want to delete your account?"
				openDialog={openDialog}
				closeDialog={closeDialogFunction}
				dialogFunction={dialogFunction}
			/>
			<Popup
				heading="Success!"
				openPopup={UserSuccess}
				content="User account deleted Successfully!"
				buttonText="Close"
				popupFunction={popupFunction}
			/>
			<Popup
				heading="Something went wrong..."
				openPopup={isError}
				error={true}
				content="A problem occurred while processing your request. Please try again."
				buttonText="Close"
				popupFunction={() => {}}
			/>
		</>
	);
};

export default DeleteMe;
