'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_72wez8ex4 = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\controllers\\index.js',
        hash = '18cfe01e7d2f8b6be99d05da7832988b683cccfb',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\controllers\\index.js',
        statementMap: {
            '0': {
                start: {
                    line: 5,
                    column: 20
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

var _userController = require('./userController');

var _userController2 = _interopRequireDefault(_userController);

var _centerController = require('./centerController');

var _centerController2 = _interopRequireDefault(_centerController);

var _eventController = require('./eventController');

var _eventController2 = _interopRequireDefault(_eventController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllers = (cov_72wez8ex4.s[0]++, {
    CenterController: _centerController2.default,
    UserController: _userController2.default,
    EventController: _eventController2.default
});

exports.default = controllers;