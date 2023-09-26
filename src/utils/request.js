import axios from "axios"
import { ElMessage } from 'element-plus'
import router from "../router/index.js"
import useUserStore from "../store/modules/userStore.js"

const userStore = useUserStore();
const baseURL = 'http://localhost:8080'

const request = axios.create({
    baseURL,
    timeout: 3000
})

request.interceptors.request.use(
    (config) => {
        config.withCredentials = true
        config.headers['token'] = userStore.getToken()
        return config
    },
    (err) => Promise.reject(err)
)

request.interceptors.response.use(
    (res) => {
        // TODO 4. 不是json格式的数据，直接返回
        if (res.headers['content-type'] !== 'application/json') {
            return res
        }
        if (res.data.code === 0) {
            return res
        }
        // 处理业务失败
        ElMessage.error(res.data.message || '服务异常')
        return Promise.reject(res.data)
    },
    (err) => {
        if (err.response?.status === 401) {
            router.push('/login')
        }

        ElMessage.error(err.response.data.message || '服务异常')
        // TODO 5. 处理401错误
        return Promise.reject(err)
    }
)

export default request

export { baseURL }