"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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
			return new LineInfo(this.lineWidth(), this);
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
			return {
				width: availableWidth,
				height: this.availableSpace.height,
				bFirstLine: composed.length < 2,
				bLineStart: availableWidth == this.availableSpace.width,
				line: currentLine
			};
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


			if (availableWidth <= 0) {
				composed.push(this._newLine());
				this.appendComposed(content);
			} else if (availableWidth >= contentWidth) {
				//not appended to parent
				currentLine.children.push(_react2.default.createElement(
					_group2.default,
					{
						x: currentLine.width - availableWidth,
						index: this.computed.children.length,
						descent: contentDescent,
						width: contentWidth,
						height: contentHeight },
					content
				));
				currentLine.height = Math.max(currentLine.height, contentHeight);
				currentLine.descent = Math.max(currentLine.descent, contentDescent);
			} else if (availableWidth < contentWidth) {
				if (this.availableSpace.height >= currentLine.height) {
					parent.appendComposed(this.createComposed2Parent(currentLine));
					composed.push(this._newLine());
					availableWidth = this.availableSpace.width;

					if (contentWidth <= availableWidth) this.appendComposed(content);else {
						return false;
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
			console.log("append new line to section");
			var height = props.height,
			    width = props.width,
			    paragraph = props.paragraph,
			    others = (0, _objectWithoutProperties3.default)(props, ["height", "width", "paragraph"]);

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
					_react2.default.createElement(_line2.default, (0, _extends3.default)({ width: width, height: height }, others))
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
Paragraph.contextTypes = (0, _extends3.default)({}, Super.contextTypes, { getDefaultStyle: _react.PropTypes.func
});
exports.default = Paragraph;

var LineInfo = function () {
	function LineInfo(width, p) {
		(0, _classCallCheck3.default)(this, LineInfo);

		this.paragraph = p;
		this.width = width;
		this.height = 0;
		this.descent = 0;
		this.children = [];
	}

	(0, _createClass3.default)(LineInfo, [{
		key: "rollback",
		value: function rollback(_ref) {
			var _this2 = this;

			var type = _ref.type;

			var removed = [];
			for (var i = this.children.length - 1; i > -1; i--) {
				var group = this.children[i];
				var text = group.props.children;
				var _text$props = text.props,
				    width = _text$props.width,
				    pieces = _text$props.children;


				var j = pieces.length - 1;
				for (; j > -1; j--) {
					var chars = pieces[j];
					if (chars.type != type) {
						break;
					}
				}

				if (j == -1) {
					removed.unshift(this.children.pop().props.children);
					continue;
				} else if (j == pieces.length - 1) {
					break;
				} else {
					var _removed = pieces.splice(j);
					text = _react2.default.cloneElement(text, { children: pieces, width: pieces.reduce(function (w, _ref2) {
							var width = _ref2.width;
							return w + width;
						}, 0) });
					this.children[i] = _react2.default.cloneElement(group, { children: text, width: text.props.width });

					var _width2 = _removed.reduce(function (w, _ref3) {
						var width = _ref3.width;
						return w + width;
					}, 0);
					_removed.unshift(_react2.default.cloneElement(text, { children: _removed, width: _width2 }));
					break;
				}
			}

			this.commit();

			removed.map(function (a) {
				return _this2.paragraph.appendComposed(a);
			});
		}
	}, {
		key: "commit",
		value: function commit() {
			this.paragraph.context.parent.appendComposed(this.paragraph.createComposed2Parent(this));
			this.paragraph.computed.composed.push(this.paragraph._newLine());
		}
	}, {
		key: "canSeperateWith",
		value: function canSeperateWith(_ref4) {
			var type = _ref4.type;

			if (this.children.length == 0) return true;

			var group = this.children[this.children.length - 1];
			var text = group.props.children;
			var pieces = text.props.children;
			var lastPiece = pieces[pieces.length - 1];
			return type.canSeperateWith(lastPiece.type);
		}
	}, {
		key: "allCantSeperateWith",
		value: function allCantSeperateWith(_ref5) {
			var type = _ref5.type;

			return this.children.reduce(function (cantSeperate, _ref6) {
				var text = _ref6.props.children;

				if (!cantSeperate) return false;

				return text.props.children.reduce(function (state, a) {
					if (!state) return false;
					return !type.canSeperateWith(a.type);
				}, true);
			}, true);
		}
	}]);
	return LineInfo;
}();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlBhcmFncmFwaCIsImdldENvbnRlbnQiLCJMaW5lSW5mbyIsImxpbmVXaWR0aCIsImdldFN0eWxlIiwiaW5kZW50IiwibGVmdCIsInJpZ2h0IiwiZmlyc3RMaW5lIiwiaGFuZ2luZyIsIndpZHRoIiwiYXZhaWxhYmxlU3BhY2UiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJoZWlnaHQiLCJtaW5SZXF1aXJlZEgiLCJjb250ZXh0IiwicGFyZW50IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwicHVzaCIsIl9uZXdMaW5lIiwiY3VycmVudExpbmUiLCJhdmFpbGFibGVXaWR0aCIsImNoaWxkcmVuIiwicmVkdWNlIiwicHJldiIsImEiLCJwcm9wcyIsImJGaXJzdExpbmUiLCJiTGluZVN0YXJ0IiwibGluZSIsImNvbnRlbnQiLCJjb250ZW50V2lkdGgiLCJjb250ZW50SGVpZ2h0IiwiZGVzY2VudCIsImNvbnRlbnREZXNjZW50IiwiYXBwZW5kQ29tcG9zZWQiLCJNYXRoIiwibWF4IiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwiY29uc29sZSIsImxvZyIsInBhcmFncmFwaCIsIm90aGVycyIsInNwYWNpbmciLCJsaW5lSGVpZ2h0IiwidG9wIiwiYm90dG9tIiwiY29udGVudFkiLCJjb250ZW50WCIsImNlaWwiLCJwYXJzZUludCIsImlzQWxsQ2hpbGRyZW5Db21wb3NlZCIsIl9zdHlsZSIsInN0eWxlIiwiZGlzcGxheU5hbWUiLCJjb250ZXh0VHlwZXMiLCJnZXREZWZhdWx0U3R5bGUiLCJmdW5jIiwicCIsInR5cGUiLCJyZW1vdmVkIiwiaSIsImdyb3VwIiwidGV4dCIsInBpZWNlcyIsImoiLCJjaGFycyIsInVuc2hpZnQiLCJwb3AiLCJzcGxpY2UiLCJjbG9uZUVsZW1lbnQiLCJ3IiwiY29tbWl0IiwibWFwIiwi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QjtBQUNBLE9BQUkwQyxTQUFPRCxLQUFLckMsS0FBTCxDQUFXSixRQUF0QjtBQUNBLE9BQUlvRCxZQUFVVixPQUFPQSxPQUFPdEQsTUFBUCxHQUFjLENBQXJCLENBQWQ7QUFDQSxVQUFPaUQsS0FBS2dCLGVBQUwsQ0FBcUJELFVBQVVmLElBQS9CLENBQVA7QUFDQTs7OzZDQUUwQjtBQUFBLE9BQU5BLElBQU0sU0FBTkEsSUFBTTs7QUFDMUIsVUFBTyxLQUFLckMsUUFBTCxDQUFjQyxNQUFkLENBQXFCLFVBQUNxRCxZQUFELFNBQXdDO0FBQUEsUUFBVGIsSUFBUyxTQUF6QnJDLEtBQXlCLENBQWxCSixRQUFrQjs7QUFDbkUsUUFBRyxDQUFDc0QsWUFBSixFQUNDLE9BQU8sS0FBUDs7QUFFRCxXQUFPYixLQUFLckMsS0FBTCxDQUFXSixRQUFYLENBQW9CQyxNQUFwQixDQUEyQixVQUFDc0QsS0FBRCxFQUFPcEQsQ0FBUCxFQUFXO0FBQzVDLFNBQUcsQ0FBQ29ELEtBQUosRUFDQyxPQUFPLEtBQVA7QUFDRCxZQUFPLENBQUNsQixLQUFLZ0IsZUFBTCxDQUFxQmxELEVBQUVrQyxJQUF2QixDQUFSO0FBQ0EsS0FKTSxFQUlMLElBSkssQ0FBUDtBQU1BLElBVk0sRUFVTCxJQVZLLENBQVA7QUFXQSIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEFueSwge3N0eWxlSW5oZXJpdGFibGV9IGZyb20gXCIuL2FueVwiXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5pbXBvcnQgTGluZSBmcm9tIFwiLi4vY29tcG9zZWQvbGluZVwiXHJcblxyXG5pbXBvcnQgSW5saW5lIGZyb20gXCIuL2lubGluZVwiXHJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHRcIlxyXG5cclxuaW1wb3J0IHtpc0NoYXIsIGlzV2hpdGVzcGFjZSwgaXNXb3JkLCB0ZXN0QWxsfSBmcm9tIFwiLi4vd29yZHdyYXBcIlxyXG5cclxubGV0IFN1cGVyPXN0eWxlSW5oZXJpdGFibGUoQW55KVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBTdXBlcntcclxuXHRzdGF0aWMgZGlzcGxheU5hbWU9XCJwYXJhZ3JhcGhcIlxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiA8cD57dGhpcy5nZXRDb250ZW50KCl9PC9wPlx0XHJcblx0fVxyXG5cdFxyXG5cdF9uZXdMaW5lKCl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMaW5lSW5mbyh0aGlzLmxpbmVXaWR0aCgpLHRoaXMpXHJcblx0fVxyXG5cclxuXHRsaW5lV2lkdGgoKXtcclxuXHRcdGNvbnN0IHtpbmRlbnQ6e2xlZnQ9MCxyaWdodD0wLGZpcnN0TGluZT0wLGhhbmdpbmc9MH19PXRoaXMuZ2V0U3R5bGUoKVxyXG4gICAgICAgIGxldCB7d2lkdGh9PXRoaXMuYXZhaWxhYmxlU3BhY2VcclxuICAgICAgICB3aWR0aC09KGxlZnQrcmlnaHQpXHJcbiAgICAgICAgaWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTApXHJcbiAgICAgICAgICAgIHdpZHRoLT1maXJzdExpbmVcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHdpZHRoLT1oYW5naW5nXHJcblx0XHRyZXR1cm4gd2lkdGhcclxuXHR9XHJcblxyXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlLmhlaWdodFxyXG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXHJcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcblx0XHRpZigwPT1jb21wb3NlZC5sZW5ndGgpe1xyXG5cdFx0XHRsZXQge3dpZHRoLGhlaWdodH09dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoKVxyXG5cdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aCxoZWlnaHR9XHJcblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxyXG5cdFx0fVxyXG4gICAgICAgIGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuXHJcbiAgICAgICAgbGV0IHt3aWR0aH09Y3VycmVudExpbmVcclxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsd2lkdGgpXHJcbiAgICAgICAgaWYoYXZhaWxhYmxlV2lkdGg8PW1pblJlcXVpcmVkVyl7XHJcblx0XHRcdGlmKHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0PG1pblJlcXVpcmVkSClcclxuXHRcdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxyXG5cclxuXHRcdFx0YXZhaWxhYmxlV2lkdGg9dGhpcy5saW5lV2lkdGgoKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG5cdFx0XHR3aWR0aDphdmFpbGFibGVXaWR0aCwgXHJcblx0XHRcdGhlaWdodDp0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodCwgXHJcblx0XHRcdGJGaXJzdExpbmU6IGNvbXBvc2VkLmxlbmd0aDwyLFxyXG5cdFx0XHRiTGluZVN0YXJ0OiBhdmFpbGFibGVXaWR0aD09dGhpcy5hdmFpbGFibGVTcGFjZS53aWR0aCxcclxuXHRcdFx0bGluZTogY3VycmVudExpbmVcclxuXHRcdH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBlbmRDb21wb3NlZChjb250ZW50KXsvL0BUT0RPOiBuZWVkIGNvbnNpZGVyIGF2YWlsYWJsZVNwYWNlLmhlaWdodFxyXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG4gICAgICAgIGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cclxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuICAgICAgICBsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXHJcbiAgICAgICAgbGV0IHt3aWR0aDpjb250ZW50V2lkdGgsIGhlaWdodDpjb250ZW50SGVpZ2h0LCBkZXNjZW50OmNvbnRlbnREZXNjZW50PTB9PWNvbnRlbnQucHJvcHNcclxuXHRcdFxyXG5cdFx0aWYoYXZhaWxhYmxlV2lkdGg8PTApe1xyXG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcclxuXHRcdFx0dGhpcy5hcHBlbmRDb21wb3NlZChjb250ZW50KVxyXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg+PWNvbnRlbnRXaWR0aCl7Ly9ub3QgYXBwZW5kZWQgdG8gcGFyZW50XHJcbiAgICAgICAgICAgY3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChcclxuXHRcdFx0XHRcdDxHcm91cFxyXG5cdFx0XHRcdFx0XHR4PXtjdXJyZW50TGluZS53aWR0aC1hdmFpbGFibGVXaWR0aH1cclxuXHRcdFx0XHRcdFx0aW5kZXg9e3RoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RofVxyXG5cdFx0XHRcdFx0XHRkZXNjZW50PXtjb250ZW50RGVzY2VudH1cclxuXHRcdFx0XHRcdFx0d2lkdGg9e2NvbnRlbnRXaWR0aH1cclxuXHRcdFx0XHRcdFx0aGVpZ2h0PXtjb250ZW50SGVpZ2h0fT5cclxuXHRcdFx0XHRcdFx0e2NvbnRlbnR9XHJcblx0XHRcdFx0XHQ8L0dyb3VwPlxyXG5cdFx0XHRcdClcclxuXHRcdFx0Y3VycmVudExpbmUuaGVpZ2h0PU1hdGgubWF4KGN1cnJlbnRMaW5lLmhlaWdodCxjb250ZW50SGVpZ2h0KVxyXG5cdFx0XHRjdXJyZW50TGluZS5kZXNjZW50PU1hdGgubWF4KGN1cnJlbnRMaW5lLmRlc2NlbnQsIGNvbnRlbnREZXNjZW50KVxyXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg8Y29udGVudFdpZHRoKXtcclxuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ+PWN1cnJlbnRMaW5lLmhlaWdodCl7XHJcblx0XHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGN1cnJlbnRMaW5lKSlcclxuXHRcdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcclxuXHRcdFx0XHRhdmFpbGFibGVXaWR0aD10aGlzLmF2YWlsYWJsZVNwYWNlLndpZHRoXHJcblxyXG5cdFx0XHRcdGlmKGNvbnRlbnRXaWR0aDw9YXZhaWxhYmxlV2lkdGgpXHJcblx0XHRcdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXHJcblx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2V7XHJcblxyXG5cdFx0XHR9XHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpey8vbmVlZCBhcHBlbmQgbGFzdCBub24tZnVsbC13aWR0aCBsaW5lIHRvIHBhcmVudFxyXG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcblx0XHRjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHJcblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcblx0XHRsZXQgYXZhaWxhYmxlV2lkdGg9Y3VycmVudExpbmUuY2hpbGRyZW4ucmVkdWNlKChwcmV2LGEpPT5wcmV2LWEucHJvcHMud2lkdGgsY3VycmVudExpbmUud2lkdGgpXHJcblx0XHRpZihhdmFpbGFibGVXaWR0aD4wKXtcclxuXHRcdFx0cGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KGN1cnJlbnRMaW5lKSlcclxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPT0wKXtcclxuXHRcdFx0Ly9hbHJlYWR5IGFwcGVuZGVkIHRvIHBhcmVudCBpbiBhcHBlbmRDb21wb3NlZFxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoOjAsIGhlaWdodDowfVxyXG5cclxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcblx0fVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcblx0XHRjb25zb2xlLmxvZyhcImFwcGVuZCBuZXcgbGluZSB0byBzZWN0aW9uXCIpXHJcbiAgICAgICAgbGV0IHtoZWlnaHQsIHdpZHRoLCBwYXJhZ3JhcGgsIC4uLm90aGVyc309cHJvcHNcclxuICAgICAgICBsZXQge3NwYWNpbmc6e2xpbmVIZWlnaHQ9XCIxMDAlXCIsdG9wPTAsIGJvdHRvbT0wfSwgaW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQgY29udGVudFk9MCwgY29udGVudFg9bGVmdFxyXG5cclxuICAgICAgIGxpbmVIZWlnaHQ9dHlwZW9mKGxpbmVIZWlnaHQpPT0nc3RyaW5nJyA/IE1hdGguY2VpbChoZWlnaHQqcGFyc2VJbnQobGluZUhlaWdodCkvMTAwLjApOiBsaW5lSGVpZ2h0XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0xKXsvL2ZpcnN0IGxpbmVcclxuICAgICAgICAgICAgbGluZUhlaWdodCs9dG9wXHJcbiAgICAgICAgICAgIGNvbnRlbnRZKz10b3BcclxuXHRcdFx0Y29udGVudFgrPWZpcnN0TGluZVxyXG4gICAgICAgIH1lbHNle1xyXG5cdFx0XHRjb250ZW50WCs9aGFuZ2luZ1xyXG5cdFx0fVxyXG5cclxuICAgICAgICBpZih0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKXsvL2xhc3QgbGluZVxyXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz1ib3R0b21cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodC09bGluZUhlaWdodFxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R3JvdXAgaGVpZ2h0PXtsaW5lSGVpZ2h0fSB3aWR0aD17d2lkdGh9PlxyXG4gICAgICAgICAgICAgICAgPEdyb3VwIHg9e2NvbnRlbnRYfSB5PXtjb250ZW50WX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmUgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gey4uLm90aGVyc30vPlxyXG4gICAgICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R5bGUoKXtcclxuICAgICAgICBpZih0aGlzLl9zdHlsZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlXHJcbiAgICAgICAgbGV0IHNwYWNpbmc9dGhpcy5zdHlsZSgncFByLnNwYWNpbmcnKXx8e31cclxuICAgICAgICBsZXQgaW5kZW50PXRoaXMuc3R5bGUoJ3BQci5pbmQnKXx8e31cclxuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU9e3NwYWNpbmcsaW5kZW50fVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdC4uLlN1cGVyLmNvbnRleHRUeXBlc1xyXG5cdFx0LGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBMaW5lSW5mb3tcclxuXHRjb25zdHJ1Y3Rvcih3aWR0aCxwKXtcclxuXHRcdHRoaXMucGFyYWdyYXBoPXBcclxuXHRcdHRoaXMud2lkdGg9d2lkdGhcclxuXHRcdHRoaXMuaGVpZ2h0PTBcclxuXHRcdHRoaXMuZGVzY2VudD0wXHJcblx0XHR0aGlzLmNoaWxkcmVuPVtdXHJcblx0fVxyXG5cdFxyXG5cdHJvbGxiYWNrKHt0eXBlfSl7XHJcblx0XHRsZXQgcmVtb3ZlZD1bXVxyXG5cdFx0Zm9yKGxldCBpPXRoaXMuY2hpbGRyZW4ubGVuZ3RoLTE7aT4tMTtpLS0pe1xyXG5cdFx0XHRsZXQgZ3JvdXA9dGhpcy5jaGlsZHJlbltpXVxyXG5cdFx0XHRsZXQgdGV4dD1ncm91cC5wcm9wcy5jaGlsZHJlblxyXG5cdFx0XHRsZXQge3dpZHRoLGNoaWxkcmVuOnBpZWNlc309dGV4dC5wcm9wc1xyXG5cclxuXHRcdFx0bGV0IGo9cGllY2VzLmxlbmd0aC0xIFxyXG5cdFx0XHRmb3IoO2o+LTE7ai0tKXtcclxuXHRcdFx0XHRsZXQgY2hhcnM9cGllY2VzW2pdXHJcblx0XHRcdFx0aWYoY2hhcnMudHlwZSE9dHlwZSl7XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYoaj09LTEpe1xyXG5cdFx0XHRcdHJlbW92ZWQudW5zaGlmdCh0aGlzLmNoaWxkcmVuLnBvcCgpLnByb3BzLmNoaWxkcmVuKVxyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9ZWxzZSBpZihqPT1waWVjZXMubGVuZ3RoLTEpe1xyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdH1lbHNlIHtcclxuXHRcdFx0XHRsZXQgcmVtb3ZlZD1waWVjZXMuc3BsaWNlKGopXHJcblx0XHRcdFx0dGV4dD1SZWFjdC5jbG9uZUVsZW1lbnQodGV4dCx7Y2hpbGRyZW46cGllY2VzLCB3aWR0aDpwaWVjZXMucmVkdWNlKCh3LHt3aWR0aH0pPT53K3dpZHRoLDApfSlcclxuXHRcdFx0XHR0aGlzLmNoaWxkcmVuW2ldPVJlYWN0LmNsb25lRWxlbWVudChncm91cCx7Y2hpbGRyZW46dGV4dCx3aWR0aDp0ZXh0LnByb3BzLndpZHRofSlcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgd2lkdGg9cmVtb3ZlZC5yZWR1Y2UoKHcse3dpZHRofSk9Pncrd2lkdGgsMClcclxuXHRcdFx0XHRyZW1vdmVkLnVuc2hpZnQoUmVhY3QuY2xvbmVFbGVtZW50KHRleHQse2NoaWxkcmVuOnJlbW92ZWQsd2lkdGh9KSlcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jb21taXQoKVxyXG5cdFx0XHJcblx0XHRyZW1vdmVkLm1hcChhPT50aGlzLnBhcmFncmFwaC5hcHBlbmRDb21wb3NlZChhKSlcclxuXHR9XHJcblx0XHJcblx0Y29tbWl0KCl7XHJcblx0XHR0aGlzLnBhcmFncmFwaC5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLnBhcmFncmFwaC5jcmVhdGVDb21wb3NlZDJQYXJlbnQodGhpcykpXHJcblx0XHR0aGlzLnBhcmFncmFwaC5jb21wdXRlZC5jb21wb3NlZC5wdXNoKHRoaXMucGFyYWdyYXBoLl9uZXdMaW5lKCkpXHJcblx0fVxyXG5cdFxyXG5cdGNhblNlcGVyYXRlV2l0aCh7dHlwZX0pe1xyXG5cdFx0aWYodGhpcy5jaGlsZHJlbi5sZW5ndGg9PTApXHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHRcclxuXHRcdGxldCBncm91cD10aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoLTFdXHJcblx0XHRsZXQgdGV4dD1ncm91cC5wcm9wcy5jaGlsZHJlblxyXG5cdFx0bGV0IHBpZWNlcz10ZXh0LnByb3BzLmNoaWxkcmVuXHJcblx0XHRsZXQgbGFzdFBpZWNlPXBpZWNlc1twaWVjZXMubGVuZ3RoLTFdXHJcblx0XHRyZXR1cm4gdHlwZS5jYW5TZXBlcmF0ZVdpdGgobGFzdFBpZWNlLnR5cGUpXHJcblx0fVxyXG5cdFxyXG5cdGFsbENhbnRTZXBlcmF0ZVdpdGgoe3R5cGV9KXtcclxuXHRcdHJldHVybiB0aGlzLmNoaWxkcmVuLnJlZHVjZSgoY2FudFNlcGVyYXRlLHtwcm9wczp7Y2hpbGRyZW46dGV4dH19KT0+e1xyXG5cdFx0XHRpZighY2FudFNlcGVyYXRlKVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIHRleHQucHJvcHMuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxhKT0+e1xyXG5cdFx0XHRcdGlmKCFzdGF0ZSlcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0XHRcdHJldHVybiAhdHlwZS5jYW5TZXBlcmF0ZVdpdGgoYS50eXBlKVxyXG5cdFx0XHR9LHRydWUpXHJcblx0XHRcdFxyXG5cdFx0fSx0cnVlKVxyXG5cdH1cclxuXHRcclxufVxyXG4iXX0=