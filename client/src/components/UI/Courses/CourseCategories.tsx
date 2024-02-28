import { Stack, Skeleton, SxProps } from "@mui/material";
import SectionWrapper from "../PageLayout/SectionWrapper";
import CategoryTag from "./CategoryTag";
import ErrorWarning from "../Messages/ErrorWarning";

interface CourseCategoriesProps extends Pick<Course, "categories"> {
	isLoading: boolean;
	isError: boolean;
	sx?: SxProps;
	editable?: boolean;
	onEdit?: (category: string) => void;
}

const CourseCategories = (props: CourseCategoriesProps) => {
	const { categories, isLoading, isError, sx, editable, onEdit } = props;

	return (
		<SectionWrapper>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="center"
				flexWrap="wrap"
				sx={{
					py: 4,
					gap: 2,
					...sx,
				}}>
				{
					// isError ? (
					// 	<ErrorWarning />
					// ) :
					isLoading
						? Array(5)
								.fill(null)
								.map((_, index) => (
									<CategoryTag key={index}>
										<Skeleton
											animation="wave"
											variant="text"
											width={100}
										/>
									</CategoryTag>
								))
						: categories?.map((category: string, index: number) => (
								<CategoryTag
									key={index}
									editable={editable}
									onEdit={
										onEdit
											? () => onEdit(category)
											: undefined
									}>
									{category}
								</CategoryTag>
						  ))
				}
			</Stack>
		</SectionWrapper>
	);
};

export default CourseCategories;
