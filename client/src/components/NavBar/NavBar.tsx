import { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import AuthContext from "../../store/auth-context";
import { ButtonGroup, Stack } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import api from "../../api";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const leftDrawerPages = ["Catalog", "Careers", "About"];
const rightDrawerPages = ["Dashboard", "Account"];

const StyledNavLink = styled(NavLink)((theme) => ({
	color: "inherit",
	fontSize: "1.5rem",
	fontWeight: "500",
	transition: "all 0.5s ease",
	textDecoration: "none",
}));

const NavBar = () => {
	const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
	const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const currentPath = useLocation().pathname;
	const authContext = useContext(AuthContext);

	const handleScroll = () => {
		if (window.scrollY > 25) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleOpenRightDrawer = () => {
		setIsRightDrawerOpen(true);
	};

	const handleCloseRightDrawer = () => {
		setIsRightDrawerOpen(false);
	};

	const handleOpenLeftDrawer = () => {
		setIsLeftDrawerOpen(true);
	};

	const handleCloseLeftDrawer = () => {
		setIsLeftDrawerOpen(false);
	};

	const logoutHandler = () => {
		api.get("/users/logout")
			.then((response) => {
				authContext.logout();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<AppBar
			position="fixed"
			sx={{
				backgroundColor: scrolled ? "#ffffff" : "transparent",
				boxShadow:
					scrolled && !currentPath.includes("/courses")
						? "auto"
						: "none",
				borderBottom:
					scrolled && currentPath.includes("/courses")
						? "1px solid #eeeeee"
						: "none",
				transition: "all 0.5s ease",
				zIndex: 3,
			}}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "Outfit, Roboto, sans-serif",
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}>
						<StyledNavLink
							to="/"
							sx={{ color: scrolled ? "#000000" : "#ffffff" }}>
							Learnly
						</StyledNavLink>
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenLeftDrawer}
							sx={{ color: scrolled ? "#000000" : "#ffffff" }}>
							<MenuIcon />
						</IconButton>
						<SwipeableDrawer
							anchor="left"
							open={isLeftDrawerOpen}
							onOpen={handleOpenLeftDrawer}
							onClose={handleCloseLeftDrawer}>
							<Box
								p={2}
								width="250px"
								textAlign="center"
								role="presentation">
								<Typography
									variant="h6"
									onClick={handleCloseLeftDrawer}
									noWrap
									sx={{
										textAlign: "left",
										fontFamily:
											"Outfit, Roboto, sans-serif",
										letterSpacing: ".3rem",
										color: "#000000",
										textDecoration: "none",
										paddingBottom: 2,
									}}>
									<StyledNavLink
										to="/"
										sx={{
											color: "inherit",
										}}>
										Learnly
									</StyledNavLink>
								</Typography>
								{leftDrawerPages.map((page) => (
									<StyledNavLink
										key={page}
										to={`/${
											page === "Catalog"
												? "courses"
												: page.toLowerCase()
										}`}>
										<MenuItem
											onClick={handleCloseLeftDrawer}>
											<Typography textAlign="center">
												{page}
											</Typography>
										</MenuItem>
									</StyledNavLink>
								))}
							</Box>
						</SwipeableDrawer>
					</Box>
					<Typography
						variant="h5"
						noWrap
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "Outfit, Roboto, sans-serif",
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}>
						<StyledNavLink
							to="/"
							sx={{ color: scrolled ? "#000000" : "#ffffff" }}>
							Learnly
						</StyledNavLink>
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}>
						{leftDrawerPages.map((page) => (
							<StyledNavLink
								key={page}
								to={`/${
									page === "Catalog"
										? "courses"
										: page.toLowerCase()
								}`}>
								<Button
									onClick={handleCloseLeftDrawer}
									color="inherit"
									sx={{
										color: scrolled ? "#000000" : "#ffffff",
									}}>
									{page}
								</Button>
							</StyledNavLink>
						))}
					</Box>
					{authContext.isLoggedIn ? (
						<Stack direction="row" spacing={2} sx={{ flexGrow: 0 }}>
							<ButtonGroup>
								<Button
									variant="text"
									color="primary"
									size="small"
									disableElevation
									sx={{
										color: scrolled ? "#9c27b0" : "white",
										"&:hover": {
											backgroundColor: "#9c27b0",
											color: "#ffffff",
										},
									}}>
									<FavoriteBorderOutlined />
								</Button>
								<Button
									variant="text"
									color="primary"
									size="small"
									disableElevation
									sx={{
										color: scrolled ? "#9c27b0" : "white",
										"&:hover": {
											backgroundColor: "#9c27b0",
											color: "#ffffff",
										},
									}}>
									<ShoppingCartOutlinedIcon />
								</Button>
							</ButtonGroup>
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open User Menu">
									<IconButton
										onClick={handleOpenRightDrawer}
										sx={{ p: 0 }}>
										<Avatar
											alt={authContext.user?.name}
											src={authContext.user?.photo}
											sx={{
												backgroundColor: "#9c27b0",
											}}
										/>
									</IconButton>
								</Tooltip>
								<SwipeableDrawer
									id="menu-appbar"
									anchor="right"
									open={isRightDrawerOpen}
									onOpen={handleOpenRightDrawer}
									onClose={handleCloseRightDrawer}>
									<Box
										p={2}
										width="250px"
										textAlign="center"
										role="presentation">
										<Typography
											variant="h6"
											noWrap
											sx={{
												textAlign: "left",
												fontSize: "1.5rem",
												fontWeight: "500",
												fontFamily:
													"Outfit, Roboto, sans-serif",
												letterSpacing: ".3rem",
												color: "#000000",
												textDecoration: "none",
												paddingBottom: 2,
											}}>
											Your Account
										</Typography>
										{rightDrawerPages.map((page) => (
											<StyledNavLink
												key={page}
												to={`/${page.toLowerCase()}`}>
												<MenuItem
													onClick={
														handleCloseRightDrawer
													}>
													<Typography textAlign="center">
														{page}
													</Typography>
												</MenuItem>
											</StyledNavLink>
										))}
										<StyledNavLink key={"Logout"} to="/">
											<MenuItem
												onClick={logoutHandler}
												sx={{
													color: "red",
													fontWeight: 700,
												}}>
												<Typography textAlign="center">
													Logout
												</Typography>
											</MenuItem>
										</StyledNavLink>
									</Box>
								</SwipeableDrawer>
							</Box>
						</Stack>
					) : (
						<Stack direction="row" spacing={2}>
							<StyledNavLink to="/log-in">
								<Button
									variant="outlined"
									color="primary"
									size="small"
									disableElevation
									sx={{
										color: "#9c27b0",
										border: "solid #9c27b0",
										borderWidth: 1,
										height: "100%",
										"&:hover": {
											backgroundColor: "#9c27b0",
											border: "solid #9c27b0",
											borderWidth: 1,
											color: "#ffffff",
										},
									}}>
									Log in
								</Button>
							</StyledNavLink>
							<StyledNavLink to="/sign-up">
								<Button
									variant="contained"
									color="primary"
									size="small"
									disableElevation
									sx={{
										color: "#ffffff",
										border: "solid #9c27b0",
										borderWidth: 1,
										height: "100%",
										"&:hover": {
											backgroundColor: "rgba(0, 0, 0, 0)",
											border: "solid #9c27b0",
											borderWidth: 1,
											color: "#9c27b0",
										},
									}}>
									Sign up
								</Button>
							</StyledNavLink>
						</Stack>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default NavBar;
