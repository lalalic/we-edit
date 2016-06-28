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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paragraph = function (_Any) {
	_inherits(Paragraph, _Any);

	function Paragraph() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Paragraph);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Paragraph)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Paragraph, [{
		key: "compose",
		value: function compose() {
			_get(Object.getPrototypeOf(Paragraph.prototype), "compose", this).call(this);
			var composed = this.composed;
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
			var composed = this.composed;

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
		key: "replaceAvailableSpace",
		value: function replaceAvailableSpace(reference) {
			var required = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			if (!reference) return this.nextAvailableSpace(required);

			var _required$width2 = required.width;
			var minRequiredW = _required$width2 === undefined ? 0 : _required$width2;
			var _required$height2 = required.height;
			var minRequiredH = _required$height2 === undefined ? 0 : _required$height2;
			var composed = this.composed;

			var _foundLine2 = this.foundLine(reference);

			var foundLine = _foundLine2.foundLine;
			var availableWidth = _foundLine2.availableWidth;

			if (availableWidth <= minRequiredW) {
				if (this.maxSize.height > minRequiredH) {
					return this.maxSize;
				} else {
					return this.maxSize = this.context.parent.replaceAvailableSpace(foundLine, required);
				}
			}
			return { width: availableWidth, height: this.maxSize.height };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(text) {
			var composed = this.composed;
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
			var composed = this.composed;
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
	}, {
		key: "_foundLine",
		value: function _foundLine(text) {}
	}]);

	return Paragraph;
}(_any2.default);

exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7cU1BQ3BCLFFBQU07OztjQURjOzs0QkFHUjtBQUNYLDhCQUptQixpREFJbkIsQ0FEVztPQUVFLFdBQVUsS0FBVixTQUZGO09BR0UsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUhGOzsrQkFJZ0IsT0FBTyxrQkFBUCxHQUpoQjs7T0FJRSxvQ0FKRjtPQUlRLHNDQUpSOztBQUtYLFFBQUssT0FBTCxHQUFhLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBYixDQUxXO0FBTUwsWUFBUyxJQUFULENBQWMsS0FBSyxRQUFMLEVBQWQsRUFOSzs7Ozs2QkFTRjtBQUNULFVBQU87QUFDRyxXQUFPLEtBQUssT0FBTCxDQUFhLEtBQWI7QUFDaEIsWUFBTyxDQUFQO0FBQ1MsY0FBUyxFQUFUO0lBSFYsQ0FEUzs7Ozt1Q0FRd0I7T0FBWixpRUFBUyxrQkFBRzt5QkFDd0IsU0FBNUMsTUFEb0I7T0FDZCwrQ0FBYSxvQkFEQzswQkFDd0IsU0FBdkIsT0FERDtPQUNRLGdEQUFhLHFCQURyQjtPQUVwQixXQUFVLEtBQVYsU0FGb0I7O0FBRzNCLE9BQUksY0FBWSxTQUFTLFNBQVMsTUFBVCxHQUFnQixDQUFoQixDQUFyQixDQUh1QjtPQUl0QixRQUFPLFlBQVAsTUFKc0I7O0FBSzNCLE9BQUksaUJBQWUsWUFBWSxRQUFaLENBQXFCLE1BQXJCLENBQTRCLFVBQUMsSUFBRCxFQUFNLENBQU47V0FBVSxPQUFLLEVBQUUsS0FBRixDQUFRLEtBQVI7SUFBZixFQUE2QixLQUF6RCxDQUFmLENBTHVCO0FBTTNCLE9BQUcsa0JBQWdCLFlBQWhCLEVBQTZCO0FBQ3JDLFFBQUcsS0FBSyxPQUFMLENBQWEsTUFBYixHQUFvQixZQUFwQixFQUFpQztBQUNuQyxZQUFPLEtBQUssT0FBTCxDQUQ0QjtLQUFwQyxNQUVLO0FBQ0osWUFBTyxLQUFLLE9BQUwsR0FBYSxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGtCQUFwQixDQUF1QyxRQUF2QyxDQUFiLENBREg7S0FGTDtJQURLO0FBT0EsVUFBTyxFQUFDLE9BQU0sY0FBTixFQUFzQixRQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBckMsQ0FiMkI7Ozs7d0NBZ0JaLFdBQXVCO09BQVosaUVBQVMsa0JBQUc7O0FBQzVDLE9BQUcsQ0FBQyxTQUFELEVBQ0YsT0FBTyxLQUFLLGtCQUFMLENBQXdCLFFBQXhCLENBQVAsQ0FERDs7MEJBR21ELFNBQTVDLE1BSnFDO09BSS9CLGdEQUFhLHFCQUprQjsyQkFJTyxTQUF2QixPQUpnQjtPQUlULGlEQUFhLHNCQUpKO09BSy9CLFdBQVUsS0FBVixTQUwrQjs7cUJBTU4sS0FBSyxTQUFMLENBQWUsU0FBZixFQU5NOztPQU1qQyxrQ0FOaUM7T0FNdEIsNENBTnNCOztBQU90QyxPQUFHLGtCQUFnQixZQUFoQixFQUE2QjtBQUNyQyxRQUFHLEtBQUssT0FBTCxDQUFhLE1BQWIsR0FBb0IsWUFBcEIsRUFBaUM7QUFDbkMsWUFBTyxLQUFLLE9BQUwsQ0FENEI7S0FBcEMsTUFFSztBQUNKLFlBQU8sS0FBSyxPQUFMLEdBQWEsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixxQkFBcEIsQ0FBMEMsU0FBMUMsRUFBb0QsUUFBcEQsQ0FBYixDQURIO0tBRkw7SUFESztBQU9BLFVBQU8sRUFBQyxPQUFNLGNBQU4sRUFBc0IsUUFBTyxLQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQXJDLENBZHNDOzs7O2lDQWdCM0IsTUFBSztPQUNULFdBQVUsS0FBVixTQURTO09BRVQsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZTOzs7QUFJdEIsT0FBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBSmtCO0FBS2hCLE9BQUksaUJBQWUsWUFBWSxRQUFaLENBQXFCLE1BQXJCLENBQTRCLFVBQUMsSUFBRCxFQUFNLENBQU47V0FBVSxPQUFLLEVBQUUsS0FBRixDQUFRLEtBQVI7SUFBZixFQUE2QixZQUFZLEtBQVosQ0FBeEUsQ0FMWTtxQkFNK0IsS0FBSyxLQUFMLENBTi9CO09BTUwsMkJBQU4sTUFOVztPQU1nQiw0QkFBUCxPQU5UOzs7QUFTdEIsT0FBSSxRQUFNLElBQU4sQ0FUa0I7QUFVaEIsT0FBRyxrQkFBZ0IsWUFBaEIsRUFBNkI7O0FBQzVCLFlBQU87O09BQU8sR0FBRyxZQUFZLEtBQVosR0FBa0IsY0FBbEIsRUFBa0MsT0FBTyxZQUFQLEVBQXFCLFFBQVEsYUFBUixFQUFqRTtLQUF5RixJQUF6RjtLQUFQLENBRDRCO0FBRTVCLGdCQUFZLFFBQVosQ0FBcUIsSUFBckIsQ0FBMEIsS0FBMUIsRUFGNEI7QUFHckMsZ0JBQVksTUFBWixHQUFtQixLQUFLLEdBQUwsQ0FBUyxZQUFZLE1BQVosRUFBbUIsYUFBNUIsQ0FBbkIsQ0FIcUM7QUFJckMsUUFBRyxrQkFBZ0IsWUFBaEIsRUFBNkI7QUFDL0IsWUFBTyxjQUFQLENBQXNCLDhDQUFVLFdBQVYsQ0FBdEIsRUFEK0I7QUFFL0IsVUFBSyxPQUFMLENBQWEsTUFBYixJQUFxQixZQUFZLE1BQVosQ0FGVTtLQUFoQztJQUpLLE1BUUEsSUFBRyxpQkFBZSxZQUFmLEVBQTRCO0FBQ3BDLFFBQUcsS0FBSyxPQUFMLENBQWEsTUFBYixJQUFxQixhQUFyQixFQUFtQztBQUNyQyxjQUFTLElBQVQsQ0FBYyxLQUFLLFFBQUwsRUFBZCxFQURxQztBQUVyQyxTQUFHLGdCQUFjLEtBQUssT0FBTCxDQUFhLEtBQWIsRUFDaEIsS0FBSyxjQUFMLENBQW9CLElBQXBCLEVBREQsS0FFSTs7TUFGSjtLQUZELE1BT0ssRUFQTDtJQURLOzs7OzZCQWNHOztPQUNGLFdBQVUsS0FBVixTQURFO09BRUksU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZKOzs7QUFJVCxPQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FKSztBQUtILE9BQUksaUJBQWUsWUFBWSxRQUFaLENBQXFCLE1BQXJCLENBQTRCLFVBQUMsSUFBRCxFQUFNLENBQU47V0FBVSxPQUFLLEVBQUUsS0FBRixDQUFRLEtBQVI7SUFBZixFQUE2QixZQUFZLEtBQVosQ0FBeEUsQ0FMRDtBQU1ULE9BQUcsaUJBQWUsQ0FBZixFQUFpQjtBQUNuQixXQUFPLGNBQVAsQ0FBc0IsOENBQVUsV0FBVixDQUF0QixFQURtQjtJQUFwQjtBQUdBLGtDQTdGbUIsa0RBNkZuQixFQUFvQjtBQUNuQixTQUFLLE9BQUwsR0FBYSxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxFQUF2QixDQURtQjtBQUVuQixXQUFPLElBQVAsQ0FGbUI7SUFBcEI7O0FBS0EsVUFBTyxLQUFQLENBZFM7Ozs7NkJBaUJDLE1BQUs7OztRQXJHSSIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZS9ncm91cFwiXG5pbXBvcnQgTGluZSBmcm9tIFwiLi4vY29tcG9zZS9saW5lXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgQW55e1xuXHRzdGF0ZT17fVxuXG4gICAgY29tcG9zZSgpe1xuXHRcdHN1cGVyLmNvbXBvc2UoKVxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG4gICAgICAgIGNvbnN0IHt3aWR0aCxoZWlnaHR9PXBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuXHRcdHRoaXMubWF4U2l6ZT17d2lkdGgsaGVpZ2h0fVxuICAgICAgICBjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcbiAgICB9XG5cblx0X25ld0xpbmUoKXtcblx0XHRyZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMubWF4U2l6ZS53aWR0aCxcblx0XHRcdGhlaWdodDowLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cbiAgICAgICAgfVxuXHR9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsd2lkdGgpXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPD1taW5SZXF1aXJlZFcpe1xuXHRcdFx0aWYodGhpcy5tYXhTaXplLmhlaWdodD5taW5SZXF1aXJlZEgpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYXhTaXplXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRoaXMubWF4U2l6ZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcblx0XHRcdH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoOmF2YWlsYWJsZVdpZHRoLCBoZWlnaHQ6dGhpcy5tYXhTaXplLmhlaWdodH1cbiAgICB9XG5cblx0cmVwbGFjZUF2YWlsYWJsZVNwYWNlKHJlZmVyZW5jZSwgcmVxdWlyZWQ9e30pe1xuXHRcdGlmKCFyZWZlcmVuY2UpXG5cdFx0XHRyZXR1cm4gdGhpcy5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXG5cdFx0XG5cdFx0Y29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGxldCB7Zm91bmRMaW5lLCBhdmFpbGFibGVXaWR0aH09dGhpcy5mb3VuZExpbmUocmVmZXJlbmNlKVxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aDw9bWluUmVxdWlyZWRXKXtcblx0XHRcdGlmKHRoaXMubWF4U2l6ZS5oZWlnaHQ+bWluUmVxdWlyZWRIKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMubWF4U2l6ZVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiB0aGlzLm1heFNpemU9dGhpcy5jb250ZXh0LnBhcmVudC5yZXBsYWNlQXZhaWxhYmxlU3BhY2UoZm91bmRMaW5lLHJlcXVpcmVkKVxuXHRcdFx0fVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGg6YXZhaWxhYmxlV2lkdGgsIGhlaWdodDp0aGlzLm1heFNpemUuaGVpZ2h0fVxuXHR9XG4gICAgYXBwZW5kQ29tcG9zZWQodGV4dCl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxuICAgICAgICBsZXQge3dpZHRoOmNvbnRlbnRXaWR0aCwgaGVpZ2h0OmNvbnRlbnRIZWlnaHR9PXRleHQucHJvcHNcblxuXG5cdFx0bGV0IHBpZWNlPW51bGxcbiAgICAgICAgaWYoYXZhaWxhYmxlV2lkdGg+PWNvbnRlbnRXaWR0aCl7Ly9ub3QgYXBwZW5kZWQgdG8gcGFyZW50XG4gICAgICAgICAgICBwaWVjZT0oPEdyb3VwIHg9e2N1cnJlbnRMaW5lLndpZHRoLWF2YWlsYWJsZVdpZHRofSB3aWR0aD17Y29udGVudFdpZHRofSBoZWlnaHQ9e2NvbnRlbnRIZWlnaHR9Pnt0ZXh0fTwvR3JvdXA+KVxuICAgICAgICAgICAgY3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChwaWVjZSlcblx0XHRcdGN1cnJlbnRMaW5lLmhlaWdodD1NYXRoLm1heChjdXJyZW50TGluZS5oZWlnaHQsY29udGVudEhlaWdodClcblx0XHRcdGlmKGF2YWlsYWJsZVdpZHRoPT1jb250ZW50V2lkdGgpe1xuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQoPExpbmUgey4uLmN1cnJlbnRMaW5lfS8+KVxuXHRcdFx0XHR0aGlzLm1heFNpemUuaGVpZ2h0LT1jdXJyZW50TGluZS5oZWlnaHRcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aDxjb250ZW50V2lkdGgpe1xuXHRcdFx0aWYodGhpcy5tYXhTaXplLmhlaWdodD49Y29udGVudEhlaWdodCl7XG5cdFx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHRcdFx0XHRpZihjb250ZW50V2lkdGg8PXRoaXMubWF4U2l6ZS53aWR0aClcblx0XHRcdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKHRleHQpXG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0Ly9uZXZlciBiZSBoZXJlXG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXG5cdFx0XHR9XG5cdFx0fVxuICAgIH1cblxuXHRmaW5pc2hlZCgpey8vbmVlZCBhcHBlbmQgbGFzdCBub24tZnVsbC13aWR0aCBsaW5lIHRvIHBhcmVudFxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxuXHRcdGlmKGF2YWlsYWJsZVdpZHRoPjApe1xuXHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKDxMaW5lIHsuLi5jdXJyZW50TGluZX0vPilcblx0XHR9XG5cdFx0aWYoc3VwZXIuZmluaXNoZWQoKSl7XG5cdFx0XHR0aGlzLm1heFNpemU9e3dpZHRoOjAsIGhlaWdodDowfVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0XG5cdF9mb3VuZExpbmUodGV4dCl7XG5cdFx0XG5cdH1cbn1cbiJdfQ==