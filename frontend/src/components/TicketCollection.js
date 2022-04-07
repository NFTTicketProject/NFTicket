import React from "react";
import { Grid } from "@mui/material";

function TicketCollection() {
  return (
    <div>
      <Grid container style={{ margin: "2rem 0" }}>
        <Grid item sm={3} style={{ display: "flex", justifyContent: "center" }}>
          <img src="images/ticketImg1.png" alt="" />
        </Grid>
        <Grid item sm={3} style={{ display: "flex", justifyContent: "center" }}>
          <img src="images/ticketImg1.png" alt="" />
        </Grid>
        <Grid item sm={3} style={{ display: "flex", justifyContent: "center" }}>
          <img src="images/ticketImg1.png" alt="" />
        </Grid>
        <Grid item sm={3} style={{ display: "flex", justifyContent: "center" }}>
          <img src="images/ticketImg1.png" alt="" />
        </Grid>
      </Grid>
    </div>
  );
}

export default TicketCollection;
