import { Stack, TextField, Button } from "@mui/material";
import api from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import DeleteMe from "./DeleteMe";
import FormContainer from "../UI/PageLayout/FormContainer";

interface EmailFormValues {
	email: string;
}

interface PasswordFormValues {
	passwordCurrent: string;
	password: string;
}

const AccountSettings = () => {
	const authContext = useContext(AuthContext);

	const {
		control: controlEmail,
		handleSubmit: handleSubmitEmail,
		formState: { errors: emailErrors },
	} = useForm<EmailFormValues>({
		defaultValues: {
			email: authContext.user?.email || "",
		},
	});

	const {
		control: controlPassword,
		handleSubmit: handleSubmitPassword,
		reset: resetPassword,
		formState: { errors: passwordErrors },
	} = useForm<PasswordFormValues>({
		defaultValues: {
			passwordCurrent: "",
			password: "",
		},
	});

	const { mutate: mutateUserEmail } = useMutation({
		mutationFn: (data: EmailFormValues) => {
			return api.patch(`/users/updateMe`, { ...data });
		},
		onSuccess: (response) => {
			alert("User email updated successfully");
			authContext.update(response.data.data.user);
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const { mutate: mutateUserPassword } = useMutation({
		mutationFn: (data: PasswordFormValues) => {
			return api.patch(`/users/updatePassword`, {
				...data,
				passwordConfirm: data.password,
			});
		},
		onSuccess: () => {
			alert("User password updated successfully");
			resetPassword();
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const handleEmailSubmit = (data: EmailFormValues) => {
		mutateUserEmail(data);
	};

	const handlePasswordSubmit = (data: PasswordFormValues) => {
		mutateUserPassword(data);
	};

	return (
		<FormContainer sx={{ px: window.innerWidth < 600 ? 0 : "" }}>
			<Stack spacing={8}>
				<form
					onSubmit={handleSubmitEmail(handleEmailSubmit)}
					style={{ width: "100%", marginBottom: 2 }}>
					<SectionWrapper>
						<Stack>
							<SectionHeader
								heading="Change Email"
								headingAlignment="left"
								keepHeadingAlignmentOnSmallScreens
								headingAnimated={false}
								sx={{ mb: 4 }}
							/>
							<Controller
								name="email"
								control={controlEmail}
								rules={{ required: "Email is required" }}
								render={({ field }) => (
									<TextField
										{...field}
										label="Email"
										color="primary"
										error={!!emailErrors.email}
										helperText={
											emailErrors.email
												? emailErrors.email.message
												: ""
										}
										sx={{ mb: 4 }}
									/>
								)}
							/>
							<Button
								fullWidth
								variant="contained"
								disableElevation
								size="large"
								type="submit">
								Confirm
							</Button>
						</Stack>
					</SectionWrapper>
				</form>
				<SectionWrapper>
					<SectionHeader
						heading="Change Password"
						headingAlignment="left"
						keepHeadingAlignmentOnSmallScreens
						headingAnimated={false}
						sx={{ mb: 4 }}
					/>
					<form onSubmit={handleSubmitPassword(handlePasswordSubmit)}>
						<Stack>
							<Controller
								name="passwordCurrent"
								control={controlPassword}
								rules={{
									required: "Current password is required",
								}}
								render={({ field }) => (
									<TextField
										{...field}
										label="Current Password"
										type="password"
										color="primary"
										error={!!passwordErrors.passwordCurrent}
										helperText={
											passwordErrors.passwordCurrent
												? passwordErrors.passwordCurrent
														.message
												: ""
										}
										sx={{ mb: 2 }}
									/>
								)}
							/>
							<Controller
								name="password"
								control={controlPassword}
								rules={{
									required: "New password is required",
								}}
								render={({ field }) => (
									<TextField
										{...field}
										label="New Password"
										type="password"
										color="primary"
										error={!!passwordErrors.password}
										helperText={
											passwordErrors.password
												? passwordErrors.password
														.message
												: ""
										}
										sx={{ mb: 4 }}
									/>
								)}
							/>
							<Button
								fullWidth
								variant="contained"
								disableElevation
								size="large"
								type="submit">
								Confirm
							</Button>
						</Stack>
					</form>
				</SectionWrapper>
				<SectionWrapper>
					<SectionHeader
						heading="Deactivate Account"
						headingAlignment="left"
						keepHeadingAlignmentOnSmallScreens
						headingAnimated={false}
						sx={{ mb: 4 }}
					/>
					<DeleteMe />
				</SectionWrapper>
			</Stack>
		</FormContainer>
	);
};

export default AccountSettings;
