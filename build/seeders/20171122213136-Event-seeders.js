'use strict';

var cov_1odd9v9ohi = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\seeders\\20171122213136-Event-seeders.js',
        hash = 'd809e9769747a6593922d2de7da50bdf8a5ff5d1',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\seeders\\20171122213136-Event-seeders.js',
        statementMap: {
            '0': {
                start: {
                    line: 2,
                    column: 0
                },
                end: {
                    line: 58,
                    column: 2
                }
            },
            '1': {
                start: {
                    line: 4,
                    column: 8
                },
                end: {
                    line: 52,
                    column: 16
                }
            },
            '2': {
                start: {
                    line: 56,
                    column: 8
                },
                end: {
                    line: 56,
                    column: 61
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
                        line: 53,
                        column: 5
                    }
                },
                line: 3
            },
            '1': {
                name: '(anonymous_1)',
                decl: {
                    start: {
                        line: 55,
                        column: 10
                    },
                    end: {
                        line: 55,
                        column: 11
                    }
                },
                loc: {
                    start: {
                        line: 55,
                        column: 41
                    },
                    end: {
                        line: 57,
                        column: 5
                    }
                },
                line: 55
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

cov_1odd9v9ohi.s[0]++;

module.exports = {
    up: function up(queryInterface, Sequelize) {
        var _ref, _ref2, _ref3, _ref4;

        cov_1odd9v9ohi.f[0]++;
        cov_1odd9v9ohi.s[1]++;

        return queryInterface.bulkInsert('Events', [(_ref = {
            title: 'Emmanuel\'s Birthday Bash',
            centerId: 1,
            date: '17/12/2017',
            time: '12:00 PM',
            estimatedGuests: 70,
            description: 'Class All-white Gallore',
            approval: false,
            userId: 2
        }, _defineProperty(_ref, 'centerId', 1), _defineProperty(_ref, 'createdAt', new Date()), _defineProperty(_ref, 'updatedAt', new Date()), _ref), (_ref2 = {
            title: 'Fellows Night',
            centerId: 1,
            date: '27/12/2017',
            time: '12:00 PM',
            estimatedGuests: 70,
            description: 'Classic',
            approval: true,
            userId: 2
        }, _defineProperty(_ref2, 'centerId', 1), _defineProperty(_ref2, 'createdAt', new Date()), _defineProperty(_ref2, 'updatedAt', new Date()), _ref2), (_ref3 = {
            title: 'Ikenna\'s Bachelor\'s Eve Party',
            centerId: 1,
            date: '23/12/2017',
            time: '12:00 PM',
            estimatedGuests: 70,
            description: 'Class Evening',
            approval: false,
            userId: 3
        }, _defineProperty(_ref3, 'centerId', 2), _defineProperty(_ref3, 'createdAt', new Date()), _defineProperty(_ref3, 'updatedAt', new Date()), _ref3), (_ref4 = {
            title: 'Celebrate With Jedidiah',
            centerId: 1,
            date: '1/1/2018',
            time: '12:00 PM',
            estimatedGuests: 70,
            description: 'Night of Bliss',
            approval: true,
            userId: 2
        }, _defineProperty(_ref4, 'centerId', 1), _defineProperty(_ref4, 'createdAt', new Date()), _defineProperty(_ref4, 'updatedAt', new Date()), _ref4)], {});
    },

    down: function down(queryInterface, Sequelize) {
        cov_1odd9v9ohi.f[1]++;
        cov_1odd9v9ohi.s[2]++;

        return queryInterface.bulkDelete('Events', null, {});
    }
};