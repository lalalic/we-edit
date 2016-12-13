"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _header = require("./header");

var _header2 = _interopRequireDefault(_header);

var _footer = require("./footer");

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Section = function (_Any) {
	(0, _inherits3.default)(Section, _Any);

	function Section() {
		(0, _classCallCheck3.default)(this, Section);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Section.__proto__ || (0, _getPrototypeOf2.default)(Section)).apply(this, arguments));

		_this.computed.headers = {};
		_this.computed.footers = {};
		return _this;
	}

	/**
  * i: column no
  */


	(0, _createClass3.default)(Section, [{
		key: "_newColumn",
		value: function _newColumn(i) {
			var _props = this.props,
			    _props$pgSz = _props.pgSz,
			    width = _props$pgSz.width,
			    height = _props$pgSz.height,
			    _props$pgMar = _props.pgMar,
			    top = _props$pgMar.top,
			    bottom = _props$pgMar.bottom,
			    left = _props$pgMar.left,
			    right = _props$pgMar.right,
			    _props$cols = _props.cols,
			    _props$cols$num = _props$cols.num,
			    num = _props$cols$num === undefined ? 1 : _props$cols$num,
			    space = _props$cols.space,
			    data = _props$cols.data;

			var info = {
				y: 0,
				height: height - bottom - top,
				children: []
			};
			var availableWidth = width - left - right;

			if (num == 1) {
				info.width = availableWidth;
				info.x = 0;
			} else if (data) {
				info.x = data.reduce(function (p, a, j) {
					return j < i ? p + a.width + a.space : p;
				}, 0);
				info.width = data[i].width;
			} else {
				var colWidth = (availableWidth - (num - 1) * space) / num;
				info.x = i * (colWidth + space);
				info.width = colWidth;
			}
			return info;
		}

		/**
   * i : page No, for first, even, odd page
   */

	}, {
		key: "_newPage",
		value: function _newPage(i) {
			var _props2 = this.props,
			    size = _props2.pgSz,
			    margin = _props2.pgMar;

			var pageNo = this.computed.composed.length + 1;
			var headerEl = this.getPageHeaderFooter('header', pageNo);
			var footerEl = this.getPageHeaderFooter('footer', pageNo);
			var info = {
				size: size,
				margin: margin,
				columns: [this._newColumn(0)],
				header: headerEl ? headerEl.createComposed2Parent() : null,
				footer: footerEl ? footerEl.createComposed2Parent() : null
			};
			return info;
		}
	}, {
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var required = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var _required$width = required.width,
			    minRequiredW = _required$width === undefined ? 0 : _required$width,
			    _required$height = required.height,
			    minRequiredH = _required$height === undefined ? 0 : _required$height;
			var composed = this.computed.composed;

			if (composed.length == 0) this.computed.composed.push(this._newPage());
			var _props$cols$num2 = this.props.cols.num,
			    allowedColumns = _props$cols$num2 === undefined ? 1 : _props$cols$num2;

			var currentPage = composed[composed.length - 1];
			var _currentPage = currentPage,
			    columns = _currentPage.columns;

			var currentColumn = columns[columns.length - 1];
			var _currentColumn = currentColumn,
			    width = _currentColumn.width,
			    height = _currentColumn.height,
			    children = _currentColumn.children;

			var availableHeight = children.reduce(function (prev, a) {
				return prev - a.props.height;
			}, height);

			//@TODO: what if never can find min area
			while (availableHeight <= minRequiredH || width < minRequiredW) {
				if (allowedColumns > columns.length) {
					// new column
					columns.push(currentColumn = this._newColumn(columns.length));
				} else {
					//new page
					composed.push(currentPage = this._newPage(composed.length));
					currentColumn = currentPage.columns[0];
				}
				width = currentColumn.width;
				height = currentColumn.height;
				availableHeight = currentColumn.height;
			}
			return { width: width, height: availableHeight };
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(line) {
			var composed = this.computed.composed;
			var _props$cols$num3 = this.props.cols.num,
			    allowedColumns = _props$cols$num3 === undefined ? 1 : _props$cols$num3;

			var currentPage = composed[composed.length - 1];
			var _currentPage2 = currentPage,
			    columns = _currentPage2.columns;

			var currentColumn = columns[columns.length - 1];
			var _currentColumn2 = currentColumn,
			    width = _currentColumn2.width,
			    height = _currentColumn2.height,
			    children = _currentColumn2.children;

			var availableHeight = children.reduce(function (prev, a) {
				return prev - a.props.height;
			}, height);

			var contentHeight = line.props.height;


			if (contentHeight > availableHeight) {
				if (allowedColumns > columns.length) {
					// new column
					columns.push(currentColumn = this._newColumn(columns.length));
				} else {
					//new page
					this.context.parent.appendComposed(currentPage);
					composed.push(currentPage = this._newPage(composed.length));
					currentColumn = currentPage.columns[0];
				}
				availableHeight = currentColumn.height;

				//@TODO: what if currentColumn.width!=line.width

				children = currentColumn.children;
			}

			children.push(this.createComposed2Parent({ children: line, height: contentHeight, y: height - availableHeight }));
			//@TODO: what if contentHeight still > availableHeight
		}

		/**
   *  section needn't append to document, but give chance for extension
   */

	}, {
		key: "createComposed2Parent",
		value: function createComposed2Parent(props) {
			return _react2.default.createElement(_group2.default, props);
		}

		//check http://officeopenxml.com/WPsectionFooterReference.php

	}, {
		key: "getPageHeaderFooter",
		value: function getPageHeaderFooter(category, pageNo) {
			category = this.computed[category + "s"];
			var type = pageNo == 1 && this.props.titlePg != undefined ? 'first' : pageNo % 2 == 0 ? 'even' : 'default';
			var target = category[type];
			if (target) return target;

			var prev = this.context.prevSibling(this);
			switch (type) {
				case 'first':
					if (this.props.titlePg != undefined) {
						if (prev) {
							return prev.getPageHeaderFooter.apply(prev, arguments);
						} else {
							return null;
						}
					} else {
						return category['default']; //or inherited odd
					}
					break;
				case 'even':
					if (this.context.parent.props.settings.get('settings.evenAndOddHeaders') != undefined) {
						if (prev) {
							return prev.getPageHeaderFooter.apply(prev, arguments);
						} else {
							return null;
						}
					} else {
						return category['default']; //or inherited odd
					}
					break;
				default:
					if (prev) return prev.getPageHeaderFooter.apply(prev, arguments);else return null;
					break;
			}
		}
	}, {
		key: "on1ChildComposed",
		value: function on1ChildComposed(child) {
			(0, _get3.default)(Section.prototype.__proto__ || (0, _getPrototypeOf2.default)(Section.prototype), "on1ChildComposed", this).apply(this, arguments);
			if (child instanceof _footer2.default) {
				this.computed.footers[child.props.type] = child;
			} else if (child instanceof _header2.default) {
				this.computed.headers[child.props.type] = child;
			}
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			//don't check, and document will check against last page
			this.context.parent.appendComposed(this.computed.composed[this.computed.composed.length - 1]);
			(0, _get3.default)(Section.prototype.__proto__ || (0, _getPrototypeOf2.default)(Section.prototype), "onAllChildrenComposed", this).call(this);
		}
	}]);
	return Section;
}(_any2.default);

