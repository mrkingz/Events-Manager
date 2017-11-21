const bcrypt = require('bcrypt');

const passwords = [
  'Password1',
  'Password1',
  'Password1',
];
const hashedPasswords = passwords.map((password) => {
  return bcrypt.hashSync(password, 10);
});


module.exports = {
    up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
            email: 'don_jed@gmail.com',
            username: 'don_jed',
            password: hashedPasswords[0],
            role: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            email: 'ikenna_ng@yahoo.com',
            username: 'ikenna_ng',
            password: hashedPasswords[1],
            role: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            email: 'emmabaye@gmail.com',
            username: 'emmabaye',
            password: hashedPasswords[2],
            role: 2,
            createdAt: new Date(),
            updatedAt: new Date()
    }], {});
},

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
