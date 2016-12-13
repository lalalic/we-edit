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

var _text = require("../composed/text");

var _text2 = _interopRequireDefault(_text);

var _inline = require("./inline");

var _inline2 = _interopRequireDefault(_inline);

var _text3 = require("./text");

var _text4 = _interopRequireDefault(_text3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paragraph = function (_Any) {
	(0, _inherits3.default)(Paragraph, _Any);

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
		key: "getContent",
		value: function getContent() {
			if (_react2.default.Children.count(this.props.children) == 0) {
				this.getContentCount = function (a) {
					return 1;
				};
				return _react2.default.createElement(
					_inline2.default,
					null,
					_react2.default.createElement(
						_text4.default,
						null,
						" "
					)
				);
			}
			return (0, _get3.default)(Paragraph.prototype.__proto__ || (0, _getPrototypeOf2.default)(Paragraph.prototype), "getContent", this).call(this);
		}
	}, {
		key: "isEmpty",
		value: function isEmpty() {
			return false;
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
			var _required$width = required.width,
			    minRequiredW = _required$width === undefined ? Number.MIN_VALUE : _required$width,
			    _required$height = required.height,
			    minRequiredH = _required$height === undefined ? Number.MIN_VALUE : _required$height,
			    _required$splitable = required.splitable,
			    splitable = _required$splitable === undefined ? true : _required$splitable;
			var composed = this.computed.composed;

			if (0 == composed.length) {
				var _context$parent$nextA = this.context.parent.nextAvailableSpace(required),
				    _width = _context$parent$nextA.width,
				    height = _context$parent$nextA.height;

				this.availableSpace = { width: _width, height: height };
				composed.push(this._newLine());
			}
			var currentLine = composed[composed.length - 1];

			var width = currentLine.width,
			    availableWidth = currentLine.availableWidth;

			if (availableWidth < minRequiredW || this.availableSpace.height < minRequiredH) {
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
			var availableWidth = currentLine.availableWidth;
			var contentWidth = content.props.width;


			if (availableWidth >= contentWidth) {
				currentLine.children.push(content);
			} else if (availableWidth < contentWidth) {
				if (content.type.ableExceed && content.type.ableExceed(content.props.children)) {
					currentLine.children.push(content);
				} else {
					this.commitCurrentLine(true);
					this.appendComposed(content);
				}
			}
		}
	}, {
		key: "commitCurrentLine",
		value: function commitCurrentLine() {
			var needNewLine = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			var composed = this.computed.composed;
			var parent = this.context.parent;

			var currentLine = composed[composed.length - 1];

			parent.appendComposed(this.createComposed2Parent(currentLine));

			if (needNewLine) composed.push(this._newLine());
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			//need append last non-full-width line to parent
			this.commitCurrentLine();

			this.availableSpace = { width: 0, height: 0 };

			(0, _get3.default)(Paragraph.prototype.__proto__ || (0, _getPrototypeOf2.default)(Paragraph.prototype), "onAllChildrenComposed", this).call(this);
		}
	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
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
			return (0, _get3.default)(Paragraph.prototype.__proto__ || (0, _getPrototypeOf2.default)(Paragraph.prototype), "getStyle", this).call(this) || {
				spacing: {
					lineHeight: "100%",
					top: 0,
					bottom: 0
				},
				indent: {
					left: 0,
					right: 0,
					firstLine: 0,
					hanging: 0
				}
			};
		}
	}]);
	return Paragraph;
}(_any2.default);

Paragraph.displayName = "paragraph";
exports.default = Paragraph;

