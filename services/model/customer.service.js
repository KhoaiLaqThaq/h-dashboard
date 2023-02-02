import api from '~~/services/api';
import CONFIG from '~~/config'

class CustomerService {
  getAllOrSearch(criteria) {
    return api.post(`${CONFIG.DIGITAL_GATEWAY}/api/v1/customer`, criteria);
  }

  getByCode(code) {
    return api.get(`${CONFIG.DIGITAL_GATEWAY}/api/v1/customer/getByCode/${code}`);
  }
}

export default new CustomerService();
