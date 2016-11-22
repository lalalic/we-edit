"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _wordwrap = require("../wordwrap");

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
			var _this2 = this;

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
				var _ret = function () {
					var allWhitespace = function allWhitespace(_ref) {
						var text = _ref.props.children.props.children;

						return text && typeof text == 'string' && [].concat((0, _toConsumableArray3.default)(text)).reduce(function (state, a) {
							return state && (0, _wordwrap.isWhitespace)(a);
						}, true);
					};

					if (allWhitespace(content)) {
						_this2.appendComposed(_react2.default.cloneElement(content, { width: 0 }));
						return {
							v: void 0
						};
					}

					var poped = [];
					var hasOnlyOneWord = function hasOnlyOneWord(_ref2) {
						var text = _ref2.props.children.props.children;

						return text && typeof text == 'string' && [].concat((0, _toConsumableArray3.default)(text)).reduce(function (state, a) {
							return state && (0, _wordwrap.isChar)(a);
						}, true);
					};
					if (hasOnlyOneWord(content)) {
						poped = currentLine.children.reduceRight(function (state, a) {
							if (!state.end) {
								var text = a.props.children;

								if (hasOnlyOneWord(text)) {
									state.poped.push(text);
								} else state.end = true;
							}
							return state;
						}, { end: false, poped: [] }).poped;
						if (poped.length) {
							if (poped.length < currentLine.children.length) {
								currentLine.children.splice(-poped.length, poped.length);
								(0, _assign2.default)(currentLine, currentLine.children.reduce(function (state, _ref3) {
									var _ref3$props = _ref3.props,
									    height = _ref3$props.height,
									    descent = _ref3$props.descent;

									state.height = Math.max(state.height, height);
									state.descent = Math.max(state.descent, descent);
									return state;
								}, { height: 0, descent: 0 }));
							} else if (poped.length == currentLine.children.length) {
								return {
									v: false
								};
							}
						}
					}

					if (_this2.availableSpace.height >= currentLine.height) {
						parent.appendComposed(_this2.createComposed2Parent(currentLine));
						composed.push(_this2._newLine());
						availableWidth = _this2.availableSpace.width;

						if (poped.length) {
							poped.forEach(function (a) {
								return _this2.appendComposed(a);
							});
							currentLine = composed[composed.length - 1];
							availableWidth = currentLine.children.reduce(function (prev, a) {
								return prev - a.props.width;
							}, currentLine.width);
						}

						if (contentWidth <= availableWidth) _this2.appendComposed(content);else {
							return {
								v: false
							};
						}
					} else {}
				}();

				if ((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlBhcmFncmFwaCIsIndpZHRoIiwibGluZVdpZHRoIiwiaGVpZ2h0IiwiZGVzY2VudCIsImNoaWxkcmVuIiwiZ2V0U3R5bGUiLCJpbmRlbnQiLCJsZWZ0IiwicmlnaHQiLCJmaXJzdExpbmUiLCJoYW5naW5nIiwiYXZhaWxhYmxlU3BhY2UiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJtaW5SZXF1aXJlZEgiLCJjb250ZXh0IiwicGFyZW50IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwicHVzaCIsIl9uZXdMaW5lIiwiY3VycmVudExpbmUiLCJhdmFpbGFibGVXaWR0aCIsInJlZHVjZSIsInByZXYiLCJhIiwicHJvcHMiLCJjb250ZW50IiwiY29udGVudFdpZHRoIiwiY29udGVudEhlaWdodCIsImNvbnRlbnREZXNjZW50IiwicGllY2UiLCJhcHBlbmRDb21wb3NlZCIsIk1hdGgiLCJtYXgiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJhbGxXaGl0ZXNwYWNlIiwidGV4dCIsInN0YXRlIiwiY2xvbmVFbGVtZW50IiwicG9wZWQiLCJoYXNPbmx5T25lV29yZCIsInJlZHVjZVJpZ2h0IiwiZW5kIiwic3BsaWNlIiwiZm9yRWFjaCIsInNwYWNpbmciLCJsaW5lSGVpZ2h0IiwidG9wIiwiYm90dG9tIiwiY29udGVudFkiLCJjb250ZW50WCIsImNlaWwiLCJwYXJzZUludCIsImlzQWxsQ2hpbGRyZW5Db21wb3NlZCIsIl9zdHlsZSIsInN0eWxlIiwiZGlzcGxheU5hbWUiLCJjb250ZXh0VHlwZXMiLCJnZXREZWZhdWx0U3R5bGUiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FB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RyxLQUFLckMsUUFBTCxDQUFjQyxRQUFkLENBQXVCQyxNQUF2QixJQUErQixDQUFsQyxFQUFvQztBQUFDO0FBQ2pDbUMsa0JBQVlDLEdBQVo7QUFDQUUsZ0JBQVVGLEdBQVY7QUFDVEcsZ0JBQVU1QyxTQUFWO0FBQ00sSUFKRCxNQUlLO0FBQ1Y0QyxnQkFBVTNDLE9BQVY7QUFDQTs7QUFFSyxPQUFHLEtBQUs4QyxxQkFBTCxFQUFILEVBQWdDO0FBQUM7QUFDN0JQLGtCQUFZRSxNQUFaO0FBQ1Q7O0FBRUQsUUFBS3hDLGNBQUwsQ0FBb0JULE1BQXBCLElBQTRCK0MsVUFBNUI7O0FBRU0sVUFDSTtBQUFBO0FBQUEsTUFBTyxRQUFRQSxVQUFmLEVBQTJCLE9BQU9qRCxLQUFsQztBQUNJO0FBQUE7QUFBQSxPQUFPLEdBQUdxRCxRQUFWLEVBQW9CLEdBQUdELFFBQXZCO0FBQ0ksbURBQVV4QixLQUFWO0FBREo7QUFESixJQURKO0FBT0g7Ozs2QkFFUztBQUNOLE9BQUcsS0FBSzZCLE1BQVIsRUFDSSxPQUFPLEtBQUtBLE1BQVo7QUFDSixPQUFJVCxVQUFRLEtBQUtVLEtBQUwsQ0FBVyxhQUFYLEtBQTJCLEVBQXZDO0FBQ0EsT0FBSXBELFNBQU8sS0FBS29ELEtBQUwsQ0FBVyxTQUFYLEtBQXVCLEVBQWxDO0FBQ0EsVUFBTyxLQUFLRCxNQUFMLEdBQVksRUFBQ1QsZ0JBQUQsRUFBUzFDLGNBQVQsRUFBbkI7QUFDSDs7O0VBN0xrQ1IsSzs7QUFBbEJDLFMsQ0FDYjRELFcsR0FBWSxXO0FBREM1RCxTLENBK0xiNkQsWSxHQUFhLHNCQUFjO0FBQ2pDQyxrQkFBaUIsaUJBQVVDO0FBRE0sQ0FBZCxFQUVsQmhFLE1BQU04RCxZQUZZLEM7a0JBL0xBN0QsUyIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnksIHtzdHlsZUluaGVyaXRhYmxlfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQgTGluZSBmcm9tIFwiLi4vY29tcG9zZWQvbGluZVwiXG5cbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHRcIlxuXG5pbXBvcnQge2lzQ2hhciwgaXNXaGl0ZXNwYWNlfSBmcm9tIFwiLi4vd29yZHdyYXBcIlxuXG5sZXQgU3VwZXI9c3R5bGVJbmhlcml0YWJsZShBbnkpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBTdXBlcntcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwicGFyYWdyYXBoXCJcblxuXHRfbmV3TGluZSgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMubGluZVdpZHRoKCksXG5cdFx0XHRoZWlnaHQ6MCxcblx0XHRcdGRlc2NlbnQ6MCxcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXG4gICAgICAgIH1cblx0fVxuXG5cdGxpbmVXaWR0aCgpe1xuXHRcdGNvbnN0IHtpbmRlbnQ6e2xlZnQ9MCxyaWdodD0wLGZpcnN0TGluZT0wLGhhbmdpbmc9MH19PXRoaXMuZ2V0U3R5bGUoKVxuICAgICAgICBsZXQge3dpZHRofT10aGlzLmF2YWlsYWJsZVNwYWNlXG4gICAgICAgIHdpZHRoLT0obGVmdCtyaWdodClcbiAgICAgICAgaWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTApXG4gICAgICAgICAgICB3aWR0aC09Zmlyc3RMaW5lXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHdpZHRoLT1oYW5naW5nXG5cdFx0cmV0dXJuIHdpZHRoXG5cdH1cblxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7Ly9AVE9ETzogbmVlZCBjb25zaWRlciBhdmFpbGFibGVTcGFjZS5oZWlnaHRcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXG5cdFx0aWYoMD09Y29tcG9zZWQubGVuZ3RoKXtcblx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXG5cdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aCxoZWlnaHR9XG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblx0XHR9XG4gICAgICAgIGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsd2lkdGgpXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPD1taW5SZXF1aXJlZFcpe1xuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ8bWluUmVxdWlyZWRIKVxuXHRcdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXG5cdFx0XHRhdmFpbGFibGVXaWR0aD10aGlzLmxpbmVXaWR0aCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt3aWR0aDphdmFpbGFibGVXaWR0aCwgaGVpZ2h0OnRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0LCBsaW5lV2lkdGg6dGhpcy5hdmFpbGFibGVTcGFjZS53aWR0aH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZChjb250ZW50KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlLmhlaWdodFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XG5cblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcbiAgICAgICAgbGV0IHt3aWR0aDpjb250ZW50V2lkdGgsIGhlaWdodDpjb250ZW50SGVpZ2h0LCBkZXNjZW50OmNvbnRlbnREZXNjZW50PTB9PWNvbnRlbnQucHJvcHNcblxuXG5cdFx0bGV0IHBpZWNlPW51bGxcblx0XHRpZihhdmFpbGFibGVXaWR0aD09MCl7XG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcblx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXsvL25vdCBhcHBlbmRlZCB0byBwYXJlbnRcbiAgICAgICAgICAgIHBpZWNlPShcblx0XHRcdFx0XHQ8R3JvdXBcblx0XHRcdFx0XHRcdHg9e2N1cnJlbnRMaW5lLndpZHRoLWF2YWlsYWJsZVdpZHRofVxuXHRcdFx0XHRcdFx0aW5kZXg9e3RoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RofVxuXHRcdFx0XHRcdFx0ZGVzY2VudD17Y29udGVudERlc2NlbnR9XG5cdFx0XHRcdFx0XHR3aWR0aD17Y29udGVudFdpZHRofVxuXHRcdFx0XHRcdFx0aGVpZ2h0PXtjb250ZW50SGVpZ2h0fT5cblx0XHRcdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0XHRcdDwvR3JvdXA+XG5cdFx0XHRcdFx0KVxuICAgICAgICAgICAgY3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChwaWVjZSlcblx0XHRcdGN1cnJlbnRMaW5lLmhlaWdodD1NYXRoLm1heChjdXJyZW50TGluZS5oZWlnaHQsY29udGVudEhlaWdodClcblx0XHRcdGN1cnJlbnRMaW5lLmRlc2NlbnQ9TWF0aC5tYXgoY3VycmVudExpbmUuZGVzY2VudCwgY29udGVudERlc2NlbnQpXG5cdFx0XHRpZihhdmFpbGFibGVXaWR0aD09Y29udGVudFdpZHRoKXtcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGN1cnJlbnRMaW5lKSlcblx0XHRcdH1cblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aDxjb250ZW50V2lkdGgpe1xuXHRcdFx0Y29uc3QgYWxsV2hpdGVzcGFjZT0oe3Byb3BzOntjaGlsZHJlbjp7cHJvcHM6e2NoaWxkcmVuOnRleHR9fX19KT0+e1xuXHRcdFx0XHRyZXR1cm4gdGV4dCAmJiB0eXBlb2YodGV4dCk9PSdzdHJpbmcnICYmIFsuLi50ZXh0XS5yZWR1Y2UoKHN0YXRlLGEpPT5zdGF0ZSAmJiBpc1doaXRlc3BhY2UoYSksdHJ1ZSlcblx0XHRcdH1cblxuXHRcdFx0aWYoYWxsV2hpdGVzcGFjZShjb250ZW50KSl7XG5cdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoUmVhY3QuY2xvbmVFbGVtZW50KGNvbnRlbnQse3dpZHRoOjB9KSlcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cblx0XHRcdGxldCBwb3BlZD1bXVxuXHRcdFx0Y29uc3QgaGFzT25seU9uZVdvcmQ9KHtwcm9wczp7Y2hpbGRyZW46e3Byb3BzOntjaGlsZHJlbjp0ZXh0fX19fSk9Pntcblx0XHRcdFx0cmV0dXJuIHRleHQgJiYgdHlwZW9mKHRleHQpPT0nc3RyaW5nJyAmJiBbLi4udGV4dF0ucmVkdWNlKChzdGF0ZSxhKT0+c3RhdGUgJiYgaXNDaGFyKGEpLHRydWUpXG5cdFx0XHR9XG5cdFx0XHRpZihoYXNPbmx5T25lV29yZChjb250ZW50KSl7XG5cdFx0XHRcdHBvcGVkPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZVJpZ2h0KChzdGF0ZSxhKT0+e1xuXHRcdFx0XHRcdGlmKCFzdGF0ZS5lbmQpe1xuXHRcdFx0XHRcdFx0bGV0IHtjaGlsZHJlbjp0ZXh0fT1hLnByb3BzXG5cdFx0XHRcdFx0XHRpZihoYXNPbmx5T25lV29yZCh0ZXh0KSl7XG5cdFx0XHRcdFx0XHRcdHN0YXRlLnBvcGVkLnB1c2godGV4dClcblx0XHRcdFx0XHRcdH1lbHNlXG5cdFx0XHRcdFx0XHRcdHN0YXRlLmVuZD10cnVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdFx0XHR9LHtlbmQ6ZmFsc2UscG9wZWQ6W119KS5wb3BlZFxuXHRcdFx0XHRpZihwb3BlZC5sZW5ndGgpe1xuXHRcdFx0XHRcdGlmKHBvcGVkLmxlbmd0aDxjdXJyZW50TGluZS5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHRcdFx0Y3VycmVudExpbmUuY2hpbGRyZW4uc3BsaWNlKC1wb3BlZC5sZW5ndGgscG9wZWQubGVuZ3RoKVxuXHRcdFx0XHRcdFx0T2JqZWN0LmFzc2lnbihjdXJyZW50TGluZSwgY3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSx7cHJvcHM6e2hlaWdodCxkZXNjZW50fX0pPT57XG5cdFx0XHRcdFx0XHRcdHN0YXRlLmhlaWdodD1NYXRoLm1heChzdGF0ZS5oZWlnaHQsaGVpZ2h0KVxuXHRcdFx0XHRcdFx0XHRzdGF0ZS5kZXNjZW50PU1hdGgubWF4KHN0YXRlLmRlc2NlbnQsZGVzY2VudClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0XHRcdFx0XHR9LHtoZWlnaHQ6MCxkZXNjZW50OjB9KSlcblx0XHRcdFx0XHR9ZWxzZSBpZihwb3BlZC5sZW5ndGg9PWN1cnJlbnRMaW5lLmNoaWxkcmVuLmxlbmd0aCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodD49Y3VycmVudExpbmUuaGVpZ2h0KXtcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGN1cnJlbnRMaW5lKSlcblx0XHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXG5cdFx0XHRcdGF2YWlsYWJsZVdpZHRoPXRoaXMuYXZhaWxhYmxlU3BhY2Uud2lkdGhcblxuXHRcdFx0XHRpZihwb3BlZC5sZW5ndGgpe1xuXHRcdFx0XHRcdHBvcGVkLmZvckVhY2goYT0+dGhpcy5hcHBlbmRDb21wb3NlZChhKSlcblx0XHRcdFx0XHRjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblx0XHRcdCAgICAgICAgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihjb250ZW50V2lkdGg8PWF2YWlsYWJsZVdpZHRoKVxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7XG5cblx0XHRcdH1cblx0XHR9XG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpey8vbmVlZCBhcHBlbmQgbGFzdCBub24tZnVsbC13aWR0aCBsaW5lIHRvIHBhcmVudFxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuXHRcdGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcblx0XHRpZihhdmFpbGFibGVXaWR0aD4wKXtcblx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg9PTApe1xuXHRcdFx0Ly9hbHJlYWR5IGFwcGVuZGVkIHRvIHBhcmVudCBpbiBhcHBlbmRDb21wb3NlZFxuXHRcdH1cblxuXHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoOjAsIGhlaWdodDowfVxuXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxuXG4gICAgY3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcbiAgICAgICAgbGV0IHtoZWlnaHQsIHdpZHRofT1wcm9wc1xuICAgICAgICBsZXQge3NwYWNpbmc6e2xpbmVIZWlnaHQ9XCIxMDAlXCIsdG9wPTAsIGJvdHRvbT0wfSwgaW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcbiAgICAgICAgbGV0IGNvbnRlbnRZPTAsIGNvbnRlbnRYPWxlZnRcblxuICAgICAgICBsaW5lSGVpZ2h0PXR5cGVvZihsaW5lSGVpZ2h0KT09J3N0cmluZycgPyBNYXRoLmNlaWwoaGVpZ2h0KnBhcnNlSW50KGxpbmVIZWlnaHQpLzEwMC4wKTogbGluZUhlaWdodFxuXG4gICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0xKXsvL2ZpcnN0IGxpbmVcbiAgICAgICAgICAgIGxpbmVIZWlnaHQrPXRvcFxuICAgICAgICAgICAgY29udGVudFkrPXRvcFxuXHRcdFx0Y29udGVudFgrPWZpcnN0TGluZVxuICAgICAgICB9ZWxzZXtcblx0XHRcdGNvbnRlbnRYKz1oYW5naW5nXG5cdFx0fVxuXG4gICAgICAgIGlmKHRoaXMuaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkpey8vbGFzdCBsaW5lXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz1ib3R0b21cblx0XHR9XG5cblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodC09bGluZUhlaWdodFxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8R3JvdXAgaGVpZ2h0PXtsaW5lSGVpZ2h0fSB3aWR0aD17d2lkdGh9PlxuICAgICAgICAgICAgICAgIDxHcm91cCB4PXtjb250ZW50WH0geT17Y29udGVudFl9PlxuICAgICAgICAgICAgICAgICAgICA8TGluZSB7Li4ucHJvcHN9Lz5cbiAgICAgICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICAgICAgPC9Hcm91cD5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGdldFN0eWxlKCl7XG4gICAgICAgIGlmKHRoaXMuX3N0eWxlKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlXG4gICAgICAgIGxldCBzcGFjaW5nPXRoaXMuc3R5bGUoJ3BQci5zcGFjaW5nJyl8fHt9XG4gICAgICAgIGxldCBpbmRlbnQ9dGhpcy5zdHlsZSgncFByLmluZCcpfHx7fVxuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU9e3NwYWNpbmcsaW5kZW50fVxuICAgIH1cblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuXHRcdGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmNcblx0fSxTdXBlci5jb250ZXh0VHlwZXMpXG59XG4iXX0=