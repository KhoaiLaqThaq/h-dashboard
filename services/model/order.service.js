import api from '~~/services/api';
import CONFIG from '~~/config';

class OrderService {
  getAllOrSearch(criteria) {
    return api.post(`${CONFIG.DIGITAL_GATEWAY}/api/order/getAll`, criteria)
  }
}

export default new OrderService();
