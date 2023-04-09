import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Order  from '../src/models/order';
import db from '../src/models';

const sequelize = db.sequelize

// Create Order
export const createOrder =  async (req: Request, res: Response) => {
  try {
    const order = await Order.create(req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update Order
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    const updatedOrder = await order.update(req.body);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete Order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    await order.destroy();
    res.status(200).json({ message: 'Order deleted.' });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Order by User ID
export const getOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({ where: { userId } });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All Orders
export const getOrders = async (_: Request, res: Response) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Order Stats
export const income = async (_: Request, res: Response) => {
  try {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    const income = await Order.findAll({
      attributes: [
        [sequelize.fn('month', sequelize.col('createdAt')), 'month'],
        [sequelize.fn('sum', sequelize.col('amount')), 'total'],
      ],
      where: {
        createdAt: {
          [Op.gte]: previousMonth,
        },
      },
      group: [sequelize.fn('month', sequelize.col('createdAt'))],
    });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
};
