import { Card, Stack, Typography, Rating, Avatar } from "@mui/material";

interface ReviewCardProps {
	rating: number;
	review: string;
	createdAt: string | Date;
	user: {
		name: string;
		photo: string;
	};
}

const ReviewCard = (props: ReviewCardProps) => {
	const { rating, review, createdAt, user } = props;
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
				<Avatar alt={name} src={photo} />
				<Typography variant="h6">{name}</Typography>
				<Typography variant="body2" color="text.secondary">
					{new Date(createdAt).toLocaleDateString()}
				</Typography>
			</Stack>
			<Rating
				name="read-only"
				value={rating}
				readOnly
				precision={0.25}
				sx={{
					mb: 2,
					color: "secondary.main",
				}}
			/>
			<Typography
				variant="body1"
				color="text.secondary"
				sx={{
					mb: 2,
				}}>
				{review}
			</Typography>
		</Card>
	);
};

export default ReviewCard;
