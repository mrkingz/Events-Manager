'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_11oa9o3cs7 = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\app.js',
        hash = 'ce9c9065f17fbe844de63e75cb9dc50a82f276cf',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\app.js',
        statementMap: {
            '0': {
                start: {
                    line: 9,
                    column: 0
                },
                end: {
                    line: 9,
                    column: 16
                }
            },
            '1': {
                start: {
                    line: 10,
                    column: 12
                },
                end: {
                    line: 10,
                    column: 21
                }
            },
            '2': {
                start: {
                    line: 12,
                    column: 0
                },
                end: {
                    line: 12,
                    column: 23
                }
            },
            '3': {
                start: {
                    line: 14,
                    column: 0
                },
                end: {
                    line: 14,
                    column: 44
                }
            },
            '4': {
                start: {
                    line: 15,
                    column: 0
                },
                end: {
                    line: 15,
                    column: 67
                }
            },
            '5': {
                start: {
                    line: 16,
                    column: 0
                },
                end: {
                    line: 16,
                    column: 24
                }
            },
            '6': {
                start: {
                    line: 18,
                    column: 0
                },
                end: {
                    line: 18,
                    column: 27
                }
            },
            '7': {
                start: {
                    line: 19,
                    column: 0
                },
                end: {
                    line: 19,
                    column: 29
                }
            },
            '8': {
                start: {
                    line: 20,
                    column: 0
                },
                end: {
                    line: 20,
                    column: 28
                }
            },
            '9': {
                start: {
                    line: 22,
                    column: 0
                },
                end: {
                    line: 24,
                    column: 3
                }
            },
            '10': {
                start: {
                    line: 23,
                    column: 4
                },
                end: {
                    line: 23,
                    column: 44
                }
            }
        },
        fnMap: {
            '0': {
                name: '(anonymous_0)',
                decl: {
                    start: {
                        line: 22,
                        column: 13
                    },
                    end: {
                        line: 22,
                        column: 14
                    }
                },
                loc: {
                    start: {
                        line: 22,
                        column: 27
                    },
                    end: {
                        line: 24,
                        column: 1
                    }
                },
                line: 22
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
            '0': 0
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

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cov_11oa9o3cs7.s[0]++;


_dotenv2.default.config();
var app = (cov_11oa9o3cs7.s[1]++, (0, _express2.default)());

cov_11oa9o3cs7.s[2]++;
app.use((0, _morgan2.default)('dev'));

cov_11oa9o3cs7.s[3]++;
app.use(_bodyParser2.default.json({ limit: '10mb' }));
cov_11oa9o3cs7.s[4]++;
app.use(_bodyParser2.default.urlencoded({ limit: '10mb', extended: false }));
cov_11oa9o3cs7.s[5]++;
app.use((0, _cookieParser2.default)());

cov_11oa9o3cs7.s[6]++;
app.use(_routes2.default.authRoutes);
cov_11oa9o3cs7.s[7]++;
app.use(_routes2.default.centerRoutes);
cov_11oa9o3cs7.s[8]++;
app.use(_routes2.default.eventRoutes);

cov_11oa9o3cs7.s[9]++;
app.all('*', function (req, res) {
    cov_11oa9o3cs7.f[0]++;
    cov_11oa9o3cs7.s[10]++;

    res.send('Oops! Request not supported.');
});

exports.default = app;