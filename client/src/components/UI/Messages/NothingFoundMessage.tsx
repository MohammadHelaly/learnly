import { Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import SectionWrapper from "../PageLayout/SectionWrapper";

interface NothingFoundMessageProps {
	variant?: "studentDashboard" | "instructorDashboard";
}

const StyledNavLink = styled(NavLink)((theme) => ({
	color: "inherit",
	textDecoration: "none",
}));

const NothingFoundMessage = (props: NothingFoundMessageProps) => {
	const { variant } = props;

	return (
		<SectionWrapper
			sx={{
				my: 10,
				textAlign: "center",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 4,
			}}>
			{variant === "studentDashboard" ? (
				<>
					<Typography variant="h4" color="text.secondary">
						You aren't enrolled in any courses yet. Explore our
						catalog and find something you like!
					</Typography>
					<StyledNavLink to="/courses">
						<Button
							variant="contained"
							color="primary"
							size="large"
							disableElevation>
							Explore Courses
						</Button>
					</StyledNavLink>
				</>
			) : variant === "instructorDashboard" ? (
				<>
					<Typography variant="h4" color="text.secondary">
						You haven't created any courses yet. Get started by
						creating a new course!
					</Typography>
					<StyledNavLink to="/dashboard/create-course">
						<Button
							variant="contained"
							color="primary"
							size="large"
							disableElevation>
							Create a Course
						</Button>
					</StyledNavLink>
				</>
			) : (
				<Typography variant="h4" color="text.secondary">
					Found nothing to show...
				</Typography>
			)}
		</SectionWrapper>
	);
};

export default NothingFoundMessage;
