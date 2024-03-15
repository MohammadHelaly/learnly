import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@mui/material";
import api from "../../api";
import { m } from "framer-motion";
interface UploadModuleVideosFormProps {
	courseId: number | string;
	sectionId: number | string;
	moduleNumber: number;
}

function DeleteModule(props: UploadModuleVideosFormProps) {
	const { courseId, sectionId, moduleNumber } = props;
	const {
		mutate: deleteModule,
		isError: isModuleError,
		isPending: isPendingModule,
		isSuccess: isModuleSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.delete(
				`/courses/${courseId}/sections/${sectionId}/modules/${moduleNumber}`
			);
		},
	});
	const handleDeleteModule = async () => {
		alert("Module deleted successfully");
		deleteModule();
	};
	return (
		<>
			<Button onClick={handleDeleteModule}>
				<HighlightOffIcon />
			</Button>
		</>
	);
}

export default DeleteModule;
