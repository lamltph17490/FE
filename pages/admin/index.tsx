import React, { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { AdminLayout } from "../../layouts";
import { NextPageWithLayout } from "../../models/layout";
import { Card, Col, Row, Select, Space, Spin, Table } from "antd";
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
  ordersDetail: any;
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
    ordersDetail: {},
  });
  const [seriesMonthly, setSeriesMonthly] = useState<ApexOptions["series"]>([]);
  const [seriesProducts, setSeriesProducts] = useState<Array<number>>([]);
  const [labelsProducts, setLabelsProducts] = useState<Array<string>>([]);

  const chartMonthOptions: ApexOptions = {
    noData: {
      text: 'Không có dữ liệu',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '14px',
        fontFamily: undefined
      }
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

  const chartProductsOptions: ApexOptions = useMemo(() => ({
      noData: {
        text: 'Không có dữ liệu',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: '14px',
          fontFamily: undefined
        }
      },
      chart: {
        width: 380,
        type: "pie",
      },
      labels: labelsProducts,
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
    }
  ), [labelsProducts]);
  const loadStatisticDashboard = useCallback((monthSelected?: number | undefined) => {
    setLoading(true);
    StatisticApi.dashboard().then((res: any) => {
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
      const seriesProduct = Object.keys(res.ordersDetail).map((productId) => {
        const orderDetails: Array<OrderDetail> = res.ordersDetail[productId];
        return {
          ...orderDetails[0].product,
          month: moment(orderDetails[0].createdAt).month() + 1,
          quantity: orderDetails.reduce((a, b) => a + b.quantity, 0),
        };
      });
      setSeriesMonthly(seriesMonthly);
      console.log('monthSelected', monthSelected);
      setSeriesProducts(seriesProduct.filter(i => monthSelected ? i.month === monthSelected : true).map(i => i.quantity));
      setLabelsProducts(seriesProduct.filter(i => monthSelected ? i.month === monthSelected : true).map(i => i.name || ""));
      setLoading(false);
    });
  }, [months]);
  useEffect(() => {
    loadStatisticDashboard();
  }, []);
  return (
    <>
      <AppBreadcrumb title="Dashboard" description="chart" />
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
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Card title="Doanh thu theo tháng">
              <ReactApexChart series={seriesMonthly} options={chartMonthOptions} type="line" height={350} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Card title="Thống kê sản phẩm"
                  extra={<Select placeholder="Chọn tháng" style={{ width: 150 }} onSelect={(value: number) => {
                    loadStatisticDashboard(value);
                  }} options={months.map(i => ({ label: `Tháng ${i}`, value: i }))} />}>
              <Spin spinning={loading}>
                <ReactApexChart options={chartProductsOptions} series={seriesProducts} type="pie" width={550} />
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
