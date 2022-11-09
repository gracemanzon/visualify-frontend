import axios from "axios";
import { useState, useEffect } from "react";
import { Login } from "./Login";

export function Home() {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("user_id");

  const handleUserShow = () => {
    console.log("handleUserShow");
    axios.get("http://localhost:3000/users/" + userId + ".json").then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  };

  useEffect(handleUserShow, {});

  return (
    <div>
      <h1> Visualify </h1>
      <Login />
    </div>
  );
}
