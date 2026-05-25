import productModel from "../../../dataBase/models/product.model.js"
import ApiFeatures from '../../utils/apiFeatures.js';



export const getProduct = async (req, res) => {

  const limit = 4;

  const totalProducts =
    await productModel.countDocuments();

  const totalPages =
    Math.ceil(totalProducts / limit);

  let apiFeature =
    new ApiFeatures(
      productModel.find(),
      req.query
    ).pagination().search().filter().fields();

  let allproducts =
    await apiFeature.mongooseQuery;

  res.render("ProductListingPage", {

     allproducts,

    currentPage: apiFeature.page,

    totalPages,

    keyword: req.query.keyword || '',

    category: req.query.category || ''

  });

};
export const getProductId = async (req, res) => {

    let {id} = req.params 
    const product = await productModel.findById({_id:id});

   res.render("ProductDetailsPage", {

        product

    });

};
export const addProduct = async (req, res) => {
  try {
 

    if (!req.body) {
      console.error(' req.body is undefined - Check multer setup!');
      return res.status(400).send('Form data not received. Check enctype and multer.');
    }

    // ✅ استخراج البيانات
    const { name, price, category, description, stock, imageUrl } = req.body;
    
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
      image: finalImage
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
      stock
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
        image
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

   res.render("adminDashboard", {
      products,
      currentPage: apiFeature.page,
      totalPages,
      keyword: req.query.keyword || "",
      category: req.query.category || ""
   });
};