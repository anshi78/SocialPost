import { API } from "../services/api";
import CommentBox from "./CommentBox";

export default function PostCard({ post, refresh }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!post) return null;

  const like = async () => {
    if (!user) {
      alert("Please login to like");
      return;
    }

    try {
      await API.put(`/posts/${post._id}/like`, {
        username: user.username,
      });
      refresh();
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options).replace(',', '');
  };

  return (
    <div style={styles.card}>
      {/* Post Header */}
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>
            {post.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div style={styles.userDetails}>
            <div style={styles.username}>{post.username || "Unknown user"}</div>
            <div style={styles.handle}>@{post.username?.toLowerCase() || "unknown"}</div>
            <div style={styles.timestamp}>
              {formatDate(post.createdAt || new Date())}
            </div>
          </div>
        </div>
        <button style={styles.followBtn}>Follow</button>
      </div>

      {/* Post Content */}
      {post.text && <div style={styles.content}>{post.text}</div>}

      {/* Post Image */}
      {post.image && (
        <img src={post.image} alt="post" style={styles.image} />
      )}

      {/* Post Actions */}
      <div style={styles.actions}>
        <button onClick={like} style={styles.actionBtn}>
          ❤️ {post.likes?.length || 0}
        </button>
        <button style={styles.actionBtn}>
          💬 {post.comments?.length || 0}
        </button>
        <button style={styles.actionBtn}>
          🔄 Share
        </button>
      </div>

      {/* Comments Section */}
      <CommentBox
        postId={post._id}
        comments={post.comments || []}
        refresh={refresh}
      />
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    padding: "16px 20px",
    marginBottom: "8px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
  },
  userInfo: {
    display: "flex",
    gap: "12px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: 600,
    fontSize: "20px",
    flexShrink: 0,
  },
  userDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  username: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1c1e21",
  },
  handle: {
    fontSize: "14px",
    color: "#65676b",
  },
  timestamp: {
    fontSize: "12px",
    color: "#8a8d91",
  },
  followBtn: {
    backgroundColor: "#007AFF",
    color: "white",
    padding: "6px 20px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
  },
  content: {
    fontSize: "15px",
    lineHeight: "1.5",
    color: "#1c1e21",
    marginBottom: "12px",
    whiteSpace: "pre-wrap",
  },
  image: {
    width: "100%",
    borderRadius: "12px",
    marginBottom: "12px",
  },
  actions: {
    display: "flex",
    gap: "16px",
    paddingTop: "12px",
    borderTop: "1px solid #e4e6eb",
  },
  actionBtn: {
    background: "transparent",
    border: "none",
    fontSize: "14px",
    color: "#65676b",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    borderRadius: "8px",
    transition: "background 0.2s",
  },
};
