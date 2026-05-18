import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { connection } from './dataBase/connection.js';
import productRouter from './modules/product/product.routes.js';
const app = express();
const port = 3000;

connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,'public')))

// Home Page
app.get("/", (req, res) => {

    res.render("Home");

});


// Products Page
app.use("/products", productRouter);

// Product Details Page
app.get("/products/:id", (req, res) => {

    const productId = req.params.id;

    res.render("ProductDetailsPage", {
        id: productId
    });

});

app.listen(port, () => {

    console.log(`server is running....... on ${port}`);

});