Section.displayName = "section";
Section.defaultProps = {
	pgSz: {
		width: 300,
		height: 400
	},
	pgMar: {
		left: 20,
		right: 20,
		top: 20,
		bottom: 20,

		header: 10,
		footer: 10,

		gutter: 0
	}
};
Section.propTypes = {
	pgSz: _react.PropTypes.shape({
		width: _react.PropTypes.number.isRequired,
		height: _react.PropTypes.number.isRequired
	}),
	pgMar: _react.PropTypes.shape({
		left: _react.PropTypes.number,
		right: _react.PropTypes.number,
		top: _react.PropTypes.number,
		bottom: _react.PropTypes.number,

		header: _react.PropTypes.number,
		footer: _react.PropTypes.number,

		gutter: _react.PropTypes.number
	}),
	cols: _react.PropTypes.object
};
exports.default = Section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOlsiU2VjdGlvbiIsImFyZ3VtZW50cyIsImNvbXB1dGVkIiwiaGVhZGVycyIsImZvb3RlcnMiLCJpIiwicHJvcHMiLCJwZ1N6Iiwid2lkdGgiLCJoZWlnaHQiLCJwZ01hciIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImNvbHMiLCJudW0iLCJzcGFjZSIsImRhdGEiLCJpbmZvIiwieSIsImNoaWxkcmVuIiwiYXZhaWxhYmxlV2lkdGgiLCJ4IiwicmVkdWNlIiwicCIsImEiLCJqIiwiY29sV2lkdGgiLCJzaXplIiwibWFyZ2luIiwicGFnZU5vIiwiY29tcG9zZWQiLCJsZW5ndGgiLCJoZWFkZXJFbCIsImdldFBhZ2VIZWFkZXJGb290ZXIiLCJmb290ZXJFbCIsImNvbHVtbnMiLCJfbmV3Q29sdW1uIiwiaGVhZGVyIiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwiZm9vdGVyIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJtaW5SZXF1aXJlZEgiLCJwdXNoIiwiX25ld1BhZ2UiLCJhbGxvd2VkQ29sdW1ucyIsImN1cnJlbnRQYWdlIiwiY3VycmVudENvbHVtbiIsImF2YWlsYWJsZUhlaWdodCIsInByZXYiLCJsaW5lIiwiY29udGVudEhlaWdodCIsImNvbnRleHQiLCJwYXJlbnQiLCJhcHBlbmRDb21wb3NlZCIsImNhdGVnb3J5IiwidHlwZSIsInRpdGxlUGciLCJ1bmRlZmluZWQiLCJ0YXJnZXQiLCJwcmV2U2libGluZyIsInNldHRpbmdzIiwiZ2V0IiwiY2hpbGQiLCJkaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyIsImd1dHRlciIsInByb3BUeXBlcyIsInNoYXBlIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7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QUFMLENBQWM4QixRQUFkLENBQXVCQyxNQUF2QixHQUE4QixDQUFyRCxDQUFuQztBQUNBO0FBQ0g7Ozs7O0FBMUtnQmpDLE8sQ0FDVmtFLFcsR0FBWSxTO0FBREZsRSxPLENBNEtibUUsWSxHQUFhO0FBQ25CNUQsT0FBTTtBQUNMQyxTQUFPLEdBREY7QUFFTEMsVUFBUTtBQUZILEVBRGE7QUFLbkJDLFFBQU07QUFDTEcsUUFBSyxFQURBO0FBRUxDLFNBQU0sRUFGRDtBQUdMSCxPQUFJLEVBSEM7QUFJTEMsVUFBTyxFQUpGOztBQU1MMkIsVUFBTyxFQU5GO0FBT0xFLFVBQU8sRUFQRjs7QUFTTDJCLFVBQU87QUFURjtBQUxhLEM7QUE1S0FwRSxPLENBOExicUUsUyxHQUFVO0FBQ2hCOUQsT0FBTSxpQkFBVStELEtBQVYsQ0FBZ0I7QUFDckI5RCxTQUFPLGlCQUFVK0QsTUFBVixDQUFpQkMsVUFESDtBQUVyQi9ELFVBQVEsaUJBQVU4RCxNQUFWLENBQWlCQztBQUZKLEVBQWhCLENBRFU7QUFLaEI5RCxRQUFPLGlCQUFVNEQsS0FBVixDQUFnQjtBQUN0QnpELFFBQU0saUJBQVUwRCxNQURNO0FBRXRCekQsU0FBTyxpQkFBVXlELE1BRks7QUFHdEI1RCxPQUFLLGlCQUFVNEQsTUFITztBQUl0QjNELFVBQVEsaUJBQVUyRCxNQUpJOztBQU10QmhDLFVBQVEsaUJBQVVnQyxNQU5JO0FBT3RCOUIsVUFBUSxpQkFBVThCLE1BUEk7O0FBU3RCSCxVQUFRLGlCQUFVRztBQVRJLEVBQWhCLENBTFM7QUFnQmhCeEQsT0FBTSxpQkFBVTBEO0FBaEJBLEM7a0JBOUxHekUsTyIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5cbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi9oZWFkZXJcIlxuaW1wb3J0IEZvb3RlciBmcm9tIFwiLi9mb290ZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgQW55e1xuICAgIHN0YXRpYyBkaXNwbGF5TmFtZT1cInNlY3Rpb25cIlxuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmNvbXB1dGVkLmhlYWRlcnM9e31cblx0XHR0aGlzLmNvbXB1dGVkLmZvb3RlcnM9e31cblx0fVxuXG4gICAgLyoqXG4gICAgICogaTogY29sdW1uIG5vXG4gICAgICovXG4gICAgX25ld0NvbHVtbihpKXtcblx0XHRjb25zdCB7cGdTejp7d2lkdGgsIGhlaWdodH0sICBwZ01hcjp7dG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0fSwgY29sczp7bnVtPTEsIHNwYWNlLCBkYXRhfX09dGhpcy5wcm9wc1xuXHRcdGxldCBpbmZvPXtcblx0XHRcdHk6MCxcblx0XHRcdGhlaWdodDpoZWlnaHQtYm90dG9tLXRvcCxcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXG5cdFx0fVxuXHRcdGxldCBhdmFpbGFibGVXaWR0aD13aWR0aC1sZWZ0LXJpZ2h0XG5cblx0XHRpZihudW09PTEpe1xuXHRcdFx0aW5mby53aWR0aD1hdmFpbGFibGVXaWR0aFxuXHRcdFx0aW5mby54PTBcblx0XHR9ZWxzZSBpZihkYXRhKXtcblx0XHRcdGluZm8ueD1kYXRhLnJlZHVjZSgocCwgYSwgaik9PihqPGkgPyBwK2Eud2lkdGgrYS5zcGFjZSA6IHApLDApXG5cdFx0XHRpbmZvLndpZHRoPWRhdGFbaV0ud2lkdGhcblx0XHR9ZWxzZXtcblx0XHRcdGxldCBjb2xXaWR0aD0oYXZhaWxhYmxlV2lkdGgtKG51bS0xKSpzcGFjZSkvbnVtXG5cdFx0XHRpbmZvLng9aSooY29sV2lkdGgrc3BhY2UpXG5cdFx0XHRpbmZvLndpZHRoPWNvbFdpZHRoXG5cdFx0fVxuXHRcdHJldHVybiBpbmZvXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogaSA6IHBhZ2UgTm8sIGZvciBmaXJzdCwgZXZlbiwgb2RkIHBhZ2VcbiAgICAgKi9cbiAgICBfbmV3UGFnZShpKXtcbiAgICAgICAgY29uc3Qge3BnU3o6c2l6ZSwgIHBnTWFyOm1hcmdpbn09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHBhZ2VObz10aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aCsxXG5cdFx0bGV0IGhlYWRlckVsPXRoaXMuZ2V0UGFnZUhlYWRlckZvb3RlcignaGVhZGVyJyxwYWdlTm8pXG5cdFx0bGV0IGZvb3RlckVsPXRoaXMuZ2V0UGFnZUhlYWRlckZvb3RlcignZm9vdGVyJyxwYWdlTm8pXG4gICAgICAgIGxldCBpbmZvPXtcbiAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICBtYXJnaW4sXG4gICAgICAgICAgICBjb2x1bW5zOlt0aGlzLl9uZXdDb2x1bW4oMCldLFxuICAgICAgICAgICAgaGVhZGVyOiBoZWFkZXJFbCA/IGhlYWRlckVsLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCgpIDogbnVsbCxcbiAgICAgICAgICAgIGZvb3RlcjogZm9vdGVyRWwgPyBmb290ZXJFbC5jcmVhdGVDb21wb3NlZDJQYXJlbnQoKSA6IG51bGxcbiAgICAgICAgfVxuXHRcdHJldHVybiBpbmZvXG4gICAgfVxuXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXtcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXG5cdFx0aWYoY29tcG9zZWQubGVuZ3RoPT0wKVxuXHRcdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKHRoaXMuX25ld1BhZ2UoKSlcblx0XHRjb25zdCB7Y29sczp7bnVtOmFsbG93ZWRDb2x1bW5zPTF9fT10aGlzLnByb3BzXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgbmV2ZXIgY2FuIGZpbmQgbWluIGFyZWFcbiAgICAgICAgd2hpbGUoYXZhaWxhYmxlSGVpZ2h0PD1taW5SZXF1aXJlZEggfHwgd2lkdGg8bWluUmVxdWlyZWRXKXtcbiAgICAgICAgICAgIGlmKGFsbG93ZWRDb2x1bW5zPmNvbHVtbnMubGVuZ3RoKXsvLyBuZXcgY29sdW1uXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKGN1cnJlbnRDb2x1bW49dGhpcy5fbmV3Q29sdW1uKGNvbHVtbnMubGVuZ3RoKSlcbiAgICAgICAgICAgIH1lbHNley8vbmV3IHBhZ2Vcblx0XHRcdFx0Y29tcG9zZWQucHVzaChjdXJyZW50UGFnZT10aGlzLl9uZXdQYWdlKGNvbXBvc2VkLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aWR0aD1jdXJyZW50Q29sdW1uLndpZHRoXG4gICAgICAgICAgICBoZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGgsIGhlaWdodDphdmFpbGFibGVIZWlnaHR9XG4gICAgfVxuXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxuXHRcdGNvbnN0IHtjb2xzOntudW06YWxsb3dlZENvbHVtbnM9MX19PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgY29uc3Qge2hlaWdodDpjb250ZW50SGVpZ2h0fT1saW5lLnByb3BzXG5cblx0XHRpZihjb250ZW50SGVpZ2h0PmF2YWlsYWJsZUhlaWdodCl7XG4gICAgICAgICAgICBpZihhbGxvd2VkQ29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZChjdXJyZW50UGFnZSlcbiAgICAgICAgICAgICAgICBjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uPWN1cnJlbnRQYWdlLmNvbHVtbnNbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuXG4gICAgICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGN1cnJlbnRDb2x1bW4ud2lkdGghPWxpbmUud2lkdGhcblxuICAgICAgICAgICAgY2hpbGRyZW49Y3VycmVudENvbHVtbi5jaGlsZHJlblxuICAgICAgICB9XG5cblx0XHRjaGlsZHJlbi5wdXNoKHRoaXMuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHtjaGlsZHJlbjpsaW5lLCBoZWlnaHQ6Y29udGVudEhlaWdodCwgeTogaGVpZ2h0LWF2YWlsYWJsZUhlaWdodH0pKVxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGNvbnRlbnRIZWlnaHQgc3RpbGwgPiBhdmFpbGFibGVIZWlnaHRcbiAgICB9XG5cblx0LyoqXG5cdCAqICBzZWN0aW9uIG5lZWRuJ3QgYXBwZW5kIHRvIGRvY3VtZW50LCBidXQgZ2l2ZSBjaGFuY2UgZm9yIGV4dGVuc2lvblxuXHQgKi9cblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcblx0XHRyZXR1cm4gPEdyb3VwIHsuLi5wcm9wc30vPlxuXHR9XG5cdFxuXHQvL2NoZWNrIGh0dHA6Ly9vZmZpY2VvcGVueG1sLmNvbS9XUHNlY3Rpb25Gb290ZXJSZWZlcmVuY2UucGhwXG5cdGdldFBhZ2VIZWFkZXJGb290ZXIoY2F0ZWdvcnksIHBhZ2VObyl7XG5cdFx0Y2F0ZWdvcnk9dGhpcy5jb21wdXRlZFtgJHtjYXRlZ29yeX1zYF1cblx0XHRsZXQgdHlwZT1wYWdlTm89PTEmJnRoaXMucHJvcHMudGl0bGVQZyE9dW5kZWZpbmVkID8gJ2ZpcnN0JyA6IChwYWdlTm8lMj09MCA/ICdldmVuJyA6ICdkZWZhdWx0Jylcblx0XHRsZXQgdGFyZ2V0PWNhdGVnb3J5W3R5cGVdXG5cdFx0aWYodGFyZ2V0KVxuXHRcdFx0cmV0dXJuIHRhcmdldFxuXHRcdFxuXHRcdGxldCBwcmV2PXRoaXMuY29udGV4dC5wcmV2U2libGluZyh0aGlzKVxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlICdmaXJzdCc6XG5cdFx0XHRpZih0aGlzLnByb3BzLnRpdGxlUGchPXVuZGVmaW5lZCl7XG5cdFx0XHRcdGlmKHByZXYpe1xuXHRcdFx0XHRcdHJldHVybiBwcmV2LmdldFBhZ2VIZWFkZXJGb290ZXIoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbFxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGNhdGVnb3J5WydkZWZhdWx0J10vL29yIGluaGVyaXRlZCBvZGRcblx0XHRcdH1cblx0XHRicmVha1xuXHRcdGNhc2UgJ2V2ZW4nOlxuXHRcdFx0aWYodGhpcy5jb250ZXh0LnBhcmVudC5wcm9wcy5zZXR0aW5ncy5nZXQoJ3NldHRpbmdzLmV2ZW5BbmRPZGRIZWFkZXJzJykhPXVuZGVmaW5lZCl7XG5cdFx0XHRcdGlmKHByZXYpe1xuXHRcdFx0XHRcdHJldHVybiBwcmV2LmdldFBhZ2VIZWFkZXJGb290ZXIoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4gbnVsbFxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGNhdGVnb3J5WydkZWZhdWx0J10vL29yIGluaGVyaXRlZCBvZGRcblx0XHRcdH1cblx0XHRicmVha1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRpZihwcmV2KVxuXHRcdFx0XHRyZXR1cm4gcHJldi5nZXRQYWdlSGVhZGVyRm9vdGVyKC4uLmFyZ3VtZW50cylcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIG51bGxcblx0XHRicmVha1xuXHRcdH1cblx0fVxuXHRcblx0b24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XG5cdFx0c3VwZXIub24xQ2hpbGRDb21wb3NlZCguLi5hcmd1bWVudHMpXG5cdFx0aWYoY2hpbGQgaW5zdGFuY2VvZiBGb290ZXIpe1xuXHRcdFx0dGhpcy5jb21wdXRlZC5mb290ZXJzW2NoaWxkLnByb3BzLnR5cGVdPWNoaWxkXG5cdFx0fWVsc2UgaWYoY2hpbGQgaW5zdGFuY2VvZiBIZWFkZXIpe1xuXHRcdFx0dGhpcy5jb21wdXRlZC5oZWFkZXJzW2NoaWxkLnByb3BzLnR5cGVdPWNoaWxkXG5cdFx0fVxuXHR9XG5cbiAgICBvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcbiAgICAgICAgLy9kb24ndCBjaGVjaywgYW5kIGRvY3VtZW50IHdpbGwgY2hlY2sgYWdhaW5zdCBsYXN0IHBhZ2VcbiAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLmNvbXB1dGVkLmNvbXBvc2VkW3RoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoLTFdKVxuICAgICAgICBzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuICAgIH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHRwZ1N6OiB7XG5cdFx0XHR3aWR0aDogMzAwLFxuXHRcdFx0aGVpZ2h0OiA0MDBcblx0XHR9LFxuXHRcdHBnTWFyOntcblx0XHRcdGxlZnQ6MjAsXG5cdFx0XHRyaWdodDoyMCxcblx0XHRcdHRvcDoyMCxcblx0XHRcdGJvdHRvbToyMCxcblxuXHRcdFx0aGVhZGVyOjEwLFxuXHRcdFx0Zm9vdGVyOjEwLFxuXG5cdFx0XHRndXR0ZXI6MFxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdHBnU3o6IFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHR3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdFx0aGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcblx0XHR9KSxcblx0XHRwZ01hcjogUHJvcFR5cGVzLnNoYXBlKHtcblx0XHRcdGxlZnQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRyaWdodDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdHRvcDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdGJvdHRvbTogUHJvcFR5cGVzLm51bWJlcixcblxuXHRcdFx0aGVhZGVyOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0Zm9vdGVyOiBQcm9wVHlwZXMubnVtYmVyLFxuXG5cdFx0XHRndXR0ZXI6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0fSksXG5cdFx0Y29sczogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG59XG4iXX0=