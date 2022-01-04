import { RouteRecordRaw } from 'vue-router'
import Demo from '../components/demo.vue'
import NotePage from '../components/NotePage.vue'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name:'demo',
        component:Demo
    },
    {
        path: '/notepage',
        name:'notePage',
        component: NotePage,
        beforeEnter: (to, from)=>{
            document.title='连理枝和比翼鸟'
        }
    }
];

export default routes