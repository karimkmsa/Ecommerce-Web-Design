import orderModel from "../../../dataBase/models/order.model.js";
import cartModel from "../../../dataBase/models/cart.model.js";
import productModel from "../../../dataBase/models/product.model.js";

export const createOrder = async (req, res) => {

    const userId = req.user._id;

    const cart = await cartModel
        .findOne({ user: userId })
        .populate("products.product");

    if (!cart) {
        return res.status(400).json({
            message: "Cart not found"
        });
    }

    if (cart.products.length === 0) {
        return res.status(400).json({
            message: "Cart is empty"
        });
    }

    let totalPrice = 0;
    const orderProducts = [];

    for (let item of cart.products) {

        const product = item.product;

        if (!product) continue;

        if (item.quantity > product.stock) {
            return res.status(400).json({
                message: `${product.title} not enough stock`
            });
        }

        product.stock -= item.quantity;
        await product.save();

        totalPrice += item.quantity * product.price;

        orderProducts.push({
            product: product._id,
            quantity: item.quantity,
            price: product.price
        });
    }

    const order = await orderModel.create({
        user: userId,
        products: orderProducts,
        totalPrice,
        status: "confirmed"
    });

    cart.products = [];
    await cart.save();

    res.json({
        success: true,
        message: "Order created successfully",
        order
    });
};

