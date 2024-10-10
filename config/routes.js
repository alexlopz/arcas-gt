/* Dashboard Icons */
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

/* Homepage routes */
const routePage = {
  home: {
    name: "Home",
    text: "Homepage",
    href: "/",
    url: "/",
    to: "/",
  },
  dashboard: {
    name: "Dashboard",
    text: "Administration Dashboard",
    href: "/dashboard",
    url: "/dashboard",
    to: "/dashboard",
  },
  about: {
    name: "About",
    text: "About Page Interface",
    href: "/about",
    url: "/about",
    to: "/about",
  },
};

/* Dashboard routes */
const routeDashboard = {
  dashboard: {
    name: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    href: "/dashboard",
    url: "/dashboard",
    to: "/dashboard",
  },
  solicitudes: {
    name: "Solicitudes",
    icon: <PendingActionsOutlinedIcon />,
    href: "/solicitudes",
    url: "/solicitudes",
    to: "/solicitudes",
  },
  voluntarios: {
    name: "Voluntarios",
    icon: <BadgeOutlinedIcon />,
    href: "/voluntarios",
    url: "/voluntarios",
    to: "/voluntarios",
  },
  usuarios: {
    name: "Usuarios",
    icon: <Person4OutlinedIcon />,
    href: "/usuarios",
    url: "/usuarios",
    to: "/usuarios",
  },
  sedes: {
    name: "Sedes",
    icon: <AccountBalanceOutlinedIcon />,
    href: "/sedes",
    url: "/sedes",
    to: "/sedes",
  },
  planes: {
    name: "Planes",
    icon: <LibraryBooksIcon />,
    href: "/planes",
    url: "/planes",
    to: "/planes",
  },
};

export { routePage, routeDashboard };
