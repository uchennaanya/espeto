import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../src/models/user';
import { compare, hash } from '../utils/bcrypt';
import { signToken } from '../utils/jwt';


export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Check if user already exists
    const user = await User.findOne({
      where: { email }, attributes: ['email', "password"], raw: true
    });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    console.log("after", req.body);

    // Hash the password
    req.body.password = await hash(password);

    // Create a new user
    await User.create(req.body);

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
console.log(user)
    // Check if the password is correct
    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

     // Generate a JWT token
    const token = await signToken({ userId: user.id, email: user.email })

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const userProfile = async (req: Request, res: Response) => {
  const userId = req.params.userId
  try {

    if (!userId) throw new Error('Please provide an ID ')
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
