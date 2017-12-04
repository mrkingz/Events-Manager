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
        username: 'don_phillly',
        password: passwords[0],
        email: 'don_philly@gmail.com',
    }, {
        username: 'don_phillly',
        password: 'Badmos12',
        email: 'don_philly',		
    }, {
        username: 'don_phillly',
        password: null,
        email: 'don_philly',			
    }]
};