import { Stack, Typography, IconButton, Skeleton } from "@mui/material";
import { Checklist, Clear } from "@mui/icons-material";

interface CheckListItemProps {
	item?: string;
	skeleton?: boolean;
	editable?: boolean;
	onEdit?: () => void;
}

const CheckListItem = (props: CheckListItemProps) => {
	const { item, editable, onEdit, skeleton } = props;

	return (
		<Stack
			direction="row"
			spacing={1}
			alignItems="center"
			color="text.secondary">
			<Checklist />
			{skeleton ? (
				<Skeleton
					variant="text"
					animation="wave"
					sx={{
						width: "80%",
					}}
				/>
			) : (
				<Typography
					variant="body1"
					color="text.secondary"
					sx={{
						textAlign: window.innerWidth > 600 ? "left" : "center",
						my: 3,
					}}>
					{item}
				</Typography>
			)}
			{editable && onEdit && (
				<IconButton size="small" onClick={onEdit}>
					<Clear />
				</IconButton>
			)}
		</Stack>
	);
};

export default CheckListItem;
