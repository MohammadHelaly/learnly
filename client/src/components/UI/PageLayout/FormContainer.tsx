import { Grid, SxProps } from "@mui/material";

interface FormContainerProps {
	children: React.ReactNode;
	modal?: boolean;
	large?: boolean;
	sx?: SxProps;
}

const FormContainer = (props: FormContainerProps) => {
	const { children, modal, large, sx } = props;

	return (
		<Grid
			container
			direction="column"
			sx={{
				width: "100%",
				maxWidth: large ? "md" : "500px",
				transition: "all 0.4s ease-in-out",
				p: 2,
				my: modal ? 0 : 6,
				backgroundColor: "white",
				borderRadius: "10px",
				boxShadow: "0 0 0px rgba(0,0,0,0.5)",
				...sx,
			}}>
			{children}
		</Grid>
	);
};

export default FormContainer;
