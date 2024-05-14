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
		localStorage.setItem("user", JSON.stringify(parsedUser));
	};

	const logoutHandler = () => {
		setIsLoggedIn(false);
		setUser(null);
		localStorage.removeItem("user");
	};
	const update = (parsedUser: User) => {
		setUser(parsedUser);
		localStorage.setItem("user", JSON.stringify(parsedUser));
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				user: user,
				login: loginHandler,
				logout: logoutHandler,
				update: update,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
