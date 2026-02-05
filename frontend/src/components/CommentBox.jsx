import { useState } from "react";
import { API } from "../services/api";

export default function CommentBox({ postId, comments, refresh }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [text, setText] = useState("");

  const addComment = async () => {
    if (!user) {
      alert("Please login to comment");
      return;
    }

    if (!text.trim()) return;

    try {
      await API.post(`/posts/${postId}/comment`, {
        username: user.username,
        text: text.trim(),
      });

      setText("");
      refresh();
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  return (
    <div style={styles.box}>
      {comments.map((c, i) => (
        <p key={i}>
          <b>{c.username}:</b> {c.text}
        </p>
      ))}

      <div style={styles.inputRow}>
        <input
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />
        <button onClick={addComment} style={styles.btn}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  box: {
    marginTop: "10px",
  },
  inputRow: {
    display: "flex",
    gap: "6px",
    marginTop: "6px",
  },
  input: {
    flex: 1,
    padding: "6px",
  },
  btn: {
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
