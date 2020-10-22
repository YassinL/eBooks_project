const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');

const { addUser } = require('../controllers/users');

const { Users } = require('../../models');

describe('Controllers :: UsersController :: Unit', () => {
  describe('#addUser', () => {
    it('should execute create method', async () => {
      // Given
      const data = {
        firstName: 'Sylvie',
        lastName: 'Lu',
        email: 'sylu@jade.fr',
        password: 'azerty1',
        birthday: '1990-05-19',
        phoneNumber: '0681273628',
        roleAdmin: 'false',
      };

      const createStub = sinon.stub(Users, 'create');

      // When
      await addUser(data);

      // Then
      expect(createStub.calledOnce).to.be.true;

      // expect(createStub.calledOnceWithExactly).
    });
  });
});
