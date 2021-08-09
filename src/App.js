import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import SidePanel from "./components/SidePanel/SidePanel";

const App = () => {
  return (
    <Grid columns="2">
      <Grid.Column width="4" style={{ background: "#000", height: "110vh" }}>
        {/* sidebar */}
        <SidePanel />
      </Grid.Column>
      <Grid.Column width="13" style={{ background: "#eee" }}>
        {/* chatpanel */}
      </Grid.Column>
    </Grid>
  );
};

export default App;
