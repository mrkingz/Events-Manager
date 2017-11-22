
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Centers', [{
            name: 'A.b. auditorium',
            capacity: 1500,
            price: '200,000',
            location: 'Lagos',
            address: '16, Ikorodu Road, Ilupeju',
            description: 'Cool spot for the best celebration',
            availability: false,
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date()        
        }, {
            name: 'Royal Crown Event Center',
            capacity: 1500,
            price: '150,000',
            location: 'Ilorin',
            address: '132, Alhaji sambo way, Gupura',
            availability: false,
            description: 'Nice place',
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date()            
        }, {
            name: 'Open Space Event Center',
            capacity: 1500,
            price: '100,000',
            location: 'Ogun',
            address: '132, Opeyemi Road, Ogunabali',
            availability: false,
            description: 'Nice place',
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Centers', null, {});
    }
};
