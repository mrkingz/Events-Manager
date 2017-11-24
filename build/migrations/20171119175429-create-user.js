'use strict';

var cov_v9uwnzhoy = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\migrations\\20171119175429-create-user.js',
        hash = 'c3f289f3a5259b7580bf8b01419554b6c38c1acf',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\migrations\\20171119175429-create-user.js',
        statementMap: {
            '0': {
                start: {
                    line: 2,
                    column: 0
                },
                end: {
                    line: 42,
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
                    column: 11
                }
            },
            '2': {
                start: {
                    line: 40,
                    column: 8
                },
                end: {
                    line: 40,
                    column: 49
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
                        column: 28
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

cov_v9uwnzhoy.s[0]++;

module.exports = {
    up: function up(queryInterface, Sequelize) {
        cov_v9uwnzhoy.f[0]++;
        cov_v9uwnzhoy.s[1]++;

        return queryInterface.createTable('Users', {
            userId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            role: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function down(queryInterface) {
        cov_v9uwnzhoy.f[1]++;
        cov_v9uwnzhoy.s[2]++;

        return queryInterface.dropTable('Users');
    }
};