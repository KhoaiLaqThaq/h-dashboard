import api from '~~/services/api';
import CONFIG from '~~/config';

class ProductService {
  getAllOrSearch(criteria) {
    return api.post(`${CONFIG.DIGITAL_GATEWAY}/api/v1/product/getAllOrSearch`, criteria);
  }

  getByCode(code) {
    return api.get(`${CONFIG.DIGITAL_GATEWAY}/api/v1/product/getByCode/${code}`);
  }
}

export default new ProductService();