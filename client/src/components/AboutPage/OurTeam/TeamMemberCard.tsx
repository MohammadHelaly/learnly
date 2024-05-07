import { Box, Card, Typography, Stack } from "@mui/material";
import { EmailOutlined, X, GitHub, LinkedIn } from "@mui/icons-material";
import CardNavLink from "../../UI/Links/CardNavLink";
import useAnimate from "../../../hooks/use-animate";

interface TeamMemberCardProps extends TeamMember {
	index: number;
}

const TeamMemberCard = (props: TeamMemberCardProps) => {
	const {
		name,
		role,
		photo,
		description,
		email,
		linkedIn,
		github,
		x,
		index,
	} = props;
	const elementRef = useAnimate("animate", false);
	const delay = index * 0.2;

	return (
		<Card
			ref={elementRef}
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				width: window.innerWidth > 600 ? 352 : "100%",
				opacity: 0,
				transform: "translateX(-50%)",
				transition: `all 0.6s ease-in-out ${delay}s`,
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
					{email && (
						<CardNavLink
							to={`mailto:${email}`}
							rel="noopener noreferrer"
							target="_blank">
							<EmailOutlined
								sx={{
									height: 36,
									width: 36,
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
					{linkedIn && (
						<CardNavLink
							to={linkedIn}
							rel="noopener noreferrer"
							target="_blank">
							<LinkedIn
								sx={{
									height: 32,
									width: 32,
									transform: "scale(1.1)",
									transition: "all 0.5s ease",
									"&:hover": {
										transform:
											"translateY(-10%) scale(1.1)",
										opacity: 0.7,
									},
								}}
							/>
						</CardNavLink>
					)}
					{github && (
						<CardNavLink
							to={github}
							rel="noopener noreferrer"
							target="_blank">
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
						<CardNavLink
							to={x}
							rel="noopener noreferrer"
							target="_blank">
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
