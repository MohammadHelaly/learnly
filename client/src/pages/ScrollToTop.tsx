import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		const delay = 500;

		const scrollToTop = setTimeout(() => {
			window.scrollTo({
				top: 0,
				left: 0,
			});
		}, delay);

		return () => clearTimeout(scrollToTop);
	}, [pathname]);

	return null;
};

export default ScrollToTop;
