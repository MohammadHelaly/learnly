import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Container,
	Stack,
	Typography,
	Skeleton,
} from "@mui/material";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useQuery } from "@tanstack/react-query";
import api from "../../../../api";
import AuthContext from "../../../../store/auth-context";
import { useContext } from "react";
import StyledNavLink from "../../Links/StyledNavLink";
interface CourseBannerProps extends Pick<Course, "id" | "name" | "price"> {
	isLoading: boolean;
	isError: boolean;
}

const CourseBanner = (props: CourseBannerProps) => {
	const { id, name, price, isLoading, isError } = props;
	const authContext = useContext(AuthContext);
	const [scrolled, setScrolled] = useState(false);

	const {
		data, //: courses,
		isLoading: isLoadingCourses,
		isError: isErrorCourses,
	} = useQuery({
		queryKey: ["courseEnrollments", { user: authContext.user?.id }],
		queryFn: async () =>
			await api.get("/enrollments", {
				params: {
					user: authContext.user?.id ?? null,
				},
			}),
		select: (response) => response.data,
	});

	const courses_ids =
		data?.data?.data.map((course: any) => course.course._id) ?? [];

	const scrollValue = window.innerWidth > 600 ? 400 : 600;

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > scrollValue;
			if (isScrolled !== scrolled) {
				setScrolled(!scrolled);
			}
		};

		document.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			document.removeEventListener("scroll", handleScroll);
		};
	}, [scrolled]);

	return (
		// isError ? null :
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			sx={{
				width: "100vw",
				position: "fixed",
				backgroundColor: "white",
				opacity: scrolled ? 1 : 0,
				transition: "all 0.5s ease",
				boxShadow: scrolled
					? "0px 0px 10px 0px rgba(0,0,0,0.75)"
					: "none",
				py: window.innerWidth > 600 ? 3 : 1,
				zIndex: scrolled ? 2 : -2,
				transform: scrolled ? "none" : "translateY(-100%)",
			}}>
			<Container maxWidth="lg">
				<Stack
					direction="row"
					justifyContent="space-between"
					alignContent="center"
					alignItems="center"
					spacing={2}>
					<Stack
						direction="column"
						alignItems="left"
						justifyContent="left">
						{isLoading ? (
							<Skeleton
								animation="wave"
								variant="text"
								width="100%"
								height={28}
							/>
						) : (
							<Typography
								variant={
									window.innerWidth > 600 ? "h5" : "body1"
								}
								sx={{
									fontWeight: 500,
								}}>
								{name}
							</Typography>
						)}
						{courses_ids.includes(authContext.user?.id) ? (
							<Typography variant="body2">
								Enroll now and get full lifetime access!
							</Typography>
						) : (
							<></>
						)}
					</Stack>
					{!courses_ids.includes(authContext.user?.id) ? (
						<Button
							variant="contained"
							size="large"
							disableElevation
							component={StyledNavLink}
							to={`/dashboard/learn/courses/${id}`}
							sx={{
								// mb: 3,
								minWidth: window.innerWidth > 600 ? 250 : 145,
								height: 50,
								// fontSize:
								// 	window.innerWidth > 600 ? "1rem" : "0.65rem",
								backgroundColor: "secondary.main",
								color: "black",
								"&:hover": {
									backgroundColor: "primary.main",
									color: "white",
								},
							}}
							endIcon={<ArrowForward />}>
							Go to course
						</Button>
					) : (
						<Button
							variant="contained"
							size="large"
							component={StyledNavLink}
							to={`/courses/${id}/enroll`}
							disableElevation
							sx={{
								// mb: 3,
								minWidth: window.innerWidth > 600 ? 250 : 145,
								height: 50,
								// fontSize:
								// 	window.innerWidth > 600 ? "1rem" : "0.65rem",
								backgroundColor: "secondary.main",
								color: "black",
								"&:hover": {
									backgroundColor: "primary.main",
									color: "white",
								},
							}}
							endIcon={<ArrowForward />}>
							Enroll now
						</Button>
					)}
				</Stack>
			</Container>
		</Box>
	);
};

export default CourseBanner;
