import { Table } from "antd";
import { useCrypto } from "../context/crypto-context";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Price, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
];

export default function AssetsTable() {
  const { assets } = useCrypto();

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
  }));

  return <Table pagination={false} columns={columns} dataSource={data} />;
}
