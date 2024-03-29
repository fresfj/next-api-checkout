import axios from 'axios'
const access_token = `$aact_${process.env.NEXT_PUBLIC_TOKEN_ASAAS}==`
const baseURL = process.env.NEXT_PUBLIC_API_URL,
  isServer = typeof window === 'undefined'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    access_token
  },
  withCredentials: true
})

api.interceptors.request.use(async config => {
  if (isServer) {
    const { cookies } = await import('next/headers'),
      token = cookies().get('token')?.value

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  } else {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    )

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }

  return config
})

export default api
