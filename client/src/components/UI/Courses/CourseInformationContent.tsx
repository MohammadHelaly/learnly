import { Stack, Typography, Skeleton, Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import CourseDurationAndDifficulty from "./CourseDurationAndDifficulty";

interface CourseInformationContentProps {
	name: string;
	summary: string;
	duration: number;
	difficulty: string;
	ratingsAverage: number;
	ratingsQuantity: number;
	instructors: {
		id: number | string;
		name: string;
		photo?: string;
		ratingsAverage: number;
		ratingsQuantity: number;
		students: number;
		bio?: string;
	}[];
	isLoading: boolean;
}

const StyledNavLink = styled(NavLink)((theme) => ({
	textDecoration: "none",
	color: "#9c27b0",
	"&:hover": {
		textDecoration: "underline",
	},
}));

const CourseInformationContent = (props: CourseInformationContentProps) => {
	const {
		name,
		summary,
		duration,
		difficulty,
		ratingsAverage,
		ratingsQuantity,
		instructors,
		isLoading,
	} = props;

	return (
		<>
			{isLoading ? (
				<>
					<Stack
						direction="column"
						alignItems={
							window.innerWidth > 600 ? "left" : "center"
						}>
						<Skeleton
							animation="wave"
							variant="text"
							width="100%"
							height={48}
						/>
						<Skeleton
							animation="wave"
							variant="text"
							height={48}
							width="60%"
						/>
					</Stack>
					<Stack
						direction="column"
						spacing={1}
						alignItems={
							window.innerWidth > 600 ? "left" : "center"
						}>
						<Skeleton
							animation="wave"
							variant="text"
							width="100%"
						/>
						<Skeleton
							animation="wave"
							variant="text"
							width="100%"
						/>
						<Skeleton animation="wave" variant="text" width="60%" />
					</Stack>
				</>
			) : (
				<>
					<Typography
						variant="h4"
						sx={{
							textAlign:
								window.innerWidth > 600 ? "left" : "center",
						}}>
						{name}
					</Typography>
					<Typography
						variant="h6"
						sx={{
							textAlign:
								window.innerWidth > 600 ? "left" : "center",
							maxWidth: window.innerWidth > 600 ? "70%" : "auto",
						}}>
						{summary}
					</Typography>
				</>
			)}
			<CourseDurationAndDifficulty
				duration={duration}
				difficulty={difficulty}
				isLoading={isLoading}
			/>
			{isLoading ? (
				<Stack
					direction="column"
					spacing={1}
					alignItems={window.innerWidth > 600 ? "left" : "center"}>
					<Skeleton animation="wave" width="40%" height={32} />
					<Skeleton animation="wave" variant="text" width="25%" />
				</Stack>
			) : (
				<>
					<Stack
						direction="row"
						spacing={1}
						alignItems="center"
						justifyContent={
							window.innerWidth > 600 ? "left" : "center"
						}>
						<Stack direction="row" spacing={1}>
							<Rating
								name="read-only"
								value={ratingsAverage}
								readOnly
								precision={0.25}
								size="large"
								sx={{ color: "#00f3b6" }}
							/>
							<Typography
								variant="h6"
								color="common.black"
								sx={{
									fontWeight: 300,
									textAlign:
										window.innerWidth > 600
											? "left"
											: "center",
								}}>
								{"(" + ratingsQuantity + ")"}
							</Typography>
						</Stack>
					</Stack>
					<Stack
						direction="row"
						spacing={1}
						justifyContent={
							window.innerWidth > 600 ? "left" : "center"
						}>
						<Typography
							variant="body2"
							sx={{
								textAlign:
									window.innerWidth > 600 ? "left" : "center",
							}}>
							{"Taught by"}
							<StyledNavLink to={`/users/${instructors[0].id}`}>
								{" "}
								{instructors[0].name}
							</StyledNavLink>
						</Typography>
					</Stack>
				</>
			)}
		</>
	);
};

export default CourseInformationContent;
