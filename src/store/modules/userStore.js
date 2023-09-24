import { defineStore} from "pinia";
import { ref } from 'vue'
const useUserStore = defineStore('tool_box_userStore', () => {

    const user = ref()

    const hashToken = ref(false)

    const setToken = (value) => {
        hashToken.value = value
    }

    const removeToken = () => {
        hashToken.value = false
    }
    return {
        user,
        hashToken,
        setToken,
        removeToken
    }
},{
    persist: true
})

export default useUserStore