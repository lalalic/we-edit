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

var _group = require("../compose/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _textComposerTime = 0;

var Text = function (_Any) {
				_inherits(Text, _Any);

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
												var rawContent = this.props.children;
												var modifiedContent = this.state.text;

												var composer = new this.constructor.TextComposer(modifiedContent || rawContent);
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

												var composer = new this.constructor.TextComposer(text.children);
												var loc = composer.next({ width: offsetX }) || { end: 0 };
												var index = text.end - text.children.length + loc.end;
												this.setState({ cursor: index, text: "Raymond changed it" }, function (a) {
																return _this3.reCompose();
												});
								}

								/**
         *  a simple text composer
         */

				}]);

				return Text;
}(_any2.default);

Text.TextComposer = function () {
				function _class2(text, style) {
								_classCallCheck(this, _class2);

								if (!this.constructor.el) document.body.appendChild(this.constructor.el = document.createElement('span'));
								this.text = text;
								this.style = style;
								this.tester = this.constructor.el;
								this.composed = 0;
				}

				_createClass(_class2, [{
								key: "next",
								value: function next(_ref) {
												var maxWidth = _ref.width;

												if (this.composed == this.text.length) return null;

												var startAt = Date.now();
												this.tester.style = "margin:0;padding:0;border:0;position:absolute;left:-1000px";

												var text = this.tester.innerHTML = this.text.substr(this.composed);
												var info = null;

												var _tester$getBoundingCl = this.tester.getBoundingClientRect();

												var width = _tester$getBoundingCl.width;
												var height = _tester$getBoundingCl.height;

												if (width <= maxWidth) {
																info = { width: width, height: height, end: this.composed += text.length, children: text };
												} else {
																while (width > maxWidth && text.length) {
																				text = this.tester.innerHTML = text.slice(0, -1);

																				var _tester$getBoundingCl2 = this.tester.getBoundingClientRect();

																				width = _tester$getBoundingCl2.width;
																				height = _tester$getBoundingCl2.height;
																}
																if (text.length) {
																				info = { width: maxWidth, height: height, end: this.composed += text.length, children: text };
																} else {
																				//@TODO: the space is too small, give a placeholder
																				info = { width: maxWidth, height: height, end: this.composed += text.length, children: text };
																}
												}

												console.info("text composer total time: " + (_textComposerTime += Date.now() - startAt));
												return info;
								}
				}]);

				return _class2;
}();

exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxvQkFBa0IsQ0FBbEI7O0lBQ2lCOzs7Ozs7Ozs7Ozs7OztzTUFDakIsY0FBWTs7O2lCQURLOztpQ0FHWjtBQUNQLG1CQUFPLElBQVAsQ0FETzs7OztrQ0FJSTs7O0FBQ1gsdUNBUm1CLDRDQVFuQixDQURXO2dCQUVFLFdBQVUsS0FBVixTQUZGO2dCQUdFLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FIRjtnQkFJTSxhQUFZLEtBQUssS0FBTCxDQUF0QixTQUpJO2dCQUtFLGtCQUFpQixLQUFLLEtBQUwsQ0FBdkIsS0FMSTs7QUFNTCxnQkFBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFlBQWpCLENBQThCLG1CQUFpQixVQUFqQixDQUEzQyxDQU5DO0FBT0wsZ0JBQUksT0FBSyxJQUFMLENBUEM7OztBQVNWLG9CQUFNLE9BQUssSUFBTDtBQUNOLHFCQUFLLE9BQUwsR0FBYTsyQkFBRyxPQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWUsSUFBZjtpQkFBSDtBQUNiLG9CQUFJLFVBQVMsc0NBQVUsSUFBVixDQUFUO0FBQ0sseUJBQVMsSUFBVCxDQUFjLE9BQWQ7QUFDQSx1QkFBTyxjQUFQLENBQXNCLE9BQXRCO2NBYkM7O0FBUUwsbUJBQU0sT0FBSyxTQUFTLElBQVQsQ0FBYyxPQUFPLGtCQUFQLEVBQWQsQ0FBTCxFQUFnRDs7YUFBdEQ7QUFPTixpQkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixnQkFBcEIsQ0FBcUMsSUFBckMsRUFmVzs7OztnQ0FrQkQsT0FBTyxNQUFLOzs7Z0JBQ2YsVUFBUyxNQUFNLFdBQU4sQ0FBVCxRQURlOztBQUV0QixnQkFBSSxXQUFTLElBQUksS0FBSyxXQUFMLENBQWlCLFlBQWpCLENBQThCLEtBQUssUUFBTCxDQUEzQyxDQUZrQjtBQUd0QixnQkFBSSxNQUFJLFNBQVMsSUFBVCxDQUFjLEVBQUMsT0FBTSxPQUFOLEVBQWYsS0FBZ0MsRUFBQyxLQUFJLENBQUosRUFBakMsQ0FIYztBQUl0QixnQkFBSSxRQUFNLEtBQUssR0FBTCxHQUFTLEtBQUssUUFBTCxDQUFjLE1BQWQsR0FBcUIsSUFBSSxHQUFKLENBSmxCO0FBS2hCLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLFFBQU8sS0FBUCxFQUFjLE1BQUssb0JBQUwsRUFBN0IsRUFBeUQ7dUJBQUcsT0FBSyxTQUFMO2FBQUgsQ0FBekQsQ0FMZ0I7Ozs7Ozs7OztXQXpCSDs7O0tBb0NWO0FBR0gscUJBQVksSUFBWixFQUFrQixLQUFsQixFQUF3Qjs7O0FBQ3BCLFlBQUcsQ0FBQyxLQUFLLFdBQUwsQ0FBaUIsRUFBakIsRUFDQSxTQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEtBQUssV0FBTCxDQUFpQixFQUFqQixHQUFvQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBcEIsQ0FBMUIsQ0FESjtBQUVBLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FIb0I7QUFJN0IsYUFBSyxLQUFMLEdBQVcsS0FBWCxDQUo2QjtBQUtwQixhQUFLLE1BQUwsR0FBWSxLQUFLLFdBQUwsQ0FBaUIsRUFBakIsQ0FMUTtBQU1wQixhQUFLLFFBQUwsR0FBYyxDQUFkLENBTm9CO0tBQXhCOzs7O21DQVNzQjtnQkFBVixnQkFBTixNQUFnQjs7QUFDbEIsZ0JBQUcsS0FBSyxRQUFMLElBQWUsS0FBSyxJQUFMLENBQVUsTUFBVixFQUNkLE9BQU8sSUFBUCxDQURKOztBQUdULGdCQUFJLFVBQVEsS0FBSyxHQUFMLEVBQVIsQ0FKdUI7QUFLbEIsaUJBQUssTUFBTCxDQUFZLEtBQVosR0FBa0IsNERBQWxCLENBTGtCOztBQU8zQixnQkFBSSxPQUFLLEtBQUssTUFBTCxDQUFZLFNBQVosR0FBc0IsS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixLQUFLLFFBQUwsQ0FBdkMsQ0FQa0I7QUFRM0IsZ0JBQUksT0FBSyxJQUFMLENBUnVCOzt3Q0FTQyxLQUFLLE1BQUwsQ0FBWSxxQkFBWixHQVREOztnQkFTYixvQ0FUYTtnQkFTUCxzQ0FUTzs7QUFVbEIsZ0JBQUcsU0FBTyxRQUFQLEVBQWdCO0FBQ2YsdUJBQUssRUFBQyxZQUFELEVBQU8sY0FBUCxFQUFlLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQXBELENBRGU7YUFBbkIsTUFFSztBQUNiLHVCQUFNLFFBQU0sUUFBTixJQUFrQixLQUFLLE1BQUwsRUFBWTtBQUNuQywyQkFBSyxLQUFLLE1BQUwsQ0FBWSxTQUFaLEdBQXNCLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFDLENBQUQsQ0FBbkMsQ0FEOEI7O2lEQUVsQixLQUFLLE1BQUwsQ0FBWSxxQkFBWixHQUZrQjs7QUFFakMseURBRmlDO0FBRTFCLDJEQUYwQjtpQkFBcEM7QUFJQSxvQkFBRyxLQUFLLE1BQUwsRUFBWTtBQUNkLDJCQUFLLEVBQUMsT0FBTSxRQUFOLEVBQWUsY0FBaEIsRUFBd0IsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBN0QsQ0FEYztpQkFBZixNQUVLOztBQUNKLDJCQUFLLEVBQUMsT0FBTSxRQUFOLEVBQWUsY0FBaEIsRUFBd0IsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBN0QsQ0FESTtpQkFGTDthQVBROztBQWNULG9CQUFRLElBQVIsaUNBQTBDLHFCQUFvQixLQUFLLEdBQUwsS0FBVyxPQUFYLENBQTlELEVBeEIyQjtBQXlCM0IsbUJBQU8sSUFBUCxDQXpCMkI7Ozs7Ozs7a0JBaERUIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxyXG5cclxudmFyIF90ZXh0Q29tcG9zZXJUaW1lPTBcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIEFueXtcclxuICAgIGRpc3BsYXlOYW1lPVwidGV4dFwiXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9XHJcblxyXG4gICAgY29tcG9zZSgpe1xyXG5cdFx0c3VwZXIuY29tcG9zZSgpXHJcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7Y2hpbGRyZW46IHJhd0NvbnRlbnR9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHt0ZXh0OiBtb2RpZmllZENvbnRlbnR9PXRoaXMuc3RhdGVcclxuICAgICAgICBsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuVGV4dENvbXBvc2VyKG1vZGlmaWVkQ29udGVudHx8cmF3Q29udGVudClcclxuICAgICAgICBsZXQgdGV4dD1udWxsXHJcbiAgICAgICAgd2hpbGUodGV4dD1jb21wb3Nlci5uZXh0KHBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKSkpe1xyXG5cdFx0XHRjb25zdCBpbmZvPXRleHRcclxuXHRcdFx0dGV4dC5vbkNsaWNrPWU9PnRoaXMub25DbGljayhlLGluZm8pXHJcblx0XHRcdGxldCBjb250ZW50PSg8dGV4dCB7Li4udGV4dH0vPilcclxuICAgICAgICAgICAgY29tcG9zZWQucHVzaChjb250ZW50KVxyXG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ29tcG9zZWQoY29udGVudClcclxuICAgICAgICB9XHJcblx0XHR0aGlzLmNvbnRleHQucGFyZW50Lm9uMUNoaWxkQ29tcG9zZWQodGhpcylcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGV2ZW50LCB0ZXh0KXtcclxuXHRcdGNvbnN0IHtvZmZzZXRYfT1ldmVudC5uYXRpdmVFdmVudFxyXG5cdFx0bGV0IGNvbXBvc2VyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLlRleHRDb21wb3Nlcih0ZXh0LmNoaWxkcmVuKVxyXG5cdFx0bGV0IGxvYz1jb21wb3Nlci5uZXh0KHt3aWR0aDpvZmZzZXRYfSl8fHtlbmQ6MH1cclxuXHRcdGxldCBpbmRleD10ZXh0LmVuZC10ZXh0LmNoaWxkcmVuLmxlbmd0aCtsb2MuZW5kXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3Vyc29yOmluZGV4LCB0ZXh0OlwiUmF5bW9uZCBjaGFuZ2VkIGl0XCJ9LCBhPT50aGlzLnJlQ29tcG9zZSgpKVxyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHQgKiAgYSBzaW1wbGUgdGV4dCBjb21wb3NlclxyXG5cdCAqL1xyXG4gICAgc3RhdGljIFRleHRDb21wb3Nlcj1jbGFzc3tcclxuICAgICAgICBzdGF0aWMgZWw7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRleHQsIHN0eWxlKXtcclxuICAgICAgICAgICAgaWYoIXRoaXMuY29uc3RydWN0b3IuZWwpXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29uc3RydWN0b3IuZWw9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKVxyXG4gICAgICAgICAgICB0aGlzLnRleHQ9dGV4dFxyXG5cdFx0XHR0aGlzLnN0eWxlPXN0eWxlXHJcbiAgICAgICAgICAgIHRoaXMudGVzdGVyPXRoaXMuY29uc3RydWN0b3IuZWxcclxuICAgICAgICAgICAgdGhpcy5jb21wb3NlZD0wXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuZXh0KHt3aWR0aDptYXhXaWR0aH0pe1xyXG4gICAgICAgICAgICBpZih0aGlzLmNvbXBvc2VkPT10aGlzLnRleHQubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcclxuXHRcdFx0XHJcblx0XHRcdGxldCBzdGFydEF0PURhdGUubm93KClcclxuICAgICAgICAgICAgdGhpcy50ZXN0ZXIuc3R5bGU9XCJtYXJnaW46MDtwYWRkaW5nOjA7Ym9yZGVyOjA7cG9zaXRpb246YWJzb2x1dGU7bGVmdDotMTAwMHB4XCJcclxuXHRcdFx0XHJcblx0XHRcdGxldCB0ZXh0PXRoaXMudGVzdGVyLmlubmVySFRNTD10aGlzLnRleHQuc3Vic3RyKHRoaXMuY29tcG9zZWQpXHJcblx0XHRcdGxldCBpbmZvPW51bGxcclxuICAgICAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHR9PXRoaXMudGVzdGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICAgIGlmKHdpZHRoPD1tYXhXaWR0aCl7XHJcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aCxoZWlnaHQsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcblx0XHRcdFx0d2hpbGUod2lkdGg+bWF4V2lkdGggJiYgdGV4dC5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0dGV4dD10aGlzLnRlc3Rlci5pbm5lckhUTUw9dGV4dC5zbGljZSgwLC0xKTtcclxuXHRcdFx0XHRcdCh7d2lkdGgsIGhlaWdodH09dGhpcy50ZXN0ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmKHRleHQubGVuZ3RoKXtcclxuXHRcdFx0XHRcdGluZm89e3dpZHRoOm1heFdpZHRoLGhlaWdodCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxyXG5cdFx0XHRcdH1lbHNley8vQFRPRE86IHRoZSBzcGFjZSBpcyB0b28gc21hbGwsIGdpdmUgYSBwbGFjZWhvbGRlclxyXG5cdFx0XHRcdFx0aW5mbz17d2lkdGg6bWF4V2lkdGgsaGVpZ2h0LCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zb2xlLmluZm8oYHRleHQgY29tcG9zZXIgdG90YWwgdGltZTogJHtfdGV4dENvbXBvc2VyVGltZSs9KERhdGUubm93KCktc3RhcnRBdCl9YClcclxuXHRcdFx0cmV0dXJuIGluZm9cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19