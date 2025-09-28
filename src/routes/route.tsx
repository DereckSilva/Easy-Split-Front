import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../components/notFound";
import User from "../pages/user";
import RealizaCadastro from "../pages/cadastrar";
import Login from "../pages/login";

export const router = createBrowserRouter([
  {path:'/', element: <Home />},
  {path: "/login", element: <Login />},
  {path: '/cadastrar', element: <RealizaCadastro />},
  {path:'/user/:id', element: <User />},
  {path: '*', element: <NotFound />},
])