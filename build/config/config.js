'use strict';

var cov_2gbmie0407 = function () {
    var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\config\\config.js',
        hash = 'dd4ebb5664e3c47cfa170b562489b3085ee524a3',
        global = new Function('return this')(),
        gcv = '__coverage__',
        coverageData = {
        path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\config\\config.js',
        statementMap: {
            '0': {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 25
                }
            },
            '1': {
                start: {
                    line: 19,
                    column: 4
                },
                end: {
                    line: 19,
                    column: 15
                }
            },
            '2': {
                start: {
                    line: 21,
                    column: 0
                },
                end: {
                    line: 41,
                    column: 1
                }
            }
        },
        fnMap: {},
        branchMap: {},
        s: {
            '0': 0,
            '1': 0,
            '2': 0
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

cov_2gbmie0407.s[0]++;
require('dotenv/config');
/**
 * Extract configs from env
 */

var _ref = (cov_2gbmie0407.s[1]++, process.env),
    DB_USERNAME = _ref.DB_USERNAME,
    DB_PASSWORD = _ref.DB_PASSWORD,
    DB_NAME = _ref.DB_NAME,
    DB_HOST = _ref.DB_HOST,
    DB_DIALECT = _ref.DB_DIALECT,
    DB_USERNAME_TEST = _ref.DB_USERNAME_TEST,
    DB_PASSWORD_TEST = _ref.DB_PASSWORD_TEST,
    DB_NAME_TEST = _ref.DB_NAME_TEST,
    DB_HOST_TEST = _ref.DB_HOST_TEST,
    DB_DIALECT_TEST = _ref.DB_DIALECT_TEST;

cov_2gbmie0407.s[2]++;


module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
        dialect: DB_DIALECT
    },
    test: {
        username: DB_USERNAME_TEST,
        password: DB_PASSWORD_TEST,
        database: DB_NAME_TEST,
        host: DB_HOST_TEST,
        dialect: DB_DIALECT_TEST,
        logging: false
    },
    production: {
        use_env_variable: 'URL',
        dialect: 'postgres'
    }
};