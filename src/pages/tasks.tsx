import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/store";

export default function Tasks() {
  const { id } = useParams();
  const isAuthenticated = useAuthStore((state) => (state.isAuthenticated))
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!id && <p>Todas as tasks</p>}
      {id && <p>Task específica com ID: {id}</p>}
      <Link to="/">
        <button className="cursor-pointer bg-blue-600 text-white font-extrabold p-4 rounded-2xl">Voltar para Home</button>
      </Link>
    </div>
  )


}