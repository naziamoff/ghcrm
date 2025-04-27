import { Box, Button, TextField } from "@mui/material";
import React, { FC, useState } from "react";

interface Props {
  handleAddProject: (repoPath: string) => void;
}

export const AddProjectView: FC<Props> = ({ handleAddProject }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [repoPath, setRepoPath] = useState("");

  if (!isAdding) {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsAdding(true)}
      >
        Add New Project
      </Button>
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        label="Repository path"
        variant="outlined"
        fullWidth
        value={repoPath}
        onChange={(e) => setRepoPath(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleAddProject(repoPath)}
      >
        Add Project
      </Button>
    </Box>
  );
};
