"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

						return text && typeof text == 'string' && (0, _wordwrap.testAll)(text, _wordwrap.isWhitespace);
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
									state.poped.unshift(text);
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
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var composed = this.computed.composed;

			return (0, _extends3.default)({}, (0, _get3.default)(Paragraph.prototype.__proto__ || (0, _getPrototypeOf2.default)(Paragraph.prototype), "getChildContext", this).call(this), {
				currentLineHasOnlyOneWord: function currentLineHasOnlyOneWord() {
					var currentLine = composed[composed.length - 1];
					var hasOnlyOneWord = function hasOnlyOneWord(_ref4) {
						var text = _ref4.props.children.props.children;

						return text && typeof text == 'string' && (0, _wordwrap.isWord)(text);
					};
					return currentLine && currentLine.children.reduce(function (state, _ref5) {
						var text = _ref5.props.children;
						return state && hasOnlyOneWord(text);
					}, true);
				}
			});
		}
	}]);
	return Paragraph;
}(Super);

Paragraph.displayName = "paragraph";
Paragraph.contextTypes = (0, _extends3.default)({}, Super.contextTypes, { getDefaultStyle: _react.PropTypes.func
});
Paragraph.childContextTypes = (0, _extends3.default)({}, Super.childContextTypes, { currentLineHasOnlyOneWord: _react.PropTypes.func
});
exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlBhcmFncmFwaCIsIndpZHRoIiwibGluZVdpZHRoIiwiaGVpZ2h0IiwiZGVzY2VudCIsImNoaWxkcmVuIiwiZ2V0U3R5bGUiLCJpbmRlbnQiLCJsZWZ0IiwicmlnaHQiLCJmaXJzdExpbmUiLCJoYW5naW5nIiwiYXZhaWxhYmxlU3BhY2UiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJtaW5SZXF1aXJlZEgiLCJjb250ZXh0IiwicGFyZW50IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwicHVzaCIsIl9uZXdMaW5lIiwiY3VycmVudExpbmUiLCJhdmFpbGFibGVXaWR0aCIsInJlZHVjZSIsInByZXYiLCJhIiwicHJvcHMiLCJjb250ZW50IiwiY29udGVudFdpZHRoIiwiY29udGVudEhlaWdodCIsImNvbnRlbnREZXNjZW50IiwicGllY2UiLCJhcHBlbmRDb21wb3NlZCIsIk1hdGgiLCJtYXgiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJhbGxXaGl0ZXNwYWNlIiwidGV4dCIsImNsb25lRWxlbWVudCIsInBvcGVkIiwiaGFzT25seU9uZVdvcmQiLCJzdGF0ZSIsInJlZHVjZVJpZ2h0IiwiZW5kIiwidW5zaGlmdCIsInNwbGljZSIsImZvckVhY2giLCJzcGFjaW5nIiwibGluZUhlaWdodCIsInRvcCIsImJvdHRvbSIsImNvbnRlbnRZIiwiY29udGVudFgiLCJjZWlsIiwicGFyc2VJbnQiLCJpc0FsbENoaWxkcmVuQ29tcG9zZWQiLCJfc3R5bGUiLCJzdHlsZSIsImN1cnJlbnRMaW5lSGFzT25seU9uZVdvcmQiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsImdldERlZmF1bHRTdHlsZSIsImZ1bmMiLCJjaGlsZENvbnRleHRUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QSxNQUZEO0FBR0EsWUFBT2hCLGVBQWVBLFlBQVluQixRQUFaLENBQXFCcUIsTUFBckIsQ0FBNEIsVUFBQ2tCLEtBQUQ7QUFBQSxVQUF3QkosSUFBeEIsU0FBUVgsS0FBUixDQUFleEIsUUFBZjtBQUFBLGFBQWlDdUMsU0FBU0QsZUFBZUgsSUFBZixDQUExQztBQUFBLE1BQTVCLEVBQTJGLElBQTNGLENBQXRCO0FBQ0E7QUFSRjtBQVVBOzs7RUFyTnFDekMsSzs7QUFBbEJDLFMsQ0FDYjhELFcsR0FBWSxXO0FBREM5RCxTLENBK0xiK0QsWSw4QkFDSGhFLE1BQU1nRSxZLElBQ1JDLGlCQUFpQixpQkFBVUM7O0FBak1UakUsUyxDQW9NYmtFLGlCLDhCQUNIbkUsTUFBTW1FLGlCLElBQ1JMLDJCQUEyQixpQkFBVUk7O2tCQXRNbkJqRSxTIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgQW55LCB7c3R5bGVJbmhlcml0YWJsZX0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBMaW5lIGZyb20gXCIuLi9jb21wb3NlZC9saW5lXCJcclxuXHJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXHJcblxyXG5pbXBvcnQge2lzQ2hhciwgaXNXaGl0ZXNwYWNlLCBpc1dvcmQsIHRlc3RBbGx9IGZyb20gXCIuLi93b3Jkd3JhcFwiXHJcblxyXG5sZXQgU3VwZXI9c3R5bGVJbmhlcml0YWJsZShBbnkpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIFN1cGVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInBhcmFncmFwaFwiXHJcblxyXG5cdF9uZXdMaW5lKCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMubGluZVdpZHRoKCksXHJcblx0XHRcdGhlaWdodDowLFxyXG5cdFx0XHRkZXNjZW50OjAsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcblx0bGluZVdpZHRoKCl7XHJcblx0XHRjb25zdCB7aW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQge3dpZHRofT10aGlzLmF2YWlsYWJsZVNwYWNlXHJcbiAgICAgICAgd2lkdGgtPShsZWZ0K3JpZ2h0KVxyXG4gICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICB3aWR0aC09Zmlyc3RMaW5lXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB3aWR0aC09aGFuZ2luZ1xyXG5cdFx0cmV0dXJuIHdpZHRoXHJcblx0fVxyXG5cclxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7Ly9AVE9ETzogbmVlZCBjb25zaWRlciBhdmFpbGFibGVTcGFjZS5oZWlnaHRcclxuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxyXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0aWYoMD09Y29tcG9zZWQubGVuZ3RoKXtcclxuXHRcdFx0bGV0IHt3aWR0aCxoZWlnaHR9PXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKClcclxuXHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZT17d2lkdGgsaGVpZ2h0fVxyXG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcclxuXHRcdH1cclxuICAgICAgICBsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcblxyXG4gICAgICAgIGxldCB7d2lkdGh9PWN1cnJlbnRMaW5lXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLHdpZHRoKVxyXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPD1taW5SZXF1aXJlZFcpe1xyXG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodDxtaW5SZXF1aXJlZEgpXHJcblx0XHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcclxuXHJcblx0XHRcdGF2YWlsYWJsZVdpZHRoPXRoaXMubGluZVdpZHRoKClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHt3aWR0aDphdmFpbGFibGVXaWR0aCwgaGVpZ2h0OnRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0LCBsaW5lV2lkdGg6dGhpcy5hdmFpbGFibGVTcGFjZS53aWR0aH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmRDb21wb3NlZChjb250ZW50KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlLmhlaWdodFxyXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXHJcbiAgICAgICAgbGV0IHt3aWR0aDpjb250ZW50V2lkdGgsIGhlaWdodDpjb250ZW50SGVpZ2h0LCBkZXNjZW50OmNvbnRlbnREZXNjZW50PTB9PWNvbnRlbnQucHJvcHNcclxuXHJcblxyXG5cdFx0bGV0IHBpZWNlPW51bGxcclxuXHRcdGlmKGF2YWlsYWJsZVdpZHRoPT0wKXtcclxuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXHJcblx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcclxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPj1jb250ZW50V2lkdGgpey8vbm90IGFwcGVuZGVkIHRvIHBhcmVudFxyXG4gICAgICAgICAgICBwaWVjZT0oXHJcblx0XHRcdFx0XHQ8R3JvdXBcclxuXHRcdFx0XHRcdFx0eD17Y3VycmVudExpbmUud2lkdGgtYXZhaWxhYmxlV2lkdGh9XHJcblx0XHRcdFx0XHRcdGluZGV4PXt0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aH1cclxuXHRcdFx0XHRcdFx0ZGVzY2VudD17Y29udGVudERlc2NlbnR9XHJcblx0XHRcdFx0XHRcdHdpZHRoPXtjb250ZW50V2lkdGh9XHJcblx0XHRcdFx0XHRcdGhlaWdodD17Y29udGVudEhlaWdodH0+XHJcblx0XHRcdFx0XHRcdHtjb250ZW50fVxyXG5cdFx0XHRcdFx0PC9Hcm91cD5cclxuXHRcdFx0XHRcdClcclxuICAgICAgICAgICAgY3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChwaWVjZSlcclxuXHRcdFx0Y3VycmVudExpbmUuaGVpZ2h0PU1hdGgubWF4KGN1cnJlbnRMaW5lLmhlaWdodCxjb250ZW50SGVpZ2h0KVxyXG5cdFx0XHRjdXJyZW50TGluZS5kZXNjZW50PU1hdGgubWF4KGN1cnJlbnRMaW5lLmRlc2NlbnQsIGNvbnRlbnREZXNjZW50KVxyXG5cdFx0XHRpZihhdmFpbGFibGVXaWR0aD09Y29udGVudFdpZHRoKXtcclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoY3VycmVudExpbmUpKVxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aDxjb250ZW50V2lkdGgpe1xyXG5cdFx0XHRjb25zdCBhbGxXaGl0ZXNwYWNlPSh7cHJvcHM6e2NoaWxkcmVuOntwcm9wczp7Y2hpbGRyZW46dGV4dH19fX0pPT57XHJcblx0XHRcdFx0cmV0dXJuIHRleHQgJiYgdHlwZW9mKHRleHQpPT0nc3RyaW5nJyAmJiB0ZXN0QWxsKHRleHQsaXNXaGl0ZXNwYWNlKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihhbGxXaGl0ZXNwYWNlKGNvbnRlbnQpKXtcclxuXHRcdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKFJlYWN0LmNsb25lRWxlbWVudChjb250ZW50LHt3aWR0aDowfSkpXHJcblx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBwb3BlZD1bXVxyXG5cdFx0XHRjb25zdCBoYXNPbmx5T25lV29yZD0oe3Byb3BzOntjaGlsZHJlbjp7cHJvcHM6e2NoaWxkcmVuOnRleHR9fX19KT0+e1xyXG5cdFx0XHRcdHJldHVybiB0ZXh0ICYmIHR5cGVvZih0ZXh0KT09J3N0cmluZycgJiYgWy4uLnRleHRdLnJlZHVjZSgoc3RhdGUsYSk9PnN0YXRlICYmIGlzQ2hhcihhKSx0cnVlKVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmKGhhc09ubHlPbmVXb3JkKGNvbnRlbnQpKXtcclxuXHRcdFx0XHRwb3BlZD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2VSaWdodCgoc3RhdGUsYSk9PntcclxuXHRcdFx0XHRcdGlmKCFzdGF0ZS5lbmQpe1xyXG5cdFx0XHRcdFx0XHRsZXQge2NoaWxkcmVuOnRleHR9PWEucHJvcHNcclxuXHRcdFx0XHRcdFx0aWYoaGFzT25seU9uZVdvcmQodGV4dCkpe1xyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLnBvcGVkLnVuc2hpZnQodGV4dClcclxuXHRcdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS5lbmQ9dHJ1ZVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdFx0fSx7ZW5kOmZhbHNlLHBvcGVkOltdfSkucG9wZWRcclxuXHRcdFx0XHRpZihwb3BlZC5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0aWYocG9wZWQubGVuZ3RoPGN1cnJlbnRMaW5lLmNoaWxkcmVuLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRcdGN1cnJlbnRMaW5lLmNoaWxkcmVuLnNwbGljZSgtcG9wZWQubGVuZ3RoLHBvcGVkLmxlbmd0aClcclxuXHRcdFx0XHRcdFx0T2JqZWN0LmFzc2lnbihjdXJyZW50TGluZSwgY3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSx7cHJvcHM6e2hlaWdodCxkZXNjZW50fX0pPT57XHJcblx0XHRcdFx0XHRcdFx0c3RhdGUuaGVpZ2h0PU1hdGgubWF4KHN0YXRlLmhlaWdodCxoZWlnaHQpXHJcblx0XHRcdFx0XHRcdFx0c3RhdGUuZGVzY2VudD1NYXRoLm1heChzdGF0ZS5kZXNjZW50LGRlc2NlbnQpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdFx0XHRcdH0se2hlaWdodDowLGRlc2NlbnQ6MH0pKVxyXG5cdFx0XHRcdFx0fWVsc2UgaWYocG9wZWQubGVuZ3RoPT1jdXJyZW50TGluZS5jaGlsZHJlbi5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodD49Y3VycmVudExpbmUuaGVpZ2h0KXtcclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoY3VycmVudExpbmUpKVxyXG5cdFx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxyXG5cdFx0XHRcdGF2YWlsYWJsZVdpZHRoPXRoaXMuYXZhaWxhYmxlU3BhY2Uud2lkdGhcclxuXHJcblx0XHRcdFx0aWYocG9wZWQubGVuZ3RoKXtcclxuXHRcdFx0XHRcdHBvcGVkLmZvckVhY2goYT0+dGhpcy5hcHBlbmRDb21wb3NlZChhKSlcclxuXHRcdFx0XHRcdGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG5cdFx0XHQgICAgICAgIGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoY29udGVudFdpZHRoPD1hdmFpbGFibGVXaWR0aClcclxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ZWxzZXtcclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgIH1cclxuXHJcblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7Ly9uZWVkIGFwcGVuZCBsYXN0IG5vbi1mdWxsLXdpZHRoIGxpbmUgdG8gcGFyZW50XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuXHRcdGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcclxuXHRcdGlmKGF2YWlsYWJsZVdpZHRoPjApe1xyXG5cdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoY3VycmVudExpbmUpKVxyXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg9PTApe1xyXG5cdFx0XHQvL2FscmVhZHkgYXBwZW5kZWQgdG8gcGFyZW50IGluIGFwcGVuZENvbXBvc2VkXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZT17d2lkdGg6MCwgaGVpZ2h0OjB9XHJcblxyXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuXHR9XHJcblxyXG4gICAgY3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuICAgICAgICBsZXQge2hlaWdodCwgd2lkdGh9PXByb3BzXHJcbiAgICAgICAgbGV0IHtzcGFjaW5nOntsaW5lSGVpZ2h0PVwiMTAwJVwiLHRvcD0wLCBib3R0b209MH0sIGluZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXHJcbiAgICAgICAgbGV0IGNvbnRlbnRZPTAsIGNvbnRlbnRYPWxlZnRcclxuXHJcbiAgICAgICBsaW5lSGVpZ2h0PXR5cGVvZihsaW5lSGVpZ2h0KT09J3N0cmluZycgPyBNYXRoLmNlaWwoaGVpZ2h0KnBhcnNlSW50KGxpbmVIZWlnaHQpLzEwMC4wKTogbGluZUhlaWdodFxyXG5cclxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MSl7Ly9maXJzdCBsaW5lXHJcbiAgICAgICAgICAgIGxpbmVIZWlnaHQrPXRvcFxyXG4gICAgICAgICAgICBjb250ZW50WSs9dG9wXHJcblx0XHRcdGNvbnRlbnRYKz1maXJzdExpbmVcclxuICAgICAgICB9ZWxzZXtcclxuXHRcdFx0Y29udGVudFgrPWhhbmdpbmdcclxuXHRcdH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSl7Ly9sYXN0IGxpbmVcclxuICAgICAgICAgICAgbGluZUhlaWdodCs9Ym90dG9tXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQtPWxpbmVIZWlnaHRcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdyb3VwIGhlaWdodD17bGluZUhlaWdodH0gd2lkdGg9e3dpZHRofT5cclxuICAgICAgICAgICAgICAgIDxHcm91cCB4PXtjb250ZW50WH0geT17Y29udGVudFl9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5lIHsuLi5wcm9wc30vPlxyXG4gICAgICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R5bGUoKXtcclxuICAgICAgICBpZih0aGlzLl9zdHlsZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlXHJcbiAgICAgICAgbGV0IHNwYWNpbmc9dGhpcy5zdHlsZSgncFByLnNwYWNpbmcnKXx8e31cclxuICAgICAgICBsZXQgaW5kZW50PXRoaXMuc3R5bGUoJ3BQci5pbmQnKXx8e31cclxuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU9e3NwYWNpbmcsaW5kZW50fVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdC4uLlN1cGVyLmNvbnRleHRUeXBlc1xyXG5cdFx0LGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcclxuXHRcdC4uLlN1cGVyLmNoaWxkQ29udGV4dFR5cGVzXHJcblx0XHQsY3VycmVudExpbmVIYXNPbmx5T25lV29yZDogUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcblx0XHJcblx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdC4uLnN1cGVyLmdldENoaWxkQ29udGV4dCgpXHJcblx0XHRcdCxjdXJyZW50TGluZUhhc09ubHlPbmVXb3JkKCl7XHJcblx0XHRcdFx0Y29uc3QgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcblx0XHRcdFx0Y29uc3QgaGFzT25seU9uZVdvcmQ9KHtwcm9wczp7Y2hpbGRyZW46e3Byb3BzOntjaGlsZHJlbjp0ZXh0fX19fSk9PntcclxuXHRcdFx0XHRcdHJldHVybiB0ZXh0ICYmIHR5cGVvZih0ZXh0KT09J3N0cmluZycgJiYgaXNXb3JkKHRleHQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBjdXJyZW50TGluZSAmJiBjdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLHtwcm9wczp7Y2hpbGRyZW46dGV4dH19KT0+c3RhdGUgJiYgaGFzT25seU9uZVdvcmQodGV4dCksdHJ1ZSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=