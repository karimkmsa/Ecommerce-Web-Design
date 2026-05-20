import express from 'express';
import multer from 'multer';
import path from 'path';
import { 
  dashboardPage,
  getProduct, 
  getProductId, 
  addProduct, 
  updateProduct, 
  deleteProduct 
} from './product.controller.js';

const router = express.Router();

// 📁 Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpg|jpeg|png|gif/;
    if (allowed.test(path.extname(file.originalname).toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  }
});

// 🗂️ Admin Routes - رتب الـ Specific قبل الـ Generic!
router.get("/admin", dashboardPage);                    // ✅ /dashboard/admin
router.get("/", getProduct);                            // ✅ /dashboard/

// ✅ Specific routes BEFORE /:id
router.post("/add-product",upload.single('image'), addProduct);           // ✅ /dashboard/add-product
router.put("/update-product/:id", upload.single('image'), updateProduct);  // ✅ /dashboard/update-product/:id
router.delete("/delete-product/:id", deleteProduct);    // ✅ /dashboard/delete-product/:id

// ✅ Generic route LAST (عشان مياخدش على الـ routes اللي فوق)
router.get("/:id", getProductId);                       // ✅ /dashboard/:id

export default router;