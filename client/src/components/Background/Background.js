import { Box } from "@mui/material";
import background from "../../assets/images/vecteezy_abstract-gradient-purple-blue-liquid-wave-background_22976138.jpg";

const Background = () => {
	return (
		<Box
			sx={{
				position: "fixed",
				minHeight: "100vh !important",
				minWidth: "100vw !important",
				maxWidth: "100vw !important",
				width: "100%",
				height: "100%",
				backgroundSize: "cover",
				backgroundPosition: "center",
				zIndex: "-1",
				overflow: "hidden",
				backgroundImage: `url(${background})`,
			}}>
			{/* <img
				src={background}
				alt="background"
				style={{
					position: "fixed",
					minHeight: "100vh !important",
					minWidth: "100vw !important",
					maxWidth: "100vw !important",
					width: "100%",
					height: "100%",
					backgroundSize: "cover",
					backgroundPosition: "center",
					zIndex: "-1",
					overflow: "hidden",
				}}
			/> */}
		</Box>
	);
};

export default Background;
