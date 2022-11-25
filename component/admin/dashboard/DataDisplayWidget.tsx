import React from "react";
import { Card, Avatar, Space } from "antd";
import { CustomStatistic } from "./CustomStatistic";

const DataDisplayWidget = (props: any) => {
  const { size, value, title, icon, color, avatarSize = 50, vertical = false, loading } =
    props;
  const customStatisticProps = { size, value, title, loading };
  return (
    <Card>
      <Space align="center" direction={vertical ? "vertical" : "horizontal"}>
        <Avatar
          size={avatarSize}
          shape="square"
          icon={icon}
          className={`ant-avatar-${color}`}
        />
        <div className={vertical ? "mt-3 text-center" : "ml-3"}>
          <CustomStatistic {...customStatisticProps} />
        </div>
      </Space>
    </Card>
  );
};

export default DataDisplayWidget;
