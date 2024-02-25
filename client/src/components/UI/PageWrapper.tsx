import { Box, SxProps } from "@mui/material";

interface PageWrapperProps {
	children: React.ReactNode;
	centered?: boolean;
	modal?: boolean;
	sx?: SxProps;
}

const PageWrapper = (props: PageWrapperProps) => {
	const { children, centered, modal, sx } = props;

	return (
		<Box
			sx={{
				minHeight: !modal ? "75vh" : "auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: centered ? "center" : "space-between",
				pb: modal ? 0 : 5,
				mt: modal ? 0 : window.innerWidth > 600 ? 8 : 7,
				backgroundColor: "white",
				...sx,
			}}>
			{children}
		</Box>
	);
};

export default PageWrapper;
