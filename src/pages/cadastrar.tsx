import { yupResolver } from "@hookform/resolvers/yup";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { cadastrar } from "../services/user";
import LoadingComponent from "../components/loading";
import { Link } from "react-router-dom";
import { useCreatedUserMessageStore } from "../store/userStore";
const queryClient = new QueryClient();

const schema = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().min(8, "Senha deve ter pelo menos 8 caracteres")
  .max(16, "Senha deve ter no máximo 16 caracteres")
  .matches(/[A-Za-z]/, "Senha deve conter pelo menos uma letra")
  .matches(/[0-9]/, "Senha deve conter pelo menos um número")
  .matches(/[^A-Za-z0-9]/, "Senha deve conter pelo menos um símbolo")
  .required("Senha é obrigatória"),
  name: yup.string().min(8, "O nome do usuário deve conter no mínimo 8 caracteres").max(16, 'O nome do usuário deve conter no máximo 16 caracteres').required("Nome é obrigatório"),
  birthdate: yup.date().typeError("Data Inválida").required('Data de nascimento é obrigatória').max(new Date(), "Data não pode ser futura").default(new Date()),
  role: yup.string().oneOf(["ADMIN", "USER"], "Função deve ser ADMINITRADOR ou USUÁRIO")
    .required("Função é obrigatória"),
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
  const birthdate = useCreatedUserMessageStore((state) => state.birthdate)
  const setBirthdate = useCreatedUserMessageStore((state) => state.setBirthdate)
  const name = useCreatedUserMessageStore((state) => state.name)
  const setName = useCreatedUserMessageStore((state) => state.setName)
  const email = useCreatedUserMessageStore((state) => state.email)
  const setEmail = useCreatedUserMessageStore((state) => state.setEmail)
  const password = useCreatedUserMessageStore((state) => state.password)
  const setPassword = useCreatedUserMessageStore((state) => state.setPassword)
  const role = useCreatedUserMessageStore((state) => state.role)
  const setRole = useCreatedUserMessageStore((state) => state.setRole)
  const error = useCreatedUserMessageStore((state) => state.error)
  const setError = useCreatedUserMessageStore((state) => state.setError)
  const message = useCreatedUserMessageStore((state) => state.message)
  const setMessage = useCreatedUserMessageStore((state) => state.setMessage)
  const setInitializeAttributes = useCreatedUserMessageStore((state) => state.setInitializeAttributes)

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: FormData) => cadastrar(data.email, data.password, data.name, data.birthdate, data.role) ,
    onSuccess: (data) => {
      if (data.status == 400) {
        setError(true)
        setBirthdate(data.data.birthdate)
        setName(data.data.name)
        setEmail(data.data.email)
        setPassword(data.data.password)
        setRole(data.data.role)
        setMessage(data.data.message)
      }
      if (data.status == 201) {
        setInitializeAttributes()
      }
    },
  })

  if (isPending) {
    return <LoadingComponent />;
  }

  const handleRegister = async(data: FormData) => {
    mutate(data)
  }

 return (
  <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center p-4">
    <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Crie sua conta</h2>
          <p className="text-gray-600 text-center leading-relax max-width-md">
            Junte-se à nossa plataforma e organize suas contas de forma mais eficiente e produtiva.
          </p>
        </div>
      </div>

      <div className="lg:w-1/2 p-8">
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Cadastro</h1>
            <p className="text-gray-600 mt-2">Preencha os dados abaixo para criar sua conta</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input 
                placeholder="Digite seu nome completo" 
                className={`w-full border rounded-lg px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                type="text" 
                {...register('name')}
              />
              {(errors.name || name) && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name ? errors.name.message : name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input 
                placeholder="Digite seu email" 
                className={`w-full border rounded-lg px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                type="email" 
                {...register('email')}
              />
              {(errors.email || email) && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email ? errors.email.message : email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input 
                placeholder="Digite sua senha" 
                type="password" 
                className={`w-full border rounded-lg px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                {...register('password')}
              />
              {(errors.password || password) && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password ? errors.password.message : password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                Data de Nascimento
              </label>
              <input 
                type="date"
                className={`w-full border rounded-lg px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.birthdate ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                {...register('birthdate', { valueAsDate: true })}
              />
              {(errors.birthdate || birthdate) && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.birthdate ? errors.birthdate.message : birthdate}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Função
              </label>
              <select 
                className={`w-full border rounded-lg px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.role ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                {...register('role')}
              >
                <option value="">Selecione uma função</option>
                <option value="ADMIN">Administrador</option>
                <option value="USER">Usuário</option>
              </select>
            </div>
            {(errors.role || role) && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.role ? errors.role.message : role}
                </p>
              )}

              {message && (
                <p className="space-y-4 pt-4 text-sm text-red-600 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {message}
                </p>
              )}
          </div>
          
          <div className="space-y-4 pt-4">
            {isSuccess && !error ? (
                <div className="text-center">
                  <span className="text-purple-600 font-extrabold">Usuário cadastrado com sucesso! </span>
                  <Link 
                    to="/login"
                    className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200 underline underline-offset-2"
                  >
                    Entrar
                  </Link>
                </div>
            ) : 
              (
                <>
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transform hover:shadow-xl hover:-translate-y-0.5 disabled:transform-none disabled:shadow-lg"
                  >
                      Criar Conta
                  </button>
                  
                  <div className="text-center">
                    <span className="text-gray-600">Já possui uma conta? </span>
                    <Link 
                      to="/login" 
                      className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200 underline underline-offset-2"
                    >
                      Entre aqui
                    </Link>
                  </div>
                </>
              )
            }

          </div>
        </form>
      </div>
    </div>
  </div>
 )  
}

export default RealizaCadastro;