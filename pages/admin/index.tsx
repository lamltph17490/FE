import React, { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { AdminLayout } from "../../layouts";
import { NextPageWithLayout } from "../../models/layout";
import { Avatar, Card, Col, List, Row, Select, Space, Spin, DatePicker, Typography, Form } from "antd";
import DataDisplayWidget from "../../component/admin/dashboard/DataDisplayWidget";
import "antd/dist/antd.css";
import AppBreadcrumb from "../../layouts/AdminLayout/AdminBreadcrumb";
import StatisticApi from "../../Api/statisticApi";
import { Order } from "../../models/Order";
import { ApexOptions } from "apexcharts";
import moment from "moment";
import dynamic from "next/dynamic";
import { thousandFormat } from "../../untils";
import { Tprd } from "../../models/prd";
import { FaMoneyCheckAlt, FaProductHunt } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { MdDoneOutline } from "react-icons/md";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {};

interface StatisticDashboard {
  total: {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    totalSaleProducts: number;
  };
  allOrders: any;
  orders: any;
  populateProducts: Array<Tprd & { quantity: number }>;
}

const Andex: NextPageWithLayout = (props: Props) => {
  const [months, setMonths] = useState(Array.from(new Array(moment().month() + 1)).map((_, i) => (i + 1)));
  const [loading, setLoading] = useState(true);
  const [statisticDashboard, setStatisticDashboard] = useState<StatisticDashboard>({
    total: {
      totalProducts: 0,
      totalSaleProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
    },
    allOrders: {},
    orders: [],
    populateProducts: [],
  });
  const [seriesMonthly, setSeriesMonthly] = useState<ApexOptions["series"]>([]);
  const [seriesProducts, setSeriesProducts] = useState<Array<any>>([]);
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [form] = Form.useForm();
  const [yearSelected, setYearSelected] = useState(moment().year());

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
  const todayChartOptions: ApexOptions = useMemo((): ApexOptions => ({
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Tiền mặt", "Chuyển khoản"],
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
  }), [orders]);

  const loadStatisticDashboard = useCallback((datePicker?: any) => {
    setLoading(true);
    let params = {};
    if (datePicker) {
      params = { ...params, startDate: datePicker[0].toDate(), endDate: datePicker[1].toDate() };
    }
    if (yearSelected) {
     params = { ...params, yearSelected }
    }
    StatisticApi.dashboard(params).then((res: any) => {
      setStatisticDashboard(res);
      const seriesMonthly: ApexOptions["series"] = [{
        name: "Doanh thu", data: months.map((month) => {
          const dataInMonth = res.allOrders[month];
          if (dataInMonth) {
            return dataInMonth.reduce((a: number, b: Order) => a + b.totalPrice, 0);
          }
          return 0;
        }),
      }];
      setSeriesMonthly(seriesMonthly);
      setSeriesProducts(res.populateProducts.slice(0, 10));
      setOrders(res.orders);
      setLoading(false);
    });
  }, [months, yearSelected]);
  useEffect(() => {
    loadStatisticDashboard();
  }, [yearSelected, months]);
  moment.locale("en", {
    week: {
      dow: 1,
    },
  });
  const analyticDateOptions: any[] = [{
    label: "Hôm nay",
    value: {
      start: moment().startOf("day"),
      end: moment().endOf("day"),
    },
  }, {
    label: "Hôm qua",
    value: {
      start: moment().add(-1, "days").startOf("day"),
      end: moment().add(-1, "days").endOf("day"),
    },
  }, {
    label: "7 ngày qua",
    value: {
      start: moment().add(-1, "weeks").startOf("day"),
      end: moment().endOf("day"),
    },
  }, {
    label: "14 ngày qua",
    value: {
      start: moment().add(-2, "weeks").startOf("day"),
      end: moment().endOf("day"),
    },
  }, {
    label: "30 ngày qua",
    value: {
      start: moment().add(-30, "days").startOf("day"),
      end: moment().endOf("day"),
    },
  }, {
    label: "Tuần này",
    value: {
      start: moment().startOf("week"),
      end: moment().endOf("day"),
    },
  }, {
    label: "Tuần trước",
    value: {
      start: moment().add(-1, "weeks").startOf("week"),
      end: moment().add(-1, "weeks").endOf("week"),
    },
  }, {
    label: "Tháng này",
    value: {
      start: moment().startOf("month"),
      end: moment().endOf("month"),
    },
  }, {
    label: "Tháng trước",
    value: {
      start: moment().add(-1, "months").startOf("month"),
      end: moment().add(-1, "months").endOf("month"),
    },
  }];

  return (
    <>
      <AppBreadcrumb title="Dashboard" description="chart" button={
        <Form form={form} onFinish={(values) => {
          loadStatisticDashboard(values.datePicker);
        }}>
          <Space>
            <Form.Item name="datePicker">
              <DatePicker.RangePicker onChange={() => {
                form.submit();
                form.resetFields(["selector"]);
              }} format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item name="selector">
              <Select
                allowClear
                onClear={() => {
                  loadStatisticDashboard();
                }}
                onSelect={(value: string) => {
                  if (value) {
                    const start = moment(value.split("_")[0]);
                    const end = moment(value.split("_")[1]);
                    form.setFieldValue("datePicker", [start, end]);
                    form.submit();
                  }
                }}
                style={{ width: 120 }}
                placeholder="Chọn thời gian"
                options={analyticDateOptions.map(i => ({
                  label: i.label,
                  value: `${i.value.start.toDate()}_${i.value.end.toDate()}`,
                }))} />
            </Form.Item>
          </Space>
        </Form>
      } />
      <Space direction="vertical" size="middle" style={{ display: "flex", marginTop: 60, padding: 24 }}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <DataDisplayWidget
              icon={<FaProductHunt fill="#2587be" style={{ width: "100%", height: "100%" }} />}
              value={statisticDashboard.total.totalProducts}
              title="Tổng sản phẩm"
              avatarSize={55}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <DataDisplayWidget
              icon={<FcSalesPerformance style={{ width: "100%", height: "100%" }} />}
              value={statisticDashboard.total.totalSaleProducts}
              title="Số lượng sản phẩm đã bán"
              avatarSize={55}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <DataDisplayWidget
              icon={<MdDoneOutline fill="#49be25" style={{ width: "100%", height: "100%" }} />}
              value={statisticDashboard.total.totalOrders}
              title="Tổng số đơn hàng"
              avatarSize={55}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <DataDisplayWidget
              icon={<FaMoneyCheckAlt fill="#be4d25" style={{ width: "100%", height: "100%" }} />}
              value={statisticDashboard.total.totalRevenue}
              title="Doanh thu"
              avatarSize={55}
              loading={loading}
              suffix="đ"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col md={24} lg={12}>
            <Card title="Doanh thu theo tháng" extra={<Select
              defaultValue={moment().year()}
              onChange={(event) => {
                setYearSelected(event)
                const countMonths = moment().year() === event ? moment().month() + 1 : 12
                setMonths(Array.from(new Array(countMonths)).map((_, i) => i+1))
              }}
              style={{ width: 120 }}
              options={Array.from(new Array(10)).map((_, index) => moment().year() - 9 + index).map((year) => ({
                label: year,
                value: year,
              }))} />}>
              <ReactApexChart series={seriesMonthly} options={chartMonthOptions} type="line" height={350} />
            </Card>
          </Col>
          <Col md={24} lg={12}>
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
