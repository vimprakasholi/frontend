"use client";

import { addToCart } from "@/redux/cart/cartSlice";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddToCart = ({ product, label }) => {
  const dispatch = useDispatch();

  function addProductToCart() {
    delete product.description;

    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`, { autoClose: 1500 });
  }

  return (
    <button
      onClick={addProductToCart}
      className="bg-primary text-white dark:text-secondary cursor-pointer flex items-center gap-2 border border-primary px-4 rounded-md"
    >
      <span>{label ? label : ""}</span> <FaCartPlus />
    </button>
  );
};

export default AddToCart;
