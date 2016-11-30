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

			var width = currentLine.width;

			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, width);
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
			var availableWidth = currentLine.children.reduce(function (prev, a) {
				return prev - a.props.width;
			}, currentLine.width);
			var _content$props = content.props,
			    contentWidth = _content$props.width,
			    contentHeight = _content$props.height;

			var push = function push(a) {
				currentLine.children.push(content);
				currentLine.height = Math.max(currentLine.height, contentHeight);
			};

			if (availableWidth >= contentWidth) {
				push();
			} else if (availableWidth < contentWidth) {
				if (content.type.ableExceed(content.props.children)) {
					push();
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
			return type.canSeperateWith(lastPiece.type);
		}
	}, {
		key: "allCantSeperateWith",
		value: function allCantSeperateWith(_ref5) {
			var type = _ref5.type;

			return this.children.reduce(function (cantSeperate, text) {
				if (!cantSeperate) return false;

				return text.props.children.reduce(function (state, a) {
					if (!state) return false;
					return !type.canSeperateWith(a.type);
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
		key: "contentWidth",
		get: function get() {}
	}]);
	return LineInfo;
}();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlBhcmFncmFwaCIsImdldENvbnRlbnQiLCJMaW5lSW5mbyIsImxpbmVXaWR0aCIsImdldFN0eWxlIiwiaW5kZW50IiwibGVmdCIsInJpZ2h0IiwiZmlyc3RMaW5lIiwiaGFuZ2luZyIsIndpZHRoIiwiYXZhaWxhYmxlU3BhY2UiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJOdW1iZXIiLCJNSU5fVkFMVUUiLCJoZWlnaHQiLCJtaW5SZXF1aXJlZEgiLCJzcGxpdGFibGUiLCJjb250ZXh0IiwicGFyZW50IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwicHVzaCIsIl9uZXdMaW5lIiwiY3VycmVudExpbmUiLCJhdmFpbGFibGVXaWR0aCIsImNoaWxkcmVuIiwicmVkdWNlIiwicHJldiIsImEiLCJwcm9wcyIsImJGaXJzdExpbmUiLCJiTGluZVN0YXJ0IiwibGluZSIsImNvbnRlbnQiLCJjb250ZW50V2lkdGgiLCJjb250ZW50SGVpZ2h0IiwiTWF0aCIsIm1heCIsInR5cGUiLCJhYmxlRXhjZWVkIiwiY29tbWl0Q3VycmVudExpbmUiLCJhcHBlbmRDb21wb3NlZCIsIm5lZWROZXdMaW5lIiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwiY29uc29sZSIsImxvZyIsInBhcmFncmFwaCIsIm90aGVycyIsInNwYWNpbmciLCJsaW5lSGVpZ2h0IiwidG9wIiwiYm90dG9tIiwiY29udGVudFkiLCJjb250ZW50WCIsImNlaWwiLCJwYXJzZUludCIsImlzQWxsQ2hpbGRyZW5Db21wb3NlZCIsIl9zdHlsZSIsInN0eWxlIiwiZGlzcGxheU5hbWUiLCJjb250ZXh0VHlwZXMiLCJnZXREZWZhdWx0U3R5bGUiLCJmdW5jIiwicCIsInJlbW92ZWQiLCJpIiwidGV4dCIsInBpZWNlcyIsImoiLCJjaGFycyIsInVuc2hpZnQiLCJwb3AiLCJyZW1vdmVkUGllY2VzIiwic3BsaWNlIiwiY2xvbmVFbGVtZW50IiwidyIsIm1hcCIsImxhc3RQaWVjZSIsImNhblNlcGVyYXRlV2l0aCIsImNhbnRTZXBlcmF0ZSIsInN0YXRlIiwiaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBLElBQUlBLFFBQU0seUNBQVY7O0lBQ3FCQyxTOzs7Ozs7Ozs7OzJCQUdaO0FBQ1AsVUFBTztBQUFBO0FBQUE7QUFBSSxTQUFLQyxVQUFMO0FBQUosSUFBUDtBQUNBOzs7NkJBRVM7QUFDSCxVQUFPLElBQUlDLFFBQUosQ0FBYSxLQUFLQyxTQUFMLEVBQWIsRUFBOEIsSUFBOUIsQ0FBUDtBQUNOOzs7OEJBRVU7QUFBQSxtQkFDNEMsS0FBS0MsUUFBTCxFQUQ1QztBQUFBLG9DQUNIQyxNQURHO0FBQUEsZ0RBQ0tDLElBREw7QUFBQSxPQUNLQSxJQURMLHlDQUNVLENBRFY7QUFBQSxnREFDWUMsS0FEWjtBQUFBLE9BQ1lBLEtBRFoseUNBQ2tCLENBRGxCO0FBQUEsZ0RBQ29CQyxTQURwQjtBQUFBLE9BQ29CQSxTQURwQix5Q0FDOEIsQ0FEOUI7QUFBQSxnREFDZ0NDLE9BRGhDO0FBQUEsT0FDZ0NBLE9BRGhDLHlDQUN3QyxDQUR4Qzs7QUFBQSxPQUVDQyxLQUZELEdBRVEsS0FBS0MsY0FGYixDQUVDRCxLQUZEOztBQUdKQSxZQUFRSixPQUFLQyxLQUFiO0FBQ0EsT0FBRyxLQUFLSyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLE1BQXZCLElBQStCLENBQWxDLEVBQ0lKLFNBQU9GLFNBQVAsQ0FESixLQUdJRSxTQUFPRCxPQUFQO0FBQ1YsVUFBT0MsS0FBUDtBQUNBOzs7dUNBRWlDO0FBQUEsT0FBWkssUUFBWSx1RUFBSCxFQUFHO0FBQUEseUJBQ3FFQSxRQURyRSxDQUNwQkwsS0FEb0I7QUFBQSxPQUNkTSxZQURjLG1D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LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBBbnksIHtzdHlsZUluaGVyaXRhYmxlfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuaW1wb3J0IExpbmUgZnJvbSBcIi4uL2NvbXBvc2VkL2xpbmVcIlxyXG5cclxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuXHJcbmltcG9ydCB7aXNDaGFyLCBpc1doaXRlc3BhY2UsIGlzV29yZCwgdGVzdEFsbH0gZnJvbSBcIi4uL3dvcmR3cmFwXCJcclxuXHJcbmxldCBTdXBlcj1zdHlsZUluaGVyaXRhYmxlKEFueSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgU3VwZXJ7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwicGFyYWdyYXBoXCJcclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gPHA+e3RoaXMuZ2V0Q29udGVudCgpfTwvcD5cdFxyXG5cdH1cclxuXHRcclxuXHRfbmV3TGluZSgpe1xyXG4gICAgICAgIHJldHVybiBuZXcgTGluZUluZm8odGhpcy5saW5lV2lkdGgoKSx0aGlzKVxyXG5cdH1cclxuXHJcblx0bGluZVdpZHRoKCl7XHJcblx0XHRjb25zdCB7aW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQge3dpZHRofT10aGlzLmF2YWlsYWJsZVNwYWNlXHJcbiAgICAgICAgd2lkdGgtPShsZWZ0K3JpZ2h0KVxyXG4gICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICB3aWR0aC09Zmlyc3RMaW5lXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB3aWR0aC09aGFuZ2luZ1xyXG5cdFx0cmV0dXJuIHdpZHRoXHJcblx0fVxyXG5cclxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XHJcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz1OdW1iZXIuTUlOX1ZBTFVFLGhlaWdodDptaW5SZXF1aXJlZEg9TnVtYmVyLk1JTl9WQUxVRSxzcGxpdGFibGU9dHJ1ZX09cmVxdWlyZWRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGlmKDA9PWNvbXBvc2VkLmxlbmd0aCl7XHJcblx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcclxuXHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZT17d2lkdGgsaGVpZ2h0fVxyXG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcclxuXHRcdH1cclxuICAgICAgICBsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcblxyXG4gICAgICAgIGxldCB7d2lkdGh9PWN1cnJlbnRMaW5lXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLHdpZHRoKVxyXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPG1pblJlcXVpcmVkVyB8fCB0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodDxtaW5SZXF1aXJlZEgpe1xyXG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodDxtaW5SZXF1aXJlZEgpXHJcblx0XHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcclxuXHJcblx0XHRcdGF2YWlsYWJsZVdpZHRoPXRoaXMubGluZVdpZHRoKClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuXHRcdFx0d2lkdGg6YXZhaWxhYmxlV2lkdGgsIFxyXG5cdFx0XHRoZWlnaHQ6dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQsIFxyXG5cdFx0XHRiRmlyc3RMaW5lOiBjb21wb3NlZC5sZW5ndGg8MixcclxuXHRcdFx0YkxpbmVTdGFydDogYXZhaWxhYmxlV2lkdGg9PXRoaXMuYXZhaWxhYmxlU3BhY2Uud2lkdGgsXHJcblx0XHRcdGxpbmU6IGN1cnJlbnRMaW5lXHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kQ29tcG9zZWQoY29udGVudCl7Ly9AVE9ETzogbmVlZCBjb25zaWRlciBhdmFpbGFibGVTcGFjZS5oZWlnaHRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHJcblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxyXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRoLCBoZWlnaHQ6Y29udGVudEhlaWdodH09Y29udGVudC5wcm9wc1xyXG5cdFx0Y29uc3QgcHVzaD1hPT57XHJcblx0XHRcdGN1cnJlbnRMaW5lLmNoaWxkcmVuLnB1c2goY29udGVudClcclxuXHRcdFx0Y3VycmVudExpbmUuaGVpZ2h0PU1hdGgubWF4KGN1cnJlbnRMaW5lLmhlaWdodCxjb250ZW50SGVpZ2h0KVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXtcclxuICAgICAgICAgICBwdXNoKClcclxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPGNvbnRlbnRXaWR0aCl7XHJcblx0XHRcdGlmKGNvbnRlbnQudHlwZS5hYmxlRXhjZWVkKGNvbnRlbnQucHJvcHMuY2hpbGRyZW4pKXtcclxuXHRcdFx0XHRwdXNoKClcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0dGhpcy5jb21taXRDdXJyZW50TGluZSh0cnVlKVxyXG5cdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cdFxyXG5cdGNvbW1pdEN1cnJlbnRMaW5lKG5lZWROZXdMaW5lPWZhbHNlKXtcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcblx0XHRcclxuXHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXHJcblx0XHRcclxuXHRcdGlmKG5lZWROZXdMaW5lKVxyXG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcclxuXHR9XHJcblxyXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpey8vbmVlZCBhcHBlbmQgbGFzdCBub24tZnVsbC13aWR0aCBsaW5lIHRvIHBhcmVudFxyXG5cdFx0dGhpcy5jb21taXRDdXJyZW50TGluZSgpXHJcblx0XHRcclxuXHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoOjAsIGhlaWdodDowfVxyXG5cclxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcblx0fVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcblx0XHRjb25zb2xlLmxvZyhcImFwcGVuZCBuZXcgbGluZSB0byBzZWN0aW9uXCIpXHJcbiAgICAgICAgbGV0IHtoZWlnaHQsIHdpZHRoLCBwYXJhZ3JhcGgsIC4uLm90aGVyc309cHJvcHNcclxuICAgICAgICBsZXQge3NwYWNpbmc6e2xpbmVIZWlnaHQ9XCIxMDAlXCIsdG9wPTAsIGJvdHRvbT0wfSwgaW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQgY29udGVudFk9MCwgY29udGVudFg9bGVmdFxyXG5cclxuICAgICAgIGxpbmVIZWlnaHQ9dHlwZW9mKGxpbmVIZWlnaHQpPT0nc3RyaW5nJyA/IE1hdGguY2VpbChoZWlnaHQqcGFyc2VJbnQobGluZUhlaWdodCkvMTAwLjApOiBsaW5lSGVpZ2h0XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0xKXsvL2ZpcnN0IGxpbmVcclxuICAgICAgICAgICAgbGluZUhlaWdodCs9dG9wXHJcbiAgICAgICAgICAgIGNvbnRlbnRZKz10b3BcclxuXHRcdFx0Y29udGVudFgrPWZpcnN0TGluZVxyXG4gICAgICAgIH1lbHNle1xyXG5cdFx0XHRjb250ZW50WCs9aGFuZ2luZ1xyXG5cdFx0fVxyXG5cclxuICAgICAgICBpZih0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKXsvL2xhc3QgbGluZVxyXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz1ib3R0b21cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodC09bGluZUhlaWdodFxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R3JvdXAgaGVpZ2h0PXtsaW5lSGVpZ2h0fSB3aWR0aD17d2lkdGh9PlxyXG4gICAgICAgICAgICAgICAgPEdyb3VwIHg9e2NvbnRlbnRYfSB5PXtjb250ZW50WX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmUgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gey4uLm90aGVyc30vPlxyXG4gICAgICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R5bGUoKXtcclxuICAgICAgICBpZih0aGlzLl9zdHlsZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlXHJcbiAgICAgICAgbGV0IHNwYWNpbmc9dGhpcy5zdHlsZSgncFByLnNwYWNpbmcnKXx8e31cclxuICAgICAgICBsZXQgaW5kZW50PXRoaXMuc3R5bGUoJ3BQci5pbmQnKXx8e31cclxuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU9e3NwYWNpbmcsaW5kZW50fVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdC4uLlN1cGVyLmNvbnRleHRUeXBlc1xyXG5cdFx0LGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBMaW5lSW5mb3tcclxuXHRjb25zdHJ1Y3Rvcih3aWR0aCxwKXtcclxuXHRcdHRoaXMucGFyYWdyYXBoPXBcclxuXHRcdHRoaXMud2lkdGg9d2lkdGhcclxuXHRcdHRoaXMuY2hpbGRyZW49W11cclxuXHR9XHJcblx0XHJcblx0Z2V0IGhlaWdodCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKChoLHtwcm9wczp7aGVpZ2h0fX0pPT5NYXRoLm1heChoLGhlaWdodCksMClcclxuXHR9XHJcblx0XHJcblx0Z2V0IGNvbnRlbnRXaWR0aCgpe1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHJvbGxiYWNrKHt0eXBlfSl7XHJcblx0XHRsZXQgcmVtb3ZlZD1bXVxyXG5cdFx0Zm9yKGxldCBpPXRoaXMuY2hpbGRyZW4ubGVuZ3RoLTE7aT4tMTtpLS0pe1xyXG5cdFx0XHRsZXQgdGV4dD10aGlzLmNoaWxkcmVuW2ldXHJcblx0XHRcdGxldCB7d2lkdGgsY2hpbGRyZW46cGllY2VzfT10ZXh0LnByb3BzXHJcblxyXG5cdFx0XHRsZXQgaj1waWVjZXMubGVuZ3RoLTEgXHJcblx0XHRcdGZvcig7aj4tMTtqLS0pe1xyXG5cdFx0XHRcdGxldCBjaGFycz1waWVjZXNbal1cclxuXHRcdFx0XHRpZihjaGFycy50eXBlIT10eXBlKXtcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZihqPT0tMSl7XHJcblx0XHRcdFx0cmVtb3ZlZC51bnNoaWZ0KHRoaXMuY2hpbGRyZW4ucG9wKCkpXHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1lbHNlIGlmKGo9PXBpZWNlcy5sZW5ndGgtMSl7XHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0fWVsc2Uge1xyXG5cdFx0XHRcdGxldCByZW1vdmVkUGllY2VzPXBpZWNlcy5zcGxpY2UoailcclxuXHRcdFx0XHR0aGlzLmNoaWxkcmVuW2ldPVJlYWN0LmNsb25lRWxlbWVudCh0ZXh0LHtjaGlsZHJlbjpwaWVjZXMsIHdpZHRoOnBpZWNlcy5yZWR1Y2UoKHcse3dpZHRofSk9Pncrd2lkdGgsMCl9KVxyXG5cdFx0XHRcdHJlbW92ZWQudW5zaGlmdChSZWFjdC5jbG9uZUVsZW1lbnQodGV4dCx7Y2hpbGRyZW46cmVtb3ZlZFBpZWNlcyx3aWR0aDpyZW1vdmVkUGllY2VzLnJlZHVjZSgodyx7d2lkdGh9KT0+dyt3aWR0aCwwKX0pKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBhcmFncmFwaC5jb21taXRDdXJyZW50TGluZSh0cnVlKVxyXG5cdFx0XHJcblx0XHRyZW1vdmVkLm1hcChhPT50aGlzLnBhcmFncmFwaC5hcHBlbmRDb21wb3NlZChhKSlcclxuXHR9XHJcblx0XHJcblx0Y29tbWl0KG5lZWROZXdMaW5lKXtcclxuXHRcdHRoaXMucGFyYWdyYXBoLmNvbW1pdEN1cnJlbnRMaW5lKG5lZWROZXdMaW5lKVxyXG5cdH1cclxuXHRcclxuXHRjYW5TZXBlcmF0ZVdpdGgoe3R5cGV9KXtcclxuXHRcdGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPT0wKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHJcblx0XHRsZXQgdGV4dD10aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoLTFdXHJcblx0XHRsZXQgcGllY2VzPXRleHQucHJvcHMuY2hpbGRyZW5cclxuXHRcdGxldCBsYXN0UGllY2U9cGllY2VzW3BpZWNlcy5sZW5ndGgtMV1cclxuXHRcdHJldHVybiB0eXBlLmNhblNlcGVyYXRlV2l0aChsYXN0UGllY2UudHlwZSlcclxuXHR9XHJcblx0XHJcblx0YWxsQ2FudFNlcGVyYXRlV2l0aCh7dHlwZX0pe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKChjYW50U2VwZXJhdGUsdGV4dCk9PntcclxuXHRcdFx0aWYoIWNhbnRTZXBlcmF0ZSlcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiB0ZXh0LnByb3BzLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsYSk9PntcclxuXHRcdFx0XHRpZighc3RhdGUpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHRyZXR1cm4gIXR5cGUuY2FuU2VwZXJhdGVXaXRoKGEudHlwZSlcclxuXHRcdFx0fSx0cnVlKVxyXG5cdFx0XHRcclxuXHRcdH0sdHJ1ZSlcclxuXHR9XHJcblx0XHJcbn1cclxuIl19