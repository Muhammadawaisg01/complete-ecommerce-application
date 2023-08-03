
const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();
// isAuthenticatedUser, authorizeRoles("Admin"),
router.route('/products').get(getAllProducts);
router.route('/product/new').post(isAuthenticatedUser, authorizeRoles("Admin"), createProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);
router.route('/product/:id').get(getProductDetails);

module.exports = router;
