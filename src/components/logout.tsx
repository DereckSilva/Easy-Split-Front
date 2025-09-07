import { Link } from "react-router-dom";
import { useAuthStore } from "../store/store";

export default function LogoutComponent() {
  const logout = useAuthStore((state) => state.logout)

  function logoutUser() {
    return logout();
  }
  
  return (
    <div>
      <Link to="/login">
        <button onClick={logoutUser} className='cursor-pointer font-extrabold rounded-2xl text-white bg-blue-950 p-4'>Sair</button>
      </Link>
    </div>
  )
}