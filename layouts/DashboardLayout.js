import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Cookies from "js-cookie";

/* Components */
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";

import {
  Container,
  Box,
  Toolbar,
  List,
  Typography,
  Input,
  Divider,
  IconButton,
  Link,
  useMediaQuery,
} from "@mui/material";

/* Icons */
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingIcon from "@mui/icons-material/Settings";

/* Components */
import { mainListItems } from "@components/ListMenu/listItems";

import AlertBar from "@components/Alert/SnackBar";
import Copyright from "@components/Copyright";
import FloatNotify from "@components/Float/Notify";
import ScrollToTop from "@components/Scroll/ToTop";

/* Config */
import { constant } from "@config/constants";

const style = {
  boxSearch: {
    "& .MuiTextField-root": { m: 2, width: "12ch" },
  },
  drawer: {
    boxShadow: "0 .3rem .8rem rgba(0, 0, 0, .12)",
    transition: "all .2s ease-out",
    zIndex: 11,
    border: 0,
  },
  drawerPaper: {
    ".MuiDrawer-paper": {
      width: "58px",
      position: "relative",
    },
  },
  dividerArrow: {
    display: "block",
    margin: "12px 7px 0 5px",
    width: "10px",
    height: "10px",
    borderWidth: 0,
    borderStyle: "none",
    borderColor: "none",
    borderTop: "1px solid #000",
    borderLeft: "1px solid #000",
    transform: "rotate(135deg) translate(7px,7px)",
  },
  menuPaperProps: {
    elevation: 0,
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
  },
  menuProfile: {
    a: { textDecoration: "none" },
    svg: { fontSize: "large", verticalAlign: "middle", mr: 0.5 },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: [1],
    a: {
      transition: "all .5s ease",
      verticalAlign: "middle",
      ml: 1.5,
      ":hover": {
        filter: "brightness(1.35);",
      },
    },
  },
};

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent({ page, children }) {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });

  const [open, setOpen] = React.useState(true);
  const [searchOpen, setSearchOpen] = React.useState(true);
  const [openNotify, setOpenNotify] = React.useState(false);
  const [user, setUser] = React.useState();
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setOpenNotify(false);
  }, []);

  React.useEffect(() => {
    if (match) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [match]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenuProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const itemsNotify = [
    {
      id: 1,
      author: "Test",
      title: "Es una prueba de una notificacion",
      text: "Lorem Sit aliqua excepteur tempor fugiat anim sint tempor et. Nulla velit proident in aute dolor cupidatat ullamco occaecat occaecat aliquip. Ea deserunt reprehenderit labore laboris ad eu veniam pariatur occaecat commodo ea amet mollit.",
    },
  ];

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user-info");
  };

  React.useEffect(() => {
    const userCookie = Cookies.get("user-info");
    const user = JSON?.parse(decodeURIComponent(userCookie));

    if (user) {
      setUser(user);
    }
  }, [Cookies]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open} color="light">
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <Box
            display="flex"
            sx={{
              textDecoration: "none",
              flexGrow: 1,
              justifyContent: "start",
              verticalAlign: "middle",
              alignItems: "center",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
            <IconButton
              color="inherit"
              href="/"
              sx={{
                marginLeft: 0,
                marginRight: ".75rem",
              }}
            >
              <HomeIcon fontSize="small" />
            </IconButton>
            <Divider
              orientation="vertical"
              variant="center"
              flexItem
              sx={style.dividerArrow}
            />
            <Typography
              component="a"
              href={`/${page}`}
              variant="subtitle1"
              color="inherit"
              noWrap
              sx={{ textDecoration: "none" }}
            >
              {page}
            </Typography>
          </Box>
          <Stack spacing={{ md: 1 }} direction="row">
            <FloatNotify show={openNotify} items={itemsNotify} />
            <IconButton
              color="inherit"
              aria-label="profile of current user"
              aria-controls="menu-appbar-profile"
              aria-haspopup="true"
              onClick={handleMenuProfile}
            >
              <AccountCircleOutlinedIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Menu
            id="menu-appbar-profile"
            keepMounted
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={style.menuProfile}
            PaperProps={style.menuPaperProps}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              dense
              //onClick={handleClose}
            >
              <Link href="/profile">
                <AccountCircleOutlinedIcon /> {user?.primerNomber}{" "}
                {user?.primerApellido}
              </Link>
            </MenuItem>
            <MenuItem dense onClick={handleClose}>
              <Link href="/auth/signin" onClick={logout}>
                <SettingIcon /> Cerrar sesion
              </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          ...style.drawer,
          ...(!open && { ...style.drawerPaper }),
        }}
      >
        <Toolbar sx={style.toolbar}>
          <Link href="/">
            <img
              src="/assets/img/arcas_logo.png"
              alt={constant.siteName}
              height={44}
              style={{ verticalAlign: "middle" }}
            />
          </Link>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List
          component="nav"
          sx={{
            a: { textDecoration: "none" },
          }}
        >
          {mainListItems(open)}
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
      <Box
        id="back-to-top-anchor"
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 2, mb: 4, pt: 6 }}>
          <AlertBar
            hidden={false}
            content={{ title: "", description: "", type: "" }}
          />
          {children}
          <Copyright />
          <ScrollToTop />
          {/* <ToggleColor /> */}
        </Container>
      </Box>
    </Box>
  );
}

export default function DashboardLayout({ page, children }) {
  return <DashboardContent page={page}>{children}</DashboardContent>;
}
