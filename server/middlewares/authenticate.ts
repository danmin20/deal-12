import { Response, NextFunction } from 'express';
import jwt, {
  GetPublicKeyOrSecret,
  JwtPayload,
  Secret,
  VerifyCallback,
} from 'jsonwebtoken';

export const authenticateAccessToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let authHeader = req.headers['authorization'];
  let token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    next(Error);
  } else {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret | GetPublicKeyOrSecret,
      ((error: Error, user: JwtPayload) => {
        if (error) {
          next(error);
        }

        req.user = user;
        next();
      }) as VerifyCallback
    );
  }
};
