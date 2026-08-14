import React, { useState, useEffect } from "react";

function Example() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // This runs after the component mounts
    setMessage("Hello from useEffect!");
  }, []); // Empty array means it runs only once

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default Example;


