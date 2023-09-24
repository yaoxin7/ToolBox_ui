import { defineStore } from 'pinia'
import { ref } from 'vue'
const useConfig = defineStore('tool_box_config', () => {

    const config = ref({
        backgroundUrl: '',
        icon: []
    })

    const setBackgroundUrl = (value) => {
        config.value.backgroundUrl = value
    }

    return {
        config,
        setBackgroundUrl
    }
}, {
    persist: true
})

export default useConfig