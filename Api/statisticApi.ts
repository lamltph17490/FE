import axiosClient from "./config";

interface StatisticDashboard {
  total: number
}

const StatisticApi = {
  async dashboard() {
    return axiosClient.get('/statistic/dashboard')
  }
}

export default StatisticApi
