import React, { useState } from "react";
import AuthContext from "./auth-context";

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider = (props: AuthProviderProps) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState<User | null>(null);

	const loginHandler = (parsedUser: User) => {
		setIsLoggedIn(true);
		setUser(parsedUser);
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
