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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFFBQU0seUNBQU47O0lBQ2lCOzs7QUFFcEIsVUFGb0IsU0FFcEIsR0FBYTt3QkFGTyxXQUVQOztxRUFGTyx1QkFHVixZQURHOztNQUVMLFVBQVMsTUFBSyxLQUFMLENBQVQsUUFGSzs7QUFHWixNQUFHLFFBQVEsTUFBUixJQUFnQixDQUFoQixFQUFrQjtBQUNwQixTQUFLLFdBQUwsR0FEb0I7R0FBckI7ZUFIWTtFQUFiOztjQUZvQjs7Z0NBVVA7QUFDWixRQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLElBQW5CLENBQXdCOztNQUFRLGNBQWMsS0FBSyxPQUFMLENBQWEsZUFBYixDQUE2QixRQUE3QixDQUFkLEVBQVI7SUFBOEQ7Ozs7S0FBOUQ7SUFBeEIsRUFEWTs7Ozs2QkFJSDtBQUNILFVBQU87QUFDSCxXQUFPLEtBQUssU0FBTCxFQUFQO0FBQ1QsWUFBTyxDQUFQO0FBQ1MsY0FBUyxFQUFUO0lBSEosQ0FERzs7Ozs4QkFRQzttQkFDNEMsS0FBSyxRQUFMLEdBRDVDOztvQ0FDSCxPQURHO2dEQUNLLEtBREw7T0FDSyw2Q0FBSywwQkFEVjtnREFDWSxNQURaO09BQ1ksOENBQU0sMEJBRGxCO2dEQUNvQixVQURwQjtPQUNvQixrREFBVSwwQkFEOUI7Z0RBQ2dDLFFBRGhDO09BQ2dDLGdEQUFRLDBCQUR4QztPQUVDLFFBQU8sS0FBSyxjQUFMLENBQVAsTUFGRDs7QUFHSixZQUFRLE9BQUssS0FBTCxDQUhKO0FBSUosT0FBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLElBQXNCLENBQXRCLEVBQ0MsU0FBTyxTQUFQLENBREosS0FHSSxTQUFPLE9BQVAsQ0FISjtBQUlOLFVBQU8sS0FBUCxDQVJVOzs7O3VDQVd1QjtPQUFaLGlFQUFT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IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55LCB7c3R5bGVJbmhlcml0YWJsZX0gZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0IExpbmUgZnJvbSBcIi4uL2NvbXBvc2VkL2xpbmVcIlxuXG5pbXBvcnQgSW5saW5lIGZyb20gXCIuL2lubGluZVwiXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcblxubGV0IFN1cGVyPXN0eWxlSW5oZXJpdGFibGUoQW55KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgU3VwZXJ7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInBhcmFncmFwaFwiXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXG5cdFx0aWYoY29udGVudC5sZW5ndGg9PTApe1xuXHRcdFx0dGhpcy53aGF0SWZFbXB0eSgpXG5cdFx0fVxuXHR9XG5cblx0d2hhdElmRW1wdHkoKXtcblx0XHR0aGlzLnN0YXRlLmNvbnRlbnQucHVzaCg8SW5saW5lIGNvbnRlbnRTdHlsZT17dGhpcy5jb250ZXh0LmdldERlZmF1bHRTdHlsZShcImlubGluZVwiKX0+PFRleHQ+IDwvVGV4dD48L0lubGluZT4pXG5cdH1cblxuXHRfbmV3TGluZSgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMubGluZVdpZHRoKCksXG5cdFx0XHRoZWlnaHQ6MCxcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXG4gICAgICAgIH1cblx0fVxuXHRcblx0bGluZVdpZHRoKCl7XG5cdFx0Y29uc3Qge2luZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXG4gICAgICAgIGxldCB7d2lkdGh9PXRoaXMuYXZhaWxhYmxlU3BhY2VcbiAgICAgICAgd2lkdGgtPShsZWZ0K3JpZ2h0KVxuICAgICAgICBpZih0aGlzLmNvbXBvc2VkLmxlbmd0aD09MClcbiAgICAgICAgICAgIHdpZHRoLT1maXJzdExpbmVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd2lkdGgtPWhhbmdpbmdcblx0XHRyZXR1cm4gd2lkdGhcblx0fVxuXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlLmhlaWdodFxuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRpZigwPT1jb21wb3NlZC5sZW5ndGgpe1xuXHRcdFx0bGV0IHt3aWR0aCxoZWlnaHR9PXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcblx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoLGhlaWdodH1cblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHRcdH1cbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuXG4gICAgICAgIGxldCB7d2lkdGh9PWN1cnJlbnRMaW5lXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCx3aWR0aClcbiAgICAgICAgaWYoYXZhaWxhYmxlV2lkdGg8PW1pblJlcXVpcmVkVyl7XG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodDxtaW5SZXF1aXJlZEgpXG5cdFx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXG5cdFx0XHRcdFxuXHRcdFx0YXZhaWxhYmxlV2lkdGg9dGhpcy5saW5lV2lkdGgoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGg6YXZhaWxhYmxlV2lkdGgsIGhlaWdodDp0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZChjb250ZW50KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlLmhlaWdodFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcbiAgICAgICAgbGV0IHt3aWR0aDpjb250ZW50V2lkdGgsIGhlaWdodDpjb250ZW50SGVpZ2h0fT1jb250ZW50LnByb3BzXG5cblxuXHRcdGxldCBwaWVjZT1udWxsXG5cdFx0aWYoYXZhaWxhYmxlV2lkdGg9PTApe1xuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG5cdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg+PWNvbnRlbnRXaWR0aCl7Ly9ub3QgYXBwZW5kZWQgdG8gcGFyZW50XG4gICAgICAgICAgICBwaWVjZT0oXG5cdFx0XHRcdFx0PEdyb3VwXG5cdFx0XHRcdFx0XHR4PXtjdXJyZW50TGluZS53aWR0aC1hdmFpbGFibGVXaWR0aH1cblx0XHRcdFx0XHRcdGluZGV4PXt0aGlzLmNoaWxkcmVuLmxlbmd0aH1cblx0XHRcdFx0XHRcdHdpZHRoPXtjb250ZW50V2lkdGh9XG5cdFx0XHRcdFx0XHRoZWlnaHQ9e2NvbnRlbnRIZWlnaHR9PlxuXHRcdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdFx0PC9Hcm91cD5cblx0XHRcdFx0XHQpXG4gICAgICAgICAgICBjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKHBpZWNlKVxuXHRcdFx0Y3VycmVudExpbmUuaGVpZ2h0PU1hdGgubWF4KGN1cnJlbnRMaW5lLmhlaWdodCxjb250ZW50SGVpZ2h0KVxuXHRcdFx0aWYoYXZhaWxhYmxlV2lkdGg9PWNvbnRlbnRXaWR0aCl7XG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXG5cdFx0XHR9XG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg8Y29udGVudFdpZHRoKXtcblx0XHRcdGlmKHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0Pj1jdXJyZW50TGluZS5oZWlnaHQpe1xuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoY3VycmVudExpbmUpKVxuXHRcdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblxuXHRcdFx0XHRpZihjb250ZW50V2lkdGg8PXRoaXMuYXZhaWxhYmxlU3BhY2Uud2lkdGgpXG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRDb21wb3NlZChjb250ZW50KVxuXHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdC8vbmV2ZXIgYmUgaGVyZVxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblxuXHRcdFx0fVxuXHRcdH1cbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7Ly9uZWVkIGFwcGVuZCBsYXN0IG5vbi1mdWxsLXdpZHRoIGxpbmUgdG8gcGFyZW50XG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG5cdFx0bGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxuXHRcdGlmKGF2YWlsYWJsZVdpZHRoPjApe1xuXHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGN1cnJlbnRMaW5lKSlcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aD09MCl7XG5cdFx0XHQvL2FscmVhZHkgYXBwZW5kZWQgdG8gcGFyZW50IGluIGFwcGVuZENvbXBvc2VkXG5cdFx0fVxuXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZT17d2lkdGg6MCwgaGVpZ2h0OjB9XG5cblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHR9XG5cbiAgICBjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xuICAgICAgICBsZXQge2hlaWdodCwgd2lkdGh9PXByb3BzXG4gICAgICAgIGxldCB7c3BhY2luZzp7bGluZUhlaWdodD1cIjEwMCVcIix0b3A9MCwgYm90dG9tPTB9LCBpbmRlbnQ6e2xlZnQ9MCxyaWdodD0wLGZpcnN0TGluZT0wLGhhbmdpbmc9MH19PXRoaXMuZ2V0U3R5bGUoKVxuICAgICAgICBsZXQgY29udGVudFk9MCwgY29udGVudFg9bGVmdFxuXG4gICAgICAgIGxpbmVIZWlnaHQ9dHlwZW9mKGxpbmVIZWlnaHQpPT0nc3RyaW5nJyA/IE1hdGguY2VpbChoZWlnaHQqcGFyc2VJbnQobGluZUhlaWdodCkvMTAwLjApOiBsaW5lSGVpZ2h0XG5cbiAgICAgICAgaWYodGhpcy5jb21wb3NlZC5sZW5ndGg9PTEpey8vZmlyc3QgbGluZVxuICAgICAgICAgICAgbGluZUhlaWdodCs9dG9wXG4gICAgICAgICAgICBjb250ZW50WSs9dG9wXG5cdFx0XHRjb250ZW50WCs9Zmlyc3RMaW5lXG4gICAgICAgIH1lbHNle1xuXHRcdFx0Y29udGVudFgrPWhhbmdpbmdcblx0XHR9XG5cbiAgICAgICAgaWYodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSl7Ly9sYXN0IGxpbmVcbiAgICAgICAgICAgIGxpbmVIZWlnaHQrPWJvdHRvbVxuXHRcdH1cblx0XHRcblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodC09bGluZUhlaWdodFxuXHRcdFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdyb3VwIGhlaWdodD17bGluZUhlaWdodH0gd2lkdGg9e3dpZHRofT5cbiAgICAgICAgICAgICAgICA8R3JvdXAgeD17Y29udGVudFh9IHk9e2NvbnRlbnRZfT5cbiAgICAgICAgICAgICAgICAgICAgPExpbmUgey4uLnByb3BzfS8+XG4gICAgICAgICAgICAgICAgPC9Hcm91cD5cbiAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBnZXRTdHlsZSgpe1xuICAgICAgICBpZih0aGlzLl9zdHlsZSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHlsZVxuICAgICAgICBsZXQgc3BhY2luZz10aGlzLnN0eWxlKCdwYXJhZ3JhcGguc3BhY2luZycpfHx7fVxuICAgICAgICBsZXQgaW5kZW50PXRoaXMuc3R5bGUoJ3BhcmFncmFwaC5pbmQnKXx8e31cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlPXtzcGFjaW5nLGluZGVudH1cbiAgICB9XG5cblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcblx0XHRnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXG5cdH0sU3VwZXIuY29udGV4dFR5cGVzKVxufVxuIl19