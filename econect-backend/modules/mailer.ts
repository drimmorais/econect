import dotenv from 'dotenv';

import nodemailer from 'nodemailer';

dotenv.config();

const transport = nodemailer.createTransport({
  //service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADRESS,
    pass: process.env.PASSWORD_EMAIL,
  },
});

export default transport;
