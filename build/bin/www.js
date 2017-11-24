'use strict';

var cov_1rlyccqrd1 = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\bin\\www.js',
        hash = '8c848cd0afc5243a60eaee09a380baada8210fd0',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\bin\\www.js',
        statementMap: {
            '0': {
                start: {
                    line: 8,
                    column: 13
                },
                end: {
                    line: 8,
                    column: 51
                }
            },
            '1': {
                start: {
                    line: 10,
                    column: 0
                },
                end: {
                    line: 10,
                    column: 22
                }
            },
            '2': {
                start: {
                    line: 12,
                    column: 15
                },
                end: {
                    line: 12,
                    column: 37
                }
            },
            '3': {
                start: {
                    line: 13,
                    column: 0
                },
                end: {
                    line: 15,
                    column: 3
                }
            },
            '4': {
                start: {
                    line: 14,
                    column: 4
                },
                end: {
                    line: 14,
                    column: 48
                }
            }
        },
        fnMap: {
            '0': {
                name: '(anonymous_0)',
                decl: {
                    start: {
                        line: 13,
                        column: 20
                    },
                    end: {
                        line: 13,
                        column: 21
                    }
                },
                loc: {
                    start: {
                        line: 13,
                        column: 26
                    },
                    end: {
                        line: 15,
                        column: 1
                    }
                },
                line: 13
            }
        },
        branchMap: {
            '0': {
                loc: {
                    start: {
                        line: 8,
                        column: 13
                    },
                    end: {
                        line: 8,
                        column: 51
                    }
                },
                type: 'binary-expr',
                locations: [{
                    start: {
                        line: 8,
                        column: 13
                    },
                    end: {
                        line: 8,
                        column: 43
                    }
                }, {
                    start: {
                        line: 8,
                        column: 47
                    },
                    end: {
                        line: 8,
                        column: 51
                    }
                }],
                line: 8
            }
        },
        s: {
            '0': 0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0
        },
        f: {
            '0': 0
        },
        b: {
            '0': [0, 0]
        },
        _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
    },
        coverage = global[gcv] || (global[gcv] = {});

    if (coverage[path] && coverage[path].hash === hash) {
        return coverage[path];
    }

    coverageData.hash = hash;
    return coverage[path] = coverageData;
}(); // We use this as application entry
// Here, we also setup our server

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = (cov_1rlyccqrd1.s[0]++, (cov_1rlyccqrd1.b[0][0]++, parseInt(process.env.PORT, 10)) || (cov_1rlyccqrd1.b[0][1]++, 5000));

cov_1rlyccqrd1.s[1]++;
_app2.default.set('port', port); //Set the port

var server = (cov_1rlyccqrd1.s[2]++, _http2.default.createServer(_app2.default));
cov_1rlyccqrd1.s[3]++;
server.listen(port, function () {
    cov_1rlyccqrd1.f[0]++;
    cov_1rlyccqrd1.s[4]++;

    console.log('Server started at port ' + port);
});