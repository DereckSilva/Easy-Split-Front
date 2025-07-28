import { Navigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/store";

export default function User() {
  const { id } = useParams();
  const isAuthenticated = useAuthStore((state) => (state.isAuthenticated));

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <p>Teste {id}</p>
    </div>
  )
}