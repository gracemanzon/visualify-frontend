import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ArtistsNew } from "./ArtistsNew";
import { GenresNew } from "./GenresNew";
import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { SnapshotShow } from "./SnapshotShow";
import { SongsNew } from "./SongsNew";
import { UserShow } from "./UserShow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/artists" element={<ArtistsNew />} />
        <Route path="/songs" element={<SongsNew />} />
        <Route path="/genres" element={<GenresNew />} />
        <Route path="/snapshots/:id" element={<SnapshotShow />} />
        <Route path="/users/:id" element={<UserShow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
