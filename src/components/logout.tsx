import { Link } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { useMutation } from "@tanstack/react-query";
import LoadingComponent from "./loading";
import { userLogout } from "../services/auth";

export default function LogoutComponent() {
  const logout = useAuthStore((state) => state.logout)
  const token = useAuthStore((state) => state.token)

  const { mutate, isPending } = useMutation({
    mutationFn: () => userLogout(token),
    onSuccess: (() => {
      logout()
    })
  })

  if (isPending) {
    return <LoadingComponent />
  }

  function logoutUser() {
    mutate()
  }
  
  return (
    <div>
      <Link to="/login">
        <button onClick={logoutUser} className='cursor-pointer font-extrabold rounded-2xl text-white bg-blue-950 p-4'>Sair</button>
      </Link>
    </div>
  )
}