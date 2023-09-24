import request from '../utils/request.js'

export const loginServer = ({username, password}) => request.post('/server/login', {
    username,
    password
})

export const registerServer = data => request.post('/server/reg', data)

// 退出登录
export const logoutServer = () => request.put('server/logout')