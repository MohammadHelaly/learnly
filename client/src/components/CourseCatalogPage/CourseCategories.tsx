import { Card, Stack, Typography, Skeleton } from "@mui/material";

interface CourseCategoriesProps {
	categories: string[];
	loading: boolean;
}

const CourseCategories = (props: CourseCategoriesProps) => {
	const { categories, loading } = props;

	return (
		<Stack
			direction="row"
			spacing={1}
			alignItems="center"
			justifyContent={window.innerWidth > 600 ? "left" : "center"}
			flexWrap="wrap"
			sx={{
				py: 3,
				gap: 2,
			}}>
			{categories.map((category: string, index: number) => (
				<Card
					variant="outlined"
					key={index}
					color="primary"
					sx={{
						mb: 2,
						mx: 2,
						pt: 1,
						pb: 3,
						px: 2,
						width: "auto",
						height: "15px",
						fontSize: "1rem",
						backgroundColor: "white",
						border: "1px solid #00f3b6",
						borderRadius: 10,
					}}>
					<Typography
						variant="body1"
						sx={{
							mt: 0.5,
						}}>
						{loading ? (
							<Skeleton
								animation="wave"
								variant="text"
								width="125px"
							/>
						) : (
							category
						)}
					</Typography>
				</Card>
			))}
		</Stack>
	);
};

export default CourseCategories;
