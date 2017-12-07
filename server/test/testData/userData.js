import bcrypt from 'bcrypt';

const passwords = ['Password1'],
hashedPasswords = passwords.map((password) => {	
  return bcrypt.hashSync(password, 10);
});

export default { 
    admin: [{
        username: 'mrKingz',
        email: 'example.mail@gmail.com',
        password: 'Password1',
        role: 1,
    }],

    users: [{
        username: 'don_philly1',
        password: passwords[0],
        email: 'don_philly1@gmail.com',
    }, {
        username: 'don_philly2',
        password: passwords[0],
        email: 'don_philly2@gmail.com',       
    }, {
        username: 'don_philly3',
        password: 'Badmos12',
        email: 'don_philly3',		
    }, {
        username: 'don_philly1',
        password: passwords[0],
        email: 'don_philly4@yahoo.com',			
    }, {
        username: 'don_philly5',
        email: 'don_philly5@gmail.com',			
    }, {
        username: 'don_philly6',
        password: null,
        email: 'don_philly6',			
    }]
};