var LineInfo = function () {
	function LineInfo(width, p) {
		(0, _classCallCheck3.default)(this, LineInfo);

		this.paragraph = p;
		this.width = width;
		this.children = [];
	}

	(0, _createClass3.default)(LineInfo, [{
		key: "rollback",
		value: function rollback(_ref) {
			var _this2 = this;

			var type = _ref.type;

			var removed = [];
			for (var i = this.children.length - 1; i > -1; i--) {
				var text = this.children[i];
				if (text.type != _text2.default) break;
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
					removed.unshift(this.children.pop());
					continue;
				} else if (j == pieces.length - 1) {
					break;
				} else {
					var removedPieces = pieces.splice(j);
					this.children[i] = _react2.default.cloneElement(text, { children: pieces, width: pieces.reduce(function (w, _ref2) {
							var width = _ref2.width;
							return w + width;
						}, 0) });
					removed.unshift(_react2.default.cloneElement(text, { children: removedPieces, width: removedPieces.reduce(function (w, _ref3) {
							var width = _ref3.width;
							return w + width;
						}, 0) }));
					break;
				}
			}

			this.paragraph.commitCurrentLine(true);

			removed.map(function (a) {
				return _this2.paragraph.appendComposed(a);
			});
		}
	}, {
		key: "commit",
		value: function commit(needNewLine) {
			this.paragraph.commitCurrentLine(needNewLine);
		}
	}, {
		key: "canSeperateWith",
		value: function canSeperateWith(_ref4) {
			var type = _ref4.type;

			if (this.children.length == 0) return true;

			var text = this.children[this.children.length - 1];
			var pieces = text.props.children;
			var lastPiece = pieces[pieces.length - 1];
			return type.canSeperateWith && type.canSeperateWith(lastPiece.type);
		}
	}, {
		key: "allCantSeperateWith",
		value: function allCantSeperateWith(_ref5) {
			var type = _ref5.type;

			return this.children.reduce(function (cantSeperate, text) {
				if (!cantSeperate) return false;

				return text.props.children.reduce(function (state, a) {
					if (!state) return false;
					return !type.canSeperateWith || !type.canSeperateWith(a.type);
				}, true);
			}, true);
		}
	}, {
		key: "height",
		get: function get() {
			return this.children.reduce(function (h, _ref6) {
				var height = _ref6.props.height;
				return Math.max(h, height);
			}, 0);
		}
	}, {
		key: "availableWidth",
		get: function get() {
			return this.children.reduce(function (w, _ref7) {
				var width = _ref7.props.width;
				return w - width;
			}, this.width);
		}
	}]);
	return LineInfo;
}();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJQYXJhZ3JhcGgiLCJnZXRDb250ZW50IiwiQ2hpbGRyZW4iLCJjb3VudCIsInByb3BzIiwiY2hpbGRyZW4iLCJnZXRDb250ZW50Q291bnQiLCJMaW5lSW5mbyIsImxpbmVXaWR0aCIsImdldFN0eWxlIiwiaW5kZW50IiwibGVmdCIsInJpZ2h0IiwiZmlyc3RMaW5lIiwiaGFuZ2luZyIsIndpZHRoIiwiYXZhaWxhYmxlU3BhY2UiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJOdW1iZXIiLCJNSU5fVkFMVUUiLCJoZWlnaHQiLCJtaW5SZXF1aXJlZEgiLCJzcGxpdGFibGUiLCJjb250ZXh0IiwicGFyZW50IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwicHVzaCIsIl9uZXdMaW5lIiwiY3VycmVudExpbmUiLCJhdmFpbGFibGVXaWR0aCIsImJGaXJzdExpbmUiLCJiTGluZVN0YXJ0IiwibGluZSIsImNvbnRlbnQiLCJjb250ZW50V2lkdGgiLCJ0eXBlIiwiYWJsZUV4Y2VlZCIsImNvbW1pdEN1cnJlbnRMaW5lIiwiYXBwZW5kQ29tcG9zZWQiLCJuZWVkTmV3TGluZSIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsInBhcmFncmFwaCIsIm90aGVycyIsInNwYWNpbmciLCJsaW5lSGVpZ2h0IiwidG9wIiwiYm90dG9tIiwiY29udGVudFkiLCJjb250ZW50WCIsIk1hdGgiLCJjZWlsIiwicGFyc2VJbnQiLCJpc0FsbENoaWxkcmVuQ29tcG9zZWQiLCJkaXNwbGF5TmFtZSIsInAiLCJyZW1vdmVkIiwiaSIsInRleHQiLCJwaWVjZXMiLCJqIiwiY2hhcnMiLCJ1bnNoaWZ0IiwicG9wIiwicmVtb3ZlZFBpZWNlcyIsInNwbGljZSIsImNsb25lRWxlbWVudCIsInJlZHVjZSIsInciLCJtYXAiLCJhIiwibGFzdFBpZWNlIiwiY2FuU2VwZXJh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QyxlQUFMLENBQXFCRCxVQUFVbkMsSUFBL0IsQ0FBL0I7QUFDQTs7OzZDQUUwQjtBQUFBLE9BQU5BLElBQU0sU0FBTkEsSUFBTTs7QUFDMUIsVUFBTyxLQUFLbEMsUUFBTCxDQUFjaUUsTUFBZCxDQUFxQixVQUFDTSxZQUFELEVBQWNmLElBQWQsRUFBcUI7QUFDaEQsUUFBRyxDQUFDZSxZQUFKLEVBQ0MsT0FBTyxLQUFQOztBQUVELFdBQU9mLEtBQUt6RCxLQUFMLENBQVdDLFFBQVgsQ0FBb0JpRSxNQUFwQixDQUEyQixVQUFDTyxLQUFELEVBQU9KLENBQVAsRUFBVztBQUM1QyxTQUFHLENBQUNJLEtBQUosRUFDQyxPQUFPLEtBQVA7QUFDRCxZQUFPLENBQUN0QyxLQUFLb0MsZUFBTixJQUF5QixDQUFDcEMsS0FBS29DLGVBQUwsQ0FBcUJGLEVBQUVsQyxJQUF2QixDQUFqQztBQUNBLEtBSk0sRUFJTCxJQUpLLENBQVA7QUFNQSxJQVZNLEVBVUwsSUFWSyxDQUFQO0FBV0E7OztzQkFwRVc7QUFDWCxVQUFPLEtBQUtsQyxRQUFMLENBQWNpRSxNQUFkLENBQXFCLFVBQUNRLENBQUQ7QUFBQSxRQUFXdEQsTUFBWCxTQUFJcEIsS0FBSixDQUFXb0IsTUFBWDtBQUFBLFdBQXNCNkIsS0FBSzBCLEdBQUwsQ0FBU0QsQ0FBVCxFQUFXdEQsTUFBWCxDQUF0QjtBQUFBLElBQXJCLEVBQThELENBQTlELENBQVA7QUFDQTs7O3NCQUVtQjtBQUNuQixVQUFPLEtBQUtuQixRQUFMLENBQWNpRSxNQUFkLENBQXFCLFVBQUNDLENBQUQ7QUFBQSxRQUFXeEQsS0FBWCxTQUFJWCxLQUFKLENBQVdXLEtBQVg7QUFBQSxXQUFxQndELElBQUV4RCxLQUF2QjtBQUFBLElBQXJCLEVBQWtELEtBQUtBLEtBQXZELENBQVA7QUFDQSIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0IExpbmUgZnJvbSBcIi4uL2NvbXBvc2VkL2xpbmVcIlxuaW1wb3J0IENvbXBvc2VkVGV4dCBmcm9tIFwiLi4vY29tcG9zZWQvdGV4dFwiXG5cbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcbmltcG9ydCBUZXh0IGZyb20gXCIuL3RleHRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBBbnl7XG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInBhcmFncmFwaFwiXG5cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuIDxwPnt0aGlzLmdldENvbnRlbnQoKX08L3A+XG5cdH1cblxuXHRnZXRDb250ZW50KCl7XG5cdFx0aWYoUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbik9PTApe1xuXHRcdFx0dGhpcy5nZXRDb250ZW50Q291bnQ9YT0+MVxuXHRcdFx0cmV0dXJuICg8SW5saW5lPjxUZXh0PiA8L1RleHQ+PC9JbmxpbmU+KVxuXHRcdH1cblx0XHRyZXR1cm4gc3VwZXIuZ2V0Q29udGVudCgpXG5cdH1cblxuXHRpc0VtcHR5KCl7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblxuXG5cdF9uZXdMaW5lKCl7XG4gICAgICAgIHJldHVybiBuZXcgTGluZUluZm8odGhpcy5saW5lV2lkdGgoKSx0aGlzKVxuXHR9XG5cblx0bGluZVdpZHRoKCl7XG5cdFx0Y29uc3Qge2luZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXG4gICAgICAgIGxldCB7d2lkdGh9PXRoaXMuYXZhaWxhYmxlU3BhY2VcbiAgICAgICAgd2lkdGgtPShsZWZ0K3JpZ2h0KVxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MClcbiAgICAgICAgICAgIHdpZHRoLT1maXJzdExpbmVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd2lkdGgtPWhhbmdpbmdcblx0XHRyZXR1cm4gd2lkdGhcblx0fVxuXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXtcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz1OdW1iZXIuTUlOX1ZBTFVFLGhlaWdodDptaW5SZXF1aXJlZEg9TnVtYmVyLk1JTl9WQUxVRSxzcGxpdGFibGU9dHJ1ZX09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXG5cdFx0aWYoMD09Y29tcG9zZWQubGVuZ3RoKXtcblx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcblx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoLGhlaWdodH1cblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHRcdH1cbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuXG4gICAgICAgIGxldCB7d2lkdGgsYXZhaWxhYmxlV2lkdGh9PWN1cnJlbnRMaW5lXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPG1pblJlcXVpcmVkVyB8fCB0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodDxtaW5SZXF1aXJlZEgpe1xuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ8bWluUmVxdWlyZWRIKVxuXHRcdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxuXG5cdFx0XHRhdmFpbGFibGVXaWR0aD10aGlzLmxpbmVXaWR0aCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcblx0XHRcdHdpZHRoOmF2YWlsYWJsZVdpZHRoLFxuXHRcdFx0aGVpZ2h0OnRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0LFxuXHRcdFx0YkZpcnN0TGluZTogY29tcG9zZWQubGVuZ3RoPDIsXG5cdFx0XHRiTGluZVN0YXJ0OiBhdmFpbGFibGVXaWR0aD09dGhpcy5hdmFpbGFibGVTcGFjZS53aWR0aCxcblx0XHRcdGxpbmU6IGN1cnJlbnRMaW5lXG5cdFx0fVxuICAgIH1cblxuICAgIGFwcGVuZENvbXBvc2VkKGNvbnRlbnQpey8vQFRPRE86IG5lZWQgY29uc2lkZXIgYXZhaWxhYmxlU3BhY2UuaGVpZ2h0XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcblxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmF2YWlsYWJsZVdpZHRoXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRofT1jb250ZW50LnByb3BzXG5cblx0XHRpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXtcbiAgICAgICAgICBjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKGNvbnRlbnQpXG5cdFx0fWVsc2UgaWYoYXZhaWxhYmxlV2lkdGg8Y29udGVudFdpZHRoKXtcblx0XHRcdGlmKGNvbnRlbnQudHlwZS5hYmxlRXhjZWVkICYmXG5cdFx0XHRcdGNvbnRlbnQudHlwZS5hYmxlRXhjZWVkKGNvbnRlbnQucHJvcHMuY2hpbGRyZW4pKXtcblx0XHRcdFx0Y3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChjb250ZW50KVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHRoaXMuY29tbWl0Q3VycmVudExpbmUodHJ1ZSlcblx0XHRcdFx0dGhpcy5hcHBlbmRDb21wb3NlZChjb250ZW50KVxuXHRcdFx0fVxuXHRcdH1cbiAgICB9XG5cblx0Y29tbWl0Q3VycmVudExpbmUobmVlZE5ld0xpbmU9ZmFsc2Upe1xuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxuXHRcdGxldCBjdXJyZW50TGluZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cblxuXHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXG5cblx0XHRpZihuZWVkTmV3TGluZSlcblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxuXHR9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7Ly9uZWVkIGFwcGVuZCBsYXN0IG5vbi1mdWxsLXdpZHRoIGxpbmUgdG8gcGFyZW50XG5cdFx0dGhpcy5jb21taXRDdXJyZW50TGluZSgpXG5cblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aDowLCBoZWlnaHQ6MH1cblxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cblxuICAgIGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XG4gICAgICAgIGxldCB7aGVpZ2h0LCB3aWR0aCwgcGFyYWdyYXBoLCAuLi5vdGhlcnN9PXByb3BzXG4gICAgICAgIGxldCB7c3BhY2luZzp7bGluZUhlaWdodD1cIjEwMCVcIix0b3A9MCwgYm90dG9tPTB9LCBpbmRlbnQ6e2xlZnQ9MCxyaWdodD0wLGZpcnN0TGluZT0wLGhhbmdpbmc9MH19PXRoaXMuZ2V0U3R5bGUoKVxuICAgICAgICBsZXQgY29udGVudFk9MCwgY29udGVudFg9bGVmdFxuXG4gICAgICAgbGluZUhlaWdodD10eXBlb2YobGluZUhlaWdodCk9PSdzdHJpbmcnID8gTWF0aC5jZWlsKGhlaWdodCpwYXJzZUludChsaW5lSGVpZ2h0KS8xMDAuMCk6IGxpbmVIZWlnaHRcblxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MSl7Ly9maXJzdCBsaW5lXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz10b3BcbiAgICAgICAgICAgIGNvbnRlbnRZKz10b3Bcblx0XHRcdGNvbnRlbnRYKz1maXJzdExpbmVcbiAgICAgICAgfWVsc2V7XG5cdFx0XHRjb250ZW50WCs9aGFuZ2luZ1xuXHRcdH1cblxuICAgICAgICBpZih0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKXsvL2xhc3QgbGluZVxuICAgICAgICAgICAgbGluZUhlaWdodCs9Ym90dG9tXG5cdFx0fVxuXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQtPWxpbmVIZWlnaHRcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEdyb3VwIGhlaWdodD17bGluZUhlaWdodH0gd2lkdGg9e3dpZHRofT5cbiAgICAgICAgICAgICAgICA8R3JvdXAgeD17Y29udGVudFh9IHk9e2NvbnRlbnRZfT5cbiAgICAgICAgICAgICAgICAgICAgPExpbmUgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gey4uLm90aGVyc30vPlxuICAgICAgICAgICAgICAgIDwvR3JvdXA+XG4gICAgICAgICAgICA8L0dyb3VwPlxuICAgICAgICApXG4gICAgfVxuXG4gICAgZ2V0U3R5bGUoKXtcblx0XHRyZXR1cm4gc3VwZXIuZ2V0U3R5bGUoKXx8e1xuXHRcdFx0c3BhY2luZzp7XG5cdFx0XHRcdGxpbmVIZWlnaHQ6XCIxMDAlXCJcblx0XHRcdFx0LHRvcDowXG5cdFx0XHRcdCxib3R0b206MFxuXHRcdFx0fVxuXHRcdFx0LGluZGVudDp7XG5cdFx0XHRcdGxlZnQ6MFxuXHRcdFx0XHQscmlnaHQ6MFxuXHRcdFx0XHQsZmlyc3RMaW5lOjBcblx0XHRcdFx0LGhhbmdpbmc6MFxuXHRcdFx0fVxuXHRcdH1cbiAgICB9XG5cbn1cblxuXG5jbGFzcyBMaW5lSW5mb3tcblx0Y29uc3RydWN0b3Iod2lkdGgscCl7XG5cdFx0dGhpcy5wYXJhZ3JhcGg9cFxuXHRcdHRoaXMud2lkdGg9d2lkdGhcblx0XHR0aGlzLmNoaWxkcmVuPVtdXG5cdH1cblxuXHRnZXQgaGVpZ2h0KCl7XG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKChoLHtwcm9wczp7aGVpZ2h0fX0pPT5NYXRoLm1heChoLGhlaWdodCksMClcblx0fVxuXG5cdGdldCBhdmFpbGFibGVXaWR0aCgpe1xuXHRcdHJldHVybiB0aGlzLmNoaWxkcmVuLnJlZHVjZSgodyx7cHJvcHM6e3dpZHRofX0pPT53LXdpZHRoLHRoaXMud2lkdGgpXG5cdH1cblxuXHRyb2xsYmFjayh7dHlwZX0pe1xuXHRcdGxldCByZW1vdmVkPVtdXG5cdFx0Zm9yKGxldCBpPXRoaXMuY2hpbGRyZW4ubGVuZ3RoLTE7aT4tMTtpLS0pe1xuXHRcdFx0bGV0IHRleHQ9dGhpcy5jaGlsZHJlbltpXVxuXHRcdFx0aWYodGV4dC50eXBlIT1Db21wb3NlZFRleHQpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRsZXQge3dpZHRoLGNoaWxkcmVuOnBpZWNlc309dGV4dC5wcm9wc1xuXG5cdFx0XHRsZXQgaj1waWVjZXMubGVuZ3RoLTFcblx0XHRcdGZvcig7aj4tMTtqLS0pe1xuXHRcdFx0XHRsZXQgY2hhcnM9cGllY2VzW2pdXG5cdFx0XHRcdGlmKGNoYXJzLnR5cGUhPXR5cGUpe1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYoaj09LTEpe1xuXHRcdFx0XHRyZW1vdmVkLnVuc2hpZnQodGhpcy5jaGlsZHJlbi5wb3AoKSlcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9ZWxzZSBpZihqPT1waWVjZXMubGVuZ3RoLTEpe1xuXHRcdFx0XHRicmVha1xuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRsZXQgcmVtb3ZlZFBpZWNlcz1waWVjZXMuc3BsaWNlKGopXG5cdFx0XHRcdHRoaXMuY2hpbGRyZW5baV09UmVhY3QuY2xvbmVFbGVtZW50KHRleHQse2NoaWxkcmVuOnBpZWNlcywgd2lkdGg6cGllY2VzLnJlZHVjZSgodyx7d2lkdGh9KT0+dyt3aWR0aCwwKX0pXG5cdFx0XHRcdHJlbW92ZWQudW5zaGlmdChSZWFjdC5jbG9uZUVsZW1lbnQodGV4dCx7Y2hpbGRyZW46cmVtb3ZlZFBpZWNlcyx3aWR0aDpyZW1vdmVkUGllY2VzLnJlZHVjZSgodyx7d2lkdGh9KT0+dyt3aWR0aCwwKX0pKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMucGFyYWdyYXBoLmNvbW1pdEN1cnJlbnRMaW5lKHRydWUpXG5cblx0XHRyZW1vdmVkLm1hcChhPT50aGlzLnBhcmFncmFwaC5hcHBlbmRDb21wb3NlZChhKSlcblx0fVxuXG5cdGNvbW1pdChuZWVkTmV3TGluZSl7XG5cdFx0dGhpcy5wYXJhZ3JhcGguY29tbWl0Q3VycmVudExpbmUobmVlZE5ld0xpbmUpXG5cdH1cblxuXHRjYW5TZXBlcmF0ZVdpdGgoe3R5cGV9KXtcblx0XHRpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD09MClcblx0XHRcdHJldHVybiB0cnVlXG5cblx0XHRsZXQgdGV4dD10aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoLTFdXG5cdFx0bGV0IHBpZWNlcz10ZXh0LnByb3BzLmNoaWxkcmVuXG5cdFx0bGV0IGxhc3RQaWVjZT1waWVjZXNbcGllY2VzLmxlbmd0aC0xXVxuXHRcdHJldHVybiB0eXBlLmNhblNlcGVyYXRlV2l0aCAmJiB0eXBlLmNhblNlcGVyYXRlV2l0aChsYXN0UGllY2UudHlwZSlcblx0fVxuXG5cdGFsbENhbnRTZXBlcmF0ZVdpdGgoe3R5cGV9KXtcblx0XHRyZXR1cm4gdGhpcy5jaGlsZHJlbi5yZWR1Y2UoKGNhbnRTZXBlcmF0ZSx0ZXh0KT0+e1xuXHRcdFx0aWYoIWNhbnRTZXBlcmF0ZSlcblx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0XHRcdHJldHVybiB0ZXh0LnByb3BzLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsYSk9Pntcblx0XHRcdFx0aWYoIXN0YXRlKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0XHRyZXR1cm4gIXR5cGUuY2FuU2VwZXJhdGVXaXRoIHx8ICF0eXBlLmNhblNlcGVyYXRlV2l0aChhLnR5cGUpXG5cdFx0XHR9LHRydWUpXG5cblx0XHR9LHRydWUpXG5cdH1cblxufVxuIl19