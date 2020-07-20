import React from "react";

const handleLogin = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  console.log(name);
  e.target.reset();
};

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="name">Your name:</label>
        <input type="text" id="name" />
        <button type="submit">Go</button>
      </form>
    </div>
  );
};

export default Login;
