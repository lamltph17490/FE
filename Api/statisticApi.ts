import axiosClient from "./config";

interface StatisticDashboard {
  total: number
}

const StatisticApi = {
  async dashboard(data?: any) {
    return axiosClient.post('/statistic/dashboard', data)
  }
}

export default StatisticApi
