import { useState } from "react";
import { API } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/signup", {
        username,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      console.error("Signup failed", err);
      alert("Signup failed. Username or email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join Social today</p>

        <div style={styles.form}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button 
            onClick={signup} 
            style={loading ? styles.btnDisabled : styles.btn}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p style={styles.link}>
            Already have an account? {" "}
            <span style={styles.linkText} onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 100px)",
    padding: "20px",
    backgroundColor: "#f0f2f5",
  },
  card: {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#1c1e21",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "15px",
    color: "#65676b",
    marginBottom: "32px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "14px 16px",
    fontSize: "15px",
    border: "1px solid #dddfe2",
    borderRadius: "8px",
    outline: "none",
    transition: "border 0.2s",
  },
  btn: {
    padding: "14px",
    backgroundColor: "#007AFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: "8px",
  },
  btnDisabled: {
    padding: "14px",
    backgroundColor: "#b0b3b8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "not-allowed",
    marginTop: "8px",
  },
  link: {
    textAlign: "center",
    fontSize: "14px",
    color: "#65676b",
    marginTop: "8px",
  },
  linkText: {
    color: "#007AFF",
    cursor: "pointer",
    fontWeight: 600,
  },
};
