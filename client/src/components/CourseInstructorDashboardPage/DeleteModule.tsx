import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";
import api from "../../api";
import { m } from "framer-motion";
interface DeleteModuleProps {
	courseId: number | string;
	sectionId: number | string;
	moduleNumber: number;
}

function DeleteModule(props: DeleteModuleProps) {
	const { courseId, sectionId, moduleNumber } = props;
	const queryClient = useQueryClient();
	const {
		mutate: deleteModule,
		isError: isModuleError,
		isPending: isPendingModule,
		isSuccess: isModuleSuccess,
	} = useMutation({
		mutationFn: () => {
			return api.delete(`/sections/${sectionId}/modules/${moduleNumber}`);
		},
		onSuccess: () => {
			alert("Module deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["sections", { courseId }],
			});
		},
	});
	const handleDeleteModule = async () => {
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
