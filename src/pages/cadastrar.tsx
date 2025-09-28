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
  birthdate: yup.date().required("Data de aniversário é obrigatória").max(new Date(), "Data não pode ser futura"),
  role: yup.string().oneOf(["ADMIN", "USER"], "Função deve ser ADMIN ou USER").required("Função é obrigatória"),
});

type FormData = {
  email: string;
  password: string;
  name: string;
  birthdate: Date;
  role: string;
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
    mutationFn: (data: FormData) => cadastrar(data.email, data.password, data.name, data.birthdate, data.role) ,
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
  <div className="flex flex-row items-center justify-center h-full bg-gradient-to-r from-purple-600 to-indigo-700">
    <div className="flex flex-col justify-center items-center p-8 bg-white rounded-tl-2xl rounded-bl-2xl h-150 w-96 shadow-lg">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Crie sua conta</h2>
        <p className="text-gray-600 text-center">Crie sua conta e organize suas finanças com mais eficiência.</p>
      </div>
    </div>
    <form onSubmit={handleSubmit(handleRegister)} className="w-96">
      <div className="flex flex-col justify-center items-center bg-white h-150 w-full p-8 rounded-tr-2xl rounded-br-2xl shadow-lg gap-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Cadastro</h1>
        {error?.message && (
          <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
            <p className="text-sm font-medium">{error.message}</p>
            {data?.message && (
              <p className="text-xs mt-1">{data.message}</p>
            )}
          </div>
        )}
        <div className="flex flex-col justify-center items-center w-full gap-3"> 
          <div className="w-full relative">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input 
              placeholder="Digite seu nome" 
              className={`w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              type="text" 
              { ...register('name') }
            />
            {errors.name && (
              <div className="absolute -bottom-2 right-0 z-10 bg-red-50 border border-red-200 text-red-600 text-xs px-2 py-1 rounded shadow-md transform translate-y-full">
                {errors.name.message}
              </div>
            )}
          </div>

          <div className="w-full relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              placeholder="Digite seu email" 
              className={`w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              type="text" 
              { ...register('email') }
            />
            {errors.email && (
              <div className="absolute -bottom-2 right-0 z-10 bg-red-50 border border-red-200 text-red-600 text-xs px-2 py-1 rounded shadow-md transform translate-y-full">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="w-full relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input 
              placeholder="Digite sua senha" 
              type="password" 
              className={`w-full border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              { ...register('password') }
            />
            {errors.password && (
              <div className="absolute -bottom-2 right-0 z-10 bg-red-50 border border-red-200 text-red-600 text-xs px-2 py-1 rounded shadow-md transform translate-y-full">
                {errors.password.message}
              </div>
            )}
          </div>

          <div className="w-full relative">
            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">Data de Aniversário</label>
            <input 
              type="date" 
              className={`w-full border ${errors.birthdate ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              { ...register('birthdate', { valueAsDate: true }) }
            />
            {errors.birthdate && (
              <div className="absolute -bottom-2 right-0 z-10 bg-red-50 border border-red-200 text-red-600 text-xs px-2 py-1 rounded shadow-md transform translate-y-full">
                {errors.birthdate.message}
              </div>
            )}
          </div>

          <div className="w-full relative">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Função</label>
            <select 
              className={`w-full border ${errors.role ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
              { ...register('role') }
            >
              <option value="">Selecione uma função</option>
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
            {errors.role && (
              <div className="absolute -bottom-2 right-0 z-10 bg-red-50 border border-red-200 text-red-600 text-xs px-2 py-1 rounded shadow-md transform translate-y-full">
                {errors.role.message}
              </div>
            )}
          </div>
          
          <div className="flex flex-col w-full gap-3 mt-4">
            <button 
              type="submit" 
              className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-3 px-4 rounded-lg shadow-md"
            >
              Criar conta
            </button>
            <div className="text-center mt-2">
              <span className="text-gray-600">Já possui uma conta? </span>
              <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
 )  
}

export default RealizaCadastro;