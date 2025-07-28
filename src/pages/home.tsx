import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/store"

export default function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;

  }

  return (
    <div>
      <p>Home</p>
    </div>
  )
}