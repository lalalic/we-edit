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

var _line = require("../composed/line");

var _line2 = _interopRequireDefault(_line);

var _inline = require("./inline");

var _inline2 = _interopRequireDefault(_inline);

var _text = require("./text");

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Super = (0, _any.togglable)(_any2.default);

var Paragraph = function (_Super) {
	_inherits(Paragraph, _Super);

	function Paragraph() {
		_classCallCheck(this, Paragraph);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));

		_this.displayName = "paragraph";
		var content = _this.state.content;

		if (content.length == 0) {
			_this.whatIfEmpty();
		}
		return _this;
	}

	_createClass(Paragraph, [{
		key: "whatIfEmpty",
		value: function whatIfEmpty() {
			this.state.content.push(_react2.default.createElement(
				_inline2.default,
				{ contentStyle: this.context.getDefaultStyle("inline") },
				_react2.default.createElement(
					_text2.default,
					null,
					" "
				)
			));
		}
	}, {
		key: "_newLine",
		value: function _newLine() {
			return {
				width: this.availableSpace.width,
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

				this.availableSpace = { width: _width, height: height };
				composed.push(this._newLine());
			}
			var currentLine = composed[composed.length - 1];

			var width = currentLine.width;

			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, width);
			if (availableWidth <= minRequiredW) {
				if (this.availableSpace.height > minRequiredH) {
					return this.availableSpace;
				} else {
					return this.availableSpace = this.context.parent.nextAvailableSpace(required);
				}
			}
			return { width: availableWidth, height: this.availableSpace.height };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(content) {
			//@TODO: need consider availableSpace
			var composed = this.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			var _content$props = content.props;
			var contentWidth = _content$props.width;
			var contentHeight = _content$props.height;


			var piece = null;
			if (availableWidth == 0) {
				composed.push(this._newLine());
				this.appendComposed(content);
			} else if (availableWidth >= contentWidth) {
				//not appended to parent
				piece = _react2.default.createElement(
					_group2.default,
					{
						x: currentLine.width - availableWidth,
						index: this.children.length,
						width: contentWidth,
						height: contentHeight },
					content
				);
				currentLine.children.push(piece);
				currentLine.height = Math.max(currentLine.height, contentHeight);
				if (availableWidth == contentWidth) {
					parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
					this.availableSpace.height -= currentLine.height;
				}
			} else if (availableWidth < contentWidth) {
				if (this.availableSpace.height >= currentLine.height) {
					parent.appendComposed(_react2.default.createElement(_line2.default, currentLine));
					composed.push(this._newLine());

					if (contentWidth <= this.availableSpace.width) this.appendComposed(content);else {
						//never be here
					}
				} else {}
			}
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			//need append last non-full-width line to parent
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

			this.availableSpace = { width: 0, height: 0 };

			_get(Object.getPrototypeOf(Paragraph.prototype), "onAllChildrenComposed", this).call(this);
		}
	}]);

	return Paragraph;
}(Super);

