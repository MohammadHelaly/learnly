import React from "react";
import { AccordionDetails, Button, Stack, Typography } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
const AddModule = () => {
	return (
		<AccordionDetails sx={{ alignContent: "center" }}>
			<Button sx={{ color: "black" }}>
				<AddCircleOutlinedIcon fontSize="small" />
				<Typography variant="body1">Add Module</Typography>
			</Button>
		</AccordionDetails>
	);
};

export default AddModule;
