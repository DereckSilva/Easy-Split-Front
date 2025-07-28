import api from "./api";

export default async function auth (email: string, senha: string) {
  const login = await api.post('/login', {email, senha}, 
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
      return result.response ? result.response.data : { message: 'Erro de autenticação' };
    })
    .finally(() => {
      console.log('Requisição finalizada')
    });

  return login;
}