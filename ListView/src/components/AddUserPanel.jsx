import React from "react";
import { Panel, PanelType, Stack, TextField, PrimaryButton } from "@fluentui/react";

const AddUserPanel = ({
  isOpen,
  onDismiss,
  newUser,
  setNewUser,
  handleCreateUser,
}) => {
  return (
    <Panel isOpen={isOpen} type={PanelType.medium} onDismiss={onDismiss} headerText="Add New User">
      <Stack tokens={{ childrenGap: 10 }}>
        <TextField
          label="User Name"
          value={newUser}
          onChange={(ev, newValue) => setNewUser(newValue)}
        />
        <PrimaryButton text="Create" onClick={handleCreateUser} />
      </Stack>
    </Panel>
  );
};

export default AddUserPanel;