import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ArtistsNew } from "./ArtistsNew";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { SnapshotShow } from "./SnapshotShow";
import { SongsNew } from "./SongsNew";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/artists" element={<ArtistsNew />} />
        <Route path="/songs" element={<SongsNew />} />
        <Route path="/snapshots/:id" element={<SnapshotShow />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
