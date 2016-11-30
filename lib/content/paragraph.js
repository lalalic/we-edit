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

			var push = function push(a) {
				currentLine.children.push(_react2.default.createElement(
					_group2.default,
					{
						x: currentLine.width - availableWidth,
						index: _this2.computed.children.length,
						descent: contentDescent,
						width: contentWidth,
						height: contentHeight },
					content
				));
				currentLine.height = Math.max(currentLine.height, contentHeight);
				currentLine.descent = Math.max(currentLine.descent, contentDescent);
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
		this.descent = 0;
		this.children = [];
	}

	(0, _createClass3.default)(LineInfo, [{
		key: "rollback",
		value: function rollback(_ref) {
			var _this3 = this;

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

			this.paragraph.commitCurrentLine(true);

			removed.map(function (a) {
				return _this3.paragraph.appendComposed(a);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3BhcmFncmFwaC5qcyJdLCJuYW1lcyI6WyJTdXBlciIsIlBhcmFncmFwaCIsImdldENvbnRlbnQiLCJMaW5lSW5mbyIsImxpbmVXaWR0aCIsImdldFN0eWxlIiwiaW5kZW50IiwibGVmdCIsInJpZ2h0IiwiZmlyc3RMaW5lIiwiaGFuZ2luZyIsIndpZHRoIiwiYXZhaWxhYmxlU3BhY2UiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwibGVuZ3RoIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJOdW1iZXIiLCJNSU5fVkFMVUUiLCJoZWlnaHQiLCJtaW5SZXF1aXJlZEgiLCJzcGxpdGFibGUiLCJjb250ZXh0IiwicGFyZW50IiwibmV4dEF2YWlsYWJsZVNwYWNlIiwicHVzaCIsIl9uZXdMaW5lIiwiY3VycmVudExpbmUiLCJhdmFpbGFibGVXaWR0aCIsImNoaWxkcmVuIiwicmVkdWNlIiwicHJldiIsImEiLCJwcm9wcyIsImJGaXJzdExpbmUiLCJiTGluZVN0YXJ0IiwibGluZSIsImNvbnRlbnQiLCJjb250ZW50V2lkdGgiLCJjb250ZW50SGVpZ2h0IiwiZGVzY2VudCIsImNvbnRlbnREZXNjZW50IiwiTWF0aCIsIm1heCIsInR5cGUiLCJhYmxlRXhjZWVkIiwiY29tbWl0Q3VycmVudExpbmUiLCJhcHBlbmRDb21wb3NlZCIsIm5lZWROZXdMaW5lIiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwiY29uc29sZSIsImxvZyIsInBhcmFncmFwaCIsIm90aGVycyIsInNwYWNpbmciLCJsaW5lSGVpZ2h0IiwidG9wIiwiYm90dG9tIiwiY29udGVudFkiLCJjb250ZW50WCIsImNlaWwiLCJwYXJzZUludCIsImlzQWxsQ2hpbGRyZW5Db21wb3NlZCIsIl9zdHlsZSIsInN0eWxlIiwiZGlzcGxheU5hbWUiLCJjb250ZXh0VHlwZXMiLCJnZXREZWZhdWx0U3R5bGUiLCJmdW5jIiwicCIsInJlbW92ZWQiLCJpIiwiZ3JvdXAiLCJ0ZXh0IiwicGllY2VzIiwiaiIsImNoYXJzIiwidW5zaGlmdCIsInBvcCIsInNwbGljZSIsImNsb25lRWxlbWVudCIsInciLCJtYXAiLCJsYXN0UGllY2UiLCJjYW5TZXBlcmF0ZVdpdGgiLCJjYW50U2VwZXJhdGUiLCJzdGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBLElBQUlBLFFBQU0seUNBQVY7O0lBQ3FCQyxTOzs7Ozs7Ozs7OzJCQUdaO0FBQ1AsVUFBTztBQUFBO0FBQUE7QUFBSSxTQUFLQyxVQUFMO0FBQUosSUFBUDtBQUNBOzs7NkJBRVM7QUFDSCxVQUFPLElBQUlDLFFBQUosQ0FBYSxLQUFLQyxTQUFMLEVBQWIsRUFBOEIsSUFBOUIsQ0FBUDtBQUNOOzs7OEJBRVU7QUFBQSxtQkFDNEMsS0FBS0MsUUFBTCxFQUQ1QztBQUFBLG9DQUNIQyxNQURHO0FBQUEsZ0RBQ0tDLElBREw7QUFBQSxPQUNLQSxJQURMLHlDQUNVLENBRFY7QUFBQSxnREFDWUMsS0FEWjtBQUFBLE9BQ1lBLEtBRFoseUNBQ2tCLENBRGxCO0FBQUEsZ0RBQ29CQyxTQURwQjtBQUFBLE9BQ29CQSxTQURwQix5Q0FDOEIsQ0FEOUI7QUFBQSxnREFDZ0NDLE9BRGhDO0FBQUEsT0FDZ0NBLE9BRGhDLHlDQUN3QyxDQUR4Qzs7QUFBQSxPQUVDQyxLQUZELEdBRVEsS0FBS0MsY0FGYixDQUVDRCxLQUZEOztBQUdKQSxZQUFRSixPQUFLQyxLQUFiO0FBQ0EsT0FBRyxLQUFLSyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLE1BQXZCLElBQStCLENBQWxDLEVBQ0lKLFNBQU9GLFNBQVAsQ0FESixLQUdJRSxTQUFPRCxPQUFQO0FBQ1YsVUFBT0MsS0FBUDtBQUNBOzs7dUNBRWlDO0FBQUEsT0FBWkssUUFBWSx1RUFBSCxFQUFHO0FBQUEseUJBQ3FFQSxRQURyRSxDQUNwQkwsS0FEb0I7QUFBQSxPQUNkTSxZQURjLG1DQUNEQyxPQUFPQyxTQUROO0FBQUEsMEJBQ3FFSCxRQURyRSxDQUNnQkksTUFEaEI7QUFBQSxPQUN1QkMsWUFEdkIsb0NBQ29DSCxPQUFPQyxTQUQzQztBQUFBLDZCQUNxRUgsUUFEckUsQ0FDcURNLFNBRHJEO0FBQUEsT0FDcURBLFNBRHJELHVDQUMrRCxJQUQvRDtBQUFBLE9BRXBCUixRQUZvQixHQUVWLEtBQUtELFFBRkssQ0FFcEJDLFFBRm9COztBQUdqQyxPQUFHLEtBQUdBLFNBQVNDLE1BQWYsRUFBc0I7QUFBQSxnQ0FDRixLQUFLUSxPQUFMLENBQWFDLE1BQWIsQ0FBb0JDLGtCQUFwQixDQUF1Q1QsUUFBdkMsQ0FERTtBQUFBLFFBQ2hCTCxNQURnQix5QkFDaEJBLEtBRGdCO0FBQUEsUUFDVlMsTUFEVSx5QkFDVkEsTUFEVTs7QUFFckIsU0FBS1IsY0FBTCxHQUFvQixFQUFDRCxhQUFELEVBQU9TLGNBQVAsRUFBcEI7QUFDQU4sYUFBU1ksSUFBVCxDQUFjLEtBQUtDLFFBQUwsRUFBZDtBQUNBO0FBQ0ssT0FBSUMsY0FBWWQsU0FBU0EsU0FBU0MsTUFBVCxHQUFnQixDQUF6QixDQUFoQjs7QUFSMkIsT0FVdEJKLEtBVnNCLEdBVWZpQixXQVZlLENBVXRCakIsS0FWc0I7O0FBVzNCLE9BQUlrQixpQkFBZUQsWUFBWUUsUUFBWixDQUFxQkMsTUFBckIsQ0FBNEIsVUFBQ0MsSUFBRCxFQUFNQyxDQUFOO0FBQUEsV0FBVUQsT0FBS0MsRUFBRUMsS0FBRixDQUFRdkIsS0FBdkI7QUFBQSxJQUE1QixFQUF5REEsS0FBekQsQ0FBbkI7QUFDQSxPQUFHa0IsaUJBQWVaLFlBQWYsSUFBK0IsS0FBS0wsY0FBTCxDQUFvQlEsTUFBcEIsR0FBMkJDLFlBQTdELEVBQTBFO0FBQy9FLFFBQUcsS0FBS1QsY0FBTCxDQUFvQlEsTUFBcEIsR0FBMkJDLFlBQTlCLEVBQ0MsS0FBS1QsY0FBTCxHQUFvQixLQUFLVyxPQUFMLENBQWFDLE1BQWIsQ0FBb0JDLGtCQUFwQixDQUF1Q1QsUUFBdkMsQ0FBcEI7O0FBRURhLHFCQUFlLEtBQUt6QixTQUFMLEVBQWY7QUFDTTtBQUNELFVBQU87QUFDWk8sV0FBTWtCLGNBRE07QUFFWlQsWUFBTyxLQUFLUixjQUFMLENBQW9CUSxNQUZmO0FBR1plLGdCQUFZckIsU0FBU0MsTUFBVCxHQUFnQixDQUhoQjtBQUlacUIsZ0JBQVlQLGtCQUFnQixLQUFLakIsY0FBTCxDQUFvQkQsS0FKcEM7QUFLWjBCLFVBQU1UO0FBTE0sSUFBUDtBQU9IOzs7aUNBRWNVLE8sRUFBUTtBQUFBOztBQUFDO0FBQUQsT0FDWnhCLFFBRFksR0FDRixLQUFLRCxRQURILENBQ1pDLFFBRFk7QUFBQSxPQUVaVSxNQUZZLEdBRUosS0FBS0QsT0FGRCxDQUVaQyxNQUZZOzs7QUFJekIsT0FBSUksY0FBWWQsU0FBU0EsU0FBU0MsTUFBVCxHQUFnQixDQUF6QixDQUFoQjtBQUNNLE9BQUljLGlCQUFlRCxZQUFZRSxRQUFaLENBQXFCQyxNQUFyQixDQUE0QixVQUFDQyxJQUFELEVBQU1DLENBQU47QUFBQSxXQUFVRCxPQUFLQyxFQUFFQyxLQUFGLENBQVF2QixLQUF2QjtBQUFBLElBQTVCLEVBQXlEaUIsWUFBWWpCLEtBQXJFLENBQW5CO0FBTG1CLHdCQU1zRDJCLFFBQVFKLEtBTjlEO0FBQUEsT0FNUkssWUFOUSxrQkFNZDVCLEtBTmM7QUFBQSxPQU1hNkIsYUFOYixrQkFNTXBCLE1BTk47QUFBQSw4Q0FNNEJxQixPQU41QjtBQUFBLE9BTW9DQyxjQU5wQyx5Q0FNbUQsQ0FObkQ7O0FBT3pCLE9BQU1oQixPQUFLLFNBQUxBLElBQUssSUFBRztBQUNiRSxnQkFBWUUsUUFBWixDQUFxQkosSUFBckIsQ0FDRTtBQUFBO0FBQUE7QUFDQyxTQUFHRSxZQUFZakIsS0FBWixHQUFrQmtCLGNBRHRCO0FBRUMsYUFBTyxPQUFLaEIsUUFBTCxDQUFjaUIsUUFBZCxDQUF1QmYsTUFGL0I7QUFHQyxlQUFTMkIsY0FIVjtBQUlDLGFBQU9ILFlBSlI7QUFLQyxjQUFRQyxhQUxUO0FBTUVGO0FBTkYsS0FERjtBQVVBVixnQkFBWVIsTUFBWixHQUFtQnVCLEtBQUtDLEdBQUwsQ0FBU2hCLFlBQVlSLE1BQXJCLEVBQTRCb0IsYUFBNUIsQ0FBbkI7QUFDQVosZ0JBQVlhLE9BQVosR0FBb0JFLEtBQUtDLEdBQUwsQ0FBU2hCLFlBQVlhLE9BQXJCLEVBQThCQyxjQUE5QixDQUFwQjtBQUNBLElBYkQ7O0FBZUEsT0FBR2Isa0JBQWdCVSxZQUFuQixFQUFnQztBQUN2QmI7QUFDUixJQUZELE1BRU0sSUFBR0csaUJBQWVVLFlBQWxCLEVBQStCO0FBQ3BDLFFBQUdELFFBQVFPLElBQVIsQ0FBYUMsVUFBYixDQUF3QlIsUUFBUUosS0FBUixDQUFjSixRQUF0QyxDQUFILEVBQW1EO0FBQ2xESjtBQUNBLEtBRkQsTUFFSztBQUNKLFVBQUtxQixpQkFBTCxDQUF1QixJQUF2QjtBQUNBLFVBQUtDLGNBQUwsQ0FBb0JWLE9BQXBCO0FBQ0E7QUFDRDtBQUNFOzs7c0NBRWdDO0FBQUEsT0FBbEJXLFdBQWtCLHVFQUFOLEtBQU07QUFBQSxPQUM1Qm5DLFFBRDRCLEdBQ2xCLEtBQUtELFFBRGEsQ0FDNUJDLFFBRDRCO0FBQUEsT0FFNUJVLE1BRjRCLEdBRXBCLEtBQUtELE9BRmUsQ0FFNUJDLE1BRjRCOztBQUduQyxPQUFJSSxjQUFZZCxTQUFTQSxTQUFTQyxNQUFULEdBQWdCLENBQXpCLENBQWhCOztBQUVBUyxVQUFPd0IsY0FBUCxDQUFzQixLQUFLRSxxQkFBTCxDQUEyQnRCLFdBQTNCLENBQXRCOztBQUVBLE9BQUdxQixXQUFILEVBQ0NuQyxTQUFTWSxJQUFULENBQWMsS0FBS0MsUUFBTCxFQUFkO0FBQ0Q7OzswQ0FFc0I7QUFBQztBQUN2QixRQUFLb0IsaUJBQUw7O0FBRUEsUUFBS25DLGNBQUwsR0FBb0IsRUFBQ0QsT0FBTSxDQUFQLEVBQVVTLFFBQU8sQ0FBakIsRUFBcEI7O0FBRUE7QUFDQTs7O3dDQUV3QmMsSyxFQUFNO0FBQzlCaUIsV0FBUUMsR0FBUixDQUFZLDRCQUFaO0FBRDhCLE9BRW5CaEMsTUFGbUIsR0FFa0JjLEtBRmxCLENBRW5CZCxNQUZtQjtBQUFBLE9BRVhULEtBRlcsR0FFa0J1QixLQUZsQixDQUVYdkIsS0FGVztBQUFBLE9BRUowQyxTQUZJLEdBRWtCbkIsS0FGbEIsQ0FFSm1CLFNBRkk7QUFBQSxPQUVVQyxNQUZWLDBDQUVrQnBCLEtBRmxCOztBQUFBLG9CQUd5RSxLQUFLN0IsUUFBTCxFQUh6RTtBQUFBLHVDQUduQmtELE9BSG1CO0FBQUEsa0RBR1ZDLFVBSFU7QUFBQSxPQUdWQSxVQUhVLHlDQUdDLE1BSEQ7QUFBQSxrREFHUUMsR0FIUjtBQUFBLE9BR1FBLEdBSFIseUNBR1ksQ0FIWjtBQUFBLGtEQUdlQyxNQUhmO0FBQUEsT0FHZUEsTUFIZix5Q0FHc0IsQ0FIdEI7QUFBQSxzQ0FHMEJwRCxNQUgxQjtBQUFBLGlEQUdrQ0MsSUFIbEM7QUFBQSxPQUdrQ0EsSUFIbEMseUNBR3VDLENBSHZDO0FBQUEsaURBR3lDQyxLQUh6QztBQUFBLE9BR3lDQSxLQUh6Qyx5Q0FHK0MsQ0FIL0M7QUFBQSxpREFHaURDLFNBSGpEO0FBQUEsT0FHaURBLFNBSGpELHlDQUcyRCxDQUgzRDtBQUFBLGlEQUc2REMsT0FIN0Q7QUFBQSxPQUc2REEsT0FIN0QseUNBR3FFLENBSHJFOztBQUl4QixPQUFJaUQsV0FBUyxDQUFiO0FBQUEsT0FBZ0JDLFdBQVNyRCxJQUF6Qjs7QUFFRGlELGdCQUFXLE9BQU9BLFVBQVAsSUFBb0IsUUFBcEIsR0FBK0JiLEtBQUtrQixJQUFMLENBQVV6QyxTQUFPMEMsU0FBU04sVUFBVCxDQUFQLEdBQTRCLEtBQXRDLENBQS9CLEdBQTZFQSxVQUF4Rjs7QUFFQyxPQUFHLEtBQUszQyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLE1BQXZCLElBQStCLENBQWxDLEVBQW9DO0FBQUM7QUFDakN5QyxrQkFBWUMsR0FBWjtBQUNBRSxnQkFBVUYsR0FBVjtBQUNURyxnQkFBVW5ELFNBQVY7QUFDTSxJQUpELE1BSUs7QUFDVm1ELGdCQUFVbEQsT0FBVjtBQUNBOztBQUVLLE9BQUcsS0FBS3FELHFCQUFMLEVBQUgsRUFBZ0M7QUFBQztBQUM3QlAsa0JBQVlFLE1BQVo7QUFDVDs7QUFFRCxRQUFLOUMsY0FBTCxDQUFvQlEsTUFBcEIsSUFBNEJvQyxVQUE1Qjs7QUFFTSxVQUNJO0FBQUE7QUFBQSxNQUFPLFFBQVFBLFVBQWYsRUFBMkIsT0FBTzdDLEtBQWxDO0FBQ0k7QUFBQTtBQUFBLE9BQU8sR0FBR2lELFFBQVYsRUFBb0IsR0FBR0QsUUFBdkI7QUFDSSw0RUFBTSxPQUFPaEQsS0FBYixFQUFvQixRQUFRUyxNQUE1QixJQUF3Q2tDLE1BQXhDO0FBREo7QUFESixJQURKO0FBT0g7Ozs2QkFFUztBQUNOLE9BQUcsS0FBS1UsTUFBUixFQUNJLE9BQU8sS0FBS0EsTUFBWjtBQUNKLE9BQUlULFVBQVEsS0FBS1UsS0FBTCxDQUFXLGFBQVgsS0FBMkIsRUFBdkM7QUFDQSxPQUFJM0QsU0FBTyxLQUFLMkQsS0FBTCxDQUFXLFNBQVgsS0FBdUIsRUFBbEM7QUFDQSxVQUFPLEtBQUtELE1BQUwsR0FBWSxFQUFDVCxnQkFBRCxFQUFTakQsY0FBVCxFQUFuQjtBQUNIOzs7RUEzSWtDTixLOztBQUFsQkMsUyxDQUNiaUUsVyxHQUFZLFc7QUFEQ2pFLFMsQ0E2SWJrRSxZLDhCQUNIbkUsTUFBTW1FLFksSUFDUkMsaUJBQWlCLGlCQUFVQzs7a0JBL0lUcEUsUzs7SUFvSmZFLFE7QUFDTCxtQkFBWVEsS0FBWixFQUFrQjJELENBQWxCLEVBQW9CO0FBQUE7O0FBQ25CLE9BQUtqQixTQUFMLEdBQWVpQixDQUFmO0FBQ0EsT0FBSzNELEtBQUwsR0FBV0EsS0FBWDtBQUNBLE9BQUtTLE1BQUwsR0FBWSxDQUFaO0FBQ0EsT0FBS3FCLE9BQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS1gsUUFBTCxHQUFjLEVBQWQ7QUFDQTs7OztpQ0FFZTtBQUFBOztBQUFBLE9BQU5lLElBQU0sUUFBTkEsSUFBTTs7QUFDZixPQUFJMEIsVUFBUSxFQUFaO0FBQ0EsUUFBSSxJQUFJQyxJQUFFLEtBQUsxQyxRQUFMLENBQWNmLE1BQWQsR0FBcUIsQ0FBL0IsRUFBaUN5RCxJQUFFLENBQUMsQ0FBcEMsRUFBc0NBLEdBQXRDLEVBQTBDO0FBQ3pDLFFBQUlDLFFBQU0sS0FBSzNDLFFBQUwsQ0FBYzBDLENBQWQsQ0FBVjtBQUNBLFFBQUlFLE9BQUtELE1BQU12QyxLQUFOLENBQVlKLFFBQXJCO0FBRnlDLHNCQUdiNEMsS0FBS3hDLEtBSFE7QUFBQSxRQUdwQ3ZCLEtBSG9DLGVBR3BDQSxLQUhvQztBQUFBLFFBR3JCZ0UsTUFIcUIsZUFHOUI3QyxRQUg4Qjs7O0FBS3pDLFFBQUk4QyxJQUFFRCxPQUFPNUQsTUFBUCxHQUFjLENBQXBCO0FBQ0EsV0FBSzZELElBQUUsQ0FBQyxDQUFSLEVBQVVBLEdBQVYsRUFBYztBQUNiLFNBQUlDLFFBQU1GLE9BQU9DLENBQVAsQ0FBVjtBQUNBLFNBQUdDLE1BQU1oQyxJQUFOLElBQVlBLElBQWYsRUFBb0I7QUFDbkI7QUFDQTtBQUNEOztBQUVELFFBQUcrQixLQUFHLENBQUMsQ0FBUCxFQUFTO0FBQ1JMLGFBQVFPLE9BQVIsQ0FBZ0IsS0FBS2hELFFBQUwsQ0FBY2lELEdBQWQsR0FBb0I3QyxLQUFwQixDQUEwQkosUUFBMUM7QUFDQTtBQUNBLEtBSEQsTUFHTSxJQUFHOEMsS0FBR0QsT0FBTzVELE1BQVAsR0FBYyxDQUFwQixFQUFzQjtBQUMzQjtBQUNBLEtBRkssTUFFQTtBQUNMLFNBQUl3RCxXQUFRSSxPQUFPSyxNQUFQLENBQWNKLENBQWQsQ0FBWjtBQUNBRixZQUFLLGdCQUFNTyxZQUFOLENBQW1CUCxJQUFuQixFQUF3QixFQUFDNUMsVUFBUzZDLE1BQVYsRUFBa0JoRSxPQUFNZ0UsT0FBTzVDLE1BQVAsQ0FBYyxVQUFDbUQsQ0FBRDtBQUFBLFdBQUl2RSxLQUFKLFNBQUlBLEtBQUo7QUFBQSxjQUFhdUUsSUFBRXZFLEtBQWY7QUFBQSxPQUFkLEVBQW1DLENBQW5DLENBQXhCLEVBQXhCLENBQUw7QUFDQSxVQUFLbUIsUUFBTCxDQUFjMEMsQ0FBZCxJQUFpQixnQkFBTVMsWUFBTixDQUFtQlIsS0FBbkIsRUFBeUIsRUFBQzNDLFVBQVM0QyxJQUFWLEVBQWUvRCxPQUFNK0QsS0FBS3hDLEtBQUwsQ0FBV3ZCLEtBQWhDLEVBQXpCLENBQWpCOztBQUVBLFNBQUlBLFVBQU00RCxTQUFReEMsTUFBUixDQUFlLFVBQUNtRCxDQUFEO0FBQUEsVUFBSXZFLEtBQUosU0FBSUEsS0FBSjtBQUFBLGFBQWF1RSxJQUFFdkUsS0FBZjtBQUFBLE1BQWYsRUFBb0MsQ0FBcEMsQ0FBVjtBQUNBNEQsY0FBUU8sT0FBUixDQUFnQixnQkFBTUcsWUFBTixDQUFtQlAsSUFBbkIsRUFBd0IsRUFBQzVDLFVBQVN5QyxRQUFWLEVBQWtCNUQsY0FBbEIsRUFBeEIsQ0FBaEI7QUFDQTtBQUNBO0FBQ0Q7O0FBRUQsUUFBSzBDLFNBQUwsQ0FBZU4saUJBQWYsQ0FBaUMsSUFBakM7O0FBRUF3QixXQUFRWSxHQUFSLENBQVk7QUFBQSxXQUFHLE9BQUs5QixTQUFMLENBQWVMLGNBQWYsQ0FBOEJmLENBQTlCLENBQUg7QUFBQSxJQUFaO0FBQ0E7Ozt5QkFFTWdCLFcsRUFBWTtBQUNsQixRQUFLSSxTQUFMLENBQWVOLGlCQUFmLENBQWlDRSxXQUFqQztBQUNBOzs7eUNBRXNCO0FBQUEsT0FBTkosSUFBTSxTQUFOQSxJQUFNOztBQUN0QixPQUFHLEtBQUtmLFFBQUwsQ0FBY2YsTUFBZCxJQUFzQixDQUF6QixFQUNDLE9BQU8sSUFBUDs7QUFFRCxPQUFJMEQsUUFBTSxLQUFLM0MsUUFBTCxDQUFjLEtBQUtBLFFBQUwsQ0FBY2YsTUFBZCxHQUFxQixDQUFuQyxDQUFWO0FBQ0EsT0FBSTJELE9BQUtELE1BQU12QyxLQUFOLENBQVlKLFFBQXJCO0FBQ0EsT0FBSTZDLFNBQU9ELEtBQUt4QyxLQUFMLENBQVdKLFFBQXRCO0FBQ0EsT0FBSXNELFlBQVVULE9BQU9BLE9BQU81RCxNQUFQLEdBQWMsQ0FBckIsQ0FBZDtBQUNBLFVBQU84QixLQUFLd0MsZUFBTCxDQUFxQkQsVUFBVXZDLElBQS9CLENBQVA7QUFDQTs7OzZDQUUwQjtBQUFBLE9BQU5BLElBQU0sU0FBTkEsSUFBTTs7QUFDMUIsVUFBTyxLQUFLZixRQUFMLENBQWNDLE1BQWQsQ0FBcUIsVUFBQ3VELFlBQUQsU0FBd0M7QUFBQSxRQUFUWixJQUFTLFNBQXpCeEMsS0FBeUIsQ0FBbEJKLFFBQWtCOztBQUNuRSxRQUFHLENBQUN3RCxZQUFKLEVBQ0MsT0FBTyxLQUFQOztBQUVELFdBQU9aLEtBQUt4QyxLQUFMLENBQVdKLFFBQVgsQ0FBb0JDLE1BQXBCLENBQTJCLFVBQUN3RCxLQUFELEVBQU90RCxDQUFQLEVBQVc7QUFDNUMsU0FBRyxDQUFDc0QsS0FBSixFQUNDLE9BQU8sS0FBUDtBQUNELFlBQU8sQ0FBQzFDLEtBQUt3QyxlQUFMLENBQXFCcEQsRUFBRVksSUFBdkIsQ0FBUjtBQUNBLEtBSk0sRUFJTCxJQUpLLENBQVA7QUFNQSxJQVZNLEVBVUwsSUFWSyxDQUFQO0FBV0EiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBBbnksIHtzdHlsZUluaGVyaXRhYmxlfSBmcm9tIFwiLi9hbnlcIlxyXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcclxuaW1wb3J0IExpbmUgZnJvbSBcIi4uL2NvbXBvc2VkL2xpbmVcIlxyXG5cclxuaW1wb3J0IElubGluZSBmcm9tIFwiLi9pbmxpbmVcIlxyXG5pbXBvcnQgVGV4dCBmcm9tIFwiLi90ZXh0XCJcclxuXHJcbmltcG9ydCB7aXNDaGFyLCBpc1doaXRlc3BhY2UsIGlzV29yZCwgdGVzdEFsbH0gZnJvbSBcIi4uL3dvcmR3cmFwXCJcclxuXHJcbmxldCBTdXBlcj1zdHlsZUluaGVyaXRhYmxlKEFueSlcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgU3VwZXJ7XHJcblx0c3RhdGljIGRpc3BsYXlOYW1lPVwicGFyYWdyYXBoXCJcclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gPHA+e3RoaXMuZ2V0Q29udGVudCgpfTwvcD5cdFxyXG5cdH1cclxuXHRcclxuXHRfbmV3TGluZSgpe1xyXG4gICAgICAgIHJldHVybiBuZXcgTGluZUluZm8odGhpcy5saW5lV2lkdGgoKSx0aGlzKVxyXG5cdH1cclxuXHJcblx0bGluZVdpZHRoKCl7XHJcblx0XHRjb25zdCB7aW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQge3dpZHRofT10aGlzLmF2YWlsYWJsZVNwYWNlXHJcbiAgICAgICAgd2lkdGgtPShsZWZ0K3JpZ2h0KVxyXG4gICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wKVxyXG4gICAgICAgICAgICB3aWR0aC09Zmlyc3RMaW5lXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB3aWR0aC09aGFuZ2luZ1xyXG5cdFx0cmV0dXJuIHdpZHRoXHJcblx0fVxyXG5cclxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XHJcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz1OdW1iZXIuTUlOX1ZBTFVFLGhlaWdodDptaW5SZXF1aXJlZEg9TnVtYmVyLk1JTl9WQUxVRSxzcGxpdGFibGU9dHJ1ZX09cmVxdWlyZWRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGlmKDA9PWNvbXBvc2VkLmxlbmd0aCl7XHJcblx0XHRcdGxldCB7d2lkdGgsaGVpZ2h0fT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcclxuXHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZT17d2lkdGgsaGVpZ2h0fVxyXG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcclxuXHRcdH1cclxuICAgICAgICBsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcblxyXG4gICAgICAgIGxldCB7d2lkdGh9PWN1cnJlbnRMaW5lXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLHdpZHRoKVxyXG4gICAgICAgIGlmKGF2YWlsYWJsZVdpZHRoPG1pblJlcXVpcmVkVyB8fCB0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodDxtaW5SZXF1aXJlZEgpe1xyXG5cdFx0XHRpZih0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodDxtaW5SZXF1aXJlZEgpXHJcblx0XHRcdFx0dGhpcy5hdmFpbGFibGVTcGFjZT10aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZClcclxuXHJcblx0XHRcdGF2YWlsYWJsZVdpZHRoPXRoaXMubGluZVdpZHRoKClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuXHRcdFx0d2lkdGg6YXZhaWxhYmxlV2lkdGgsIFxyXG5cdFx0XHRoZWlnaHQ6dGhpcy5hdmFpbGFibGVTcGFjZS5oZWlnaHQsIFxyXG5cdFx0XHRiRmlyc3RMaW5lOiBjb21wb3NlZC5sZW5ndGg8MixcclxuXHRcdFx0YkxpbmVTdGFydDogYXZhaWxhYmxlV2lkdGg9PXRoaXMuYXZhaWxhYmxlU3BhY2Uud2lkdGgsXHJcblx0XHRcdGxpbmU6IGN1cnJlbnRMaW5lXHJcblx0XHR9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kQ29tcG9zZWQoY29udGVudCl7Ly9AVE9ETzogbmVlZCBjb25zaWRlciBhdmFpbGFibGVTcGFjZS5oZWlnaHRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuICAgICAgICBjb25zdCB7cGFyZW50fT10aGlzLmNvbnRleHRcclxuXHJcblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZVdpZHRoPWN1cnJlbnRMaW5lLmNoaWxkcmVuLnJlZHVjZSgocHJldixhKT0+cHJldi1hLnByb3BzLndpZHRoLGN1cnJlbnRMaW5lLndpZHRoKVxyXG4gICAgICAgIGxldCB7d2lkdGg6Y29udGVudFdpZHRoLCBoZWlnaHQ6Y29udGVudEhlaWdodCwgZGVzY2VudDpjb250ZW50RGVzY2VudD0wfT1jb250ZW50LnByb3BzXHJcblx0XHRjb25zdCBwdXNoPWE9PntcclxuXHRcdFx0Y3VycmVudExpbmUuY2hpbGRyZW4ucHVzaChcclxuXHRcdFx0XHRcdDxHcm91cFxyXG5cdFx0XHRcdFx0XHR4PXtjdXJyZW50TGluZS53aWR0aC1hdmFpbGFibGVXaWR0aH1cclxuXHRcdFx0XHRcdFx0aW5kZXg9e3RoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RofVxyXG5cdFx0XHRcdFx0XHRkZXNjZW50PXtjb250ZW50RGVzY2VudH1cclxuXHRcdFx0XHRcdFx0d2lkdGg9e2NvbnRlbnRXaWR0aH1cclxuXHRcdFx0XHRcdFx0aGVpZ2h0PXtjb250ZW50SGVpZ2h0fT5cclxuXHRcdFx0XHRcdFx0e2NvbnRlbnR9XHJcblx0XHRcdFx0XHQ8L0dyb3VwPlxyXG5cdFx0XHRcdClcclxuXHRcdFx0Y3VycmVudExpbmUuaGVpZ2h0PU1hdGgubWF4KGN1cnJlbnRMaW5lLmhlaWdodCxjb250ZW50SGVpZ2h0KVxyXG5cdFx0XHRjdXJyZW50TGluZS5kZXNjZW50PU1hdGgubWF4KGN1cnJlbnRMaW5lLmRlc2NlbnQsIGNvbnRlbnREZXNjZW50KVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZihhdmFpbGFibGVXaWR0aD49Y29udGVudFdpZHRoKXtcclxuICAgICAgICAgICBwdXNoKClcclxuXHRcdH1lbHNlIGlmKGF2YWlsYWJsZVdpZHRoPGNvbnRlbnRXaWR0aCl7XHJcblx0XHRcdGlmKGNvbnRlbnQudHlwZS5hYmxlRXhjZWVkKGNvbnRlbnQucHJvcHMuY2hpbGRyZW4pKXtcclxuXHRcdFx0XHRwdXNoKClcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0dGhpcy5jb21taXRDdXJyZW50TGluZSh0cnVlKVxyXG5cdFx0XHRcdHRoaXMuYXBwZW5kQ29tcG9zZWQoY29udGVudClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gICAgfVxyXG5cdFxyXG5cdGNvbW1pdEN1cnJlbnRMaW5lKG5lZWROZXdMaW5lPWZhbHNlKXtcclxuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0Y29uc3Qge3BhcmVudH09dGhpcy5jb250ZXh0XHJcblx0XHRsZXQgY3VycmVudExpbmU9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcblx0XHRcclxuXHRcdHBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudChjdXJyZW50TGluZSkpXHJcblx0XHRcclxuXHRcdGlmKG5lZWROZXdMaW5lKVxyXG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld0xpbmUoKSlcclxuXHR9XHJcblxyXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpey8vbmVlZCBhcHBlbmQgbGFzdCBub24tZnVsbC13aWR0aCBsaW5lIHRvIHBhcmVudFxyXG5cdFx0dGhpcy5jb21taXRDdXJyZW50TGluZSgpXHJcblx0XHRcclxuXHRcdHRoaXMuYXZhaWxhYmxlU3BhY2U9e3dpZHRoOjAsIGhlaWdodDowfVxyXG5cclxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXHJcblx0fVxyXG5cclxuICAgIGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcblx0XHRjb25zb2xlLmxvZyhcImFwcGVuZCBuZXcgbGluZSB0byBzZWN0aW9uXCIpXHJcbiAgICAgICAgbGV0IHtoZWlnaHQsIHdpZHRoLCBwYXJhZ3JhcGgsIC4uLm90aGVyc309cHJvcHNcclxuICAgICAgICBsZXQge3NwYWNpbmc6e2xpbmVIZWlnaHQ9XCIxMDAlXCIsdG9wPTAsIGJvdHRvbT0wfSwgaW5kZW50OntsZWZ0PTAscmlnaHQ9MCxmaXJzdExpbmU9MCxoYW5naW5nPTB9fT10aGlzLmdldFN0eWxlKClcclxuICAgICAgICBsZXQgY29udGVudFk9MCwgY29udGVudFg9bGVmdFxyXG5cclxuICAgICAgIGxpbmVIZWlnaHQ9dHlwZW9mKGxpbmVIZWlnaHQpPT0nc3RyaW5nJyA/IE1hdGguY2VpbChoZWlnaHQqcGFyc2VJbnQobGluZUhlaWdodCkvMTAwLjApOiBsaW5lSGVpZ2h0XHJcblxyXG4gICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0xKXsvL2ZpcnN0IGxpbmVcclxuICAgICAgICAgICAgbGluZUhlaWdodCs9dG9wXHJcbiAgICAgICAgICAgIGNvbnRlbnRZKz10b3BcclxuXHRcdFx0Y29udGVudFgrPWZpcnN0TGluZVxyXG4gICAgICAgIH1lbHNle1xyXG5cdFx0XHRjb250ZW50WCs9aGFuZ2luZ1xyXG5cdFx0fVxyXG5cclxuICAgICAgICBpZih0aGlzLmlzQWxsQ2hpbGRyZW5Db21wb3NlZCgpKXsvL2xhc3QgbGluZVxyXG4gICAgICAgICAgICBsaW5lSGVpZ2h0Kz1ib3R0b21cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmF2YWlsYWJsZVNwYWNlLmhlaWdodC09bGluZUhlaWdodFxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8R3JvdXAgaGVpZ2h0PXtsaW5lSGVpZ2h0fSB3aWR0aD17d2lkdGh9PlxyXG4gICAgICAgICAgICAgICAgPEdyb3VwIHg9e2NvbnRlbnRYfSB5PXtjb250ZW50WX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpbmUgd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gey4uLm90aGVyc30vPlxyXG4gICAgICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3R5bGUoKXtcclxuICAgICAgICBpZih0aGlzLl9zdHlsZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlXHJcbiAgICAgICAgbGV0IHNwYWNpbmc9dGhpcy5zdHlsZSgncFByLnNwYWNpbmcnKXx8e31cclxuICAgICAgICBsZXQgaW5kZW50PXRoaXMuc3R5bGUoJ3BQci5pbmQnKXx8e31cclxuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU9e3NwYWNpbmcsaW5kZW50fVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdC4uLlN1cGVyLmNvbnRleHRUeXBlc1xyXG5cdFx0LGdldERlZmF1bHRTdHlsZTogUHJvcFR5cGVzLmZ1bmNcclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBMaW5lSW5mb3tcclxuXHRjb25zdHJ1Y3Rvcih3aWR0aCxwKXtcclxuXHRcdHRoaXMucGFyYWdyYXBoPXBcclxuXHRcdHRoaXMud2lkdGg9d2lkdGhcclxuXHRcdHRoaXMuaGVpZ2h0PTBcclxuXHRcdHRoaXMuZGVzY2VudD0wXHJcblx0XHR0aGlzLmNoaWxkcmVuPVtdXHJcblx0fVxyXG5cdFxyXG5cdHJvbGxiYWNrKHt0eXBlfSl7XHJcblx0XHRsZXQgcmVtb3ZlZD1bXVxyXG5cdFx0Zm9yKGxldCBpPXRoaXMuY2hpbGRyZW4ubGVuZ3RoLTE7aT4tMTtpLS0pe1xyXG5cdFx0XHRsZXQgZ3JvdXA9dGhpcy5jaGlsZHJlbltpXVxyXG5cdFx0XHRsZXQgdGV4dD1ncm91cC5wcm9wcy5jaGlsZHJlblxyXG5cdFx0XHRsZXQge3dpZHRoLGNoaWxkcmVuOnBpZWNlc309dGV4dC5wcm9wc1xyXG5cclxuXHRcdFx0bGV0IGo9cGllY2VzLmxlbmd0aC0xIFxyXG5cdFx0XHRmb3IoO2o+LTE7ai0tKXtcclxuXHRcdFx0XHRsZXQgY2hhcnM9cGllY2VzW2pdXHJcblx0XHRcdFx0aWYoY2hhcnMudHlwZSE9dHlwZSl7XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0aWYoaj09LTEpe1xyXG5cdFx0XHRcdHJlbW92ZWQudW5zaGlmdCh0aGlzLmNoaWxkcmVuLnBvcCgpLnByb3BzLmNoaWxkcmVuKVxyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9ZWxzZSBpZihqPT1waWVjZXMubGVuZ3RoLTEpe1xyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdH1lbHNlIHtcclxuXHRcdFx0XHRsZXQgcmVtb3ZlZD1waWVjZXMuc3BsaWNlKGopXHJcblx0XHRcdFx0dGV4dD1SZWFjdC5jbG9uZUVsZW1lbnQodGV4dCx7Y2hpbGRyZW46cGllY2VzLCB3aWR0aDpwaWVjZXMucmVkdWNlKCh3LHt3aWR0aH0pPT53K3dpZHRoLDApfSlcclxuXHRcdFx0XHR0aGlzLmNoaWxkcmVuW2ldPVJlYWN0LmNsb25lRWxlbWVudChncm91cCx7Y2hpbGRyZW46dGV4dCx3aWR0aDp0ZXh0LnByb3BzLndpZHRofSlcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgd2lkdGg9cmVtb3ZlZC5yZWR1Y2UoKHcse3dpZHRofSk9Pncrd2lkdGgsMClcclxuXHRcdFx0XHRyZW1vdmVkLnVuc2hpZnQoUmVhY3QuY2xvbmVFbGVtZW50KHRleHQse2NoaWxkcmVuOnJlbW92ZWQsd2lkdGh9KSlcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wYXJhZ3JhcGguY29tbWl0Q3VycmVudExpbmUodHJ1ZSlcclxuXHRcdFxyXG5cdFx0cmVtb3ZlZC5tYXAoYT0+dGhpcy5wYXJhZ3JhcGguYXBwZW5kQ29tcG9zZWQoYSkpXHJcblx0fVxyXG5cdFxyXG5cdGNvbW1pdChuZWVkTmV3TGluZSl7XHJcblx0XHR0aGlzLnBhcmFncmFwaC5jb21taXRDdXJyZW50TGluZShuZWVkTmV3TGluZSlcclxuXHR9XHJcblx0XHJcblx0Y2FuU2VwZXJhdGVXaXRoKHt0eXBlfSl7XHJcblx0XHRpZih0aGlzLmNoaWxkcmVuLmxlbmd0aD09MClcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFxyXG5cdFx0bGV0IGdyb3VwPXRoaXMuY2hpbGRyZW5bdGhpcy5jaGlsZHJlbi5sZW5ndGgtMV1cclxuXHRcdGxldCB0ZXh0PWdyb3VwLnByb3BzLmNoaWxkcmVuXHJcblx0XHRsZXQgcGllY2VzPXRleHQucHJvcHMuY2hpbGRyZW5cclxuXHRcdGxldCBsYXN0UGllY2U9cGllY2VzW3BpZWNlcy5sZW5ndGgtMV1cclxuXHRcdHJldHVybiB0eXBlLmNhblNlcGVyYXRlV2l0aChsYXN0UGllY2UudHlwZSlcclxuXHR9XHJcblx0XHJcblx0YWxsQ2FudFNlcGVyYXRlV2l0aCh7dHlwZX0pe1xyXG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ucmVkdWNlKChjYW50U2VwZXJhdGUse3Byb3BzOntjaGlsZHJlbjp0ZXh0fX0pPT57XHJcblx0XHRcdGlmKCFjYW50U2VwZXJhdGUpXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGV4dC5wcm9wcy5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLGEpPT57XHJcblx0XHRcdFx0aWYoIXN0YXRlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcblx0XHRcdFx0cmV0dXJuICF0eXBlLmNhblNlcGVyYXRlV2l0aChhLnR5cGUpXHJcblx0XHRcdH0sdHJ1ZSlcclxuXHRcdFx0XHJcblx0XHR9LHRydWUpXHJcblx0fVxyXG5cdFxyXG59XHJcbiJdfQ==