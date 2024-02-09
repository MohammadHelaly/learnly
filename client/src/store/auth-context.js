import React, { createContext, useState } from "react";

const AuthContext = createContext({
	isLoggedIn: false,
	user: null,
	login: () => {},
	logout: () => {},
});

export default AuthContext;
