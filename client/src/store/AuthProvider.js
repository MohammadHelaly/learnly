import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	const loginHandler = (user) => {
		setIsLoggedIn(true);
		setUser(user);
		localStorage.setItem("user", JSON.stringify(user));
	};

	const logoutHandler = () => {
		setIsLoggedIn(false);
		setUser(null);
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				user: user,
				login: loginHandler,
				logout: logoutHandler,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
