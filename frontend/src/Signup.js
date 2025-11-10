import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/signup";

      const res = await axios.post(url, formData);

      toast.success(res.data.message || "Success!", {
        position: "top-center",
        autoClose: 2000,
      });

      if (isLogin) {
        if (res.data && res.data.user) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        setTimeout(() => navigate("/"), 2000);
      } else {
        setTimeout(() => setIsLogin(true), 2000);
      }

      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <ToastContainer />

      <div className="auth-box">
        {/* 🎨 LEFT SIDE */}
        <div className="auth-left">
          <img
            src="image/3d illustration.png"
            alt="Auth Illustration"
            className="auth-illustration"
          />
          <div className="auth-text">
            <h2>
              {isLogin
                ? "Welcome back! Log in to manage employees effortlessly."
                : "Create your account to start managing your workforce."}
            </h2>
          </div>
        </div>

        {/* 🧾 RIGHT SIDE */}
        <div className="auth-right">
          <div className="auth-card">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>

            {/* 🌐 SOCIAL BUTTONS */}
            <div className="social-buttons">
              <button className="google-btn">
                <i className="fa-brands fa-google"></i>&nbsp; Google
              </button>
              <button className="facebook-btn">
                <i className="fa-brands fa-facebook-f"></i>&nbsp; Facebook
              </button>
            </div>

            <div className="divider">or continue with email</div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="input-box">
                  <i className="fa-solid fa-user input-icon"></i>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="input-box">
                <i className="fa-solid fa-envelope input-icon"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-box">
                <i className="fa-solid fa-lock input-icon"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="create-btn" disabled={loading}>
                {loading
                  ? isLogin
                    ? "Logging in..."
                    : "Creating Account..."
                  : isLogin
                  ? "Login"
                  : "Sign Up"}
              </button>
            </form>

            <p className="switch-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span onClick={toggleMode}>
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
