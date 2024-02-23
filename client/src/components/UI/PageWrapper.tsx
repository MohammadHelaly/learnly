import { Box } from "@mui/material";

interface PageWrapperProps {
	children: React.ReactNode;
	centered?: boolean;
}

const PageWrapper = (props: PageWrapperProps) => {
	const { children, centered } = props;

	return (
		<Box
			sx={{
				minHeight: "75vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: centered ? "center" : "space-between",
				pb: 5,
				mt: window.innerWidth > 600 ? 8 : 7,
				backgroundColor: "white",
			}}>
			{children}
		</Box>
	);
};

export default PageWrapper;
