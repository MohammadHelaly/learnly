import React from "react";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useState } from "react";
import {
	Typography,
	Stack,
	Button,
	Icon,
	Modal,
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Slide,
	TextField,
	Accordion,
	AccordionDetails,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});
interface Module {
	title: string;
	path: string;
}

const AddModule = () => {
	const [open, setOpen] = useState(false);
	const [newModuleTitle, setNewModuleTitle] = useState<string>("");
	const [newModulepath, setNewModulepath] = useState<string>("");
	const [modules, setModules] = useState<Module[]>([]);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const addNewModule = () => {
		// mutate({ title: newSectionTitle, description: newSectionDescription });
		const newModule: Module = {
			title: newModuleTitle,
			path: newModulepath,
		};
		setModules([...modules, newModule]);
		setNewModuleTitle("");
		setNewModulepath("");
		handleClose();
	};

	return (
		<AccordionDetails sx={{ alignContent: "center" }}>
			{modules.map((module, index) => (
				<AccordionDetails
					key={index + "-" + module.title}
					sx={{ paddingLeft: "23px" }}
				>
					<Stack direction="row" spacing={1} alignItems="center">
						<PlayCircleIcon fontSize="small" />
						<Typography variant="body1">{module.title}</Typography>
					</Stack>
				</AccordionDetails>
			))}
			<Button sx={{ color: "black" }} onClick={handleOpen}>
				<AddCircleOutlinedIcon fontSize="small" />
				<Typography variant="body1">Add Module</Typography>
			</Button>

			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="success-dialog-slide-description"
				maxWidth="sm"
				fullWidth
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
						<TextField
							id="outlined-basic"
							label="Video Title"
							variant="outlined"
							value={newModuleTitle}
							onChange={(e) => setNewModuleTitle(e.target.value)}
						/>
						<TextField
							id="outlined-multiline-static"
							label="Video path"
							multiline
							rows={4}
							variant="outlined"
							value={newModulepath}
							onChange={(e) => setNewModulepath(e.target.value)}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button
						color="primary"
						variant="contained"
						disableElevation
						size="large"
						onClick={addNewModule}
						sx={{ mr: 2 }}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</AccordionDetails>
	);
};

export default AddModule;
