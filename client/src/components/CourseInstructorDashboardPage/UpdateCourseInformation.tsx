import { useQuery } from "@tanstack/react-query";
import dummyCoursesData from "../../assets/data/dummyCoursesData";
import api from "../../api";
import PageWrapper from "../UI/PageLayout/PageWrapper";
import FormContainer from "../UI/PageLayout/FormContainer";
import UpdateCourseInformationForm from "./UpdateCourseInformationForm";
import ErrorWarning from "../UI/Messages/ErrorWarning";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";

interface UpdateCourseInformationProps {
	courseId: Pick<Course, "id"> | string | number | undefined;
}

const UpdateCourseInformation = (props: UpdateCourseInformationProps) => {
	const { courseId } = props;

	const dummyCourse = dummyCoursesData.find(
		(course) => course.id === (courseId as string)
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
			{/* <FormContainer
				sx={{
					mt: 0,
					p: 0,
					mb: 16,
				}}
				large> */}
			<SectionWrapper>
				{isError ? (
					<ErrorWarning />
				) : isLoading ? null : (
					<UpdateCourseInformationForm {...course} />
				)}
			</SectionWrapper>
			{/* </FormContainer> */}
		</PageWrapper>
	);
};

export default UpdateCourseInformation;
