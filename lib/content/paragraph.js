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

var Super = (0, _any.styleInheritable)(_any2.default);

var Paragraph = function (_Super) {
	_inherits(Paragraph, _Super);

	function Paragraph() {
		_classCallCheck(this, Paragraph);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));
	}

	_createClass(Paragraph, [{
		key: "_newLine",
		value: function _newLine() {
			return {
				width: this.lineWidth(),
				height: 0,
				descent: 0,
				children: []
			};
		}
	}, {
		key: "lineWidth",
		value: function lineWidth() {
			var _getStyle = this.getStyle();

			var _getStyle$indent = _getStyle.indent;
			var _getStyle$indent$left = _getStyle$indent.left;
			var left = _getStyle$indent$left === undefined ? 0 : _getStyle$indent$left;
			var _getStyle$indent$righ = _getStyle$indent.right;
			var right = _getStyle$indent$righ === undefined ? 0 : _getStyle$indent$righ;
			var _getStyle$indent$firs = _getStyle$indent.firstLine;
			var firstLine = _getStyle$indent$firs === undefined ? 0 : _getStyle$indent$firs;
			var _getStyle$indent$hang = _getStyle$indent.hanging;
			var hanging = _getStyle$indent$hang === undefined ? 0 : _getStyle$indent$hang;
			var width = this.availableSpace.width;

			width -= left + right;
			if (this.computed.composed.length == 0) width -= firstLine;else width -= hanging;
			return width;
		}
	}, {
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var required = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			//@TODO: need consider availableSpace.height
			var _required$width = required.width;
			var minRequiredW = _required$width === undefined ? 0 : _required$width;
			var _required$height = required.height;
			var minRequiredH = _required$height === undefined ? 0 : _required$height;
			var composed = this.computed.composed;

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
				if (this.availableSpace.height < minRequiredH) this.availableSpace = this.context.parent.nextAvailableSpace(required);

				availableWidth = this.lineWidth();
			}
			return { width: availableWidth, height: this.availableSpace.height };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(content) {
			//@TODO: need consider availableSpace.height
			var composed = this.computed.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			var _content$props = content.props;
			var contentWidth = _content$props.width;
			var contentHeight = _content$props.height;
			var _content$props$descen = _content$props.descent;
			var contentDescent = _content$props$descen === undefined ? 0 : _content$props$descen;


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
						index: this.computed.children.length,
						descent: contentDescent,
						width: contentWidth,
						height: contentHeight },
					content
				);
				currentLine.children.push(piece);
				currentLine.height = Math.max(currentLine.height, contentHeight);
				currentLine.descent = Math.max(currentLine.descent, contentDescent);
				if (availableWidth == contentWidth) {
					parent.appendComposed(this.createComposed2Parent(currentLine));
				}
			} else if (availableWidth < contentWidth) {
				if (this.availableSpace.height >= currentLine.height) {
					parent.appendComposed(this.createComposed2Parent(currentLine));
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
			var composed = this.computed.composed;
			var parent = this.context.parent;


			var currentLine = composed[composed.length - 1];
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			if (availableWidth > 0) {
				parent.appendComposed(this.createComposed2Parent(currentLine));
			} else if (availableWidth == 0) {
				//already appended to parent in appendComposed
			}

			this.availableSpace = { width: 0, height: 0 };

			_get(Object.getPrototypeOf(Paragraph.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			var height = props.height;
			var width = props.width;

			var _getStyle2 = this.getStyle();

			var _getStyle2$spacing = _getStyle2.spacing;
			var _getStyle2$spacing$li = _getStyle2$spacing.lineHeight;
			var lineHeight = _getStyle2$spacing$li === undefined ? "100%" : _getStyle2$spacing$li;
			var _getStyle2$spacing$to = _getStyle2$spacing.top;
			var top = _getStyle2$spacing$to === undefined ? 0 : _getStyle2$spacing$to;
			var _getStyle2$spacing$bo = _getStyle2$spacing.bottom;
			var bottom = _getStyle2$spacing$bo === undefined ? 0 : _getStyle2$spacing$bo;
			var _getStyle2$indent = _getStyle2.indent;
			var _getStyle2$indent$lef = _getStyle2$indent.left;
			var left = _getStyle2$indent$lef === undefined ? 0 : _getStyle2$indent$lef;
			var _getStyle2$indent$rig = _getStyle2$indent.right;
			var right = _getStyle2$indent$rig === undefined ? 0 : _getStyle2$indent$rig;
			var _getStyle2$indent$fir = _getStyle2$indent.firstLine;
			var firstLine = _getStyle2$indent$fir === undefined ? 0 : _getStyle2$indent$fir;
			var _getStyle2$indent$han = _getStyle2$indent.hanging;
			var hanging = _getStyle2$indent$han === undefined ? 0 : _getStyle2$indent$han;

			var contentY = 0,
			    contentX = left;

			lineHeight = typeof lineHeight == 'string' ? Math.ceil(height * parseInt(lineHeight) / 100.0) : lineHeight;

			if (this.computed.composed.length == 1) {
				//first line
				lineHeight += top;
				contentY += top;
				contentX += firstLine;
			} else {
				contentX += hanging;
			}

			if (this.isAllChildrenComposed()) {
				//last line
				lineHeight += bottom;
			}

			this.availableSpace.height -= lineHeight;

			return _react2.default.createElement(
				_group2.default,
				{ height: lineHeight, width: width },
				_react2.default.createElement(
					_group2.default,
					{ x: contentX, y: contentY },
					_react2.default.createElement(_line2.default, props)
				)
			);
		}
	}, {
		key: "getStyle",
		value: function getStyle() {
			if (this._style) return this._style;
			var spacing = this.style('paragraph.spacing') || {};
			var indent = this.style('paragraph.ind') || {};
			return this._style = { spacing: spacing, indent: indent };
		}
	}]);

	return Paragraph;
}(Super);

