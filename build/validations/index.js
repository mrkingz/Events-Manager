'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_1a4a8miaxo = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\validations\\index.js',
        hash = '4edc7ca3a8a03ede225a8d9bfd2f83160d474246',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\validations\\index.js',
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

var _userValidations = require('./userValidations');

var _userValidations2 = _interopRequireDefault(_userValidations);

var _centerValidations = require('./centerValidations');

var _centerValidations2 = _interopRequireDefault(_centerValidations);

var _eventValidations = require('./eventValidations');

var _eventValidations2 = _interopRequireDefault(_eventValidations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validations = (cov_1a4a8miaxo.s[0]++, {
    UserValidations: _userValidations2.default,
    CenterValidations: _centerValidations2.default,
    EventValidations: _eventValidations2.default
});

exports.default = validations;