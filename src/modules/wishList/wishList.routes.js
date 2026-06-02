import express from "express";

import {
toggleWishlist,getWishlist,clearWishlist
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
router.get('/',            isAuthenticated, getWishlist);
router.post('/:id',        isAuthenticated, toggleWishlist);
router.post('/clear',      isAuthenticated, clearWishlist);

export default router;