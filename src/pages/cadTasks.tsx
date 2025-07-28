import { yupResolver } from "@hookform/resolvers/yup";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import ErrorComponent from "../components/error";
import { useAuthStore } from "../store/store";
import { cadTask } from "../services/tasks";
import { Navigate } from "react-router-dom";

const schema = yup.object({
  title: yup.string().min(5, 'O título precisa ter no mínimo 6 caracteres').required('Insira um título para a sua tarefa.'),
  description: yup.string().min(10, 'A descrição precisa ter no mínimo 10 caracteres').required('Insira uma breve descrição sobre a sua tarefa.')
});

type FormData = {
  title: string,
  description: string,
}

const queryClient = new QueryClient();

function CadTasks() {
  return (
    <QueryClientProvider client={queryClient}>
      <Task />
    </QueryClientProvider>
  );
}


function Task() {
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)});
  const token = useAuthStore((state) => state.token)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => cadTask(data.title, data.description, token),
    onSuccess: (data) => {
      if (!data.status) {
        return <ErrorComponent />
      }
      console.log('Cadastro de tarefa efetuado com sucesso');
    }
  })

  if (!isAuthenticated) {
        return <Navigate to="/login" />;
  }

  if (isPending) {
    return <div>Carregando...</div>
  }

  const onSubmit = async(data: FormData) => {
    mutate(data)
  }

  return (
    <div className="flex justify-center items-centerh-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Título</label>
        <input type="text" {...register('title')}/>
        {errors.title &&  <span className="text-red-500">{errors.title.message}</span>}
        
        <label htmlFor="description">Descrição</label>
        <input type="text" {...register('description')} />
        {errors.description &&  <span className="text-red-500">{errors.description.message}</span>}

        <button type="submit" className="p-4 bg-blue-700 text-white font-extrabold">Cadastrar</button>
      </form>
    </div>
  )
}


export default CadTasks;