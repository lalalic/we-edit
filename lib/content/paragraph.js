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
			if (this.composed.length == 0) width -= firstLine;else width -= hanging;
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
				if (this.availableSpace.height < minRequiredH) this.availableSpace = this.context.parent.nextAvailableSpace(required);

				availableWidth = this.lineWidth();
			}
			return { width: availableWidth, height: this.availableSpace.height };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(content) {
			//@TODO: need consider availableSpace.height
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
			var composed = this.composed;
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

			if (this.composed.length == 1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQU0seUNBQU47O0lBQ2lCOzs7Ozs7Ozs7Ozs2QkFHVjtBQUNILFVBQU87QUFDSCxXQUFPLEtBQUssU0FBTCxFQUFQO0FBQ1QsWUFBTyxDQUFQO0FBQ1MsY0FBUyxFQUFUO0lBSEosQ0FERzs7Ozs4QkFRQzttQkFDNEMsS0FBSyxRQUFMLEdBRDVDOztvQ0FDSCxPQURHO2dEQUNLLEtBREw7T0FDSyw2Q0FBSywwQkFEVjtnREFDWSxNQURaO09BQ1ksOENBQU0sMEJBRGxCO2dEQUNvQixVQURwQjtPQUNvQixrREFBVSwwQkFEOUI7Z0RBQ2dDLFFBRGhDO09BQ2dDLGdEQUFRLDBCQUR4QztPQUVDLFFBQU8sS0FBSyxjQUFMLENBQVAsTUFGRDs7QUFHSixZQUFRLE9BQUssS0FBTCxDQUhKO0FBSUosT0FBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLElBQXNCLENBQXRCLEVBQ0MsU0FBTyxTQUFQLENBREosS0FHSSxTQUFPLE9BQVAsQ0FISjtBQUlOLFVBQU8sS0FBUCxDQVJVOzs7O3VDQVd1QjtPQUFaLGlFQUFTLGtCQUFHOzt5QkFDd0IsU0FBNUMsTUFEb0I7T0FDZCwrQ0FBYSxvQkFEQzswQkFDd0IsU0FBdkIsT0FERDtPQUNRLGdEQUFhLHFCQURyQjtPQUVwQixXQUFVLEtBQVYsU0FGb0I7O0FBR2pDLE9BQUcsS0FBRyxTQUFTLE1BQVQsRUFBZ0I7Z0NBQ0YsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixrQkFBcEIsR0FERTs7UUFDaEIscUNBRGdCO1FBQ1Ysc0NBRFU7O0FBRXJCLFNBQUssY0FBTCxHQUFvQixFQUFDLGFBQUQsRUFBTyxjQUFQLEVBQXBCLENBRnFCO0FBR3JCLGFBQVMsSUFBVCxDQUFjLEtBQUssUUFBTCxF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QUsscUJBQUwsRUFBSCxFQUFnQzs7QUFDNUIsa0JBQVksTUFBWixDQUQ0QjtJQUFoQzs7QUFJTixRQUFLLGNBQUwsQ0FBb0IsTUFBcEIsSUFBNEIsVUFBNUIsQ0FuQjhCOztBQXFCeEIsVUFDSTs7TUFBTyxRQUFRLFVBQVIsRUFBb0IsT0FBTyxLQUFQLEVBQTNCO0lBQ0k7O09BQU8sR0FBRyxRQUFILEVBQWEsR0FBRyxRQUFILEVBQXBCO0tBQ0ksOENBQVUsS0FBVixDQURKO0tBREo7SUFESixDQXJCd0I7Ozs7NkJBOEJsQjtBQUNOLE9BQUcsS0FBSyxNQUFMLEVBQ0MsT0FBTyxLQUFLLE1BQUwsQ0FEWDtBQUVBLE9BQUksVUFBUSxLQUFLLEtBQUwsQ0FBVyxtQkFBWCxLQUFpQyxFQUFqQyxDQUhOO0FBSU4sT0FBSSxTQUFPLEtBQUssS0FBTCxDQUFXLGVBQVgsS0FBNkIsRUFBN0IsQ0FKTDtBQUtOLFVBQU8sS0FBSyxNQUFMLEdBQVksRUFBQyxnQkFBRCxFQUFTLGNBQVQsRUFBWixDQUxEOzs7O1FBdElPO0VBQWtCOztBQUFsQixVQUNiLGNBQVk7QUFEQyxVQThJYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQ2pDLGtCQUFpQixpQkFBVSxJQUFWO0NBREUsRUFFbEIsTUFBTSxZQUFOO2tCQWhKa0IiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55LCB7c3R5bGVJbmhlcml0YWJsZX0gZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0IExpbmUgZnJvbSBcIi4uL2NvbXBvc2VkL2xpbmVcIlxuXG5pbXBvcnQgSW5saW5lIGZyb20gXCIuL2lubGluZVwiXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcblxubGV0IFN1cGVyPXN0eWxlSW5oZXJpdGFibGUoQW55KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgU3VwZXJ7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInBhcmFncmFwaFwiXG5cblx0X25ld0xpbmUoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmxpbmVXaWR0aCgpLFxuXHRcdFx0aGVpZ2h0OjAsXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuICAgICAgICB9XG5cdH1cblx0XG5cdGxpbmVXaWR0aCgpe1xuXHRcdGNvbnN0IHtpbmRlbnQ6e2xlZnQ9MCxyaWdodD0wLGZpcnN0TGluZT0wLGhhbmdpbmc9MH19PXRoaXMuZ2V0U3R5bGUoKVxuICAgICAgICBsZXQge3dpZHRofT10aGlzLmF2YWlsYWJsZVNwYWNlXG4gICAgICAgIHdpZHRoLT0obGVmdCtyaWdodClcbiAgICAgICAgaWYodGhpcy5jb21wb3NlZC5sZW5ndGg9PTApXG4gICAgICAgICAgICB3aWR0aC09Zmlyc3RMaW5lXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHdpZHRoLT1oYW5naW5nXG5cdFx0cmV0dXJuIHdpZHRoXG5cdH1cblxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7Ly9AVE9ETzogbmVlZCBjb25zaWRlciBhdmFpbGFibGVTcGFjZS5oZWlnaHRcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0aWYoMD09Y29tcG9zZWQubGVuZ3RoKXtcblx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXG5cdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aCxoZWlnaHR9XG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblx0XHR9XG4gICAgICAgIGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsd2lkdGgpXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPD1taW5SZXF1aXJlZFcpe1xuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ8bWluUmVxdWlyZWRIKVxuXHRcdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXHRcdFx0XHRcblx0XHRcdGF2YWlsYWJsZVdpZHRoPXRoaXMubGluZVdpZHRoKClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoOmF2YWlsYWJsZVdpZHRoLCBoZWlnaHQ6dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHR9XG4gICAgfVxuXG4gICAgYXBwZW5kQ29tcG9zZWQoY29udGVudCl7Ly9AVE9ETzogbmVlZCBjb25zaWRlciBhdmFpbGFibGVTcGFjZS5oZWlnaHRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRoLCBoZWlnaHQ6Y29udGVudEhlaWdodH09Y29udGVudC5wcm9wc1xuXG5cblx0XHRsZXQgcGllY2U9bnVsbFxuXHRcdGlmKGF2YWlsYWJsZVdpZHRoPT0wKXtcblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHRcdFx0dGhpcy5hcHBlbmRDb21wb3NlZChjb250ZW50KVxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPj1jb250ZW50V2lkdGgpey8vbm90IGFwcGVuZGVkIHRvIHBhcmVudFxuICAgICAgICAgICAgcGllY2U9KFxuXHRcdFx0XHRcdDxHcm91cFxuXHRcdFx0XHRcdFx0eD17Y3VycmVudExpbmUud2lkdGgtYXZhaWxhYmxlV2lkdGh9XG5cdFx0XHRcdFx0XHRpbmRleD17dGhpcy5jaGlsZHJlbi5sZW5ndGh9XG5cdFx0XHRcdFx0XHR3aWR0aD17Y29udGVudFdpZHRofVxuXHRcdFx0XHRcdFx0aGVpZ2h0PXtjb250ZW50SGVpZ2h0fT5cblx0XHRcdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0XHRcdDwvR3JvdXA+XG5cdFx0XHRcdFx0KVxuICAgICAgICAgICAgY3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChwaWVjZSlcblx0XHRcdGN1cnJlbnRMaW5lLmhlaWdodD1NYXRoLm1heChjdXJyZW50TGluZS5oZWlnaHQsY29udGVudEhlaWdodClcblx0XHRcdGlmKGF2YWlsYWJsZVdpZHRoPT1jb250ZW50V2lkdGgpe1xuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoY3VycmVudExpbmUpKVxuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPGNvbnRlbnRXaWR0aCl7XG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodD49Y3VycmVudExpbmUuaGVpZ2h0KXtcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGN1cnJlbnRMaW5lKSlcblx0XHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG5cblx0XHRcdFx0aWYoY29udGVudFdpZHRoPD10aGlzLmF2YWlsYWJsZVNwYWNlLndpZHRoKVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHQvL25ldmVyIGJlIGhlcmVcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cblx0XHRcdH1cblx0XHR9XG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpey8vbmVlZCBhcHBlbmQgbGFzdCBub24tZnVsbC13aWR0aCBsaW5lIHRvIHBhcmVudFxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuXHRcdGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcblx0XHRpZihhdmFpbGFibGVXaWR0aD4wKXtcblx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg9PTApe1xuXHRcdFx0Ly9hbHJlYWR5IGFwcGVuZGVkIHRvIHBhcmVudCBpbiBhcHBlbmRDb21wb3NlZFxuXHRcdH1cblxuXHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoOjAsIGhlaWdodDowfVxuXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxuXG4gICAgY3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcbiAgICAgICAgbGV0IHtoZWlnaHQsIHdpZHRofT1wcm9wc1xuICAgICAgICBsZXQge3NwYWNpbmc6e2xpbmVIZWlnaHQ9XCIxMDAlXCIsdG9wPTAsIGJvdHRvbT0wfSwgaW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcbiAgICAgICAgbGV0IGNvbnRlbnRZPTAsIGNvbnRlbnRYPWxlZnRcblxuICAgICAgICBsaW5lSGVpZ2h0PXR5cGVvZihsaW5lSGVpZ2h0KT09J3N0cmluZycgPyBNYXRoLmNlaWwoaGVpZ2h0KnBhcnNlSW50KGxpbmVIZWlnaHQpLzEwMC4wKTogbGluZUhlaWdodFxuXG4gICAgICAgIGlmKHRoaXMuY29tcG9zZWQubGVuZ3RoPT0xKXsvL2ZpcnN0IGxpbmVcbiAgICAgICAgICAgIGxpbmVIZWlnaHQrPXRvcFxuICAgICAgICAgICAgY29udGVudFkrPXRvcFxuXHRcdFx0Y29udGVudFgrPWZpcnN0TGluZVxuICAgICAgICB9ZWxzZXtcblx0XHRcdGNvbnRlbnRYKz1oYW5naW5nXG5cdFx0fVxuXG4gICAgICAgIGlmKHRoaXMuaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkpey8vbGFzdCBsaW5lXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz1ib3R0b21cblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQtPWxpbmVIZWlnaHRcblx0XHRcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxHcm91cCBoZWlnaHQ9e2xpbmVIZWlnaHR9IHdpZHRoPXt3aWR0aH0+XG4gICAgICAgICAgICAgICAgPEdyb3VwIHg9e2NvbnRlbnRYfSB5PXtjb250ZW50WX0+XG4gICAgICAgICAgICAgICAgICAgIDxMaW5lIHsuLi5wcm9wc30vPlxuICAgICAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICApXG4gICAgfVxuXG4gICAgZ2V0U3R5bGUoKXtcbiAgICAgICAgaWYodGhpcy5fc3R5bGUpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGVcbiAgICAgICAgbGV0IHNwYWNpbmc9dGhpcy5zdHlsZSgncGFyYWdyYXBoLnNwYWNpbmcnKXx8e31cbiAgICAgICAgbGV0IGluZGVudD10aGlzLnN0eWxlKCdwYXJhZ3JhcGguaW5kJyl8fHt9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZT17c3BhY2luZyxpbmRlbnR9XG4gICAgfVxuXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG5cdFx0Z2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuY1xuXHR9LFN1cGVyLmNvbnRleHRUeXBlcylcbn1cbiJdfQ==