const formatDuration = (duration: number): string => {
	if (duration < 60) {
		return `${duration} second${duration > 1 ? "s" : ""}`;
	} else if (duration < 3600) {
		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		return `${minutes} minute${minutes > 1 ? "s" : ""} ${
			seconds > 0 ? ` ${seconds} second${seconds > 1 ? "s" : ""}` : ""
		}`;
	} else {
		const hours = Math.floor(duration / 3600);
		const minutes = Math.floor((duration % 3600) / 60);
		return `${hours} hour${hours > 1 ? "s" : ""} ${
			minutes > 0 ? ` ${minutes} minute${minutes > 1 ? "s" : ""}` : ""
		}`;
	}
};

export default formatDuration;
