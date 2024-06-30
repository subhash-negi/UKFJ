import express from "express";
import authMiddleware from "../middlewares/auth.js"
import {placeOrder,verification,userOrder,ListOrders,updateStatus,cashOnDelivery,paymentfailed} from "../controllers/orderController.js"

const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verification",verification);
orderRouter.post("/payment",paymentfailed);
orderRouter.post("/cashondelivery",authMiddleware,cashOnDelivery);
orderRouter.post("/userOrders",authMiddleware,userOrder);
orderRouter.get("/list",ListOrders);
orderRouter.post("/status",updateStatus);

export default orderRouter;