import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function UserShow(props) {
  const params = useParams();
  console.log(params);
  const [user, setUser] = useState({});

  const handleUserShow = (user) => {
    axios.get("http://localhost:3000/users/" + params.id + ".json").then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  };

  useEffect(handleUserShow, []);

  return (
    <div id="user-show">
      <h1>User Show Action</h1>
      <div>
        <h2>{user.name}</h2>
        <img src={user.avatar} />
      </div>

      <div>
        {user.snapshots?.map((snapshot) => (
          <div>
            <Link to={`/snapshots/${snapshot.id}`}>
              <h2>{snapshot.title}</h2>
              <img src={snapshot.image} />
            </Link>
            <p>
              {snapshot.start_date} - {snapshot.end_date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
