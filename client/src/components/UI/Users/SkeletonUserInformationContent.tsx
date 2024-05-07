import { Box, Skeleton, Stack } from "@mui/material";

const SkeletonUserInformationContent = () => {
	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				flexDirection: window.innerWidth > 600 ? "row" : "column",
				alignItems: window.innerWidth > 600 ? "flex-start" : "center",
				justifyContent:
					window.innerWidth > 600 ? "flex-start" : "center",
				gap: window.innerWidth > 600 ? 4 : 0,
				pb: window.innerWidth > 600 ? 0 : 4,
				textAlign: window.innerWidth > 600 ? "left" : "center",
			}}>
			<Skeleton
				variant="circular"
				animation="wave"
				width={260}
				height={260}
				sx={{
					mb: 2,
					border: 4,
					borderColor: "white",
					minWidth: 260,
				}}
			/>
			<Stack
				direction="column"
				gap={4}
				width="100%"
				alignItems={window.innerWidth > 600 ? "flex-start" : "center"}
				sx={{ pt: window.innerWidth > 600 ? 12 : 0 }}>
				<Skeleton variant="text" width="60%" height={40} />
				<Skeleton
					animation="wave"
					variant="rectangular"
					width="80%"
					height={24}
				/>
				<Skeleton
					animation="wave"
					variant="rectangular"
					width="80%"
					height={24}
				/>
				<Skeleton
					animation="wave"
					variant="rectangular"
					width="80%"
					height={24}
				/>
			</Stack>
		</Box>
	);
};

export default SkeletonUserInformationContent;
