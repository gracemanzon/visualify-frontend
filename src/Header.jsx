import { Logout } from "./Logout";

export function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <a href="https://open.spotify.com/" target="blank">
            <img src="/src/assets/Spotify_Icon_RGB_Green.png" />
          </a>
          <h3>Visualify Dashboard</h3>
        </div>
        <div className="logo-btn">
          <button className="custom-btn-2">
            <Logout />
          </button>
        </div>
      </nav>
    </header>
  );
}
