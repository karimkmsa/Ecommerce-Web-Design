import userModel from "../../../dataBase/models/user.model.js";


export const toggleWishlist = async (req, res) => {

    try {

        const { productId } = req.params;

        const user = await userModel.findById(req.user._id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const exists = user.wishlist.some(

            item => item.toString() === productId

        );

        if (exists) {

            user.wishlist = user.wishlist.filter(

                item => item.toString() !== productId

            );

        } else {

            user.wishlist.push(productId);

        }

        await user.save();

    res.json({
    success: true,
    inWishlist: !exists,
    message: !exists
        ? "Added to wishlist"
        : "Removed from wishlist"
});

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};


export const getWishlist = async (req, res) => {

    const user = await userModel

        .findById(req.user._id)

        .populate("wishlist");

    res.render("wishlist", {

        wishlist: user.wishlist

    });

};