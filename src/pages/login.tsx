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
  password: yup.string().min(6, "Senha deve ter pelo menos 6 caracteres")
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
    <div className='flex flex-row justify-center bg-blue-500 h-full w-full items-center p-8'>
      <div className="flex bg-white p-8 w-100 h-150 items-center justify-center rounded-tl-2xl rounded-bl-2xl">
        <p>Cadastro</p>
        { error?.message && <ErrorComponent message={error?.message}/> }
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2 bg-green-700 justify-center items-center p-8 h-150 w-100 rounded-tr-2xl rounded-br-2xl'>

          <div className='flex flex-col justify-center items-center h-[220px] overflow-auto gap-2'>
            <label htmlFor="email">Email</label>
            <input {...register('email', {required: true})} placeholder='Digite...' className="w-48 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              type="text" />
            {errors.email && <span className='text-red-500'>{errors.email.message}</span>}

            <label htmlFor="password">Senha</label>
            <input {...register('password', { required: true})} placeholder='Digite...' className="w-48 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              type="password" name="password" id="password" />
              {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
          </div>
          <div className='flex flex-row gap-2 mt-8'>
            <div>
              <button type="submit" className='cursor-pointer font-extrabold rounded-2xl text-white bg-blue-950 p-4'>Login</button>
            </div>
            <div>
              <Link to="/cadastrar">
                <button className='cursor-pointer font-extrabold rounded-2xl text-white bg-blue-950 p-4'>Cadastrar</button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}


export default Login
