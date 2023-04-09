import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../src/models/product';


// Create Product
export const createProduct = async (req: Request, res: Response,) => {
    try {
        const product = await Product.create(req.body);
        return res.status(200).json(product);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            await product.update(req.body);
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            await product.destroy();
            return res.status(200).json({ message: 'Product deleted' });
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Get a Product
export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

// All Products
export const getProducts = async (req: Request, res: Response) => {
    const { new: isNew, category } = req.query;
    const whereClause: any = {};
    if (isNew) {
        whereClause.createdAt = {
            [Op.gte]: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // last 7 days
        };
    }
    if (category) {
        whereClause.categories = {
            [Op.contains]: [category],
        };
    }
    try {
        const products = await Product.findAll({ where: whereClause });
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }
};
