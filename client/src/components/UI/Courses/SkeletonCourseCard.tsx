import { Card, Box, Skeleton } from "@mui/material";
import { useLocation } from "react-router-dom";
import useAnimate from "../../../hooks/use-animate";

interface SkeletonCourseCardProps {
	index: number;
}

const SkeletonCourseCard = (props: SkeletonCourseCardProps) => {
	const { index } = props;

	const elementRef = useAnimate("animate", false);

	const currentPath = useLocation().pathname;

	const delay = 0.2 + ((index % 3) + 1) * 0.2;

	return (
		<Card
			ref={elementRef}
			sx={{
				display: "flex",
				flexDirection: "column",
				height: 360,
				width: 360,
				opacity: !currentPath.includes("/courses") ? 0 : 1,
				transition: `all 0.75s ease-in-out ${delay}s`,
				transform: !currentPath.includes("/courses")
					? "translateY(50%)"
					: "none",
				borderRadius: 0,
				backgroundColor: "transparent",
				borderBottom: "1px solid #dddddd",
				boxShadow: "none",
				p: 0,
			}}>
			<Skeleton
				variant="rectangular"
				animation="wave"
				sx={{
					height: 200,
					width: "100%",
					borderRadius: "12px",
				}}
			/>
			<Box
				sx={{
					transition: "all 0.5s ease",
					py: 1,
				}}>
				<Skeleton
					variant="text"
					animation="wave"
					height={40}
					sx={{
						width: "100%",
					}}
				/>
				<Skeleton
					variant="text"
					animation="wave"
					sx={{
						width: "40%",
					}}
				/>
				<Skeleton
					variant="text"
					animation="wave"
					sx={{
						width: "50%",
					}}
				/>
				<Skeleton
					variant="text"
					animation="wave"
					height={30}
					sx={{
						width: "30%",
					}}
				/>
				<Skeleton
					variant="text"
					animation="wave"
					sx={{
						width: "60%",
					}}
				/>
			</Box>
		</Card>
	);
};

export default SkeletonCourseCard;
