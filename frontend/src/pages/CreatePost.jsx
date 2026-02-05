import React, { useState } from 'react';
import { api } from '../services/api';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handlePost = async (e) => {
        e.preventDefault();
        await api.createPost({ content, image });
        // Handle successful post creation (e.g., refresh feed)
    };

    return (
        <form onSubmit={handlePost}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write something..." />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;