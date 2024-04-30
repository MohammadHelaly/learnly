import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IconButton } from "@mui/material";
import api from "../../api";
import { m } from "framer-motion";
import Popup from "../Popup/Popup";
interface DeleteModuleProps {
	courseId: number | string;
	sectionId: number | string;
	moduleNumber: number;
}

function DeleteModule(props: DeleteModuleProps) {
	const { courseId, sectionId, moduleNumber } = props;
	const queryClient = useQueryClient();
	const popupFunction = () => {
		queryClient.invalidateQueries({
			queryKey: ["sections", { courseId }],
		});
	};
	const {
		mutate: deleteModule,
		isError: isModuleError,
		isPending: isPendingModule,
		isSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.delete(
				`/courses/${courseId}/sections/${sectionId}/modules/${moduleNumber}`
			);
		},
		onSuccess: () => {},
	});
	const handleDeleteModule = async () => {
		deleteModule();
	};
	return (
		<>
			<IconButton
				sx={{ color: "primary.main", mx: 2 }}
				onClick={handleDeleteModule}
			>
				<HighlightOffIcon />
			</IconButton>
			<Popup
				content="Module removed successfully!"
				openPopup={isSuccess}
				buttonText="Great!"
				popupFunction={popupFunction}
			/>
		</>
	);
}

export default DeleteModule;
