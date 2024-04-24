import React from "react";
import { Stack, TextField, Typography, Button } from "@mui/material";
import NavigationGuard from "../Navigation/NavigationGuard";
import api from "../../api";
import { useMutation } from "@tanstack/react-query";
import PageWrapper from "../UI/PageLayout/PageWrapper";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import { useState, useContext, ChangeEvent } from "react";
import AuthContext from "../../store/auth-context";
import SectionHeader from "../UI/PageLayout/SectionHeader";

function AccountSettings() {
	const authContext = useContext(AuthContext);
	const [email, setEmail] = useState(authContext.user?.email);
	const [oldPassword, setOldPassword] = useState("");
	const [password, setPassword] = useState("");
	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value === "true";
		setEmail(event.target.value);
	};

	const handleOldPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value === "true";
		setOldPassword(event.target.value);
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value === "true";
		setPassword(event.target.value);
	};

	const {
		mutate: mutateUserEmail,
		isError: isMutateUserEmailError,
		isPending: isPendingUserEmail,
		isSuccess: UserEmailSuccess,
	} = useMutation({
		mutationFn: (data: any) => {
			return api.patch(`/users/updateMe`, {
				email: data,
			});
		},
		onSuccess: (response) => {
			alert("User email updated successfully");
			if (authContext.user) {
				if (email) {
					authContext.user.email = email;
					authContext.update(authContext.user);
				}
			}
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const {
		mutate: mutateUserPassword,
		isError: isMutateUserPasswordError,
		isPending: isPendingUserPassword,
		isSuccess: UserPasswordSuccess,
	} = useMutation({
		mutationFn: (data: any) => {
			return api.patch(`/users/updatePassword`, {
				passwordCurrent: data[0],
				password: data[1],
				passwordConfirm: data[1],
			});
		},
		onSuccess: (response) => {
			alert("User password updated successfully");
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});
	return (
		<Stack
			alignItems={"center"}
			display={"flex"}
			flexDirection={"column"}
			sx={{ paddingTop: "2rem" }}
		>
			<Typography align="center" variant="h5">
				Change Email
			</Typography>
			<Stack
				spacing="1rem"
				sx={{
					paddingTop: "2rem",
					paddingBottom: "2rem",
				}}
			>
				<TextField
					onChange={handleEmailChange}
					value={email}
					defaultValue={authContext.user?.email}
					color="primary"
				/>
				<Button
					onClick={() => {
						mutateUserEmail(email);
					}}
				>
					Confirm
				</Button>
			</Stack>
			<Typography variant="h5">Change Password</Typography>
			<Stack spacing="1rem" sx={{ paddingTop: "2rem" }}>
				<TextField
					onChange={handleOldPasswordChange}
					value={oldPassword}
					label="Old Password"
					color="primary"
					type="password"
				/>
				<TextField
					onChange={handlePasswordChange}
					value={password}
					label="New Password"
					color="primary"
					type="password"
				/>
				<Button
					onClick={() => {
						const data = [oldPassword, password];
						mutateUserPassword(data);
					}}
				>
					Confirm
				</Button>
			</Stack>
		</Stack>
	);
}

export default AccountSettings;
