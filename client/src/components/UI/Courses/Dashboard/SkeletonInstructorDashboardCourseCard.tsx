import { Card, Box, Skeleton } from "@mui/material";

const SkeletonInstructorDashboardCourseCard = () => {
	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: window.innerWidth > 600 ? "row" : "column",
				height: window.innerWidth < 600 ? 356 : 204,
				width: "100%",
				transition: `all 0.6s ease-in-out`,
				borderRadius: 0,
				backgroundColor: "transparent",
				borderBottom: "1px solid #dddddd",
				boxShadow: "none",
				px: 0,
				py: window.innerWidth < 600 ? 0 : 1,
			}}>
			<Skeleton
				variant="rectangular"
				animation="wave"
				sx={{
					height: 200,
					minWidth: window.innerWidth > 600 ? 356 : "100%",
					maxWidth: window.innerWidth > 600 ? 356 : "100%",
					borderRadius: "12px",
				}}
			/>
			<Box
				sx={{
					flexGrow: 1,
					transition: "all 0.5s ease",
					py: 1,
					px: window.innerWidth > 600 ? 2 : 0,
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

export default SkeletonInstructorDashboardCourseCard;
