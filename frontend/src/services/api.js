import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// API calls for user authentication and post management

const api = {
    signup: async (userData) => {
        // Implement signup API call
    },
    login: async (userData) => {
        // Implement login API call
    },
    createPost: async (postData) => {
        // Implement create post API call
    },
    getPosts: async () => {
        // Implement fetch posts API call
    }
};

export { api };
