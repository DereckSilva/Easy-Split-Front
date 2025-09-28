export default function LoadingComponent() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500/10 to-purple-700/10">
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 text-xl font-medium text-gray-700">Carregando...</p>
        <p className="mt-2 text-sm text-gray-500">Por favor, aguarde um momento</p>
      </div>
    </div>
  );
}