const express = require('express');
const nodemailerRouter = express.Router();
const nodemailer = require('nodemailer');
const {
  CREATED,
  OK,
  SERVER_ERROR,
} = require('../helpers/status_code');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_ADRESS_MAIL,
    pass: process.env.MDP_MAIL,
  },
});

nodemailerRouter.post('/sendMail', async (request, response) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    subject,
    message,
  } = request.body;

  const text = `
          Nom : ${firstName} \n
          Prénom : ${lastName}
          Email : ${email} \n
          Téléphone : ${phoneNumber} \n
          Sujet : ${subject} \n
          Message : ${message}
    `;

  const sendMail = await transporter.sendMail({
    from: process.env.USER_ADRESS_MAIL,
    to: process.env.TO_ADRESS_MAIL,
    subject,
    text,
  });

  if (!sendMail) {
    response.status(SERVER_ERROR).json({ error: 'Problème' });
    console.log('Problème => ', error);
  }
  response.status(CREATED).json({ sendMail });
  console.log('Message envoyé ');
});

module.exports = nodemailerRouter;
