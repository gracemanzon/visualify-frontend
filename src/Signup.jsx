import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div id="signup" className="signup">
      <h2>Account Creation</h2>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="name" type="text" placeholder="username" />
        </div>
        <div>
          <input name="avatar" type="text" placeholder="avatar image url" />
        </div>
        <div>
          <input name="email" type="text" placeholder="email address" />
        </div>
        <div>
          <input name="password" type="password" placeholder="password" />
        </div>
        <div>
          <input name="password_confirmation" type="password" placeholder="confirm password" />
        </div>
        <div className="btn-container">
          <button type="submit" className="custom-btn">
            Create Account
          </button>
          <button className="custom-btn-2">
            <Link to="/" className="custom-link">
              Return to Login
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
