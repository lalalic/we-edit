"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = function (_Any) {
	_inherits(Section, _Any);

	function Section() {
		_classCallCheck(this, Section);

		var _this = _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).apply(this, arguments));

		_this.computed.headers = {};
		_this.computed.footers = {};
		return _this;
	}

	/**
  * i: column no
  */


	_createClass(Section, [{
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
			_get(Section.prototype.__proto__ || Object.getPrototypeOf(Section.prototype), "on1ChildComposed", this).apply(this, arguments);
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
			_get(Section.prototype.__proto__ || Object.getPrototypeOf(Section.prototype), "onAllChildrenComposed", this).call(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOlsiU2VjdGlvbiIsImFyZ3VtZW50cyIsImNvbXB1dGVkIiwiaGVhZGVycyIsImZvb3RlcnMiLCJpIiwicHJvcHMiLCJwZ1N6Iiwid2lkdGgiLCJoZWlnaHQiLCJwZ01hciIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImNvbHMiLCJudW0iLCJzcGFjZSIsImRhdGEiLCJpbmZvIiwieSIsImNoaWxkcmVuIiwiYXZhaWxhYmxlV2lkdGgiLCJ4IiwicmVkdWNlIiwicCIsImEiLCJqIiwiY29sV2lkdGgiLCJzaXplIiwibWFyZ2luIiwicGFnZU5vIiwiY29tcG9zZWQiLCJsZW5ndGgiLCJoZWFkZXJFbCIsImdldFBhZ2VIZWFkZXJGb290ZXIiLCJmb290ZXJFbCIsImNvbHVtbnMiLCJfbmV3Q29sdW1uIiwiaGVhZGVyIiwiY3JlYXRlQ29tcG9zZWQyUGFyZW50IiwiZm9vdGVyIiwicmVxdWlyZWQiLCJtaW5SZXF1aXJlZFciLCJtaW5SZXF1aXJlZEgiLCJwdXNoIiwiX25ld1BhZ2UiLCJhbGxvd2VkQ29sdW1ucyIsImN1cnJlbnRQYWdlIiwiY3VycmVudENvbHVtbiIsImF2YWlsYWJsZUhlaWdodCIsInByZXYiLCJsaW5lIiwiY29udGVudEhlaWdodCIsImNvbnRleHQiLCJwYXJlbnQiLCJhcHBlbmRDb21wb3NlZCIsImNhdGVnb3J5IiwidHlwZSIsInRpdGxlUGciLCJ1bmRlZmluZWQiLCJ0YXJnZXQiLCJwcmV2U2libGluZyIsInNldHRpbmdzIiwiZ2V0IiwiY2hpbGQiLCJkaXNwbGF5TmFtZSIsImRlZmF1bHRQcm9wcyIsImd1dHRlciIsInByb3BUeXBlcyIsInNoYXBlIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7O0FB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ZCxDQUF1QkMsTUFBdkIsR0FBOEIsQ0FBckQsQ0FBbkM7QUFDQTtBQUNIOzs7Ozs7QUExS2dCakMsTyxDQUNWa0UsVyxHQUFZLFM7QUFERmxFLE8sQ0E0S2JtRSxZLEdBQWE7QUFDbkI1RCxPQUFNO0FBQ0xDLFNBQU8sR0FERjtBQUVMQyxVQUFRO0FBRkgsRUFEYTtBQUtuQkMsUUFBTTtBQUNMRyxRQUFLLEVBREE7QUFFTEMsU0FBTSxFQUZEO0FBR0xILE9BQUksRUFIQztBQUlMQyxVQUFPLEVBSkY7O0FBTUwyQixVQUFPLEVBTkY7QUFPTEUsVUFBTyxFQVBGOztBQVNMMkIsVUFBTztBQVRGO0FBTGEsQztBQTVLQXBFLE8sQ0E4TGJxRSxTLEdBQVU7QUFDaEI5RCxPQUFNLGlCQUFVK0QsS0FBVixDQUFnQjtBQUNyQjlELFNBQU8saUJBQVUrRCxNQUFWLENBQWlCQyxVQURIO0FBRXJCL0QsVUFBUSxpQkFBVThELE1BQVYsQ0FBaUJDO0FBRkosRUFBaEIsQ0FEVTtBQUtoQjlELFFBQU8saUJBQVU0RCxLQUFWLENBQWdCO0FBQ3RCekQsUUFBTSxpQkFBVTBELE1BRE07QUFFdEJ6RCxTQUFPLGlCQUFVeUQsTUFGSztBQUd0QjVELE9BQUssaUJBQVU0RCxNQUhPO0FBSXRCM0QsVUFBUSxpQkFBVTJELE1BSkk7O0FBTXRCaEMsVUFBUSxpQkFBVWdDLE1BTkk7QUFPdEI5QixVQUFRLGlCQUFVOEIsTUFQSTs7QUFTdEJILFVBQVEsaUJBQVVHO0FBVEksRUFBaEIsQ0FMUztBQWdCaEJ4RCxPQUFNLGlCQUFVMEQ7QUFoQkEsQztrQkE5TEd6RSxPIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxyXG5cclxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXHJcbmltcG9ydCBIZWFkZXIgZnJvbSBcIi4vaGVhZGVyXCJcclxuaW1wb3J0IEZvb3RlciBmcm9tIFwiLi9mb290ZXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIEFueXtcclxuICAgIHN0YXRpYyBkaXNwbGF5TmFtZT1cInNlY3Rpb25cIlxyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLmNvbXB1dGVkLmhlYWRlcnM9e31cclxuXHRcdHRoaXMuY29tcHV0ZWQuZm9vdGVycz17fVxyXG5cdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGk6IGNvbHVtbiBub1xyXG4gICAgICovXHJcbiAgICBfbmV3Q29sdW1uKGkpe1xyXG5cdFx0Y29uc3Qge3BnU3o6e3dpZHRoLCBoZWlnaHR9LCAgcGdNYXI6e3RvcCwgYm90dG9tLCBsZWZ0LCByaWdodH0sIGNvbHM6e251bT0xLCBzcGFjZSwgZGF0YX19PXRoaXMucHJvcHNcclxuXHRcdGxldCBpbmZvPXtcclxuXHRcdFx0eTowLFxyXG5cdFx0XHRoZWlnaHQ6aGVpZ2h0LWJvdHRvbS10b3AsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXHJcblx0XHR9XHJcblx0XHRsZXQgYXZhaWxhYmxlV2lkdGg9d2lkdGgtbGVmdC1yaWdodFxyXG5cclxuXHRcdGlmKG51bT09MSl7XHJcblx0XHRcdGluZm8ud2lkdGg9YXZhaWxhYmxlV2lkdGhcclxuXHRcdFx0aW5mby54PTBcclxuXHRcdH1lbHNlIGlmKGRhdGEpe1xyXG5cdFx0XHRpbmZvLng9ZGF0YS5yZWR1Y2UoKHAsIGEsIGopPT4oajxpID8gcCthLndpZHRoK2Euc3BhY2UgOiBwKSwwKVxyXG5cdFx0XHRpbmZvLndpZHRoPWRhdGFbaV0ud2lkdGhcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRsZXQgY29sV2lkdGg9KGF2YWlsYWJsZVdpZHRoLShudW0tMSkqc3BhY2UpL251bVxyXG5cdFx0XHRpbmZvLng9aSooY29sV2lkdGgrc3BhY2UpXHJcblx0XHRcdGluZm8ud2lkdGg9Y29sV2lkdGhcclxuXHRcdH1cclxuXHRcdHJldHVybiBpbmZvXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpIDogcGFnZSBObywgZm9yIGZpcnN0LCBldmVuLCBvZGQgcGFnZVxyXG4gICAgICovXHJcbiAgICBfbmV3UGFnZShpKXtcclxuICAgICAgICBjb25zdCB7cGdTejpzaXplLCAgcGdNYXI6bWFyZ2lufT10aGlzLnByb3BzXHJcblx0XHRjb25zdCBwYWdlTm89dGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGgrMVxyXG5cdFx0bGV0IGhlYWRlckVsPXRoaXMuZ2V0UGFnZUhlYWRlckZvb3RlcignaGVhZGVyJyxwYWdlTm8pXHJcblx0XHRsZXQgZm9vdGVyRWw9dGhpcy5nZXRQYWdlSGVhZGVyRm9vdGVyKCdmb290ZXInLHBhZ2VObylcclxuICAgICAgICBsZXQgaW5mbz17XHJcbiAgICAgICAgICAgIHNpemUsXHJcbiAgICAgICAgICAgIG1hcmdpbixcclxuICAgICAgICAgICAgY29sdW1uczpbdGhpcy5fbmV3Q29sdW1uKDApXSxcclxuICAgICAgICAgICAgaGVhZGVyOiBoZWFkZXJFbCA/IGhlYWRlckVsLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCgpIDogbnVsbCxcclxuICAgICAgICAgICAgZm9vdGVyOiBmb290ZXJFbCA/IGZvb3RlckVsLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCgpIDogbnVsbFxyXG4gICAgICAgIH1cclxuXHRcdHJldHVybiBpbmZvXHJcbiAgICB9XHJcblxyXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXtcclxuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxyXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpcy5jb21wdXRlZFxyXG5cdFx0aWYoY29tcG9zZWQubGVuZ3RoPT0wKVxyXG5cdFx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2godGhpcy5fbmV3UGFnZSgpKVxyXG5cdFx0Y29uc3Qge2NvbHM6e251bTphbGxvd2VkQ29sdW1ucz0xfX09dGhpcy5wcm9wc1xyXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cclxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXHJcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxyXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxyXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXHJcblxyXG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgbmV2ZXIgY2FuIGZpbmQgbWluIGFyZWFcclxuICAgICAgICB3aGlsZShhdmFpbGFibGVIZWlnaHQ8PW1pblJlcXVpcmVkSCB8fCB3aWR0aDxtaW5SZXF1aXJlZFcpe1xyXG4gICAgICAgICAgICBpZihhbGxvd2VkQ29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxyXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKGN1cnJlbnRDb2x1bW49dGhpcy5fbmV3Q29sdW1uKGNvbHVtbnMubGVuZ3RoKSlcclxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxyXG5cdFx0XHRcdGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2lkdGg9Y3VycmVudENvbHVtbi53aWR0aFxyXG4gICAgICAgICAgICBoZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcclxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7d2lkdGgsIGhlaWdodDphdmFpbGFibGVIZWlnaHR9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XHJcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXHJcblx0XHRjb25zdCB7Y29sczp7bnVtOmFsbG93ZWRDb2x1bW5zPTF9fT10aGlzLnByb3BzXHJcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxyXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcclxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXHJcbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXHJcbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcclxuXHJcbiAgICAgICAgY29uc3Qge2hlaWdodDpjb250ZW50SGVpZ2h0fT1saW5lLnByb3BzXHJcblxyXG5cdFx0aWYoY29udGVudEhlaWdodD5hdmFpbGFibGVIZWlnaHQpe1xyXG4gICAgICAgICAgICBpZihhbGxvd2VkQ29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxyXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKGN1cnJlbnRDb2x1bW49dGhpcy5fbmV3Q29sdW1uKGNvbHVtbnMubGVuZ3RoKSlcclxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZChjdXJyZW50UGFnZSlcclxuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XHJcblxyXG4gICAgICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGN1cnJlbnRDb2x1bW4ud2lkdGghPWxpbmUud2lkdGhcclxuXHJcbiAgICAgICAgICAgIGNoaWxkcmVuPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5cclxuICAgICAgICB9XHJcblxyXG5cdFx0Y2hpbGRyZW4ucHVzaCh0aGlzLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7Y2hpbGRyZW46bGluZSwgaGVpZ2h0OmNvbnRlbnRIZWlnaHQsIHk6IGhlaWdodC1hdmFpbGFibGVIZWlnaHR9KSlcclxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGNvbnRlbnRIZWlnaHQgc3RpbGwgPiBhdmFpbGFibGVIZWlnaHRcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0ICogIHNlY3Rpb24gbmVlZG4ndCBhcHBlbmQgdG8gZG9jdW1lbnQsIGJ1dCBnaXZlIGNoYW5jZSBmb3IgZXh0ZW5zaW9uXHJcblx0ICovXHJcblx0Y3JlYXRlQ29tcG9zZWQyUGFyZW50KHByb3BzKXtcclxuXHRcdHJldHVybiA8R3JvdXAgey4uLnByb3BzfS8+XHJcblx0fVxyXG5cdFxyXG5cdC8vY2hlY2sgaHR0cDovL29mZmljZW9wZW54bWwuY29tL1dQc2VjdGlvbkZvb3RlclJlZmVyZW5jZS5waHBcclxuXHRnZXRQYWdlSGVhZGVyRm9vdGVyKGNhdGVnb3J5LCBwYWdlTm8pe1xyXG5cdFx0Y2F0ZWdvcnk9dGhpcy5jb21wdXRlZFtgJHtjYXRlZ29yeX1zYF1cclxuXHRcdGxldCB0eXBlPXBhZ2VObz09MSYmdGhpcy5wcm9wcy50aXRsZVBnIT11bmRlZmluZWQgPyAnZmlyc3QnIDogKHBhZ2VObyUyPT0wID8gJ2V2ZW4nIDogJ2RlZmF1bHQnKVxyXG5cdFx0bGV0IHRhcmdldD1jYXRlZ29yeVt0eXBlXVxyXG5cdFx0aWYodGFyZ2V0KVxyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0XHJcblx0XHRcclxuXHRcdGxldCBwcmV2PXRoaXMuY29udGV4dC5wcmV2U2libGluZyh0aGlzKVxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSAnZmlyc3QnOlxyXG5cdFx0XHRpZih0aGlzLnByb3BzLnRpdGxlUGchPXVuZGVmaW5lZCl7XHJcblx0XHRcdFx0aWYocHJldil7XHJcblx0XHRcdFx0XHRyZXR1cm4gcHJldi5nZXRQYWdlSGVhZGVyRm9vdGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRyZXR1cm4gY2F0ZWdvcnlbJ2RlZmF1bHQnXS8vb3IgaW5oZXJpdGVkIG9kZFxyXG5cdFx0XHR9XHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSAnZXZlbic6XHJcblx0XHRcdGlmKHRoaXMuY29udGV4dC5wYXJlbnQucHJvcHMuc2V0dGluZ3MuZ2V0KCdzZXR0aW5ncy5ldmVuQW5kT2RkSGVhZGVycycpIT11bmRlZmluZWQpe1xyXG5cdFx0XHRcdGlmKHByZXYpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHByZXYuZ2V0UGFnZUhlYWRlckZvb3RlciguLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0cmV0dXJuIGNhdGVnb3J5WydkZWZhdWx0J10vL29yIGluaGVyaXRlZCBvZGRcclxuXHRcdFx0fVxyXG5cdFx0YnJlYWtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdGlmKHByZXYpXHJcblx0XHRcdFx0cmV0dXJuIHByZXYuZ2V0UGFnZUhlYWRlckZvb3RlciguLi5hcmd1bWVudHMpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0YnJlYWtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0b24xQ2hpbGRDb21wb3NlZChjaGlsZCl7XHJcblx0XHRzdXBlci5vbjFDaGlsZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcclxuXHRcdGlmKGNoaWxkIGluc3RhbmNlb2YgRm9vdGVyKXtcclxuXHRcdFx0dGhpcy5jb21wdXRlZC5mb290ZXJzW2NoaWxkLnByb3BzLnR5cGVdPWNoaWxkXHJcblx0XHR9ZWxzZSBpZihjaGlsZCBpbnN0YW5jZW9mIEhlYWRlcil7XHJcblx0XHRcdHRoaXMuY29tcHV0ZWQuaGVhZGVyc1tjaGlsZC5wcm9wcy50eXBlXT1jaGlsZFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAgICBvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcclxuICAgICAgICAvL2Rvbid0IGNoZWNrLCBhbmQgZG9jdW1lbnQgd2lsbCBjaGVjayBhZ2FpbnN0IGxhc3QgcGFnZVxyXG4gICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcy5jb21wdXRlZC5jb21wb3NlZFt0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aC0xXSlcclxuICAgICAgICBzdXBlci5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxyXG4gICAgfVxyXG5cclxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcclxuXHRcdHBnU3o6IHtcclxuXHRcdFx0d2lkdGg6IDMwMCxcclxuXHRcdFx0aGVpZ2h0OiA0MDBcclxuXHRcdH0sXHJcblx0XHRwZ01hcjp7XHJcblx0XHRcdGxlZnQ6MjAsXHJcblx0XHRcdHJpZ2h0OjIwLFxyXG5cdFx0XHR0b3A6MjAsXHJcblx0XHRcdGJvdHRvbToyMCxcclxuXHJcblx0XHRcdGhlYWRlcjoxMCxcclxuXHRcdFx0Zm9vdGVyOjEwLFxyXG5cclxuXHRcdFx0Z3V0dGVyOjBcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xyXG5cdFx0cGdTejogUHJvcFR5cGVzLnNoYXBlKHtcclxuXHRcdFx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuXHRcdFx0aGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcclxuXHRcdH0pLFxyXG5cdFx0cGdNYXI6IFByb3BUeXBlcy5zaGFwZSh7XHJcblx0XHRcdGxlZnQ6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRcdHJpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0XHR0b3A6IFByb3BUeXBlcy5udW1iZXIsXHJcblx0XHRcdGJvdHRvbTogUHJvcFR5cGVzLm51bWJlcixcclxuXHJcblx0XHRcdGhlYWRlcjogUHJvcFR5cGVzLm51bWJlcixcclxuXHRcdFx0Zm9vdGVyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cclxuXHRcdFx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxyXG5cdFx0fSksXHJcblx0XHRjb2xzOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcbiJdfQ==