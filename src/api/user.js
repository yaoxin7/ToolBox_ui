import request from '../utils/request.js'

export const loginServer = ({username, password}) => request.post('/server/login', {
    username,
    password
})

export const registerServer = data => request.post('/server/reg', data)

// 退出登录
export const logoutServer = () => request.put('server/logout')

// 修改用户密码
export const changePasswordServer = data => request.post('/server/user/info/password', data)