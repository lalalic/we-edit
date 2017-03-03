"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ableExceed = exports.Text = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Text = function Text(_ref) {
	var children = _ref.children,
	    contentWidth = _ref.contentWidth,
	    whiteSpace = _ref.whiteSpace,
	    others = _objectWithoutProperties(_ref, ["children", "contentWidth", "whiteSpace"]);

	return _react2.default.createElement(
		"text",
		_extends({ style: { whiteSpace: "pre" } }, others),
		children.reduce(function (s, a) {
			s.splice.apply(s, [s.length, 0].concat(_toConsumableArray(a.chars)));
			return s;
		}, []).join("")
	);
};

exports.Text = Text;
var ableExceed = exports.ableExceed = function ableExceed(pieces) {
	return pieces.reduce(function (state, a) {
		return state && a.type.ableExceed();
	}, true);
};

exports.default = Object.assign(Text, { ableExceed: ableExceed });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb3NlZC90ZXh0LmpzIl0sIm5hbWVzIjpbIlRleHQiLCJjaGlsZHJlbiIsImNvbnRlbnRXaWR0aCIsIndoaXRlU3BhY2UiLCJvdGhlcnMiLCJyZWR1Y2UiLCJzIiwiYSIsInNwbGljZSIsImxlbmd0aCIsImNoYXJzIiwiam9pbiIsImFibGVFeGNlZWQiLCJwaWVjZXMiLCJzdGF0ZSIsInR5cGUiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7O0FBRU8sSUFBTUEsT0FBSyxTQUFMQSxJQUFLO0FBQUEsS0FBRUMsUUFBRixRQUFFQSxRQUFGO0FBQUEsS0FBWUMsWUFBWixRQUFZQSxZQUFaO0FBQUEsS0FBMEJDLFVBQTFCLFFBQTBCQSxVQUExQjtBQUFBLEtBQXlDQyxNQUF6Qzs7QUFBQSxRQUNqQjtBQUFBO0FBQUEsYUFBTSxPQUFPLEVBQUNELFlBQVcsS0FBWixFQUFiLElBQXFDQyxNQUFyQztBQUVDSCxXQUFTSSxNQUFULENBQWdCLFVBQUNDLENBQUQsRUFBR0MsQ0FBSCxFQUFPO0FBQ3RCRCxLQUFFRSxNQUFGLFdBQVNGLEVBQUVHLE1BQVgsRUFBa0IsQ0FBbEIsNEJBQXVCRixFQUFFRyxLQUF6QjtBQUNBLFVBQU9KLENBQVA7QUFDQSxHQUhELEVBR0UsRUFIRixFQUdNSyxJQUhOLENBR1csRUFIWDtBQUZELEVBRGlCO0FBQUEsQ0FBWDs7O0FBV0EsSUFBTUMsa0NBQVcsU0FBWEEsVUFBVztBQUFBLFFBQVFDLE9BQU9SLE1BQVAsQ0FBYyxVQUFDUyxLQUFELEVBQU9QLENBQVA7QUFBQSxTQUFXTyxTQUFTUCxFQUFFUSxJQUFGLENBQU9ILFVBQVAsRUFBcEI7QUFBQSxFQUFkLEVBQXNELElBQXRELENBQVI7QUFBQSxDQUFqQjs7a0JBRVFJLE9BQU9DLE1BQVAsQ0FBY2pCLElBQWQsRUFBbUIsRUFBQ1ksc0JBQUQsRUFBbkIsQyIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5leHBvcnQgY29uc3QgVGV4dD0oe2NoaWxkcmVuLCBjb250ZW50V2lkdGgsIHdoaXRlU3BhY2UsIC4uLm90aGVyc30pPT4oXHJcblx0PHRleHQgc3R5bGU9e3t3aGl0ZVNwYWNlOlwicHJlXCJ9fSB7Li4ub3RoZXJzfT5cclxuXHR7XHJcblx0XHRjaGlsZHJlbi5yZWR1Y2UoKHMsYSk9PntcclxuXHRcdFx0cy5zcGxpY2Uocy5sZW5ndGgsMCwuLi5hLmNoYXJzKVxyXG5cdFx0XHRyZXR1cm4gc1xyXG5cdFx0fSxbXSkuam9pbihcIlwiKVxyXG5cdH1cdFxyXG5cdDwvdGV4dD5cclxuKVxyXG5cclxuZXhwb3J0IGNvbnN0IGFibGVFeGNlZWQ9cGllY2VzPT5waWVjZXMucmVkdWNlKChzdGF0ZSxhKT0+c3RhdGUgJiYgYS50eXBlLmFibGVFeGNlZWQoKSx0cnVlKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihUZXh0LHthYmxlRXhjZWVkfSkiXX0=