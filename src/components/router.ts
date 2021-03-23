import { createRouter, createWebHistory } from 'vue-router'
import Login from './login/Login.vue'
import LoginByCode from './login/LoginByCode.vue'
import Register from './login/Register.vue'
import UserInfo from './user/UserInfo.vue'
import Home from './Home.vue'
import ChangePwd from './login/ChangePwd.vue'
import Project from './project/Project.vue'
import TeacherClass from './class/TeacherClass.vue'
import StudentStatus from './class/StudentStatus.vue'
import TeacherLesson from './lesson/TeacherLesson.vue'
import TeacherLessonDetail from './lesson/TeacherLessonDetail.vue'
import StudentLesson from './lesson/StudentLesson.vue'
import LessonDetail from './lesson/LessonDetail.vue'
import Test from './test.vue'
import UserCenter from './user/UserCenter.vue'
import LessonResource from './lesson/LessonResource.vue'
import StudentEnterLesson from './lesson/StudentEnterLesson.vue'
import ProjectDetail from './project/ProjectDetail.vue'
import CurrentIDE from './project/CurrentIDE.vue'
import TeacherUserCenter from './user/TeacherUserCenter.vue'


const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path:'/login',
            component: Login,
        },
        {
            path:'/login_by_code',
            component: LoginByCode,
        },
        {
            path:'/register',
            component: Register,
        },
        {
            path:'/change_pwd',
            component: ChangePwd,
        },
        {
            path:'/',
            component: () => import(/* webpackChunkName: "about" */ '../index.vue'),
            children:[
                {
                    path:'/user_info',
                    component: UserInfo,
                },
                {
                    path:'/home',
                    component: Home,
                },
                {
                    path:'/project',
                    component: Project,
                },
                {
                    path:'/teacher_class',
                    component: TeacherClass,
                },
                {
                    path:'/student_status',
                    component: StudentStatus,
                },
                {
                    path:'/teacher_lesson',
                    component: TeacherLesson,
                },
                {
                    path:'/teacher_lesson_detail/:id',
                    component: TeacherLessonDetail,
                },
                {
                    path:'/student_lesson',
                    component:StudentLesson,
                },
                {
                    path:'/lesson_detail/:id',
                    component:LessonDetail,
                },
                {
                    path:'/test',
                    component:Test,
                },
                {
                    name:'UserCenter',
                    path:'/user_center',
                    component:UserCenter,
                },
                {
                    path:'/lesson_resource',
                    component:LessonResource,
                },
                {
                    path:'/student_enter_lesson/:id',
                    component:StudentEnterLesson,
                },
                {
                    path:'/project_detail/:id',
                    component:ProjectDetail,
                },
                {
                    path:'/current_ide',
                    name:'CurrentIDE',
                    component:CurrentIDE,
                },
                {
                    path:'/teacher_user_center',
                    component:TeacherUserCenter,
                }
            ],
        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log(`router: ${from.path} => ${to.path}`)

    let token = localStorage.getItem('token')

    console.log(token)

    // 未登录
    if (token === "" || token === undefined || token === null) {
        // 路由不是去 /login 则强制路由到登陆界面
        if ((to.path !== '/login')&& (to.path !== '/change_pwd') && (to.path !== '/register')) {
            next('/login')
            return
        }
        next()
        return
    }
    if (to.path === '/') {
        next('/user_center')
        return
    }

    next()
    return
})

export default router