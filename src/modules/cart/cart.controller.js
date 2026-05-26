import cartModel from "../../../dataBase/models/cart.model.js";
import produtModel from "../../../dataBase/models/product.model.js";


export const addToCart = async (req, res) => {

  try {

    const userId = req.user._id;

    const { productId } = req.body;

    let cart = await cartModel.findOne({
      user: userId
    });

    // create cart first time
    if (!cart) {

      cart = await cartModel.create({

        user: userId,

        products: [
          {
            product: productId,
            quantity: 1
          }
        ]

      });

    } else {

      // check existing product
      const existingProduct = cart.products.find(

        item => item.product.toString() === productId

      );

      // increase quantity
      if (existingProduct) {

        existingProduct.quantity += 1;

      } else {

        // add new product
        cart.products.push({

          product: productId,

          quantity: 1

        });

      }

      await cart.save();

    }

    // populate product data
    await cart.populate("products.product");

    // calculate total
    cart.totalPrice = cart.products.reduce((total, item) => {

      return total + (
        item.product.price * item.quantity
      );

    }, 0);

    await cart.save();

    return res.status(200).json({

      message: "Product added to cart",

      cart

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({

      message: "Server Error"

    });

  }

};

export const getCart = async (req, res) => {

    const cart = await cartModel
        .findOne({ user: req.user._id })
        .populate("products.product");

    // لو الكارت فاضي
    if (!cart) {
        return res.render("cart", {
            cart: { products: [] },
            subtotal: 0,
            discount: 0,
            tax: 0,
            total: 0
        });
    }

    // subtotal
    const subtotal = cart.products.reduce((acc, item) => {

        return acc + (item.product.price * item.quantity);

    }, 0);

    // discount example
    const discount = subtotal > 1000 ? 100 : 0;

    // tax example 14%
    const tax = subtotal * 0.14;

    // final total
    const total = subtotal - discount + tax;

    res.render("cart", {
        cart,
        subtotal,
        discount,
        tax,
        total
    });

};
export const updateCartQuantity = async (req, res) => {

    const { productId } = req.params;
    const { action } = req.body;

    const cart = await cartModel.findOne({
        user: req.user._id
    });

    if (!cart) {
        return res.status(404).json({
            message: "Cart not found"
        });
    }

    const item = cart.products.find(
        p => p.product.toString() === productId
    );

    if (!item) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    // 🔥 هات المنتج من الداتابيز
    const product = await produtModel.findById(productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found in DB"
        });
    }

    // ➕ increase
    if (action === "increase") {

        if (item.quantity >= product.stock) {
            return res.status(400).json({
                message: "Cannot exceed available stock"
            });
        }

        item.quantity += 1;
    }

    // ➖ decrease
    else if (action === "decrease") {

        item.quantity -= 1;

        if (item.quantity <= 0) {
            cart.products = cart.products.filter(
                p => p.product.toString() !== productId
            );
        }
    }

    await cart.save();

    res.json({
        message: "Cart updated",
        quantity: item.quantity
    });
};

export const removeFromCart = async (req, res) => {

  const { productId } = req.params;

  const cart = await cartModel.findOne({
    user: req.user._id
  });

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found"
    });
  }

  const beforeLength = cart.products.length;

  cart.products = cart.products.filter(
    p => p.product.toString() !== productId
  );

  if (beforeLength === cart.products.length) {
    return res.status(404).json({
      message: "Product not found in cart"
    });
  }

  await cart.save();

  return res.json({
    message: "Removed from cart successfully",
    cart
  });
};







