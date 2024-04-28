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
import { Delete } from "@mui/icons-material";
import DeleteMe from "./DeleteMe";
import FormContainer from "../UI/PageLayout/FormContainer";

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
		<FormContainer>
			<form
				style={{
					width: "100%",

					marginBottom: 2,
				}}
			>
				<Stack spacing={12}>
					<SectionWrapper>
						<Stack
							spacing="1rem"
							sx={{
								paddingTop: "2rem",
								paddingBottom: "2rem",
							}}
						>
							<SectionHeader
								heading="Change Email"
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{
									mb: 2,
								}}
							/>
							<TextField
								onChange={handleEmailChange}
								value={email}
								defaultValue={authContext.user?.email}
								color="primary"
								sx={{ mb: 2 }}
							/>
							<Button
								fullWidth
								variant="contained"
								disableElevation
								size="large"
								sx={{
									mb: 2,
								}}
								onClick={() => {
									mutateUserEmail(email);
								}}
							>
								Confirm
							</Button>
						</Stack>
					</SectionWrapper>
					<SectionWrapper>
						<SectionHeader
							heading="Change Password"
							headingAlignment="left"
							keepHeadingAlignmentOnSmallScreens
							headingAnimated={false}
							sx={{
								mb: 2,
							}}
						/>
						<Stack
							spacing="1rem"
							sx={{ paddingTop: "2rem", paddingBottom: "2rem" }}
						>
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
								sx={{ mb: 2 }}
							/>
							<Button
								fullWidth
								variant="contained"
								disableElevation
								size="large"
								sx={{
									mb: 2,
								}}
								onClick={() => {
									const data = [oldPassword, password];
									mutateUserPassword(data);
								}}
							>
								Confirm
							</Button>
						</Stack>
					</SectionWrapper>
					<SectionWrapper>
						<SectionHeader
							heading="Deactivate Account"
							headingAlignment="left"
							keepHeadingAlignmentOnSmallScreens
							headingAnimated={false}
							sx={{
								mb: 2,
							}}
						/>
						<DeleteMe />
					</SectionWrapper>
				</Stack>
			</form>
		</FormContainer>
	);
}

export default AccountSettings;
