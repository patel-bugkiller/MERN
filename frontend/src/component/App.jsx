import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import Order from "./Order";
import UseEffectsAPI from "./useEffectsAPI";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import SignUp from "./signUp";
import { useState } from "react";
import "../css/App.css"; 

function App() {
  const [value, setValue] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/SignUp" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected routes */}
        <Route
          path="/about"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Cart value={value} setValue={setValue} />
            </ProtectedRoute>
          }
        />
        <Route path="/posts" element={<UseEffectsAPI />} />
        <Route
          path="/order"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Order value={value} setValue={setValue} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
