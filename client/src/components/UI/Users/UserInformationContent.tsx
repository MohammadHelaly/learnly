import { Box, Stack, Typography, Avatar, Rating } from "@mui/material";
import { People, CastForEducation } from "@mui/icons-material";
import formatNumber from "../../../helpers/formatNumber";

interface UserInformationContentProps
	extends Pick<
		User,
		| "name"
		| "photo"
		| "bio"
		| "role"
		| "ratingsAverage"
		| "ratingsQuantity"
		| "students"
		| "coursesCreated"
	> {}

const UserInformationContent = (props: UserInformationContentProps) => {
	const {
		name,
		photo,
		bio,
		role,
		ratingsAverage,
		ratingsQuantity,
		students,
		coursesCreated,
	} = props;

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				flexDirection: window.innerWidth > 600 ? "row" : "column",
				alignItems: window.innerWidth > 600 ? "flex-start" : "center",
				justifyContent:
					window.innerWidth > 600 ? "flex-start" : "center",
				gap: window.innerWidth > 600 ? 4 : 0,
				pb: window.innerWidth > 600 ? 0 : 4,
				textAlign: window.innerWidth > 600 ? "left" : "center",
			}}>
			<Avatar
				src={photo?.url}
				alt={`${name}'s profile picture`}
				sx={{
					width: 260,
					height: 260,
					mb: 2,
					border: 4,
					borderColor: "white",
				}}
			/>
			<Stack
				direction="column"
				gap={4}
				sx={{
					pt: window.innerWidth > 600 ? 12 : 0,
				}}>
				<Stack direction="column" gap={1}>
					<Typography variant="h3">{name}</Typography>
					{role === "instructor" && (
						<>
							<Stack
								direction="row"
								spacing={1}
								alignItems="center">
								<Rating
									name="read-only"
									value={ratingsAverage}
									precision={0.25}
									size="large"
									readOnly
									sx={{
										mb: 2,
										color: "secondary.main",
									}}
								/>
								<Typography variant="h5" color="text.primary">
									{"("}
									{formatNumber(ratingsQuantity)}
									{")"}
								</Typography>
							</Stack>
							<Stack
								direction="row"
								gap={2}
								justifyContent={
									window.innerWidth > 600
										? "flex-start"
										: "center"
								}
								alignContent="center"
								alignItems="center">
								<CastForEducation />
								<Typography variant="h5">
									{formatNumber(coursesCreated?.length)}{" "}
									Course(s)
								</Typography>
							</Stack>
							<Stack
								direction="row"
								gap={2}
								justifyContent={
									window.innerWidth > 600
										? "flex-start"
										: "center"
								}
								alignContent="center"
								alignItems="center">
								<People />
								<Typography variant="h5">
									{formatNumber(students)} Student(s)
								</Typography>
							</Stack>
						</>
					)}
				</Stack>
				<Typography variant="h6">{bio}</Typography>
			</Stack>
		</Box>
	);
};

export default UserInformationContent;
