import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { Container } from "@mui/material";
import api from "../../../../api";
import Courses from "../Courses";
import SectionHeader from "../../SectionHeader";
import BottomTextLink from "../../BottomTextLink";
import dummyCoursesData from "../../../../assets/data/dummyCoursesData";
import SectionWrapper from "../../SectionWrapper";

interface CourseSelectionProps {
	query: {
		url: string;
		config?: AxiosRequestConfig;
	};
	cardsAnimated?: boolean;
	variant: "grey" | "white";
	heading: string;
	headingAlignment: "left" | "center";
	headingAnimated?: boolean;
}

const CourseSelection = (props: CourseSelectionProps) => {
	const {
		query,
		variant,
		heading,
		headingAlignment,
		headingAnimated,
		cardsAnimated,
	} = props;
	const { url, config } = query;

	const dummyCourses = dummyCoursesData.slice(0, 3);

	const {
		data, //: selectedCourses,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["courses", { ...config?.params }], // TODO: Look into this
		queryFn: async () =>
			await api.get(url, {
				params: {
					sort: "-ratingsQuantity",
					limit: 3,
					...config?.params,
				},
			}),
		select: (response) => response.data.data.data,
	});

	const selectedCourses = data ?? dummyCourses;

	return (
		<SectionWrapper
			sx={{
				pt: 5,
				pb: 10,
				background: variant === "grey" ? "rgb(245, 245, 245)" : "white",
				display: "flex",
				flexDirection: "column",
				alignItems:
					window.innerWidth > 600 ? headingAlignment : "center",
			}}>
			<Container maxWidth="lg">
				<SectionHeader
					heading={heading}
					headingAlignment={headingAlignment}
					headingAnimated={headingAnimated}
				/>
				<Courses
					courses={selectedCourses}
					isLoading={isLoading}
					isError={isError}
					cardsAnimated={cardsAnimated}
					maxLength={3}
				/>
				<BottomTextLink to="/courses" text="See More Courses" />
			</Container>
		</SectionWrapper>
	);
};

export default CourseSelection;
