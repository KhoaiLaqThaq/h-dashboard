import api from '~~/services/api';
import CONFIG from '~~/config';

class OrderService {
  getAllOrSearch(criteria) {
    return api.post(`${CONFIG.DIGITAL_GATEWAY}/api/v1/order/getAll`, criteria)
  }

  getByCode(code) {
    return api.get(`${CONFIG.DIGITAL_GATEWAY}/api/v1/order/getByCode/${code}`);
  }
}

export default new OrderService();
