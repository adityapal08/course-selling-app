import { Order } from "../modals/order.modal.js";
import { Purchase } from "../modals/purchase.modal.js";

export const orderData = async (req, res) => {
  const order = req.body;
  try {
    const orderInfo = await Order.create(order);
    console.log(orderInfo);
    const userId = orderInfo?.userId;
    const courseId = orderInfo?.courseId;
    const paymentId = orderInfo?.paymentId;
    res.status(201).json({ message: "Order Details", orderInfo });
    if (orderInfo) {
      const newPurchase = await Purchase.create({
        userId,
        courseId,
        paymentId,
      });
    }
  } catch (error) {
    console.log("Error in order", error);
    res.status(401).json({ errors: "Error in order creation" });
  }
};
