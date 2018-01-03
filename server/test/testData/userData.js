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
    },{
        username: 'don_philz3',
        password: passwords[0],
        email: 'don_philz3@gmail.com',
    }, {
        username: 'don_philly4',
        password: passwords[0],
        email: 'don_philly4',		
    }, {
        password: passwords[0],
        email: 'don_philly5@yahoo.com',			
    }, {
        username: 'do',
        password: passwords[0],
        email: 'don_philly6@gmail.com',			
    }, {
        username: '_do89',
        password: passwords[0],
        email: 'don_philly7@gamil.com',			
    }, {
        username: 'don_philly8',
        email: 'don_philly8@gmail.com',			
    }, {
        username: 'don_philly1',
        password: 'password',
        email: 'don_philly9@gmail.com',			
    }, {
        username: 'don_philly1',
        password: passwords[0],
        email: 'don_philly1@gmail.com',	
    }, {
        username: 'don_philly1',
        password: passwords[0],
        email: 'don_philly11@gmail.com',
    }]
};