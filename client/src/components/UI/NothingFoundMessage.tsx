import { Typography } from "@mui/material";

const NothingFoundMessage = () => {
	return (
		<Typography
			variant="h4"
			color="text.secondary"
			sx={{
				my: 20,
				textAlign: "center",
			}}>
			Found nothing to show...
		</Typography>
	);
};

export default NothingFoundMessage;
