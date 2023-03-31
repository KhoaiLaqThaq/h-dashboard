import api from '~~/services/api';
import CONFIG from '~~/config';

class NewsService {
  getAllOrSearch(criteria) {
    return api.post(`${CONFIG.DIGITAL_GATEWAY}/api/v1/news/getAllOrSearch`, criteria);
  }

  getByCode(code) {
    return api.get(`${CONFIG.DIGITAL_GATEWAY}/api/v1/news/getByCode/${code}`);
  }
}

export default new NewsService();