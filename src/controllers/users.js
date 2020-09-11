const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const models = require('../../models');
const { Users } = models;

module.exports = {
  addUser: async (data) => {
    const {
      firstName,
      lastName,
      email,
      password,
      birthday,
      phoneNumber,
    } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    return Users.create({
      id: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      birthday,
      phoneNumber,
    });
  },

  checkEmail: (userEmail) => {
    return Users.findOne({
      attributes: ['email'],
      where: { email: userEmail },
    });
  },

  getUserByEmail: (userEmail) => {
    return Users.findOne({
      where: {
        email: userEmail,
      },
    });
  },

  checkPassword: (password, userPassword) => {
    return bcrypt.compare(password, userPassword);
  },
};
