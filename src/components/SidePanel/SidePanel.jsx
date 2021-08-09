import React, { useState } from "react";
import { Icon, Menu, Popup } from "semantic-ui-react";
import ChannelList from "../Channels/ChannelList";
import CreateChannelsForm from "../Channels/CreateChannelsForm";
import UserPanel from "../UserPanel/UserPanel";
import { TwitterPicker } from "react-color";

const SidePanel = () => {
  const [color, setColor] = useState("#22194d");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Menu
        vertical
        inverted
        secondary
        style={{
          width: "324px",
          fontSize: "1rem",
          height: "100%",
          background: color,
        }}
      >
        <Menu.Item>
          {/* UserPanel */}
          <TwitterPicker
            color={color}
            onChangeComplete={(color) => setColor(color.hex)}
          />
          <UserPanel />
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>
            Channels
            <span style={{ float: "right" }}>
              <Popup
                content="Crate Channel"
                trigger={<Icon name="add" onClick={(event) => handleOpen()} />}
              />
            </span>
          </Menu.Header>
          <ChannelList />
        </Menu.Item>
      </Menu>

      {/* Create Channel Form */}
      <CreateChannelsForm
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
      />
    </>
  );
};

export default SidePanel;
