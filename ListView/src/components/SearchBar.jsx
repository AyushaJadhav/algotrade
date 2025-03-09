import React from "react";
import { TextField, DefaultButton, Dropdown } from "@fluentui/react";

const groupByOptions = [
  { key: "status", text: "Status" },
  { key: "assignee", text: "Assignee" },
  { key: "category", text: "Category" },
];

const SearchBar = ({ onSearch, onAddUser, onGroupByChange }) => {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <TextField
        placeholder="Search..."
        onChange={(e, newValue) => onSearch(newValue)}
      />
      <DefaultButton text="Add User" onClick={onAddUser} />
      <Dropdown
        placeholder="Group By"
        options={groupByOptions}
        onChange={(e, option) => onGroupByChange(option.key)}
        style={{ width: 120 }}
      />
    </div>
  );
};

export default SearchBar;