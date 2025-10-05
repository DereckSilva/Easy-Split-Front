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
  const login     = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => auth(data.email, data.password),
    onSuccess: (data) => {
      if (!data.status) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Desktop Layout */}
          <div className="hidden lg:flex">
            <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 p-12 flex flex-col items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-8 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Bem-vindo de volta!</h2>
              <p className="text-gray-600 text-center max-w-sm leading-relaxed">
                Acesse sua conta para gerenciar suas tarefas e aumentar sua produtividade.
              </p>
            </div>
            <div className="flex-1 p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
                  <p className="text-gray-500">Digite suas credenciais para acessar</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      {...register('email', {required: true})} 
                      placeholder='Digite seu email' 
                      className={`w-full border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      type="email" 
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                    <input 
                      {...register('password', { required: true})} 
                      placeholder='Digite sua senha' 
                      className={`w-full border ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                      type="password" 
                      id="password" 
                    />
                    {errors.password && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isPending}
                  className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg py-3 px-4 shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                >
                  {isPending ? 'Entrando...' : 'Entrar'}
                </button>

                <div className="text-center pt-4">
                  <span className="text-gray-600">Não tem uma conta? </span>
                  <Link to="/cadastrar" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    Cadastre-se
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Login</h1>
              <p className="text-gray-500">Bem-vindo de volta!</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <div className="space-y-4">
                <div>
                  <label htmlFor="email-mobile" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    {...register('email', {required: true})} 
                    placeholder='Digite seu email' 
                    className={`w-full border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    type="email" 
                    id="email-mobile"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password-mobile" className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                  <input 
                    {...register('password', { required: true})} 
                    placeholder='Digite sua senha' 
                    className={`w-full border ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
                    type="password" 
                    id="password-mobile"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg py-3 px-4 shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              >
                {isPending ? 'Entrando...' : 'Entrar'}
              </button>

              <div className="text-center pt-4">
                <span className="text-gray-600">Não tem uma conta? </span>
                <Link to="/cadastrar" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  Cadastre-se
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Login
