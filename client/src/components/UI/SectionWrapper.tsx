import { Box, SxProps } from "@mui/material";

interface SectionWrapperProps {
	children: React.ReactNode;
	sx?: SxProps;
}

const SectionWrapper = (props: SectionWrapperProps) => {
	const { children, sx } = props;
	return (
		<Box
			sx={{
				mt: 5,
				...sx,
			}}>
			{children}
		</Box>
	);
};

export default SectionWrapper;
