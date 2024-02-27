import { styled } from "@mui/system";

const SmallList = styled("ul")(() => ({
	listStyle: "none",
	paddingLeft: 0,
	"& li": {
		marginBottom: 16,
		marginLeft: window.innerWidth > 600 ? 24 : 16,
	},
}));

export default SmallList;
