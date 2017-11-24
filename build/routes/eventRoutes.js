'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var cov_2o7smk4md9 = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\routes\\eventRoutes.js',
        hash = 'fee8423464db5c9a13955a3dcb66ca38645d28d8',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\routes\\eventRoutes.js',
        statementMap: {
            '0': {
                start: {
                    line: 6,
                    column: 62
                },
                end: {
                    line: 6,
                    column: 73
                }
            },
            '1': {
                start: {
                    line: 7,
                    column: 30
                },
                end: {
                    line: 7,
                    column: 38
                }
            },
            '2': {
                start: {
                    line: 8,
                    column: 29
                },
                end: {
                    line: 8,
                    column: 40
                }
            },
            '3': {
                start: {
                    line: 9,
                    column: 20
                },
                end: {
                    line: 9,
                    column: 36
                }
            },
            '4': {
                start: {
                    line: 11,
                    column: 0
                },
                end: {
                    line: 18,
                    column: 33
                }
            },
            '5': {
                start: {
                    line: 20,
                    column: 0
                },
                end: {
                    line: 29,
                    column: 34
                }
            }
        },
        fnMap: {},
        branchMap: {},
        s: {
            '0': 0,
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0
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

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _services = require('../services');

var _services2 = _interopRequireDefault(_services);

var _validations = require('../validations');

var _validations2 = _interopRequireDefault(_validations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (cov_2o7smk4md9.s[0]++, _controllers2.default),
    EventController = _ref.EventController,
    UserController = _ref.UserController,
    CenterController = _ref.CenterController,
    _ref2 = (cov_2o7smk4md9.s[1]++, _services2.default),
    ValidationService = _ref2.ValidationService,
    _ref3 = (cov_2o7smk4md9.s[2]++, _validations2.default),
    EventValidations = _ref3.EventValidations,
    eventRouter = (cov_2o7smk4md9.s[3]++, _express2.default.Router());

cov_2o7smk4md9.s[4]++;


eventRouter.route('/api/v1/events').all(UserController.validateUserAccess()).post(EventValidations.validateEvent(), EventValidations.isExistEvent(), CenterController.vaildateCapacity(), CenterController.isCenterAvailable(), EventController.createEvent()).get(EventController.getEvents());

cov_2o7smk4md9.s[5]++;
eventRouter.route('/api/v1/events/:eventId').all(UserController.validateUserAccess(), ValidationService.isValidIntegerURI()).get(EventController.getEvent()).delete(EventController.deleteEvent()).put(EventValidations.validateEvent(), CenterController.isValidCenter(), CenterController.vaildateCapacity(), CenterController.isCenterAvailable(), EventController.updateEvent());

exports.default = eventRouter;