import Order from '../models/Order.js';

const createOrder = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      billingAddress,
      paymentMethod,
      shippingPrice,
      codPrice,
      taxPrice,
      itemsPrice,
      totalPrice
    } = req.body;

    if(orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('Order items not found');
    } else {
      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        billingAddress,
        paymentMethod,
        shippingPrice,
        codPrice,
        taxPrice,
        itemsPrice,
        totalPrice
      });
      const createdOrder = await order.save();

      res.status(201);
      res.json({ orderId: createdOrder._id, success: true, error: null });
    }
  } catch(err) {
    next(err);
  }
};

export { createOrder };