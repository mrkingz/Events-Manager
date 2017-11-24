'use strict';

var cov_1i210eal53 = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\seeders\\20171122213113-Center-seeders.js',
        hash = 'd68878b4b06363718ba996be1d5a6117d36b3307',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\seeders\\20171122213113-Center-seeders.js',
        statementMap: {
            '0': {
                start: {
                    line: 2,
                    column: 0
                },
                end: {
                    line: 43,
                    column: 2
                }
            },
            '1': {
                start: {
                    line: 4,
                    column: 8
                },
                end: {
                    line: 37,
                    column: 16
                }
            },
            '2': {
                start: {
                    line: 41,
                    column: 8
                },
                end: {
                    line: 41,
                    column: 62
                }
            }
        },
        fnMap: {
            '0': {
                name: '(anonymous_0)',
                decl: {
                    start: {
                        line: 3,
                        column: 8
                    },
                    end: {
                        line: 3,
                        column: 9
                    }
                },
                loc: {
                    start: {
                        line: 3,
                        column: 39
                    },
                    end: {
                        line: 38,
                        column: 5
                    }
                },
                line: 3
            },
            '1': {
                name: '(anonymous_1)',
                decl: {
                    start: {
                        line: 40,
                        column: 10
                    },
                    end: {
                        line: 40,
                        column: 11
                    }
                },
                loc: {
                    start: {
                        line: 40,
                        column: 41
                    },
                    end: {
                        line: 42,
                        column: 5
                    }
                },
                line: 40
            }
        },
        branchMap: {},
        s: {
            '0': 0,
            '1': 0,
            '2': 0
        },
        f: {
            '0': 0,
            '1': 0
        },
        b: {},
        _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
    },
        coverage = global[gcv] || (global[gcv] = {});

    if (coverage[path] && coverage[path].hash === hash) {
        return coverage[path];
    }

    coverageData.hash = hash;
    return coverage[path] = coverageData;
}();

cov_1i210eal53.s[0]++;

module.exports = {
    up: function up(queryInterface, Sequelize) {
        cov_1i210eal53.f[0]++;
        cov_1i210eal53.s[1]++;

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

    down: function down(queryInterface, Sequelize) {
        cov_1i210eal53.f[1]++;
        cov_1i210eal53.s[2]++;

        return queryInterface.bulkDelete('Centers', null, {});
    }
};