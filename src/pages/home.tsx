import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/store"
import LogoutComponent from "../components/logout";
import { QueryClientProvider, QueryClient, useQuery } from "@tanstack/react-query";
import { allTasks } from "../services/tasks";
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
  const tasks = useQuery({queryKey: ['tasks', token.token], queryFn: () => allTasks(token.token)})
  return (
    <>
    <div>
      {tasks.data.data.map((task: {id: number, title: string, description: string}) => (
        <li>{task.id} - {task.title} - {task.description}</li>
      ))}
    </div>
    <LogoutComponent />
    </>
  )
}


export default Home