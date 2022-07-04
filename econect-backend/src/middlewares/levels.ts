import { Request, Response, NextFunction } from 'express';

const isAdm = (req: Request, res: Response, next: NextFunction): void => {
  if (res.level === 'admin') {
    return next();
  }

  res.status(403).json('Nivel de acesso insuficiente para acessar essa rota.');
};

const isCitizen = (req: Request, res: Response, next: NextFunction): void => {
  if (res.level === 'citizen') {
    return next();
  }
  res.status(403).json('Nivel de acesso insuficiente para acessar essa rota.');
};

const isCollectPoint = (req: Request, res: Response, next: NextFunction): void => {
  if (res.level === 'collect point') {
    return next();
  }

  res.status(403).json('Nivel de acesso insuficiente para acessar essa rota.');
};

const isCitizenAndCollectPoint = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.level === 'collect point' || res.level === 'citizen') {
    return next();
  }

  res.status(403).json('Nivel de acesso insuficiente para acessar essa rota.');
};

export { isAdm, isCitizen, isCollectPoint, isCitizenAndCollectPoint };
