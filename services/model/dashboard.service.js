import api from "~~/services/api";
import CONFIG from "~~/config";

class DashboardService {
    showReportPreview() {
        return api.get(`${CONFIG.NEWS_GATEWAY}/api/report/preview`);
    }
}

export default new DashboardService();
