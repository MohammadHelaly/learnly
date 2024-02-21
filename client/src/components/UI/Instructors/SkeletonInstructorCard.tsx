import { Card, Stack, Skeleton } from "@mui/material";

const SkeletonInstructorCard = () => {
	return (
		<Card
			sx={{
				width: "100%",
				p: 2,
				borderRadius: 0,
				boxShadow: "none",
				borderBottom: "1px solid #dddddd",
			}}>
			<Stack
				direction="row"
				spacing={2}
				alignItems="center"
				sx={{
					mb: 1,
				}}>
				<Skeleton
					variant="circular"
					animation="wave"
					sx={{
						width: 130,
						height: 130,
					}}
				/>
				<Stack
					direction="column"
					spacing={1}
					alignItems="flex-start"
					justifyContent="center">
					<Skeleton
						variant="text"
						animation="wave"
						width={100}
						height={30}
					/>
					<Skeleton
						variant="text"
						animation="wave"
						width={180}
						height={20}
					/>
					<Skeleton
						variant="text"
						animation="wave"
						width={150}
						height={20}
					/>{" "}
					<Skeleton
						variant="text"
						animation="wave"
						width={150}
						height={20}
					/>
				</Stack>
			</Stack>
			<Skeleton variant="text" animation="wave" />
			<Skeleton variant="text" animation="wave" />
			<Skeleton variant="text" animation="wave" />
			<Skeleton variant="text" animation="wave" width="70%" />
		</Card>
	);
};

export default SkeletonInstructorCard;
