import { Link } from "react-router-dom";
import { useAuthStore } from "../store/store";

export default function LogoutComponent() {
  const logout = useAuthStore((state) => state.logout)

  function logoutUser() {
    logout()
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-700/20 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center w-[30rem] rounded-2xl p-8 bg-white shadow-xl border border-gray-200">
        <div className="mb-6 text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Deseja sair?</h1>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Você será redirecionado para a tela de login.
        </p>
        <div className="mt-6 flex gap-4">
          <Link to="/login">
            <button onClick={logoutUser} className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg">
              Confirmar saída
            </button>
          </Link>
          <Link to="/home">
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300 shadow-md hover:shadow-lg">
              Cancelar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}