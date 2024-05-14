import { createContext } from "react";

interface AuthContextType {
	isLoggedIn: boolean;
	user: User | null;
	login: (parsedUser: User) => void;
	logout: () => void;
	update: (parsedUser: User) => void;
}

const defaultAuthContextValue: AuthContextType = {
	isLoggedIn: false,
	user: null,
	login: () => {},
	logout: () => {},
	update: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

export default AuthContext;
