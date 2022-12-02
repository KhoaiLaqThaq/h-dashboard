import api from "~~/services/api";
import TokenService from "~~/services/model/token.service";
import CONFIG from "~~/config";

class AuthService {
    login(data) {
        return api.post(`${CONFIG.USER_GATEWAY}/auth/login`, data);
    }

    logout() {
        TokenService.logout();
    }
}

export default new AuthService();
