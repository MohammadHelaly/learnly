import { Typography } from "@mui/material";

const ErrorWarning = () => {
	return (
		<Typography
			variant="h4"
			color="error"
			sx={{
				my: 20,
				textAlign: "center",
			}}>
			Something went wrong...
		</Typography>
	);
};

export default ErrorWarning;
