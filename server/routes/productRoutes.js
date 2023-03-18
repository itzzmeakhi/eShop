import { Router } from 'express';

import Product from '../models/Product.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500);
    next(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if(product) {
      res.json(product);
    } else {
      res.status(404);
      throw Error('Product not found');
    }
  } catch(err) {
    res.status(500);
    next(err);
  }
});

export default router;