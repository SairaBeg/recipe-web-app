import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // await axios.post("http://localhost:3001/auth/register", {
      await axios.post("https://recipe-api-okz1.onrender.com/auth/register", {
        username,
        password,
      });
      alert("Registration completed, now login.");
    } catch (e) {
      console.error(e, "Error");
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};

const Form = ({ username, setUsername, password, setPassword, onSubmit }) => {
  return (
    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2 className="auth-title">Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <input
            className="auth-input"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            className="auth-input"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button id="register-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
