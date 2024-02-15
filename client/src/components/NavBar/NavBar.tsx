import { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
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
import ApiInstance from "../../api/ApiInstance";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

const pages = ["Catalog", "Careers", "About"];
const settings = ["Dashboard", "Account"];

const StyledNavLink = styled(NavLink)((theme) => ({
	color: "inherit",
	fontSize: "1.5rem",
	fontWeight: "500",
	transition: "all 0.5s ease",
	textDecoration: "none",
}));

const NavBar = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [isDrawerOpen,SetIsDrawerOpen]= useState(false)
	const [isDrawerOpen2,SetIsDrawerOpen2]= useState(false)
	const [scrolled, setScrolled] = useState(false);
	const currentPath = useLocation().pathname;
	

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

	const authContext = useContext(AuthContext);
	const logoutHandler = () => {
		ApiInstance.get("/users/logout")
			.then((response) => {
				authContext.logout();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	useEffect(() => {
		// Add an event listener to prevent scrolling on the body when the menu is open
		const handleBodyScroll = (event: any) => {
			// look into type of event
			if (Boolean(anchorElUser) || Boolean(anchorElNav)) {
				event.preventDefault();
				event.stopPropagation();
			}
		};

		document.body.style.overflow = "auto"; // Ensure the body allows scrolling by default

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("touchmove", handleBodyScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("touchmove", handleBodyScroll);
		};
	}, [anchorElUser, anchorElNav]);

	return (
		
		<AppBar
			position="fixed"
			sx={{
				backgroundColor: scrolled ? "#ffffff" : "transparent",
				// backgroundColor: scrolled ? "#000000" : "transparent",
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
					{/* <AdbIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/> */}
					<Typography
						variant="h6"
						noWrap
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "Outfit, Roboto, sans-serif",
							fontWeight: 700,
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
						<IconButton size="large" edge="start" color="inherit" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={() => SetIsDrawerOpen(true)}  sx={{ color: scrolled ? "#000000" : "#ffffff" }}> 
									<MenuIcon/>
								</IconButton>
								<SwipeableDrawer anchor='left' open={isDrawerOpen} onOpen={() => SetIsDrawerOpen(true)} onClose={() => SetIsDrawerOpen(false)}>
									<Box p={2} width='250px' textAlign='center' role='presentation'>
											<Typography variant="h6" component="div" paddingBottom={3}>
												L e a r n l y
											</Typography>
											{pages.map((page) => (
								<StyledNavLink
									to={`/${
										page === "Catalog"
											? "courses"
											: page.toLowerCase()
									}`}>
									<MenuItem
										key={page}
										onClick={handleCloseNavMenu}>
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
							fontWeight: 700,
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
						{pages.map((page) => (
							<StyledNavLink
								key={page}
								to={`/${
									page === "Catalog"
										? "courses"
										: page.toLowerCase()
								}`}>
								<Button
									onClick={handleCloseNavMenu}
									color="inherit"
									sx={{
										color: scrolled ? "#000000" : "#ffffff",
									}}>
									{page}
								</Button>
							</StyledNavLink>
						))}
					</Box>
					{!authContext.isLoggedIn ? (
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
								<Tooltip title="Open settings">
									<IconButton
										//onClick={handleOpenUserMenu}
										onClick={() => SetIsDrawerOpen2(true)}
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
								<SwipeableDrawer id="menu-appbar" anchor='right' open={isDrawerOpen2} onOpen={() => SetIsDrawerOpen2(true)} onClose={() => SetIsDrawerOpen2(false)}>
									<Box p={2} width='250px' textAlign='center' role='presentation'>
											<Typography variant="h6" component="div" paddingBottom={3}>
												Settings
											</Typography>
											{settings.map((setting) => (
										<StyledNavLink
											to={`/${setting.toLowerCase()}`}>
											<MenuItem
												key={setting}
												onClick={handleCloseUserMenu}>
												<Typography textAlign="center">
													{setting}
												</Typography>
											</MenuItem>
										</StyledNavLink>
									))}
									<StyledNavLink to="/">
										<MenuItem
											key={"Logout"}
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
