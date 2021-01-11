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
    user: 'ebooks.nodemailer@gmail.com',
    pass: 'JeroBooks1',
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
    from: 'ebooks.nodemailer@gmail.com',
    to: 'yassin.leclercq1@gmail.com',
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
