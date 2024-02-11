const express = require ('express');
const router = express.Router();

//CREAR CUANDO TENGA EL CREAR ARCHIVO
const upload = require('../middlewares/multer');

const productService = require ('../data/productService');


//controlador de peticiones 
const productController = require ('../controllers/productController');


router.get('/cart', productController.cart);
router.get('/libro/:id', productController.getOne);
router.get('/all', productController.all);
//router.get('/catg', productService.catg);
router.get('/filter',productController.filtro);
router.get('/catg',productController.indexCatg);

router.get("/search", productController.productSearch)

router.get('/autor/:id', productController.author);

module.exports = router;