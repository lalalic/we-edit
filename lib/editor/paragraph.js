"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));

		if (_this.isEmpty()) _this.state.content = [_react2.default.createElement(
			_inline2.default,
			{ directStyle: _this.context.getDefaultStyle("inline") },
			_react2.default.createElement(
				_text2.default,
				null,
				" "
			)
		)];
		return _this;
	}

	_createClass(_class, [{
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			var line = _get(Object.getPrototypeOf(_class.prototype), "createComposed2Parent", this).apply(this, arguments);
			var _line$props = line.props;
			var width = _line$props.width;
			var height = _line$props.height;

			var ps = { width: width, height: height };
			if (this.computed.composed.length == 1) ps._id = this._id;
			return _react2.default.createElement(
				_group2.default,
				ps,
				line
			);
		}
	}, {
		key: "_isLastComposedFitIntoParent",
		value: function _isLastComposedFitIntoParent() {
			return true;
		}

		/**
   *  isAllChildrenComposed will affect last line height, so here we need make it right
   */

	}, {
		key: "appendLastComposed",
		value: function appendLastComposed() {
			var _this2 = this;

			var children = this.computed.children;
			this.computed.children = []; //make isAllChildrenComposed right
			var len = this.computed.lastComposed.length;
			this.computed.lastComposed.forEach(function (one, i) {
				_this2.computed.composed.push(one);
				if (i == len - 1) {
					//make isAllChildrenComposed right
					_this2.computed.children = children;
				}
				_this2.context.parent.appendComposed(_this2.createComposed2Parent(one));
			});
			this.context.parent.on1ChildComposed(this);
			this.computed.lastComposed = null;
		}
	}]);

	return _class;
}((0, _editable3.default)(_content.Paragraph));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQUlDLG1CQUFhOzs7eUZBQ0gsWUFERzs7QUFFWixNQUFHLE1BQUssT0FBTCxFQUFILEVBQ0MsTUFBSyxLQUFMLENBQVcsT0FBWCxHQUFtQixDQUFDOztLQUFRLGFBQWEsTUFBSyxPQUFMLENBQWEsZUFBYixDQUE2QixRQUE3QixDQUFiLEVBQVI7R0FBNkQ7Ozs7SUFBN0Q7R0FBRCxDQUFuQixDQUREO2VBRlk7RUFBYjs7Ozt3Q0FLc0IsT0FBTTtBQUMzQixPQUFJLGdHQUFvQyxVQUFwQyxDQUR1QjtxQkFFUixLQUFLLEtBQUwsQ0FGUTtPQUV0QiwwQkFGc0I7T0FFaEIsNEJBRmdCOztBQUczQixPQUFJLEtBQUcsRUFBQyxZQUFELEVBQU8sY0FBUCxFQUFILENBSHVCO0FBSTNCLE9BQUcsS0FBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixJQUErQixDQUEvQixFQUNGLEdBQUcsR0FBSCxHQUFPLEtBQUssR0FBTCxDQURSO0FBRUEsVUFBTzs7SUFBVyxFQUFYO0lBQWdCLElBQWhCO0lBQVAsQ0FOMkI7Ozs7aURBU0U7QUFDN0IsVUFBTyxJQUFQLENBRDZCOzs7Ozs7Ozs7dUNBT1Y7OztBQUNuQixPQUFJLFdBQVMsS0FBSyxRQUFMLENBQWMsUUFBZCxDQURNO0FBRW5CLFFBQUssUUFBTCxDQUFjLFFBQWQsR0FBdUIsRUFBdkI7QUFGbUIsT0FHZixNQUFJLEtBQUssUUFBTCxDQUFjLFlBQWQsQ0FBMkIsTUFBM0IsQ0FIVztBQUluQixRQUFLLFFBQUwsQ0FBYyxZQUFkLENBQTJCLE9BQTNCLENBQW1DLFVBQUMsR0FBRCxFQUFLLENBQUwsRUFBUztBQUMzQyxXQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLElBQXZCLENBQTRCLEdBQTVCLEVBRDJDO0FBRTNDLFFBQUcsS0FBRyxNQUFJLENBQUosRUFBTTs7QUFDWCxZQUFLLFFBQUwsQ0FBYyxRQUFkLEdBQXVCLFFBQXZCLENBRFc7S0FBWjtBQUdBLFdBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUMsT0FBSyxxQkFBTCxDQUEyQixHQUEzQixDQUFuQyxFQUwyQztJQUFULENBQW5DLENBSm1CO0FBV25CLFFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsZ0JBQXBCLENBQXFDLElBQXJDLEVBWG1CO0FBWW5CLFFBQUssUUFBTCxDQUFjLFlBQWQsR0FBMkIsSUFBM0IsQ0FabUI7Ozs7O0VBdEJRIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCx7UHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gXCJpbW11dGFibGVcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcblxyXG5pbXBvcnQge1BhcmFncmFwaH0gZnJvbSBcIi4uL2NvbnRlbnRcIlxyXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxyXG5pbXBvcnQgSW5saW5lIGZyb20gXCIuL2lubGluZVwiXHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHRcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgZWRpdGFibGUoUGFyYWdyYXBoKXtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0aWYodGhpcy5pc0VtcHR5KCkpXHJcblx0XHRcdHRoaXMuc3RhdGUuY29udGVudD1bPElubGluZSBkaXJlY3RTdHlsZT17dGhpcy5jb250ZXh0LmdldERlZmF1bHRTdHlsZShcImlubGluZVwiKX0+PFRleHQ+IDwvVGV4dD48L0lubGluZT5dXHJcblx0fVxyXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcblx0XHRsZXQgbGluZT1zdXBlci5jcmVhdGVDb21wb3NlZDJQYXJlbnQoLi4uYXJndW1lbnRzKVxyXG5cdFx0bGV0IHt3aWR0aCxoZWlnaHR9PWxpbmUucHJvcHNcclxuXHRcdGxldCBwcz17d2lkdGgsaGVpZ2h0fVxyXG5cdFx0aWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTEpXHJcblx0XHRcdHBzLl9pZD10aGlzLl9pZFxyXG5cdFx0cmV0dXJuIDxHcm91cCB7Li4ucHN9PntsaW5lfTwvR3JvdXA+XHJcblx0fVxyXG5cdFxyXG5cdF9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQoKXtcclxuXHRcdHJldHVybiB0cnVlXHRcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogIGlzQWxsQ2hpbGRyZW5Db21wb3NlZCB3aWxsIGFmZmVjdCBsYXN0IGxpbmUgaGVpZ2h0LCBzbyBoZXJlIHdlIG5lZWQgbWFrZSBpdCByaWdodFxyXG5cdCAqL1xyXG5cdGFwcGVuZExhc3RDb21wb3NlZCgpe1xyXG5cdFx0bGV0IGNoaWxkcmVuPXRoaXMuY29tcHV0ZWQuY2hpbGRyZW5cclxuXHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW49W10vL21ha2UgaXNBbGxDaGlsZHJlbkNvbXBvc2VkIHJpZ2h0XHJcblx0XHRsZXQgbGVuPXRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkLmxlbmd0aFxyXG5cdFx0dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWQuZm9yRWFjaCgob25lLGkpPT57XHJcblx0XHRcdHRoaXMuY29tcHV0ZWQuY29tcG9zZWQucHVzaChvbmUpXHJcblx0XHRcdGlmKGk9PWxlbi0xKXsvL21ha2UgaXNBbGxDaGlsZHJlbkNvbXBvc2VkIHJpZ2h0XHJcblx0XHRcdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbj1jaGlsZHJlblxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQob25lKSlcclxuXHRcdH0pXHJcblx0XHR0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuXHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkPW51bGxcclxuXHR9XHJcbn1cclxuIl19