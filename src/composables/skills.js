import { ref } from "vue";
import axios from 'axios'
import router from "../router";


axios.defaults.baseURL = "http://localhost:8000/api/"

export default function useSkills() {
    const skills = ref([])
    const skill = ref([])
    const errors = ref({})

    const getSkills = async () => {
        const response = await axios.get('skills')
        skills.value = response.data.data
    }
    const getSkill = async (id) => {
        const response = await axios.get("skills/" + id)
        skill.value = response.data.skill
    }

    const storeSkill = async (data) => {
        try {
            await axios.post("skills", data)
            await router.push({ name: 'skillsIndex' })
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors
            }
        }
    }

    const updateSkill = async (id) => {
        try {
            await axios.put("skills/" + id, skill.value)
            await router.push({ name: 'skillsIndex' })
        } catch (error) {
            if (error.response.status === 422) {
                errors.value = error.response.data.errors
            }
        }
    }

    const deleteSkill = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) {
            return
        }
        await axios.delete("skills/" + id)
        await getSkills()
    }

    return {
        skill,
        skills,
        deleteSkill,
        storeSkill,
        updateSkill,
        getSkill,
        getSkills,
        errors
    }
}