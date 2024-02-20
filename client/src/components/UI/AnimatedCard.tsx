import { Card, Box } from "@mui/material";
import useAnimate from "../../hooks/use-animate";

interface CourseCardProps {
	index: number;
	animated?: boolean;
	children: React.ReactNode;
}

const CourseCard = (props: CourseCardProps) => {
	const { index, animated, children } = props;

	const elementRef = useAnimate("animate", false);

	const delay = 0.2 + ((index % 3) + 1) * 0.2;

	return (
		<Card
			ref={animated ? elementRef : null}
			sx={{
				transition: `all 0.6s ease-in-out ${delay}s`,
				opacity: animated ? 0 : 1,
				transform: animated ? "translateY(50%)" : "none",
				backgroundColor: "transparent",
				boxShadow: "none",
				borderRadius: 0,
				p: 0,
				m: 0,
			}}>
			{children}
		</Card>
	);
};

export default CourseCard;
