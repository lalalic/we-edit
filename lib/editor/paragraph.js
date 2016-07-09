"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _content = require("../content");

var _editable2 = require("./editable");

var _editable3 = _interopRequireDefault(_editable2);

var _inline = require("./inline");

var _inline2 = _interopRequireDefault(_inline);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_editable) {
	_inherits(_class, _editable);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "_newLine",
		value: function _newLine() {
			return Object.assign(_get(Object.getPrototypeOf(_class.prototype), "_newLine", this).call(this), { _id: this._id });
		}
	}, {
		key: "whatIfEmpty",
		value: function whatIfEmpty() {
			this.state.content.push(_react2.default.createElement(
				_inline2.default,
				{ contentStyle: this.context.getDefaultStyle("inline") },
				_react2.default.createElement(
					_text2.default,
					null,
					" "
				)
			));
		}
	}]);

	return _class;
}((0, _editable3.default)(_content.Paragraph));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBSVc7QUFDVCxVQUFPLE9BQU8sTUFBUCw2RUFBK0IsRUFBQyxLQUFJLEtBQUssR0FBTCxFQUFwQyxDQUFQLENBRFM7Ozs7Z0NBR0c7QUFDWixRQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLElBQW5CLENBQXdCOztNQUFRLGNBQWMsS0FBSyxPQUFMLENBQWEsZUFBYixDQUE2QixRQUE3QixDQUFkLEVBQVI7SUFBOEQ7Ozs7S0FBOUQ7SUFBeEIsRUFEWTs7Ozs7RUFKZSIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7UGFyYWdyYXBofSBmcm9tIFwiLi4vY29udGVudFwiXHJcbmltcG9ydCBlZGl0YWJsZSBmcm9tIFwiLi9lZGl0YWJsZVwiXHJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBlZGl0YWJsZShQYXJhZ3JhcGgpe1xyXG5cdF9uZXdMaW5lKCl7XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5fbmV3TGluZSgpLHtfaWQ6dGhpcy5faWR9KVxyXG5cdH1cclxuXHR3aGF0SWZFbXB0eSgpe1xyXG5cdFx0dGhpcy5zdGF0ZS5jb250ZW50LnB1c2goPElubGluZSBjb250ZW50U3R5bGU9e3RoaXMuY29udGV4dC5nZXREZWZhdWx0U3R5bGUoXCJpbmxpbmVcIil9PjxUZXh0PiA8L1RleHQ+PC9JbmxpbmU+KVxyXG5cdH1cclxufVxyXG4iXX0=