import React, { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { AdminLayout } from "../../layouts";
import { NextPageWithLayout } from "../../models/layout";
import { Avatar, Card, Col, List, Row, Select, Space, Spin, Table, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import DataDisplayWidget from "../../component/admin/dashboard/DataDisplayWidget";
import "antd/dist/antd.css";
import AppBreadcrumb from "../../layouts/AdminLayout/AdminBreadcrumb";
import StatisticApi from "../../Api/statisticApi";
import { Order, OrderDetail } from "../../models/Order";
import { ApexOptions } from "apexcharts";
import moment from "moment";
import dynamic from "next/dynamic";
import { thousandFormat } from "../../untils";
import { Tprd } from "../../models/prd";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {};

interface StatisticDashboard {
  total: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalSaleProducts: number;
  };
  orders: any;
  populateProducts: Array<Tprd & { quantity: number }>;
}

const Andex: NextPageWithLayout = (props: Props) => {
  const months = Array.from(new Array(moment().month() + 1)).map((_, i) => (i + 1));
  const [loading, setLoading] = useState(true);
  const [statisticDashboard, setStatisticDashboard] = useState<StatisticDashboard>({
    total: {
      totalProducts: 0,
      totalSaleProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
    },
    orders: {},
    populateProducts: [],
  });
  const [seriesMonthly, setSeriesMonthly] = useState<ApexOptions["series"]>([]);
  const [seriesProducts, setSeriesProducts] = useState<Array<any>>([]);
  const [seriesToday, setSeriesToday] = useState<Array<any>>([]);

  const chartMonthOptions: ApexOptions = {
    noData: {
      text: "Không có dữ liệu",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "14px",
        fontFamily: undefined,
      },
    },
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    // title: {
    //   text: 'Product Trends by Month',
    //   align: 'left'
    // },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: months,
      tooltip: {
        formatter: function(val) {
          return val;
        },
      },
      labels: {
        // formatter(value: string, timestamp?: number, opts?: any): string | string[] {
        //   return 'Tháng' + value
        // }
      },
    },
    yaxis: {
      labels: {
        formatter(val: number, opts?: any): string | string[] {
          return thousandFormat(val) + " đ";
        },
      },
    },
  };
  const todayChartOptions = useMemo(() => ({
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    }],
  }), [seriesToday]);

  const loadStatisticDashboard = useCallback((monthSelected?: number | undefined) => {
    setLoading(true);
    StatisticApi.dashboard(monthSelected).then((res: any) => {
      setStatisticDashboard(res);
      const seriesMonthly: ApexOptions["series"] = [{
        name: "Doanh thu", data: months.map((month) => {
          const dataInMonth = res.orders[month];
          if (dataInMonth) {
            return dataInMonth.reduce((a: number, b: Order) => a + b.totalPrice, 0);
          }
          return 0;
        }),
      }];
      setSeriesMonthly(seriesMonthly);
      setSeriesProducts(res.populateProducts);
      console.log("res.ordersToday", res.ordersToday);
      setSeriesToday(res.ordersToday);
      setLoading(false);
    });
  }, [months]);
  useEffect(() => {
    loadStatisticDashboard();
  }, []);
  return (
    <>
      <AppBreadcrumb title="Dashboard" description="chart" button={<Select
        allowClear
        onClear={() => {
          loadStatisticDashboard()
        }}
        onSelect={(value: number) => {
          loadStatisticDashboard(value)
        }}
        style={{ width: 120 }}
        placeholder="Chọn tháng"
        options={Array.from(new Array(moment().month() + 1)).map((_, index) => ({
          label: `Tháng ${index + 1}`,
          value: index + 1,
        }))} />} />
      <Space direction="vertical" size="middle" style={{ display: "flex", marginTop: 60, padding: 24 }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <DataDisplayWidget
              icon={<UserOutlined />}
              value={statisticDashboard.total.totalProducts}
              title="Tổng sản phẩm"
              color="cyan"
              avatarSize={55}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <DataDisplayWidget
              icon={<UserOutlined />}
              value={statisticDashboard.total.totalSaleProducts}
              title="Số lượng sản phẩm đã bán"
              color="cyan"
              avatarSize={55}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <DataDisplayWidget
              icon={<UserOutlined />}
              value={statisticDashboard.total.totalOrders}
              title="Tổng số đơn hàng"
              color="cyan"
              avatarSize={55}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <DataDisplayWidget
              icon={<UserOutlined />}
              value={statisticDashboard.total.totalRevenue}
              title="Doanh thu"
              color="cyan"
              avatarSize={55}
              loading={loading}
              suffix="đ"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col md={24} lg={8}>
            <Card title="Doanh thu theo tháng">
              <ReactApexChart series={seriesMonthly} options={chartMonthOptions} type="line" height={350} />
            </Card>
          </Col>
          <Col md={24} lg={8}>
            <Card title="Tổng hóa đơn hôm nay">
              <ReactApexChart series={seriesMonthly} options={chartMonthOptions} type="pie" height={350} />
            </Card>
          </Col>
          <Col md={24} lg={8}>
            <Card title="Sản phẩm bán chạy" extra="số lượng">
              <Spin spinning={loading}>
                <List itemLayout="vertical" size="large" dataSource={seriesProducts} renderItem={(item, index) => (
                  <List.Item key={item._id}
                             style={{ display: "flex", justifyContent: "space-between", padding: "5px 0 0 0" }}>
                    <List.Item.Meta
                      title={item.name}
                      avatar={
                        <Avatar
                          size="large"
                          style={{
                            backgroundColor: index === 0 ? "#c6401c" : index === 1 ? "rgb(245, 106, 0)" : index === 2 ? "orange" : "#888888",
                          }}
                        >
                          {index + 1}
                        </Avatar>}
                    />
                    <Typography.Title level={4}>{item.quantity}</Typography.Title>
                  </List.Item>
                )} />
              </Spin>
            </Card>
          </Col>
        </Row>
      </Space>
    </>
  );
};
Andex.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default Andex;
