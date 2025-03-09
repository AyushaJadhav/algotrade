// TaskPanel.js
import React from "react";
import {
  Panel,
  PanelType,
  Stack,
  TextField,
  Dropdown,
  PrimaryButton,
} from "@fluentui/react";

const statusColors = {
  "To Do": "#f0f0f0",
  "In Progress": "#50afeb",
  Completed: "#d4ffd4",
};

const categoryColors = {
  Research: "#fddede",
  Marketing: "#dbd55c",
  Mobile: "#f2e930",
  Vision: "#7bf046",
};

const TaskPanel = ({
  isPanelOpen,
  handlePanelDismiss,
  newTaskTitle,
  setNewTaskTitle,
  newTaskStatus,
  setNewTaskStatus,
  newTaskAssignee,
  setNewTaskAssignee,
  newTaskCategory,
  setNewTaskCategory,
  handleCreateTask,
  users,
}) => {
  return (
    <Panel
      isOpen={isPanelOpen}
      type={PanelType.medium}
      onDismiss={handlePanelDismiss}
      headerText="Create New Task"
      // Add a custom class to target the panel with CSS
      className="right-side-panel" 
    >
      <Stack tokens={{ childrenGap: 10 }}>
        {/* ... other fields ... */}
      </Stack>
    </Panel>
  );
};

export default TaskPanel;