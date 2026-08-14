// src/component/Cart.jsx
function Cart({ value, setValue }) {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ color: "blue" }}>Cart Page</h1>
      <p>Your current counter value is:</p>
      <h2 style={{ color: "black" }}>{value}</h2>

      {/* Add the same buttons here */}
      <div>
        <button style={{ margin: "50px" }} onClick={() => setValue(value + 1)}>+</button>
        <button style={{ margin: "50px" }} onClick={() => setValue(value - 1)}>-</button>
        <button style={{ margin: "50px" }} onDoubleClick={() => setValue(0)}>Reset</button>
      </div>
    </div>
  );
}

export default Cart;
