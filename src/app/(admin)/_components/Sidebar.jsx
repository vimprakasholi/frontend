"use client";

import { ADMIN, MERCHANT, USER } from "@/constants/roles";
import {
  DASHBOARD_ROUTE,
  ORDER_MANAGEMENT_ROUTE,
  PRODUCT_MANAGEMENT_ROUTE,
  PROFILE_ROUTE,
  USER_MANAGEMENT_ROUTE,
} from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLuggageCart, FaShoppingBasket, FaUserCog } from "react-icons/fa";
import { FaChartPie, FaUsers } from "react-icons/fa6";
import { useSelector } from "react-redux";

const amdinMenu = [
  {
    route: DASHBOARD_ROUTE,
    label: "Dashboard",
    icon: <FaChartPie />,
    allowedRoles: [ADMIN, MERCHANT, USER],
  },
  {
    route: PRODUCT_MANAGEMENT_ROUTE,
    label: "Product Management",
    icon: <FaShoppingBasket />,
    allowedRoles: [ADMIN, MERCHANT],
  },
  {
    route: ORDER_MANAGEMENT_ROUTE,
    label: "Order Management",
    icon: <FaLuggageCart />,
    allowedRoles: [ADMIN, MERCHANT],
  },
  {
    route: USER_MANAGEMENT_ROUTE,
    label: "User Management",
    icon: <FaUsers />,
    allowedRoles: [ADMIN],
  },
  {
    route: PROFILE_ROUTE,
    label: "Profile",
    icon: <FaUserCog />,
    allowedRoles: [ADMIN, MERCHANT, USER],
  },
];
const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const pathname = usePathname();

  return (
    <div className="bg-white hidden lg:block w-64 h-full z-20 absolute top-0 left-0 border-r border-gray-300 dark:border-slate-700 dark:bg-slate-900">
      <div className="p-4 flex flex-col gap-1">
        {amdinMenu.map((menu) => {
          const isActive = pathname === menu.route;

          if (!user.roles.some((role) => menu.allowedRoles.includes(role)))
            return null;

          return (
            <Link
              key={menu.route}
              className={`bg-primary px-3 py-1 rounded-md flex items-center gap-2 ${
                isActive
                  ? "text-white bg-primary"
                  : "text-gray-700 bg-primary/5 dark:bg-gray-700 dark:text-white"
              }`}
              href={menu.route}
            >
              {menu.icon}
              {menu.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
