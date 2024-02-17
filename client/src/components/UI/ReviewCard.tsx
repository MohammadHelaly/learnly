import {
	Card,
	Stack,
	Typography,
	Rating,
	Avatar,
	Skeleton,
} from "@mui/material";

interface ReviewCardProps {
	rating: number;
	review: string;
	createdAt: string | Date;
	user: {
		name: string;
		photo: string;
	};
	loading: boolean;
}

const ReviewCard = (props: ReviewCardProps) => {
	const { rating, review, createdAt, user, loading } = props;
	const { name, photo } = user;

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
				{loading ? (
					<Skeleton
						variant="circular"
						animation="wave"
						sx={{
							width: 40,
							height: 40,
						}}
					/>
				) : (
					<Avatar alt={name} src={photo} />
				)}
				<Typography variant="h6">
					{loading ? (
						<Skeleton variant="text" animation="wave" width={70} />
					) : (
						name
					)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{loading ? (
						<Skeleton variant="text" animation="wave" width={70} />
					) : (
						new Date(createdAt).toLocaleDateString()
					)}
				</Typography>
			</Stack>
			{loading ? (
				<Skeleton variant="text" animation="wave" width={70} />
			) : (
				<Rating
					name="read-only"
					value={rating}
					readOnly
					precision={0.25}
					sx={{
						mb: 2,
						color: "#00f3b6",
					}}
				/>
			)}
			<Typography
				variant="body1"
				color="text.secondary"
				sx={{
					mb: 2,
				}}>
				{loading ? (
					<>
						<Skeleton variant="text" animation="wave" />
						<Skeleton variant="text" animation="wave" />
					</>
				) : (
					review
				)}
			</Typography>
		</Card>
	);
};

export default ReviewCard;
