import { useMemo, useState } from "react";

function slowFunction(num) {
  // Simulate a slow calculation
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2;
}

const UseMemo = () => {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  // Memoize the slow calculation
  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  // Memoize the style object
  const styling = useMemo(() => {
    return {
      backgroundColor: dark ? "black" : "white",
      color: dark ? "white" : "black",
    };
  }, [dark]);

  return (
    <div>
      <button onClick={() => setDark((prevDark) => !prevDark)}>
        Toggle Theme
      </button>
      <div style={styling}>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <h1>Number: {number}</h1>
      <h2>Double: {doubleNumber}</h2>
      </div>
    </div>
  );
}
export default UseMemo; 

