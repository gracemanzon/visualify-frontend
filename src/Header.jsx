import { Logout } from "./Logout";

export function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <img src="/src/assets/Spotify_Logo_RGB_Green.png" alt="spotify logo" />
          <h2>Visualify Dashboard</h2>
        </div>
        <button className="custom-btn-3">
          <Logout />
        </button>
      </nav>
    </header>
  );
}
