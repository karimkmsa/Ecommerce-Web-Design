import express from "express";

import {
toggleWishlist,getWishlist
} from "./wishlist.controller.js";

import {

    isAuthenticated

} from "../../utils/middleware/auth.middleware.js";

const router = express.Router();

router.get(
    "/",
    isAuthenticated,
    getWishlist
);

router.post(
    "/:productId",
    isAuthenticated,
    toggleWishlist
);

export default router;