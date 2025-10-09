// src/App.jsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsComponent from "./components/PostsComponent";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={styles.container}>
        <h1 style={styles.heading}>React Query Demo - Posts</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "40px",
    textAlign: "center",
  },
  heading: {
    color: "#2c3e50",
  },
};

export default App;
