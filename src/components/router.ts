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
                    path:'/teacher_lesson_detail',
                    component: TeacherLessonDetail,
                },
                {
                    path:'/student_lesson',
                    component:StudentLesson,
                },
                {
                    path:'/lesson_detail',
                    component:LessonDetail,
                },
                {
                    path:'/test',
                    component:Test,
                },
                {
                    path:'/user_center',
                    component:UserCenter,
                }
            ],
        }
    ]
})

export default router