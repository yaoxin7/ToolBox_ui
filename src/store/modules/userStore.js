import { defineStore} from "pinia";
import { ref } from 'vue'
const useUserStore = defineStore('tool_box_userStore', () => {

    const user = ref()

    const hashToken = ref('')

    const setToken = (value) => {
        hashToken.value = value
    }

    const removeToken = () => {
        hashToken.value = ''
    }

    const getToken = () => {
        return hashToken.value
    }

    const haveToken = () => {
        if (hashToken.value == null || hashToken.value === '') 
            return false
        return true
    }
    return {
        user,
        hashToken,
        haveToken,
        setToken,
        removeToken,
        getToken
    }
},{
    persist: true
})

export default useUserStore