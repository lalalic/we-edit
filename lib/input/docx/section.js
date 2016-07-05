"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _style = require("./style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Model) {
	_inherits(_class, _Model);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "visit",
		value: function visit() {
			var style = this.wordModel.getDirectStyle();
			var visitor = new _style2.default(this.wordModel, this.doc);
			style.parse([visitor]);
			Object.assign(this.contentProps, visitor.style.section);
		}
	}]);

	return _class;
}(_any2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnB1dC9kb2N4L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFHUTtBQUNOLE9BQUksUUFBTSxLQUFLLFNBQUwsQ0FBZSxjQUFmLEVBQU4sQ0FERTtBQUVOLE9BQUksVUFBUSxvQkFBVSxLQUFLLFNBQUwsRUFBZ0IsS0FBSyxHQUFMLENBQWxDLENBRkU7QUFHTixTQUFNLEtBQU4sQ0FBWSxDQUFDLE9BQUQsQ0FBWixFQUhNO0FBSU4sVUFBTyxNQUFQLENBQWMsS0FBSyxZQUFMLEVBQWtCLFFBQVEsS0FBUixDQUFjLE9BQWQsQ0FBaEMsQ0FKTSIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsIGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBTdHlsZSBmcm9tIFwiLi9zdHlsZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE1vZGVse1xyXG5cdHZpc2l0KCl7XHJcblx0XHRsZXQgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKVxyXG5cdFx0bGV0IHZpc2l0b3I9bmV3IFN0eWxlKHRoaXMud29yZE1vZGVsLCB0aGlzLmRvYylcclxuXHRcdHN0eWxlLnBhcnNlKFt2aXNpdG9yXSlcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5jb250ZW50UHJvcHMsdmlzaXRvci5zdHlsZS5zZWN0aW9uKVxyXG5cdH1cclxufVxyXG4iXX0=