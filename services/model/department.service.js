import api from "~~/services/api";
import CONFIG from "~~/config";

class DepartmentService {
    getAll() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/departments`);
    }

    getById(departmentId) {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/department/${departmentId}`);
    }

    saveOrUpdate(department, headers) {
        return api.post(`${CONFIG.NEWS_GATEWAY}/api/department`, department, {headers});
    }
}

export default new DepartmentService();
