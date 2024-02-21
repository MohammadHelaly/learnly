import Instructors from "../UI/Instructors/Instructors";
import SectionHeader from "../UI/SectionHeader";
import SectionWrapper from "../UI/SectionWrapper";

interface CourseInstructorsProps {
	instructors: {
		id: number | string;
		name: string;
		photo?: string;
		ratingsAverage: number;
		ratingsQuantity: number;
		students: number;
		bio?: string;
		courses: (number | string)[];
	}[];
	isLoading: boolean;
	isError: boolean;
}

const CourseInstructors = (props: CourseInstructorsProps) => {
	const { instructors, isLoading, isError } = props;

	return (
		<SectionWrapper>
			<SectionHeader
				heading="Who Will Be Teaching You"
				headingAlignment="left"
				headingAnimated={false}
			/>
			<Instructors
				instructors={instructors}
				isLoading={isLoading}
				isError={isError}
			/>
		</SectionWrapper>
	);
};

export default CourseInstructors;
