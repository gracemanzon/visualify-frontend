import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/signup">signup</Link>
        <Link to="/login">login</Link>
      </nav>
    </header>
  );
}
