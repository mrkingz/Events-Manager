'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_za1s9lq86 = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\routes\\index.js',
        hash = '5cf908e714df726bc779f175e7475298623f5ee8',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\routes\\index.js',
        statementMap: {
            '0': {
                start: {
                    line: 5,
                    column: 15
                },
                end: {
                    line: 9,
                    column: 1
                }
            }
        },
        fnMap: {},
        branchMap: {},
        s: {
            '0': 0
        },
        f: {},
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

var _authRoutes = require('./authRoutes');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _centerRoutes = require('./centerRoutes');

var _centerRoutes2 = _interopRequireDefault(_centerRoutes);

var _eventRoutes = require('./eventRoutes');

var _eventRoutes2 = _interopRequireDefault(_eventRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (cov_za1s9lq86.s[0]++, {
    authRoutes: _authRoutes2.default,
    centerRoutes: _centerRoutes2.default,
    eventRoutes: _eventRoutes2.default
});

exports.default = routes;