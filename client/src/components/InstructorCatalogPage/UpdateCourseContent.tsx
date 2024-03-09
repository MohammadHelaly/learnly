import {
	Box,
	Typography,
	TextField,
	Button,
	Grid,
	MenuItem,
	Stack,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
	InputLabel,
	Select,
	Checkbox,
	IconButton,
} from "@mui/material";
import { Done, Clear } from "@mui/icons-material";
import { useEffect, useState, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@mui/material";
import dummyCoursesData from "../../assets/data/dummyCoursesData";
import CourseCategories from "../UI/Courses/CourseCategories";

import Footer from "../Footer/Footer";
import api from "../../api";
import PageWrapper from "../UI/PageLayout/PageWrapper";
import AddSection from "../InstructorCatalogPage/AddSection";
import InstructorCourseContents from "../InstructorCatalogPage/InstructorCourseContent";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";

interface UpdateCourseContentProps {
	courseId: Pick<Course, "id"> | string | number | undefined;
}

const UpdateCourseContent = (props: UpdateCourseContentProps) => {
	const { courseId } = props;

	const dummyCourse = dummyCoursesData.find(
		(course) => course.id === parseInt(courseId as string)
	);

	const {
		data, //: course,
		isLoading, //isError
		isError: isGetError,
	} = useQuery({
		queryKey: ["courses", { courseId }],
		queryFn: async () => await api.get(`/courses/${courseId}`),
		select: (response) => response.data.data.data,
	});

	const course = data ?? dummyCourse;

	return (
		<PageWrapper sx={{ mt: 0, pb: 0 }}>
			<SectionWrapper>
				<InstructorCourseContents
					sections={course?.sections}
					isLoading={isLoading}
					isError={isGetError}
				/>
				<AddSection courseId={courseId} />
			</SectionWrapper>
		</PageWrapper>
	);
};

export default UpdateCourseContent;
