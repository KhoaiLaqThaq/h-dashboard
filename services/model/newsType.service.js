import api from "~~/services/api";
import CONFIG from "~~/config";

class NewsTypeService {
    getAll() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/newsTypes`);
    }

    getById(newsTypeId) {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/newsType/${newsTypeId}`);
    }

    saveOrUpdate(newsType) {
        return api.post(`${CONFIG.NEWS_GATEWAY}/api/newsType`, newsType);
    }
}

export default new NewsTypeService();
