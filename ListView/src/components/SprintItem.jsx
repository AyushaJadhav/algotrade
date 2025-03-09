import React from "react";
import { IconButton } from "@fluentui/react";

const SprintItem = ({ sprint }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <span>{sprint.name}</span>
      <span>
        {sprint.status}
        <IconButton iconProps={{ iconName: "Edit" }} title="Edit Status" />
      </span>
    </div>
  );
};

export default SprintItem;