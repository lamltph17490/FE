import axiosClient from "./config";

interface StatisticDashboard {
  total: number
}

const StatisticApi = {
  async dashboard(month?: number | undefined) {
    return axiosClient.get('/statistic/dashboard', { params: { month }})
  }
}

export default StatisticApi
