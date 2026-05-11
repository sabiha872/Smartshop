const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { user, orderItems, totalPrice } = req.body;

    const order = await Order.create({
      user,
      orderItems,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};