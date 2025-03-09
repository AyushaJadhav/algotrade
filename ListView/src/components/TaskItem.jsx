import React, { useState } from "react";
import {
  Checkbox,
  Text,
  Label,
  IconButton,
  Dropdown,
} from "@fluentui/react";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";

initializeIcons();

const styles = mergeStyleSets({
  taskItem: {
    display: "grid",
    gridTemplateColumns: "40px 1fr 150px 150px 150px auto",
    alignItems: "center",
    padding: "8px 16px",
    borderBottom: "1px solid #eee",
    gap: "12px",





  },
  
  taskTitle: {
    flexGrow: 1,
    textAlign: "left",
    alignSelf: "start",
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    justifyContent: "left",
    paddingLeft: "20px",
  },
  statusLabel: {
    borderRadius: "4px",
    padding: "4px 8px",
    minWidth: "100px",
    textAlign: "center",
  },
  editButton: {
    visibility: "visible",
    opacity: 1,
    background: "transparent",
    padding: "4px",
    color: "#0078D4",
  },
  assigneeLabel: {
    marginRight: "8px",
    textAlign: "right",
    alignSelf: "start",
    paddingLeft: "20px", 


  },
  categoryLabel: {
    padding: "4px 8px",
    borderRadius: "4px",
    marginRight: "8px",
    textAlign: "left",
    alignSelf: "start",
  },
  deleteButton: {
    color: "red",
    alignSelf: "start",
    justifySelf: "end",
  },
  checkedTaskTitle: {
    textDecoration: "line-through",
  },
});

const statusColors = {
  "To Do": "#f0f0f0",
  "In Progress": "#cce0ff",
  Completed: "#d4ffd4",
};

const categoryColors = {
  Research: "#fddede",
  Marketing: "#e6f7ff",
  Mobile: "#fff2cc",
  Vision: "#e8f5e9",
};

const TaskItem = ({ task, handleDeleteTask, handleStatusChange }) => {
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleEditStatusClick = (e) => {
    e.stopPropagation();
    setIsEditingStatus(true);
  };

  const handleStatusDropdownChange = (event, item) => {
    handleStatusChange(task.id, item.key);
    setIsEditingStatus(false);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".statusContainer")) {
      setIsEditingStatus(false);
    }
  };

  const handleCheckboxChange = (ev, checked) => {
    setIsChecked(checked);
  };

  React.useEffect(() => {
    if (isEditingStatus) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isEditingStatus]);

  const statusOptions = [
    { key: "To Do", text: "To Do" },
    { key: "In Progress", text: "In Progress" },
    { key: "Completed", text: "Completed" },
  ];

  return (
    <div className={styles.taskItem}>
      <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      <Text className={`${styles.taskTitle} ${isChecked ? styles.checkedTaskTitle : ""}`}>
        {task.title}
      </Text>

      <div className={`statusContainer ${styles.statusContainer}`}>
        {isEditingStatus ? (
          <Dropdown
            selectedKey={task.status}
            options={statusOptions}
            onChange={handleStatusDropdownChange}
            onDismiss={() => setIsEditingStatus(false)}
            styles={{ dropdown: { minWidth: 120 } }}
          />
        ) : (
          <>
            <Label
              className={styles.statusLabel}
              style={{ backgroundColor: statusColors[task.status] }}
            >
              {task.status}
            </Label>
            <IconButton
              iconProps={{ iconName: "Edit" }}
              onClick={handleEditStatusClick}
              title="Edit Status"
              styles={{ root: styles.editButton }}
            />
          </>
        )}
      </div>

      <Label className={styles.assigneeLabel}>{task.assignee}</Label>
      <Label
        className={styles.categoryLabel}
        style={{ backgroundColor: categoryColors[task.category] }}
      >
        {task.category}
      </Label>

      <IconButton
        iconProps={{ iconName: "Delete" }}
        className={styles.deleteButton}
        onClick={() => handleDeleteTask(task.id)}
      />
    </div>
  );
};

export default TaskItem;