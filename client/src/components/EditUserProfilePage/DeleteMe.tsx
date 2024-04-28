import React from "react";
import { Stack, Button } from "@mui/material";
import api from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useState, useContext, ChangeEvent } from "react";
import AuthContext from "../../store/auth-context";
function DeleteMe() {
	const authContext = useContext(AuthContext);
	const {
		mutate: mutateUser,
		isError: isMutateUserError,
		isPending: isPendingUser,
		isSuccess: UserSuccess,
	} = useMutation({
		mutationFn: (data: any) => {
			return api.patch(`/users/deleteMe`, {
				user: data,
			});
		},
		onSuccess: (response) => {
			alert("User deleted successfully");
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});
	return (
		<Stack spacing="1rem" sx={{ paddingTop: "2rem" }}>
			<Button
				fullWidth
				variant="contained"
				disableElevation
				size="large"
				color="error"
				sx={{
					mb: 2,
				}}
				onClick={() => {
					alert("Are you sure you want to delete your account?");
				}}
			>
				Delete Me
			</Button>
		</Stack>
	);
}

export default DeleteMe;
