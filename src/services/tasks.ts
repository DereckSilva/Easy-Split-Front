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