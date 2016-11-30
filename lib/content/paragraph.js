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
		this.height = 0;
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
	}]);
	return LineInfo;
}();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlBhcmFncmFwaCIsImdldENvbnRlbnQiLCJMaW5lSW5mbyIsImxpbmVXaWR0aCIsImdldFN0eWxlIiwiaW5kZW50IiwibGVmdCIsInJpZ2h0IiwiZmlyc3RMaW5lIiwiaGFuZ2luZyIsIndpZHRoIiwiYXZhaWxhYmxlU3BhY2UiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJOdW1iZXIiLCJNSU5fVkFMVUUiLCJoZWlnaHQiLCJtaW5SZXF1aXJlZEgiLCJzcGxpdGFibGUiLCJjb250ZXh0IiwicGFyZW50IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwicHVzaCIsIl9uZXdMaW5lIiwiY3VycmVudExpbmUiLCJhdmFpbGFibGVXaWR0aCIsImNoaWxkcmVuIiwicmVkdWNlIiwicHJldiIsImEiLCJwcm9wcyIsImJGaXJzdExpbmUiLCJiTGluZVN0YXJ0IiwibGluZSIsImNvbnRlbnQiLCJjb250ZW50V2lkdGgiLCJjb250ZW50SGVpZ2h0IiwiTWF0aCIsIm1heCIsInR5cGUiLCJhYmxlRXhjZWVkIiwiY29tbWl0Q3VycmVudExpbmUiLCJhcHBlbmRDb21wb3NlZCIsIm5lZWROZXdMaW5lIiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwiY29uc29sZSIsImxvZyIsInBhcmFncmFwaCIsIm90aGVycyIsInNwYWNpbmciLCJsaW5lSGVpZ2h0IiwidG9wIiwiYm90dG9tIiwiY29udGVudFkiLCJjb250ZW50WCIsImNlaWwiLCJwYXJzZUludCIsImlzQWxsQ2hpbGRyZW5Db21wb3NlZCIsIl9zdHlsZSIsInN0eWxlIiwiZGlzcGxheU5hbWUiLCJjb250ZXh0VHlwZXMiLCJnZXREZWZhdWx0U3R5bGUiLCJmdW5jIiwicCIsInJlbW92ZWQiLCJpIiwidGV4dCIsInBpZWNlcyIsImoiLCJjaGFycyIsInVuc2hpZnQiLCJwb3AiLCJyZW1vdmVkUGllY2VzIiwic3BsaWNlIiwiY2xvbmVFbGVtZW50IiwidyIsIm1hcCIsImxhc3RQaWVjZSIsImNhblNlcGVyYXRlV2l0aCIsImNhbnRTZXBlcmF0ZSIsInN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBRUEsSUFBSUEsUUFBTSx5Q0FBVjs7SUFDcUJDLFM7Ozs7Ozs7Ozs7MkJBR1o7QUFDUCxVQUFPO0FBQUE7QUFBQTtBQUFJLFNBQUtDLFVBQUw7QUFBSixJQUFQO0FBQ0E7Ozs2QkFFUztBQUNILFVBQU8sSUFBSUMsUUFBSixDQUFhLEtBQUtDLFNBQUwsRUFBYixFQUE4QixJQUE5QixDQUFQO0FBQ047Ozs4QkFFVTtBQUFBLG1CQUM0QyxLQUFLQyxRQUFMLEVBRDVDO0FBQUEsb0NBQ0hDLE1BREc7QUFBQSxnREFDS0MsSUFETDtBQUFBLE9BQ0tBLElBREwseUNBQ1UsQ0FEVjtBQUFBLGdEQUNZQyxLQURaO0FBQUEsT0FDWUEsS0FEWix5Q0FDa0IsQ0FEbEI7QUFBQSxnREFDb0JDLFNBRHBCO0FBQUEsT0FDb0JBLFNBRHBCLHlDQUM4QixDQUQ5QjtBQUFBLGdEQUNnQ0MsT0FEaEM7QUFBQSxPQUNnQ0EsT0FEaEMseUNBQ3dDLENBRHhDOztBQUFBLE9BRUNDLEtBRkQsR0FFUSxLQUFLQyxjQUZiLENBRUNELEtBRkQ7O0FBR0pBLFlBQVFKLE9BQUtDLEtBQWI7QUFDQSxPQUFHLEtBQUtLLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsTUFBdkIsSUFBK0IsQ0FBbEMsRUFDSUosU0FBT0YsU0FBUCxDQURKLEtBR0lFLFNBQU9ELE9BQVA7QUFDVixVQUFPQyxLQUFQO0FBQ0E7Ozt1Q0FFaUM7QUFBQSxPQUFaSyxRQUFZLHVFQUFILEVBQUc7QUFBQSx5QkFDcUVBLFFBRHJFLENBQ3BCTCxLQURvQjtBQUFBLE9BQ2RNLFlBRGMsbUNBQ0RD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LFNBQU5BLElBQU07O0FBQ3RCLE9BQUcsS0FBS2IsUUFBTCxDQUFjZixNQUFkLElBQXNCLENBQXpCLEVBQ0MsT0FBTyxJQUFQOztBQUVELE9BQUl3RCxPQUFLLEtBQUt6QyxRQUFMLENBQWMsS0FBS0EsUUFBTCxDQUFjZixNQUFkLEdBQXFCLENBQW5DLENBQVQ7QUFDQSxPQUFJeUQsU0FBT0QsS0FBS3JDLEtBQUwsQ0FBV0osUUFBdEI7QUFDQSxPQUFJb0QsWUFBVVYsT0FBT0EsT0FBT3pELE1BQVAsR0FBYyxDQUFyQixDQUFkO0FBQ0EsVUFBTzRCLEtBQUt3QyxlQUFMLENBQXFCRCxVQUFVdkMsSUFBL0IsQ0FBUDtBQUNBOzs7NkNBRTBCO0FBQUEsT0FBTkEsSUFBTSxTQUFOQSxJQUFNOztBQUMxQixVQUFPLEtBQUtiLFFBQUwsQ0FBY0MsTUFBZCxDQUFxQixVQUFDcUQsWUFBRCxFQUFjYixJQUFkLEVBQXFCO0FBQ2hELFFBQUcsQ0FBQ2EsWUFBSixFQUNDLE9BQU8sS0FBUDs7QUFFRCxXQUFPYixLQUFLckMsS0FBTCxDQUFXSixRQUFYLENBQW9CQyxNQUFwQixDQUEyQixVQUFDc0QsS0FBRCxFQUFPcEQsQ0FBUCxFQUFXO0FBQzVDLFNBQUcsQ0FBQ29ELEtBQUosRUFDQyxPQUFPLEtBQVA7QUFDRCxZQUFPLENBQUMxQyxLQUFLd0MsZUFBTCxDQUFxQmxELEVBQUVVLElBQXZCLENBQVI7QUFDQSxLQUpNLEVBSUwsSUFKSyxDQUFQO0FBTUEsSUFWTSxFQVVMLElBVkssQ0FBUDtBQVdBIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgQW55LCB7c3R5bGVJbmhlcml0YWJsZX0gZnJvbSBcIi4vYW55XCJcclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBMaW5lIGZyb20gXCIuLi9jb21wb3NlZC9saW5lXCJcclxuXHJcbmltcG9ydCBJbmxpbmUgZnJvbSBcIi4vaW5saW5lXCJcclxuaW1wb3J0IFRleHQgZnJvbSBcIi4vdGV4dFwiXHJcblxyXG5pbXBvcnQge2lzQ2hhciwgaXNXaGl0ZXNwYWNlLCBpc1dvcmQsIHRlc3RBbGx9IGZyb20gXCIuLi93b3Jkd3JhcFwiXHJcblxyXG5sZXQgU3VwZXI9c3R5bGVJbmhlcml0YWJsZShBbnkpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIFN1cGVye1xyXG5cdHN0YXRpYyBkaXNwbGF5TmFtZT1cInBhcmFncmFwaFwiXHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIDxwPnt0aGlzLmdldENvbnRlbnQoKX08L3A+XHRcclxuXHR9XHJcblx0XHJcblx0X25ld0xpbmUoKXtcclxuICAgICAgICByZXR1cm4gbmV3IExpbmVJbmZvKHRoaXMubGluZVdpZHRoKCksdGhpcylcclxuXHR9XHJcblxyXG5cdGxpbmVXaWR0aCgpe1xyXG5cdFx0Y29uc3Qge2luZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXHJcbiAgICAgICAgbGV0IHt3aWR0aH09dGhpcy5hdmFpbGFibGVTcGFjZVxyXG4gICAgICAgIHdpZHRoLT0obGVmdCtyaWdodClcclxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MClcclxuICAgICAgICAgICAgd2lkdGgtPWZpcnN0TGluZVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgd2lkdGgtPWhhbmdpbmdcclxuXHRcdHJldHVybiB3aWR0aFxyXG5cdH1cclxuXHJcbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xyXG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9TnVtYmVyLk1JTl9WQUxVRSxoZWlnaHQ6bWluUmVxdWlyZWRIPU51bWJlci5NSU5fVkFMVUUsc3BsaXRhYmxlPXRydWV9PXJlcXVpcmVkXHJcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcblx0XHRpZigwPT1jb21wb3NlZC5sZW5ndGgpe1xyXG5cdFx0XHRsZXQge3dpZHRoLGhlaWdodH09dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXHJcblx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoLGhlaWdodH1cclxuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXHJcblx0XHR9XHJcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG5cclxuICAgICAgICBsZXQge3dpZHRofT1jdXJyZW50TGluZVxyXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCx3aWR0aClcclxuICAgICAgICBpZihhdmFpbGFibGVXaWR0aDxtaW5SZXF1aXJlZFcgfHwgdGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ8bWluUmVxdWlyZWRIKXtcclxuXHRcdFx0aWYodGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQ8bWluUmVxdWlyZWRIKVxyXG5cdFx0XHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9dGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQpXHJcblxyXG5cdFx0XHRhdmFpbGFibGVXaWR0aD10aGlzLmxpbmVXaWR0aCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcblx0XHRcdHdpZHRoOmF2YWlsYWJsZVdpZHRoLCBcclxuXHRcdFx0aGVpZ2h0OnRoaXMuYXZhaWxhYmxlU3BhY2UuaGVpZ2h0LCBcclxuXHRcdFx0YkZpcnN0TGluZTogY29tcG9zZWQubGVuZ3RoPDIsXHJcblx0XHRcdGJMaW5lU3RhcnQ6IGF2YWlsYWJsZVdpZHRoPT10aGlzLmF2YWlsYWJsZVNwYWNlLndpZHRoLFxyXG5cdFx0XHRsaW5lOiBjdXJyZW50TGluZVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZENvbXBvc2VkKGNvbnRlbnQpey8vQFRPRE86IG5lZWQgY29uc2lkZXIgYXZhaWxhYmxlU3BhY2UuaGVpZ2h0XHJcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcbiAgICAgICAgY29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblxyXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG4gICAgICAgIGxldCBhdmFpbGFibGVXaWR0aD1jdXJyZW50TGluZS5jaGlsZHJlbi5yZWR1Y2UoKHByZXYsYSk9PnByZXYtYS5wcm9wcy53aWR0aCxjdXJyZW50TGluZS53aWR0aClcclxuICAgICAgICBsZXQge3dpZHRoOmNvbnRlbnRXaWR0aCwgaGVpZ2h0OmNvbnRlbnRIZWlnaHR9PWNvbnRlbnQucHJvcHNcclxuXHRcdGNvbnN0IHB1c2g9YT0+e1xyXG5cdFx0XHRjdXJyZW50TGluZS5jaGlsZHJlbi5wdXNoKGNvbnRlbnQpXHJcblx0XHRcdGN1cnJlbnRMaW5lLmhlaWdodD1NYXRoLm1heChjdXJyZW50TGluZS5oZWlnaHQsY29udGVudEhlaWdodClcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoYXZhaWxhYmxlV2lkdGg+PWNvbnRlbnRXaWR0aCl7XHJcbiAgICAgICAgICAgcHVzaCgpXHJcblx0XHR9ZWxzZSBpZihhdmFpbGFibGVXaWR0aDxjb250ZW50V2lkdGgpe1xyXG5cdFx0XHRpZihjb250ZW50LnR5cGUuYWJsZUV4Y2VlZChjb250ZW50LnByb3BzLmNoaWxkcmVuKSl7XHJcblx0XHRcdFx0cHVzaCgpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHRoaXMuY29tbWl0Q3VycmVudExpbmUodHJ1ZSlcclxuXHRcdFx0XHR0aGlzLmFwcGVuZENvbXBvc2VkKGNvbnRlbnQpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuICAgIH1cclxuXHRcclxuXHRjb21taXRDdXJyZW50TGluZShuZWVkTmV3TGluZT1mYWxzZSl7XHJcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGNvbnN0IHtwYXJlbnR9PXRoaXMuY29udGV4dFxyXG5cdFx0bGV0IGN1cnJlbnRMaW5lPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG5cdFx0XHJcblx0XHRwYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoY3VycmVudExpbmUpKVxyXG5cdFx0XHJcblx0XHRpZihuZWVkTmV3TGluZSlcclxuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdMaW5lKCkpXHJcblx0fVxyXG5cclxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXsvL25lZWQgYXBwZW5kIGxhc3Qgbm9uLWZ1bGwtd2lkdGggbGluZSB0byBwYXJlbnRcclxuXHRcdHRoaXMuY29tbWl0Q3VycmVudExpbmUoKVxyXG5cdFx0XHJcblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlPXt3aWR0aDowLCBoZWlnaHQ6MH1cclxuXHJcblx0XHRzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG5cdH1cclxuXHJcbiAgICBjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0Y29uc29sZS5sb2coXCJhcHBlbmQgbmV3IGxpbmUgdG8gc2VjdGlvblwiKVxyXG4gICAgICAgIGxldCB7aGVpZ2h0LCB3aWR0aCwgcGFyYWdyYXBoLCAuLi5vdGhlcnN9PXByb3BzXHJcbiAgICAgICAgbGV0IHtzcGFjaW5nOntsaW5lSGVpZ2h0PVwiMTAwJVwiLHRvcD0wLCBib3R0b209MH0sIGluZGVudDp7bGVmdD0wLHJpZ2h0PTAsZmlyc3RMaW5lPTAsaGFuZ2luZz0wfX09dGhpcy5nZXRTdHlsZSgpXHJcbiAgICAgICAgbGV0IGNvbnRlbnRZPTAsIGNvbnRlbnRYPWxlZnRcclxuXHJcbiAgICAgICBsaW5lSGVpZ2h0PXR5cGVvZihsaW5lSGVpZ2h0KT09J3N0cmluZycgPyBNYXRoLmNlaWwoaGVpZ2h0KnBhcnNlSW50KGxpbmVIZWlnaHQpLzEwMC4wKTogbGluZUhlaWdodFxyXG5cclxuICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MSl7Ly9maXJzdCBsaW5lXHJcbiAgICAgICAgICAgIGxpbmVIZWlnaHQrPXRvcFxyXG4gICAgICAgICAgICBjb250ZW50WSs9dG9wXHJcblx0XHRcdGNvbnRlbnRYKz1maXJzdExpbmVcclxuICAgICAgICB9ZWxzZXtcclxuXHRcdFx0Y29udGVudFgrPWhhbmdpbmdcclxuXHRcdH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5pc0FsbENoaWxkcmVuQ29tcG9zZWQoKSl7Ly9sYXN0IGxpbmVcclxuICAgICAgICAgICAgbGluZUhlaWdodCs9Ym90dG9tXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQtPWxpbmVIZWlnaHRcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEdyb3VwIGhlaWdodD17bGluZUhlaWdodH0gd2lkdGg9e3dpZHRofT5cclxuICAgICAgICAgICAgICAgIDxHcm91cCB4PXtjb250ZW50WH0geT17Y29udGVudFl9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5lIHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHsuLi5vdGhlcnN9Lz5cclxuICAgICAgICAgICAgICAgIDwvR3JvdXA+XHJcbiAgICAgICAgICAgIDwvR3JvdXA+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN0eWxlKCl7XHJcbiAgICAgICAgaWYodGhpcy5fc3R5bGUpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHlsZVxyXG4gICAgICAgIGxldCBzcGFjaW5nPXRoaXMuc3R5bGUoJ3BQci5zcGFjaW5nJyl8fHt9XHJcbiAgICAgICAgbGV0IGluZGVudD10aGlzLnN0eWxlKCdwUHIuaW5kJyl8fHt9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlPXtzcGFjaW5nLGluZGVudH1cclxuICAgIH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHQuLi5TdXBlci5jb250ZXh0VHlwZXNcclxuXHRcdCxnZXREZWZhdWx0U3R5bGU6IFByb3BUeXBlcy5mdW5jXHJcblx0fVxyXG59XHJcblxyXG5cclxuY2xhc3MgTGluZUluZm97XHJcblx0Y29uc3RydWN0b3Iod2lkdGgscCl7XHJcblx0XHR0aGlzLnBhcmFncmFwaD1wXHJcblx0XHR0aGlzLndpZHRoPXdpZHRoXHJcblx0XHR0aGlzLmhlaWdodD0wXHJcblx0XHR0aGlzLmNoaWxkcmVuPVtdXHJcblx0fVxyXG5cdFxyXG5cdHJvbGxiYWNrKHt0eXBlfSl7XHJcblx0XHRsZXQgcmVtb3ZlZD1bXVxyXG5cdFx0Zm9yKGxldCBpPXRoaXMuY2hpbGRyZW4ubGVuZ3RoLTE7aT4tMTtpLS0pe1xyXG5cdFx0XHRsZXQgdGV4dD10aGlzLmNoaWxkcmVuW2ldXHJcblx0XHRcdGxldCB7d2lkdGgsY2hpbGRyZW46cGllY2VzfT10ZXh0LnByb3BzXHJcblxyXG5cdFx0XHRsZXQgaj1waWVjZXMubGVuZ3RoLTEgXHJcblx0XHRcdGZvcig7aj4tMTtqLS0pe1xyXG5cdFx0XHRcdGxldCBjaGFycz1waWVjZXNbal1cclxuXHRcdFx0XHRpZihjaGFycy50eXBlIT10eXBlKXtcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZihqPT0tMSl7XHJcblx0XHRcdFx0cmVtb3ZlZC51bnNoaWZ0KHRoaXMuY2hpbGRyZW4ucG9wKCkpXHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1lbHNlIGlmKGo9PXBpZWNlcy5sZW5ndGgtMSl7XHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0fWVsc2Uge1xyXG5cdFx0XHRcdGxldCByZW1vdmVkUGllY2VzPXBpZWNlcy5zcGxpY2UoailcclxuXHRcdFx0XHR0aGlzLmNoaWxkcmVuW2ldPVJlYWN0LmNsb25lRWxlbWVudCh0ZXh0LHtjaGlsZHJlbjpwaWVjZXMsIHdpZHRoOnBpZWNlcy5yZWR1Y2UoKHcse3dpZHRofSk9Pncrd2lkdGgsMCl9KVxyXG5cdFx0XHRcdHJlbW92ZWQudW5zaGlmdChSZWFjdC5jbG9uZUVsZW1lbnQodGV4dCx7Y2hpbGRyZW46cmVtb3ZlZFBpZWNlcyx3aWR0aDpyZW1vdmVkUGllY2VzLnJlZHVjZSgodyx7d2lkdGh9KT0+dyt3aWR0aCwwKX0pKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBhcmFncmFwaC5jb21taXRDdXJyZW50TGluZSh0cnVlKVxyXG5cdFx0XHJcblx0XHRyZW1vdmVkLm1hcChhPT50aGlzLnBhcmFncmFwaC5hcHBlbmRDb21wb3NlZChhKSlcclxuXHR9XHJcblx0XHJcblx0Y29tbWl0KG5lZWROZXdMaW5lKXtcclxuXHRcdHRoaXMucGFyYWdyYXBoLmNvbW1pdEN1cnJlbnRMaW5lKG5lZWROZXdMaW5lKVxyXG5cdH1cclxuXHRcclxuXHRjYW5TZXBlcmF0ZVdpdGgoe3R5cGV9KXtcclxuXHRcdGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoPT0wKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHJcblx0XHRsZXQgdGV4dD10aGlzLmNoaWxkcmVuW3RoaXMuY2hpbGRyZW4ubGVuZ3RoLTFdXHJcblx0XHRsZXQgcGllY2VzPXRleHQucHJvcHMuY2hpbGRyZW5cclxuXHRcdGxldCBsYXN0UGllY2U9cGllY2VzW3BpZWNlcy5sZW5ndGgtMV1cclxuXHRcdHJldHVybiB0eXBlLmNhblNlcGVyYXRlV2l0aChsYXN0UGllY2UudHlwZSlcclxuXHR9XHJcblx0XHJcblx0YWxsQ2FudFNlcGVyYXRlV2l0aCh7dHlwZX0pe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKChjYW50U2VwZXJhdGUsdGV4dCk9PntcclxuXHRcdFx0aWYoIWNhbnRTZXBlcmF0ZSlcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiB0ZXh0LnByb3BzLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsYSk9PntcclxuXHRcdFx0XHRpZighc3RhdGUpXHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHRyZXR1cm4gIXR5cGUuY2FuU2VwZXJhdGVXaXRoKGEudHlwZSlcclxuXHRcdFx0fSx0cnVlKVxyXG5cdFx0XHRcclxuXHRcdH0sdHJ1ZSlcclxuXHR9XHJcblx0XHJcbn1cclxuIl19