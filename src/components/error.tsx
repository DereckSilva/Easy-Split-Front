type Props = {
  message?: string;
}

export default function ErrorComponent({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <h1 className="text-4xl font-bold text-red-600">Erro</h1>
      <p className="mt-4 text-lg text-red-500">Ocorreu um erro inesperado. {message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Tentar novamente
      </button>
    </div>
  );
}