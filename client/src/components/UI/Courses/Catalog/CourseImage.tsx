import { Skeleton } from "@mui/material";

interface CourseImageProps extends Pick<Course, "imageCover" | "name"> {
	isLoading: boolean;
}

const CourseImage = (props: CourseImageProps) => {
	const { imageCover, name, isLoading } = props;

	return isLoading ? (
		<Skeleton
			animation="wave"
			variant="rectangular"
			sx={{
				width: window.innerWidth > 600 ? "100%" : "100vw",
				height: window.innerWidth > 600 ? 300 : 220,
				borderRadius: window.innerWidth > 600 ? "20px" : "0",
			}}
		/>
	) : (
		<img
			src={imageCover}
			alt={name}
			style={{
				objectFit: "cover",
				width: window.innerWidth > 600 ? "100%" : "100vw",
				height: window.innerWidth > 600 ? 300 : 220,
				borderRadius: window.innerWidth > 600 ? "20px" : "0",
			}}
		/>
	);
};

export default CourseImage;
