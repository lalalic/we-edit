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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJQYXJhZ3JhcGgiLCJnZXRDb250ZW50IiwiQ2hpbGRyZW4iLCJjb3VudCIsInByb3BzIiwiY2hpbGRyZW4iLCJnZXRDb250ZW50Q291bnQiLCJMaW5lSW5mbyIsImxpbmVXaWR0aCIsImdldFN0eWxlIiwiaW5kZW50IiwibGVmdCIsInJpZ2h0IiwiZmlyc3RMaW5lIiwiaGFuZ2luZyIsIndpZHRoIiwiYXZhaWxhYmxlU3BhY2UiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJOdW1iZXIiLCJNSU5fVkFMVUUiLCJoZWlnaHQiLCJtaW5SZXF1aXJlZEgiLCJzcGxpdGFibGUiLCJjb250ZXh0IiwicGFyZW50IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwicHVzaCIsIl9uZXdMaW5lIiwiY3VycmVudExpbmUiLCJhdmFpbGFibGVXaWR0aCIsImJGaXJzdExpbmUiLCJiTGluZVN0YXJ0IiwibGluZSIsImNvbnRlbnQiLCJjb250ZW50V2lkdGgiLCJ0eXBlIiwiYWJsZUV4Y2VlZCIsImNvbW1pdEN1cnJlbnRMaW5lIiwiYXBwZW5kQ29tcG9zZWQiLCJuZWVkTmV3TGluZSIsImNyZWF0ZUNvbXBvc2VkMlBhcmVudCIsInBhcmFncmFwaCIsIm90aGVycyIsInNwYWNpbmciLCJsaW5lSGVpZ2h0IiwidG9wIiwiYm90dG9tIiwiY29udGVudFkiLCJjb250ZW50WCIsIk1hdGgiLCJjZWlsIiwicGFyc2VJbnQiLCJpc0FsbENoaWxkcmVuQ29tcG9zZWQiLCJkaXNwbGF5TmFtZSIsInAiLCJyZW1vdmVkIiwiaSIsInRleHQiLCJwaWVjZXMiLCJqIiwiY2hhcnMiLCJ1bnNoaWZ0IiwicG9wIiwicmVtb3ZlZFBpZWNlcyIsInNwbGljZSIsImNsb25lRWxlbWVudCIsInJlZHVjZSIsInciLCJtYXAiLCJhIiwibGFzdFBpZWNlIiwiY2FuU2VwZXJh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QyxlQUFMLENBQXFCRCxVQUFVbkMsSUFBL0IsQ0FBL0I7QUFDQTs7OzZDQUUwQjtBQUFBLE9BQU5BLElBQU0sU0FBTkEsSUFBTTs7QUFDMUIsVUFBTyxLQUFLbEMsUUFBTCxDQUFjaUUsTUFBZCxDQUFxQixVQUFDTSxZQUFELEVBQWNmLElBQWQsRUFBcUI7QUFDaEQsUUFBRyxDQUFDZSxZQUFKLEVBQ0MsT0FBTyxLQUFQOztBQUVELFdBQU9mLEtBQUt6RCxLQUFMLENBQVdDLFFBQVgsQ0FBb0JpRSxNQUFwQixDQUEyQixVQUFDTyxLQUFELEVBQU9KLENBQVAsRUFBVztBQUM1QyxTQUFHLENBQUNJLEtBQUosRUFDQyxPQUFPLEtBQVA7QUFDRCxZQUFPLENBQUN0QyxLQUFLb0MsZUFBTixJQUF5QixDQUFDcEMsS0FBS29DLGVBQUwsQ0FBcUJGLEVBQUVsQyxJQUF2QixDQUFqQztBQUNBLEtBSk0sRUFJTCxJQUpLLENBQVA7QUFNQSxJQVZNLEVBVUwsSUFWSyxDQUFQO0FBV0E7OztzQkFwRVc7QUFDWCxVQUFPLEtBQUtsQyxRQUFMLENBQWNpRSxNQUFkLENBQXFCLFVBQUNRLENBQUQ7QUFBQSxRQUFXdEQsTUFBWCxTQUFJcEIsS0FBSixDQUFXb0IsTUFBWDtBQUFBLFdBQXNCNkIsS0FBSzBCLEdBQUwsQ0FBU0QsQ0FBVCxFQUFXdEQsTUFBWCxDQUF0QjtBQUFBLElBQXJCLEVBQThELENBQTlELENBQVA7QUFDQTs7O3NCQUVtQjtBQUNuQixVQUFPLEtBQUtuQixRQUFMLENBQWNpRSxNQUFkLENBQXFCLFVBQUNDLENBQUQ7QUFBQSxRQUFXeEQsS0FBWCxTQUFJWCxLQUFKLENBQVdXLEtBQVg7QUFBQSxXQUFxQndELElBQUV4RCxLQUF2QjtBQUFBLElBQXJCLEVBQWtELEtBQUtBLEtBQXZELENBQVA7QUFDQSIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuaW1wb3J0IExpbmUgZnJvbSBcIi4uL2NvbXBvc2VkL2xpbmVcIlxyXG5pbXBvcnQgQ29tcG9zZWRUZXh0IGZyb20gXCIuLi9jb21wb3NlZC90ZXh0XCJcclxuXHJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBBbnl7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwicGFyYWdyYXBoXCJcclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gPHA+e3RoaXMuZ2V0Q29udGVudCgpfTwvcD5cclxuXHR9XHJcblxyXG5cdGdldENvbnRlbnQoKXtcclxuXHRcdGlmKFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pPT0wKXtcclxuXHRcdFx0dGhpcy5nZXRDb250ZW50Q291bnQ9YT0+MVxyXG5cdFx0XHRyZXR1cm4gKDxJbmxpbmU+PFRleHQ+IDwvVGV4dD48L0lubGluZT4pXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3VwZXIuZ2V0Q29udGVudCgpXHJcblx0fVxyXG5cclxuXHRpc0VtcHR5KCl7XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblxyXG5cclxuXHRfbmV3TGluZSgpe1xyXG4gICAgICAgIHJldHVybiBuZXcgTGluZUluZm8odGhpcy5saW5lV2lkdGgoKSx0aGlzKVxyXG5cdH1cclxuXHJcblx0bGluZVdpZHRoKCl7XHJcblx0XHRjb25zdCB7aW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQge3dpZHRofT10aGlzLmF2YWlsYWJsZVNwYWNlXHJcbiAgICAgICAgd2lkdGgtPShsZWZ0K3JpZ2h0KVxyXG4gICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICB3aWR0aC09Zmlyc3RMaW5lXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB3aWR0aC09aGFuZ2luZ1xyXG5cdFx0cmV0dXJuIHdpZHRoXHJcblx0fVxyXG5cclxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XHJcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz1OdW1iZXIuTUlOX1ZBTFVFLGhlaWdodDptaW5SZXF1aXJlZEg9TnVtYmVyLk1JTl9WQUxVRSxzcGxpdGFibGU9dHJ1ZX09cmVxdWlyZWRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGlmKDA9PWNvbXBvc2VkLmxlbmd0aCl7XHJcblx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcclxuXHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZT17d2lkdGgsaGVpZ2h0fVxyXG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcclxuXHRcdH1cclxuICAgICAgICBsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcblxyXG4gICAgICAgIGxldCB7d2lkdGgsYXZhaWxhYmxlV2lkdGh9PWN1cnJlbnRMaW5lXHJcbiAgICAgICAgaWYoYXZhaWxhYmxlV2lkdGg8bWluUmVxdWlyZWRXIHx8IHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0PG1pblJlcXVpcmVkSCl7XHJcblx0XHRcdGlmKHRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0PG1pblJlcXVpcmVkSClcclxuXHRcdFx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkKVxyXG5cclxuXHRcdFx0YXZhaWxhYmxlV2lkdGg9dGhpcy5saW5lV2lkdGgoKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG5cdFx0XHR3aWR0aDphdmFpbGFibGVXaWR0aCxcclxuXHRcdFx0aGVpZ2h0OnRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0LFxyXG5cdFx0XHRiRmlyc3RMaW5lOiBjb21wb3NlZC5sZW5ndGg8MixcclxuXHRcdFx0YkxpbmVTdGFydDogYXZhaWxhYmxlV2lkdGg9PXRoaXMuYXZhaWxhYmxlU3BhY2Uud2lkdGgsXHJcblx0XHRcdGxpbmU6IGN1cnJlbnRMaW5lXHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kQ29tcG9zZWQoY29udGVudCl7Ly9AVE9ETzogbmVlZCBjb25zaWRlciBhdmFpbGFibGVTcGFjZS5oZWlnaHRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHJcblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmF2YWlsYWJsZVdpZHRoXHJcbiAgICAgICAgbGV0IHt3aWR0aDpjb250ZW50V2lkdGh9PWNvbnRlbnQucHJvcHNcclxuXHJcblx0XHRpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXtcclxuICAgICAgICAgIGN1cnJlbnRMaW5lLmNoaWxkcmVuLnB1c2goY29udGVudClcclxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPGNvbnRlbnRXaWR0aCl7XHJcblx0XHRcdGlmKGNvbnRlbnQudHlwZS5hYmxlRXhjZWVkICYmXHJcblx0XHRcdFx0Y29udGVudC50eXBlLmFibGVFeGNlZWQoY29udGVudC5wcm9wcy5jaGlsZHJlbikpe1xyXG5cdFx0XHRcdGN1cnJlbnRMaW5lLmNoaWxkcmVuLnB1c2goY29udGVudClcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0dGhpcy5jb21taXRDdXJyZW50TGluZSh0cnVlKVxyXG5cdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHRjb21taXRDdXJyZW50TGluZShuZWVkTmV3TGluZT1mYWxzZSl7XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG5cclxuXHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXHJcblxyXG5cdFx0aWYobmVlZE5ld0xpbmUpXHJcblx0XHRcdGNvbXBvc2VkLnB1c2godGhpcy5fbmV3TGluZSgpKVxyXG5cdH1cclxuXHJcblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7Ly9uZWVkIGFwcGVuZCBsYXN0IG5vbi1mdWxsLXdpZHRoIGxpbmUgdG8gcGFyZW50XHJcblx0XHR0aGlzLmNvbW1pdEN1cnJlbnRMaW5lKClcclxuXHJcblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aDowLCBoZWlnaHQ6MH1cclxuXHJcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG5cdH1cclxuXHJcbiAgICBjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG4gICAgICAgIGxldCB7aGVpZ2h0LCB3aWR0aCwgcGFyYWdyYXBoLCAuLi5vdGhlcnN9PXByb3BzXHJcbiAgICAgICAgbGV0IHtzcGFjaW5nOntsaW5lSGVpZ2h0PVwiMTAwJVwiLHRvcD0wLCBib3R0b209MH0sIGluZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXHJcbiAgICAgICAgbGV0IGNvbnRlbnRZPTAsIGNvbnRlbnRYPWxlZnRcclxuXHJcbiAgICAgICBsaW5lSGVpZ2h0PXR5cGVvZihsaW5lSGVpZ2h0KT09J3N0cmluZycgPyBNYXRoLmNlaWwoaGVpZ2h0KnBhcnNlSW50KGxpbmVIZWlnaHQpLzEwMC4wKTogbGluZUhlaWdodFxyXG5cclxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MSl7Ly9maXJzdCBsaW5lXHJcbiAgICAgICAgICAgIGxpbmVIZWlnaHQrPXRvcFxyXG4gICAgICAgICAgICBjb250ZW50WSs9dG9wXHJcblx0XHRcdGNvbnRlbnRYKz1maXJzdExpbmVcclxuICAgICAgICB9ZWxzZXtcclxuXHRcdFx0Y29udGVudFgrPWhhbmdpbmdcclxuXHRcdH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSl7Ly9sYXN0IGxpbmVcclxuICAgICAgICAgICAgbGluZUhlaWdodCs9Ym90dG9tXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQtPWxpbmVIZWlnaHRcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdyb3VwIGhlaWdodD17bGluZUhlaWdodH0gd2lkdGg9e3dpZHRofT5cclxuICAgICAgICAgICAgICAgIDxHcm91cCB4PXtjb250ZW50WH0geT17Y29udGVudFl9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5lIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHsuLi5vdGhlcnN9Lz5cclxuICAgICAgICAgICAgICAgIDwvR3JvdXA+XHJcbiAgICAgICAgICAgIDwvR3JvdXA+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0eWxlKCl7XHJcblx0XHRyZXR1cm4gc3VwZXIuZ2V0U3R5bGUoKXx8e1xyXG5cdFx0XHRzcGFjaW5nOntcclxuXHRcdFx0XHRsaW5lSGVpZ2h0OlwiMTAwJVwiXHJcblx0XHRcdFx0LHRvcDowXHJcblx0XHRcdFx0LGJvdHRvbTowXHJcblx0XHRcdH1cclxuXHRcdFx0LGluZGVudDp7XHJcblx0XHRcdFx0bGVmdDowXHJcblx0XHRcdFx0LHJpZ2h0OjBcclxuXHRcdFx0XHQsZmlyc3RMaW5lOjBcclxuXHRcdFx0XHQsaGFuZ2luZzowXHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5jbGFzcyBMaW5lSW5mb3tcclxuXHRjb25zdHJ1Y3Rvcih3aWR0aCxwKXtcclxuXHRcdHRoaXMucGFyYWdyYXBoPXBcclxuXHRcdHRoaXMud2lkdGg9d2lkdGhcclxuXHRcdHRoaXMuY2hpbGRyZW49W11cclxuXHR9XHJcblxyXG5cdGdldCBoZWlnaHQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNoaWxkcmVuLnJlZHVjZSgoaCx7cHJvcHM6e2hlaWdodH19KT0+TWF0aC5tYXgoaCxoZWlnaHQpLDApXHJcblx0fVxyXG5cclxuXHRnZXQgYXZhaWxhYmxlV2lkdGgoKXtcclxuXHRcdHJldHVybiB0aGlzLmNoaWxkcmVuLnJlZHVjZSgodyx7cHJvcHM6e3dpZHRofX0pPT53LXdpZHRoLHRoaXMud2lkdGgpXHJcblx0fVxyXG5cclxuXHRyb2xsYmFjayh7dHlwZX0pe1xyXG5cdFx0bGV0IHJlbW92ZWQ9W11cclxuXHRcdGZvcihsZXQgaT10aGlzLmNoaWxkcmVuLmxlbmd0aC0xO2k+LTE7aS0tKXtcclxuXHRcdFx0bGV0IHRleHQ9dGhpcy5jaGlsZHJlbltpXVxyXG5cdFx0XHRpZih0ZXh0LnR5cGUhPUNvbXBvc2VkVGV4dClcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRsZXQge3dpZHRoLGNoaWxkcmVuOnBpZWNlc309dGV4dC5wcm9wc1xyXG5cclxuXHRcdFx0bGV0IGo9cGllY2VzLmxlbmd0aC0xXHJcblx0XHRcdGZvcig7aj4tMTtqLS0pe1xyXG5cdFx0XHRcdGxldCBjaGFycz1waWVjZXNbal1cclxuXHRcdFx0XHRpZihjaGFycy50eXBlIT10eXBlKXtcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihqPT0tMSl7XHJcblx0XHRcdFx0cmVtb3ZlZC51bnNoaWZ0KHRoaXMuY2hpbGRyZW4ucG9wKCkpXHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1lbHNlIGlmKGo9PXBpZWNlcy5sZW5ndGgtMSl7XHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0fWVsc2Uge1xyXG5cdFx0XHRcdGxldCByZW1vdmVkUGllY2VzPXBpZWNlcy5zcGxpY2UoailcclxuXHRcdFx0XHR0aGlzLmNoaWxkcmVuW2ldPVJlYWN0LmNsb25lRWxlbWVudCh0ZXh0LHtjaGlsZHJlbjpwaWVjZXMsIHdpZHRoOnBpZWNlcy5yZWR1Y2UoKHcse3dpZHRofSk9Pncrd2lkdGgsMCl9KVxyXG5cdFx0XHRcdHJlbW92ZWQudW5zaGlmdChSZWFjdC5jbG9uZUVsZW1lbnQodGV4dCx7Y2hpbGRyZW46cmVtb3ZlZFBpZWNlcyx3aWR0aDpyZW1vdmVkUGllY2VzLnJlZHVjZSgodyx7d2lkdGh9KT0+dyt3aWR0aCwwKX0pKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBhcmFncmFwaC5jb21taXRDdXJyZW50TGluZSh0cnVlKVxyXG5cclxuXHRcdHJlbW92ZWQubWFwKGE9PnRoaXMucGFyYWdyYXBoLmFwcGVuZENvbXBvc2VkKGEpKVxyXG5cdH1cclxuXHJcblx0Y29tbWl0KG5lZWROZXdMaW5lKXtcclxuXHRcdHRoaXMucGFyYWdyYXBoLmNvbW1pdEN1cnJlbnRMaW5lKG5lZWROZXdMaW5lKVxyXG5cdH1cclxuXHJcblx0Y2FuU2VwZXJhdGVXaXRoKHt0eXBlfSl7XHJcblx0XHRpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD09MClcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHJcblx0XHRsZXQgdGV4dD10aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoLTFdXHJcblx0XHRsZXQgcGllY2VzPXRleHQucHJvcHMuY2hpbGRyZW5cclxuXHRcdGxldCBsYXN0UGllY2U9cGllY2VzW3BpZWNlcy5sZW5ndGgtMV1cclxuXHRcdHJldHVybiB0eXBlLmNhblNlcGVyYXRlV2l0aCAmJiB0eXBlLmNhblNlcGVyYXRlV2l0aChsYXN0UGllY2UudHlwZSlcclxuXHR9XHJcblxyXG5cdGFsbENhbnRTZXBlcmF0ZVdpdGgoe3R5cGV9KXtcclxuXHRcdHJldHVybiB0aGlzLmNoaWxkcmVuLnJlZHVjZSgoY2FudFNlcGVyYXRlLHRleHQpPT57XHJcblx0XHRcdGlmKCFjYW50U2VwZXJhdGUpXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblxyXG5cdFx0XHRyZXR1cm4gdGV4dC5wcm9wcy5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLGEpPT57XHJcblx0XHRcdFx0aWYoIXN0YXRlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHRcdFx0cmV0dXJuICF0eXBlLmNhblNlcGVyYXRlV2l0aCB8fCAhdHlwZS5jYW5TZXBlcmF0ZVdpdGgoYS50eXBlKVxyXG5cdFx0XHR9LHRydWUpXHJcblxyXG5cdFx0fSx0cnVlKVxyXG5cdH1cclxuXHJcbn1cclxuIl19