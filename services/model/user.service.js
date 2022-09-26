import api from "~~/services/api";
import CONFIG from "~~/config";

class UserService {

    getById(userId) {
        return api.get(`${CONFIG.USER_GATEWAY}/api/user/${userId}`);
    }

    getAllGroup(){
        return api.get(`${CONFIG.USER_GATEWAY}/api/groups`)
    }

    checkEmail(userEmail){
        return api.get(`${CONFIG.USER_GATEWAY}/api/user/checkExistByEmail/${userEmail}`)
    }

    checkExistUser(username){
        return api.get(`${CONFIG.USER_GATEWAY}/api/user/checkExistByUsername/${username}`)
    }

    saveOrUpdate(user, headers) {
        return api.post(`${CONFIG.USER_GATEWAY}/api/user`, user, {headers});
    }
    deleteById(k6kUserId){
        return api.delete(`${CONFIG.USER_GATEWAY}/api/user/delete/${k6kUserId}`);
    }
}

export default new UserService();
