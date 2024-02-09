import {
	Card,
	Container,
	Stack,
	Typography,
	Rating,
	Avatar,
	Skeleton,
} from "@mui/material";
import ApiInstance from "../../api/ApiInstance";
import { useEffect, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { date } from "zod";

const ReviewCard = (props) => {
	const { rating, review, createdAt, user } = props.review;
	const { name, photo } = user;
	const loading = props.loading;

	return (
		<Card
			sx={{
				minWidth: "90%",
				p: 4,
				// backgroundColor: "#f5f5f5",
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
						<Skeleton variant="text" animation="wave" width={80} />
					) : (
						name
					)}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{loading ? (
						<Skeleton variant="text" animation="wave" width={80} />
					) : (
						new Date(createdAt).toLocaleDateString()
					)}
				</Typography>
			</Stack>
			{loading ? (
				<Skeleton variant="text" animation="wave" width={80} />
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
