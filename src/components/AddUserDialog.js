import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const BASE_API_URL = `https://reqres.in/api`;

function AddUserDialog({ open, onClose, users, setUsers, closeDialog }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSubmit = () => {
    if (!name || !job) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    axios
      .post(`${BASE_API_URL}/users`, {
        name: name,
        job: job,
      })
      .then((res) => {
        setUsers([...users, res.data]);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add user</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          padding: "8px 20px",
        }}
      >
        <TextField
          name="name"
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          name="job"
          label="Job"
          value={job}
          onChange={(event) => setJob(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserDialog;
