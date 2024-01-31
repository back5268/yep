import axios from 'axios'

export const clientApi = axios.create({
    baseURL: 'https://service.s-tech.info',
    // baseURL: 'http://localhost:5000',
    timeout: 10000,
});

function getRandomNumber() {
    const characters = '0123456789';
    let result = '';
  
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    localStorage.setItem('clientId',result)
    return result;
  }
  
clientApi.interceptors.request.use(
    (config) => {
        const clientId = localStorage.getItem('clientId')
        config.headers['clientId'] = clientId || getRandomNumber();
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

clientApi.interceptors.response.use(
    async function (res) {
        return res.data
    },
    async function (error) {

    },
)
