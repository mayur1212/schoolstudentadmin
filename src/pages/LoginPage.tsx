import React, { useState, useEffect } from "react";
import { User } from "../data/usersData";

type LoginPageProps = {
  users: User[];
  onLogin: (user: User) => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ users, onLogin }) => {
  const [email, setEmail] = useState<string>(
    localStorage.getItem("userEmail") || ""
  );
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(false);
  const [hoverButton, setHoverButton] = useState(false);
  const [focusInput, setFocusInput] = useState<{ [key: string]: boolean }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => setAnimate(true), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("⚠ Please enter a valid email");
      return;
    }
    if (!password) {
      setError("⚠ Password cannot be empty");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (user) {
        setError("");
        if (rememberMe) {
          localStorage.setItem("userEmail", email);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("userEmail");
          localStorage.removeItem("rememberMe");
        }
        onLogin(user);
      } else {
        setError("❌ Invalid email or password");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(-45deg, #000000, #1a0000, #ff0000, #330000)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Pulse glow */}
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "15px",
          background:
            "radial-gradient(circle, rgba(255,0,0,0.4) 0%, rgba(0,0,0,0) 70%)",
          animation: "pulseGlow 2s infinite alternate",
          zIndex: 0,
        }}
      ></div>

      {/* Login card */}
      <div
        style={{
          backgroundColor: "#111111",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 0 50px rgba(255,0,0,0.6)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          animation: animate ? "fadeScale 0.6s ease forwards" : "none",
        }}
      >
        <h2
          style={{
            color: "#ff0000",
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
          School Login
        </h2>

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            textAlign: "left",
          }}
          onSubmit={handleSubmit}
        >
          {/* Email */}
          <label style={{ color: "#ccc", fontSize: "0.9rem" }}>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusInput({ ...focusInput, email: true })}
            onBlur={() => setFocusInput({ ...focusInput, email: false })}
            style={{
              padding: "0.9rem",
              fontSize: "1rem",
              borderRadius: "6px",
              border: focusInput.email ? "2px solid #ff0000" : "1px solid #ccc",
              outline: "none",
              backgroundColor: "#222222",
              color: "white",
              width: "100%",
            }}
          />

          {/* Password */}
          <label style={{ color: "#ccc", fontSize: "0.9rem" }}>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusInput({ ...focusInput, password: true })}
              onBlur={() => setFocusInput({ ...focusInput, password: false })}
              style={{
                padding: "0.9rem",
                fontSize: "1rem",
                borderRadius: "6px",
                border: focusInput.password
                  ? "2px solid #ff0000"
                  : "1px solid #ccc",
                outline: "none",
                backgroundColor: "#222222",
                color: "white",
                width: "100%",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#ff5555",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Remember me */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "white",
              fontSize: "0.9rem",
            }}
          >
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            style={{
              padding: "0.9rem",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: hoverButton ? "#ff3333" : "#ff0000",
              color: "white",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transform: hoverButton ? "scale(1.05)" : "scale(1)",
              transition: "all 0.3s ease",
              boxShadow: hoverButton ? "0 0 15px #ff0000" : "none",
              opacity: loading ? 0.7 : 1,
              width: "100%",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot password */}
        <p
          style={{
            marginTop: "1rem",
            color: "#aaa",
            cursor: "pointer",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
          onClick={() => alert("Redirect to Forgot Password page")}
        >
          Forgot Password?
        </p>

        {/* Error */}
        {error && (
          <p
            style={{
              color: "#ff4444",
              marginTop: "1rem",
              fontWeight: "bold",
              animation: "fadeIn 0.3s ease",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
      </div>

      <style>
        {`
          @keyframes fadeScale {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }

          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes pulseGlow {
            0% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(1.1); opacity: 0.9; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 600px) {
            div[style*='padding: 2rem'] {
              padding: 1.2rem !important;
            }
            h2 {
              font-size: 1.4rem !important;
            }
            input, button {
              font-size: 0.9rem !important;
              padding: 0.8rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;
