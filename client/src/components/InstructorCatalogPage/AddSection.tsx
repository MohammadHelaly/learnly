import React from "react";
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
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddIcon from "@mui/icons-material/Add";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import { useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

interface Section {
	title: string;
	description: string;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const AddSection: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [newSectionTitle, setNewSectionTitle] = useState<string>("");
	const [newSectionDescription, setNewSectionDescription] =
		useState<string>("");
	const [sections, setSections] = useState<Section[]>([]);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const addNewSection = () => {
		const newSection: Section = {
			title: newSectionTitle,
			description: newSectionDescription,
		};

		setSections([...sections, newSection]);
		setNewSectionTitle("");
		setNewSectionDescription("");
		handleClose();
	};

	return (
		<Stack alignItems="center">
			{sections.map((section, index) => (
				<Accordion
					key={index + "-accordion"}
					disableGutters={true}
					sx={{
						boxShadow: "none !important",
						overflow: "hidden",
						border: 1,
						borderBottom: 1, // Add bottom border for the last one
						borderColor: "divider",
						width: "100%",
					}}
				>
					<AccordionSummary
						key={index + "-summary"}
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
						sx={{
							backgroundColor: "#f5f5f5",
							width: "100%",
							flexDirection: "row-reverse",
						}}
					>
						<Stack
							direction="row"
							spacing={1}
							alignItems="center"
							justifyContent="space-between"
							width="100%"
							sx={{
								ml: 1,
							}}
						>
							<Typography
								variant="h5"
								sx={{
									fontWeight: "400",
								}}
							>
								{section.title}
							</Typography>
							<Typography
								variant="body1"
								color="text.secondary"
								sx={{
									fontWeight: "400",
								}}
							>
								Course time
							</Typography>
						</Stack>
					</AccordionSummary>
					<AccordionDetails
						key={index + "-details"}
						sx={{
							borderTop: 1,
							borderColor: "divider",
						}}
					>
						<Typography variant="h6" color="text.secondary">
							{section.description}
						</Typography>
					</AccordionDetails>
					<AccordionDetails sx={{ alignContent: "center" }}>
						<Button sx={{ color: "black" }}>
							<AddCircleOutlinedIcon fontSize="small" />
							<Typography variant="body1">Add Module</Typography>
						</Button>
					</AccordionDetails>
				</Accordion>
			))}

			<Button sx={{ color: "black" }} onClick={handleOpen}>
				<AddIcon />
				<Typography
					variant="h6"
					sx={{
						fontWeight: "400",
					}}
				>
					Add new Section
				</Typography>
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
						heading="Add New Section"
						headingAlignment="left"
						sx={{ mb: 0, textAlign: "left" }}
					/>
				</DialogTitle>
				<DialogContent>
					<Stack spacing={2} paddingTop={2}>
						<TextField
							id="outlined-basic"
							label="Section Title"
							variant="outlined"
							value={newSectionTitle}
							onChange={(e) => setNewSectionTitle(e.target.value)}
						/>
						<TextField
							id="outlined-multiline-static"
							label="Section Description"
							multiline
							rows={4}
							variant="outlined"
							value={newSectionDescription}
							onChange={(e) =>
								setNewSectionDescription(e.target.value)
							}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<Button
						color="primary"
						variant="contained"
						disableElevation
						size="large"
						onClick={addNewSection}
						sx={{ mr: 2 }}
					>
						Save
					</Button>
				</DialogActions>
			</Dialog>
			{/* Render newly added sections as accordions */}
		</Stack>
	);
};

export default AddSection;
