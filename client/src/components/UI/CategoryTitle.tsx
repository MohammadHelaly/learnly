import { Typography } from "@mui/material";

interface CategoryTitleProps {
	children: React.ReactNode;
}

const CategoryTitle = (props: CategoryTitleProps) => {
	const { children } = props;

	return (
		<Typography
			variant="body1"
			sx={{
				px: 2,
				py: 2,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "auto",
				height: "15px",
				fontSize: "1rem",
				backgroundColor: "white",
				border: 1,
				borderColor: "secondary.main",
				borderRadius: 10,
			}}>
			{children}
		</Typography>
	);
};

export default CategoryTitle;
