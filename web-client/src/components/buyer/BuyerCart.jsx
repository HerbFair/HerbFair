import { Table, Button, Space } from "antd";
import axios from "axios";
import { useState } from "react";

const BuyerCart = () => {
  const handleDelete = (itemId) => {

  }

  const data = [
    {
      key: "1",
      name: "Sandalwood Cream",
      id: "1001",
      count: 2,
      price: "Rs. 1400.00",
    },
    {
      key: "2",
      name: "Ashwa Medha",
      id: "1002",
      count: 1,
      price: "Rs. 4500.00",
    },
    {
      key: "3",
      name: "King Coconut Oil",
      id: "1003",
      count: 3,
      price: "Rs. 900.00",
    },
  ];

  const [cartItems, setCartItems] = useState(data)

  axios.get('localhost:4005/api/v1/cart')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
          <Space>
            <Button danger>
              Remove
            </Button>
            <Button >
              Buy
            </Button>
          </Space>
      ),
    },
  ];

 

  return <Table columns={columns} dataSource={cartItems} />;
};

export default BuyerCart;
