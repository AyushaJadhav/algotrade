
import React from "react";
import { DefaultButton, Dropdown, TextField } from "@fluentui/react";

const SearchAndGroup = ({
  searchTerm,
  handleSearchChange,
  handleAddUserClick,
  newUser,
  setNewUser,
  handleCreateUser,
  groupBy,
  handleGroupByChange,
  users,
  activeFilter,
  clearFilter,
}) => {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "15px" }}>
      {/* Search Bar */}
      <TextField
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        styles={{ fieldGroup: { width: 200 } }}
      />

      {/* New User TextBox */}
      <TextField
        placeholder="Enter user name"
        value={newUser}
        onChange={(e, newValue) => setNewUser(newValue)}
        styles={{ fieldGroup: { width: 180 } }}
      />

      {/* Add User Button */}
      <DefaultButton className="add-users-button" text="Add User" onClick={handleCreateUser} />

      {/* Group By Dropdown */}
      <div className="group-by-dropdown">
        <DefaultButton text="Group By" />

        <div className="dropdown-content">
          <div className="dropdown-item">
            Status
            <div className="nested-dropdown">
              <div onClick={() => handleGroupByChange("To Do")}>To Do</div>
              <div onClick={() => handleGroupByChange("In Progress")}>In Progress</div>
              <div onClick={() => handleGroupByChange("Completed")}>Completed</div>
            </div>
          </div>

          <div className="dropdown-item">
            Assignee
            <div className="nested-dropdown">
              {users.map((user) => (
                <div key={user} onClick={() => handleGroupByChange(user)}>
                  {user}
                </div>
              ))}
            </div>
          </div>

          <div className="dropdown-item">
            Category
            <div className="nested-dropdown">
              <div onClick={() => handleGroupByChange("Research")}>Research</div>
              <div onClick={() => handleGroupByChange("Marketing")}>Marketing</div>
              <div onClick={() => handleGroupByChange("Mobile")}>Mobile</div>
              <div onClick={() => handleGroupByChange("Vision")}>Vision</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Display */}
      {activeFilter && (
        <div style={{ marginLeft: "10px" }}>
          <span>Filter: {activeFilter}</span>
          <DefaultButton className="clear-filter-button" text="Clear Filter" onClick={clearFilter} styles={{ root: { marginLeft: "5px" } }} />
        </div>
      )}
    </div>
  );
};

export default SearchAndGroup;