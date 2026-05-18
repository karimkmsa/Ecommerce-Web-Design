import productModel from "../../dataBase/models/product.model.js"


export const getProduct = async (req, res) => {

    const allproducts = await productModel.find();

    res.render("ProductListingPage", {

        allproducts

    });

};
export const addProduct = async (req, res) => {

    const { name, price, category,description,stock } = req.body;

    await productModel.create({
        name,
        price,
        category
    });

    res.redirect("/products");

};

export const updateProduct = async(req,res)=>{
let {_id,name,price,category,description,stock} = req.body
const updatedProduct = await productModel.findByIdAndUpdate(_id,{name,price,category,description,stock},{new:true})


res.json({messsege:"Products", updatedProduct})



}



export const deleteProduct = async(req,res)=>{
let {_id} = req.body
const deletedProduct = await productModel.deleteOne(_id)


res.json({messsege:"Products", deletedProduct})



}

export const seedProduct = async (req, res) => {

    const product = await productModel.create({

        name: "iPhone 15",

        price: 1000,

        category: "electronics",

        description: "Apple Phone",

        stock: 20,

        image: "/assets/iphone.jpg"

    });

    res.json(product);

};