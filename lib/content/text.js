"use strict";

Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _any2 = _interopRequireDefault(_any);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _html = require("../wordwrap/html");

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = function (_Any) {
				_inherits(Text, _Any);

				function Text() {
								_classCallCheck(this, Text);

								var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Text).apply(this, arguments));

								_this.displayName = "text";

								Object.assign(_this.state, { content: _this.props.children });
								return _this;
				}

				_createClass(Text, [{
								key: "render",
								value: function render() {
												return null;
								}
				}, {
								key: "compose",
								value: function compose() {
												var _this2 = this;

												_get(Object.getPrototypeOf(Text.prototype), "compose", this).call(this);
												var composed = this.composed;
												var parent = this.context.parent;
												var content = this.state.content;

												var composer = new this.constructor.WordWrapper(content);
												var text = null;

												var _loop = function _loop() {
																var info = text;
																text.onClick = function (e) {
																				return _this2.onClick(e, info);
																};
																var content = _react2.default.createElement("text", text);
																composed.push(content);
																parent.appendComposed(content);
												};

												while (text = composer.next(parent.nextAvailableSpace())) {
																_loop();
												}
												this.context.parent.on1ChildComposed(this);
								}
				}, {
								key: "onClick",
								value: function onClick(event, text) {
												var _this3 = this;

												var offsetX = event.nativeEvent.offsetX;

												var composer = new this.constructor.WordWrapper(text.children);
												var loc = composer.next({ width: offsetX }) || { end: 0 };
												var index = text.end - text.children.length + loc.end;
												this.setState({ cursor: index, text: "Raymond changed it" }, function (a) {
																return _this3.reCompose();
												});
								}
				}]);

				return Text;
}(_any2.default);

Text.WordWrapper = _html2.default;
exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixJQUNqQixHQUFhOzhCQURJLE1BQ0o7OzJFQURJLGtCQUVWLFlBRE07O2NBSWhCLGNBQVksT0FKSTs7QUFFZixlQUFPLE1BQVAsQ0FBYyxNQUFLLEtBQUwsRUFBVyxFQUFDLFNBQVEsTUFBSyxLQUFMLENBQVcsUUFBWCxFQUFsQyxFQUZlOztLQUFiOztpQkFEaUI7O2lDQVFaO0FBQ1AsbUJBQU8sSUFBUCxDQURPOzs7O2tDQUlJOzs7QUFDWCx1Q0FibUIsNENBYW5CLENBRFc7Z0JBRUUsV0FBVSxLQUFWLFNBRkY7Z0JBR0UsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUhGO2dCQUlKLFVBQVMsS0FBSyxLQUFMLENBQVQsUUFKSTs7QUFLTCxnQkFBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQTZCLE9BQWpDLENBQVQsQ0FMQztBQU1MLGdCQUFJLE9BQUssSUFBTCxDQU5DOzs7QUFRVixvQkFBTSxPQUFLLElBQUw7QUFDTixxQkFBSyxPQUFMLEdBQWE7MkJBQUcsT0FBSyxPQUFMLENBQWEsQ0FBYixFQUFlLElBQWY7aUJBQUg7QUFDYixvQkFBSSxVQUFTLHNDQUFVLElBQVYsQ0FBVDtBQUNLLHlCQUFTLElBQVQsQ0FBYyxPQUFkO0FBQ0EsdUJBQU8sY0FBUCxDQUFzQixPQUF0QjtjQVpDOztBQU9MLG1CQUFNLE9BQUssU0FBUyxJQUFULENBQWMsT0FBTyxrQkFBUCxFQUFkLENBQUwsRUFBZ0Q7O2FBQXREO0FBT04saUJBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsZ0JBQXBCLENBQXFDLElBQXJDLEVBZFc7Ozs7Z0NBaUJELE9BQU8sTUFBSzs7O2dCQUNmLFVBQVMsTUFBTSxXQUFOLENBQVQsUUFEZTs7QUFFdEIsZ0JBQUksV0FBUyxJQUFJLEtBQUssV0FBTCxDQUFpQixXQUFqQixDQUE2QixLQUFLLFFBQUwsQ0FBMUMsQ0FGa0I7QUFHdEIsZ0JBQUksTUFBSSxTQUFTLElBQVQsQ0FBYyxFQUFDLE9BQU0sT0FBTixFQUFmLEtBQWdDLEVBQUMsS0FBSSxDQUFKLEVBQWpDLENBSGM7QUFJdEIsZ0JBQUksUUFBTSxLQUFLLEdBQUwsR0FBUyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXFCLElBQUksR0FBSixDQUpsQjtBQUtoQixpQkFBSyxRQUFMLENBQWMsRUFBQyxRQUFPLEtBQVAsRUFBYyxNQUFLLG9CQUFMLEVBQTdCLEVBQXlEO3VCQUFHLE9BQUssU0FBTDthQUFILENBQXpELENBTGdCOzs7O1dBN0JIOzs7S0FxQ2I7a0JBckNhIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuaW1wb3J0IEh0bWxXb3JkV3JhcHBlciBmcm9tIFwiLi4vd29yZHdyYXAvaHRtbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgQW55e1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSx7Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVufSlcclxuXHR9XHJcblx0ZGlzcGxheU5hbWU9XCJ0ZXh0XCJcclxuXHRcclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gbnVsbFxyXG5cdH1cclxuXHJcbiAgICBjb21wb3NlKCl7XHJcblx0XHRzdXBlci5jb21wb3NlKClcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXHJcbiAgICAgICAgbGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLldvcmRXcmFwcGVyKGNvbnRlbnQpXHJcbiAgICAgICAgbGV0IHRleHQ9bnVsbFxyXG4gICAgICAgIHdoaWxlKHRleHQ9Y29tcG9zZXIubmV4dChwYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKCkpKXtcclxuXHRcdFx0Y29uc3QgaW5mbz10ZXh0XHJcblx0XHRcdHRleHQub25DbGljaz1lPT50aGlzLm9uQ2xpY2soZSxpbmZvKVxyXG5cdFx0XHRsZXQgY29udGVudD0oPHRleHQgey4uLnRleHR9Lz4pXHJcbiAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY29udGVudClcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXHJcbiAgICAgICAgfVxyXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhldmVudCwgdGV4dCl7XHJcblx0XHRjb25zdCB7b2Zmc2V0WH09ZXZlbnQubmF0aXZlRXZlbnRcclxuXHRcdGxldCBjb21wb3Nlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Xb3JkV3JhcHBlcih0ZXh0LmNoaWxkcmVuKVxyXG5cdFx0bGV0IGxvYz1jb21wb3Nlci5uZXh0KHt3aWR0aDpvZmZzZXRYfSl8fHtlbmQ6MH1cclxuXHRcdGxldCBpbmRleD10ZXh0LmVuZC10ZXh0LmNoaWxkcmVuLmxlbmd0aCtsb2MuZW5kXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3Vyc29yOmluZGV4LCB0ZXh0OlwiUmF5bW9uZCBjaGFuZ2VkIGl0XCJ9LCBhPT50aGlzLnJlQ29tcG9zZSgpKVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgV29yZFdyYXBwZXI9SHRtbFdvcmRXcmFwcGVyXHJcbn1cclxuIl19