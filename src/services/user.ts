import api from "./api";

export async function getUser(id: number) {
  const user = await api.get(`/user/${id}`)
    .then((result) => {
      return result.data
    })
    .catch((result) => {
      return result
    })
    .finally(() => {
      console.log('Requisição finalizada')
    });

  return user;
}

export async function cadastrar (email: string, password: string, name: string, birthdate: Date, role: string) {
  const response = await api.post('/user/register/', { email, password, name, birthdate, role}, 
    { headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }}
  ).then((result) => {
    return result.data;
  }).catch((result) => {
    return result.response;
  }).finally(() => {
    console.log('Requisição de cadastro finalizada');
  })
  return response;
}