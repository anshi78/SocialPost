import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api";
import PostCard from "../components/PostCard";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserPosts = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await API.get("/posts");
      const allPosts = Array.isArray(res.data) ? res.data : res.data.posts || [];
      const filtered = allPosts.filter(post => post.username === user.username);
      setUserPosts(filtered);
    } catch (err) {
      console.error("Failed to fetch posts", err);
      setUserPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div style={styles.container}>
      {/* Profile Header */}
      <div style={styles.header}>
        <div style={styles.coverPhoto}></div>
        
        <div style={styles.profileInfo}>
          <div style={styles.avatarContainer}>
            <div style={styles.avatar}>
              {user.username[0].toUpperCase()}
            </div>
          </div>
          
          <div style={styles.userDetails}>
            <h1 style={styles.username}>{user.username}</h1>
            <p style={styles.handle}>@{user.username.toLowerCase()}</p>
            <p style={styles.email}>{user.email}</p>
          </div>

          <div style={styles.stats}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{userPosts.length}</div>
              <div style={styles.statLabel}>Posts</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>0</div>
              <div style={styles.statLabel}>Followers</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>0</div>
              <div style={styles.statLabel}>Following</div>
            </div>
          </div>

          <div style={styles.actions}>
            <button style={styles.editBtn} onClick={() => navigate("/")}>
              Back to Feed
            </button>
            <button style={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div style={styles.postsSection}>
        <h2 style={styles.postsTitle}>My Posts</h2>
        {loading && <p style={styles.loading}>Loading posts...</p>}
        
        {!loading && userPosts.length === 0 && (
          <p style={styles.noPosts}>You haven't posted anything yet</p>
        )}
        
        {!loading && userPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            refresh={fetchUserPosts}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
    paddingBottom: "40px",
  },
  header: {
    backgroundColor: "white",
    marginBottom: "16px",
  },
  coverPhoto: {
    height: "200px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  profileInfo: {
    padding: "0 20px 24px",
    position: "relative",
  },
  avatarContainer: {
    marginTop: "-60px",
    marginBottom: "16px",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "5px solid white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "48px",
    fontWeight: 700,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  userDetails: {
    marginBottom: "20px",
  },
  username: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#1c1e21",
    margin: "0 0 4px 0",
  },
  handle: {
    fontSize: "16px",
    color: "#65676b",
    margin: "0 0 8px 0",
  },
  email: {
    fontSize: "14px",
    color: "#8a8d91",
    margin: 0,
  },
  stats: {
    display: "flex",
    gap: "32px",
    padding: "20px 0",
    borderTop: "1px solid #e4e6eb",
    borderBottom: "1px solid #e4e6eb",
    marginBottom: "20px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#1c1e21",
  },
  statLabel: {
    fontSize: "14px",
    color: "#65676b",
    marginTop: "4px",
  },
  actions: {
    display: "flex",
    gap: "12px",
  },
  editBtn: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#007AFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  },
  logoutBtn: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
  },
  postsSection: {
    backgroundColor: "white",
    padding: "20px",
  },
  postsTitle: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#1c1e21",
    marginBottom: "16px",
  },
  loading: {
    textAlign: "center",
    color: "#65676b",
    padding: "40px 0",
  },
  noPosts: {
    textAlign: "center",
    color: "#65676b",
    padding: "40px 0",
  },
};
