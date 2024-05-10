import { ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import { Container, Pagination } from "@mui/material";
import CourseBanner from "../UI/Courses/Catalog/CourseBanner";
import StarRateIcon from "@mui/icons-material/StarRate";
import Reviews from "../UI/Reviews/Reviews";
import PageWrapper from "../UI/PageLayout/PageWrapper";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import SectionHeader from "../UI/PageLayout/SectionHeader";
import formatNumber from "../../helpers/formatNumber";

interface CourseReviewsSectionProps {
	courseId: string | number;
}

const CourseReviewsSection = (props: CourseReviewsSectionProps) => {
	const { courseId } = props;
	const [page, setPage] = useState(1);

	const limit = 9;

	const pageChangeHandler = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const {
		data, //: course,
		isLoading: isLoadingCourse,
		isError: isErrorCourse,
	} = useQuery({
		queryKey: ["courses", { courseId }],
		queryFn: async () =>
			await api.get(`/courses/${courseId}`, {
				params: {
					fields: "name,price,ratingsAverage,ratingsQuantity",
				},
			}),
		select: (response) => response.data.data.data,
	});

	const {
		data: reviews, //: courseReviews,
		isLoading: isLoadingReviews,
		isError: isErrorReviews,
	} = useQuery({
		queryKey: ["courseReviews", { courseId, page }],
		queryFn: async () =>
			await api.get(`/courses/${courseId}/reviews`, {
				params: {
					page,
					limit,
				},
			}),
		select: (response) => response.data,
	});

	const courseReviews = reviews?.data?.data;

	const count = reviews?.count ?? 1;

	const course = data;

	const pagesCount = Math.ceil(count / limit);

	return (
		<>
			<CourseBanner
				id={courseId as string}
				name={course?.name}
				price={course?.price}
				isLoading={isLoadingCourse}
				isError={isErrorCourse}
			/>
			<PageWrapper>
				<Container maxWidth="lg">
					<SectionWrapper>
						<SectionHeader
							heading={course?.name}
							headingAlignment="left"
							sx={{
								mb: 2,
							}}
						/>
						<SectionHeader
							isSubHeading
							heading={
								<>
									<StarRateIcon fontSize="medium" />
									{course?.ratingsAverage} out of 5 stars
									{" ("}
									{formatNumber(course?.ratingsQuantity)}
									{" ratings)"}
								</>
							}
							headingAlignment="left"
						/>
						<Reviews
							reviews={courseReviews}
							isError={isErrorReviews}
							isLoading={isLoadingReviews}
							maxLength={limit}
						/>
					</SectionWrapper>
				</Container>
				<Pagination
					count={pagesCount}
					page={page}
					onChange={pageChangeHandler}
					variant="outlined"
					sx={{
						my: 8,
					}}
				/>
			</PageWrapper>
		</>
	);
};

export default CourseReviewsSection;
