
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Events', [{
            title: 'Emmanuel\'s Birthday Bash',
            centerId: 1,
            date: '17/12/2017',
            time: '12:00 PM', 
            estimatedGuests: 70,
            description: 'Class All-white Gallore',
            approval: false,
            userId: 2,
            centerId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'Fellows Night',
            centerId: 1,
            date: '27/12/2017',
            time: '12:00 PM', 
            estimatedGuests: 70,
            description: 'Classic',
            approval: true,
            userId: 2,
            centerId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'Ikenna\'s Bachelor\'s Eve Party',
            centerId: 1,
            date: '23/12/2017',
            time: '12:00 PM', 
            estimatedGuests: 70,
            description: 'Class Evening',
            approval: false,
            userId: 3,
            centerId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'Celebrate With Jedidiah',
            centerId: 1,
            date: '1/1/2018',
            time: '12:00 PM', 
            estimatedGuests: 70,
            description: 'Night of Bliss',
            approval: true,
            userId: 2,
            centerId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Events', null, {});
    }
};
