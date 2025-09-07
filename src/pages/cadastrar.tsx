import { yupResolver } from "@hookform/resolvers/yup";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { cadastrar } from "../services/user";
import ErrorComponent from "../components/error";
import LoadingComponent from "../components/loading";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
const queryClient = new QueryClient();

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().min(6, "Senha deve ter pelo menos 6 caracteres")
  .matches(/[A-Za-z]/, "Senha deve conter pelo menos uma letra")
  .matches(/[0-9]/, "Senha deve conter pelo menos um número")
  .matches(/[^A-Za-z0-9]/, "Senha deve conter pelo menos um símbolo")
  .required("Senha é obrigatória"),
  name: yup.string().min(6, "O nome do usuário deve conter no mínimo 5 caracteres").max(15, 'O nome do usuário deve conter no máximo 15 caracteres').required("Nome é obrigatório"),
});

type FormData = {
  email: string;
  password: string;
  name: string;
}

function RealizaCadastro () {

  return (
    <QueryClientProvider client={queryClient}>
      <Cadastrar />
    </QueryClientProvider>
  )

}

function Cadastrar() {

  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)})
  const navigate = useNavigate();
  const errorUser = useAuthStore((state) => state.errorUser);
  const error     = useAuthStore((state) => state.error);
  const data      = useAuthStore((state) => state.data);
  const dataError = useAuthStore((state) => state.dataError)

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => cadastrar(data.email, data.password, data.name) ,
    onSuccess: (data) => {
      if (data.status == 400) {
        errorUser(data.data.message)
        dataError(data.data.data.email)
        return 
      }
      console.log('Usuário cadastrado com sucesso:', data);

      navigate('/login')
    }
  })

  if (isPending) {
    return <LoadingComponent />;
  }

  const handleRegister = async(data: FormData) => {
    mutate(data)
  }

 return (
  <div className="flex flex-row items-center justify-center h-full bg-fuchsia-900 ">
    <div className="flex justify-center items-center p-8 bg-white rounded-tl-4xl rounded-bl-4xl h-150 w-100">
      Cadastrar usuario
    { error?.message && <ErrorComponent message={error?.message}  data={data?.message}/> }
    </div>
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="flex flex-col justify-center items-center bg-amber-400 h-150 w-150 p-6 rounded-tr-4xl rounded-br-4xl gap-2">
        <div className="flex relative w-full">
          <span className="absolute right-12 bottom-10">Já possui uma conta?</span>
          <Link to="/login" className="absolute right-0 bottom-10 font-extrabold text-blue-900">
            Login
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 h-[420px] overflow-auto"> 
          <label htmlFor="email">Nome</label>
          <input placeholder="Digite..." className="w-48 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" { ...register('name') }/>
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}

          <label htmlFor="email">Email</label>
          <input placeholder="Digite..." className="w-48 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" { ...register('email') }/>
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          <label htmlFor="email">Senha</label>
          <input placeholder="Digite..." type="password" className="w-48 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" { ...register('password') }/>
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          <div className="flex flex-row gap-2">
            <button type="submit" className="cursor-pointer bg-blue-600 text-white font-extrabold p-4 rounded-2xl">Cadastrar</button>
          </div>
        </div>
      </div>
    </form>
  </div>
 )  
}

export default RealizaCadastro;