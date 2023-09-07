/** @format */

import React from "react";
import { Modal, Group, Button, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const UI = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Modal with scroll</p>);
  return (
    <React.Fragment>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 0 }}>
          <Modal
            opened={opened}
            onClose={close}
            title="Authentication"
            size={"lg"}
            scrollAreaComponent={ScrollArea.Autosize}
            pos={"absolute"}
            top={0}
            left={0}
          >
            {content}
          </Modal>
        </div>
        <Group position="center">
          <Button onClick={open}>Open modal</Button>
        </Group>
      </div>
    </React.Fragment>
  );
};

export default UI;
