import { useQuery } from "@tanstack/react-query";
import api from "../../../api";
import StarRateIcon from "@mui/icons-material/StarRate";
import Reviews from "./Reviews";
import BottomTextLink from "../Links/BottomTextLink";
import dummyCourseReviewsData from "../../../assets/data/dummyCourseReviewsData";
import SectionHeader from "../PageLayout/SectionHeader";
import SectionWrapper from "../PageLayout/SectionWrapper";
import formatNumber from "../../../helpers/formatNumber";

interface CourseReviewsProps
	extends Pick<Course, "id" | "ratingsAverage" | "ratingsQuantity"> {
	reviews: Review[];
	isLoading?: boolean;
	isError?: boolean;
}

const CourseReviews = (props: CourseReviewsProps) => {
	const { id, ratingsAverage, ratingsQuantity } = props;

	const dummyReviews = dummyCourseReviewsData.slice(0, 3);

	const {
		data, //: courseReviews,
		isLoading: isLoading,
		isError: isError,
	} = useQuery({
		queryKey: ["courseReviews", { id }],
		queryFn: async () =>
			await api.get(`/courses/${id}/reviews`, {
				params: {
					limit: 3,
					fields: "name,price,ratingsAverage,ratingsQuantity,rating,createdAt,review",
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
				sx={{
					mb: 2,
				}}
			/>
			<SectionHeader
				heading={
					<>
						<StarRateIcon fontSize="medium" />
						{ratingsAverage} out of 5 stars {" ("}
						{formatNumber(ratingsQuantity)} {" ratings)"}
					</>
				}
				headingAlignment="left"
				headingAnimated={false}
				isSubHeading
			/>
			<Reviews
				reviews={courseReviews}
				isLoading={isLoading}
				isError={isError}
				maxLength={3}
			/>
			<BottomTextLink
				to={`/courses/${id}/reviews`}
				text="See More Reviews"
			/>
		</SectionWrapper>
	);
};

export default CourseReviews;
