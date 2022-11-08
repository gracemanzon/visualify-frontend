import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
// import { SnapshotShow } from "./SnapshotShow";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
