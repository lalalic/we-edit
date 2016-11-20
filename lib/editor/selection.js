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

var DOMAIN = "selection";
var ACTION = exports.ACTION = {
	SELECT: function SELECT(start, at) {
		var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : start;
		var endAt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : at;
		return {
			type: DOMAIN + "/selected",
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
	},
	MOVE_RIGHT: function MOVE_RIGHT(a) {
		return { type: DOMAIN + "/MOVE_RIGHT" };
	},
	MOVE_LEFT: function MOVE_LEFT(a) {
		return { type: DOMAIN + "/MOVE_LEFT" };
	},
	MOVE_UP: function MOVE_UP(a) {
		return { type: DOMAIN + "/MOVE_UP" };
	},
	MOVE_DOWN: function MOVE_DOWN(a) {
		return { type: DOMAIN + "/MOVE_DOWN" };
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
		case DOMAIN + "/selected":
			return (0, _extends3.default)({}, state, payload);
		case DOMAIN + "/MOVE_DOWN":
		case DOMAIN + "/MOVE_RIGHT":
			{
				var _state$start = state.start,
				    id = _state$start.id,
				    at = _state$start.at,
				    end = state.end;

				at++;
				return { start: { id: id, at: at }, end: { id: id, at: at } };
			}
		case DOMAIN + "/MOVE_UP":
		case DOMAIN + "/MOVE_LEFT":
			{
				var _state$start2 = state.start,
				    _id = _state$start2.id,
				    _at = _state$start2.at,
				    _end = state.end;

				_at--;
				return { start: { id: _id, at: _at }, end: { id: _id, at: _at } };
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIlNFTEVDVCIsInN0YXJ0IiwiYXQiLCJlbmQiLCJlbmRBdCIsInR5cGUiLCJwYXlsb2FkIiwiaWQiLCJNT1ZFX1JJR0hUIiwiTU9WRV9MRUZUIiwiTU9WRV9VUCIsIk1PVkVfRE9XTiIsIklOSVRfU1RBVEUiLCJyZWR1Y2VyIiwic3RhdGUiLCJTZWxlY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBTUEsU0FBTyxXQUFiO0FBQ08sSUFBTUMsMEJBQU87QUFDbkJDLFNBQVEsZ0JBQUNDLEtBQUQsRUFBUUMsRUFBUjtBQUFBLE1BQVlDLEdBQVosdUVBQWdCRixLQUFoQjtBQUFBLE1BQXVCRyxLQUF2Qix1RUFBNkJGLEVBQTdCO0FBQUEsU0FBbUM7QUFDMUNHLFNBQVFQLE1BQVIsY0FEMEM7QUFFekNRLFlBQVM7QUFDVEwsV0FBTTtBQUNMTSxTQUFHTixLQURFO0FBRUpDO0FBRkksS0FERztBQUtSQyxTQUFJO0FBQ0pJLFNBQUdKLEdBREM7QUFFSEQsU0FBR0U7QUFGQTtBQUxJO0FBRmdDLEdBQW5DO0FBQUEsRUFEVztBQWNsQkksYUFBWTtBQUFBLFNBQUksRUFBQ0gsTUFBUVAsTUFBUixnQkFBRCxFQUFKO0FBQUEsRUFkTTtBQWVsQlcsWUFBVztBQUFBLFNBQUksRUFBQ0osTUFBUVAsTUFBUixlQUFELEVBQUo7QUFBQSxFQWZPO0FBZ0JsQlksVUFBUztBQUFBLFNBQUksRUFBQ0wsTUFBUVAsTUFBUixhQUFELEVBQUo7QUFBQSxFQWhCUztBQWlCbEJhLFlBQVc7QUFBQSxTQUFJLEVBQUNOLE1BQVFQLE1BQVIsZUFBRCxFQUFKO0FBQUE7O0FBakJPLENBQWI7QUFvQlAsSUFBTWMsYUFBVztBQUNoQlgsUUFBTTtBQUNMTSxNQUFHLENBREU7QUFFSkwsTUFBRztBQUZDLEVBRFU7QUFLZkMsTUFBSTtBQUNKSSxNQUFHLENBREM7QUFFSEwsTUFBRztBQUZBO0FBTFcsQ0FBakI7QUFVTyxJQUFNVyw0QkFBUSxTQUFSQSxPQUFRLEdBQW9DO0FBQUEsS0FBbkNDLEtBQW1DLHVFQUE3QkYsVUFBNkI7QUFBQTtBQUFBLEtBQWhCUCxJQUFnQixRQUFoQkEsSUFBZ0I7QUFBQSxLQUFYQyxPQUFXLFFBQVhBLE9BQVc7O0FBQ3hELFNBQU9ELElBQVA7QUFDQSxPQUFRUCxNQUFSO0FBQ0MscUNBQVlnQixLQUFaLEVBQXNCUixPQUF0QjtBQUNELE9BQVFSLE1BQVI7QUFDQSxPQUFRQSxNQUFSO0FBQTRCO0FBQUEsdUJBQ0ZnQixLQURFLENBQ3JCYixLQURxQjtBQUFBLFFBQ2RNLEVBRGMsZ0JBQ2RBLEVBRGM7QUFBQSxRQUNYTCxFQURXLGdCQUNYQSxFQURXO0FBQUEsUUFDUEMsR0FETyxHQUNGVyxLQURFLENBQ1BYLEdBRE87O0FBRTFCRDtBQUNBLFdBQU8sRUFBQ0QsT0FBTSxFQUFDTSxNQUFELEVBQUlMLE1BQUosRUFBUCxFQUFnQkMsS0FBSSxFQUFDSSxNQUFELEVBQUlMLE1BQUosRUFBcEIsRUFBUDtBQUNBO0FBQ0YsT0FBUUosTUFBUjtBQUNBLE9BQVFBLE1BQVI7QUFBMkI7QUFBQSx3QkFDRGdCLEtBREMsQ0FDcEJiLEtBRG9CO0FBQUEsUUFDYk0sR0FEYSxpQkFDYkEsRUFEYTtBQUFBLFFBQ1ZMLEdBRFUsaUJBQ1ZBLEVBRFU7QUFBQSxRQUNOQyxJQURNLEdBQ0RXLEtBREMsQ0FDTlgsR0FETTs7QUFFekJEO0FBQ0EsV0FBTyxFQUFDRCxPQUFNLEVBQUNNLE9BQUQsRUFBSUwsT0FBSixFQUFQLEVBQWdCQyxLQUFJLEVBQUNJLE9BQUQsRUFBSUwsT0FBSixFQUFwQixFQUFQO0FBQ0E7QUFkRjtBQWdCQSxRQUFPWSxLQUFQO0FBQ0EsQ0FsQk07O0lBb0JNQyxTLFdBQUFBLFM7Ozs7Ozs7Ozs7MkJBQ0o7QUFDUCxVQUFPLElBQVA7QUFDQTs7Ozs7a0JBR2FBLFMiLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5cbmNvbnN0IERPTUFJTj1cInNlbGVjdGlvblwiXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0U0VMRUNUOiAoc3RhcnQsIGF0LCBlbmQ9c3RhcnQsIGVuZEF0PWF0KT0+KHtcblx0XHR0eXBlOmAke0RPTUFJTn0vc2VsZWN0ZWRgXG5cdFx0LHBheWxvYWQ6IHtcblx0XHRcdHN0YXJ0Ontcblx0XHRcdFx0aWQ6c3RhcnRcblx0XHRcdFx0LGF0XG5cdFx0XHR9XG5cdFx0XHQsZW5kOntcblx0XHRcdFx0aWQ6ZW5kXG5cdFx0XHRcdCxhdDplbmRBdFxuXHRcdFx0fVxuXHRcdH1cblx0fSlcblx0LE1PVkVfUklHSFQ6IGE9Pih7dHlwZTpgJHtET01BSU59L01PVkVfUklHSFRgfSlcblx0LE1PVkVfTEVGVDogYT0+KHt0eXBlOmAke0RPTUFJTn0vTU9WRV9MRUZUYH0pXG5cdCxNT1ZFX1VQOiBhPT4oe3R5cGU6YCR7RE9NQUlOfS9NT1ZFX1VQYH0pXG5cdCxNT1ZFX0RPV046IGE9Pih7dHlwZTpgJHtET01BSU59L01PVkVfRE9XTmB9KVxuXG59XG5jb25zdCBJTklUX1NUQVRFPXtcblx0c3RhcnQ6e1xuXHRcdGlkOjBcblx0XHQsYXQ6MFxuXHR9XG5cdCxlbmQ6e1xuXHRcdGlkOjBcblx0XHQsYXQ6MFxuXHR9XG59XG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGU9SU5JVF9TVEFURSwge3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgJHtET01BSU59L3NlbGVjdGVkYDpcblx0XHRyZXR1cm4gKHsuLi5zdGF0ZSwgLi4ucGF5bG9hZH0pXG5cdGNhc2UgYCR7RE9NQUlOfS9NT1ZFX0RPV05gOlxuXHRjYXNlIGAke0RPTUFJTn0vTU9WRV9SSUdIVGA6e1xuXHRcdFx0bGV0IHtzdGFydDp7aWQsYXR9LGVuZH09c3RhdGVcblx0XHRcdGF0Kytcblx0XHRcdHJldHVybiB7c3RhcnQ6e2lkLGF0fSwgZW5kOntpZCxhdH19XG5cdFx0fVxuXHRjYXNlIGAke0RPTUFJTn0vTU9WRV9VUGA6XG5cdGNhc2UgYCR7RE9NQUlOfS9NT1ZFX0xFRlRgOntcblx0XHRcdGxldCB7c3RhcnQ6e2lkLGF0fSxlbmR9PXN0YXRlXG5cdFx0XHRhdC0tXG5cdFx0XHRyZXR1cm4ge3N0YXJ0OntpZCxhdH0sIGVuZDp7aWQsYXR9fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbiBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3Rpb25cbiJdfQ==