import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import jwt, { Secret } from 'jsonwebtoken';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.userdata;

    const isAlreadyExist = await UserService.findUserByNickname({
      nickname: user.nickname,
    });

    if (isAlreadyExist.length) {
      return res.status(300).json({
        message: '이미 존재하는 아이디 입니다...',
      });
    }

    const result = await UserService.createUser(user);
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { nickname } = req.user;
    const user = req.body;
    const result = await UserService.updateUserLocation({ ...user, nickname });
    return res.status(200).json({
      message: 'success update locations',
      result,
    });
  } catch (error) {
    next(error);
  }
};

const getUserByNickname = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { nickname } = req.user;

  try {
    const result = await UserService.findUserByNickname({ nickname });
    const user = result[0];

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const login = async (req: any, res: Response, next: NextFunction) => {
  const { nickname } = req.body;

  try {
    const result = await UserService.findUserByNickname({ nickname });
    const user = result[0];

    if (result.length > 0) {
      // access token을 secret key 기반으로 생성
      const generateAccessToken = (nickname: string) => {
        return jwt.sign(
          { ...user },
          process.env.ACCESS_TOKEN_SECRET as Secret,
          {
            expiresIn: '1000h',
          }
        );
      };

      const accessToken = generateAccessToken(nickname);

      return res.status(200).json({ accessToken });
    }
    return res.status(300).json({
      message: 'not exist',
    });
  } catch (err) {
    next(err);
  }
};

export const UserController = {
  createUser,
  updateUser,
  login,
  getUserByNickname,
};
