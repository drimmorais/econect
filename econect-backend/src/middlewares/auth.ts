import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import * as UserModel from '../models/User';

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });
  }

  const [, token] = authorization.replace(/['"]+/g, '').split(' ');
  jwt.verify(token, process.env.TOKEN_SECRET as Secret, async (err, decoded) => {
    if (err) {
      if (err.message === 'jwt expired') {
        return res.status(401).json({ auth: false, message: 'Token expirado.' });
      }

      return res.status(500).json({ auth: false, message: err.message });
    }

    const castDecoded = decoded as { id: string };

    if (decoded && castDecoded.id) {
      const user = await UserModel.getUserById(castDecoded.id);

      if (!user) {
        return res.status(401).json({ auth: false, message: 'Usuário não existe.' });
      }

      res.level = user[0].typeuser;

      return next();
    }

    return res
      .status(500)
      .json({ auth: false, message: 'Falha em autenticar o token.' });
  });
};
