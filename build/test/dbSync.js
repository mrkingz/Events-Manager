'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var cov_1q9twt7cub = function () {
	var path = 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\test\\dbSync.js',
	    hash = '7738984bbfc5a8ccda12ae3085954457b2d9cb7d',
	    global = new Function('return this')(),
	    gcv = '__coverage__',
	    coverageData = {
		path: 'C:\\Users\\kingsley\\Desktop\\Events-Manager\\server\\test\\dbSync.js',
		statementMap: {
			'0': {
				start: {
					line: 6,
					column: 2
				},
				end: {
					line: 14,
					column: 4
				}
			},
			'1': {
				start: {
					line: 7,
					column: 3
				},
				end: {
					line: 13,
					column: 5
				}
			},
			'2': {
				start: {
					line: 9,
					column: 4
				},
				end: {
					line: 9,
					column: 15
				}
			},
			'3': {
				start: {
					line: 12,
					column: 4
				},
				end: {
					line: 12,
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
						column: 2
					},
					end: {
						line: 4,
						column: 3
					}
				},
				loc: {
					start: {
						line: 5,
						column: 2
					},
					end: {
						line: 15,
						column: 2
					}
				},
				line: 5
			},
			'1': {
				name: '(anonymous_1)',
				decl: {
					start: {
						line: 6,
						column: 9
					},
					end: {
						line: 6,
						column: 10
					}
				},
				loc: {
					start: {
						line: 6,
						column: 19
					},
					end: {
						line: 14,
						column: 3
					}
				},
				line: 6
			},
			'2': {
				name: '(anonymous_2)',
				decl: {
					start: {
						line: 8,
						column: 9
					},
					end: {
						line: 8,
						column: 10
					}
				},
				loc: {
					start: {
						line: 8,
						column: 15
					},
					end: {
						line: 10,
						column: 4
					}
				},
				line: 8
			},
			'3': {
				name: '(anonymous_3)',
				decl: {
					start: {
						line: 11,
						column: 10
					},
					end: {
						line: 11,
						column: 11
					}
				},
				loc: {
					start: {
						line: 11,
						column: 19
					},
					end: {
						line: 13,
						column: 4
					}
				},
				line: 11
			}
		},
		branchMap: {},
		s: {
			'0': 0,
			'1': 0,
			'2': 0,
			'3': 0
		},
		f: {
			'0': 0,
			'1': 0,
			'2': 0,
			'3': 0
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DBSync = function () {
	function DBSync() {
		_classCallCheck(this, DBSync);
	}

	_createClass(DBSync, null, [{
		key: 'clearDatabase',
		value: function clearDatabase() {
			cov_1q9twt7cub.f[0]++;
			cov_1q9twt7cub.s[0]++;

			before(function (done) {
				cov_1q9twt7cub.f[1]++;
				cov_1q9twt7cub.s[1]++;

				_models2.default.sequelize.sync({ force: true }).then(function () {
					cov_1q9twt7cub.f[2]++;
					cov_1q9twt7cub.s[2]++;

					done(null);
				}).catch(function (error) {
					cov_1q9twt7cub.f[3]++;
					cov_1q9twt7cub.s[3]++;

					done(error);
				});
			});
		}
	}]);

	return DBSync;
}();

exports.default = DBSync;