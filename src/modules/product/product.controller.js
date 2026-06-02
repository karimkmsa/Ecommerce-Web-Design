import productModel from "../../../dataBase/models/product.model.js"
import userModel from '../../../dataBase/models/user.model.js'
import orderModel from '../../../dataBase/models/order.model.js'
import ApiFeatures from '../../utils/apiFeatures.js';



export const getProduct = async (req, res) => {
  try {
    const limit = 4;
    const page = Number(req.query.page) || 1;

    let apiFeature = new ApiFeatures(
      productModel.find(),
      { ...req.query, limit, page }
    )
      .search()
      .filter()
      .fields()
      .pagination()
      .sort()    
;

    const allproducts = await apiFeature.mongooseQuery;

    // هات البراندات الخاصة بالكاتيجوري المختارة
    let brandFilter = {};

    if (req.query.category) {
      brandFilter.category = req.query.category;
    }

    const brands = await productModel.distinct("brand", brandFilter);

    const totalProducts = await productModel.countDocuments(
      apiFeature.mongooseQuery.getFilter()
    );

    const totalPages = Math.ceil(totalProducts / limit);

    res.render("ProductListingPage", {
      allproducts,
      brands,
      currentPage: page,
      totalPages,
      totalProducts,
      keyword: req.query.keyword || "",
      category: req.query.category || "",
      selectedBrand: req.query.brand || "",
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
export const getProductId = async (req, res) => {

    const product = await productModel.findById(req.params.id);

    const relatedProducts = await productModel.find({

        category: product.category,

        _id: { $ne: product._id }

    }).limit(4);

    res.render("ProductDetailsPage", {

        product,

        relatedProducts,

        keyword: "",
        category: ""

    });

};
export const addProduct = async (req, res) => {
  try {


    if (!req.body) {
      console.error(' req.body is undefined - Check multer setup!');
      return res.status(400).send('Form data not received. Check enctype and multer.');
    }

    // ✅ استخراج البيانات
    const { name, price, category, description, stock, imageUrl , brand} = req.body;

    let finalImage = '';
    if (req.file?.filename) {
      finalImage = req.file.filename;
    } else if (imageUrl?.startsWith('http')) {
      finalImage = imageUrl;  // رابط خارجي
    }

    const newProduct = await productModel.create({
      name,
      price: parseFloat(price),
      category,
      description: description || '',
      stock: parseInt(stock) || 0,
      image: finalImage,
      brand
    });

    console.log('✅ Saved:', newProduct._id);
    res.redirect("/dashboard/admin");

  } catch (error) {
    console.error(' Error:', error);
    res.status(500).send('Error: ' + error.message);
  }
};
export const updateProduct = async (req, res) => {

  try {

    const { id } = req.params

    const {
      name,
      price,
      category,
      description,
      stock,
      brand
    } = req.body

    let image = req.body.image

    if (req.file) {
      image = "/uploads/" + req.file.filename
    }

    await productModel.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
        description,
        stock,
        image,
        brand
      },
      { new: true }
    )

    res.redirect("/dashboard/admin")

  } catch (error) {

    console.log(error)

    res.send("Update Error")
  }
}



export const deleteProduct = async (req, res) => {

  const { id } = req.params

  await productModel.findByIdAndDelete(id)

  res.redirect("/dashboard/admin")
}



export const dashboardPage = async (req, res) => {

  const limit = 4;

  const totalProducts = await productModel.countDocuments();

  const totalPages = Math.ceil(totalProducts / limit);

  let apiFeature = new ApiFeatures(
    productModel.find(),
    req.query
  )
    .search()
    .filter()
    .pagination();

  const products = await apiFeature.mongooseQuery;

  // Statistics
  const inStock = await productModel.countDocuments({
    stock: { $gt: 5 }
  });

  const lowStock = await productModel.countDocuments({
    stock: { $gt: 0, $lte: 5 }
  });

  const outOfStock = await productModel.countDocuments({
    stock: 0
  });

  res.render("adminDashboard", {
    products,
    currentPage: apiFeature.page,
    totalPages,

    totalProducts,
    inStock,
    lowStock,
    outOfStock,

    keyword: req.query.keyword || "",
    category: req.query.category || ""
  });

};

//REVIEW CONTROLLR 
export const addReview = async (req, res) => {

    try {

        if (!req.user) {

            return res.status(401).json({

                message: "Please login first"

            });

        }

        const { rating, comment } = req.body;

        const product = await productModel.findById(

            req.params.id

        );

        if (!product) {

            return res.status(404).json({

                message: "Product not found"

            });

        }

const alreadyReviewed = product.reviews.some(
  (review) => review.user?.toString() === req.user._id.toString()
);

        if (alreadyReviewed) {

            return res.status(400).json({

                message: "You already reviewed this product"

            });

        }

        const review = {

            user: req.user._id,

            name: req.user.firstName,

            rating: Number(rating),

            comment

        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =

            product.reviews.reduce(

                (acc, item) => acc + item.rating,

                0

            ) / product.reviews.length;

        await product.save();

        res.json({

            message: "Review added successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: error.message

        });

    }

};