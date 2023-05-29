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

export { getProducts, getProductById, removeProductById };