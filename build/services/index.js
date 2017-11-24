'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_927brw6du = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\services\\index.js',
        hash = 'e1d85ddab9ffe0067401bfa4698af600a03a3d14',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\services\\index.js',
        statementMap: {
            '0': {
                start: {
                    line: 5,
                    column: 17
                },
                end: {
                    line: 10,
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

var _authenticationService = require('./authenticationService');

var _authenticationService2 = _interopRequireDefault(_authenticationService);

var _modelService = require('./modelService');

var _modelService2 = _interopRequireDefault(_modelService);

var _utilityService = require('./utilityService');

var _utilityService2 = _interopRequireDefault(_utilityService);

var _validationService = require('./validationService');

var _validationService2 = _interopRequireDefault(_validationService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var services = (cov_927brw6du.s[0]++, {
    AuthenticationService: _authenticationService2.default,
    ModelService: _modelService2.default,
    UtilityService: _utilityService2.default,
    ValidationService: _validationService2.default
});
exports.default = services;