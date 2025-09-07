import api from "./api";

export default async function auth (email: string, senha: string) {
  const login = await api.post('/login', {'email': email, 'password': senha}, 
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

export async function userLogout(token: string | null) {
  // necessário email e senha
  const login = await api.post('/logout', 
    {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
  })
    .then((result) => {
      return result.data
    })
    .catch((result) => {
      return result.response.data
    })
    .finally(() => {
      console.log('Requisição finalizada')
    });

  return login;
}