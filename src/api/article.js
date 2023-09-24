import request, {baseURL} from "../utils/request.js";

/*TODO 发布动态*/
export const publishArticleServer = (data) => request.put('/server/article', data)

// TODO 获取动态列表
export const getArticleListServer = (data) => request.get('/server/articles', {
    params: data
})

// TODO 获取动态详情
export const getArticleDetailServer = (id) => request.get(`/server/article?id=${id}`)

// TODO 请求Markdown内容
export const getMarkdownContentServer = (url) => request.get(baseURL + '/upload/' + url,
    {
        responseType: 'blob'
    })

// TODO 请求指定用户的动态
// TODO localhost:9090/server/articles/user?user_id=2&current=1&size=12
export const getUserArticleServer = (data) => request.get('/server/articles/user',
    {
        params: data
    })

// TODO 删除指定动态
export const deleteArticleServer = (article_id) => request.delete('/server/article',
    {
        params: {
            article_id
        }
    })