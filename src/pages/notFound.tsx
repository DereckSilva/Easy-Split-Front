import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <p>Página não encontrada</p>
      <Link to="/">
        <button>Login</button>
      </Link>
    </div>
  )
}