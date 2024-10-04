/* Dashboard Icons */
import DashboardIcon from "@mui/icons-material/Dashboard";
import AppRegistration from "@mui/icons-material/AppRegistration";

import { DocumentScanner } from "@mui/icons-material";

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
    icon: <DashboardIcon />,
    href: "/dashboard",
    url: "/dashboard",
    to: "/dashboard",
  },
  solicitudes: {
    name: "Solicitudes",
    icon: <DocumentScanner />,
    href: "/solicitudes",
    url: "/solicitudes",
    to: "/solicitudes",
  },
  voluntarios: {
    name: "Voluntarios",
    icon: <AppRegistration />,
    href: "/voluntarios",
    url: "/voluntarios",
    to: "/voluntarios",
  },
  usuarios: {
    name: "Usuarios",
    icon: <AppRegistration />,
    href: "/usuarios",
    url: "/usuarios",
    to: "/usuarios",
  },
};

/* Secondary routes */
const routeSecondary = {};
/* Documentation routes */
const routeDocumentation = {
  // about: {
  //   name: "About",
  //   icon: <PersonPinIcon htmlColor="red" sx={{ verticalAlign: "middle" }} />,
  //   text: "Go to the about page",
  //   href: "/about",
  //   url: "/about",
  //   to: "/about",
  // },
  // documentation: {
  //   name: "Documentation",
  //   icon: <ApiIcon htmlColor="red" sx={{ verticalAlign: "middle" }} />,
  //   text: "Go to the documentation page",
  //   href: "/documentation",
  //   url: "/documentation",
  //   to: "/documentation",
  // },
};

export { routePage, routeDashboard, routeSecondary, routeDocumentation };
