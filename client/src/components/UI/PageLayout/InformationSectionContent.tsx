import { Box, Stack, Typography } from "@mui/material";
import useAnimate from "../../../hooks/use-animate";

interface InformationSectionContentProps {
	index: number;
	title: string;
	description: string;
	image?: string;
}

const InformationSectionContent = (props: InformationSectionContentProps) => {
	const { index, title, description, image } = props;
	const elementRef = useAnimate("animate", false);

	return (
		<Stack
			ref={elementRef}
			spacing={2}
			direction={
				window.innerWidth < 900
					? "column"
					: index % 2 === 0
					? "row"
					: "row-reverse"
			}
			alignContent="center"
			alignItems="center"
			sx={{
				my: window.innerWidth > 600 ? 2 : 8,
				opacity: 0,
				transition: "all 1s ease-in-out 0.5s",
				gap: window.innerWidth > 600 ? 16 : 2,
			}}>
			<Box
				sx={{
					p: window.innerWidth > 600 ? 8 : 0,
				}}>
				<Typography
					variant="h4"
					textAlign={window.innerWidth > 900 ? "left" : "center"}
					sx={{
						mb: 2,
					}}>
					{title}
				</Typography>
				<Typography
					variant="h6"
					textAlign={window.innerWidth > 900 ? "left" : "center"}>
					{description}
				</Typography>
			</Box>
			<Box
				sx={{
					p: 0,
					borderRadius: window.innerWidth > 600 ? 6 : 0,
					height: 260,
					minWidth: "40%",
					aspectRatio: "16/9 !important",
					overflow: "hidden",
					backgroundColor: "white",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				{image && (
					<img
						src={image}
						alt={title}
						style={{
							height: "100%",
							// borderRadius: window.innerWidth > 600 ? 24 : 0,
							backdropFilter: "blur(10px)",
						}}
					/>
				)}
			</Box>
		</Stack>
	);
};

export default InformationSectionContent;
