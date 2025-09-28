import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/store"
import LogoutComponent from "../components/logout";
import { QueryClientProvider, QueryClient, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
const queryClient = new QueryClient();

function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const token           = useAuthStore((state) => state.token)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <QueryClientProvider client={queryClient}>
    <Tasks token={token}/>
    </QueryClientProvider>
}

function Tasks (token: {token: string | null}) {

  return (
    <>
      <LogoutComponent />
      <Link to={'cad/tasks'}>
        <button>cadastro de task</button>
      </Link>
    </>
  )
}


export default Home