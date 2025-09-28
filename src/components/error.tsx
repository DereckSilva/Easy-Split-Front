type Props = {
  message?: string;
  data?: string
}

export default function ErrorComponent({ message, data }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-red-500/20 to-red-700/20 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center w-[40rem] rounded-2xl p-8 bg-white shadow-xl border border-red-200">
        <div className="mb-6 text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-red-600">Erro</h1>
        <p className="mt-4 text-lg text-gray-700 text-center">
          Ocorreu um erro inesperado. {message}
        </p>
        {data && <span className="mt-2 font-semibold text-red-600">Detalhes do erro:</span>}
        {data && <p className="mt-1 text-gray-700 p-2 bg-red-50 rounded-md border border-red-100">{data}</p>}
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}