import axios from "axios";
import { useState } from "react";

export function Signup() {
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users", params)
      .then((response) => {
        console.log(response.data);
        event.target.reset();
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup">
      <h1>Signup</h1>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Name:</p>
          <input name="name" type="text" />
        </div>
        <div>
          <p>Avatar:</p>
          <input name="avatar" type="text" />
        </div>
        <div>
          <p>Email:</p>
          <input name="email" type="text" />
        </div>
        <div>
          <p>Password:</p>
          <input name="password" type="text" />
        </div>
        <div>
          <p>Password Confirmation:</p>
          <input name="password_confirmation" type="text" />
        </div>
        <div>
          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
}
