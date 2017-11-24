'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_vmdnkiepz = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\models\\user.js',
        hash = '805a929cd9668d16cf26c754cbf547485db9b8c2',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\models\\user.js',
        statementMap: {
            '0': {
                start: {
                    line: 5,
                    column: 17
                },
                end: {
                    line: 91,
                    column: 6
                }
            },
            '1': {
                start: {
                    line: 76,
                    column: 12
                },
                end: {
                    line: 80,
                    column: 14
                }
            },
            '2': {
                start: {
                    line: 78,
                    column: 16
                },
                end: {
                    line: 78,
                    column: 37
                }
            },
            '3': {
                start: {
                    line: 79,
                    column: 16
                },
                end: {
                    line: 79,
                    column: 37
                }
            },
            '4': {
                start: {
                    line: 84,
                    column: 12
                },
                end: {
                    line: 88,
                    column: 18
                }
            },
            '5': {
                start: {
                    line: 86,
                    column: 20
                },
                end: {
                    line: 86,
                    column: 41
                }
            },
            '6': {
                start: {
                    line: 87,
                    column: 20
                },
                end: {
                    line: 87,
                    column: 41
                }
            },
            '7': {
                start: {
                    line: 93,
                    column: 4
                },
                end: {
                    line: 110,
                    column: 6
                }
            },
            '8': {
                start: {
                    line: 94,
                    column: 8
                },
                end: {
                    line: 101,
                    column: 10
                }
            },
            '9': {
                start: {
                    line: 102,
                    column: 8
                },
                end: {
                    line: 109,
                    column: 10
                }
            },
            '10': {
                start: {
                    line: 112,
                    column: 4
                },
                end: {
                    line: 112,
                    column: 16
                }
            }
        },
        fnMap: {
            '0': {
                name: '(anonymous_0)',
                decl: {
                    start: {
                        line: 4,
                        column: 15
                    },
                    end: {
                        line: 4,
                        column: 16
                    }
                },
                loc: {
                    start: {
                        line: 4,
                        column: 41
                    },
                    end: {
                        line: 113,
                        column: 1
                    }
                },
                line: 4
            },
            '1': {
                name: '(anonymous_1)',
                decl: {
                    start: {
                        line: 75,
                        column: 22
                    },
                    end: {
                        line: 75,
                        column: 23
                    }
                },
                loc: {
                    start: {
                        line: 75,
                        column: 41
                    },
                    end: {
                        line: 81,
                        column: 9
                    }
                },
                line: 75
            },
            '2': {
                name: '(anonymous_2)',
                decl: {
                    start: {
                        line: 77,
                        column: 18
                    },
                    end: {
                        line: 77,
                        column: 19
                    }
                },
                loc: {
                    start: {
                        line: 77,
                        column: 28
                    },
                    end: {
                        line: 80,
                        column: 13
                    }
                },
                line: 77
            },
            '3': {
                name: '(anonymous_3)',
                decl: {
                    start: {
                        line: 83,
                        column: 22
                    },
                    end: {
                        line: 83,
                        column: 23
                    }
                },
                loc: {
                    start: {
                        line: 83,
                        column: 41
                    },
                    end: {
                        line: 89,
                        column: 13
                    }
                },
                line: 83
            },
            '4': {
                name: '(anonymous_4)',
                decl: {
                    start: {
                        line: 85,
                        column: 22
                    },
                    end: {
                        line: 85,
                        column: 23
                    }
                },
                loc: {
                    start: {
                        line: 85,
                        column: 32
                    },
                    end: {
                        line: 88,
                        column: 17
                    }
                },
                line: 85
            },
            '5': {
                name: '(anonymous_5)',
                decl: {
                    start: {
                        line: 93,
                        column: 21
                    },
                    end: {
                        line: 93,
                        column: 22
                    }
                },
                loc: {
                    start: {
                        line: 93,
                        column: 33
                    },
                    end: {
                        line: 110,
                        column: 5
                    }
                },
                line: 93
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
            '6': 0,
            '7': 0,
            '8': 0,
            '9': 0,
            '10': 0
        },
        f: {
            '0': 0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0
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

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _ValidationService = require('../services/ValidationService');

var _ValidationService2 = _interopRequireDefault(_ValidationService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
    cov_vmdnkiepz.f[0]++;

    var User = (cov_vmdnkiepz.s[0]++, sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email has been used'
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Email is equired!'
                },
                isEmail: {
                    args: true,
                    msg: 'Invalid email address!'
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username is not available'
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Username is required!'
                },
                len: {
                    args: [3, 25],
                    msg: 'Username must be between 3 to 25 characters long'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Password is required!'
                },
                len: {
                    args: [8, 25],
                    msg: 'Password must be at least 8 characters long'
                }
            }
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Role cannot be empty'
                }
            }
        }
    }, {
        hooks: {
            beforeCreate: function beforeCreate(user, options) {
                cov_vmdnkiepz.f[1]++;
                cov_vmdnkiepz.s[1]++;

                return _bcrypt2.default.hash(user.password, 10).then(function (hash) {
                    cov_vmdnkiepz.f[2]++;
                    cov_vmdnkiepz.s[2]++;

                    user.password = hash;
                    cov_vmdnkiepz.s[3]++;
                    return user.password;
                });
            },

            beforeUpdate: function beforeUpdate(user, options) {
                cov_vmdnkiepz.f[3]++;
                cov_vmdnkiepz.s[4]++;

                return _bcrypt2.default.hash(user.password, 10).then(function (hash) {
                    cov_vmdnkiepz.f[4]++;
                    cov_vmdnkiepz.s[5]++;

                    user.password = hash;
                    cov_vmdnkiepz.s[6]++;
                    return user.password;
                });
            }
        }
    }));

    cov_vmdnkiepz.s[7]++;
    User.associate = function (models) {
        cov_vmdnkiepz.f[5]++;
        cov_vmdnkiepz.s[8]++;

        User.hasMany(models.Center, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }
        });
        cov_vmdnkiepz.s[9]++;
        User.hasMany(models.Event, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            }
        });
    };

    cov_vmdnkiepz.s[10]++;
    return User;
};