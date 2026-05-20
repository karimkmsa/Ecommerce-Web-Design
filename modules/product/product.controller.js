import productModel from "../../dataBase/models/product.model.js"


export const getProduct = async (req, res) => {

    const allproducts = await productModel.find();

    res.render("ProductListingPage", {

        allproducts

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
    // 🐛 Debug: شوف إيه اللي وصل
    console.log('📥 req.body:', req.body);
    console.log('📥 req.file:', req.file);

    // ✅ حماية: لو الـ body مش موجود
    if (!req.body) {
      console.error('❌ req.body is undefined - Check multer setup!');
      return res.status(400).send('Form data not received. Check enctype and multer.');
    }

    // ✅ استخراج البيانات
    const { name, price, category, description, stock, imageUrl } = req.body;
    
    // ✅ معالجة الصورة
    let finalImage = '';
    if (req.file?.filename) {
      finalImage = req.file.filename;  // من الـ upload
    } else if (imageUrl?.startsWith('http')) {
      finalImage = imageUrl;  // رابط خارجي
    }

    // ✅ حفظ في الـ Database - استخدم create مش insertMany!
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
    console.error('💥 Error:', error);
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



export const deleteProduct = async(req,res)=>{
let {id} = req.params
const deletedProduct = await productModel.deleteOne({_id:id})


res.json({messsege:"Products", deletedProduct})



}





export const dashboardPage = async (req, res) => {
   const products = await productModel.find();

   res.render("adminDashboard", {
      products
   });
};