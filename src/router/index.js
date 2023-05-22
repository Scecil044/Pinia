import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import SkillIndex from '../views/skills/SkillIndex.vue'
import SkillEdit from '../views/skills/SkillEdit.vue'
import SkillCreate from '../views/skills/SkillCreate.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/skills',
        name: 'skillsIndex',
        component: SkillIndex
    },
    {
        path: '/skill/create',
        name: 'createSkill',
        component: SkillCreate
    },
    {
        path: '/skill/edit/:id?',
        name: 'editSkill',
        component: SkillEdit,
        props: true
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router