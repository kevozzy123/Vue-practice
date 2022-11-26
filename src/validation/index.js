import userValid from './userValid.js'

export default {
    install(app){
        app.config.globalProperties.$userRules = userValid;
    }
}