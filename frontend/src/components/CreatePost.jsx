import { useState, useRef } from "react";
import { API } from "../services/api";

export default function CreatePost({ refresh }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  if (!user) {
    return (
      <div style={styles.card}>
        <p style={styles.loginMessage}>Please login to post</p>
      </div>
    );
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert to base64 for preview and upload
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage("");
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const createPost = async () => {
    if (!text.trim() && !image.trim()) {
      alert("Post cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await API.post("/posts", {
        userId: user.userId,
        username: user.username,
        text: text.trim(),
        image: image.trim(),
      });

      setText("");
      setImage("");
      setImagePreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      refresh();
    } catch (err) {
      console.error("Create post failed", err);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.textarea}
      />

      {/* Image Preview */}
      {imagePreview && (
        <div style={styles.imagePreviewContainer}>
          <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
          <button onClick={removeImage} style={styles.removeImageBtn}>✕</button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        style={styles.fileInput}
      />

      <div style={styles.actions}>
        <div style={styles.actionButtons}>
          <button 
            style={styles.actionBtn}
            onClick={() => fileInputRef.current?.click()}
            title="Add photo"
          >
            📷
          </button>
          <button style={styles.actionBtn} title="Add emoji">😊</button>
          <button style={styles.actionBtn} title="More options">☰</button>
          <button style={styles.promoteBtn}>📣 Promote</button>
        </div>

        <button
          onClick={createPost}
          style={loading ? styles.postBtnDisabled : styles.postBtn}
          disabled={loading}
        >
          ▶ {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    padding: "20px",
    marginBottom: "1px",
  },
  loginMessage: {
    textAlign: "center",
    color: "#65676b",
    margin: 0,
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    border: "none",
    resize: "none",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    marginBottom: "16px",
    color: "#1c1e21",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "12px",
    borderTop: "1px solid #e4e6eb",
  },
  actionButtons: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  actionBtn: {
    background: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    padding: "4px",
    opacity: 0.7,
    transition: "opacity 0.2s",
  },
  promoteBtn: {
    background: "transparent",
    border: "none",
    color: "#007AFF",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  postBtn: {
    backgroundColor: "#b0b3b8",
    color: "white",
    border: "none",
    padding: "8px 24px",
    cursor: "pointer",
    borderRadius: "24px",
    fontSize: "14px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  postBtnDisabled: {
    backgroundColor: "#e4e6eb",
    color: "#bcc0c4",
    border: "none",
    padding: "8px 24px",
    borderRadius: "24px",
    fontSize: "14px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "not-allowed",
  },
  fileInput: {
    display: "none",
  },
  imagePreviewContainer: {
    position: "relative",
    marginBottom: "12px",
  },
  imagePreview: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  removeImageBtn: {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};