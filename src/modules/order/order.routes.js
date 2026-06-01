import express from "express";

import { getAllOrdersAdmin, getMyOrders , updateOrderStatus } from "./order.controller.js";
import {

    isAuthenticated

} from "../../utils/middleware/auth.middleware.js";
import { isAdmin } from "../../utils/middleware/isAdmin.js";


const router = express.Router();

router.get(
    "/my-orders",
    isAuthenticated,
    getMyOrders
);
router.get(
    "/adminOrders",
    isAdmin,
    getAllOrdersAdmin
);
router.put(
    "/admin/orders/:id/status",
    isAdmin,
    updateOrderStatus
);
export default router;