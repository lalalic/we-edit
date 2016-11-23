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

						return text && typeof text == 'string' && [].concat((0, _toConsumableArray3.default)(text)).reduce(function (state, a) {
							return state && (0, _wordwrap.isChar)(a);
						}, true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlBhcmFncmFwaCIsIndpZHRoIiwibGluZVdpZHRoIiwiaGVpZ2h0IiwiZGVzY2VudCIsImNoaWxkcmVuIiwiZ2V0U3R5bGUiLCJpbmRlbnQiLCJsZWZ0IiwicmlnaHQiLCJmaXJzdExpbmUiLCJoYW5naW5nIiwiYXZhaWxhYmxlU3BhY2UiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJtaW5SZXF1aXJlZEgiLCJjb250ZXh0IiwicGFyZW50IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwicHVzaCIsIl9uZXdMaW5lIiwiY3VycmVudExpbmUiLCJhdmFpbGFibGVXaWR0aCIsInJlZHVjZSIsInByZXYiLCJhIiwicHJvcHMiLCJjb250ZW50IiwiY29udGVudFdpZHRoIiwiY29udGVudEhlaWdodCIsImNvbnRlbnREZXNjZW50IiwicGllY2UiLCJhcHBlbmRDb21wb3NlZCIsIk1hdGgiLCJtYXgiLCJjcmVhdGVDb21wb3NlZDJQYXJlbnQiLCJhbGxXaGl0ZXNwYWNlIiwidGV4dCIsInN0YXRlIiwiY2xvbmVFbGVtZW50IiwicG9wZWQiLCJoYXNPbmx5T25lV29yZCIsInJlZHVjZVJpZ2h0IiwiZW5kIiwidW5zaGlmdCIsInNwbGljZSIsImZvckVhY2giLCJzcGFjaW5nIiwibGluZUhlaWdodCIsInRvcCIsImJvdHRvbSIsImNvbnRlbnRZIiwiY29udGVudFgiLCJjZWlsIiwicGFyc2VJbnQiLCJpc0FsbENoaWxkcmVuQ29tcG9zZWQiLCJfc3R5bGUiLCJzdHlsZSIsImN1cnJlbnRMaW5lSGFzT25seU9uZVdvcmQiLCJkaXNwbGF5TmFtZSIsImNvbnRleHRUeXBlcyIsImdldERlZmF1bHRTdHlsZSIsImZ1bmMiLCJjaGlsZENvbnRleHRUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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LEtBQTJCLENBQXBCeEIsUUFBb0I7O0FBQ2xFLGFBQU9tQyxRQUFRLE9BQU9BLElBQVAsSUFBYyxRQUF0QixJQUFrQywyQ0FBSUEsSUFBSixHQUFVZCxNQUFWLENBQWlCLFVBQUNlLEtBQUQsRUFBT2IsQ0FBUDtBQUFBLGNBQVdhLFNBQVMsc0JBQU9iLENBQVAsQ0FBcEI7QUFBQSxPQUFqQixFQUErQyxJQUEvQyxDQUF6QztBQUNBLE1BRkQ7QUFHQSxZQUFPSixlQUFlQSxZQUFZbkIsUUFBWixDQUFxQnFCLE1BQXJCLENBQTRCLFVBQUNlLEtBQUQ7QUFBQSxVQUF3QkQsSUFBeEIsU0FBUVgsS0FBUixDQUFleEIsUUFBZjtBQUFBLGFBQWlDb0MsU0FBU0csZUFBZUosSUFBZixDQUExQztBQUFBLE1BQTVCLEVBQTJGLElBQTNGLENBQXRCO0FBQ0E7QUFSRjtBQVVBOzs7RUFyTnFDekMsSzs7QUFBbEJDLFMsQ0FDYjhELFcsR0FBWSxXO0FBREM5RCxTLENBK0xiK0QsWSw4QkFDSGhFLE1BQU1nRSxZLElBQ1JDLGlCQUFpQixpQkFBVUM7O0FBak1UakUsUyxDQW9NYmtFLGlCLDhCQUNIbkUsTUFBTW1FLGlCLElBQ1JMLDJCQUEyQixpQkFBVUk7O2tCQXRNbkJqRSxTIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgQW55LCB7c3R5bGVJbmhlcml0YWJsZX0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBMaW5lIGZyb20gXCIuLi9jb21wb3NlZC9saW5lXCJcclxuXHJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXHJcblxyXG5pbXBvcnQge2lzQ2hhciwgaXNXaGl0ZXNwYWNlfSBmcm9tIFwiLi4vd29yZHdyYXBcIlxyXG5cclxubGV0IFN1cGVyPXN0eWxlSW5oZXJpdGFibGUoQW55KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBTdXBlcntcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJwYXJhZ3JhcGhcIlxyXG5cclxuXHRfbmV3TGluZSgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmxpbmVXaWR0aCgpLFxyXG5cdFx0XHRoZWlnaHQ6MCxcclxuXHRcdFx0ZGVzY2VudDowLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxyXG4gICAgICAgIH1cclxuXHR9XHJcblxyXG5cdGxpbmVXaWR0aCgpe1xyXG5cdFx0Y29uc3Qge2luZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXHJcbiAgICAgICAgbGV0IHt3aWR0aH09dGhpcy5hdmFpbGFibGVTcGFjZVxyXG4gICAgICAgIHdpZHRoLT0obGVmdCtyaWdodClcclxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MClcclxuICAgICAgICAgICAgd2lkdGgtPWZpcnN0TGluZVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgd2lkdGgtPWhhbmdpbmdcclxuXHRcdHJldHVybiB3aWR0aFxyXG5cdH1cclxuXHJcbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pey8vQFRPRE86IG5lZWQgY29uc2lkZXIgYXZhaWxhYmxlU3BhY2UuaGVpZ2h0XHJcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGlmKDA9PWNvbXBvc2VkLmxlbmd0aCl7XHJcblx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSgpXHJcblx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoLGhlaWdodH1cclxuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXHJcblx0XHR9XHJcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG5cclxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxyXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCx3aWR0aClcclxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aDw9bWluUmVxdWlyZWRXKXtcclxuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ8bWluUmVxdWlyZWRIKVxyXG5cdFx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXHJcblxyXG5cdFx0XHRhdmFpbGFibGVXaWR0aD10aGlzLmxpbmVXaWR0aCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7d2lkdGg6YXZhaWxhYmxlV2lkdGgsIGhlaWdodDp0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodCwgbGluZVdpZHRoOnRoaXMuYXZhaWxhYmxlU3BhY2Uud2lkdGh9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kQ29tcG9zZWQoY29udGVudCl7Ly9AVE9ETzogbmVlZCBjb25zaWRlciBhdmFpbGFibGVTcGFjZS5oZWlnaHRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHJcblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxyXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRoLCBoZWlnaHQ6Y29udGVudEhlaWdodCwgZGVzY2VudDpjb250ZW50RGVzY2VudD0wfT1jb250ZW50LnByb3BzXHJcblxyXG5cclxuXHRcdGxldCBwaWVjZT1udWxsXHJcblx0XHRpZihhdmFpbGFibGVXaWR0aD09MCl7XHJcblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxyXG5cdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXHJcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXsvL25vdCBhcHBlbmRlZCB0byBwYXJlbnRcclxuICAgICAgICAgICAgcGllY2U9KFxyXG5cdFx0XHRcdFx0PEdyb3VwXHJcblx0XHRcdFx0XHRcdHg9e2N1cnJlbnRMaW5lLndpZHRoLWF2YWlsYWJsZVdpZHRofVxyXG5cdFx0XHRcdFx0XHRpbmRleD17dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGh9XHJcblx0XHRcdFx0XHRcdGRlc2NlbnQ9e2NvbnRlbnREZXNjZW50fVxyXG5cdFx0XHRcdFx0XHR3aWR0aD17Y29udGVudFdpZHRofVxyXG5cdFx0XHRcdFx0XHRoZWlnaHQ9e2NvbnRlbnRIZWlnaHR9PlxyXG5cdFx0XHRcdFx0XHR7Y29udGVudH1cclxuXHRcdFx0XHRcdDwvR3JvdXA+XHJcblx0XHRcdFx0XHQpXHJcbiAgICAgICAgICAgIGN1cnJlbnRMaW5lLmNoaWxkcmVuLnB1c2gocGllY2UpXHJcblx0XHRcdGN1cnJlbnRMaW5lLmhlaWdodD1NYXRoLm1heChjdXJyZW50TGluZS5oZWlnaHQsY29udGVudEhlaWdodClcclxuXHRcdFx0Y3VycmVudExpbmUuZGVzY2VudD1NYXRoLm1heChjdXJyZW50TGluZS5kZXNjZW50LCBjb250ZW50RGVzY2VudClcclxuXHRcdFx0aWYoYXZhaWxhYmxlV2lkdGg9PWNvbnRlbnRXaWR0aCl7XHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGN1cnJlbnRMaW5lKSlcclxuXHRcdFx0fVxyXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg8Y29udGVudFdpZHRoKXtcclxuXHRcdFx0Y29uc3QgYWxsV2hpdGVzcGFjZT0oe3Byb3BzOntjaGlsZHJlbjp7cHJvcHM6e2NoaWxkcmVuOnRleHR9fX19KT0+e1xyXG5cdFx0XHRcdHJldHVybiB0ZXh0ICYmIHR5cGVvZih0ZXh0KT09J3N0cmluZycgJiYgWy4uLnRleHRdLnJlZHVjZSgoc3RhdGUsYSk9PnN0YXRlICYmIGlzV2hpdGVzcGFjZShhKSx0cnVlKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihhbGxXaGl0ZXNwYWNlKGNvbnRlbnQpKXtcclxuXHRcdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKFJlYWN0LmNsb25lRWxlbWVudChjb250ZW50LHt3aWR0aDowfSkpXHJcblx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBwb3BlZD1bXVxyXG5cdFx0XHRjb25zdCBoYXNPbmx5T25lV29yZD0oe3Byb3BzOntjaGlsZHJlbjp7cHJvcHM6e2NoaWxkcmVuOnRleHR9fX19KT0+e1xyXG5cdFx0XHRcdHJldHVybiB0ZXh0ICYmIHR5cGVvZih0ZXh0KT09J3N0cmluZycgJiYgWy4uLnRleHRdLnJlZHVjZSgoc3RhdGUsYSk9PnN0YXRlICYmIGlzQ2hhcihhKSx0cnVlKVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmKGhhc09ubHlPbmVXb3JkKGNvbnRlbnQpKXtcclxuXHRcdFx0XHRwb3BlZD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2VSaWdodCgoc3RhdGUsYSk9PntcclxuXHRcdFx0XHRcdGlmKCFzdGF0ZS5lbmQpe1xyXG5cdFx0XHRcdFx0XHRsZXQge2NoaWxkcmVuOnRleHR9PWEucHJvcHNcclxuXHRcdFx0XHRcdFx0aWYoaGFzT25seU9uZVdvcmQodGV4dCkpe1xyXG5cdFx0XHRcdFx0XHRcdHN0YXRlLnBvcGVkLnVuc2hpZnQodGV4dClcclxuXHRcdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0XHRzdGF0ZS5lbmQ9dHJ1ZVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdFx0fSx7ZW5kOmZhbHNlLHBvcGVkOltdfSkucG9wZWRcclxuXHRcdFx0XHRpZihwb3BlZC5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0aWYocG9wZWQubGVuZ3RoPGN1cnJlbnRMaW5lLmNoaWxkcmVuLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRcdGN1cnJlbnRMaW5lLmNoaWxkcmVuLnNwbGljZSgtcG9wZWQubGVuZ3RoLHBvcGVkLmxlbmd0aClcclxuXHRcdFx0XHRcdFx0T2JqZWN0LmFzc2lnbihjdXJyZW50TGluZSwgY3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSx7cHJvcHM6e2hlaWdodCxkZXNjZW50fX0pPT57XHJcblx0XHRcdFx0XHRcdFx0c3RhdGUuaGVpZ2h0PU1hdGgubWF4KHN0YXRlLmhlaWdodCxoZWlnaHQpXHJcblx0XHRcdFx0XHRcdFx0c3RhdGUuZGVzY2VudD1NYXRoLm1heChzdGF0ZS5kZXNjZW50LGRlc2NlbnQpXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdFx0XHRcdH0se2hlaWdodDowLGRlc2NlbnQ6MH0pKVxyXG5cdFx0XHRcdFx0fWVsc2UgaWYocG9wZWQubGVuZ3RoPT1jdXJyZW50TGluZS5jaGlsZHJlbi5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodD49Y3VycmVudExpbmUuaGVpZ2h0KXtcclxuXHRcdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoY3VycmVudExpbmUpKVxyXG5cdFx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxyXG5cdFx0XHRcdGF2YWlsYWJsZVdpZHRoPXRoaXMuYXZhaWxhYmxlU3BhY2Uud2lkdGhcclxuXHJcblx0XHRcdFx0aWYocG9wZWQubGVuZ3RoKXtcclxuXHRcdFx0XHRcdHBvcGVkLmZvckVhY2goYT0+dGhpcy5hcHBlbmRDb21wb3NlZChhKSlcclxuXHRcdFx0XHRcdGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG5cdFx0XHQgICAgICAgIGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoY29udGVudFdpZHRoPD1hdmFpbGFibGVXaWR0aClcclxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ZWxzZXtcclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgIH1cclxuXHJcblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7Ly9uZWVkIGFwcGVuZCBsYXN0IG5vbi1mdWxsLXdpZHRoIGxpbmUgdG8gcGFyZW50XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuXHRcdGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcclxuXHRcdGlmKGF2YWlsYWJsZVdpZHRoPjApe1xyXG5cdFx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoY3VycmVudExpbmUpKVxyXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg9PTApe1xyXG5cdFx0XHQvL2FscmVhZHkgYXBwZW5kZWQgdG8gcGFyZW50IGluIGFwcGVuZENvbXBvc2VkXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZT17d2lkdGg6MCwgaGVpZ2h0OjB9XHJcblxyXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuXHR9XHJcblxyXG4gICAgY3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuICAgICAgICBsZXQge2hlaWdodCwgd2lkdGh9PXByb3BzXHJcbiAgICAgICAgbGV0IHtzcGFjaW5nOntsaW5lSGVpZ2h0PVwiMTAwJVwiLHRvcD0wLCBib3R0b209MH0sIGluZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXHJcbiAgICAgICAgbGV0IGNvbnRlbnRZPTAsIGNvbnRlbnRYPWxlZnRcclxuXHJcbiAgICAgICAgbGluZUhlaWdodD10eXBlb2YobGluZUhlaWdodCk9PSdzdHJpbmcnID8gTWF0aC5jZWlsKGhlaWdodCpwYXJzZUludChsaW5lSGVpZ2h0KS8xMDAuMCk6IGxpbmVIZWlnaHRcclxuXHJcbiAgICAgICAgaWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTEpey8vZmlyc3QgbGluZVxyXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz10b3BcclxuICAgICAgICAgICAgY29udGVudFkrPXRvcFxyXG5cdFx0XHRjb250ZW50WCs9Zmlyc3RMaW5lXHJcbiAgICAgICAgfWVsc2V7XHJcblx0XHRcdGNvbnRlbnRYKz1oYW5naW5nXHJcblx0XHR9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuaXNBbGxDaGlsZHJlbkNvbXBvc2VkKCkpey8vbGFzdCBsaW5lXHJcbiAgICAgICAgICAgIGxpbmVIZWlnaHQrPWJvdHRvbVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0LT1saW5lSGVpZ2h0XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxHcm91cCBoZWlnaHQ9e2xpbmVIZWlnaHR9IHdpZHRoPXt3aWR0aH0+XHJcbiAgICAgICAgICAgICAgICA8R3JvdXAgeD17Y29udGVudFh9IHk9e2NvbnRlbnRZfT5cclxuICAgICAgICAgICAgICAgICAgICA8TGluZSB7Li4ucHJvcHN9Lz5cclxuICAgICAgICAgICAgICAgIDwvR3JvdXA+XHJcbiAgICAgICAgICAgIDwvR3JvdXA+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0eWxlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fc3R5bGUpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHlsZVxyXG4gICAgICAgIGxldCBzcGFjaW5nPXRoaXMuc3R5bGUoJ3BQci5zcGFjaW5nJyl8fHt9XHJcbiAgICAgICAgbGV0IGluZGVudD10aGlzLnN0eWxlKCdwUHIuaW5kJyl8fHt9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlPXtzcGFjaW5nLGluZGVudH1cclxuICAgIH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHQuLi5TdXBlci5jb250ZXh0VHlwZXNcclxuXHRcdCxnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XHJcblx0XHQuLi5TdXBlci5jaGlsZENvbnRleHRUeXBlc1xyXG5cdFx0LGN1cnJlbnRMaW5lSGFzT25seU9uZVdvcmQ6IFByb3BUeXBlcy5mdW5jXHJcblx0fVxyXG5cdFxyXG5cdGdldENoaWxkQ29udGV4dCgpe1xyXG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQuLi5zdXBlci5nZXRDaGlsZENvbnRleHQoKVxyXG5cdFx0XHQsY3VycmVudExpbmVIYXNPbmx5T25lV29yZCgpe1xyXG5cdFx0XHRcdGNvbnN0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG5cdFx0XHRcdGNvbnN0IGhhc09ubHlPbmVXb3JkPSh7cHJvcHM6e2NoaWxkcmVuOntwcm9wczp7Y2hpbGRyZW46dGV4dH19fX0pPT57XHJcblx0XHRcdFx0XHRyZXR1cm4gdGV4dCAmJiB0eXBlb2YodGV4dCk9PSdzdHJpbmcnICYmIFsuLi50ZXh0XS5yZWR1Y2UoKHN0YXRlLGEpPT5zdGF0ZSAmJiBpc0NoYXIoYSksdHJ1ZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGN1cnJlbnRMaW5lICYmIGN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUse3Byb3BzOntjaGlsZHJlbjp0ZXh0fX0pPT5zdGF0ZSAmJiBoYXNPbmx5T25lV29yZCh0ZXh0KSx0cnVlKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==