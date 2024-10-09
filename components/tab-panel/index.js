import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function TabPanel({ children, solicitud }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const defaultMessage = "No hay información";
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Información Básica" />
          {solicitud?.logistica && <Tab label="Información de Lógistica" />}

          {solicitud?.voluntario?.emergencia && (
            <Tab label="Información de Salud y Emergencia" />
          )}
        </Tabs>
      </Box>
      {React.Children.map(children, (child, index) => (
        <CustomTabPanel value={value} key={index} index={index}>
          {child}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
