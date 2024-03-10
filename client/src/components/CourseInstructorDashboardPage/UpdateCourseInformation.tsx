import { useQuery } from "@tanstack/react-query";
import dummyCoursesData from "../../assets/data/dummyCoursesData";
import api from "../../api";
import PageWrapper from "../UI/PageLayout/PageWrapper";
import FormContainer from "../UI/PageLayout/FormContainer";
import UpdateCourseInformationForm from "./UpdateCourseInformationForm";
import ErrorWarning from "../UI/Messages/ErrorWarning";

interface UpdateCourseInformationProps {
	courseId: Pick<Course, "id"> | string | number | undefined;
}

const UpdateCourseInformation = (props: UpdateCourseInformationProps) => {
	const { courseId } = props;

	const dummyCourse = dummyCoursesData.find(
		(course) => course.id === parseInt(courseId as string)
	);

	const {
		data, //: course,
		isLoading, //isError
		isError,
	} = useQuery({
		queryKey: ["courses", { courseId }],
		queryFn: async () => await api.get(`/courses/${courseId}`),
		select: (response) => response.data.data.data,
	});

	const course = data ?? dummyCourse;

	return (
		<PageWrapper sx={{ mt: 0, pb: 0 }}>
			<FormContainer
				sx={{
					mt: 0,
					pt: 0,
					mb: 16,
				}}
				large>
				{isError ? (
					<ErrorWarning />
				) : isLoading ? null : (
					<UpdateCourseInformationForm {...course} />
				)}
			</FormContainer>
		</PageWrapper>
	);
};

export default UpdateCourseInformation;
