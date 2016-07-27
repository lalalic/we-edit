"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _paragraph = require("./paragraph");

var _paragraph2 = _interopRequireDefault(_paragraph);

var _text = require("./text");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var list = function (_Paragraph) {
	_inherits(list, _Paragraph);

	function list() {
		_classCallCheck(this, list);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(list).apply(this, arguments));
	}

	_createClass(list, [{
		key: "_newLine",
		value: function _newLine() {
			var line = _get(Object.getPrototypeOf(list.prototype), "_newLine", this).call(this);

			if (this.computed.composed.length == 0) {
				var _getStyle = this.getStyle();

				var indent = _getStyle.indent;

				var label = this.getLabel();
				var style = this.getLabelStyle();

				var _ref = new WordWraper(label, style);

				var height = _ref.height;


				this.appendComposed(_react2.default.createElement(
					Group,
					{ width: indent.hanging, height: height },
					_react2.default.createElement(
						"text",
						null,
						this.getLabel()
					)
				));
			}
			return line;
		}
	}, {
		key: "getLabel",
		value: function getLabel() {
			return "1";
		}
	}, {
		key: "getLabelStyle",
		value: function getLabelStyle() {
			return {
				rFonts: {},
				sz: 12,
				b: 1
			};
		}
	}]);

	return list;
}(_paragraph2.default);

list.displayName = "list";
exports.default = list;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7NkJBR1Y7QUFDSCxPQUFJLGtDQUpTLDZDQUlULENBREQ7O0FBR1QsT0FBRyxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLElBQStCLENBQS9CLEVBQWlDO29CQUN0QixLQUFLLFFBQUwsR0FEc0I7O1FBQzlCLDBCQUQ4Qjs7QUFFbkMsUUFBSSxRQUFNLEtBQUssUUFBTCxFQUFOLENBRitCO0FBR25DLFFBQUksUUFBTSxLQUFLLGFBQUwsRUFBTixDQUgrQjs7ZUFJdEIsSUFBSSxVQUFKLENBQWUsS0FBZixFQUFxQixLQUFyQixFQUpzQjs7UUFJOUIscUJBSjhCOzs7QUFNbkMsU0FBSyxjQUFMLENBQW9CO0FBQUMsVUFBRDtPQUFPLE9BQU8sT0FBTyxPQUFQLEVBQWdCLFFBQVEsTUFBUixFQUE5QjtLQUE4Qzs7O01BQU8sS0FBSyxRQUFMLEVBQVA7TUFBOUM7S0FBcEIsRUFObUM7SUFBcEM7QUFRQSxVQUFPLElBQVAsQ0FYUzs7Ozs2QkFjQTtBQUNULFVBQU8sR0FBUCxDQURTOzs7O2tDQUlLO0FBQ2QsVUFBTztBQUNOLFlBQU8sRUFBUDtBQUNBLFFBQUcsRUFBSDtBQUNBLE9BQUUsQ0FBRjtJQUhELENBRGM7Ozs7UUFyQks7OztLQUNWLGNBQVk7a0JBREYiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IFBhcmFncmFwaCBmcm9tIFwiLi9wYXJhZ3JhcGhcIlxuaW1wb3J0IHtXb3JkV3JhcHBlcn0gZnJvbSBcIi4vdGV4dFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxpc3QgZXh0ZW5kcyBQYXJhZ3JhcGh7XG4gICAgc3RhdGljIGRpc3BsYXlOYW1lPVwibGlzdFwiXG5cdFxuXHRfbmV3TGluZSgpe1xuICAgICAgICBsZXQgbGluZT1zdXBlci5fbmV3TGluZSgpXG5cdFx0XG5cdFx0aWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTApe1xuXHRcdFx0bGV0IHtpbmRlbnR9PXRoaXMuZ2V0U3R5bGUoKVxuXHRcdFx0bGV0IGxhYmVsPXRoaXMuZ2V0TGFiZWwoKVxuXHRcdFx0bGV0IHN0eWxlPXRoaXMuZ2V0TGFiZWxTdHlsZSgpXG5cdFx0XHRsZXQge2hlaWdodH09bmV3IFdvcmRXcmFwZXIobGFiZWwsc3R5bGUpXG5cdFx0XHRcblx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoPEdyb3VwIHdpZHRoPXtpbmRlbnQuaGFuZ2luZ30gaGVpZ2h0PXtoZWlnaHR9Pjx0ZXh0Pnt0aGlzLmdldExhYmVsKCl9PC90ZXh0PjwvR3JvdXA+KVxuXHRcdH1cblx0XHRyZXR1cm4gbGluZVxuXHR9XG5cdFxuXHRnZXRMYWJlbCgpe1xuXHRcdHJldHVybiBcIjFcIlxuXHR9XG5cdFxuXHRnZXRMYWJlbFN0eWxlKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJGb250czp7fSxcblx0XHRcdHN6OjEyLFxuXHRcdFx0YjoxXG5cdFx0fVxuXHR9XG59XG4iXX0=