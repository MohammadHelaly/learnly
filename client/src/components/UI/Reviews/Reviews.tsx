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
	reviews: {
		id: number | string;
		rating: number;
		review: string;
		user: {
			id: number | string;
			name: string;
			photo: string;
		};
		createdAt: string | Date;
	}[];
}

const Reviews = (props: ReviewsProps) => {
	const { reviews, isError, isLoading, maxLength, sx } = props;

	return (
		<Container maxWidth="lg">
			<Stack direction="column" alignItems="center">
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
						reviews?.map((reviewItem) => {
							const { id, rating, review, user, createdAt } =
								reviewItem;
							return (
								<ReviewCard
									key={id}
									review={review}
									rating={rating}
									user={user}
									createdAt={createdAt}
								/>
							);
						})
					)
				}
			</Stack>
		</Container>
	);
};

export default Reviews;
