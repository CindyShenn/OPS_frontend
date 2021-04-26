import { createRouter, createWebHistory } from 'vue-router'

const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path:'/login',
            component: () => import( './login/Login.vue'),
        },
        {
            path:'/login_by_code',
            component: () => import( './login/LoginByCode.vue'),
        },
        {
            path:'/register',
            component: () => import( './login/Register.vue'),
        },
        {
            path:'/change_pwd',
            component: () => import( './login/ChangePwd.vue'),
        },
        {
            path:'/current_ide',
            name:'CurrentIDE',
            component:() => import( './project/CurrentIDE.vue'),
        },
        {
            path:'/test',
            component:() => import( './test.vue'),
        },
        {
            path:'/',
            component: () => import( '../index.vue'),
            children:[
                {
                    path:'/user_info',
                    component: () => import( './user/UserInfo.vue'),
                },
                {
                    path:'/project',
                    component: () => import( './project/Project.vue'),
                },
                {
                    path:'/teacher_class',
                    component: () => import( './class/TeacherClass.vue'),
                },
                {
                    path:'/student_status',
                    component: () => import( './class/StudentStatus.vue'),
                },
                {
                    path:'/teacher_lesson',
                    component: () => import( './lesson/TeacherLesson.vue'),
                },
                {
                    path:'/teacher_lesson_detail/:id',
                    component: () => import( './lesson/TeacherLessonDetail.vue'),
                },
                {
                    path:'/student_lesson',
                    component:() => import( './lesson/StudentLesson.vue'),
                },
                {
                    path:'/lesson_detail/:id',
                    component:() => import( './lesson/LessonDetail.vue'),
                },

                {
                    name:'UserCenter',
                    path:'/user_center',
                    component:() => import( './user/UserCenter.vue'),
                },
                {
                    name:'LessonResource',
                    path:'/lesson_resource/:id',
                    component:() => import( './lesson/LessonResource.vue'),
                },
                {
                    path:'/student_enter_lesson/:id',
                    component:() => import( './lesson/StudentEnterLesson.vue'),
                },
                {
                    path:'/project_detail/:id',
                    component:() => import( './project/ProjectDetail.vue'),
                },
                {
                    path:'/teacher_user_center',
                    component:() => import( './user/TeacherUserCenter.vue'),
                },
                {
                    path:'/check_in_detail/:id',
                    component:() => import( './teacher_op/CheckInDetail.vue'),
                },
                {
                    path:'/teacher_project_detail/:id',
                    component:() => import( './project/TeacherProjectDetail.vue'),
                },
                {
                    path:'/lesson_resource_all/:id',
                    component:() => import( './lesson/LessonResourceAll.vue'),
                }
            ],
        }
    ]
})

router.beforeEach((to, from, next) => {
    // 从LocalStorage中获取token字段
    let token = localStorage.getItem('token')
    // 根据是否有token判断用户是否登录
    if (token === "" || token === undefined || token === null) {
        // 如果用户未登录且路由不是去 登录页面、修改密码页面、注册页面 则强制路由到登陆界面
        if ((to.path !== '/login')&& (to.path !== '/change_pwd') && (to.path !== '/register')) {
            next('/login')
            return
        }
        next()
        return
    }
    // 网站默认页面为 用户主页 页面
    if (to.path === '/') {
        next('/user_center')
        return
    }
    next()
    return
})

export default router