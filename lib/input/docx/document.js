"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _style = require("./style");

var _style2 = _interopRequireDefault(_style);

var _immutable = require("immutable");

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Model) {
	_inherits(_class, _Model);

	function _class() {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));

		_this.contentProps.documentStyles = {
			getDefault: function getDefault(type) {
				var styles = this;
				var id = Object.keys(styles).find(function (a) {
					var meta = styles[a].metadata;
					if (!meta) return false;else return meta.type == type && meta.isDefault;
				});
				return styles[id];
			}
		};
		return _this;
	}

	_createClass(_class, [{
		key: "addStyle",
		value: function addStyle(wordModel) {
			var styleVisitor = new _style2.default(wordModel, this);
			this.contentProps.documentStyles[wordModel.id] = styleVisitor.style;
			return styleVisitor;
		}
	}, {
		key: "cloneStyle",
		value: function cloneStyle(id) {
			var style = this.contentProps.documentStyles[id];
			style = JSON.parse(JSON.stringify(style));
			delete style.metadata;
			return style;
		}
	}, {
		key: "getDefaultStyle",
		value: function getDefaultStyle(type) {
			return this.contentProps.documentStyles.getDefault(type);
		}
	}]);

	return _class;
}(_any2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQUdDLG1CQUFhOzs7eUZBQ0gsWUFERzs7QUFFWixRQUFLLFlBQUwsQ0FBa0IsY0FBbEIsR0FBaUM7QUFDaEMsbUNBQVcsTUFBSztBQUNmLFFBQUksU0FBTyxJQUFQLENBRFc7QUFFZixRQUFJLEtBQUcsT0FBTyxJQUFQLENBQVksTUFBWixFQUFvQixJQUFwQixDQUF5QixhQUFHO0FBQ2xDLFNBQUksT0FBSyxPQUFPLENBQVAsRUFBVSxRQUFWLENBRHlCO0FBRWxDLFNBQUcsQ0FBQyxJQUFELEVBQ0YsT0FBTyxLQUFQLENBREQsS0FHQyxPQUFPLEtBQUssSUFBTCxJQUFXLElBQVgsSUFBbUIsS0FBSyxTQUFMLENBSDNCO0tBRitCLENBQTVCLENBRlc7QUFTZixXQUFPLE9BQU8sRUFBUCxDQUFQLENBVGU7SUFEZ0I7R0FBakMsQ0FGWTs7RUFBYjs7OzsyQkFpQlMsV0FBVTtBQUNsQixPQUFJLGVBQWEsb0JBQVUsU0FBVixFQUFxQixJQUFyQixDQUFiLENBRGM7QUFFbEIsUUFBSyxZQUFMLENBQWtCLGNBQWxCLENBQWlDLFVBQVUsRUFBVixDQUFqQyxHQUErQyxhQUFhLEtBQWIsQ0FGN0I7QUFHbEIsVUFBTyxZQUFQLENBSGtCOzs7OzZCQU1SLElBQUc7QUFDYixPQUFJLFFBQU0sS0FBSyxZQUFMLENBQWtCLGNBQWxCLENBQWlDLEVBQWpDLENBQU4sQ0FEUztBQUViLFdBQU0sS0FBSyxLQUFMLENBQVcsS0FBSyxTQUFMLENBQWUsS0FBZixDQUFYLENBQU4sQ0FGYTtBQUdiLFVBQU8sTUFBTSxRQUFOLENBSE07QUFJYixVQUFPLEtBQVAsQ0FKYTs7OztrQ0FPRSxNQUFLO0FBQ3BCLFVBQU8sS0FBSyxZQUFMLENBQWtCLGNBQWxCLENBQWlDLFVBQWpDLENBQTRDLElBQTVDLENBQVAsQ0FEb0IiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9kZWwgZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBTdHlsZSBmcm9tIFwiLi9zdHlsZVwiXHJcbmltcG9ydCBpbW11dGFibGUgZnJvbSBcImltbXV0YWJsZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE1vZGVse1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlcz17XHJcblx0XHRcdGdldERlZmF1bHQodHlwZSl7XHJcblx0XHRcdFx0bGV0IHN0eWxlcz10aGlzXHJcblx0XHRcdFx0bGV0IGlkPU9iamVjdC5rZXlzKHN0eWxlcykuZmluZChhPT57XHJcblx0XHRcdFx0XHRsZXQgbWV0YT1zdHlsZXNbYV0ubWV0YWRhdGFcclxuXHRcdFx0XHRcdGlmKCFtZXRhKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG1ldGEudHlwZT09dHlwZSAmJiBtZXRhLmlzRGVmYXVsdFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0cmV0dXJuIHN0eWxlc1tpZF1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YWRkU3R5bGUod29yZE1vZGVsKXtcclxuXHRcdGxldCBzdHlsZVZpc2l0b3I9bmV3IFN0eWxlKHdvcmRNb2RlbCwgdGhpcylcclxuXHRcdHRoaXMuY29udGVudFByb3BzLmRvY3VtZW50U3R5bGVzW3dvcmRNb2RlbC5pZF09c3R5bGVWaXNpdG9yLnN0eWxlXHJcblx0XHRyZXR1cm4gc3R5bGVWaXNpdG9yXHJcblx0fVxyXG5cclxuXHRjbG9uZVN0eWxlKGlkKXtcclxuXHRcdGxldCBzdHlsZT10aGlzLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlc1tpZF1cclxuXHRcdHN0eWxlPUpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc3R5bGUpKVxyXG5cdFx0ZGVsZXRlIHN0eWxlLm1ldGFkYXRhXHJcblx0XHRyZXR1cm4gc3R5bGVcclxuXHR9XHJcblxyXG5cdGdldERlZmF1bHRTdHlsZSh0eXBlKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlcy5nZXREZWZhdWx0KHR5cGUpXHJcblx0fVxyXG59XHJcbiJdfQ==