"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

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

var Super = (0, _any.styleInheritable)(_any2.default);

var Paragraph = function (_Super) {
	(0, _inherits3.default)(Paragraph, _Super);

	function Paragraph() {
		(0, _classCallCheck3.default)(this, Paragraph);
		return (0, _possibleConstructorReturn3.default)(this, (Paragraph.__proto__ || (0, _getPrototypeOf2.default)(Paragraph)).apply(this, arguments));
	}

	(0, _createClass3.default)(Paragraph, [{
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
			var _getStyle = this.getStyle(),
			    _getStyle$indent = _getStyle.indent,
			    _getStyle$indent$left = _getStyle$indent.left,
			    left = _getStyle$indent$left === undefined ? 0 : _getStyle$indent$left,
			    _getStyle$indent$righ = _getStyle$indent.right,
			    right = _getStyle$indent$righ === undefined ? 0 : _getStyle$indent$righ,
			    _getStyle$indent$firs = _getStyle$indent.firstLine,
			    firstLine = _getStyle$indent$firs === undefined ? 0 : _getStyle$indent$firs,
			    _getStyle$indent$hang = _getStyle$indent.hanging,
			    hanging = _getStyle$indent$hang === undefined ? 0 : _getStyle$indent$hang;

			var width = this.availableSpace.width;

			width -= left + right;
			if (this.computed.composed.length == 0) width -= firstLine;else width -= hanging;
			return width;
		}
	}, {
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var required = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			//@TODO: need consider availableSpace.height
			var _required$width = required.width,
			    minRequiredW = _required$width === undefined ? 0 : _required$width,
			    _required$height = required.height,
			    minRequiredH = _required$height === undefined ? 0 : _required$height;
			var composed = this.computed.composed;

			if (0 == composed.length) {
				var _context$parent$nextA = this.context.parent.nextAvailableSpace(),
				    _width = _context$parent$nextA.width,
				    height = _context$parent$nextA.height;

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
			return { width: availableWidth, height: this.availableSpace.height, lineWidth: this.availableSpace.width };
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
			var _content$props = content.props,
			    contentWidth = _content$props.width,
			    contentHeight = _content$props.height,
			    _content$props$descen = _content$props.descent,
			    contentDescent = _content$props$descen === undefined ? 0 : _content$props$descen;


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

			(0, _get3.default)(Paragraph.prototype.__proto__ || (0, _getPrototypeOf2.default)(Paragraph.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			var height = props.height,
			    width = props.width;

			var _getStyle2 = this.getStyle(),
			    _getStyle2$spacing = _getStyle2.spacing,
			    _getStyle2$spacing$li = _getStyle2$spacing.lineHeight,
			    lineHeight = _getStyle2$spacing$li === undefined ? "100%" : _getStyle2$spacing$li,
			    _getStyle2$spacing$to = _getStyle2$spacing.top,
			    top = _getStyle2$spacing$to === undefined ? 0 : _getStyle2$spacing$to,
			    _getStyle2$spacing$bo = _getStyle2$spacing.bottom,
			    bottom = _getStyle2$spacing$bo === undefined ? 0 : _getStyle2$spacing$bo,
			    _getStyle2$indent = _getStyle2.indent,
			    _getStyle2$indent$lef = _getStyle2$indent.left,
			    left = _getStyle2$indent$lef === undefined ? 0 : _getStyle2$indent$lef,
			    _getStyle2$indent$rig = _getStyle2$indent.right,
			    right = _getStyle2$indent$rig === undefined ? 0 : _getStyle2$indent$rig,
			    _getStyle2$indent$fir = _getStyle2$indent.firstLine,
			    firstLine = _getStyle2$indent$fir === undefined ? 0 : _getStyle2$indent$fir,
			    _getStyle2$indent$han = _getStyle2$indent.hanging,
			    hanging = _getStyle2$indent$han === undefined ? 0 : _getStyle2$indent$han;

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
			var spacing = this.style('pPr.spacing') || {};
			var indent = this.style('pPr.ind') || {};
			return this._style = { spacing: spacing, indent: indent };
		}
	}]);
	return Paragraph;
}(Super);

Paragraph.displayName = "paragraph";
Paragraph.contextTypes = (0, _assign2.default)({
	getDefaultStyle: _react.PropTypes.func
}, Super.contextTypes);
exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlBhcmFncmFwaCIsIndpZHRoIiwibGluZVdpZHRoIiwiaGVpZ2h0IiwiZGVzY2VudCIsImNoaWxkcmVuIiwiZ2V0U3R5bGUiLCJpbmRlbnQiLCJsZWZ0IiwicmlnaHQiLCJmaXJzdExpbmUiLCJoYW5naW5nIiwiYXZhaWxhYmxlU3BhY2UiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJtaW5SZXF1aXJlZEgiLCJjb250ZXh0IiwicGFyZW50IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwicHVzaCIsIl9uZXdMaW5lIiwiY3VycmVudExpbmUiLCJhdmFpbGFibGVXaWR0aCIsInJlZHVjZSIsInByZXYiLCJhIiwicHJvcHMiLCJjb250ZW50IiwiY29udGVudFdpZHRoIiwiY29udGVudEhlaWdodCIsImNvbnRlbnREZXNjZW50IiwicGllY2UiLCJhcHBlbmRDb21wb3NlZCIsIk1hdGgiLCJtYXgiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJzcGFjaW5nIiwibGluZUhlaWdodCIsInRvcCIsImJvdHRvbSIsImNvbnRlbnRZIiwiY29udGVudFgiLCJjZWlsIiwicGFyc2VJbnQiLCJpc0FsbENoaWxkcmVuQ29tcG9zZWQiLCJfc3R5bGUiLCJzdHlsZSIsImRpc3BsYXlOYW1lIiwiY29udGV4dFR5cGVzIiwiZ2V0RGVmYXVsdFN0eWxlIiwiZnVuYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsUUFBTSx5Q0FBVjs7SUFDcUJDLFM7Ozs7Ozs7Ozs7NkJBR1Y7QUFDSCxVQUFPO0FBQ0hDLFdBQU8sS0FBS0MsU0FBTCxFQURKO0FBRVpDLFlBQU8sQ0FGSztBQUdaQyxhQUFR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SSxPQUFPLEtBQUtBLE1BQVo7QUFDSixPQUFJVCxVQUFRLEtBQUtVLEtBQUwsQ0FBVyxhQUFYLEtBQTJCLEVBQXZDO0FBQ0EsT0FBSTFDLFNBQU8sS0FBSzBDLEtBQUwsQ0FBVyxTQUFYLEtBQXVCLEVBQWxDO0FBQ0EsVUFBTyxLQUFLRCxNQUFMLEdBQVksRUFBQ1QsZ0JBQUQsRUFBU2hDLGNBQVQsRUFBbkI7QUFDSDs7O0VBL0lrQ1IsSzs7QUFBbEJDLFMsQ0FDYmtELFcsR0FBWSxXO0FBRENsRCxTLENBaUpibUQsWSxHQUFhLHNCQUFjO0FBQ2pDQyxrQkFBaUIsaUJBQVVDO0FBRE0sQ0FBZCxFQUVsQnRELE1BQU1vRCxZQUZZLEM7a0JBakpBbkQsUyIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEFueSwge3N0eWxlSW5oZXJpdGFibGV9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5pbXBvcnQgTGluZSBmcm9tIFwiLi4vY29tcG9zZWQvbGluZVwiXHJcblxyXG5pbXBvcnQgSW5saW5lIGZyb20gXCIuL2lubGluZVwiXHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHRcIlxyXG5cclxubGV0IFN1cGVyPXN0eWxlSW5oZXJpdGFibGUoQW55KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBTdXBlcntcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJwYXJhZ3JhcGhcIlxyXG5cclxuXHRfbmV3TGluZSgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmxpbmVXaWR0aCgpLFxyXG5cdFx0XHRoZWlnaHQ6MCxcclxuXHRcdFx0ZGVzY2VudDowLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxyXG4gICAgICAgIH1cclxuXHR9XHJcblxyXG5cdGxpbmVXaWR0aCgpe1xyXG5cdFx0Y29uc3Qge2luZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXHJcbiAgICAgICAgbGV0IHt3aWR0aH09dGhpcy5hdmFpbGFibGVTcGFjZVxyXG4gICAgICAgIHdpZHRoLT0obGVmdCtyaWdodClcclxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MClcclxuICAgICAgICAgICAgd2lkdGgtPWZpcnN0TGluZVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgd2lkdGgtPWhhbmdpbmdcclxuXHRcdHJldHVybiB3aWR0aFxyXG5cdH1cclxuXHJcbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pey8vQFRPRE86IG5lZWQgY29uc2lkZXIgYXZhaWxhYmxlU3BhY2UuaGVpZ2h0XHJcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGlmKDA9PWNvbXBvc2VkLmxlbmd0aCl7XHJcblx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXHJcblx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoLGhlaWdodH1cclxuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXHJcblx0XHR9XHJcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG5cclxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxyXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCx3aWR0aClcclxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aDw9bWluUmVxdWlyZWRXKXtcclxuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ8bWluUmVxdWlyZWRIKVxyXG5cdFx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXHJcblxyXG5cdFx0XHRhdmFpbGFibGVXaWR0aD10aGlzLmxpbmVXaWR0aCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7d2lkdGg6YXZhaWxhYmxlV2lkdGgsIGhlaWdodDp0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodCwgbGluZVdpZHRoOnRoaXMuYXZhaWxhYmxlU3BhY2Uud2lkdGh9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kQ29tcG9zZWQoY29udGVudCl7Ly9AVE9ETzogbmVlZCBjb25zaWRlciBhdmFpbGFibGVTcGFjZS5oZWlnaHRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHJcblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxyXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRoLCBoZWlnaHQ6Y29udGVudEhlaWdodCwgZGVzY2VudDpjb250ZW50RGVzY2VudD0wfT1jb250ZW50LnByb3BzXHJcblxyXG5cclxuXHRcdGxldCBwaWVjZT1udWxsXHJcblx0XHRpZihhdmFpbGFibGVXaWR0aD09MCl7XHJcblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxyXG5cdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXHJcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXsvL25vdCBhcHBlbmRlZCB0byBwYXJlbnRcclxuICAgICAgICAgICAgcGllY2U9KFxyXG5cdFx0XHRcdFx0PEdyb3VwXHJcblx0XHRcdFx0XHRcdHg9e2N1cnJlbnRMaW5lLndpZHRoLWF2YWlsYWJsZVdpZHRofVxyXG5cdFx0XHRcdFx0XHRpbmRleD17dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGh9XHJcblx0XHRcdFx0XHRcdGRlc2NlbnQ9e2NvbnRlbnREZXNjZW50fVxyXG5cdFx0XHRcdFx0XHR3aWR0aD17Y29udGVudFdpZHRofVxyXG5cdFx0XHRcdFx0XHRoZWlnaHQ9e2NvbnRlbnRIZWlnaHR9PlxyXG5cdFx0XHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0XHRcdDwvR3JvdXA+XHJcblx0XHRcdFx0XHQpXHJcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lLmNoaWxkcmVuLnB1c2gocGllY2UpXHJcblx0XHRcdGN1cnJlbnRMaW5lLmhlaWdodD1NYXRoLm1heChjdXJyZW50TGluZS5oZWlnaHQsY29udGVudEhlaWdodClcclxuXHRcdFx0Y3VycmVudExpbmUuZGVzY2VudD1NYXRoLm1heChjdXJyZW50TGluZS5kZXNjZW50LCBjb250ZW50RGVzY2VudClcclxuXHRcdFx0aWYoYXZhaWxhYmxlV2lkdGg9PWNvbnRlbnRXaWR0aCl7XHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGN1cnJlbnRMaW5lKSlcclxuXHRcdFx0fVxyXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg8Y29udGVudFdpZHRoKXtcclxuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ+PWN1cnJlbnRMaW5lLmhlaWdodCl7XHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGN1cnJlbnRMaW5lKSlcclxuXHRcdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcclxuXHJcblx0XHRcdFx0aWYoY29udGVudFdpZHRoPD10aGlzLmF2YWlsYWJsZVNwYWNlLndpZHRoKVxyXG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRDb21wb3NlZChjb250ZW50KVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHQvL25ldmVyIGJlIGhlcmVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1lbHNle1xyXG5cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXsvL25lZWQgYXBwZW5kIGxhc3Qgbm9uLWZ1bGwtd2lkdGggbGluZSB0byBwYXJlbnRcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblxyXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG5cdFx0bGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxyXG5cdFx0aWYoYXZhaWxhYmxlV2lkdGg+MCl7XHJcblx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXHJcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aD09MCl7XHJcblx0XHRcdC8vYWxyZWFkeSBhcHBlbmRlZCB0byBwYXJlbnQgaW4gYXBwZW5kQ29tcG9zZWRcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aDowLCBoZWlnaHQ6MH1cclxuXHJcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG5cdH1cclxuXHJcbiAgICBjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG4gICAgICAgIGxldCB7aGVpZ2h0LCB3aWR0aH09cHJvcHNcclxuICAgICAgICBsZXQge3NwYWNpbmc6e2xpbmVIZWlnaHQ9XCIxMDAlXCIsdG9wPTAsIGJvdHRvbT0wfSwgaW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQgY29udGVudFk9MCwgY29udGVudFg9bGVmdFxyXG5cclxuICAgICAgICBsaW5lSGVpZ2h0PXR5cGVvZihsaW5lSGVpZ2h0KT09J3N0cmluZycgPyBNYXRoLmNlaWwoaGVpZ2h0KnBhcnNlSW50KGxpbmVIZWlnaHQpLzEwMC4wKTogbGluZUhlaWdodFxyXG5cclxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MSl7Ly9maXJzdCBsaW5lXHJcbiAgICAgICAgICAgIGxpbmVIZWlnaHQrPXRvcFxyXG4gICAgICAgICAgICBjb250ZW50WSs9dG9wXHJcblx0XHRcdGNvbnRlbnRYKz1maXJzdExpbmVcclxuICAgICAgICB9ZWxzZXtcclxuXHRcdFx0Y29udGVudFgrPWhhbmdpbmdcclxuXHRcdH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSl7Ly9sYXN0IGxpbmVcclxuICAgICAgICAgICAgbGluZUhlaWdodCs9Ym90dG9tXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQtPWxpbmVIZWlnaHRcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdyb3VwIGhlaWdodD17bGluZUhlaWdodH0gd2lkdGg9e3dpZHRofT5cclxuICAgICAgICAgICAgICAgIDxHcm91cCB4PXtjb250ZW50WH0geT17Y29udGVudFl9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5lIHsuLi5wcm9wc30vPlxyXG4gICAgICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R5bGUoKXtcclxuICAgICAgICBpZih0aGlzLl9zdHlsZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlXHJcbiAgICAgICAgbGV0IHNwYWNpbmc9dGhpcy5zdHlsZSgncFByLnNwYWNpbmcnKXx8e31cclxuICAgICAgICBsZXQgaW5kZW50PXRoaXMuc3R5bGUoJ3BQci5pbmQnKXx8e31cclxuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU9e3NwYWNpbmcsaW5kZW50fVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xyXG5cdFx0Z2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH0sU3VwZXIuY29udGV4dFR5cGVzKVxyXG59XHJcbiJdfQ==