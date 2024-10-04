import { Toolbar, Typography, IconButton } from "@mui/material";
import CommnentIcon from "@mui/icons-material/CommentBankOutlined";

export default function Component(props) {
  const { user, type = "secondary", children = null } = props;

  console.log("useruser: ", user);

  const title = `Bienvenido ${user.primerNombre} ${user.primerApellido}!`;
  return (
    <Toolbar>
      <Typography component="h6" variant="subtitle2" color={`${type}.main`}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label={title}
          size="small"
        >
          <CommnentIcon color={type} />
        </IconButton>
        {title}
      </Typography>
      {children}
    </Toolbar>
  );
}
