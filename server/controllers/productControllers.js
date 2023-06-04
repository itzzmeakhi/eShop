import Product from '../models/Product.js';

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500);
    next(err);
  }
};

const getProductById = async(req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if(product) {
      res.json(product);
    } else {
      res.status(404);
      throw Error('Product not found');
    }
  } catch(err) {
    next(err);
  }
};

const removeProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if(product) {
      await Product.findByIdAndRemove(req.params.id);
      res.json({ message: 'User removed'});
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch(err) {
    next(err);
  }
};

const createANewProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      brand,
      category,
      price,
      countInStock,
      image
    } = req.body;

    const product = new Product({
      user: req.user._id,
      title,
      description,
      brand,
      category,
      price,
      countInStock,
      image
    });

    const createdProd = await product.save();

    res.status(201);
    res.json({ productId: createdProd._id, success: true, error: null });
  } catch(err) {
    next(err);
  }
};

const updateProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if(product) {
      product.title = req.body.title || product.title;
      product.brand = req.body.brand || product.brand;
      product.category = req.body.category || product.category;
      product.countInStock = req.body.countInStock || product.countInStock;
      product.description = req.body.description || product.description;
      product.image = req.body.image || product.image;
      product.price = req.body.price || product.price;

      const updatedProduct = await product.save();

      res.json({
        _id: updatedProduct._id,
        title: updatedProduct.title,
        brand: updatedProduct.brand,
        category: updatedProduct.category,
        countInStock: updatedProduct.countInStock,
        description: updatedProduct.description,
        image: updatedProduct.image,
        price: updatedProduct.price,
        numReviews: updatedProduct.numReviews,
        rating: updatedProduct.rating,
        reviews: updatedProduct.reviews
      });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch(err) {
    next(err);
  }
};

export { 
  getProducts, 
  getProductById, 
  removeProductById,
  createANewProduct,
  updateProductById 
};