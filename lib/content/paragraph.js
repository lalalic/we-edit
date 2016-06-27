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

var _line = require("../compose/line");

var _line2 = _interopRequireDefault(_line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paragraph = function (_Any) {
	_inherits(Paragraph, _Any);

	function Paragraph() {
		_classCallCheck(this, Paragraph);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));
	}

	_createClass(Paragraph, [{
		key: "render",
		value: function render() {
			var _state = this.state;
			var id = _state.id;
			var index = _state.index;
			var append = _state.append;

			if (!append) return _get(Object.getPrototypeOf(Paragraph.prototype), "render", this).call(this);

			var _props = this.props;
			var children = _props.children;

			var others = _objectWithoutProperties(_props, ["children"]);

			return _react2.default.createElement(
				_group2.default,
				others,
				children.map(function (a, i) {
					if (id == i) {
						var text = a.props.children;

						return _react2.default.cloneElement(a, { key: i, children: text.splice(index, 0, append) });
					} else {
						return _react2.default.cloneElement(a, { key: i });
					}
				})
			);
		}
	}, {
		key: "compose",
		value: function compose() {
			var composed = this.state.composed;
			var parent = this.context.parent;

			var _parent$nextAvailable = parent.nextAvailableSpace();

			var width = _parent$nextAvailable.width;
			var height = _parent$nextAvailable.height;

			this.maxSize = { width: width, height: height };
			composed.push(this._newLine());
		}
	}, {
		key: "_newLine",
		value: function _newLine() {
			return {
				width: this.maxSize.width,
				height: 0,
				children: []
			};
		}
	}, {
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var required = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			var _required$width = required.width;
			var minRequiredW = _required$width === undefined ? 0 : _required$width;
			var _required$height = required.height;
			var minRequiredH = _required$height === undefined ? 0 : _required$height;
			var composed = this.state.composed;

			var currentLine = composed[composed.length - 1];
			var width = currentLine.width;

			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, width);
			if (availableWidth <= minRequiredW) {
				if (this.maxSize.height > minRequiredH) {
					return this.maxSize;
				} else {
					return this.maxSize = this.context.parent.nextAvailableSpace(required);
				}
			}
			return { width: availableWidth, height: this.maxSize.height };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(text) {
			var composed = this.state.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			var _text$props = text.props;
			var contentWidth = _text$props.width;
			var contentHeight = _text$props.height;


			var piece = null;
			if (availableWidth >= contentWidth) {
				//not appended to parent
				piece = _react2.default.createElement(
					_group2.default,
					{ x: currentLine.width - availableWidth, width: contentWidth, height: contentHeight },
					text
				);
				currentLine.children.push(piece);
				currentLine.height = Math.max(currentLine.height, contentHeight);
				if (availableWidth == contentWidth) {
					parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
					this.maxSize.height -= currentLine.height;
				}
			} else if (availableWidth < contentWidth) {
				if (this.maxSize.height >= contentHeight) {
					composed.push(this._newLine());
					if (contentWidth <= this.maxSize.width) this.appendComposed(text);else {
						//never be here
					}
				} else {}
			}
		}
	}, {
		key: "finished",
		value: function finished() {
			//need append last non-full-width line to parent
			var composed = this.state.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			if (availableWidth > 0) {
				parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
			}
			if (_get(Object.getPrototypeOf(Paragraph.prototype), "finished", this).call(this)) {
				this.maxSize = { width: 0, height: 0 };
				return true;
			}

			return false;
		}
	}]);

	return Paragraph;
}(_any2.default);

exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OzsyQkFDWjtnQkFDaUIsS0FBSyxLQUFMLENBRGpCO09BQ0EsZUFEQTtPQUNHLHFCQURIO09BQ1MsdUJBRFQ7O0FBRVAsT0FBRyxDQUFDLE1BQUQsRUFDRixrQ0FKa0IsZ0RBSWxCLENBREQ7O2dCQUc0QixLQUFLLEtBQUwsQ0FMckI7T0FLQSwyQkFMQTs7T0FLYSx3REFMYjs7QUFPUCxVQUNDOztJQUFXLE1BQVg7SUFDRSxTQUFTLEdBQVQsQ0FBYSxVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDcEIsU0FBRyxNQUFJLENBQUosRUFBTTtVQUNNLE9BQU0sRUFBRSxLQUFGLENBQWYsU0FERzs7QUFFUixhQUFPLGdCQUFNLFlBQU4sQ0FBbUIsQ0FBbkIsRUFBcUIsRUFBQyxLQUFJLENBQUosRUFBTyxVQUFVLEtBQUssTUFBTCxDQUFZLEtBQVosRUFBa0IsQ0FBbEIsRUFBb0IsTUFBcEIsQ0FBVixFQUE3QixDQUFQLENBRlE7TUFBVCxNQUdLO0FBQ0osYUFBTyxnQkFBTSxZQUFOLENBQW1CLENBQW5CLEVBQXFCLEVBQUMsS0FBSSxDQUFKLEVBQXRCLENBQVAsQ0FESTtNQUhMO0tBRGEsQ0FEZjtJQURELENBUE87Ozs7NEJBb0JJO09BQ0UsV0FBVSxLQUFLLEtBQUwsQ0FBVixTQURGO09BRUUsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZGOzsrQkFHZ0IsT0FBTyxrQkFBUCxHQUhoQjs7T0FHRSxvQ0FIRjtPQUdRLHNDQUhSOztBQUlYLFFBQUssT0FBTCxHQUFhLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBYixDQUpXO0FBS0wsWUFBUyxJQUFULENBQWMsS0FBSyxRQUFMLEVBQWQsRUFMSzs7Ozs2QkFRRjtBQUNULFVBQU87QUFDRyxXQUFPLEtB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QU0sQ0FBTjtXQUFVLE9BQUssRUFBRSxLQUFGLENBQVEsS0FBUjtJQUFmLEVBQTZCLFlBQVksS0FBWixDQUF4RSxDQUxEO0FBTVQsT0FBRyxpQkFBZSxDQUFmLEVBQWlCO0FBQ25CLFdBQU8sY0FBUCxDQUFzQiw4Q0FBVSxXQUFWLENBQXRCLEVBRG1CO0lBQXBCO0FBR0Esa0NBOUZtQixrREE4Rm5CLEVBQW9CO0FBQ25CLFNBQUssT0FBTCxHQUFhLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLEVBQXZCLENBRG1CO0FBRW5CLFdBQU8sSUFBUCxDQUZtQjtJQUFwQjs7QUFLQSxVQUFPLEtBQVAsQ0FkUzs7OztRQXJGVSIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZS9ncm91cFwiXG5pbXBvcnQgTGluZSBmcm9tIFwiLi4vY29tcG9zZS9saW5lXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgQW55e1xuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7aWQsaW5kZXgsYXBwZW5kfT10aGlzLnN0YXRlXG5cdFx0aWYoIWFwcGVuZClcblx0XHRcdHJldHVybiBzdXBlci5yZW5kZXIoKVxuXHRcdFx0XG5cdFx0Y29uc3Qge2NoaWxkcmVuLCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHsuLi5vdGhlcnN9PlxuXHRcdFx0XHR7Y2hpbGRyZW4ubWFwKChhLGkpPT57XG5cdFx0XHRcdFx0aWYoaWQ9PWkpe1xuXHRcdFx0XHRcdFx0bGV0IHtjaGlsZHJlbjp0ZXh0fT1hLnByb3BzXG5cdFx0XHRcdFx0XHRyZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGEse2tleTppLCBjaGlsZHJlbjogdGV4dC5zcGxpY2UoaW5kZXgsMCxhcHBlbmQpfSlcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoYSx7a2V5Oml9KVx0XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KX1cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuXHR9XG4gICAgY29tcG9zZSgpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIGNvbnN0IHt3aWR0aCxoZWlnaHR9PXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuXHRcdHRoaXMubWF4U2l6ZT17d2lkdGgsaGVpZ2h0fVxuICAgICAgICBjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcbiAgICB9XG5cdFxuXHRfbmV3TGluZSgpe1xuXHRcdHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5tYXhTaXplLndpZHRoLFxuXHRcdFx0aGVpZ2h0OjAsXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuICAgICAgICB9XG5cdH1cblxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5zdGF0ZVxuICAgICAgICBsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGh9PWN1cnJlbnRMaW5lXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCx3aWR0aClcbiAgICAgICAgaWYoYXZhaWxhYmxlV2lkdGg8PW1pblJlcXVpcmVkVyl7XG5cdFx0XHRpZih0aGlzLm1heFNpemUuaGVpZ2h0Pm1pblJlcXVpcmVkSCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLm1heFNpemVcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYXhTaXplPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGg6YXZhaWxhYmxlV2lkdGgsIGhlaWdodDp0aGlzLm1heFNpemUuaGVpZ2h0fVxuICAgIH1cblxuICAgIGFwcGVuZENvbXBvc2VkKHRleHQpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuc3RhdGVcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cdFx0XG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRoLCBoZWlnaHQ6Y29udGVudEhlaWdodH09dGV4dC5wcm9wc1xuICAgICAgICBcblx0XHRcblx0XHRsZXQgcGllY2U9bnVsbFxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXsvL25vdCBhcHBlbmRlZCB0byBwYXJlbnRcbiAgICAgICAgICAgIHBpZWNlPSg8R3JvdXAgeD17Y3VycmVudExpbmUud2lkdGgtYXZhaWxhYmxlV2lkdGh9IHdpZHRoPXtjb250ZW50V2lkdGh9IGhlaWdodD17Y29udGVudEhlaWdodH0+e3RleHR9PC9Hcm91cD4pXG4gICAgICAgICAgICBjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKHBpZWNlKVxuXHRcdFx0Y3VycmVudExpbmUuaGVpZ2h0PU1hdGgubWF4KGN1cnJlbnRMaW5lLmhlaWdodCxjb250ZW50SGVpZ2h0KVxuXHRcdFx0aWYoYXZhaWxhYmxlV2lkdGg9PWNvbnRlbnRXaWR0aCl7XG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCg8TGluZSB7Li4uY3VycmVudExpbmV9Lz4pXG5cdFx0XHRcdHRoaXMubWF4U2l6ZS5oZWlnaHQtPWN1cnJlbnRMaW5lLmhlaWdodFxuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPGNvbnRlbnRXaWR0aCl7XG5cdFx0XHRpZih0aGlzLm1heFNpemUuaGVpZ2h0Pj1jb250ZW50SGVpZ2h0KXtcblx0XHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG5cdFx0XHRcdGlmKGNvbnRlbnRXaWR0aDw9dGhpcy5tYXhTaXplLndpZHRoKVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQodGV4dClcblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHQvL25ldmVyIGJlIGhlcmVcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdFxuXHRcdFx0fVxuXHRcdH1cbiAgICB9XG5cdFxuXHRmaW5pc2hlZCgpey8vbmVlZCBhcHBlbmQgbGFzdCBub24tZnVsbC13aWR0aCBsaW5lIHRvIHBhcmVudFxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5zdGF0ZVxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblx0XHRcblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcblx0XHRpZihhdmFpbGFibGVXaWR0aD4wKXtcblx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCg8TGluZSB7Li4uY3VycmVudExpbmV9Lz4pXG5cdFx0fVxuXHRcdGlmKHN1cGVyLmZpbmlzaGVkKCkpe1xuXHRcdFx0dGhpcy5tYXhTaXplPXt3aWR0aDowLCBoZWlnaHQ6MH1cblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuIl19