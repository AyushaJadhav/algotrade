import React, { useState } from "react";
import { Dropdown } from "@fluentui/react";
import SprintItem from "./SprintItem";

const statusOptions = [
  { key: "to-do", text: "To Do" },
  { key: "in-progress", text: "In Progress" },
  { key: "completed", text: "Completed" },
];

const SprintList = ({ sprints }) => {
  const [groupBy, setGroupBy] = useState(null);
  const [filterValue, setFilterValue] = useState(null);

  const handleGroupByChange = (key) => {
    setGroupBy(key);
    setFilterValue(null);
  };

  const handleFilterChange = (e, option) => {
    setFilterValue(option.key);
  };

  const filteredSprints = sprints.filter((sprint) => {
    if (!groupBy || !filterValue) return true;
    return sprint[groupBy] === filterValue;
  });

  return (
    <div>
      {groupBy && (
        <Dropdown
          placeholder={`Filter by ${groupBy}`}
          options={
            groupBy === "status"
              ? statusOptions
              : groupBy === "assignee"
              ? sprints.map((s) => ({ key: s.assignee, text: s.assignee }))
              : sprints.map((s) => ({ key: s.category, text: s.category }))
          }
          onChange={handleFilterChange}
          style={{ width: 150, marginBottom: "10px" }}
        />
      )}
      {filteredSprints.map((sprint) => (
        <SprintItem key={sprint.id} sprint={sprint} />
      ))}
    </div>
  );
};

export default SprintList;