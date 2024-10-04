import * as React from "react";

import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";

/* Components */
import ProTip from "@components/ProTip";
import Link from "@components/Link";
import Copyright from "@components/Copyright";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Page() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Acerca de Arcas
        </Typography>
        <div>
          Leverage agile frameworks to provide a robust synopsis for high level
          overviews. Iterative approaches to corporate strategy foster
          collaborative thinking to further the overall value proposition.
          <br />
          <br />
          Organically grow the holistic world view of disruptive innovation via
          workplace diversity and empowerment. Bring to the table win-win
          survival strategies to ensure proactive domination. At the end of the
          day, going forward, a new normal that has evolved from generation X is
          on the runway heading towards a streamlined cloud solution. User
          generated content in real-time will have multiple touchpoints for
          offshoring.
          <br />
          <br />
          Capitalize on low hanging fruit to identify a ballpark value added
          activity to beta test. Override the digital divide with additional
          clickthroughs from DevOps. Nanotechnology immersion along the
          information highway will close the loop on focusing solely on the
          bottom line.
        </div>
        <div>
          <Button variant="contained" component={Link} noLinkStyle href="/">
            Ir a inicio
          </Button>
        </div>
        <Copyright />
      </Box>
    </Container>
  );
}
