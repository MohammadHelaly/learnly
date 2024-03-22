import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import SectionHeader from "../UI/PageLayout/SectionHeader";

interface PopupProps {
	content: string;
	openPopup: boolean;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = (props: PopupProps) => {
	const { content, openPopup } = props;
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(openPopup);
	}, [openPopup]);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby="success-dialog-slide-description"
		>
			<DialogTitle>
				<SectionHeader
					heading="Success!"
					headingAlignment="left"
					sx={{ mb: 0, textAlign: "left" }}
				/>
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="success-dialog-slide-description">
					{content} successfully!
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					color="primary"
					variant="contained"
					disableElevation
					size="large"
					onClick={handleClose}
				>
					Great!
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Popup;
