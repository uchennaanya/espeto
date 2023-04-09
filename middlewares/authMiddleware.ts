import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../src/models/user';

interface TokenRequest extends Request {
  user?: JwtPayload;
}

const verifyToken = (req: TokenRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Unauthorized user, no token!' });
  }
};

const verifyTokenAndAuthorization = (req: TokenRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, async () => {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: 'You are not authorized' });
    }
  });
};

const verifyTokenAndAdmin = (req: TokenRequest, res: Response, next: NextFunction) => {
  verifyToken(req, res, async () => {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: 'You are not authorized' });
    }
  });
};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
