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

												var composer = new this.constructor.WordWrapper(modifiedContent || rawContent);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3RleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O3NNQUNqQixjQUFZOzs7aUJBREs7O2lDQUdaO0FBQ1AsbUJBQU8sSUFBUCxDQURPOzs7O2tDQUlJOzs7QUFDWCx1Q0FSbUIsNENBUW5CLENBRFc7Z0JBRUUsV0FBVSxLQUFWLFNBRkY7Z0JBR0UsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUhGO2dCQUlNLGFBQVksS0FBSyxLQUFMLENBQXRCLFNBSkk7Z0JBS0Usa0JBQWlCLEtBQUssS0FBTCxDQUF2QixLQUxJOztBQU1MLGdCQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsbUJBQWlCLFVBQWpCLENBQTFDLENBTkM7QUFPTCxnQkFBSSxPQUFLLElBQUwsQ0FQQzs7O0FBU1Ysb0JBQU0sT0FBSyxJQUFMO0FBQ04scUJBQUssT0FBTCxHQUFhOzJCQUFHLE9BQUssT0FBTCxDQUFhLENBQWIsRUFBZSxJQUFmO2lCQUFIO0FBQ2Isb0JBQUksVUFBUyxzQ0FBVSxJQUFWLENBQVQ7QUFDSyx5QkFBUyxJQUFULENBQWMsT0FBZDtBQUNBLHVCQUFPLGNBQVAsQ0FBc0IsT0FBdEI7Y0FiQzs7QUFRTCxtQkFBTSxPQUFLLFNBQVMsSUFBVCxDQUFjLE9BQU8sa0JBQVAsRUFBZCxDQUFMLEVBQWdEOzthQUF0RDtBQU9OLGlCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQWZXOzs7O2dDQWtCRCxPQUFPLE1BQUs7OztnQkFDZixVQUFTLE1BQU0sV0FBTixDQUFULFFBRGU7O0FBRXRCLGdCQUFJLFdBQVMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsV0FBakIsQ0FBNkIsS0FBSyxRQUFMLENBQTFDLENBRmtCO0FBR3RCLGdCQUFJLE1BQUksU0FBUyxJQUFULENBQWMsRUFBQyxPQUFNLE9BQU4sRUFBZixLQUFnQyxFQUFDLEtBQUksQ0FBSixFQUFqQyxDQUhjO0FBSXRCLGdCQUFJLFFBQU0sS0FBSyxHQUFMLEdBQVMsS0FBSyxRQUFMLENBQWMsTUFBZCxHQUFxQixJQUFJLEdBQUosQ0FKbEI7QUFLaEIsaUJBQUssUUFBTCxDQUFjLEVBQUMsUUFBTyxLQUFQLEVBQWMsTUFBSyxvQkFBTCxFQUE3QixFQUF5RDt1QkFBRyxPQUFLLFNBQUw7YUFBSCxDQUF6RCxDQUxnQjs7OztXQXpCSDs7O0tBaUNiO2tCQWpDYSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBIdG1sV29yZFdyYXBwZXIgZnJvbSBcIi4uL3dvcmR3cmFwL2h0bWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dCBleHRlbmRzIEFueXtcclxuICAgIGRpc3BsYXlOYW1lPVwidGV4dFwiXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9XHJcblxyXG4gICAgY29tcG9zZSgpe1xyXG5cdFx0c3VwZXIuY29tcG9zZSgpXHJcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRjb25zdCB7Y2hpbGRyZW46IHJhd0NvbnRlbnR9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHt0ZXh0OiBtb2RpZmllZENvbnRlbnR9PXRoaXMuc3RhdGVcclxuICAgICAgICBsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIobW9kaWZpZWRDb250ZW50fHxyYXdDb250ZW50KVxyXG4gICAgICAgIGxldCB0ZXh0PW51bGxcclxuICAgICAgICB3aGlsZSh0ZXh0PWNvbXBvc2VyLm5leHQocGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpKSl7XHJcblx0XHRcdGNvbnN0IGluZm89dGV4dFxyXG5cdFx0XHR0ZXh0Lm9uQ2xpY2s9ZT0+dGhpcy5vbkNsaWNrKGUsaW5mbylcclxuXHRcdFx0bGV0IGNvbnRlbnQ9KDx0ZXh0IHsuLi50ZXh0fS8+KVxyXG4gICAgICAgICAgICBjb21wb3NlZC5wdXNoKGNvbnRlbnQpXHJcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDb21wb3NlZChjb250ZW50KVxyXG4gICAgICAgIH1cclxuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZXZlbnQsIHRleHQpe1xyXG5cdFx0Y29uc3Qge29mZnNldFh9PWV2ZW50Lm5hdGl2ZUV2ZW50XHJcblx0XHRsZXQgY29tcG9zZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuV29yZFdyYXBwZXIodGV4dC5jaGlsZHJlbilcclxuXHRcdGxldCBsb2M9Y29tcG9zZXIubmV4dCh7d2lkdGg6b2Zmc2V0WH0pfHx7ZW5kOjB9XHJcblx0XHRsZXQgaW5kZXg9dGV4dC5lbmQtdGV4dC5jaGlsZHJlbi5sZW5ndGgrbG9jLmVuZFxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1cnNvcjppbmRleCwgdGV4dDpcIlJheW1vbmQgY2hhbmdlZCBpdFwifSwgYT0+dGhpcy5yZUNvbXBvc2UoKSlcclxuICAgIH1cclxuXHJcblx0c3RhdGljIFdvcmRXcmFwcGVyPUh0bWxXb3JkV3JhcHBlclxyXG59XHJcbiJdfQ==