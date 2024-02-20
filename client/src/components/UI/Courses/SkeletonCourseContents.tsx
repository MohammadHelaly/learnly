import { Skeleton, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SkeletonCourseContents = () => {
	return (
		<>
			{Array(5)
				.fill(null)
				.map((_, index) => (
					<Accordion
						key={index}
						disableGutters={true}
						sx={{
							boxShadow: "none !important",
							border: `1px solid #dddddd`,
							borderBottom:
								index === 4 ? `1px solid #dddddd` : "none", // Add bottom border for the last one
						}}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls={`panel${index + 1}-content`}
							id={`panel${index + 1}-header`}
							sx={{
								backgroundColor: "#f5f5f5",
								width: "100%",
								flexDirection: "row-reverse",
							}}>
							<Stack
								direction="row"
								spacing={1}
								alignItems="center"
								justifyContent="space-between"
								width="100%"
								sx={{
									ml: 1,
								}}>
								<Skeleton
									animation="wave"
									variant="text"
									height={32}
									width={window.innerWidth > 600 ? 200 : 100}
								/>
								<Skeleton
									key={index}
									animation="wave"
									variant="text"
									height={32}
									width={window.innerWidth > 600 ? 200 : 100}
								/>
							</Stack>
						</AccordionSummary>
					</Accordion>
				))}
		</>
	);
};

export default SkeletonCourseContents;
