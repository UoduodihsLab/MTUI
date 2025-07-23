import axios from 'axios'

const http = axios.create({
    baseURL: 'http://127.0.0.1:8443',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

http.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
)

export const api = {
    get(url, config) {
        return http.get(url, config)
    },
    post(url, data, config) {
        return http.post(url, data, config)
    },
    put(url, data, config) {
        return http.put(url, data, config)
    },
    delete(url, config) {
        return http.delete(url, config)
    }
}


export default api
