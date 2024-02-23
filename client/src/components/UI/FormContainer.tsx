import { Grid } from "@mui/material";

interface FormContainerProps {
	children: React.ReactNode;
}

const FormContainer = (props: FormContainerProps) => {
	const { children } = props;

	return (
		<Grid
			container
			direction="column"
			sx={{
				width: "100%",
				maxWidth: "500px",
				transition: "all 0.4s ease-in-out",
				py: 2,
				px: window.innerWidth > 600 ? 2 : 4,
				my: 6,
				backgroundColor: "#ffffff",
				borderRadius: "10px",
				boxShadow: "0 0 0px rgba(0,0,0,0.5)",
			}}>
			{children}
		</Grid>
	);
};

export default FormContainer;
