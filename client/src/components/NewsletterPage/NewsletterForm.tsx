import {
	Typography,
	TextField,
	FormControl,
	Stack,
	Button,
} from "@mui/material";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "../../api";

interface NewsletterFormProps {
	variant: "Subscribe" | "Unsubscribe";
}

const schema = z.object({
	email: z.string().email(),
});

type NewsletterSchemaType = z.infer<typeof schema>;

const NewsletterForm = (props: NewsletterFormProps) => {
	const { variant } = props;
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<NewsletterSchemaType>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: {
			email: "",
		},
	});

	const { mutate, isError, isPending } = useMutation({
		mutationFn: (data: NewsletterSchemaType) => {
			return api.post(`/users/newsletter${variant}`, {
				...data,
			});
		},
		onSuccess: (response) => {
			// show success message
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
			// show error message
		},
	});

	const onSubmit = async (data: NewsletterSchemaType) => mutate(data);

	return (
		<form
			style={{
				width: "100%",
			}}
			onSubmit={handleSubmit(onSubmit)}
			autoComplete="off">
			<SectionWrapper>
				<SectionHeader
					heading={
						variant === "Subscribe"
							? "Subscribe to the Newsletter"
							: "Unsubscribe from the Newsletter"
					}
					headingAlignment="left"
					keepHeadingAlignmentOnSmallScreens
					headingAnimated={false}
					sx={{
						mb: 0,
					}}
				/>
				<SectionHeader
					isSubHeading
					variant="h6"
					heading={
						variant === "Subscribe"
							? "Subscribe to our newsletter and become part of the Learnly community. Get the latest updates, news, and more."
							: "Unsubscribe from our newsletter and leave the Learnly community. We'll miss you!"
					}
					keepHeadingAlignmentOnSmallScreens
					headingAlignment="left"
					headingAnimated={false}
					sx={{
						mb: 2,
					}}
				/>
				<Stack spacing={2} alignItems="center">
					<FormControl
						fullWidth
						required
						error={!!errors.email}
						sx={{
							flexGrow: 1,
						}}>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									type="text"
									name="email"
									label="Email"
									helperText={
										errors.email && (
											<Typography
												variant="body2"
												color="error">
												{errors.email.message}
											</Typography>
										)
									}
								/>
							)}
						/>
					</FormControl>
					<Button
						disableElevation
						fullWidth
						type="submit"
						variant="contained"
						size="large"
						disabled={isPending}>
						{variant.charAt(0).toUpperCase() + variant.slice(1)}
					</Button>
				</Stack>
			</SectionWrapper>
		</form>
	);
};

export default NewsletterForm;
