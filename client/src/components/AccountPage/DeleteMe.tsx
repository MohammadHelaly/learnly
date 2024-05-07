import React from "react";
import { Stack, Button } from "@mui/material";
import api from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useState, useContext, ChangeEvent } from "react";
import AuthContext from "../../store/auth-context";

const DeleteMe = () => {
	const authContext = useContext(AuthContext);
	const {
		mutate: mutateUser,
		isError: isMutateUserError,
		isPending: isPendingUser,
		isSuccess: UserSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.delete(`/users/deleteMe`);
		},
		onSuccess: (response) => {
			alert("User deleted successfully");
			authContext.logout();
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
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
					alert("Are you sure you want to delete your account?");
					mutateUser();
				}}>
				Delete Me
			</Button>
		</>
	);
};

export default DeleteMe;
