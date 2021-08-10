import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import ChatPanel from "./components/ChatPanel/ChatPanel";
import SidePanel from "./components/SidePanel/SidePanel";
const App = () => {
  const currentChannel = useSelector((state) => state.channels.currentChannel);

  return (
    <Grid columns="2" style={{ height: "100vh" }}>
      <Grid.Column width="3" style={{ height: "105%", paddingRight: 0 }}>
        {/* sidebar */}
        <SidePanel />
      </Grid.Column>
      <Grid.Column width="13" style={{ background: "#eee", paddingLeft: 0 }}>
        {/* chatpanel */}
        {currentChannel && <ChatPanel currentChannel={currentChannel} />}
      </Grid.Column>
    </Grid>
  );
};

export default App;
