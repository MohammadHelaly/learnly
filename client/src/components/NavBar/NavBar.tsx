import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AuthContext from "../../store/auth-context";
import api from "../../api";
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	IconButton,
	Container,
	Avatar,
	Button,
	Tooltip,
	MenuItem,
	SwipeableDrawer,
	ButtonGroup,
	Stack,
} from "@mui/material";
import {
	Menu,
	ShoppingCartOutlined,
	FavoriteBorderOutlined,
} from "@mui/icons-material";
import StyledNavLink from "../UI/Links/StyledNavLink";

const leftDrawerPages = ["Catalog", "Careers", "About"];
const rightDrawerPages = ["Dashboard", "Account"];

const NavBar = () => {
	const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
	const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const currentPath = useLocation().pathname;
	const navigate = useNavigate();
	const authContext = useContext(AuthContext);
	const queryClient = useQueryClient();

	const isCourseCatalogPage = currentPath.split("/")[1] === "courses";

	// TODO: Look into using React Query to manage loading and error states
	const {
		data: logoutResponse,
		refetch,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ["logout"],
		queryFn: async () => await api.get("/users/logout"),
		enabled: false,
		select: (response) => response.data.status,
	});

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
		refetch();

		if (logoutResponse === "success") {
			navigate("/");
			authContext.logout();
			queryClient.invalidateQueries({ queryKey: ["authenticateMe"] });
			handleCloseRightDrawer();
		}
	};

	isError && alert("An error occurred. Please try again.");

	return (
		<AppBar
			position="fixed"
			sx={{
				backgroundColor: scrolled ? "#ffffff" : "transparent",
				boxShadow: scrolled && !isCourseCatalogPage ? "auto" : "none",
				borderBottom:
					scrolled && isCourseCatalogPage
						? "1px solid #eeeeee"
						: "none",
				transition: "all 0.5s ease",
				zIndex: 3,
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "Outfit, Roboto, sans-serif",
							letterSpacing: ".1rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						<StyledNavLink
							to="/"
							sx={{ color: scrolled ? "#000000" : "#ffffff" }}
						>
							Learnly
						</StyledNavLink>
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenLeftDrawer}
							sx={{ color: scrolled ? "#000000" : "#ffffff" }}
						>
							<Menu />
						</IconButton>
						<SwipeableDrawer
							anchor="left"
							open={isLeftDrawerOpen}
							onOpen={handleOpenLeftDrawer}
							onClose={handleCloseLeftDrawer}
						>
							<Box
								p={2}
								width="250px"
								textAlign="center"
								role="presentation"
							>
								<Typography
									variant="h6"
									onClick={handleCloseLeftDrawer}
									noWrap
									sx={{
										textAlign: "left",
										fontFamily:
											"Outfit, Roboto, sans-serif",
										letterSpacing: ".1rem",
										color: "#000000",
										textDecoration: "none",
										paddingBottom: 2,
									}}
								>
									<StyledNavLink
										to="/"
										sx={{
											color: "inherit",
										}}
									>
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
										}`}
										onClick={handleCloseLeftDrawer}
									>
										<MenuItem>
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
							letterSpacing: ".1rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						<StyledNavLink
							to="/"
							sx={{ color: scrolled ? "#000000" : "#ffffff" }}
						>
							Learnly
						</StyledNavLink>
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{leftDrawerPages.map((page) => (
							<StyledNavLink
								key={page}
								to={`/${
									page === "Catalog"
										? "courses"
										: page.toLowerCase()
								}`}
							>
								<Button
									onClick={handleCloseLeftDrawer}
									color="inherit"
									sx={{
										color: scrolled ? "#000000" : "#ffffff",
									}}
								>
									{page}
								</Button>
							</StyledNavLink>
						))}
					</Box>
					{authContext.isLoggedIn ? (
						<Stack direction="row" spacing={2} sx={{ flexGrow: 0 }}>
							{/* <ButtonGroup>
								<Button
									variant="text"
									color="primary"
									size="small"
									disableElevation
									sx={{
										color: scrolled
											? "primary.main"
											: "white",
										"&:hover": {
											backgroundColor: "primary.main",
											color: "#ffffff",
										},
									}}
								>
									<FavoriteBorderOutlined />
								</Button>
								<Button
									variant="text"
									color="primary"
									size="small"
									disableElevation
									sx={{
										color: scrolled
											? "primary.main"
											: "white",
										"&:hover": {
											backgroundColor: "primary.main",
											color: "#ffffff",
										},
									}}
								>
									<ShoppingCartOutlined />
								</Button>
							</ButtonGroup> */}
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open User Menu">
									<IconButton
										onClick={handleOpenRightDrawer}
										sx={{
											p: 0,
											gap: 1,
											borderRadius: 12,
											paddingInlineStart: 2,
										}}>
										<Menu
											sx={{
												transition: "all 0.5s ease",
												color: scrolled
													? "black"
													: "white",
											}}
										/>
										<Avatar
											alt={authContext.user?.name}
											src={authContext.user?.photo?.url}
											sx={{
												backgroundColor: "primary.main",
												zIndex: 3,
											}}
										/>
									</IconButton>
								</Tooltip>
								<SwipeableDrawer
									id="menu-appbar"
									anchor="right"
									open={isRightDrawerOpen}
									onOpen={handleOpenRightDrawer}
									onClose={handleCloseRightDrawer}
								>
									<Box
										p={2}
										width="250px"
										textAlign="center"
										role="presentation"
									>
										<Typography
											variant="h6"
											noWrap
											sx={{
												textAlign: "left",
												fontSize: "1.5rem",
												fontWeight: "400",
												fontFamily:
													"Outfit, Roboto, sans-serif",
												letterSpacing: ".1rem",
												color: "#000000",
												textDecoration: "none",
												paddingBottom: 2,
											}}
										>
											Your Account
										</Typography>
										{rightDrawerPages.map((page) => (
											<StyledNavLink
												key={page}
												to={`/${page.toLowerCase()}`}
												onClick={handleCloseRightDrawer}
											>
												<MenuItem>
													<Typography textAlign="center">
														{page}
													</Typography>
												</MenuItem>
											</StyledNavLink>
										))}
										<MenuItem
											key={"Logout"}
											onClick={logoutHandler}
											sx={{
												color: "red",
												fontWeight: 700,
											}}
										>
											<Typography textAlign="center">
												Logout
											</Typography>
										</MenuItem>
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
										color: "primary.main",
										border: 1,
										borderColor: "primary.main",
										height: "100%",
										"&:hover": {
											backgroundColor: "primary.main",
											border: 1,
											borderColor: "primary.main",
											color: "#ffffff",
										},
									}}
								>
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
										border: 1,
										borderColor: "primary.main",
										height: "100%",
										"&:hover": {
											backgroundColor: "transparent",
											border: 1,
											borderColor: "primary.main",
											color: "primary.main",
										},
									}}
								>
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
