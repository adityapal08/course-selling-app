import express from "express";
import { orderData } from "../controllers/order.controller.js";
import useMiddleware from "../middlewares/user.mid.js";

const router = express.Router();

router.post("/", useMiddleware, orderData);

export default router;
