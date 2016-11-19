"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Selection = exports.reducer = exports.ACTION = undefined;

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTION = exports.ACTION = {
	SELECT: function SELECT(start, at) {
		var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : start;
		var endAt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : at;
		return {
			type: "selected",
			payload: {
				start: {
					id: start,
					at: at
				},
				end: {
					id: end,
					at: endAt
				}
			}
		};
	}
};
var INIT_STATE = {
	start: {
		id: 0,
		at: 0
	},
	end: {
		id: 0,
		at: 0
	}
};
var reducer = exports.reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case "selected":
			return (0, _extends3.default)({}, state, payload);
	}
	return state;
};

var Selection = exports.Selection = function (_Component) {
	(0, _inherits3.default)(Selection, _Component);

	function Selection() {
		(0, _classCallCheck3.default)(this, Selection);
		return (0, _possibleConstructorReturn3.default)(this, (Selection.__proto__ || (0, _getPrototypeOf2.default)(Selection)).apply(this, arguments));
	}

	(0, _createClass3.default)(Selection, [{
		key: "render",
		value: function render() {
			return null;
		}
	}]);
	return Selection;
}(_react.Component);

exports.default = Selection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbIkFDVElPTiIsIlNFTEVDVCIsInN0YXJ0IiwiYXQiLCJlbmQiLCJlbmRBdCIsInR5cGUiLCJwYXlsb2FkIiwiaWQiLCJJTklUX1NUQVRFIiwicmVkdWNlciIsInN0YXRlIiwiU2VsZWN0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztBQUVPLElBQU1BLDBCQUFPO0FBQ25CQyxTQUFRLGdCQUFDQyxLQUFELEVBQVFDLEVBQVI7QUFBQSxNQUFZQyxHQUFaLHVFQUFnQkYsS0FBaEI7QUFBQSxNQUF1QkcsS0FBdkIsdUVBQTZCRixFQUE3QjtBQUFBLFNBQW1DO0FBQzFDRyxTQUFLLFVBRHFDO0FBRXpDQyxZQUFTO0FBQ1RMLFdBQU07QUFDTE0sU0FBR04sS0FERTtBQUVKQztBQUZJLEtBREc7QUFLUkMsU0FBSTtBQUNKSSxTQUFHSixHQURDO0FBRUhELFNBQUdFO0FBRkE7QUFMSTtBQUZnQyxHQUFuQztBQUFBO0FBRFcsQ0FBYjtBQWVQLElBQU1JLGFBQVc7QUFDaEJQLFFBQU07QUFDTE0sTUFBRyxDQURFO0FBRUpMLE1BQUc7QUFGQyxFQURVO0FBS2ZDLE1BQUk7QUFDSkksTUFBRyxDQURDO0FBRUhMLE1BQUc7QUFGQTtBQUxXLENBQWpCO0FBVU8sSUFBTU8sNEJBQVEsU0FBUkEsT0FBUSxHQUFvQztBQUFBLEtBQW5DQyxLQUFtQyx1RUFBN0JGLFVBQTZCO0FBQUE7QUFBQSxLQUFoQkgsSUFBZ0IsUUFBaEJBLElBQWdCO0FBQUEsS0FBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUN4RCxTQUFPRCxJQUFQO0FBQ0EsT0FBSyxVQUFMO0FBQ0MscUNBQVlLLEtBQVosRUFBc0JKLE9BQXRCO0FBRkQ7QUFJQSxRQUFPSSxLQUFQO0FBQ0EsQ0FOTTs7SUFRTUMsUyxXQUFBQSxTOzs7Ozs7Ozs7OzJCQUNKO0FBQ1AsVUFBTyxJQUFQO0FBQ0E7Ozs7O2tCQUdhQSxTIiwiZmlsZSI6InNlbGVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0U0VMRUNUOiAoc3RhcnQsIGF0LCBlbmQ9c3RhcnQsIGVuZEF0PWF0KT0+KHtcblx0XHR0eXBlOlwic2VsZWN0ZWRcIlxuXHRcdCxwYXlsb2FkOiB7XG5cdFx0XHRzdGFydDp7XG5cdFx0XHRcdGlkOnN0YXJ0XG5cdFx0XHRcdCxhdFxuXHRcdFx0fVxuXHRcdFx0LGVuZDp7XG5cdFx0XHRcdGlkOmVuZFxuXHRcdFx0XHQsYXQ6ZW5kQXRcblx0XHRcdH1cblx0XHR9XG5cdH0pXG59XG5jb25zdCBJTklUX1NUQVRFPXtcblx0c3RhcnQ6e1xuXHRcdGlkOjBcblx0XHQsYXQ6MFxuXHR9XG5cdCxlbmQ6e1xuXHRcdGlkOjBcblx0XHQsYXQ6MFxuXHR9XG59XG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGU9SU5JVF9TVEFURSwge3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBcInNlbGVjdGVkXCI6XG5cdFx0cmV0dXJuICh7Li4uc3RhdGUsIC4uLnBheWxvYWR9KVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4gbnVsbFxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGlvblxuIl19