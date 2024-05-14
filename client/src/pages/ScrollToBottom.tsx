import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToBottom = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		const delay = 500;

		const scrollToBottom = setTimeout(() => {
			window.scrollTo({
				top: document.documentElement.scrollHeight,
				left: 0,
			});
		}, delay);

		return () => clearTimeout(scrollToBottom);
	}, [pathname]);

	return null;
};

export default ScrollToBottom;
