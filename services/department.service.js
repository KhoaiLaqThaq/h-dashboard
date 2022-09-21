import api from "~~/services/api";
import CONFIG from "~~/config";

class DepartmentService {
    getAll() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/departments`);
    }
}

export default new DepartmentService();
