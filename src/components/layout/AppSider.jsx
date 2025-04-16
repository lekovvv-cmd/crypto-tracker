import { Layout, Card, Statistic, List, Typography, Tag, Button } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { capitalize } from "../../utils";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";

const siderStyle = {
  padding: "1rem",
};

export default function AppSider() {
  const { assets, removeAsset } = useContext(CryptoContext);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.length === 0 ? (
        <Card style={{ textAlign: "center" }}>
          <Typography.Text>
            Please add assets and they will appear
          </Typography.Text>
        </Card>
      ) : (
        assets.map((asset) => (
          <Card key={asset.id} style={{ marginBottom: "1rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <Statistic
                title={capitalize(asset.id)}
                value={asset.totalAmount}
                precision={2}
                valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
                prefix={
                  asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />
                }
                suffix="$"
              />
              <Button
                type="text"
                icon={<DeleteOutlined style={{ color: "red" }} />}
                onClick={() => removeAsset(asset.id)}
              />
            </div>
            <List
              size="small"
              dataSource={[
                {
                  title: "Total Profit",
                  value: asset.totalProfit,
                  withTag: true,
                },
                { title: "Asset Amount", value: asset.amount, isPain: true },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <span>{item.title}</span>
                  <span>
                    {item.withTag && (
                      <Tag color={asset.grow ? "green" : "red"}>
                        {asset.grow
                          ? `${asset.growPercent}%`
                          : `-${asset.growPercent}%`}
                      </Tag>
                    )}
                    {item.isPain && item.value}
                    {!item.isPain && (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value.toFixed(2)}$
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              )}
            />
          </Card>
        ))
      )}
    </Layout.Sider>
  );
}
