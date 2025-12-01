"use client";

import { format } from "date-fns";
import { FaCog } from "react-icons/fa";
import { RxDotFilled } from "react-icons/rx";
import { useEffect, useState } from "react";
import { getOrders, getOrdersOfMerchant } from "@/api/orders";
import {
  ORDER_STATUS_CONFIRMED,
  ORDER_STATUS_DELIVERED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_SHIPPED,
} from "@/constants/orderStatus";
import Action from "./Action";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ADMIN } from "@/constants/roles";

const columns = [
  {
    label: "S.No.",
    key: "id",
  },
  {
    label: "Order Number",
    key: "orderNumber",
  },
  {
    label: "OrderBy",
    key: "user",
  },
  {
    label: "Order Items",
    key: "orderItems",
  },
  {
    label: "Total Price",
    key: "totalPrice",
  },
  {
    label: "status",
    key: "status",
  },
  {
    label: "Created At",
    key: "createdAt",
  },
];

const OrdersTable = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.auth);

  async function getAllOrders() {
    try {
      const response = user.roles.includes(ADMIN)
        ? await getOrders()
        : await getOrdersOfMerchant();
      console.log(response.data);

      setOrders(response.data);
    } catch (error) {
      toast.error(error.response.data, { autoClose: 1500 });
    }
  }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg border border-gray-300 dark:border-gray-700">
      <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
        <div className="flex items-center flex-1 space-x-4">
          <h5>
            <span className="text-gray-500">All Orders: </span>
            <span className="dark:text-white">{orders.length}</span>
          </h5>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-600 uppercase font-medium bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-4 py-3 cursor-pointer"
                >
                  <div className="flex items-center gap-2">{column.label}</div>
                </th>
              ))}
              <th
                scope="col"
                className="px-4 py-3 flex justify-center items-center"
              >
                <FaCog />
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-2 font-medium text-gray-600 whitespace-nowrap dark:text-gray-300">
                    <div className="flex items-center">{index + 1}.</div>
                  </td>
                  <td
                    scope="row"
                    className="flex items-center px-4 py-2 font-medium whitespace-nowrap"
                  >
                    {order.orderNumber}
                  </td>
                  <td className="px-4 py-2">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                      {order.user.name}
                    </span>
                  </td>
                  <td className="px-4 py-2 font-medium whitespace-nowrap ">
                    <ul>
                      {order.orderItems?.map((item, index) => (
                        <li className="flex items-center" key={index}>
                          <RxDotFilled />
                          <span className="text-md font-medium px-1">
                            {item.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 font-medium whitespace-nowrap">
                    Rs.{order.totalPrice}
                  </td>
                  <td className="px-4 py-2 font-medium whitespace-nowrap ">
                    <div className="flex items-center">
                      {order.status == ORDER_STATUS_DELIVERED && (
                        <div className="inline-block w-4 h-4 mr-2 bg-green-500 rounded-full" />
                      )}
                      {order.status == ORDER_STATUS_SHIPPED && (
                        <div className="inline-block w-4 h-4 mr-2 bg-yellow-500 rounded-full" />
                      )}
                      {order.status == ORDER_STATUS_CONFIRMED && (
                        <div className="inline-block w-4 h-4 mr-2 bg-blue-500 rounded-full" />
                      )}
                      {order.status == ORDER_STATUS_PENDING && (
                        <div className="inline-block w-4 h-4 mr-2 bg-red-500 rounded-full" />
                      )}
                      <span className="text-xs">{order.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 font-medium whitespace-nowrap">
                    {format(new Date(order.createdAt), "dd MMM yyyy")}
                  </td>
                  <td className="px-4 py-2 font-medium whitespace-nowrap">
                    <Action id={order._id} orderStatus={order.status} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
