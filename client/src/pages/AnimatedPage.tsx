import { motion } from "framer-motion";

type AnimatedPageProps = {
	children: React.ReactNode;
};

const AnimatedPage = (props: AnimatedPageProps) => {
	const pageVariants = {
		initial: {
			opacity: 0,
		},
		in: {
			opacity: 1,
		},
		out: {
			opacity: 0,
		},
	};

	const pageTransition = {
		type: "tween",
		ease: "anticipate",
		duration: 0.5,
	};

	return (
		<motion.div
			variants={pageVariants}
			transition={pageTransition}
			initial="initial"
			animate="in"
			exit="out">
			{props.children}
		</motion.div>
	);
};

export default AnimatedPage;
