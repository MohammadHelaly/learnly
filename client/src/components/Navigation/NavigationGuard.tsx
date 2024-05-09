import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

interface NavigationGuardProps {
	guardWhileSignedIn?: boolean;
	children: React.ReactNode;
}

const NavigationGuard = (props: NavigationGuardProps) => {
	const { guardWhileSignedIn, children } = props;
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (authContext.isLoggedIn && guardWhileSignedIn) {
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

	if (guardWhileSignedIn && authContext.isLoggedIn) return null;

	if (!guardWhileSignedIn && !authContext.isLoggedIn) return null;

	return <>{children}</>;
};

export default NavigationGuard;
