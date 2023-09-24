import {createPinia} from "pinia"
import persist from "pinia-plugin-persistedstate"

const pinia = createPinia().use(persist)

export default pinia

// import { userStore } from "./modules/user";
// export  { userStore }

export * from './modules/userStore.js'