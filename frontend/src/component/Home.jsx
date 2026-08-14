// src/component/Home.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";

function slowFunction(num) {
  // Simulate a slow calculation
  for (let i = 0; i <= 100000000; i++) {}
  return num * 2;
}

function Home() {
  // 🔹 Input tracking with previous value
  const [text, setText] = useState("");
  const previousText = useRef("");

  useEffect(() => {
    previousText.current = text;
  }, [text]);

  // 🔹 API fetch
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCountRef = useRef(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        setPosts(data);
        fetchCountRef.current += 1;
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 🔹 useMemo demo
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  const styling = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
      padding: "10px",
      marginTop: "20px",
    };
  }, [dark]);

  return (
    <div>
     <h2 style={{ color: "black" }}>Welcome to Home Page</h2>


      {/* Input box with current + previous value */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
      <h3>Current value: {text}</h3>
      <h3>Previous value: {previousText.current}</h3>

      <hr />

      {/* API section */}
      <h3>Posts from API</h3>
      <p>API called {fetchCountRef.current} time(s)</p>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.slice(0, 5).map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      <hr />

      {/* useMemo section */}
      <div style={styling}>
        <button onClick={() => setDark((prevDark) => !prevDark)}>
          Toggle Theme
        </button>
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
        />
        <h3>Number: {number}</h3>
        <h3>Double (memoized): {doubleNumber}</h3>
      </div>
    </div>
  );
}

export default Home;
