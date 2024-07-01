import { Card, Typography, Rating, Stack, Box } from "@mui/material";
import { Check, Close, People } from "@mui/icons-material";
import CardNavLink from "../../Links/CardNavLink";
import formatNumber from "../../../../utils/formatNumber";
import formatDuration from "../../../../utils/formatDuration";
interface InstructorDashboardCourseCardProps
	extends Pick<
		Course,
		| "id"
		| "name"
		| "imageCover"
		| "price"
		| "paid"
		| "ratingsAverage"
		| "ratingsQuantity"
		| "difficulty"
		| "duration"
		| "published"
		| "students"
		| "channel"
	> {}

const InstructorDashboardCourseCard = (
	props: InstructorDashboardCourseCardProps
) => {
	const {
		id,
		name,
		imageCover,
		price,
		paid,
		ratingsAverage,
		ratingsQuantity,
		difficulty,
		duration,
		published,
		students,
		channel,
	} = props;

	return (
		<CardNavLink to={`/dashboard/teach/courses/${id}`}>
			<Card
				sx={{
					display: "flex",
					flexDirection: window.innerWidth > 600 ? "row" : "column",
					height: window.innerWidth < 600 ? "auto" : 204,
					width: "100%",
					transition: `all 0.6s ease-in-out`,
					borderRadius: 0,
					backgroundColor: "transparent",
					borderBottom: "1px solid #dddddd",
					boxShadow: "none",
					px: 0,
					py: window.innerWidth < 600 ? 0 : 1,
				}}>
				<Box
					sx={{
						height: 200,
						minWidth: window.innerWidth > 600 ? 356 : "100%",
						maxWidth: window.innerWidth > 600 ? 356 : "100%",
					}}>
					<img
						src={imageCover.url}
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
						flexGrow: 1,
						transition: "all 0.5s ease",
						py: 1,
						px: window.innerWidth > 600 ? 2 : 0,
						display: "flex",
						flexDirection: "column",
					}}>
					<Typography
						variant="h6"
						color="common.black"
						sx={{
							fontWeight: 500,
							width: "100%",
						}}>
						{name?.length > 30
							? name?.slice(0, 30) + "..."
							: name ?? "[Course Name Unavailable]"}
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{
							fontWeight: 400,
							width: "100%",
						}}></Typography>
					<Stack direction="row" spacing={1} alignItems="center">
						<Rating
							name="read-only"
							value={ratingsAverage}
							readOnly
							precision={0.25}
							size="small"
							sx={{
								color: "secondary.main",
								// color: "black",
							}}
						/>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{ fontWeight: 400 }}>
							{"("}
							{formatNumber(ratingsQuantity)}
							{")"}
						</Typography>
					</Stack>
					{!paid || price === 0 ? (
						<Typography
							variant="h6"
							color="common.black"
							sx={{ fontWeight: 400 }}>
							{"Free"}
						</Typography>
					) : (
						<Typography
							variant="h6"
							color="common.black"
							sx={{ fontWeight: 400 }}>
							{"$"}
							{price}
						</Typography>
					)}
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ fontWeight: 400 }}>
						{formatDuration(duration)}
						{" - "}
						{difficulty?.charAt(0).toUpperCase() +
							difficulty?.slice(1)}
						{" Level"}
					</Typography>
					<Stack
						direction="row"
						justifyContent="flex-start"
						alignItems="center"
						sx={{
							width: "100%",
							gap: 1,
						}}>
						<People />
						<Typography variant="body1">
							{formatNumber(students as number) + " Student(s)"}
						</Typography>
					</Stack>
					<Stack
						direction="row"
						justifyContent="flex-start"
						alignItems="center"
						sx={{
							width: "100%",
							gap: 1,
						}}>
						{published ? (
							<Check
								sx={{
									color: "secondary.main",
								}}
							/>
						) : (
							<Close
								sx={{
									color: "error.main",
								}}
							/>
						)}
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{
								fontWeight: 400,
								color: published
									? "secondary.main"
									: "error.main",
							}}>
							{published ? "Published" : "Unpublished"}
						</Typography>
					</Stack>
					<Stack
						direction="row"
						justifyContent="flex-start"
						alignItems="center"
						sx={{
							width: "100%",
							gap: 1,
						}}>
						{channel ? (
							<Check
								sx={{
									color: "secondary.main",
								}}
							/>
						) : (
							<Close
								sx={{
									color: "error.main",
								}}
							/>
						)}
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{
								fontWeight: 400,
								color: channel
									? "secondary.main"
									: "error.main",
							}}>
							{channel ? "Channel Live" : "No Channel"}
						</Typography>
					</Stack>
				</Box>
			</Card>
		</CardNavLink>
	);
};

export default InstructorDashboardCourseCard;
