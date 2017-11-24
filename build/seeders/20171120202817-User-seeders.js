'use strict';

var cov_109x3fcxqs = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\seeders\\20171120202817-User-seeders.js',
        hash = '392735769f00a180360a9a63ac460cb6667da2c6',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\seeders\\20171120202817-User-seeders.js',
        statementMap: {
            '0': {
                start: {
                    line: 1,
                    column: 15
                },
                end: {
                    line: 1,
                    column: 32
                }
            },
            '1': {
                start: {
                    line: 3,
                    column: 18
                },
                end: {
                    line: 7,
                    column: 1
                }
            },
            '2': {
                start: {
                    line: 8,
                    column: 24
                },
                end: {
                    line: 10,
                    column: 2
                }
            },
            '3': {
                start: {
                    line: 9,
                    column: 2
                },
                end: {
                    line: 9,
                    column: 39
                }
            },
            '4': {
                start: {
                    line: 13,
                    column: 0
                },
                end: {
                    line: 42,
                    column: 2
                }
            },
            '5': {
                start: {
                    line: 15,
                    column: 4
                },
                end: {
                    line: 36,
                    column: 12
                }
            },
            '6': {
                start: {
                    line: 40,
                    column: 8
                },
                end: {
                    line: 40,
                    column: 60
                }
            }
        },
        fnMap: {
            '0': {
                name: '(anonymous_0)',
                decl: {
                    start: {
                        line: 8,
                        column: 38
                    },
                    end: {
                        line: 8,
                        column: 39
                    }
                },
                loc: {
                    start: {
                        line: 8,
                        column: 52
                    },
                    end: {
                        line: 10,
                        column: 1
                    }
                },
                line: 8
            },
            '1': {
                name: '(anonymous_1)',
                decl: {
                    start: {
                        line: 14,
                        column: 8
                    },
                    end: {
                        line: 14,
                        column: 9
                    }
                },
                loc: {
                    start: {
                        line: 14,
                        column: 39
                    },
                    end: {
                        line: 37,
                        column: 1
                    }
                },
                line: 14
            },
            '2': {
                name: '(anonymous_2)',
                decl: {
                    start: {
                        line: 39,
                        column: 10
                    },
                    end: {
                        line: 39,
                        column: 11
                    }
                },
                loc: {
                    start: {
                        line: 39,
                        column: 41
                    },
                    end: {
                        line: 41,
                        column: 5
                    }
                },
                line: 39
            }
        },
        branchMap: {},
        s: {
            '0': 0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
            '6': 0
        },
        f: {
            '0': 0,
            '1': 0,
            '2': 0
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

var bcrypt = (cov_109x3fcxqs.s[0]++, require('bcrypt'));

var passwords = (cov_109x3fcxqs.s[1]++, ['Password1', 'Password1', 'Password1']);
var hashedPasswords = (cov_109x3fcxqs.s[2]++, passwords.map(function (password) {
    cov_109x3fcxqs.f[0]++;
    cov_109x3fcxqs.s[3]++;

    return bcrypt.hashSync(password, 10);
}));

cov_109x3fcxqs.s[4]++;
module.exports = {
    up: function up(queryInterface, Sequelize) {
        cov_109x3fcxqs.f[1]++;
        cov_109x3fcxqs.s[5]++;

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

    down: function down(queryInterface, Sequelize) {
        cov_109x3fcxqs.f[2]++;
        cov_109x3fcxqs.s[6]++;

        return queryInterface.bulkDelete('Users', null, {});
    }
};