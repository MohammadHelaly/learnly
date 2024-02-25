import { Container, Stack, SxProps } from "@mui/material";
import ReviewCard from "./ReviewCard";
import SkeletonReviewCard from "./SkeletonReviewCard";
import ErrorWarning from "../ErrorWarning";
import NothingFoundMessage from "../NothingFoundMessage";

interface ReviewsProps {
	isError: boolean;
	isLoading: boolean;
	maxLength: number;
	sx?: SxProps;
	reviews: Review[];
}

const Reviews = (props: ReviewsProps) => {
	const { reviews, isError, isLoading, maxLength, sx } = props;

	return (
		<Container maxWidth="lg">
			<Stack direction="column" alignItems="center" sx={{ ...sx }}>
				{
					// isError ? (
					// 	<ErrorWarning />
					// ) :
					reviews?.length === 0 || !reviews ? (
						<NothingFoundMessage />
					) : isLoading ? (
						Array(maxLength)
							.fill(null)
							.map((_, index) => (
								<SkeletonReviewCard key={index} />
							))
					) : (
						reviews?.map((reviewItem) => (
							<ReviewCard {...reviewItem} />
						))
					)
				}
			</Stack>
		</Container>
	);
};

export default Reviews;
