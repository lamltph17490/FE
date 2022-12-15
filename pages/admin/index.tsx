import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { AdminLayout } from "../../layouts";
import { NextPageWithLayout } from "../../models/layout";
import { Card, Col, Row, Space, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import DataDisplayWidget from "../../component/admin/dashboard/DataDisplayWidget";
import 'antd/dist/antd.css'
import AppBreadcrumb from "../../layouts/AdminLayout/AdminBreadcrumb";
import StatisticApi from "../../Api/statisticApi";

type Props = {};
interface StatisticDashboard {
  totalProduct: number
}

const Andex: NextPageWithLayout = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [statisticDashboard, setStatisticDashboard] = useState<StatisticDashboard>({ totalProduct: 0 });

  const loadStatisticDashboard = useCallback(() => {
    setLoading(true)
    StatisticApi.dashboard().then((res: any) => {
      setStatisticDashboard(res)
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    loadStatisticDashboard();
  }, [loadStatisticDashboard])
  return (
    <>
      <AppBreadcrumb title="Dashboard" description="chart" />
      <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: 60, padding: 24 }} >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <DataDisplayWidget
              icon={<UserOutlined />}
              value={statisticDashboard.totalProduct}
              title="Tổng sản phẩm"
              color="cyan"
              avatarSize={55}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <DataDisplayWidget
              icon={<UserOutlined />}
              value={1000}
              title="Total products"
              color="cyan"
              avatarSize={55}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <DataDisplayWidget
              icon={<UserOutlined />}
              value={1000}
              title="Total products"
              color="cyan"
              avatarSize={55}
              loading={loading}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={6} xl={6} xxl={6}>
            <DataDisplayWidget
              icon={<UserOutlined />}
              value={1000}
              title="Total products"
              color="cyan"
              avatarSize={55}
              loading={loading}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Card>
              <Table />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Card>
              <Table />
            </Card>
          </Col>
        </Row>
      </Space>
    </>
  )
};
Andex.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>;

export default Andex;
