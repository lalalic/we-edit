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

var _selector = require("./selector");

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

				var target = (0, _selector.getContent)(id);
				var text = target.getContent();
				if (text.length > at + 1) {
					at++;
				} else {
					target = (0, _selector.getNextTextOf)(id);
					if (target) {
						id = target.id;
						at = 0;
					} else {
						//keep cursor at end of current target
					}
				}
				return { start: { id: id, at: at }, end: { id: id, at: at } };
			}
		case DOMAIN + "/MOVE_UP":
		case DOMAIN + "/MOVE_LEFT":
			{
				var _state$start2 = state.start,
				    _id = _state$start2.id,
				    _at = _state$start2.at,
				    _end = state.end;

				if (_at > 0) {
					_at--;
				} else {
					var _target = (0, _selector.getPrevTextOf)(_id);
					if (_target) {
						_id = _target.id;
						_at = _target.getContent().length - 1;
					} else {
						//keep cursor at end of current target
					}
				}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3Ivc2VsZWN0aW9uLmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsIkFDVElPTiIsIlNFTEVDVCIsInN0YXJ0IiwiYXQiLCJlbmQiLCJlbmRBdCIsInR5cGUiLCJwYXlsb2FkIiwiaWQiLCJNT1ZFX1JJR0hUIiwiTU9WRV9MRUZUIiwiTU9WRV9VUCIsIk1PVkVfRE9XTiIsIklOSVRfU1RBVEUiLCJyZWR1Y2VyIiwic3RhdGUiLCJ0YXJnZXQiLCJ0ZXh0IiwiZ2V0Q29udGVudCIsImxlbmd0aCIsIlNlbGVjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNQSxTQUFPLFdBQWI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsU0FBUSxnQkFBQ0MsS0FBRCxFQUFRQyxFQUFSO0FBQUEsTUFBWUMsR0FBWix1RUFBZ0JGLEtBQWhCO0FBQUEsTUFBdUJHLEtBQXZCLHVFQUE2QkYsRUFBN0I7QUFBQSxTQUFtQztBQUMxQ0csU0FBUVAsTUFBUixjQUQwQztBQUV6Q1EsWUFBUztBQUNUTCxXQUFNO0FBQ0xNLFNBQUdOLEtBREU7QUFFSkM7QUFGSSxLQURHO0FBS1JDLFNBQUk7QUFDSkksU0FBR0osR0FEQztBQUVIRCxTQUFHRTtBQUZBO0FBTEk7QUFGZ0MsR0FBbkM7QUFBQSxFQURXO0FBY2xCSSxhQUFZO0FBQUEsU0FBSSxFQUFDSCxNQUFRUCxNQUFSLGdCQUFELEVBQUo7QUFBQSxFQWRNO0FBZWxCVyxZQUFXO0FBQUEsU0FBSSxFQUFDSixNQUFRUCxNQUFSLGVBQUQsRUFBSjtBQUFBLEVBZk87QUFnQmxCWSxVQUFTO0FBQUEsU0FBSSxFQUFDTCxNQUFRUCxNQUFSLGFBQUQsRUFBSjtBQUFBLEVBaEJTO0FBaUJsQmEsWUFBVztBQUFBLFNBQUksRUFBQ04sTUFBUVAsTUFBUixlQUFELEVBQUo7QUFBQTs7QUFqQk8sQ0FBYjtBQW9CUCxJQUFNYyxhQUFXO0FBQ2hCWCxRQUFNO0FBQ0xNLE1BQUcsQ0FERTtBQUVKTCxNQUFHO0FBRkMsRUFEVTtBQUtmQyxNQUFJO0FBQ0pJLE1BQUcsQ0FEQztBQUVITCxNQUFHO0FBRkE7QUFMVyxDQUFqQjtBQVVPLElBQU1XLDRCQUFRLFNBQVJBLE9BQVEsR0FBb0M7QUFBQSxLQUFuQ0MsS0FBbUMsdUVBQTdCRixVQUE2QjtBQUFBO0FBQUEsS0FBaEJQLElBQWdCLFFBQWhCQSxJQUFnQjtBQUFBLEtBQVhDLE9BQVcsUUFBWEEsT0FBVzs7QUFDeEQsU0FBT0QsSUFBUDtBQUNBLE9BQVFQLE1BQVI7QUFDQyxxQ0FBWWdCLEtBQVosRUFBc0JSLE9BQXRCO0FBQ0QsT0FBUVIsTUFBUjtBQUNBLE9BQVFBLE1BQVI7QUFBNEI7QUFBQSx1QkFDRmdCLEtBREUsQ0FDckJiLEtBRHFCO0FBQUEsUUFDZE0sRUFEYyxnQkFDZEEsRUFEYztBQUFBLFFBQ1hMLEVBRFcsZ0JBQ1hBLEVBRFc7QUFBQSxRQUNQQyxHQURPLEdBQ0ZXLEtBREUsQ0FDUFgsR0FETzs7QUFFMUIsUUFBSVksU0FBTywwQkFBV1IsRUFBWCxDQUFYO0FBQ0EsUUFBTVMsT0FBS0QsT0FBT0UsVUFBUCxFQUFYO0FBQ0EsUUFBR0QsS0FBS0UsTUFBTCxHQUFZaEIsS0FBRyxDQUFsQixFQUFvQjtBQUNuQkE7QUFDQSxLQUZELE1BRUs7QUFDSmEsY0FBTyw2QkFBY1IsRUFBZCxDQUFQO0FBQ0EsU0FBR1EsTUFBSCxFQUFVO0FBQ1RSLFdBQUdRLE9BQU9SLEVBQVY7QUFDQUwsV0FBRyxDQUFIO0FBQ0EsTUFIRCxNQUdLO0FBQ0o7QUFDQTtBQUNEO0FBQ0QsV0FBTyxFQUFDRCxPQUFNLEVBQUNNLE1BQUQsRUFBSUwsTUFBSixFQUFQLEVBQWdCQyxLQUFJLEVBQUNJLE1BQUQsRUFBSUwsTUFBSixFQUFwQixFQUFQO0FBQ0E7QUFDRixPQUFRSixNQUFSO0FBQ0EsT0FBUUEsTUFBUjtBQUEyQjtBQUFBLHdCQUNEZ0IsS0FEQyxDQUNwQmIsS0FEb0I7QUFBQSxRQUNiTSxHQURhLGlCQUNiQSxFQURhO0FBQUEsUUFDVkwsR0FEVSxpQkFDVkEsRUFEVTtBQUFBLFFBQ05DLElBRE0sR0FDRFcsS0FEQyxDQUNOWCxHQURNOztBQUV6QixRQUFHRCxNQUFHLENBQU4sRUFBUTtBQUNQQTtBQUNBLEtBRkQsTUFFSztBQUNKLFNBQUlhLFVBQU8sNkJBQWNSLEdBQWQsQ0FBWDtBQUNBLFNBQUdRLE9BQUgsRUFBVTtBQUNUUixZQUFHUSxRQUFPUixFQUFWO0FBQ0FMLFlBQUdhLFFBQU9FLFVBQVAsR0FBb0JDLE1BQXBCLEdBQTJCLENBQTlCO0FBQ0EsTUFIRCxNQUdLO0FBQ0o7QUFDQTtBQUNEO0FBQ0QsV0FBTyxFQUFDakIsT0FBTSxFQUFDTSxPQUFELEVBQUlMLE9BQUosRUFBUCxFQUFnQkMsS0FBSSxFQUFDSSxPQUFELEVBQUlMLE9BQUosRUFBcEIsRUFBUDtBQUNBO0FBcENGO0FBc0NBLFFBQU9ZLEtBQVA7QUFDQSxDQXhDTTs7SUEwQ01LLFMsV0FBQUEsUzs7Ozs7Ozs7OzsyQkFDSjtBQUNQLFVBQU8sSUFBUDtBQUNBOzs7OztrQkFHYUEsUyIsImZpbGUiOiJzZWxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Z2V0Q29udGVudCwgZ2V0TmV4dFRleHRPZiwgZ2V0UHJldlRleHRPZn0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuXG5jb25zdCBET01BSU49XCJzZWxlY3Rpb25cIlxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdFNFTEVDVDogKHN0YXJ0LCBhdCwgZW5kPXN0YXJ0LCBlbmRBdD1hdCk9Pih7XG5cdFx0dHlwZTpgJHtET01BSU59L3NlbGVjdGVkYFxuXHRcdCxwYXlsb2FkOiB7XG5cdFx0XHRzdGFydDp7XG5cdFx0XHRcdGlkOnN0YXJ0XG5cdFx0XHRcdCxhdFxuXHRcdFx0fVxuXHRcdFx0LGVuZDp7XG5cdFx0XHRcdGlkOmVuZFxuXHRcdFx0XHQsYXQ6ZW5kQXRcblx0XHRcdH1cblx0XHR9XG5cdH0pXG5cdCxNT1ZFX1JJR0hUOiBhPT4oe3R5cGU6YCR7RE9NQUlOfS9NT1ZFX1JJR0hUYH0pXG5cdCxNT1ZFX0xFRlQ6IGE9Pih7dHlwZTpgJHtET01BSU59L01PVkVfTEVGVGB9KVxuXHQsTU9WRV9VUDogYT0+KHt0eXBlOmAke0RPTUFJTn0vTU9WRV9VUGB9KVxuXHQsTU9WRV9ET1dOOiBhPT4oe3R5cGU6YCR7RE9NQUlOfS9NT1ZFX0RPV05gfSlcblxufVxuY29uc3QgSU5JVF9TVEFURT17XG5cdHN0YXJ0Ontcblx0XHRpZDowXG5cdFx0LGF0OjBcblx0fVxuXHQsZW5kOntcblx0XHRpZDowXG5cdFx0LGF0OjBcblx0fVxufVxuZXhwb3J0IGNvbnN0IHJlZHVjZXI9KHN0YXRlPUlOSVRfU1RBVEUsIHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYCR7RE9NQUlOfS9zZWxlY3RlZGA6XG5cdFx0cmV0dXJuICh7Li4uc3RhdGUsIC4uLnBheWxvYWR9KVxuXHRjYXNlIGAke0RPTUFJTn0vTU9WRV9ET1dOYDpcblx0Y2FzZSBgJHtET01BSU59L01PVkVfUklHSFRgOntcblx0XHRcdGxldCB7c3RhcnQ6e2lkLGF0fSxlbmR9PXN0YXRlXG5cdFx0XHRsZXQgdGFyZ2V0PWdldENvbnRlbnQoaWQpXG5cdFx0XHRjb25zdCB0ZXh0PXRhcmdldC5nZXRDb250ZW50KClcblx0XHRcdGlmKHRleHQubGVuZ3RoPmF0KzEpe1xuXHRcdFx0XHRhdCsrXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGFyZ2V0PWdldE5leHRUZXh0T2YoaWQpXG5cdFx0XHRcdGlmKHRhcmdldCl7XG5cdFx0XHRcdFx0aWQ9dGFyZ2V0LmlkXG5cdFx0XHRcdFx0YXQ9MFxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHQvL2tlZXAgY3Vyc29yIGF0IGVuZCBvZiBjdXJyZW50IHRhcmdldFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4ge3N0YXJ0OntpZCxhdH0sIGVuZDp7aWQsYXR9fVxuXHRcdH1cblx0Y2FzZSBgJHtET01BSU59L01PVkVfVVBgOlxuXHRjYXNlIGAke0RPTUFJTn0vTU9WRV9MRUZUYDp7XG5cdFx0XHRsZXQge3N0YXJ0OntpZCxhdH0sZW5kfT1zdGF0ZVxuXHRcdFx0aWYoYXQ+MCl7XG5cdFx0XHRcdGF0LS1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHRsZXQgdGFyZ2V0PWdldFByZXZUZXh0T2YoaWQpXG5cdFx0XHRcdGlmKHRhcmdldCl7XG5cdFx0XHRcdFx0aWQ9dGFyZ2V0LmlkXG5cdFx0XHRcdFx0YXQ9dGFyZ2V0LmdldENvbnRlbnQoKS5sZW5ndGgtMVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHQvL2tlZXAgY3Vyc29yIGF0IGVuZCBvZiBjdXJyZW50IHRhcmdldFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4ge3N0YXJ0OntpZCxhdH0sIGVuZDp7aWQsYXR9fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbiBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuIG51bGxcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWxlY3Rpb25cbiJdfQ==