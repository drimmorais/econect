"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = new pg_1.Pool({
    user: 'postgres',
    password: process.env.PASSWORD,
    host: 'localhost',
    port: 5432,
    database: process.env.DATABASE,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
});
