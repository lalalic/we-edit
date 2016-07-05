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

		_this.documentStyles = new Map();
		return _this;
	}

	_createClass(_class, [{
		key: "addStyle",
		value: function addStyle(wordModel) {
			var styleVisitor = new _style2.default(wordModel, this);
			this.documentStyles.set(wordModel.id, styleVisitor.style);
			return styleVisitor;
		}
	}, {
		key: "cloneStyle",
		value: function cloneStyle(name) {
			var style = this.documentStyles.get(name);
			style = JSON.parse(JSON.stringify(style));
			delete style.metadata;
			return style;
		}
	}]);

	return _class;
}(_any2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQUdDLG1CQUFhOzs7eUZBQ0gsWUFERzs7QUFFWixRQUFLLGNBQUwsR0FBb0IsSUFBSSxHQUFKLEVBQXBCLENBRlk7O0VBQWI7Ozs7MkJBS1MsV0FBVTtBQUNsQixPQUFJLGVBQWEsb0JBQVUsU0FBVixFQUFxQixJQUFyQixDQUFiLENBRGM7QUFFbEIsUUFBSyxjQUFMLENBQW9CLEdBQXBCLENBQXdCLFVBQVUsRUFBVixFQUFjLGFBQWEsS0FBYixDQUF0QyxDQUZrQjtBQUdsQixVQUFPLFlBQVAsQ0FIa0I7Ozs7NkJBTVIsTUFBSztBQUNmLE9BQUksUUFBTSxLQUFLLGNBQUwsQ0FBb0IsR0FBcEIsQ0FBd0IsSUFBeEIsQ0FBTixDQURXO0FBRWYsV0FBTSxLQUFLLEtBQUwsQ0FBVyxLQUFLLFNBQUwsQ0FBZSxLQUFmLENBQVgsQ0FBTixDQUZlO0FBR2YsVUFBTyxNQUFNLFFBQU4sQ0FIUTtBQUlmLFVBQU8sS0FBUCxDQUplIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsIGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGVcIlxyXG5pbXBvcnQgaW1tdXRhYmxlIGZyb20gXCJpbW11dGFibGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBNb2RlbHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5kb2N1bWVudFN0eWxlcz1uZXcgTWFwKClcclxuXHR9XHJcblx0XHJcblx0YWRkU3R5bGUod29yZE1vZGVsKXtcclxuXHRcdGxldCBzdHlsZVZpc2l0b3I9bmV3IFN0eWxlKHdvcmRNb2RlbCwgdGhpcylcclxuXHRcdHRoaXMuZG9jdW1lbnRTdHlsZXMuc2V0KHdvcmRNb2RlbC5pZCwgc3R5bGVWaXNpdG9yLnN0eWxlKVxyXG5cdFx0cmV0dXJuIHN0eWxlVmlzaXRvclxyXG5cdH1cclxuXHRcclxuXHRjbG9uZVN0eWxlKG5hbWUpe1xyXG5cdFx0bGV0IHN0eWxlPXRoaXMuZG9jdW1lbnRTdHlsZXMuZ2V0KG5hbWUpXHJcblx0XHRzdHlsZT1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHN0eWxlKSlcclxuXHRcdGRlbGV0ZSBzdHlsZS5tZXRhZGF0YVxyXG5cdFx0cmV0dXJuIHN0eWxlXHJcblx0fVxyXG59Il19