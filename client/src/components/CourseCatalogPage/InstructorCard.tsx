import {
	Card,
	Container,
	Stack,
	Typography,
	Rating,
	Avatar,
	Skeleton,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

interface InstructorCardProps {
	instructor: {
		id: number | string;
		name: string;
		photo?: string;
		ratingsAverage: number;
		ratingsQuantity: number;
		students: number;
		bio?: string;
	};
	loading: boolean;
}

const StyledNavLink = styled(NavLink)((theme) => ({
	color: "black",
	transition: "all 1s ease",
	textDecoration: "none",
	marginLeft: window.innerWidth > 600 ? 10 : 2,
	"&:hover": {
		textDecoration: "underline",
	},
}));

const InstructorCard = (props: InstructorCardProps) => {
	const { instructor, loading } = props;
	const { id, name, photo, bio, ratingsAverage, ratingsQuantity, students } =
		instructor;

	return (
		<Card
			sx={{
				minWidth: "90%",
				p: 4,
				// backgroundColor: "#f5f5f5",
				borderRadius: 0,
				boxShadow: "none",
				borderBottom: "1px solid #dddddd",
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
							width: 130,
							height: 130,
						}}
					/>
				) : (
					<Avatar
						alt={name}
						src={photo}
						sx={{
							width: 130,
							height: 130,
						}}
					/>
				)}
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
							{loading ? (
								<Skeleton
									variant="text"
									animation="wave"
									width={100}
									height={30}
								/>
							) : (
								name
							)}
						</Typography>
					</StyledNavLink>

					{loading ? (
						<Skeleton
							variant="text"
							animation="wave"
							width={200}
							height={20}
						/>
					) : (
						<Stack direction="row" spacing={1} alignItems="center">
							<Rating
								name="read-only"
								value={ratingsAverage}
								precision={0.25}
								readOnly
								sx={{
									mb: 2,
									color: "#00f3b6",
								}}
							/>
							<Typography variant="body2" color="text.secondary">
								{"("}
								{ratingsQuantity}
								{")"}
							</Typography>
						</Stack>
					)}

					<Typography variant="body2" color="text.secondary">
						{loading ? (
							<Skeleton
								variant="text"
								animation="wave"
								width={150}
								height={20}
							/>
						) : (
							<>
								{students}
								{" Students"}
							</>
						)}
					</Typography>

					<Typography variant="body2" color="text.secondary">
						{loading ? (
							<Skeleton
								variant="text"
								animation="wave"
								width={150}
								height={20}
							/>
						) : (
							<>
								{"7"}
								{" Courses"}
							</>
						)}
					</Typography>
				</Stack>
			</Stack>

			<Typography
				variant="body1"
				color="text.secondary"
				sx={{
					my: 3,
				}}>
				{loading ? (
					<>
						<Skeleton variant="text" animation="wave" />
						<Skeleton variant="text" animation="wave" />
						<Skeleton variant="text" animation="wave" />
						<Skeleton variant="text" animation="wave" width="70%" />
					</>
				) : (
					bio
				)}
			</Typography>
		</Card>
	);
};

export default InstructorCard;
