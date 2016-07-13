"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _content = require("../content");

var _editable2 = require("./editable");

var _editable3 = _interopRequireDefault(_editable2);

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
		key: "createComposed2Parent",
		value: function createComposed2Parent() {
			var row = _get(Object.getPrototypeOf(_class.prototype), "createComposed2Parent", this).apply(this, arguments);
			var _row$props = row.props;
			var width = _row$props.width;
			var height = _row$props.height;

			var ps = { width: width, height: height };
			if (this.composed.length == 1) ps._id = this._id;
			return _react2.default.createElement(
				_group2.default,
				ps,
				row
			);
		}
	}]);

	return _class;
}((0, _editable3.default)(_content.Table));

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MENBR3dCO0FBQ3RCLE9BQUksK0ZBQW1DLFVBQW5DLENBRGtCO29CQUVILElBQUksS0FBSixDQUZHO09BRWpCLHlCQUZpQjtPQUVYLDJCQUZXOztBQUd0QixPQUFJLEtBQUcsRUFBQyxZQUFELEVBQU8sY0FBUCxFQUFILENBSGtCO0FBSXRCLE9BQUcsS0FBSyxRQUFMLENBQWMsTUFBZCxJQUFzQixDQUF0QixFQUNGLEdBQUcsR0FBSCxHQUFPLEtBQUssR0FBTCxDQURSO0FBRUEsVUFBTzs7SUFBVyxFQUFYO0lBQWdCLEdBQWhCO0lBQVAsQ0FOc0I7Ozs7O0VBREsiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3Qse1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5pbXBvcnQge1RhYmxlfSBmcm9tIFwiLi4vY29udGVudFwiXG5pbXBvcnQgZWRpdGFibGUgZnJvbSBcIi4vZWRpdGFibGVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIGVkaXRhYmxlKFRhYmxlKXtcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KCl7XG5cdFx0bGV0IHJvdz1zdXBlci5jcmVhdGVDb21wb3NlZDJQYXJlbnQoLi4uYXJndW1lbnRzKVxuXHRcdGxldCB7d2lkdGgsaGVpZ2h0fT1yb3cucHJvcHNcblx0XHRsZXQgcHM9e3dpZHRoLGhlaWdodH1cblx0XHRpZih0aGlzLmNvbXBvc2VkLmxlbmd0aD09MSlcblx0XHRcdHBzLl9pZD10aGlzLl9pZFxuXHRcdHJldHVybiA8R3JvdXAgey4uLnBzfT57cm93fTwvR3JvdXA+XG5cdH1cbn0iXX0=