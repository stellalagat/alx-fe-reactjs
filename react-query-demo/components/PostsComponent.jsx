// src/components/PostsComponent.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return data;
};

const PostsComponent = () => {
  // useQuery handles fetching, caching, refetching, and error states automatically
  const {
    data: posts,
    error,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"], // cache key
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes (data stays fresh)
    cacheTime: 1000 * 60 * 10, // 10 minutes (kept in cache)
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div style={styles.container}>
      <button onClick={() => refetch()} style={styles.button}>
        🔄 Refetch Posts
      </button>
      {isFetching && <p>Refreshing data...</p>}

      <ul style={styles.list}>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id} style={styles.card}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    listStyle: "none",
    padding: 0,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
};

export default PostsComponent;
