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
		key: "_newLine",
		value: function _newLine() {
			return {
				width: this.maxSize.width,
				_id: this._id,
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

			if (0 == composed.length) {
				var _context$parent$nextA = this.context.parent.nextAvailableSpace();

				var _width = _context$parent$nextA.width;
				var height = _context$parent$nextA.height;

				this.maxSize = { width: _width, height: height };
				composed.push(this._newLine());
			}
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
					{
						x: currentLine.width - availableWidth,
						index: this.children.length,
						width: contentWidth,
						height: contentHeight },
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
		value: function finished(child) {
			//need append last non-full-width line to parent
			if (_get(Object.getPrototypeOf(Paragraph.prototype), "finished", this).call(this, child)) {
				var composed = this.composed;
				var parent = this.context.parent;


				var currentLine = composed[composed.length - 1];
				var availableWidth = currentLine.children.reduce(function (prev, a) {
					return prev - a.props.width;
				}, currentLine.width);
				if (availableWidth > 0) {
					parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
				} else if (availableWidth == 0) {
					//already appended to parent in appendComposed
				}

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7Ozs7cU1BQ3BCLFFBQU07OztjQURjOzs2QkFHVjtBQUNULFVBQU87QUFDRyxXQUFPLEtBQUssT0FBTCxDQUFhLEtBQWI7QUFDaEIsU0FBSSxLQUFLLEdBQUw7QUFDSixZQUFPLENBQVA7QUFDUyxjQUFTLEVBQVQ7SUFKVixDQURTOzs7O3VDQVN3QjtPQUFaLGlFQUFTLGtCQUFHO3lCQUN3QixTQUE1QyxNQURvQjtPQUNkLCtDQUFhLG9CQURDOzBCQUN3QixTQUF2QixPQUREO09BQ1EsZ0RBQWEscUJBRHJCO09BRXBCLFdBQVUsS0FBVixTQUZvQjs7QUFHakMsT0FBRyxLQUFHLFNBQVMsTUFBVCxFQUFnQjtnQ0FDRixLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGtCQUFwQixHQURFOztRQUNoQixxQ0FEZ0I7UUFDVixzQ0FEVTs7QUFFckIsU0FBSyxPQUFMLEdBQWEsRUFBQyxhQUFELEVBQU8sY0FBUCxFQUFiLENBRnFCO0FBR3JCLGFBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxFQUFkLEVBSHFCO0lBQXRCO0FBS00sT0FBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBUnVCOztPQVV0QixRQUFPLFlBQVAsTUFWc0I7O0FBVzNCLE9BQUksaUJBQWUsWUFBWSxRQUFaLENBQXFCLE1BQXJCLENBQTRCLFVBQUMsSUFBRCxFQUFNLENBQU47V0FBVSxPQUFLLEVBQUUsS0FBRixDQUFRLEtBQVI7SUFBZixFQUE2QixLQUF6RCxDQUFmLENBWHVCO0FBWTNCLE9BQUcsa0JBQWdCLFlBQWhCLEVBQTZCO0FBQ3JDLFFBQUcsS0FBSyxPQUFMLENBQWEsTUFBYixHQUFvQixZQUFwQixFQUFpQztBQUNuQyxZQUFPLEtBQUssT0FBTCxDQUQ0QjtLQUFwQyxNQUVLO0FBQ0osWUFBTyxLQUFLLE9BQUwsR0FBYSxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGtCQUFwQixDQUF1QyxRQUF2QyxDQUFiLENBREg7S0FGTDtJQURLO0FBT0EsVUFBTyxFQUFDLE9BQU0sY0FBTixFQUFzQixRQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBckMsQ0FuQjJCOzs7O2lDQXNCaEIsTUFBSztPQUNULFdBQVUsS0FBVixTQURTO09BRVQsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZTOzs7QUFJdEIsT0FBSSxjQUFZLFNBQVMsU0FBUyxNQUFULEdBQWdCLENBQWhCLENBQXJCLENBSmtCO0FBS2hCLE9BQUksaUJBQWUsWUFBWSxRQUFaLENBQXFCLE1BQXJCLENBQTRCLFVBQUMsSUFBRCxFQUFNLENBQU47V0FBVSxPQUFLLEVBQUUsS0FBRixDQUFRLEtBQVI7SUFBZixFQUE2QixZQUFZLEtBQVosQ0FBeEUsQ0FMWTtxQkFNK0IsS0FBSyxLQUFMLENBTi9CO09BTUwsMkJBQU4sTUFOVztPQU1nQiw0QkFBUCxPQU5UOzs7QUFTdEIsT0FBSSxRQUFNLElBQU4sQ0FUa0I7QUFVaEIsT0FBRyxrQkFBZ0IsWUFBaEIsRUFBNkI7O0FBQzVCLFlBQ1A7OztBQUNDLFNBQUcsWUFBWSxLQUFaLEdBQWtCLGNBQWxCO0FBQ0gsYUFBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkO0FBQ1AsYUFBTyxZQUFQO0FBQ0EsY0FBUSxhQUFSLEVBSkQ7S0FLRSxJQUxGO0tBRE8sQ0FENEI7QUFVNUIsZ0JBQVksUUFBWixDQUFxQixJQUFyQixDQUEwQixLQUExQixFQVY0QjtBQVdyQyxnQkFBWSxNQUFaLEdBQW1CLEtBQUssR0FBTCxDQUFTLFlBQVksTUFBWixFQUFtQixhQUE1QixDQUFuQixDQVhxQztBQVlyQyxRQUFHLGtCQUFnQixZQUFoQixFQUE2QjtBQUMvQixZQUFPLGNBQVAsQ0FBc0IsOENBQVUsV0FBVixDQUF0QixFQUQrQjtBQUUvQixVQUFLLE9BQUwsQ0FBYSxNQUFiLElBQXFCLFlBQVksTUFBWixDQUZVO0tBQWhDO0lBWkssTUFnQkEsSUFBRyxpQkFBZSxZQUFmLEVBQTRCO0FBQ3BDLFFBQUcsS0FBSyxPQUFMLENBQWEsTUFBYixJQUFxQixhQUFyQixFQUFtQztBQUNyQyxjQUFTLElBQVQsQ0FBYyxLQUFLLFFBQUwsRUFBZCxFQURxQztBQUVyQyxTQUFHLGdCQUFjLEtBQUssT0FBTCxDQUFhLEtBQWIsRUFDaEIsS0FBSyxjQUFMLENBQW9CLElBQXBCLEVBREQsS0FFSTs7TUFGSjtLQUZELE1BT0ssRUFQTDtJQURLOzs7OzJCQWNFLE9BQU07O0FBQ2Qsa0NBM0VtQixtREEyRUQsTUFBbEIsRUFBeUI7UUFDakIsV0FBVSxLQUFWLFNBRGlCO1FBRWpCLFNBQVEsS0FBSyxPQUFMLENBQVIsT0FGaUI7OztBQUl4QixRQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FKb0I7QUFLeEIsUUFBSSxpQkFBZSxZQUFZLFFBQVosQ0FBcUIsTUFBckIsQ0FBNEIsVUFBQyxJQUFELEVBQU0sQ0FBTjtZQUFVLE9BQUssRUFBRSxLQUFGLENBQVEsS0FBUjtLQUFmLEVBQTZCLFlBQVksS0FBWixDQUF4RSxDQUxvQjtBQU14QixRQUFHLGlCQUFlLENBQWYsRUFBaUI7QUFDbkIsWUFBTyxjQUFQLENBQXNCLDhDQUFVLFdBQVYsQ0FBdEIsRUFEbUI7S0FBcEIsTUFFTSxJQUFHLGtCQUFnQixDQUFoQixFQUFrQjs7S0FBckI7O0FBSU4sU0FBSyxPQUFMLEdBQWEsRUFBQyxPQUFNLENBQU4sRUFBUyxRQUFPLENBQVAsRUFBdkIsQ0Fad0I7QUFheEIsV0FBTyxJQUFQLENBYndCO0lBQXpCOztBQWdCQSxVQUFPLEtBQVAsQ0FqQmM7Ozs7UUExRUsiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuaW1wb3J0IExpbmUgZnJvbSBcIi4uL2NvbXBvc2UvbGluZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIEFueXtcblx0c3RhdGU9e31cblxuXHRfbmV3TGluZSgpe1xuXHRcdHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogdGhpcy5tYXhTaXplLndpZHRoLFxuXHRcdFx0X2lkOnRoaXMuX2lkLFxuXHRcdFx0aGVpZ2h0OjAsXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuICAgICAgICB9XG5cdH1cblxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGlmKDA9PWNvbXBvc2VkLmxlbmd0aCl7XG5cdFx0XHRsZXQge3dpZHRoLGhlaWdodH09dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuXHRcdFx0dGhpcy5tYXhTaXplPXt3aWR0aCxoZWlnaHR9XG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblx0XHR9XG4gICAgICAgIGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsd2lkdGgpXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPD1taW5SZXF1aXJlZFcpe1xuXHRcdFx0aWYodGhpcy5tYXhTaXplLmhlaWdodD5taW5SZXF1aXJlZEgpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYXhTaXplXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRoaXMubWF4U2l6ZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcblx0XHRcdH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoOmF2YWlsYWJsZVdpZHRoLCBoZWlnaHQ6dGhpcy5tYXhTaXplLmhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZCh0ZXh0KXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRoLCBoZWlnaHQ6Y29udGVudEhlaWdodH09dGV4dC5wcm9wc1xuXG5cblx0XHRsZXQgcGllY2U9bnVsbFxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXsvL25vdCBhcHBlbmRlZCB0byBwYXJlbnRcbiAgICAgICAgICAgIHBpZWNlPShcblx0XHRcdFx0XHQ8R3JvdXAgXG5cdFx0XHRcdFx0XHR4PXtjdXJyZW50TGluZS53aWR0aC1hdmFpbGFibGVXaWR0aH1cblx0XHRcdFx0XHRcdGluZGV4PXt0aGlzLmNoaWxkcmVuLmxlbmd0aH1cblx0XHRcdFx0XHRcdHdpZHRoPXtjb250ZW50V2lkdGh9IFxuXHRcdFx0XHRcdFx0aGVpZ2h0PXtjb250ZW50SGVpZ2h0fT5cblx0XHRcdFx0XHRcdHt0ZXh0fVxuXHRcdFx0XHRcdDwvR3JvdXA+XG5cdFx0XHRcdFx0KVxuICAgICAgICAgICAgY3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChwaWVjZSlcblx0XHRcdGN1cnJlbnRMaW5lLmhlaWdodD1NYXRoLm1heChjdXJyZW50TGluZS5oZWlnaHQsY29udGVudEhlaWdodClcblx0XHRcdGlmKGF2YWlsYWJsZVdpZHRoPT1jb250ZW50V2lkdGgpe1xuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQoPExpbmUgey4uLmN1cnJlbnRMaW5lfS8+KVxuXHRcdFx0XHR0aGlzLm1heFNpemUuaGVpZ2h0LT1jdXJyZW50TGluZS5oZWlnaHRcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aDxjb250ZW50V2lkdGgpe1xuXHRcdFx0aWYodGhpcy5tYXhTaXplLmhlaWdodD49Y29udGVudEhlaWdodCl7XG5cdFx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHRcdFx0XHRpZihjb250ZW50V2lkdGg8PXRoaXMubWF4U2l6ZS53aWR0aClcblx0XHRcdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKHRleHQpXG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0Ly9uZXZlciBiZSBoZXJlXG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXG5cdFx0XHR9XG5cdFx0fVxuICAgIH1cblxuXHRmaW5pc2hlZChjaGlsZCl7Ly9uZWVkIGFwcGVuZCBsYXN0IG5vbi1mdWxsLXdpZHRoIGxpbmUgdG8gcGFyZW50XG5cdFx0aWYoc3VwZXIuZmluaXNoZWQoY2hpbGQpKXtcblx0XHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cblx0XHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblx0XHRcdGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcblx0XHRcdGlmKGF2YWlsYWJsZVdpZHRoPjApe1xuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQoPExpbmUgey4uLmN1cnJlbnRMaW5lfS8+KVxuXHRcdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg9PTApe1xuXHRcdFx0XHQvL2FscmVhZHkgYXBwZW5kZWQgdG8gcGFyZW50IGluIGFwcGVuZENvbXBvc2VkXG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMubWF4U2l6ZT17d2lkdGg6MCwgaGVpZ2h0OjB9XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuIl19