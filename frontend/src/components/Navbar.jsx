import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>Social</h2>

      <div style={styles.right}>
        <div style={styles.badge}>
          <span style={styles.points}>50</span>
          <span style={styles.icon}>🪙</span>
        </div>
        
        <div style={styles.balance}>₹0.00</div>
        
        <button style={styles.iconBtn}>
          <span style={styles.notification}>🔔</span>
          <span style={styles.redDot}></span>
        </button>
        
        {user ? (
          <div style={styles.avatar} onClick={() => navigate('/profile')}>
            {user.username[0].toUpperCase()}
          </div>
        ) : (
          <div style={styles.avatar} onClick={() => navigate('/login')}>
            👤
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    backgroundColor: "white",
    borderBottom: "1px solid #e4e6eb",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 600,
    color: "#1c1e21",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 12px",
    backgroundColor: "#fff3e0",
    borderRadius: "20px",
  },
  points: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#e65100",
  },
  icon: {
    fontSize: "16px",
  },
  balance: {
    padding: "6px 12px",
    backgroundColor: "#e8f5e9",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#2e7d32",
  },
  iconBtn: {
    position: "relative",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    padding: "8px",
  },
  notification: {
    fontSize: "20px",
  },
  redDot: {
    position: "absolute",
    top: "6px",
    right: "6px",
    width: "8px",
    height: "8px",
    backgroundColor: "#f44336",
    borderRadius: "50%",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "18px",
  },
};
