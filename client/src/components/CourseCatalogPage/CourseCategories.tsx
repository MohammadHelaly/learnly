import { Stack, Skeleton } from "@mui/material";
import SectionWrapper from "../UI/SectionWrapper";
import CategoryTitle from "../UI/CategoryTitle";
import ErrorWarning from "../UI/ErrorWarning";

interface CourseCategoriesProps {
	categories: string[];
	isLoading: boolean;
	isError: boolean;
}

const CourseCategories = (props: CourseCategoriesProps) => {
	const { categories, isLoading, isError } = props;

	return (
		<SectionWrapper>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="center"
				flexWrap="wrap"
				sx={{
					py: 4,
					gap: 1,
				}}>
				{
					// isError ? (
					// 	<ErrorWarning />
					// ) :
					isLoading
						? Array(5)
								.fill(null)
								.map((_, index) => (
									<CategoryTitle key={index}>
										<Skeleton
											animation="wave"
											variant="text"
											width={100}
										/>
									</CategoryTitle>
								))
						: categories?.map((category: string, index: number) => (
								<CategoryTitle key={index}>
									{category}
								</CategoryTitle>
						  ))
				}
			</Stack>
		</SectionWrapper>
	);
};

export default CourseCategories;
