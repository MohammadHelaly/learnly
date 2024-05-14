import { Container, Stack, Box } from "@mui/material";
import ErrorWarning from "../UI/Messages/ErrorWarning";
import SectionWrapper from "../UI/PageLayout/SectionWrapper";
import SkeletonUserInformationContent from "../UI/Users/SkeletonUserInformationContent";
import UserInformationContent from "../UI/Users/UserInformationContent";

interface UserInformationProps
	extends Pick<
		User,
		| "name"
		| "photo"
		| "bio"
		| "role"
		| "ratingsAverage"
		| "ratingsQuantity"
		| "students"
		| "coursesCreated"
	> {
	isLoading: boolean;
	isError: boolean;
}

const UserInformation = (props: UserInformationProps) => {
	const { isLoading, isError, ...rest } = props;

	return (
		<SectionWrapper
			sx={{
				mt: window.innerWidth > 600 ? 8 : 7,
				position: "relative",
			}}>
			<Box
				sx={{
					width: "100%",
					height: window.innerWidth > 600 ? "70%" : "75%",
					backgroundColor: "white",
					position: "absolute",
					bottom: 0,
					zIndex: -20,
				}}
			/>
			<Container maxWidth="lg">
				<Stack
					direction={window.innerWidth > 600 ? "row" : "column"}
					gap={window.innerWidth > 600 ? 4 : 0}
					alignItems="center"
					width="100%"
					justifyContent={
						window.innerWidth > 600 ? "space-between" : "center"
					}
					sx={{
						pb: 10,
						pt: window.innerWidth > 600 ? 10 : 4,
					}}>
					{isLoading ? (
						<SkeletonUserInformationContent />
					) : isError ? (
						<ErrorWarning />
					) : (
						<UserInformationContent {...rest} />
					)}
				</Stack>
			</Container>
		</SectionWrapper>
	);
};

export default UserInformation;
