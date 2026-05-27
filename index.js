import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connection } from './dataBase/connection.js';
import productRouter from './src/modules/product/product.routes.js';
import userRouter from './src/modules/user/user.routes.js';
import cartRouter from './src/modules/cart/cart.routes.js'
import orderRouter from './src/modules/checkout/checkout.routes.js'
import cookieParser from "cookie-parser";
import { isAuthenticated } from "../Ecommerce Web Design/src/utils/middleware/auth.middleware.js";
import dotenv from 'dotenv'
dotenv.config()


const app = express();
const port = 3000;

connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(isAuthenticated);
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});
app.use((req, res, next) => {

    res.locals.keyword = req.query.keyword || "";

    res.locals.category = req.query.category || "";

    next();

});



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname,'public')))

// Home Page
app.get("/", (req, res) => {

    res.render("Home");

});



app.use("/products", productRouter);
app.use("/dashboard",productRouter)
app.use("/user",userRouter)
app.use("/cart",cartRouter)
app.use("/order", orderRouter);
// Product Details Page
app.get("/products/:id", (req, res) => {

    const productId = req.params.id;

    res.render("ProductDetailsPage", {
        id: productId
    });

});
app.get("/profile",(req,res)=>{

    res.render("profile")


})
app.get("/cart",(req,res)=>{

    res.render("cart")


})


app.listen(port, () => {

    console.log(`server is running....... on ${port}`);

});