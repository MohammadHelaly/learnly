import React from "react";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Typography,
	Stack,
} from "@mui/material";
import { EmailOutlined, X, GitHub, LinkedIn } from "@mui/icons-material";
import CardNavLink from "../../UI/Links/CardNavLink";

interface TeamMemberCardProps extends TeamMember {}

const TeamMemberCard = (props: TeamMemberCardProps) => {
	const { name, role, photo, description, email, linkedIn, github, x } =
		props;
	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				width: window.innerWidth > 600 ? 352 : "100%",
				transition: `all 0.6s ease-in-out`,
				borderRadius: 0,
				backgroundColor: "transparent",
				borderBottom: "1px solid #dddddd",
				boxShadow: "none",
				p: 0,
			}}>
			<Box sx={{ height: 400, width: "100%" }}>
				<img
					src={photo}
					alt="course"
					style={{
						objectFit: "cover",
						height: "100%",
						width: "100%",
						borderRadius: 12,
					}}
				/>
			</Box>
			<Box
				sx={{
					transition: "all 0.5s ease",
					py: 2,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 2,
					flexGrow: 1,
					width: "100%",
				}}>
				<Stack gap={2} direction="column" sx={{ width: "100%" }}>
					<Typography variant="h4" textAlign="center">
						{name}
					</Typography>
					<Typography variant="h6" textAlign="center">
						{role}
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						textAlign="center">
						{description}
					</Typography>
				</Stack>
				<Stack
					flexDirection="row"
					justifyContent="center"
					alignItems="center"
					gap={2}
					sx={{
						mt: 2,
					}}>
					<CardNavLink to={`mailto:${email}`}>
						<EmailOutlined
							sx={{
								height: 36,
								width: 36,
								transform: "scale(0.95)",
								transition: "all 0.5s ease",
								"&:hover": {
									transform: "translateY(-10%) scale(0.95)",
									opacity: 0.7,
								},
							}}
						/>
					</CardNavLink>
					<CardNavLink to={linkedIn}>
						<LinkedIn
							sx={{
								height: 32,
								width: 32,
								transform: "scale(1.1)",
								transition: "all 0.5s ease",
								"&:hover": {
									transform: "translateY(-10%) scale(1.1)",
									opacity: 0.7,
								},
							}}
						/>
					</CardNavLink>
					{github && (
						<CardNavLink to={github}>
							<GitHub
								sx={{
									height: 32,
									width: 32,
									transform: "scale(0.95)",
									transition: "all 0.5s ease",
									"&:hover": {
										transform:
											"translateY(-10%) scale(0.95)",
										opacity: 0.7,
									},
								}}
							/>
						</CardNavLink>
					)}
					{x && (
						<CardNavLink to={x}>
							<X
								sx={{
									height: 32,
									width: 32,
									transform: "scale(0.95)",
									transition: "all 0.5s ease",
									"&:hover": {
										transform:
											"translateY(-10%) scale(0.95)",
										opacity: 0.7,
									},
								}}
							/>
						</CardNavLink>
					)}
				</Stack>
			</Box>
		</Card>
	);
};

export default TeamMemberCard;
