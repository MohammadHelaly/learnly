import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

interface NavigationGuardProps {
	guardWhileSignedIn?: boolean;
	courseId: string | undefined;
	children: React.ReactNode;
}

const CourseNavigationGuard = (props: NavigationGuardProps) => {
	const { guardWhileSignedIn, courseId, children } = props;
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (authContext.isLoggedIn && guardWhileSignedIn) {
			navigate("/dashboard");
			return;
		} else if (
			!authContext.user?.coursesEnrolled.includes(courseId as string) &&
			authContext.isLoggedIn
		) {
			navigate("/dashboard");
			return;
		}

		const timeout = setTimeout(() => {
			if (!authContext.isLoggedIn && !guardWhileSignedIn) {
				navigate("/log-in");
				return;
			}
		}, 1);

		return () => {
			clearTimeout(timeout);
		};
	}, [authContext.isLoggedIn, navigate, guardWhileSignedIn]);

	return <>{children}</>;
};

export default CourseNavigationGuard;
