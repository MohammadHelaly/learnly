import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useAnimate from "../../../hooks/use-animate";
import { NavLink } from "react-router-dom";

interface CallToActionProps {
	question: string;
	answer: string;
	callToAction: string;
	redirectTo: string;
}

const CallToAction = (props: CallToActionProps) => {
	const { question, answer, callToAction, redirectTo } = props;

	const line1Ref = useAnimate("animate", false);
	const line2Ref = useAnimate("animate", false);
	const buttonRef = useAnimate("animate", false);

	return (
		<Box
			sx={{
				bgcolor: "rgba(0,0,0,0)",
				py: 10,
				minHeight: "100",
				display: "flex",
				justifyContent: "center",
			}}>
			<Box
				maxWidth="lg"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Typography
					ref={line1Ref}
					variant="h6"
					textAlign="center"
					color={"common.white"}
					sx={{
						mb: 2,
						opacity: 0,
						transition: "all 1s ease-in-out",
					}}>
					{question}
				</Typography>
				<Typography
					ref={line2Ref}
					variant="h4"
					textAlign="center"
					color={"common.white"}
					sx={{
						mb: 3,
						opacity: 0,
						transition: "all 1s ease-in-out 0.2s",
					}}>
					{answer}
				</Typography>
				<NavLink to={redirectTo}>
					<Button
						ref={buttonRef}
						variant="contained"
						color="primary"
						size="large"
						disableElevation
						endIcon={<ArrowForwardIcon />}
						sx={{
							// height: "100%",
							opacity: 0,
							color: "black",
							backgroundColor: "secondary.main",
							border: 1,
							borderColor: "secondary.main",
							transition:
								"opacity 0.5s ease-in-out .2s, background-color 0.2s ease-in-out 0s",
							"&:hover": {
								backgroundColor: "rgba(0, 0, 0, 0)",
								border: 1,
								borderColor: "secondary.main",
								color: "secondary.main",
							},
						}}>
						{callToAction}
					</Button>
				</NavLink>
			</Box>
		</Box>
	);
};

export default CallToAction;
