import { Avatar, Card, Stack, Typography } from "@mui/material";
import useAnimate from "../../../hooks/use-animate";

interface TestimonialCardProps {
	index: number;
	quote: string;
	photo?: string;
	author: string;
}

const TestimonialCard = (props: TestimonialCardProps) => {
	const elementRef = useAnimate("animate", false);
	const { index, quote, photo, author } = props;

	const delay = 0.5 + index * 0.2;

	return (
		<Card
			ref={elementRef}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "left",
				justifyContent: "space-between",
				p: 4,
				background: "white",
				minHeight: 200,
				flexGrow: 1,
				boxShadow: "none",
				border: "solid 1px rgba(200, 200, 200, 0.8)",
				transition: `opacity 0.75s ease-in-out ${delay}s, transform 0.75s ease-in-out ${delay}s, border-radius 0.5s ease-in-out 0s`,
				opacity: 0,
				transform: "translateX(-100%)",
				borderRadius: 0,
				borderEndStartRadius: 70,
				borderTopRightRadius: 70,
				"&:hover": {
					borderRadius: 0, // 2
				},
				width: 290,
			}}>
			<Typography
				variant="h6"
				color="common.black"
				sx={{
					mb: 4,
					fontSize: 18,
				}}>
				{'"'}
				{quote}
				{'"'}
			</Typography>
			<Stack direction="row" spacing={1} alignItems="center">
				<Avatar
					// src={photo}
					sx={{
						width: 30,
						height: 30,
						p: 0,
						backgroundColor: "primary.main",
					}}
				/>
				<Typography
					variant="body1"
					color="common.black"
					sx={{
						fontWeight: 500,
						fontSize: 16,
					}}>
					{author}
				</Typography>
			</Stack>
		</Card>
	);
};

export default TestimonialCard;
