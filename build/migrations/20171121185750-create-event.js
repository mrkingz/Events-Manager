'use strict';

var cov_sehepefla = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\migrations\\20171121185750-create-event.js',
        hash = '84a75e7c786eab306442b6de578f69debc5d1d6c',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\migrations\\20171121185750-create-event.js',
        statementMap: {
            '0': {
                start: {
                    line: 2,
                    column: 0
                },
                end: {
                    line: 68,
                    column: 2
                }
            },
            '1': {
                start: {
                    line: 4,
                    column: 8
                },
                end: {
                    line: 63,
                    column: 11
                }
            },
            '2': {
                start: {
                    line: 66,
                    column: 8
                },
                end: {
                    line: 66,
                    column: 50
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
                        line: 64,
                        column: 5
                    }
                },
                line: 3
            },
            '1': {
                name: '(anonymous_1)',
                decl: {
                    start: {
                        line: 65,
                        column: 10
                    },
                    end: {
                        line: 65,
                        column: 11
                    }
                },
                loc: {
                    start: {
                        line: 65,
                        column: 41
                    },
                    end: {
                        line: 67,
                        column: 5
                    }
                },
                line: 65
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

cov_sehepefla.s[0]++;
module.exports = {
    up: function up(queryInterface, Sequelize) {
        cov_sehepefla.f[0]++;
        cov_sehepefla.s[1]++;

        return queryInterface.createTable('Events', {
            eventId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            date: {
                type: Sequelize.STRING,
                allowNull: false
            },
            time: {
                type: Sequelize.STRING,
                allowNull: false
            },
            estimatedGuests: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            centerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Centers',
                    key: 'centerId'
                },
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'userId'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            approval: {
                type: Sequelize.BOOLEAN,
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
    down: function down(queryInterface, Sequelize) {
        cov_sehepefla.f[1]++;
        cov_sehepefla.s[2]++;

        return queryInterface.dropTable('Events');
    }
};