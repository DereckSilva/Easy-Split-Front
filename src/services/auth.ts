import api from "./api";

export default async function auth (email: string, senha: string) {
  const login = await api.post('/auth/login', {'email': email, 'password': senha}, 
    {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then((result) => {
      return result.data
    })
    .catch((result) => {
      return result.response.status != 403 ? result.response : { message: 'Erro de autenticação. E-mail ou senha incorretos.', status: result.response.status };
    })
    .finally(() => {
      console.log('Requisição finalizada')
    });

  return login;
}
