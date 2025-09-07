import api from "./api"

export async function cadTask(title: string, description: string, token: string | null) {

    const response = await api.post('/tasks', { title, description }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    return response
}

export async function allTasks(token: string | null) {
  const response = await api.get('/tasks', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }})
    .then((result) => {
      return result.data
    })
    .catch((result) => {
      return result.response.data
    })
    .finally(() => {
      console.log('Busca de tarefas finalizadas')
    })
  return response
}

export async function uniqueTask(id: number) {
    const response = await api.get('/tasks/'+id)
    .then((result) => {
      return result.data
    })
    .catch((result) => {
      return result.data
    })
    .finally(() => {
      console.log('Busca de tarefa finalizada')
    })
  return response
}
