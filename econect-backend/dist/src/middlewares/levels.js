"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCitizenAndCollectPoint = exports.isCollectPoint = exports.isCitizen = exports.isAdm = void 0;
const isAdm = (req, res, next) => {
    if (res.level === 'admin') {
        return next();
    }
    res.status(403).json('Nivel de acesso insuficiente para acessar essa rota.');
};
exports.isAdm = isAdm;
const isCitizen = (req, res, next) => {
    if (res.level === 'citizen') {
        return next();
    }
    res.status(403).json('Nivel de acesso insuficiente para acessar essa rota.');
};
exports.isCitizen = isCitizen;
const isCollectPoint = (req, res, next) => {
    if (res.level === 'collect point') {
        return next();
    }
    res.status(403).json('Nivel de acesso insuficiente para acessar essa rota.');
};
exports.isCollectPoint = isCollectPoint;
const isCitizenAndCollectPoint = (req, res, next) => {
    if (res.level === 'collect point' || res.level === 'citizen') {
        return next();
    }
    res.status(403).json('Nivel de acesso insuficiente para acessar essa rota.');
};
exports.isCitizenAndCollectPoint = isCitizenAndCollectPoint;
