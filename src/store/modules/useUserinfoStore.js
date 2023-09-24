import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {getUserinfoServer} from "../../api/userinfo.js";
import {baseURL} from "../../utils/request.js";

const useUserinfoStore = defineStore("tool_box_userinfo", () => {

    const userinfo = ref({});
    const imageUrl = computed(() => {
        return userinfo.value.avatar  ? baseURL + '/upload/' + userinfo.value.avatar : ''
    })

    const getUserinfo = async () => {
        if (userinfo.value.id) return;
        await refreshUserinfo();
    }

    const refreshUserinfo = async () => {
        const rep = await getUserinfoServer();
        userinfo.value = rep.data.data
    }

    return {
        imageUrl,
        refreshUserinfo,
        userinfo,
        getUserinfo
    }

})

export default useUserinfoStore