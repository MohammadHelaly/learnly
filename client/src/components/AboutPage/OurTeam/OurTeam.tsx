import { Box, Stack, Typography, Container } from "@mui/material";
import teamMembers from "../../../assets/data/teamMembers";
import TeamMemberCard from "./TeamMemberCard";
import TextNavLink from "../../UI/Links/TextNavLink";

const OurTeam = () => {
	return (
		<Box
			sx={{
				// px: window.innerWidth > 600 ? 20 : 2,
				py: 10,
				color: "common.black",
				overflowX: "hidden",
				backgroundColor: "rgb(245, 245, 245)",
			}}>
			<Container maxWidth="lg">
				<Stack spacing={4}>
					<Typography
						variant="h4"
						color="common.black"
						textAlign="center"
						sx={{
							mt: 10,
							mb: 5,
						}}>
						Our Team
					</Typography>
					<Stack
						direction="row"
						justifyContent="center"
						alignItems="stretch"
						flexWrap="wrap"
						gap={4}>
						{teamMembers.map((member, index) => (
							<TeamMemberCard
								key={member.name}
								index={index}
								{...member}
							/>
						))}
					</Stack>
				</Stack>
				<Stack
					spacing={4}
					sx={{
						mt: 10,
					}}>
					<Typography
						variant="h4"
						color="common.black"
						textAlign="center">
						Learnly was developed under the supervision of
					</Typography>
					<TextNavLink
						to="https://scholar.google.com.eg/citations?user=nvfuob4AAAAJ"
						target="_blank"
						rel="noreferrer"
						sx={{
							mt: 10,
							mb: 4,
							color: "common.black",
						}}>
						<Typography
							variant="h4"
							color="common.black"
							textAlign="center">
							Prof. Dr. Sahar M. Ghanem
						</Typography>
					</TextNavLink>
				</Stack>
			</Container>
		</Box>
	);
};

export default OurTeam;
