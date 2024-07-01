const formatNumber = (value: number): string => {
	if (Math.abs(value) < 1000) {
		return value.toString();
	}

	const suffixes = ["", "k", "M", "B", "T"];
	const suffixIndex = Math.floor(Math.log10(Math.abs(value)) / 3);

	const shortValue = value / Math.pow(1000, suffixIndex);
	const formattedValue = shortValue.toFixed(1);

	return `${parseFloat(formattedValue)}${suffixes[suffixIndex]}`;
};

export default formatNumber;
