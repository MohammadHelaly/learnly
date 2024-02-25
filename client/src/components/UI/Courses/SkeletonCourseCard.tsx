import { Card, Box, Skeleton } from "@mui/material";

const SkeletonCourseCard = () => {
	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				height: 356,
				width: window.innerWidth > 380 ? 356 : 328,
				transition: `all 0.6s ease-in-out`,
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