Paragraph.contextTypes = Object.assign({
	getDefaultStyle: _react.PropTypes.func
}, Super.contextTypes);
exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQU0sa0NBQU47O0lBQ2lCOzs7QUFFcEIsVUFGb0IsU0FFcEIsR0FBYTt3QkFGTyxXQUVQOztxRUFGTyx1QkFHVixZQURHOztRQURiLGNBQVksWUFDQztNQUVMLFVBQVMsTUFBSyxLQUFMLENBQVQsUUFGSzs7QUFHWixNQUFHLFFBQVEsTUFBUixJQUFnQixDQUFoQixFQUFrQjtBQUNwQixTQUFLLFdBQUwsR0FEb0I7R0FBckI7ZUFIWTtFQUFiOztjQUZvQjs7Z0NBVVA7QUFDWixRQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLElBQW5CLENBQXdCOztNQUFRLGNBQWMsS0FBSyxPQUFMLENBQWEsZUFBYixDQUE2QixRQUE3QixDQUFkLEVBQVI7SUFBOEQ7Ozs7S0FBOUQ7SUFBeEIsRUFEWTs7Ozs2QkFJSDtBQUNULFVBQU87QUFDRyxXQUFPLEtBQUssY0FBTCxDQUFvQixLQUFwQjtBQUNoQixZQUFPLENBQVA7QUFDUyxjQUFTLEVBQVQ7SUFIVixDQURTOzs7O3VDQVF3QjtPQUFaLGlFQUFTLGtCQUFHO3lCQUN3QixTQUE1QyxNQURvQjtPQUNkLCtDQUFhLG9CQURDOzBCQUN3QixTQUF2QixPQUREO09BQ1EsZ0RBQWEscUJBRHJCO09BRXBCLFdBQVUsS0FBVixTQUZvQjs7QUFHakMsT0FBRyxLQUFHLFNBQVMsTUFBVCxFQUFnQjtnQ0FDRixLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGtCQUFwQixHQURFOztRQUNoQixxQ0FEZ0I7UUFDVixzQ0FEVTs7QUFFckIsU0FBSyxjQUFMLEdBQW9CLEVBQUMsYUFBRCxFQUFPLGNBQVAsRUFBcEIsQ0FGcUI7QUFHckIsYUFBUyxJQUFULENBQWMsS0FBSyxRQUFMLEVBQWQsRUFIcUI7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QUFNLENBQU47V0FBVSxPQUFLLEVBQUUsS0FBRixDQUFRLEtBQVI7SUFBZixFQUE2QixZQUFZLEtBQVosQ0FBeEUsQ0FMa0I7QUFNdEIsT0FBRyxpQkFBZSxDQUFmLEVBQWlCO0FBQ25CLFdBQU8sY0FBUCxDQUFzQiw4Q0FBVSxXQUFWLENBQXRCLEVBRG1CO0lBQXBCLE1BRU0sSUFBRyxrQkFBZ0IsQ0FBaEIsRUFBa0I7O0lBQXJCOztBQUlOLFFBQUssY0FBTCxHQUFvQixFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxFQUE5QixDQVpzQjs7QUFjdEIsOEJBdkdtQiwrREF1R25CLENBZHNCOzs7O1FBekZIO0VBQWtCOztBQUFsQixVQTBHYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGtCQUFpQixpQkFBVSxJQUFWO0NBREUsRUFFbEIsTUFBTSxZQUFOO2tCQTVHa0IiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55LCB7dG9nZ2xhYmxlfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQgTGluZSBmcm9tIFwiLi4vY29tcG9zZWQvbGluZVwiXG5cbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHRcIlxuXG5sZXQgU3VwZXI9dG9nZ2xhYmxlKEFueSlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIFN1cGVye1xuXHRkaXNwbGF5TmFtZT1cInBhcmFncmFwaFwiXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXG5cdFx0aWYoY29udGVudC5sZW5ndGg9PTApe1xuXHRcdFx0dGhpcy53aGF0SWZFbXB0eSgpXG5cdFx0fVxuXHR9XG5cdFxuXHR3aGF0SWZFbXB0eSgpe1xuXHRcdHRoaXMuc3RhdGUuY29udGVudC5wdXNoKDxJbmxpbmUgY29udGVudFN0eWxlPXt0aGlzLmNvbnRleHQuZ2V0RGVmYXVsdFN0eWxlKFwiaW5saW5lXCIpfT48VGV4dD4gPC9UZXh0PjwvSW5saW5lPilcblx0fVxuXG5cdF9uZXdMaW5lKCl7XG5cdFx0cmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmF2YWlsYWJsZVNwYWNlLndpZHRoLFxuXHRcdFx0aGVpZ2h0OjAsXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuICAgICAgICB9XG5cdH1cblxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGlmKDA9PWNvbXBvc2VkLmxlbmd0aCl7XG5cdFx0XHRsZXQge3dpZHRoLGhlaWdodH09dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuXHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZT17d2lkdGgsaGVpZ2h0fVxuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG5cdFx0fVxuICAgICAgICBsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG5cbiAgICAgICAgbGV0IHt3aWR0aH09Y3VycmVudExpbmVcbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLHdpZHRoKVxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aDw9bWluUmVxdWlyZWRXKXtcblx0XHRcdGlmKHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0Pm1pblJlcXVpcmVkSCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLmF2YWlsYWJsZVNwYWNlXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXG5cdFx0XHR9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt3aWR0aDphdmFpbGFibGVXaWR0aCwgaGVpZ2h0OnRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0fVxuICAgIH1cblxuICAgIGFwcGVuZENvbXBvc2VkKGNvbnRlbnQpey8vQFRPRE86IG5lZWQgY29uc2lkZXIgYXZhaWxhYmxlU3BhY2VcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRoLCBoZWlnaHQ6Y29udGVudEhlaWdodH09Y29udGVudC5wcm9wc1xuXG5cblx0XHRsZXQgcGllY2U9bnVsbFxuXHRcdGlmKGF2YWlsYWJsZVdpZHRoPT0wKXtcblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHRcdFx0dGhpcy5hcHBlbmRDb21wb3NlZChjb250ZW50KVxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPj1jb250ZW50V2lkdGgpey8vbm90IGFwcGVuZGVkIHRvIHBhcmVudFxuICAgICAgICAgICAgcGllY2U9KFxuXHRcdFx0XHRcdDxHcm91cFxuXHRcdFx0XHRcdFx0eD17Y3VycmVudExpbmUud2lkdGgtYXZhaWxhYmxlV2lkdGh9XG5cdFx0XHRcdFx0XHRpbmRleD17dGhpcy5jaGlsZHJlbi5sZW5ndGh9XG5cdFx0XHRcdFx0XHR3aWR0aD17Y29udGVudFdpZHRofVxuXHRcdFx0XHRcdFx0aGVpZ2h0PXtjb250ZW50SGVpZ2h0fT5cblx0XHRcdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0XHRcdDwvR3JvdXA+XG5cdFx0XHRcdFx0KVxuICAgICAgICAgICAgY3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChwaWVjZSlcblx0XHRcdGN1cnJlbnRMaW5lLmhlaWdodD1NYXRoLm1heChjdXJyZW50TGluZS5oZWlnaHQsY29udGVudEhlaWdodClcblx0XHRcdGlmKGF2YWlsYWJsZVdpZHRoPT1jb250ZW50V2lkdGgpe1xuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQoPExpbmUgey4uLmN1cnJlbnRMaW5lfS8+KVxuXHRcdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodC09Y3VycmVudExpbmUuaGVpZ2h0XG5cdFx0XHR9XG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg8Y29udGVudFdpZHRoKXtcblx0XHRcdGlmKHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0Pj1jdXJyZW50TGluZS5oZWlnaHQpe1xuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQoPExpbmUgey4uLmN1cnJlbnRMaW5lfS8+KVxuXHRcdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblxuXHRcdFx0XHRpZihjb250ZW50V2lkdGg8PXRoaXMuYXZhaWxhYmxlU3BhY2Uud2lkdGgpXG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRDb21wb3NlZChjb250ZW50KVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdC8vbmV2ZXIgYmUgaGVyZVxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblxuXHRcdFx0fVxuXHRcdH1cbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7Ly9uZWVkIGFwcGVuZCBsYXN0IG5vbi1mdWxsLXdpZHRoIGxpbmUgdG8gcGFyZW50XG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG5cdFx0bGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxuXHRcdGlmKGF2YWlsYWJsZVdpZHRoPjApe1xuXHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKDxMaW5lIHsuLi5jdXJyZW50TGluZX0vPilcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aD09MCl7XG5cdFx0XHQvL2FscmVhZHkgYXBwZW5kZWQgdG8gcGFyZW50IGluIGFwcGVuZENvbXBvc2VkXG5cdFx0fVxuXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZT17d2lkdGg6MCwgaGVpZ2h0OjB9XG5cblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHR9XG5cdFxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmNcblx0fSxTdXBlci5jb250ZXh0VHlwZXMpXG59XG4iXX0=