import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import User from "../pages/user";
import Tasks from "../pages/tasks";
import RealizaCadastro from "../pages/cadastrar";
import CadTasks from "../pages/cadTasks";
import Login from "../pages/login";

export const router = createBrowserRouter([
  {path:'/', element: <Home />},
  {path: "/login", element: <Login />},
  {path: '/cadastrar', element: <RealizaCadastro />},
  {path:'/tasks', element: <Tasks />},
  {path:'/tasks/:id', element: <Tasks />},
  {path:'/cad/tasks', element: <CadTasks /> },
  {path:'/user/:id', element: <User />},
  {path: '*', element: <NotFound />},
])