import React from "react";
import { Stack, Text } from "@fluentui/react";

const TableHeader = () => {
  return (
    <Stack horizontal styles={{ root: { borderBottom: "1px solid #ddd", padding: "8px 0", fontWeight: "bold" } }}>
      <Text styles={{ root: { width: "40%", textAlign: "left" } }}>Item</Text>
      <Text styles={{ root: { width: "20%", textAlign: "left" } }}>Status</Text>
      <Text styles={{ root: { width: "20%", textAlign: "left" } }}>Assignee</Text>
      <Text styles={{ root: { width: "20%", textAlign: "left" } }}>Category</Text>
    </Stack>
  );
};

export default TableHeader;