import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ArtistsNew } from "./ArtistsNew";
import { Footer } from "./Footer";
import { GenresNew } from "./GenresNew";
import { Header } from "./Header";
import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { SnapshotShow } from "./SnapshotShow";
import { SongsNew } from "./SongsNew";
import { UserShow } from "./UserShow";

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
        <Route path="/genres" element={<GenresNew />} />
        <Route path="/snapshots/:id" element={<SnapshotShow />} />
        <Route path="/users/:id" element={<UserShow />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
