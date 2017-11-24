'use strict';

var cov_22t2fn0dew = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\migrations\\20171120102928-create-center.js',
        hash = 'bfaa598af8bc3f8f1b61c43c494dca76d198c493',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\migrations\\20171120102928-create-center.js',
        statementMap: {
            '0': {
                start: {
                    line: 1,
                    column: 4
                },
                end: {
                    line: 61,
                    column: 2
                }
            },
            '1': {
                start: {
                    line: 3,
                    column: 8
                },
                end: {
                    line: 56,
                    column: 11
                }
            },
            '2': {
                start: {
                    line: 59,
                    column: 8
                },
                end: {
                    line: 59,
                    column: 51
                }
            }
        },
        fnMap: {
            '0': {
                name: '(anonymous_0)',
                decl: {
                    start: {
                        line: 2,
                        column: 8
                    },
                    end: {
                        line: 2,
                        column: 9
                    }
                },
                loc: {
                    start: {
                        line: 2,
                        column: 39
                    },
                    end: {
                        line: 57,
                        column: 5
                    }
                },
                line: 2
            },
            '1': {
                name: '(anonymous_1)',
                decl: {
                    start: {
                        line: 58,
                        column: 10
                    },
                    end: {
                        line: 58,
                        column: 11
                    }
                },
                loc: {
                    start: {
                        line: 58,
                        column: 41
                    },
                    end: {
                        line: 60,
                        column: 5
                    }
                },
                line: 58
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

cov_22t2fn0dew.s[0]++;
module.exports = {
    up: function up(queryInterface, Sequelize) {
        cov_22t2fn0dew.f[0]++;
        cov_22t2fn0dew.s[1]++;

        return queryInterface.createTable('Centers', {
            centerId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            capacity: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            price: {
                type: Sequelize.STRING,
                allowNull: false
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            availability: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'userId'
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
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
    down: function down(queryInterface, Sequelize) {
        cov_22t2fn0dew.f[1]++;
        cov_22t2fn0dew.s[2]++;

        return queryInterface.dropTable('Centers');
    }
};