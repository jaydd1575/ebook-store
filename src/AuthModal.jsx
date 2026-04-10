import { useState, useEffect } from "react";
import "./AuthModal.css";
import { loginUser, registerUser } from "./api";
import { useAuth } from "./AuthContext";

export default function AuthModal({ open, onClose }) {
  const [tab, setTab] = useState("signin");
  const [showPass, setShowPass] = useState(false);

  // form states
   const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  // 🔐 LOGIN FUNCTION
  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);

      console.log("Login response:", res);

      if (res.token) {
        login(res);
        alert("Login successful ✅");
        onClose();
      } else {
        alert(res.message || "Login failed ❌");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong ❌");
    }
  };

  // 📝 REGISTER FUNCTION (FIXED)
  const handleRegister = async () => {
    try {
      const res = await registerUser({
  firstName,
  lastName,
  email,
  password,
});
      

      console.log("Register response:", res);

      if (res.token) {
        login(res);
        alert("Account created successfully ✅");
        onClose();
      } else {
        alert(res.message || "Registration failed ❌");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="auth-box" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>✕</button>

        <div className="auth-brand">
          <span>📚</span>
          <span className="auth-logo">KitabKart</span>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={tab === "signin" ? "active" : ""}
            onClick={() => setTab("signin")}
          >
            Sign In
          </button>
          <button
            className={tab === "signup" ? "active" : ""}
            onClick={() => setTab("signup")}
          >
            Create Account
          </button>
        </div>

        {/* SIGN IN */}
        {tab === "signin" ? (
          <div className="auth-form">
            <h2 className="auth-title">Welcome back</h2>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="pass-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="show-pass"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button className="auth-submit" onClick={handleLogin}>
              Sign In
            </button>
          </div>
        ) : (
          /* SIGN UP */
          <div className="auth-form">
            <h2 className="auth-title">Join KitabKart</h2>

            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="pass-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="show-pass"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button className="auth-submit" onClick={handleRegister}>
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}