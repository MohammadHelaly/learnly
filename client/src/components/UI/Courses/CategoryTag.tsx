import { Typography, IconButton } from "@mui/material";
import { Clear } from "@mui/icons-material";

interface CategoryTitleProps {
	children: React.ReactNode;
	editable?: boolean;
	onEdit?: () => void;
}

const CategoryTag = (props: CategoryTitleProps) => {
	const { children, editable, onEdit } = props;

	return (
		<Typography
			variant="body1"
			sx={{
				px: 2,
				py: 2,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "fit-content",
				height: "15px",
				fontSize: "1rem",
				backgroundColor: "white",
				border: 1,
				borderColor: "secondary.main",
				borderRadius: 10,
			}}>
			{children}
			{editable && (
				<IconButton size="small" onClick={onEdit} sx={{ ml: 1, p: 0 }}>
					<Clear />
				</IconButton>
			)}
		</Typography>
	);
};

export default CategoryTag;
