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
		key: "cloneDocumentDefaultStyle",
		value: function cloneDocumentDefaultStyle() {
			return this.cloneStyle();
		}
	}, {
		key: "cloneDefaultStyle",
		value: function cloneDefaultStyle(type) {
			return this.cloneStyle(this.contentProps.documentStyles.getDefault(type).metadata.id);
		}
	}]);

	return _class;
}(_any2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQUdDLG1CQUFhOzs7eUZBQ0gsWUFERzs7QUFFWixRQUFLLFlBQUwsQ0FBa0IsY0FBbEIsR0FBaUM7QUFDaEMsbUNBQVcsTUFBSztBQUNmLFFBQUksU0FBTyxJQUFQLENBRFc7QUFFZixRQUFJLEtBQUcsT0FBTyxJQUFQLENBQVksTUFBWixFQUFvQixJQUFwQixDQUF5QixhQUFHO0FBQ2xDLFNBQUksT0FBSyxPQUFPLENBQVAsRUFBVSxRQUFWLENBRHlCO0FBRWxDLFNBQUcsQ0FBQyxJQUFELEVBQ0YsT0FBTyxLQUFQLENBREQsS0FHQyxPQUFPLEtBQUssSUFBTCxJQUFXLElBQVgsSUFBbUIsS0FBSyxTQUFMLENBSDNCO0tBRitCLENBQTVCLENBRlc7QUFTZixXQUFPLE9BQU8sRUFBUCxDQUFQLENBVGU7SUFEZ0I7R0FBakMsQ0FGWTs7RUFBYjs7OzsyQkFpQlMsV0FBVTtBQUNsQixPQUFJLGVBQWEsb0JBQVUsU0FBVixFQUFxQixJQUFyQixDQUFiLENBRGM7QUFFbEIsUUFBSyxZQUFMLENBQWtCLGNBQWxCLENBQWlDLFVBQVUsRUFBVixDQUFqQyxHQUErQyxhQUFhLEtBQWIsQ0FGN0I7QUFHbEIsVUFBTyxZQUFQLENBSGtCOzs7OzZCQU1SLElBQUc7QUFDYixPQUFJLFFBQU0sS0FBSyxZQUFMLENBQWtCLGNBQWxCLENBQWlDLEVBQWpDLENBQU4sQ0FEUztBQUViLFdBQU0sS0FBSyxLQUFMLENBQVcsS0FBSyxTQUFMLENBQWUsS0FBZixDQUFYLENBQU4sQ0FGYTtBQUdiLFVBQU8sTUFBTSxRQUFOLENBSE07QUFJYixVQUFPLEtBQVAsQ0FKYTs7Ozs4Q0FPYTtBQUMxQixVQUFPLEtBQUssVUFBTCxFQUFQLENBRDBCOzs7O29DQUlULE1BQUs7QUFDdEIsVUFBTyxLQUFLLFVBQUwsQ0FBZ0IsS0FBSyxZQUFMLENBQWtCLGNBQWxCLENBQWlDLFVBQWpDLENBQTRDLElBQTVDLEVBQWtELFFBQWxELENBQTJELEVBQTNELENBQXZCLENBRHNCIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsIGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGVcIlxyXG5pbXBvcnQgaW1tdXRhYmxlIGZyb20gXCJpbW11dGFibGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBNb2RlbHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5jb250ZW50UHJvcHMuZG9jdW1lbnRTdHlsZXM9e1xyXG5cdFx0XHRnZXREZWZhdWx0KHR5cGUpe1xyXG5cdFx0XHRcdGxldCBzdHlsZXM9dGhpc1xyXG5cdFx0XHRcdGxldCBpZD1PYmplY3Qua2V5cyhzdHlsZXMpLmZpbmQoYT0+e1xyXG5cdFx0XHRcdFx0bGV0IG1ldGE9c3R5bGVzW2FdLm1ldGFkYXRhXHJcblx0XHRcdFx0XHRpZighbWV0YSlcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdHJldHVybiBtZXRhLnR5cGU9PXR5cGUgJiYgbWV0YS5pc0RlZmF1bHRcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHJldHVybiBzdHlsZXNbaWRdXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFkZFN0eWxlKHdvcmRNb2RlbCl7XHJcblx0XHRsZXQgc3R5bGVWaXNpdG9yPW5ldyBTdHlsZSh3b3JkTW9kZWwsIHRoaXMpXHJcblx0XHR0aGlzLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlc1t3b3JkTW9kZWwuaWRdPXN0eWxlVmlzaXRvci5zdHlsZVxyXG5cdFx0cmV0dXJuIHN0eWxlVmlzaXRvclxyXG5cdH1cclxuXHJcblx0Y2xvbmVTdHlsZShpZCl7XHJcblx0XHRsZXQgc3R5bGU9dGhpcy5jb250ZW50UHJvcHMuZG9jdW1lbnRTdHlsZXNbaWRdXHJcblx0XHRzdHlsZT1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN0eWxlKSlcclxuXHRcdGRlbGV0ZSBzdHlsZS5tZXRhZGF0YVxyXG5cdFx0cmV0dXJuIHN0eWxlXHJcblx0fVxyXG5cclxuXHRjbG9uZURvY3VtZW50RGVmYXVsdFN0eWxlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jbG9uZVN0eWxlKClcclxuXHR9XHJcblxyXG5cdGNsb25lRGVmYXVsdFN0eWxlKHR5cGUpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2xvbmVTdHlsZSh0aGlzLmNvbnRlbnRQcm9wcy5kb2N1bWVudFN0eWxlcy5nZXREZWZhdWx0KHR5cGUpLm1ldGFkYXRhLmlkKVxyXG5cdH1cclxufVxyXG4iXX0=