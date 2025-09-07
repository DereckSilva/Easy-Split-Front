type Props = {
  message?: string;
  data?: string
}

export default function ErrorComponent({ message, data }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30">
      <div className="flex flex-col items-center justify-center w-[40rem] rounded-2xl p-8 bg-red-100 shadow-lg">
        <h1 className="text-4xl font-bold text-red-900">Erro</h1>
        <p className="mt-4 text-lg text-red-900">
          Ocorreu um erro inesperado. {message}
        </p>
        {data && <span>Erro(s)</span>}
        { data &&
            <p>{data}</p>
        }
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Tentar novamente
        </button>
      </div>
    </div>

  );
}