import request from "../utils/request.js";

// TODO 获取当前登录用户的用户信息
export const getUserinfoServer = () => request.get("/server/user/info")

// TODO 修改当前登录用户的用户信息
export const updateUserinfoServer = (data) => request.post("/server/user/info", data)

// TODO 上传头像
export const uploadAvatarServer = (data) => request.post("/server/upload", data)

// TODO 获取指定用户的用户信息
export const getUserinfoByIdServer = (id) => request.get(`/server/user/info/${id}`)