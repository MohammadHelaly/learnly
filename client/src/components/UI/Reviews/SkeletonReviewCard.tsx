import { Card, Stack, Skeleton } from "@mui/material";

const SkeletonReviewCard = () => {
	return (
		<Card
			sx={{
				width: "100%",
				p: 2,
				boxShadow: "none",
				borderBottom: "1px solid #dddddd",
				borderRadius: 0,
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
						width: 40,
						height: 40,
					}}
				/>
				<Skeleton variant="text" animation="wave" width={70} />
				<Skeleton variant="text" animation="wave" width={70} />
			</Stack>
			<Skeleton
				variant="text"
				animation="wave"
				width={70}
				sx={{ mb: 2 }}
			/>
			<Stack
				sx={{
					mb: 2,
				}}>
				<Skeleton variant="text" animation="wave" />
				<Skeleton variant="text" animation="wave" width={100} />
			</Stack>
		</Card>
	);
};

export default SkeletonReviewCard;
