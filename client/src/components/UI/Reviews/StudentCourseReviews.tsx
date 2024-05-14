import React from "react";
import PageWrapper from "../PageLayout/PageWrapper";
import ReviewForm from "../../CourseStudentDashboardPage/ReviewForm";
import CourseReviews from "./CourseReviews";
import dummyCourseReviewsData from "../../../assets/data/dummyCourseReviewsData";
import { useQuery } from "@tanstack/react-query";
import UpdateReviewForm from "./UpdateReviewForm";
import AuthContext from "../../../store/auth-context";
import { useContext } from "react";
import api from "../../../api";
interface StudentCourseReviewsProps {
	courseId: string;
	course: Course;
}

function StudentCourseReviews(props: StudentCourseReviewsProps) {
	const { courseId, course } = props;
	const authContext = useContext(AuthContext);
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
					course: courseId,
					user: authContext.user?.id,
				},
			}),
		select: (response) => response.data.data.data,
	});
	const courseReview = data ?? [];

	return (
		<PageWrapper>
			{courseReview.length !== 0 ? (
				<UpdateReviewForm
					courseId={courseId || ""}
					review={courseReview[0].review}
					rating={courseReview[0].rating}
					reviewId={courseReview[0].id}
				/>
			) : (
				<ReviewForm courseId={courseId || ""} />
			)}

			<CourseReviews
				id={courseId as string}
				reviews={course?.reviews as Review[]}
				ratingsAverage={course?.ratingsAverage}
				ratingsQuantity={course?.ratingsQuantity}
			/>
		</PageWrapper>
	);
}

export default StudentCourseReviews;
