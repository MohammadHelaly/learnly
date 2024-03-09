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
import { AddCircleOutlined } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

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
	const [video, setVideo] = useState(null);
	const [openModuleForm, setOpenModuleForm] = useState(false);
	const [url, setUrl] = useState("");
	const [key, setKey] = useState("");
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

	const handleOpenModuleForm = () => setOpenModuleForm(true);
	const handleCloseModuleForm = () => setOpenModuleForm(false);

	const handleVideoChange = async (e: any) => {
		const file = e.target.files[0];
		console.log(file);
		const videoData = new FormData();
		videoData.append("video", file);
		console.log("Loading...");
		try {
			const { data } = await axios.post(
				`http://127.0.0.1:5000/api/v1/sections/uploadModuleVideo`,
				videoData
			);
			console.log("Done uploading video");
			console.log(data);
			setUrl(data.url);
			setKey(data.key);
		} catch (err) {
			console.log(err);
		}
	};

	const {
		mutate: mutateModule,
		isError: isMutateModuleError,
		isPending: isPendingModule,
	} = useMutation({
		mutationFn: (data: any) => {
			//// <----- CHANGE THIS
			return api.patch(`/courses/${courseId}/sections/${sectionId}`, {
				...data,
			});
		},
		onSuccess: (response) => {
			alert("Module added successfully");
			queryClient.invalidateQueries({
				queryKey: ["sections", { courseId }],
			});
		},
		onError: (error) => {
			console.error(error);
			alert("An error occurred. Please try again.");
		},
	});

	const onSubmitModule = (data: AddModuleSchema) => {
		const load = {
			url: url,
			title: data.title,
			sectionId: sectionId,
			key: key,
		};

		mutateModule(load);

		handleCloseModuleForm();
		resetModule();
	};

	return (
		<>
			<Button
				disabled={isPendingModule}
				sx={{ color: "black" }}
				onClick={handleOpenModuleForm}
			>
				<AddCircleOutlined />
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
				<form
					onSubmit={moduleHandleSubmit(onSubmitModule)}
					autoComplete="off"
					noValidate
				>
					<DialogTitle>
						<SectionHeader
							heading="Add New Module"
							headingAlignment="left"
							sx={{ mb: 0, textAlign: "left" }}
						/>
					</DialogTitle>
					<DialogContent>
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
								component="label"
								fullWidth
								variant="contained"
								disableElevation
								size="large"
								disabled={isPendingModule}
								sx={{
									mb: 2,
								}}
							>
								{" "}
								Upload Video
								<input
									disabled={isPendingModule}
									accept="video/*"
									style={{ display: "none" }}
									multiple={false}
									type="file"
									hidden
									onChange={handleVideoChange}
								/>
							</Button>
						</Stack>
					</DialogContent>
					<DialogActions>
						<Button
							color="primary"
							variant="contained"
							disableElevation
							size="large"
							type="submit"
							sx={{ mr: 2 }}
						>
							Save
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default UpdateModulesForm;
