import React, { useState } from "react";
import {
	Typography,
	Stack,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Slide,
	TextField,
} from "@mui/material";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import { TransitionProps } from "@mui/material/transitions";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../../api";
import { AddCircleOutlined, Check } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Popup from "../Popup/Popup";

interface UpdateModulesFormProps {
	courseId: number | string;
	sectionId: number | string;
}

const moduleSchema = z.object({
	title: z
		.string()
		.min(3, "Title is too short")
		.max(100, "Title is too long"),
});

type AddModuleSchema = z.infer<typeof moduleSchema>;

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateModulesForm = (props: UpdateModulesFormProps) => {
	const { courseId, sectionId } = props;

	const [openModuleForm, setOpenModuleForm] = useState(false);

	const {
		control: moduleControl,
		handleSubmit: moduleHandleSubmit,
		reset: resetModule,
		formState: { errors: moduleErrors },
	} = useForm<AddModuleSchema>({
		mode: "onBlur",
		defaultValues: {
			title: "",
		},
		resolver: zodResolver(moduleSchema),
	});

	const queryClient = useQueryClient();
	const popupFunction = () => {
		queryClient.invalidateQueries({
			queryKey: ["sections", { courseId }],
		});
	};
	const handleOpenModuleForm = () => setOpenModuleForm(true);
	const handleCloseModuleForm = () => {
		setOpenModuleForm(false);
		resetModule();
	};

	const {
		mutate: mutateModule,
		isError: isMutateModuleError,
		isPending: isPendingModule,
		isSuccess,
	} = useMutation({
		mutationFn: (data: any) => {
			return api.put(`/courses/${courseId}/sections/${sectionId}`, {
				...data,
			});
		},
		onSuccess: (response) => {
			setOpenModuleForm(false);
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const onSubmitModule = (data: AddModuleSchema) => {
		mutateModule(data);
		handleCloseModuleForm();
	};

	return (
		<>
			<Button
				disabled={isPendingModule}
				sx={{ color: "black" }}
				startIcon={<AddCircleOutlined />}
				onClick={handleOpenModuleForm}
			>
				<Typography
					variant="h6"
					sx={{
						fontWeight: "400",
					}}
				>
					Add New Module
				</Typography>
			</Button>
			<Dialog
				open={openModuleForm}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleCloseModuleForm}
				aria-describedby="success-dialog-slide-description"
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>
					<SectionHeader
						heading="Add New Module"
						headingAlignment="left"
						sx={{
							mb: 0,
						}}
					/>
					<SectionHeader
						heading="Add a new module to this section."
						headingAlignment="left"
						isSubHeading
						variant="h6"
						sx={{
							mb: 0,
						}}
					/>
				</DialogTitle>
				<DialogContent>
					<form
						onSubmit={moduleHandleSubmit(onSubmitModule)}
						autoComplete="off"
						noValidate
					>
						<Stack spacing={2} paddingTop={2}>
							<Controller
								name="title"
								control={moduleControl}
								render={({ field }) => (
									<TextField
										{...field}
										id="outlined-basic"
										label="Module Title"
										variant="outlined"
										error={!!moduleErrors.title}
										helperText={moduleErrors.title?.message}
									/>
								)}
							/>
							<Button
								endIcon={<Check />}
								color="primary"
								variant="contained"
								disableElevation
								fullWidth
								size="large"
								type="submit"
							>
								Save New Module
							</Button>
						</Stack>
					</form>
				</DialogContent>
			</Dialog>
			<Popup
				content="Module created successfully"
				openPopup={isSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
		</>
	);
};

export default UpdateModulesForm;
