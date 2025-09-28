import '../App.css'
import auth from '../services/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import ErrorComponent from '../components/error';
import { useAuthStore } from '../store/store';
import { Link, useNavigate } from 'react-router-dom';
import LoadingComponent from '../components/loading';

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(8, "Senha deve ter pelo menos 8 caracteres")
    .matches(/[A-Za-z]/, "Senha deve conter pelo menos uma letra")
    .matches(/[0-9]/, "Senha deve conter pelo menos um número")
    .matches(/[^A-Za-z0-9]/, "Senha deve conter pelo menos um símbolo")
    .required("Senha é obrigatória")
})

type FormData = {
  email: string;
  password: string;
}

const queryClient = new QueryClient();

function Login() {
  return (
    <QueryClientProvider client={queryClient}>
      <User />
    </QueryClientProvider>
  )
}

function User() {
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)});
  const errorUser = useAuthStore((state) => state.errorUser);
  const error     = useAuthStore((state) => state.error);
  const login     = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => auth(data.email, data.password),
    onSuccess: (data) => {
      if (!data.status) {
        errorUser(data.message);
        return;
      }
      console.log('Usuário autenticado com sucesso:', data);

      // autentica o usuário
      login(data.data.user, data.data.token.split('|')[1])
      navigate('/')
    }, 
  })


  if (isPending) {
   return <LoadingComponent />;
  }

  const onSubmit = async(data: FormData) => {
    mutate(data);
  }


  return (
    <div className='flex flex-row justify-center bg-gradient-to-r from-blue-600 to-indigo-800 h-full w-full items-center p-8'>
      <div className="flex flex-col bg-white p-8 w-96 h-150 items-center justify-center rounded-tl-2xl rounded-bl-2xl shadow-lg">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo de volta!</h2>
          <p className="text-gray-600 text-center">Acesse sua conta para gerenciar suas contas e aumentar sua produtividade.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-96">
        <div className='flex flex-col gap-4 bg-white justify-center items-center p-8 h-150 w-full rounded-tr-2xl rounded-br-2xl shadow-lg'>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Login</h1>
          {error?.message && (
            <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              <p className="text-sm font-medium">{error.message}</p>
            </div>
          )}
          <div className='flex flex-col justify-center items-center w-full gap-4'>
            <div className="w-full relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                {...register('email', {required: true})} 
                placeholder='Digite seu email' 
                className={`w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                type="text" 
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
                {...register('password', { required: true})} 
                placeholder='Digite sua senha' 
                className={`w-full border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                type="password" 
                name="password" 
                id="password" 
              />
              {errors.password && (
                <div className="absolute -bottom-2 right-0 z-10 bg-red-50 border border-red-200 text-red-600 text-xs px-2 py-1 rounded shadow-md transform translate-y-full">
                  {errors.password.message}
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col w-full gap-3 mt-6'>
            <button 
              type="submit" 
              className='w-full cursor-pointer font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors py-3 px-4 shadow-md'
            >
              Entrar
            </button>
            <div className="text-center mt-2">
              <span className="text-gray-600">Não tem uma conta? </span>
              <Link to="/cadastrar" className="text-blue-600 hover:text-blue-800 font-medium">
                Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}


export default Login
