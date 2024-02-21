import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import StarRateIcon from "@mui/icons-material/StarRate";
import Reviews from "../UI/Reviews/Reviews";
import BottomTextLink from "../UI/BottomTextLink";
import dummyCourseReviewsData from "../../assets/data/dummyCourseReviewsData";
import SectionHeader from "../UI/SectionHeader";
import SectionWrapper from "../UI/SectionWrapper";

interface CourseReviewsProps {
	courseId: string | number;
	reviews: Review[];
	ratingsAverage: number;
	ratingsQuantity: number;
	isLoading?: boolean;
	isError?: boolean;
}

const CourseReviews = (props: CourseReviewsProps) => {
	const { courseId, ratingsAverage, ratingsQuantity } = props;

	const dummyReviews = dummyCourseReviewsData.slice(0, 3);

	const {
		data, //: courseReviews,
		isLoading: isLoading,
		isError: isError,
	} = useQuery({
		queryKey: ["courseReviews", { courseId }],
		queryFn: async () =>
			await api.get(`/courses/${courseId}/reviews`, {
				params: {
					limit: 3,
					fields: "name,price,ratingsAverage,ratingsQuantity",
				},
			}),
		select: (response) => response.data.data.data,
	});

	const courseReviews = data ?? dummyReviews;

	return (
		<SectionWrapper>
			<SectionHeader
				heading="What People Are Saying About This Course"
				headingAlignment="left"
				headingAnimated={false}
			/>
			<Typography
				variant="h5"
				color="text.secondary"
				sx={{
					textAlign: window.innerWidth > 600 ? "left" : "center",
					my: 5,
				}}>
				<StarRateIcon fontSize="medium" />
				{ratingsAverage} out of 5 stars{" ("}
				{ratingsQuantity}
				{" ratings)"}
			</Typography>
			<Reviews
				reviews={courseReviews}
				isLoading={isLoading}
				isError={isError}
				maxLength={3}
			/>
			<BottomTextLink
				to={`/courses/${courseId}/reviews`}
				text="See More Reviews"
			/>
		</SectionWrapper>
	);
};

export default CourseReviews;
