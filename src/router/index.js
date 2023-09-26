import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import useUserStore from "../store/modules/userStore.js";

const LoginPage = () => import("../views/login/LoginPage.vue")
const ContainerPage = () => import("../views/container/ContainerPage.vue")
const UserinfoPage = () => import("../views/userinfo/UserinfoPage.vue")
const ArticlePage = () => import("../views/article/ArticlePage.vue")
const CreateArticlePage = () => import( "../views/article/create_article/CreateArticlePage.vue")
const ArticleDetails = () => import("../views/article/article_details/ArticleDetails.vue")
const EditUserinfo = () => import("../views/userinfo/edit_userinfo/EditUserinfo.vue")
const HomePage = () => import("../views/home/HomePage.vue")
const routes = [
    {
        path: '/home', component: HomePage
    },
    {
        path: '/',
        component: ContainerPage,
        redirect: '/home',
        children: [
            {path: '/article', component: ArticlePage},
            {path: '/userinfo', component: UserinfoPage},
            {path: '/article/new', component: CreateArticlePage},
            {path: '/article/details/:id', component: ArticleDetails},
            {path: '/userinfo/edit', component: EditUserinfo}
        ]
    },
    {path: '/login', component: LoginPage},
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

router.beforeEach((to) => {
    const userStore = useUserStore()
    if (!userStore.haveToken() && to.path !== '/login')
        return '/login'
})

export default router