const formatDate = (dateString: string): string => {
	const inputDate = new Date(dateString);
	const currentDate = new Date();
	const timeDifference = currentDate.getTime() - inputDate.getTime();
	const minutesDifference = Math.floor(timeDifference / (1000 * 60));
	const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
	const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	const weeksDifference = Math.floor(
		timeDifference / (1000 * 60 * 60 * 24 * 7)
	);

	if (minutesDifference < 1) {
		return "just now";
	} else if (minutesDifference < 60) {
		return `${minutesDifference} minute${
			minutesDifference !== 1 ? "s" : ""
		} ago`;
	} else if (hoursDifference < 24) {
		return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
	} else if (daysDifference < 7) {
		return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
	} else if (weeksDifference < 4) {
		return `${weeksDifference} week${weeksDifference !== 1 ? "s" : ""} ago`;
	} else {
		const day = inputDate.getDate();
		const month = inputDate.getMonth() + 1;
		const year = inputDate.getFullYear();
		return `${day}/${month}/${year}`;
	}
};

export default formatDate;
