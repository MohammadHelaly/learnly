import { Card, Stack, Typography, Rating, Avatar, Box } from "@mui/material";
import ReviewOptions from "./ReviewOptions";
import AuthContext from "../../../store/auth-context";
import { useContext } from "react";
const ReviewCard = (props: Review) => {
	const authContext = useContext(AuthContext);
	const { rating, review, createdAt, user } = props;
	const { name, photo } = user;

	return (
		<Card
			sx={{
				width: "100%",
				p: 2,
				boxShadow: "none",
				borderBottom: 1,
				borderRadius: 0,
				borderColor: "divider",
			}}
		>
			<Stack
				direction="row"
				spacing={2}
				alignItems="center"
				justifyContent="space-between"
				sx={{
					mb: 1,
				}}
			>
				<Box>
					<Avatar alt={name} src={photo?.url} />
					<Typography variant="h6">{name}</Typography>
					<Typography variant="body2" color="text.secondary">
						{new Date(createdAt).toLocaleDateString()}
					</Typography>
				</Box>

				{/* {authContext.user?.id === user.id && <ReviewOptions />} */}
				{/* <ReviewOptions /> */}
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
				}}
			>
				{review}
			</Typography>
		</Card>
	);
};

export default ReviewCard;
