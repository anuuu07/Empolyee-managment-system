import React, { useState } from "react";
import axios from "axios";

function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login Page</h2>
      <form>
        <input type="email" placeholder="Email" required /><br /><br />
        <input type="password" placeholder="Password" required /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
