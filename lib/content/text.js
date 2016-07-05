"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _html = require("../wordwrap/html");

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = function (_NoChild) {
	_inherits(Text, _NoChild);

	function Text() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Text);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Text)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.displayName = "text", _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Text, [{
		key: "compose",
		value: function compose() {
			this._startComposeAt = Date.now();
			var composed = this.composed;
			var parent = this.context.parent;
			var content = this.state.content;

			var style = parent.props.contentStyle.inline;
			var composer = new this.constructor.WordWrapper(content, style);
			var text = null;
			while (text = composer.next(parent.nextAvailableSpace())) {
				var _content = this.createComposedPiece(text);
				composed.push(_content);
				parent.appendComposed(_content);
			}
			parent.on1ChildComposed(this);
		}
	}, {
		key: "createComposedPiece",
		value: function createComposedPiece(props) {
			return _react2.default.createElement("text", props);
		}
	}]);

	return Text;
}(_any.NoChild);

Text.WordWrapper = _html2.default;
exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O2dNQUNwQixjQUFZOzs7Y0FEUTs7NEJBR1I7QUFDWCxRQUFLLGVBQUwsR0FBcUIsS0FBSyxHQUFMLEVBQXJCLENBRFc7T0FFSixXQUFVLEtBQVYsU0FGSTtPQUdFLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FIRjtPQUlKLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFKSTs7QUFLWCxPQUFJLFFBQU0sT0FBTyxLQUFQLENBQWEsWUFBYixDQUEwQixNQUExQixDQUxDO0FBTUwsT0FBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLE9BQWpDLEVBQTBDLEtBQTFDLENBQVQsQ0FOQztBQU9MLE9BQUksT0FBSyxJQUFMLENBUEM7QUFRTCxVQUFNLE9BQUssU0FBUyxJQUFULENBQWMsT0FBTyxrQkFBUCxFQUFkLENBQUwsRUFBZ0Q7QUFDM0QsUUFBSSxXQUFRLEtBQUssbUJBQUwsQ0FBeUIsSUFBekIsQ0FBUixDQUR1RDtBQUVsRCxhQUFTLElBQVQsQ0FBYyxRQUFkLEVBRmtEO0FBR2xELFdBQU8sY0FBUCxDQUFzQixRQUF0QixFQUhrRDtJQUF0RDtBQUtOLFVBQU8sZ0JBQVAsQ0FBd0IsSUFBeEIsRUFiVzs7OztzQ0FnQlEsT0FBTTtBQUN6QixVQUFPLHNDQUFVLEtBQVYsQ0FBUCxDQUR5Qjs7OztRQW5CTjs7O0tBdUJiO2tCQXZCYSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7Tm9DaGlsZH0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEh0bWxXb3JkV3JhcHBlciBmcm9tIFwiLi4vd29yZHdyYXAvaHRtbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgTm9DaGlsZHtcclxuXHRkaXNwbGF5TmFtZT1cInRleHRcIlxyXG5cclxuICAgIGNvbXBvc2UoKXtcclxuXHRcdHRoaXMuX3N0YXJ0Q29tcG9zZUF0PURhdGUubm93KClcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcclxuXHRcdGxldCBzdHlsZT1wYXJlbnQucHJvcHMuY29udGVudFN0eWxlLmlubGluZVxyXG4gICAgICAgIGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcihjb250ZW50LCBzdHlsZSlcclxuICAgICAgICBsZXQgdGV4dD1udWxsXHJcbiAgICAgICAgd2hpbGUodGV4dD1jb21wb3Nlci5uZXh0KHBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKSkpe1xyXG5cdFx0XHRsZXQgY29udGVudD10aGlzLmNyZWF0ZUNvbXBvc2VkUGllY2UodGV4dClcclxuICAgICAgICAgICAgY29tcG9zZWQucHVzaChjb250ZW50KVxyXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY29udGVudClcclxuICAgICAgICB9XHJcblx0XHRwYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxyXG4gICAgfVxyXG5cclxuXHRjcmVhdGVDb21wb3NlZFBpZWNlKHByb3BzKXtcclxuXHRcdHJldHVybiA8dGV4dCB7Li4ucHJvcHN9Lz5cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBXb3JkV3JhcHBlcj1IdG1sV29yZFdyYXBwZXJcclxufVxyXG4iXX0=