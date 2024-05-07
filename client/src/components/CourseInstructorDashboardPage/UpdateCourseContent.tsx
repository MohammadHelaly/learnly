import PageWrapper from "../UI/PageLayout/PageWrapper";
import UpdateCourseContentForm from "./UpdateCourseContentForm";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import SectionHeader from "../UI/PageLayout/SectionHeader";

interface UpdateCourseContentProps {
	courseId: Pick<Course, "id"> | string | number | undefined;
}

const UpdateCourseContent = (props: UpdateCourseContentProps) => {
	const { courseId } = props;

	return (
		<PageWrapper sx={{ mt: 0 }}>
			<SectionWrapper>
				{/* <SectionHeader
					heading="Course Contents"
					headingAlignment="left"
				/> */}
				<UpdateCourseContentForm courseId={courseId as string} />
			</SectionWrapper>
		</PageWrapper>
	);
};

export default UpdateCourseContent;
