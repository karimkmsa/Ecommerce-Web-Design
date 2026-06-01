import orderModel from "../../../dataBase/models/order.model.js";

export const getMyOrders = async (req, res) => {

    const orders = await orderModel
        .find({ user: req.user._id })
        .populate("products.product")
        .sort({ createdAt: -1 });

    res.render("myOrders", {
        orders
    });

};
export const updateOrderStatus = async (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    await orderModel.findByIdAndUpdate(id, {
        status
    });

    res.json({
        success: true
    });

};
export const getAllOrdersAdmin = async (req, res) => {

   const limit = 5;

const totalOrders = await orderModel.countDocuments();

const totalPages = Math.ceil(totalOrders / limit);

const page = Number(req.query.page) || 1;

const pendingOrders = await orderModel.countDocuments({
    status: "pending"
});

const deliveredOrders = await orderModel.countDocuments({
    status: "delivered"
});

const cancelledOrders = await orderModel.countDocuments({
    status: "cancelled"
});

const orders = await orderModel
  .find()
  .populate("user")
  .populate("products.product")
  .skip((page - 1) * limit)
  .limit(limit);

res.render("orderTrack", {
  orders,
  currentPage: page,
  totalPages,
  totalOrders ,
    pendingOrders,
    deliveredOrders,
    cancelledOrders
});

};