Paragraph.displayName = "paragraph";
Paragraph.contextTypes = Object.assign({
	getDefaultStyle: _react.PropTypes.func
}, Super.contextTypes);
exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQU0seUNBQU47O0lBQ2lCOzs7Ozs7Ozs7Ozs2QkFHVjtBQUNILFVBQU87QUFDSCxXQUFPLEtBQUssU0FBTCxFQUFQO0FBQ1QsWUFBTyxDQUFQO0FBQ0EsYUFBUSxDQUFSO0FBQ1MsY0FBUyxFQUFUO0lBSkosQ0FERzs7Ozs4QkFTQzttQkFDNEMsS0FBSyxRQUFMLEdBRDVDOztvQ0FDSCxPQURHO2dEQUNLLEtBREw7T0FDSyw2Q0FBSywwQkFEVjtnREFDWSxNQURaO09BQ1ksOENBQU0sMEJBRGxCO2dEQUNvQixVQURwQjtPQUNvQixrREFBVSwwQkFEOUI7Z0RBQ2dDLFFBRGhDO09BQ2dDLGdEQUFRLDBCQUR4QztPQUVDLFFBQU8sS0FBSyxjQUFMLENBQVAsTUFGRDs7QUFHSixZQUFRLE9BQUssS0FBTCxDQUhKO0FBSUosT0FBRyxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLElBQStCLENBQS9CLEVBQ0MsU0FBTyxTQUFQLENBREosS0FHSSxTQUFPLE9BQVAsQ0FISjtBQUlOLFVBQU8sS0FBUCxDQVJVOzs7O3VDQVd1QjtPQUFaLGlFQUFTLGtCQUFHOzt5QkFDd0IsU0FBNUMsTUFEb0I7T0FDZCwrQ0FBYSxvQkFEQzswQkFDd0IsU0FBdkIsT0FERDtPQUNRLGdEQUFhLHFCQURyQjtPQUVwQixXQUFVLEtBQUssUUFBTCxDQUFWLFNBRm9COztBQUdqQyxPQUFHLEtBQUcsU0FBUyxNQUFULEVBQWdCO2dDQUNGLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0Isa0JBQXBCLEdBREU7O1FBQ2hCLHFDQURnQjtRQUNWLHNDQURVOztBQUVyQixTQUFLLGNBQUwsR0FBb0IsRUFBQyxhQUFELEVBQU8sY0FBUCxFQUFwQixD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QyxHQUE2RSxVQUE3RSxDQUxhOztBQU94QixPQUFHLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsSUFBK0IsQ0FBL0IsRUFBaUM7O0FBQ2hDLGtCQUFZLEdBQVosQ0FEZ0M7QUFFaEMsZ0JBQVUsR0FBVixDQUZnQztBQUd6QyxnQkFBVSxTQUFWLENBSHlDO0lBQXBDLE1BSUs7QUFDVixnQkFBVSxPQUFWLENBRFU7SUFKTDs7QUFRQSxPQUFHLEtBQUsscUJBQUwsRUFBSCxFQUFnQzs7QUFDNUIsa0JBQVksTUFBWixDQUQ0QjtJQUFoQzs7QUFJTixRQUFLLGNBQUwsQ0FBb0IsTUFBcEIsSUFBNEIsVUFBNUIsQ0FuQjhCOztBQXFCeEIsVUFDSTs7TUFBTyxRQUFRLFVBQVIsRUFBb0IsT0FBTyxLQUFQLEVBQTNCO0lBQ0k7O09BQU8sR0FBRyxRQUFILEVBQWEsR0FBRyxRQUFILEVBQXBCO0tBQ0ksOENBQVUsS0FBVixDQURKO0tBREo7SUFESixDQXJCd0I7Ozs7NkJBOEJsQjtBQUNOLE9BQUcsS0FBSyxNQUFMLEVBQ0MsT0FBTyxLQUFLLE1BQUwsQ0FEWDtBQUVBLE9BQUksVUFBUSxLQUFLLEtBQUwsQ0FBVyxtQkFBWCxLQUFpQyxFQUFqQyxDQUhOO0FBSU4sT0FBSSxTQUFPLEtBQUssS0FBTCxDQUFXLGVBQVgsS0FBNkIsRUFBN0IsQ0FKTDtBQUtOLFVBQU8sS0FBSyxNQUFMLEdBQVksRUFBQyxnQkFBRCxFQUFTLGNBQVQsRUFBWixDQUxEOzs7O1FBeklPO0VBQWtCOztBQUFsQixVQUNiLGNBQVk7QUFEQyxVQWlKYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGtCQUFpQixpQkFBVSxJQUFWO0NBREUsRUFFbEIsTUFBTSxZQUFOO2tCQW5Ka0IiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55LCB7c3R5bGVJbmhlcml0YWJsZX0gZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0IExpbmUgZnJvbSBcIi4uL2NvbXBvc2VkL2xpbmVcIlxuXG5pbXBvcnQgSW5saW5lIGZyb20gXCIuL2lubGluZVwiXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcblxubGV0IFN1cGVyPXN0eWxlSW5oZXJpdGFibGUoQW55KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgU3VwZXJ7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInBhcmFncmFwaFwiXG5cblx0X25ld0xpbmUoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmxpbmVXaWR0aCgpLFxuXHRcdFx0aGVpZ2h0OjAsXG5cdFx0XHRkZXNjZW50OjAsXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuICAgICAgICB9XG5cdH1cblxuXHRsaW5lV2lkdGgoKXtcblx0XHRjb25zdCB7aW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcbiAgICAgICAgbGV0IHt3aWR0aH09dGhpcy5hdmFpbGFibGVTcGFjZVxuICAgICAgICB3aWR0aC09KGxlZnQrcmlnaHQpXG4gICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wKVxuICAgICAgICAgICAgd2lkdGgtPWZpcnN0TGluZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3aWR0aC09aGFuZ2luZ1xuXHRcdHJldHVybiB3aWR0aFxuXHR9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pey8vQFRPRE86IG5lZWQgY29uc2lkZXIgYXZhaWxhYmxlU3BhY2UuaGVpZ2h0XG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxuXHRcdGlmKDA9PWNvbXBvc2VkLmxlbmd0aCl7XG5cdFx0XHRsZXQge3dpZHRoLGhlaWdodH09dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxuXHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZT17d2lkdGgsaGVpZ2h0fVxuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG5cdFx0fVxuICAgICAgICBsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG5cbiAgICAgICAgbGV0IHt3aWR0aH09Y3VycmVudExpbmVcbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLHdpZHRoKVxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aDw9bWluUmVxdWlyZWRXKXtcblx0XHRcdGlmKHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0PG1pblJlcXVpcmVkSClcblx0XHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcblxuXHRcdFx0YXZhaWxhYmxlV2lkdGg9dGhpcy5saW5lV2lkdGgoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGg6YXZhaWxhYmxlV2lkdGgsIGhlaWdodDp0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZChjb250ZW50KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlLmhlaWdodFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcbiAgICAgICAgbGV0IHt3aWR0aDpjb250ZW50V2lkdGgsIGhlaWdodDpjb250ZW50SGVpZ2h0LCBkZXNjZW50OmNvbnRlbnREZXNjZW50PTB9PWNvbnRlbnQucHJvcHNcblxuXG5cdFx0bGV0IHBpZWNlPW51bGxcblx0XHRpZihhdmFpbGFibGVXaWR0aD09MCl7XG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXsvL25vdCBhcHBlbmRlZCB0byBwYXJlbnRcbiAgICAgICAgICAgIHBpZWNlPShcblx0XHRcdFx0XHQ8R3JvdXBcblx0XHRcdFx0XHRcdHg9e2N1cnJlbnRMaW5lLndpZHRoLWF2YWlsYWJsZVdpZHRofVxuXHRcdFx0XHRcdFx0aW5kZXg9e3RoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RofVxuXHRcdFx0XHRcdFx0ZGVzY2VudD17Y29udGVudERlc2NlbnR9XG5cdFx0XHRcdFx0XHR3aWR0aD17Y29udGVudFdpZHRofVxuXHRcdFx0XHRcdFx0aGVpZ2h0PXtjb250ZW50SGVpZ2h0fT5cblx0XHRcdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0XHRcdDwvR3JvdXA+XG5cdFx0XHRcdFx0KVxuICAgICAgICAgICAgY3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChwaWVjZSlcblx0XHRcdGN1cnJlbnRMaW5lLmhlaWdodD1NYXRoLm1heChjdXJyZW50TGluZS5oZWlnaHQsY29udGVudEhlaWdodClcblx0XHRcdGN1cnJlbnRMaW5lLmRlc2NlbnQ9TWF0aC5tYXgoY3VycmVudExpbmUuZGVzY2VudCwgY29udGVudERlc2NlbnQpXG5cdFx0XHRpZihhdmFpbGFibGVXaWR0aD09Y29udGVudFdpZHRoKXtcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGN1cnJlbnRMaW5lKSlcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aDxjb250ZW50V2lkdGgpe1xuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ+PWN1cnJlbnRMaW5lLmhlaWdodCl7XG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXG5cdFx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXG5cdFx0XHRcdGlmKGNvbnRlbnRXaWR0aDw9dGhpcy5hdmFpbGFibGVTcGFjZS53aWR0aClcblx0XHRcdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0Ly9uZXZlciBiZSBoZXJlXG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXG5cdFx0XHR9XG5cdFx0fVxuICAgIH1cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXsvL25lZWQgYXBwZW5kIGxhc3Qgbm9uLWZ1bGwtd2lkdGggbGluZSB0byBwYXJlbnRcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcblx0XHRjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblx0XHRsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG5cdFx0aWYoYXZhaWxhYmxlV2lkdGg+MCl7XG5cdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoY3VycmVudExpbmUpKVxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPT0wKXtcblx0XHRcdC8vYWxyZWFkeSBhcHBlbmRlZCB0byBwYXJlbnQgaW4gYXBwZW5kQ29tcG9zZWRcblx0XHR9XG5cblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aDowLCBoZWlnaHQ6MH1cblxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cblxuICAgIGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG4gICAgICAgIGxldCB7aGVpZ2h0LCB3aWR0aH09cHJvcHNcbiAgICAgICAgbGV0IHtzcGFjaW5nOntsaW5lSGVpZ2h0PVwiMTAwJVwiLHRvcD0wLCBib3R0b209MH0sIGluZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXG4gICAgICAgIGxldCBjb250ZW50WT0wLCBjb250ZW50WD1sZWZ0XG5cbiAgICAgICAgbGluZUhlaWdodD10eXBlb2YobGluZUhlaWdodCk9PSdzdHJpbmcnID8gTWF0aC5jZWlsKGhlaWdodCpwYXJzZUludChsaW5lSGVpZ2h0KS8xMDAuMCk6IGxpbmVIZWlnaHRcblxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MSl7Ly9maXJzdCBsaW5lXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz10b3BcbiAgICAgICAgICAgIGNvbnRlbnRZKz10b3Bcblx0XHRcdGNvbnRlbnRYKz1maXJzdExpbmVcbiAgICAgICAgfWVsc2V7XG5cdFx0XHRjb250ZW50WCs9aGFuZ2luZ1xuXHRcdH1cblxuICAgICAgICBpZih0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKXsvL2xhc3QgbGluZVxuICAgICAgICAgICAgbGluZUhlaWdodCs9Ym90dG9tXG5cdFx0fVxuXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQtPWxpbmVIZWlnaHRcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdyb3VwIGhlaWdodD17bGluZUhlaWdodH0gd2lkdGg9e3dpZHRofT5cbiAgICAgICAgICAgICAgICA8R3JvdXAgeD17Y29udGVudFh9IHk9e2NvbnRlbnRZfT5cbiAgICAgICAgICAgICAgICAgICAgPExpbmUgey4uLnByb3BzfS8+XG4gICAgICAgICAgICAgICAgPC9Hcm91cD5cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBnZXRTdHlsZSgpe1xuICAgICAgICBpZih0aGlzLl9zdHlsZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHlsZVxuICAgICAgICBsZXQgc3BhY2luZz10aGlzLnN0eWxlKCdwYXJhZ3JhcGguc3BhY2luZycpfHx7fVxuICAgICAgICBsZXQgaW5kZW50PXRoaXMuc3R5bGUoJ3BhcmFncmFwaC5pbmQnKXx8e31cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlPXtzcGFjaW5nLGluZGVudH1cbiAgICB9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXG5cdH0sU3VwZXIuY29udGV4dFR5cGVzKVxufVxuIl19