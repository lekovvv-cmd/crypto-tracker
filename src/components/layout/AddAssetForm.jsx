import { useRef, useState } from "react";
import {
  Select,
  Space,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import { useCrypto } from "../../context/crypto-context";
import CoinInfo from "../CoinInfo";

export default function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const [coin, setCoin] = useState(null);
  const { crypto, addAsset } = useCrypto();
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  if (submitted) {
    return (
      <Result
        status="success"
        title="New asset added!"
        subTitle={`Add ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  const validateMessages = {
    required: "${label} is required",
    types: {
      number: "${label} isn't valid number",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  if (!coin) {
    return (
      <Select
        onSelect={(value) => setCoin(crypto.find((c) => c.id === value))}
        style={{ width: "100%" }}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(10),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(5),
    });
  }

  return (
    <>
      <CoinInfo coin={coin} />
      <Divider />
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          price: +coin.price.toFixed(10),
        }}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber
            placeholder="Enter coin amount"
            onChange={handleAmountChange}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item label="Date & Time" name="date">
          <DatePicker showTime />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Total" name="total">
          <InputNumber disabled style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
