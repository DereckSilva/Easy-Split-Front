import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-700/20">
      <div className="flex flex-col items-center justify-center w-[40rem] rounded-2xl p-8 bg-white shadow-xl border border-gray-200">
        <div className="mb-6 text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Página não encontrada</h1>
        <p className="mt-4 text-lg text-gray-600 text-center">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Link to="/" className="mt-6">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg">
            Voltar para o Login
          </button>
        </Link>
      </div>
    </div>
  )
}