import { Card, Stack, Typography, Rating, Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledNavLink = styled(NavLink)((theme) => ({
	color: "black",
	transition: "all 1s ease",
	textDecoration: "none",
	marginLeft: window.innerWidth > 600 ? 10 : 2,
	"&:hover": {
		textDecoration: "underline",
	},
}));

const InstructorCard = (props: Instructor) => {
	const {
		id,
		name,
		photo,
		bio,
		coursesCreated,
		ratingsAverage,
		ratingsQuantity,
		students,
	} = props;

	return (
		<Card
			sx={{
				width: "100%",
				p: 2,
				borderRadius: 0,
				boxShadow: "none",
				borderBottom: 1,
				borderColor: "divider",
			}}>
			<Stack
				direction="row"
				spacing={2}
				alignItems="center"
				sx={{
					mb: 1,
				}}>
				<Avatar
					alt={name}
					src={photo}
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
					<StyledNavLink to={`/users/${id}`}>
						<Typography
							variant="h5"
							sx={{
								fontWeight: 400,
							}}>
							{name}
						</Typography>
					</StyledNavLink>
					<Stack direction="row" spacing={1} alignItems="center">
						<Rating
							name="read-only"
							value={ratingsAverage}
							precision={0.25}
							readOnly
							sx={{
								mb: 2,
								color: "secondary.main",
							}}
						/>
						<Typography variant="body2" color="text.secondary">
							{"("}
							{ratingsQuantity}
							{")"}
						</Typography>
					</Stack>

					<Typography variant="body2" color="text.secondary">
						{students + " Students"}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{coursesCreated?.length + " Courses"}
					</Typography>
				</Stack>
			</Stack>
			<Typography
				variant="body1"
				color="text.secondary"
				sx={{
					my: 3,
				}}>
				{bio}
			</Typography>
		</Card>
	);
};

export default InstructorCard;
