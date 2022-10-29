import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { IconButton, List, Paper, Typography } from "@mui/material";
import ListItemUser from "./components/ListItemUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddCircle } from "@mui/icons-material";
import AddUserDialog from "./components/AddUserDialog";

const BASE_API_URL = `https://reqres.in/api`;

function App() {
  const [users, setUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function getUsers() {
      await axios
        .get(`${BASE_API_URL}/users`)
        .then((res) => {
          const responseData = res.data.data;
          setUsers(responseData);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        });
    }

    getUsers();
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="App">
      <div className="list-container">
        <div className="list-title-wrapper">
          <Typography variant="h4">List User</Typography>
          <IconButton onClick={openDialog}>
            <AddCircle />
          </IconButton>
        </div>
        <Paper elevation={2} style={{ maxHeight: "700px", overflow: "auto" }}>
          <List>
            {users.map((d) => (
              <ListItemUser
                key={d.id}
                image={d.avatar}
                primaryText={`${d.first_name} ${d.last_name}`}
                secondaryText={`Email: ${d.email}`}
              />
            ))}
            {newUsers.map((d) => (
              <ListItemUser
                key={d.id}
                image={d.avatar}
                primaryText={d.name}
                secondaryText={`Job: ${d.job}`}
              />
            ))}
          </List>
        </Paper>
      </div>
      {isDialogOpen && (
        <AddUserDialog
          open={isDialogOpen}
          onClose={closeDialog}
          users={newUsers}
          setUsers={setNewUsers}
        />
      )}
    </div>
  );
}

export default App;
