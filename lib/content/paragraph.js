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
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"p",
				null,
				this.getContent()
			);
		}
	}, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlBhcmFncmFwaCIsImdldENvbnRlbnQiLCJ3aWR0aCIsImxpbmVXaWR0aCIsImhlaWdodCIsImRlc2NlbnQiLCJjaGlsZHJlbiIsImdldFN0eWxlIiwiaW5kZW50IiwibGVmdCIsInJpZ2h0IiwiZmlyc3RMaW5lIiwiaGFuZ2luZyIsImF2YWlsYWJsZVNwYWNlIiwiY29tcHV0ZWQiLCJjb21wb3NlZCIsImxlbmd0aCIsInJlcXVpcmVkIiwibWluUmVxdWlyZWRXIiwibWluUmVxdWlyZWRIIiwiY29udGV4dCIsInBhcmVudCIsIm5leHRBdmFpbGFibGVTcGFjZSIsInB1c2giLCJfbmV3TGluZSIsImN1cnJlbnRMaW5lIiwiYXZhaWxhYmxlV2lkdGgiLCJyZWR1Y2UiLCJwcmV2IiwiYSIsInByb3BzIiwiY29udGVudCIsImNvbnRlbnRXaWR0aCIsImNvbnRlbnRIZWlnaHQiLCJjb250ZW50RGVzY2VudCIsInBpZWNlIiwiYXBwZW5kQ29tcG9zZWQiLCJNYXRoIiwibWF4IiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwiYWxsV2hpdGVzcGFjZSIsInRleHQiLCJjbG9uZUVsZW1lbnQiLCJwb3BlZCIsImhhc09ubHlPbmVXb3JkIiwic3RhdGUiLCJyZWR1Y2VSaWdodCIsImVuZCIsInVuc2hpZnQiLCJzcGxpY2UiLCJmb3JFYWNoIiwic3BhY2luZyIsImxpbmVIZWlnaHQiLCJ0b3AiLCJib3R0b20iLCJjb250ZW50WSIsImNvbnRlbnRYIiwiY2VpbCIsInBhcnNlSW50IiwiaXNBbGxDaGlsZHJlbkNvbXBvc2VkIiwiX3N0eWxlIiwic3R5bGUiLCJjdXJyZW50TGluZUhhc09ubHlPbmVXb3JkIiwiZGlzcGxheU5hbWUiLCJjb250ZXh0VHlwZXMiLCJnZXREZWZhdWx0U3R5bGUiLCJmdW5jIiwiY2hpbGRDb250ZXh0VHlwZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7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QW9COztBQUNsRSxhQUFPbUMsUUFBUSxPQUFPQSxJQUFQLElBQWMsUUFBdEIsSUFBa0Msc0JBQU9BLElBQVAsQ0FBekM7QUFDQSxNQUZEO0FBR0EsWUFBT2hCLGVBQWVBLFlBQVluQixRQUFaLENBQXFCcUIsTUFBckIsQ0FBNEIsVUFBQ2tCLEtBQUQ7QUFBQSxVQUF3QkosSUFBeEIsU0FBUVgsS0FBUixDQUFleEIsUUFBZjtBQUFBLGFBQWlDdUMsU0FBU0QsZUFBZUgsSUFBZixDQUExQztBQUFBLE1BQTVCLEVBQTJGLElBQTNGLENBQXRCO0FBQ0E7QUFSRjtBQVVBOzs7RUF6TnFDMUMsSzs7QUFBbEJDLFMsQ0FDYitELFcsR0FBWSxXO0FBREMvRCxTLENBbU1iZ0UsWSw4QkFDSGpFLE1BQU1pRSxZLElBQ1JDLGlCQUFpQixpQkFBVUM7O0FBck1UbEUsUyxDQXdNYm1FLGlCLDhCQUNIcEUsTUFBTW9FLGlCLElBQ1JMLDJCQUEyQixpQkFBVUk7O2tCQTFNbkJsRSxTIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgQW55LCB7c3R5bGVJbmhlcml0YWJsZX0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBMaW5lIGZyb20gXCIuLi9jb21wb3NlZC9saW5lXCJcclxuXHJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXHJcblxyXG5pbXBvcnQge2lzQ2hhciwgaXNXaGl0ZXNwYWNlLCBpc1dvcmQsIHRlc3RBbGx9IGZyb20gXCIuLi93b3Jkd3JhcFwiXHJcblxyXG5sZXQgU3VwZXI9c3R5bGVJbmhlcml0YWJsZShBbnkpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIFN1cGVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInBhcmFncmFwaFwiXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIDxwPnt0aGlzLmdldENvbnRlbnQoKX08L3A+XHRcclxuXHR9XHJcblx0XHJcblx0X25ld0xpbmUoKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5saW5lV2lkdGgoKSxcclxuXHRcdFx0aGVpZ2h0OjAsXHJcblx0XHRcdGRlc2NlbnQ6MCxcclxuICAgICAgICAgICAgY2hpbGRyZW46W11cclxuICAgICAgICB9XHJcblx0fVxyXG5cclxuXHRsaW5lV2lkdGgoKXtcclxuXHRcdGNvbnN0IHtpbmRlbnQ6e2xlZnQ9MCxyaWdodD0wLGZpcnN0TGluZT0wLGhhbmdpbmc9MH19PXRoaXMuZ2V0U3R5bGUoKVxyXG4gICAgICAgIGxldCB7d2lkdGh9PXRoaXMuYXZhaWxhYmxlU3BhY2VcclxuICAgICAgICB3aWR0aC09KGxlZnQrcmlnaHQpXHJcbiAgICAgICAgaWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTApXHJcbiAgICAgICAgICAgIHdpZHRoLT1maXJzdExpbmVcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHdpZHRoLT1oYW5naW5nXHJcblx0XHRyZXR1cm4gd2lkdGhcclxuXHR9XHJcblxyXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlLmhlaWdodFxyXG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXHJcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcblx0XHRpZigwPT1jb21wb3NlZC5sZW5ndGgpe1xyXG5cdFx0XHRsZXQge3dpZHRoLGhlaWdodH09dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxyXG5cdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aCxoZWlnaHR9XHJcblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxyXG5cdFx0fVxyXG4gICAgICAgIGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuXHJcbiAgICAgICAgbGV0IHt3aWR0aH09Y3VycmVudExpbmVcclxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsd2lkdGgpXHJcbiAgICAgICAgaWYoYXZhaWxhYmxlV2lkdGg8PW1pblJlcXVpcmVkVyl7XHJcblx0XHRcdGlmKHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0PG1pblJlcXVpcmVkSClcclxuXHRcdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxyXG5cclxuXHRcdFx0YXZhaWxhYmxlV2lkdGg9dGhpcy5saW5lV2lkdGgoKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge3dpZHRoOmF2YWlsYWJsZVdpZHRoLCBoZWlnaHQ6dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQsIGxpbmVXaWR0aDp0aGlzLmF2YWlsYWJsZVNwYWNlLndpZHRofVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZENvbXBvc2VkKGNvbnRlbnQpey8vQFRPRE86IG5lZWQgY29uc2lkZXIgYXZhaWxhYmxlU3BhY2UuaGVpZ2h0XHJcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblxyXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcclxuICAgICAgICBsZXQge3dpZHRoOmNvbnRlbnRXaWR0aCwgaGVpZ2h0OmNvbnRlbnRIZWlnaHQsIGRlc2NlbnQ6Y29udGVudERlc2NlbnQ9MH09Y29udGVudC5wcm9wc1xyXG5cclxuXHJcblx0XHRsZXQgcGllY2U9bnVsbFxyXG5cdFx0aWYoYXZhaWxhYmxlV2lkdGg9PTApe1xyXG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcclxuXHRcdFx0dGhpcy5hcHBlbmRDb21wb3NlZChjb250ZW50KVxyXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg+PWNvbnRlbnRXaWR0aCl7Ly9ub3QgYXBwZW5kZWQgdG8gcGFyZW50XHJcbiAgICAgICAgICAgIHBpZWNlPShcclxuXHRcdFx0XHRcdDxHcm91cFxyXG5cdFx0XHRcdFx0XHR4PXtjdXJyZW50TGluZS53aWR0aC1hdmFpbGFibGVXaWR0aH1cclxuXHRcdFx0XHRcdFx0aW5kZXg9e3RoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RofVxyXG5cdFx0XHRcdFx0XHRkZXNjZW50PXtjb250ZW50RGVzY2VudH1cclxuXHRcdFx0XHRcdFx0d2lkdGg9e2NvbnRlbnRXaWR0aH1cclxuXHRcdFx0XHRcdFx0aGVpZ2h0PXtjb250ZW50SGVpZ2h0fT5cclxuXHRcdFx0XHRcdFx0e2NvbnRlbnR9XHJcblx0XHRcdFx0XHQ8L0dyb3VwPlxyXG5cdFx0XHRcdFx0KVxyXG4gICAgICAgICAgICBjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKHBpZWNlKVxyXG5cdFx0XHRjdXJyZW50TGluZS5oZWlnaHQ9TWF0aC5tYXgoY3VycmVudExpbmUuaGVpZ2h0LGNvbnRlbnRIZWlnaHQpXHJcblx0XHRcdGN1cnJlbnRMaW5lLmRlc2NlbnQ9TWF0aC5tYXgoY3VycmVudExpbmUuZGVzY2VudCwgY29udGVudERlc2NlbnQpXHJcblx0XHRcdGlmKGF2YWlsYWJsZVdpZHRoPT1jb250ZW50V2lkdGgpe1xyXG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXHJcblx0XHRcdH1cclxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPGNvbnRlbnRXaWR0aCl7XHJcblx0XHRcdGNvbnN0IGFsbFdoaXRlc3BhY2U9KHtwcm9wczp7Y2hpbGRyZW46e3Byb3BzOntjaGlsZHJlbjp0ZXh0fX19fSk9PntcclxuXHRcdFx0XHRyZXR1cm4gdGV4dCAmJiB0eXBlb2YodGV4dCk9PSdzdHJpbmcnICYmIHRlc3RBbGwodGV4dCxpc1doaXRlc3BhY2UpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGFsbFdoaXRlc3BhY2UoY29udGVudCkpe1xyXG5cdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoUmVhY3QuY2xvbmVFbGVtZW50KGNvbnRlbnQse3dpZHRoOjB9KSlcclxuXHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHBvcGVkPVtdXHJcblx0XHRcdGNvbnN0IGhhc09ubHlPbmVXb3JkPSh7cHJvcHM6e2NoaWxkcmVuOntwcm9wczp7Y2hpbGRyZW46dGV4dH19fX0pPT57XHJcblx0XHRcdFx0cmV0dXJuIHRleHQgJiYgdHlwZW9mKHRleHQpPT0nc3RyaW5nJyAmJiBbLi4udGV4dF0ucmVkdWNlKChzdGF0ZSxhKT0+c3RhdGUgJiYgaXNDaGFyKGEpLHRydWUpXHJcblx0XHRcdH1cclxuXHRcdFx0aWYoaGFzT25seU9uZVdvcmQoY29udGVudCkpe1xyXG5cdFx0XHRcdHBvcGVkPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZVJpZ2h0KChzdGF0ZSxhKT0+e1xyXG5cdFx0XHRcdFx0aWYoIXN0YXRlLmVuZCl7XHJcblx0XHRcdFx0XHRcdGxldCB7Y2hpbGRyZW46dGV4dH09YS5wcm9wc1xyXG5cdFx0XHRcdFx0XHRpZihoYXNPbmx5T25lV29yZCh0ZXh0KSl7XHJcblx0XHRcdFx0XHRcdFx0c3RhdGUucG9wZWQudW5zaGlmdCh0ZXh0KVxyXG5cdFx0XHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLmVuZD10cnVlXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0XHR9LHtlbmQ6ZmFsc2UscG9wZWQ6W119KS5wb3BlZFxyXG5cdFx0XHRcdGlmKHBvcGVkLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRpZihwb3BlZC5sZW5ndGg8Y3VycmVudExpbmUuY2hpbGRyZW4ubGVuZ3RoKXtcclxuXHRcdFx0XHRcdFx0Y3VycmVudExpbmUuY2hpbGRyZW4uc3BsaWNlKC1wb3BlZC5sZW5ndGgscG9wZWQubGVuZ3RoKVxyXG5cdFx0XHRcdFx0XHRPYmplY3QuYXNzaWduKGN1cnJlbnRMaW5lLCBjdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLHtwcm9wczp7aGVpZ2h0LGRlc2NlbnR9fSk9PntcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS5oZWlnaHQ9TWF0aC5tYXgoc3RhdGUuaGVpZ2h0LGhlaWdodClcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS5kZXNjZW50PU1hdGgubWF4KHN0YXRlLmRlc2NlbnQsZGVzY2VudClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0XHRcdFx0fSx7aGVpZ2h0OjAsZGVzY2VudDowfSkpXHJcblx0XHRcdFx0XHR9ZWxzZSBpZihwb3BlZC5sZW5ndGg9PWN1cnJlbnRMaW5lLmNoaWxkcmVuLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdGlmKHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0Pj1jdXJyZW50TGluZS5oZWlnaHQpe1xyXG5cdFx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXHJcblx0XHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXHJcblx0XHRcdFx0YXZhaWxhYmxlV2lkdGg9dGhpcy5hdmFpbGFibGVTcGFjZS53aWR0aFxyXG5cclxuXHRcdFx0XHRpZihwb3BlZC5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0cG9wZWQuZm9yRWFjaChhPT50aGlzLmFwcGVuZENvbXBvc2VkKGEpKVxyXG5cdFx0XHRcdFx0Y3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcblx0XHRcdCAgICAgICAgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihjb250ZW50V2lkdGg8PWF2YWlsYWJsZVdpZHRoKVxyXG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRDb21wb3NlZChjb250ZW50KVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1lbHNle1xyXG5cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXsvL25lZWQgYXBwZW5kIGxhc3Qgbm9uLWZ1bGwtd2lkdGggbGluZSB0byBwYXJlbnRcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblxyXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG5cdFx0bGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxyXG5cdFx0aWYoYXZhaWxhYmxlV2lkdGg+MCl7XHJcblx0XHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXHJcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aD09MCl7XHJcblx0XHRcdC8vYWxyZWFkeSBhcHBlbmRlZCB0byBwYXJlbnQgaW4gYXBwZW5kQ29tcG9zZWRcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aDowLCBoZWlnaHQ6MH1cclxuXHJcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG5cdH1cclxuXHJcbiAgICBjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG4gICAgICAgIGxldCB7aGVpZ2h0LCB3aWR0aH09cHJvcHNcclxuICAgICAgICBsZXQge3NwYWNpbmc6e2xpbmVIZWlnaHQ9XCIxMDAlXCIsdG9wPTAsIGJvdHRvbT0wfSwgaW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQgY29udGVudFk9MCwgY29udGVudFg9bGVmdFxyXG5cclxuICAgICAgIGxpbmVIZWlnaHQ9dHlwZW9mKGxpbmVIZWlnaHQpPT0nc3RyaW5nJyA/IE1hdGguY2VpbChoZWlnaHQqcGFyc2VJbnQobGluZUhlaWdodCkvMTAwLjApOiBsaW5lSGVpZ2h0XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0xKXsvL2ZpcnN0IGxpbmVcclxuICAgICAgICAgICAgbGluZUhlaWdodCs9dG9wXHJcbiAgICAgICAgICAgIGNvbnRlbnRZKz10b3BcclxuXHRcdFx0Y29udGVudFgrPWZpcnN0TGluZVxyXG4gICAgICAgIH1lbHNle1xyXG5cdFx0XHRjb250ZW50WCs9aGFuZ2luZ1xyXG5cdFx0fVxyXG5cclxuICAgICAgICBpZih0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKXsvL2xhc3QgbGluZVxyXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz1ib3R0b21cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodC09bGluZUhlaWdodFxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R3JvdXAgaGVpZ2h0PXtsaW5lSGVpZ2h0fSB3aWR0aD17d2lkdGh9PlxyXG4gICAgICAgICAgICAgICAgPEdyb3VwIHg9e2NvbnRlbnRYfSB5PXtjb250ZW50WX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmUgey4uLnByb3BzfS8+XHJcbiAgICAgICAgICAgICAgICA8L0dyb3VwPlxyXG4gICAgICAgICAgICA8L0dyb3VwPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBnZXRTdHlsZSgpe1xyXG4gICAgICAgIGlmKHRoaXMuX3N0eWxlKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGVcclxuICAgICAgICBsZXQgc3BhY2luZz10aGlzLnN0eWxlKCdwUHIuc3BhY2luZycpfHx7fVxyXG4gICAgICAgIGxldCBpbmRlbnQ9dGhpcy5zdHlsZSgncFByLmluZCcpfHx7fVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZT17c3BhY2luZyxpbmRlbnR9XHJcbiAgICB9XHJcblxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0Li4uU3VwZXIuY29udGV4dFR5cGVzXHJcblx0XHQsZ2V0RGVmYXVsdFN0eWxlOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xyXG5cdFx0Li4uU3VwZXIuY2hpbGRDb250ZXh0VHlwZXNcclxuXHRcdCxjdXJyZW50TGluZUhhc09ubHlPbmVXb3JkOiBQcm9wVHlwZXMuZnVuY1xyXG5cdH1cclxuXHRcclxuXHRnZXRDaGlsZENvbnRleHQoKXtcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0Li4uc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KClcclxuXHRcdFx0LGN1cnJlbnRMaW5lSGFzT25seU9uZVdvcmQoKXtcclxuXHRcdFx0XHRjb25zdCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuXHRcdFx0XHRjb25zdCBoYXNPbmx5T25lV29yZD0oe3Byb3BzOntjaGlsZHJlbjp7cHJvcHM6e2NoaWxkcmVuOnRleHR9fX19KT0+e1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRleHQgJiYgdHlwZW9mKHRleHQpPT0nc3RyaW5nJyAmJiBpc1dvcmQodGV4dClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGN1cnJlbnRMaW5lICYmIGN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUse3Byb3BzOntjaGlsZHJlbjp0ZXh0fX0pPT5zdGF0ZSAmJiBoYXNPbmx5T25lV29yZCh0ZXh0KSx0cnVlKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==