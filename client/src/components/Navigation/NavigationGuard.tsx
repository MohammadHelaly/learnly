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
		}
		if (!authContext.isLoggedIn && !guardWhileSignedIn) {
			navigate("/login");
		}
	}, [authContext, navigate, guardWhileSignedIn]);

	return <>{children}</>;
};

export default NavigationGuard;
