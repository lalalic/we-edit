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

			var composer = new this.constructor.WordWrapper(content);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O2dNQUNwQixjQUFZOzs7Y0FEUTs7NEJBR1I7QUFDWCxRQUFLLGVBQUwsR0FBcUIsS0FBSyxHQUFMLEVBQXJCLENBRFc7T0FFSixXQUFVLEtBQVYsU0FGSTtPQUdFLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FIRjtPQUlKLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFKSTs7QUFLTCxPQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsT0FBakMsQ0FBVCxDQUxDO0FBTUwsT0FBSSxPQUFLLElBQUwsQ0FOQztBQU9MLFVBQU0sT0FBSyxTQUFTLElBQVQsQ0FBYyxPQUFPLGtCQUFQLEVBQWQsQ0FBTCxFQUFnRDtBQUMzRCxRQUFJLFdBQVEsS0FBSyxtQkFBTCxDQUF5QixJQUF6QixDQUFSLENBRHVEO0FBRWxELGFBQVMsSUFBVCxDQUFjLFFBQWQsRUFGa0Q7QUFHbEQsV0FBTyxjQUFQLENBQXNCLFFBQXRCLEVBSGtEO0lBQXREO0FBS04sVUFBTyxnQkFBUCxDQUF3QixJQUF4QixFQVpXOzs7O3NDQWVRLE9BQU07QUFDekIsVUFBTyxzQ0FBVSxLQUFWLENBQVAsQ0FEeUI7Ozs7UUFsQk47OztLQXNCYjtrQkF0QmEiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge05vQ2hpbGR9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBIdG1sV29yZFdyYXBwZXIgZnJvbSBcIi4uL3dvcmR3cmFwL2h0bWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIE5vQ2hpbGR7XHJcblx0ZGlzcGxheU5hbWU9XCJ0ZXh0XCJcclxuXHJcbiAgICBjb21wb3NlKCl7XHJcblx0XHR0aGlzLl9zdGFydENvbXBvc2VBdD1EYXRlLm5vdygpXHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXHJcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGNvbnRlbnQpXHJcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxyXG4gICAgICAgIHdoaWxlKHRleHQ9Y29tcG9zZXIubmV4dChwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCkpKXtcclxuXHRcdFx0bGV0IGNvbnRlbnQ9dGhpcy5jcmVhdGVDb21wb3NlZFBpZWNlKHRleHQpXHJcbiAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY29udGVudClcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXHJcbiAgICAgICAgfVxyXG5cdFx0cGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuICAgIH1cclxuXHJcblx0Y3JlYXRlQ29tcG9zZWRQaWVjZShwcm9wcyl7XHJcblx0XHRyZXR1cm4gPHRleHQgey4uLnByb3BzfS8+XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgV29yZFdyYXBwZXI9SHRtbFdvcmRXcmFwcGVyXHJcbn1cclxuIl19