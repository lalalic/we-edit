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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOlsiU2VjdGlvbiIsImFyZ3VtZW50cyIsImNvbXB1dGVkIiwiaGVhZGVycyIsImZvb3RlcnMiLCJpIiwicHJvcHMiLCJwZ1N6Iiwid2lkdGgiLCJoZWlnaHQiLCJwZ01hciIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImNvbHMiLCJudW0iLCJzcGFjZSIsImRhdGEiLCJpbmZvIiwieSIsImNoaWxkcmVuIiwiYXZhaWxhYmxlV2lkdGgiLCJ4IiwicmVkdWNlIiwicCIsImEiLCJqIiwiY29sV2lkdGgiLCJzaXplIiwibWFyZ2luIiwicGFnZU5vIiwiY29tcG9zZWQiLCJsZW5ndGgiLCJoZWFkZXJFbCIsImdldFBhZ2VIZWFkZXJGb290ZXIiLCJmb290ZXJFbCIsImNvbHVtbnMiLCJfbmV3Q29sdW1uIiwiaGVhZGVyIiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwiZm9vdGVyIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJtaW5SZXF1aXJlZEgiLCJwdXNoIiwiX25ld1BhZ2UiLCJhbGxvd2VkQ29sdW1ucyIsImN1cnJlbnRQYWdlIiwiY3VycmVudENvbHVtbiIsImF2YWlsYWJsZUhlaWdodCIsInByZXYiLCJsaW5lIiwiY29udGVudEhlaWdodCIsImNvbnRleHQiLCJwYXJlbnQiLCJhcHBlbmRDb21wb3NlZCIsImNhdGVnb3J5IiwidHlwZSIsInRpdGxlUGciLCJ1bmRlZmluZWQiLCJ0YXJnZXQiLCJwcmV2U2libGluZyIsInNldHRpbmdzIiwiZ2V0IiwiY2hpbGQiLCJkaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyIsImd1dHRlciIsInByb3BUeXBlcyIsInNoYXBlIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7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QUFMLENBQWM4QixRQUFkLENBQXVCQyxNQUF2QixHQUE4QixDQUFyRCxDQUFuQztBQUNBO0FBQ0g7Ozs7O0FBMUtnQmpDLE8sQ0FDVmtFLFcsR0FBWSxTO0FBREZsRSxPLENBNEtibUUsWSxHQUFhO0FBQ25CNUQsT0FBTTtBQUNMQyxTQUFPLEdBREY7QUFFTEMsVUFBUTtBQUZILEVBRGE7QUFLbkJDLFFBQU07QUFDTEcsUUFBSyxFQURBO0FBRUxDLFNBQU0sRUFGRDtBQUdMSCxPQUFJLEVBSEM7QUFJTEMsVUFBTyxFQUpGOztBQU1MMkIsVUFBTyxFQU5GO0FBT0xFLFVBQU8sRUFQRjs7QUFTTDJCLFVBQU87QUFURjtBQUxhLEM7QUE1S0FwRSxPLENBOExicUUsUyxHQUFVO0FBQ2hCOUQsT0FBTSxpQkFBVStELEtBQVYsQ0FBZ0I7QUFDckI5RCxTQUFPLGlCQUFVK0QsTUFBVixDQUFpQkMsVUFESDtBQUVyQi9ELFVBQVEsaUJBQVU4RCxNQUFWLENBQWlCQztBQUZKLEVBQWhCLENBRFU7QUFLaEI5RCxRQUFPLGlCQUFVNEQsS0FBVixDQUFnQjtBQUN0QnpELFFBQU0saUJBQVUwRCxNQURNO0FBRXRCekQsU0FBTyxpQkFBVXlELE1BRks7QUFHdEI1RCxPQUFLLGlCQUFVNEQsTUFITztBQUl0QjNELFVBQVEsaUJBQVUyRCxNQUpJOztBQU10QmhDLFVBQVEsaUJBQVVnQyxNQU5JO0FBT3RCOUIsVUFBUSxpQkFBVThCLE1BUEk7O0FBU3RCSCxVQUFRLGlCQUFVRztBQVRJLEVBQWhCLENBTFM7QUFnQmhCeEQsT0FBTSxpQkFBVTBEO0FBaEJBLEM7a0JBOUxHekUsTyIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcclxuXHJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxyXG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuL2hlYWRlclwiXHJcbmltcG9ydCBGb290ZXIgZnJvbSBcIi4vZm9vdGVyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBBbnl7XHJcbiAgICBzdGF0aWMgZGlzcGxheU5hbWU9XCJzZWN0aW9uXCJcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5jb21wdXRlZC5oZWFkZXJzPXt9XHJcblx0XHR0aGlzLmNvbXB1dGVkLmZvb3RlcnM9e31cclxuXHR9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpOiBjb2x1bW4gbm9cclxuICAgICAqL1xyXG4gICAgX25ld0NvbHVtbihpKXtcclxuXHRcdGNvbnN0IHtwZ1N6Ont3aWR0aCwgaGVpZ2h0fSwgIHBnTWFyOnt0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHR9LCBjb2xzOntudW09MSwgc3BhY2UsIGRhdGF9fT10aGlzLnByb3BzXHJcblx0XHRsZXQgaW5mbz17XHJcblx0XHRcdHk6MCxcclxuXHRcdFx0aGVpZ2h0OmhlaWdodC1ib3R0b20tdG9wLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxyXG5cdFx0fVxyXG5cdFx0bGV0IGF2YWlsYWJsZVdpZHRoPXdpZHRoLWxlZnQtcmlnaHRcclxuXHJcblx0XHRpZihudW09PTEpe1xyXG5cdFx0XHRpbmZvLndpZHRoPWF2YWlsYWJsZVdpZHRoXHJcblx0XHRcdGluZm8ueD0wXHJcblx0XHR9ZWxzZSBpZihkYXRhKXtcclxuXHRcdFx0aW5mby54PWRhdGEucmVkdWNlKChwLCBhLCBqKT0+KGo8aSA/IHArYS53aWR0aCthLnNwYWNlIDogcCksMClcclxuXHRcdFx0aW5mby53aWR0aD1kYXRhW2ldLndpZHRoXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IGNvbFdpZHRoPShhdmFpbGFibGVXaWR0aC0obnVtLTEpKnNwYWNlKS9udW1cclxuXHRcdFx0aW5mby54PWkqKGNvbFdpZHRoK3NwYWNlKVxyXG5cdFx0XHRpbmZvLndpZHRoPWNvbFdpZHRoXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaW5mb1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogaSA6IHBhZ2UgTm8sIGZvciBmaXJzdCwgZXZlbiwgb2RkIHBhZ2VcclxuICAgICAqL1xyXG4gICAgX25ld1BhZ2UoaSl7XHJcbiAgICAgICAgY29uc3Qge3BnU3o6c2l6ZSwgIHBnTWFyOm1hcmdpbn09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3QgcGFnZU5vPXRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoKzFcclxuXHRcdGxldCBoZWFkZXJFbD10aGlzLmdldFBhZ2VIZWFkZXJGb290ZXIoJ2hlYWRlcicscGFnZU5vKVxyXG5cdFx0bGV0IGZvb3RlckVsPXRoaXMuZ2V0UGFnZUhlYWRlckZvb3RlcignZm9vdGVyJyxwYWdlTm8pXHJcbiAgICAgICAgbGV0IGluZm89e1xyXG4gICAgICAgICAgICBzaXplLFxyXG4gICAgICAgICAgICBtYXJnaW4sXHJcbiAgICAgICAgICAgIGNvbHVtbnM6W3RoaXMuX25ld0NvbHVtbigwKV0sXHJcbiAgICAgICAgICAgIGhlYWRlcjogaGVhZGVyRWwgPyBoZWFkZXJFbC5jcmVhdGVDb21wb3NlZDJQYXJlbnQoKSA6IG51bGwsXHJcbiAgICAgICAgICAgIGZvb3RlcjogZm9vdGVyRWwgPyBmb290ZXJFbC5jcmVhdGVDb21wb3NlZDJQYXJlbnQoKSA6IG51bGxcclxuICAgICAgICB9XHJcblx0XHRyZXR1cm4gaW5mb1xyXG4gICAgfVxyXG5cclxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XHJcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcclxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcclxuXHRcdGlmKGNvbXBvc2VkLmxlbmd0aD09MClcclxuXHRcdFx0dGhpcy5jb21wdXRlZC5jb21wb3NlZC5wdXNoKHRoaXMuX25ld1BhZ2UoKSlcclxuXHRcdGNvbnN0IHtjb2xzOntudW06YWxsb3dlZENvbHVtbnM9MX19PXRoaXMucHJvcHNcclxuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXHJcbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxyXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cclxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cclxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxyXG5cclxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIG5ldmVyIGNhbiBmaW5kIG1pbiBhcmVhXHJcbiAgICAgICAgd2hpbGUoYXZhaWxhYmxlSGVpZ2h0PD1taW5SZXF1aXJlZEggfHwgd2lkdGg8bWluUmVxdWlyZWRXKXtcclxuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXHJcbiAgICAgICAgICAgIH1lbHNley8vbmV3IHBhZ2VcclxuXHRcdFx0XHRjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdpZHRoPWN1cnJlbnRDb2x1bW4ud2lkdGhcclxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xyXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0Y29uc3Qge2NvbHM6e251bTphbGxvd2VkQ29sdW1ucz0xfX09dGhpcy5wcm9wc1xyXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXHJcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxyXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxyXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXHJcblxyXG4gICAgICAgIGNvbnN0IHtoZWlnaHQ6Y29udGVudEhlaWdodH09bGluZS5wcm9wc1xyXG5cclxuXHRcdGlmKGNvbnRlbnRIZWlnaHQ+YXZhaWxhYmxlSGVpZ2h0KXtcclxuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXHJcbiAgICAgICAgICAgIH1lbHNley8vbmV3IHBhZ2VcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoY3VycmVudFBhZ2UpXHJcbiAgICAgICAgICAgICAgICBjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxyXG5cclxuICAgICAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjdXJyZW50Q29sdW1uLndpZHRoIT1saW5lLndpZHRoXHJcblxyXG4gICAgICAgICAgICBjaGlsZHJlbj1jdXJyZW50Q29sdW1uLmNoaWxkcmVuXHJcbiAgICAgICAgfVxyXG5cclxuXHRcdGNoaWxkcmVuLnB1c2godGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoe2NoaWxkcmVuOmxpbmUsIGhlaWdodDpjb250ZW50SGVpZ2h0LCB5OiBoZWlnaHQtYXZhaWxhYmxlSGVpZ2h0fSkpXHJcbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjb250ZW50SGVpZ2h0IHN0aWxsID4gYXZhaWxhYmxlSGVpZ2h0XHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBzZWN0aW9uIG5lZWRuJ3QgYXBwZW5kIHRvIGRvY3VtZW50LCBidXQgZ2l2ZSBjaGFuY2UgZm9yIGV4dGVuc2lvblxyXG5cdCAqL1xyXG5cdGNyZWF0ZUNvbXBvc2VkMlBhcmVudChwcm9wcyl7XHJcblx0XHRyZXR1cm4gPEdyb3VwIHsuLi5wcm9wc30vPlxyXG5cdH1cclxuXHRcclxuXHQvL2NoZWNrIGh0dHA6Ly9vZmZpY2VvcGVueG1sLmNvbS9XUHNlY3Rpb25Gb290ZXJSZWZlcmVuY2UucGhwXHJcblx0Z2V0UGFnZUhlYWRlckZvb3RlcihjYXRlZ29yeSwgcGFnZU5vKXtcclxuXHRcdGNhdGVnb3J5PXRoaXMuY29tcHV0ZWRbYCR7Y2F0ZWdvcnl9c2BdXHJcblx0XHRsZXQgdHlwZT1wYWdlTm89PTEmJnRoaXMucHJvcHMudGl0bGVQZyE9dW5kZWZpbmVkID8gJ2ZpcnN0JyA6IChwYWdlTm8lMj09MCA/ICdldmVuJyA6ICdkZWZhdWx0JylcclxuXHRcdGxldCB0YXJnZXQ9Y2F0ZWdvcnlbdHlwZV1cclxuXHRcdGlmKHRhcmdldClcclxuXHRcdFx0cmV0dXJuIHRhcmdldFxyXG5cdFx0XHJcblx0XHRsZXQgcHJldj10aGlzLmNvbnRleHQucHJldlNpYmxpbmcodGhpcylcclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdGNhc2UgJ2ZpcnN0JzpcclxuXHRcdFx0aWYodGhpcy5wcm9wcy50aXRsZVBnIT11bmRlZmluZWQpe1xyXG5cdFx0XHRcdGlmKHByZXYpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHByZXYuZ2V0UGFnZUhlYWRlckZvb3RlciguLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0cmV0dXJuIGNhdGVnb3J5WydkZWZhdWx0J10vL29yIGluaGVyaXRlZCBvZGRcclxuXHRcdFx0fVxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgJ2V2ZW4nOlxyXG5cdFx0XHRpZih0aGlzLmNvbnRleHQucGFyZW50LnByb3BzLnNldHRpbmdzLmdldCgnc2V0dGluZ3MuZXZlbkFuZE9kZEhlYWRlcnMnKSE9dW5kZWZpbmVkKXtcclxuXHRcdFx0XHRpZihwcmV2KXtcclxuXHRcdFx0XHRcdHJldHVybiBwcmV2LmdldFBhZ2VIZWFkZXJGb290ZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHJldHVybiBjYXRlZ29yeVsnZGVmYXVsdCddLy9vciBpbmhlcml0ZWQgb2RkXHJcblx0XHRcdH1cclxuXHRcdGJyZWFrXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRpZihwcmV2KVxyXG5cdFx0XHRcdHJldHVybiBwcmV2LmdldFBhZ2VIZWFkZXJGb290ZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdG9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpe1xyXG5cdFx0c3VwZXIub24xQ2hpbGRDb21wb3NlZCguLi5hcmd1bWVudHMpXHJcblx0XHRpZihjaGlsZCBpbnN0YW5jZW9mIEZvb3Rlcil7XHJcblx0XHRcdHRoaXMuY29tcHV0ZWQuZm9vdGVyc1tjaGlsZC5wcm9wcy50eXBlXT1jaGlsZFxyXG5cdFx0fWVsc2UgaWYoY2hpbGQgaW5zdGFuY2VvZiBIZWFkZXIpe1xyXG5cdFx0XHR0aGlzLmNvbXB1dGVkLmhlYWRlcnNbY2hpbGQucHJvcHMudHlwZV09Y2hpbGRcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gICAgb25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XHJcbiAgICAgICAgLy9kb24ndCBjaGVjaywgYW5kIGRvY3VtZW50IHdpbGwgY2hlY2sgYWdhaW5zdCBsYXN0IHBhZ2VcclxuICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY29tcHV0ZWQuY29tcG9zZWRbdGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGgtMV0pXHJcbiAgICAgICAgc3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcclxuICAgIH1cclxuXHJcblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XHJcblx0XHRwZ1N6OiB7XHJcblx0XHRcdHdpZHRoOiAzMDAsXHJcblx0XHRcdGhlaWdodDogNDAwXHJcblx0XHR9LFxyXG5cdFx0cGdNYXI6e1xyXG5cdFx0XHRsZWZ0OjIwLFxyXG5cdFx0XHRyaWdodDoyMCxcclxuXHRcdFx0dG9wOjIwLFxyXG5cdFx0XHRib3R0b206MjAsXHJcblxyXG5cdFx0XHRoZWFkZXI6MTAsXHJcblx0XHRcdGZvb3RlcjoxMCxcclxuXHJcblx0XHRcdGd1dHRlcjowXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcclxuXHRcdHBnU3o6IFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcblx0XHRcdGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXHJcblx0XHR9KSxcclxuXHRcdHBnTWFyOiBQcm9wVHlwZXMuc2hhcGUoe1xyXG5cdFx0XHRsZWZ0OiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0XHRyaWdodDogUHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFx0dG9wOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0XHRib3R0b206IFByb3BUeXBlcy5udW1iZXIsXHJcblxyXG5cdFx0XHRoZWFkZXI6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRcdGZvb3RlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHJcblx0XHRcdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHRcdH0pLFxyXG5cdFx0Y29sczogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufVxyXG4iXX0=