import express, { Request, Response } from 'express';
import Cart from '../src/models/cart';
import Product from '../src/models/product';

const router = express.Router();

// Create Cart
export const createOrUpdateCart = async (req: Request, res: Response) => {


  try {
    const { products, amount, address, status } = req.body;

    // Find cart for user or create new cart
    let cart = await Cart.findOne({ where: { userId: req.params.userId } });
    if (!cart) {
      cart = await Cart.create({ userId: (req as any).user.id, products, amount, address, status });
    }
    if (products) cart.products.unshift(products)
    if (amount) cart.amount += amount
    if (address) cart.address = address
    if (status) cart.status = status

    // Add product to cart
    await cart.save();

    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding to cart' });
  }
};


// Delete Cart
export const deleteCart = async (req: Request, res: Response) => {
  try {

    const cart = await Cart.findOne({ where: { userId: req.params.userId } });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    await cart.destroy();

    return res.status(200).json({ message: 'Cart deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting cart' });
  }
};

// Get a User Cart
// router.get('/findProduct/:userId', async (req: Request, res: Response) => {through: { attributes: ['products.productId'] }
export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({
      where: { userId },
      include: [{ model: Product, }],
    });

    return res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error finding cart' });
  }
};

// Get All Cart
export const getCarts = async (_: Request, res: Response) => {
  try {
    const carts = await Cart.findAll({ include: [{ model: Product }] });

    return res.status(200).json(carts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error getting carts' });
  }
};

export default router;
