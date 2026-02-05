import { useEffect, useState } from "react";
import { API } from "../services/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(Array.isArray(res.data) ? res.data : res.data.posts || []);
    } catch (err) {
      console.error("Failed to fetch posts", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div style={styles.loading}>Loading feed...</div>;

  return (
    <div style={styles.container}>
      {/* Search Bar */}
      <div style={styles.searchSection}>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search promotions, users, posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.searchBtn}>🔍</button>
        </div>
        <div style={styles.searchAvatar}>
          {JSON.parse(localStorage.getItem("user") || "{}")?.username?.[0]?.toUpperCase() || "👤"}
        </div>
      </div>

      {/* Create Post Header */}
      <div style={styles.createPostHeader}>
        <h2 style={styles.createPostTitle}>Create Post</h2>
        <div style={styles.tabs}>
          <button style={styles.tabActive}>All Posts</button>
          <button style={styles.tab}>Promotions</button>
        </div>
      </div>

      {/* Create Post Component */}
      <CreatePost refresh={fetchPosts} />

      {/* Filter Tabs */}
      <div style={styles.filterTabs}>
        <button 
          style={filter === "all" ? styles.filterActive : styles.filter}
          onClick={() => setFilter("all")}
        >
          All Post
        </button>
        <button 
          style={filter === "liked" ? styles.filterActive : styles.filter}
          onClick={() => setFilter("liked")}
        >
          Most Liked
        </button>
        <button 
          style={filter === "commented" ? styles.filterActive : styles.filter}
          onClick={() => setFilter("commented")}
        >
          Most Commented
        </button>
        <button 
          style={filter === "shared" ? styles.filterActive : styles.filter}
          onClick={() => setFilter("shared")}
        >
          Most Shared
        </button>
      </div>

      {/* Posts */}
      <div style={styles.postsContainer}>
        {posts.length === 0 && (
          <p style={styles.noPosts}>No posts yet</p>
        )}

        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            refresh={fetchPosts}
          />
        ))}
      </div>

      {/* Floating Action Button */}
      <button style={styles.fab}>+</button>

      {/* Bottom Navigation */}
      <div style={styles.bottomNav}>
        <button style={styles.navItem}>🏠</button>
        <button style={styles.navItem}>📋</button>
        <button style={styles.navItemActive}>
          <div style={styles.socialIcon}>👥</div>
          <span style={styles.navLabel}>Social</span>
        </button>
        <button style={styles.navItem}>🎮</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    paddingBottom: "80px",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "16px",
    color: "#65676b",
  },
  searchSection: {
    display: "flex",
    gap: "12px",
    padding: "16px 20px",
    backgroundColor: "white",
  },
  searchBar: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    borderRadius: "24px",
    padding: "0 16px",
  },
  searchInput: {
    flex: 1,
    border: "none",
    backgroundColor: "transparent",
    padding: "10px 0",
    fontSize: "14px",
    outline: "none",
  },
  searchBtn: {
    background: "#007AFF",
    border: "none",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  searchAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: 600,
    fontSize: "18px",
  },
  createPostHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    backgroundColor: "white",
    marginTop: "1px",
  },
  createPostTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 600,
    color: "#1c1e21",
  },
  tabs: {
    display: "flex",
    gap: "8px",
  },
  tabActive: {
    padding: "8px 20px",
    backgroundColor: "#007AFF",
    color: "white",
    borderRadius: "24px",
    fontSize: "14px",
    fontWeight: 500,
  },
  tab: {
    padding: "8px 20px",
    backgroundColor: "#e4e6eb",
    color: "#65676b",
    borderRadius: "24px",
    fontSize: "14px",
    fontWeight: 500,
  },
  filterTabs: {
    display: "flex",
    gap: "8px",
    padding: "16px 20px",
    backgroundColor: "#f0f2f5",
    overflowX: "auto",
  },
  filterActive: {
    padding: "10px 20px",
    backgroundColor: "#007AFF",
    color: "white",
    borderRadius: "24px",
    fontSize: "14px",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  filter: {
    padding: "10px 20px",
    backgroundColor: "white",
    color: "#65676b",
    borderRadius: "24px",
    fontSize: "14px",
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  postsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  noPosts: {
    textAlign: "center",
    padding: "40px 20px",
    color: "#65676b",
    fontSize: "15px",
  },
  fab: {
    position: "fixed",
    bottom: "100px",
    right: "20px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "#007AFF",
    color: "white",
    fontSize: "32px",
    border: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "64px",
    backgroundColor: "#007AFF",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
    zIndex: 100,
  },
  navItem: {
    background: "transparent",
    border: "none",
    fontSize: "24px",
    color: "white",
    opacity: 0.7,
    cursor: "pointer",
    padding: "8px",
  },
  navItemActive: {
    background: "white",
    border: "none",
    borderRadius: "50%",
    width: "56px",
    height: "56px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginTop: "-32px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  socialIcon: {
    fontSize: "20px",
  },
  navLabel: {
    fontSize: "10px",
    color: "#007AFF",
    fontWeight: 600,
    marginTop: "2px",
  },
};
