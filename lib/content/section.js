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

var _page = require("../composed/page");

var _page2 = _interopRequireDefault(_page);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = function (_Any) {
	_inherits(Section, _Any);

	function Section() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Section);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Section)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.displayName = "section", _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Section, [{
		key: "render",
		value: function render() {
			var content = this.state.content;
			var canvas = this.context.canvas;
			var size = this.props.size;

			return _react2.default.createElement(
				_group2.default,
				{ x: (canvas.width - size.width) / 2, y: this.context.parent.getCurrentY() },
				_get(Object.getPrototypeOf(Section.prototype), "render", this).call(this),
				_react2.default.createElement(Composed, { ref: "composed", pages: this.composed, gap: canvas.pageGap, pageHeight: size.height })
			);
		}

		/**
   * i: column no
   */

	}, {
		key: "_newColumn",
		value: function _newColumn(i) {
			var _props = this.props;
			var _props$size = _props.size;
			var width = _props$size.width;
			var height = _props$size.height;
			var _props$margin = _props.margin;
			var top = _props$margin.top;
			var bottom = _props$margin.bottom;
			var left = _props$margin.left;
			var right = _props$margin.right;
			var _props$cols = _props.cols;
			var _props$cols$num = _props$cols.num;
			var num = _props$cols$num === undefined ? 1 : _props$cols$num;
			var space = _props$cols.space;
			var data = _props$cols.data;

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
				var colWidth = (availableWidth - (num - 1) * space) / 2;
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
			var _props2 = this.props;
			var size = _props2.size;
			var margin = _props2.margin;

			var info = {
				size: size,
				margin: margin,
				columns: [this._newColumn(0)],
				header: null,
				footer: null
			};
			if (this.composed.length) this.context.parent.appendComposed(this);
			this.context.parent.appendComposed(this, info);
			return info;
		}
	}, {
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var required = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
			var _required$width = required.width;
			var minRequiredW = _required$width === undefined ? 0 : _required$width;
			var _required$height = required.height;
			var minRequiredH = _required$height === undefined ? 0 : _required$height;
			var composed = this.composed;
			var _props$cols$num2 = this.props.cols.num;
			var allowedColumns = _props$cols$num2 === undefined ? 1 : _props$cols$num2;

			if (composed.length == 0) {
				composed.push(this._newPage());
			}
			var currentPage = composed[composed.length - 1];
			var _currentPage = currentPage;
			var columns = _currentPage.columns;

			var currentColumn = columns[columns.length - 1];
			var _currentColumn = currentColumn;
			var width = _currentColumn.width;
			var height = _currentColumn.height;
			var children = _currentColumn.children;

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
			var composed = this.composed;
			var _props$cols$num3 = this.props.cols.num;
			var allowedColumns = _props$cols$num3 === undefined ? 1 : _props$cols$num3;

			var currentPage = composed[composed.length - 1];
			var _currentPage2 = currentPage;
			var columns = _currentPage2.columns;

			var currentColumn = columns[columns.length - 1];
			var _currentColumn2 = currentColumn;
			var width = _currentColumn2.width;
			var height = _currentColumn2.height;
			var children = _currentColumn2.children;

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
					composed.push(currentPage = this._newPage(composed.length));
					currentColumn = currentPage.columns[0];
				}
				availableHeight = currentColumn.height;

				//@TODO: what if currentColumn.width!=line.width

				children = currentColumn.children;
			}

			children.push(_react2.default.createElement(
				_group2.default,
				{ y: height - availableHeight, height: contentHeight, index: this.children.length },
				line
			));
			//@TODO: what if contentHeight still > availableHeight
		}
	}]);

	return Section;
}(_any2.default);

Section.contextTypes = Object.assign({
	canvas: _react.PropTypes.object,
	y: _react.PropTypes.number
}, _any2.default.contextTypes);
Section.defaultProps = {
	size: {
		width: 300,
		height: 400,
		margin: 20
	},
	margin: {
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
	size: _react.PropTypes.shape({
		width: _react.PropTypes.number.isRequired,
		height: _react.PropTypes.number.isRequired
	}),
	margin: _react.PropTypes.shape({
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

var Composed = function (_Group) {
	_inherits(Composed, _Group);

	function Composed() {
		_classCallCheck(this, Composed);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Composed).apply(this, arguments));
	}

	_createClass(Composed, [{
		key: "render",
		value: function render() {
			var _props3 = this.props;
			var pages = _props3.pages;
			var gap = _props3.gap;
			var pageHeight = _props3.pageHeight;

			var y = 0;
			return _react2.default.createElement(
				_group2.default,
				null,
				pages.map(function (page, i) {
					var newPage = _react2.default.createElement(
						_group2.default,
						{ y: y, key: i },
						_react2.default.createElement(_page2.default, page)
					);
					y += pageHeight + gap;
					return newPage;
				})
			);
		}
	}]);

	return Composed;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O21NQUNqQixjQUFZOzs7Y0FESzs7MkJBU1o7T0FDQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBREE7T0FFQSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRkE7T0FHQSxPQUFNLEtBQUssS0FBTCxDQUFOLEtBSEE7O0FBSVAsVUFDQzs7TUFBTyxHQUFHLENBQUMsT0FBTyxLQUFQLEdBQWEsS0FBSyxLQUFMLENBQWQsR0FBMEIsQ0FBMUIsRUFBNkIsR0FBRyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFdBQXBCLEVBQUgsRUFBdkM7K0JBZGtCLDhDQWNsQjtJQUdDLDhCQUFDLFFBQUQsSUFBVSxLQUFJLFVBQUosRUFBZSxPQUFPLEtBQUssUUFBTCxFQUFlLEtBQUssT0FBTyxPQUFQLEVBQWdCLFlBQVksS0FBSyxNQUFMLEVBQWhGLENBSEQ7SUFERCxDQUpPOzs7Ozs7Ozs7NkJBZ0JNLEdBQUU7Z0JBQzZFLEtBQUssS0FBTCxDQUQ3RTs0QkFDUixLQURRO09BQ0YsMEJBREU7T0FDSyw0QkFETDs4QkFDZSxPQURmO09BQ3VCLHdCQUR2QjtPQUM0Qiw4QkFENUI7T0FDb0MsMEJBRHBDO09BQzBDLDRCQUQxQzs0QkFDa0QsS0FEbEQ7cUNBQ3dELElBRHhEO09BQ3dELHNDQUFJLG9CQUQ1RDtPQUMrRCwwQkFEL0Q7T0FDc0Usd0JBRHRFOztBQUVmLE9BQUksT0FBSztBQUNSLE9BQUUsQ0FBRjtBQUNBLFlBQU8sU0FBTyxNQUFQLEdBQWMsR0FBZDtBQUNFLGNBQVMsRUFBVDtJQUhOLENBRlc7QUFPZixPQUFJLGlCQUFlLFFBQU0sSUFBTixHQUFXLEtBQVgsQ0FQSjs7QUFTZixPQUFHLE9BQUssQ0FBTCxFQUFPO0FBQ1QsU0FBSyxLQUFMLEdBQVcsY0FBWCxDQURTO0FBRVQsU0FBSyxDQUFMLEdBQU8sQ0FBUCxDQUZTO0lBQVYsTUFHTSxJQUFHLElBQUgsRUFBUTtBQUNiLFNBQUssQ0FBTCxHQUFPLEtBQUssTUFBTCxDQUFZLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQO1lBQVksSUFBRSxDQUFGLEdBQU0sSUFBRSxFQUFFLEtBQUYsR0FBUSxFQUFFLEtBQUYsR0FBVSxDQUExQjtLQUFaLEVBQXlDLENBQXJELENBQVAsQ0FEYTtBQUViLFNBQUssS0FBTCxHQUFXLEtBQUssQ0FBTCxFQUFRLEtBQVIsQ0FGRTtJQUFSLE1BR0Q7QUFDSixRQUFJLFdBQVMsQ0FBQyxpQkFBZSxDQUFDLE1BQUksQ0FBSixDQUFELEdBQVEsS0FBUixDQUFoQixHQUErQixDQUEvQixDQURUO0FBRUosU0FBSyxDQUFMLEdBQU8sS0FBRyxXQUFTLEtBQVQsQ0FBSCxDQUZIO0FBR0osU0FBSyxLQUFMLEdBQVcsUUFBWCxDQUhJO0lBSEM7QUFRTixVQUFPLElBQVAsQ0FwQmU7Ozs7Ozs7OzsyQkEwQkosR0FBRTtpQkFDZSxLQUFLLEtBQUwsQ0FEZjtPQUNBLG9CQURBO09BQ08sd0JBRFA7O0FBRVAsT0FBSSxPQUFLO0FBQ0wsY0FESztBQUVMLGtCQUZLO0FBR0wsYUFBUSxDQUFDLEtBQUssVUFBTCxDQUFnQixDQUFoQixDQUFELENBQVI7QUFDQSxZQUFPLElBQVA7QUFDQSxZQUFPLElBQVA7SUFMQSxDQUZHO0FBU2IsT0FBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQ08sS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixjQUFwQixDQUFtQyxJQUFuQyxFQURWO0FBRUEsUUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixjQUFwQixDQUFtQyxJQUFuQyxFQUF5QyxJQUF6QyxFQVhhO0FBWWIsVUFBTyxJQUFQLENBWmE7Ozs7dUNBZW9CO09BQVosaUVBQVMsa0JBQUc7eUJBQ3dCLFNBQTVDLE1BRG9CO09BQ2QsK0NBQWEsb0JBREM7MEJBQ3dCLFNBQXZCLE9BREQ7T0FDUSxnREFBYSxxQkFEckI7T0FFcEIsV0FBVSxLQUFWLFNBRm9COzBCQUdHLEtBQUssS0FBTCxDQUE3QixLQUFNLElBSG9CO09BR2hCLGtEQUFlLHFCQUhDOztBQUlqQyxPQUFHLFNBQVMsTUFBVCxJQUFpQixDQUFqQixFQUFtQjtBQUNyQixhQUFTLElBQVQsQ0FBYyxLQUFLLFFBQUwsRUFBZCxFQURxQjtJQUF0QjtBQUdNLE9BQUksY0FBWSxTQUFTLFNBQVMsTUFBVCxHQUFnQixDQUFoQixDQUFyQixDQVB1QjtzQkFRYixZQVJhO09BUXRCLCtCQVJzQjs7QUFTM0IsT0FBSSxnQkFBYyxRQUFRLFFBQVEsTUFBUixHQUFlLENBQWYsQ0FBdEIsQ0FUdUI7d0JBVUUsY0FWRjtPQVV0Qiw2QkFWc0I7T0FVaEIsK0JBVmdCO09BVVIsbUNBVlE7O0FBVzNCLE9BQUksa0JBQWdCLFNBQVMsTUFBVCxDQUFnQixVQUFDLElBQUQsRUFBTyxDQUFQO1dBQVcsT0FBSyxFQUFFLEtBQUYsQ0FBUSxNQUFSO0lBQWhCLEVBQStCLE1BQS9DLENBQWhCOzs7QUFYdUIsVUFjckIsbUJBQWlCLFlBQWpCLElBQWlDLFFBQU0sWUFBTixFQUFtQjtBQUN0RCxRQUFHLGlCQUFlLFFBQVEsTUFBUixFQUFlOztBQUM3QixhQUFRLElBQVIsQ0FBYSxnQkFBYyxLQUFLLFVBQUwsQ0FBZ0IsUUFBUSxNQUFSLENBQTlCLENBQWIsQ0FENkI7S0FBakMsTUFFSzs7QUFDYixjQUFTLElBQVQsQ0FBYyxjQUFZLEtBQUssUUFBTCxDQUFjLFNBQVMsTUFBVCxDQUExQixDQUFkLENBRGE7QUFFRCxxQkFBYyxZQUFZLE9BQVosQ0FBb0IsQ0FBcEIsQ0FBZCxDQUZDO0tBRkw7QUFNQSxZQUFNLGNBQWMsS0FBZCxDQVBnRDtBQVF0RCxhQUFPLGNBQWMsTUFBZCxDQVIrQztBQVN0RCxzQkFBZ0IsY0FBYyxNQUFkLENBVHNDO0lBQTFEO0FBV0EsVUFBTyxFQUFDLFlBQUQsRUFBUSxRQUFPLGVBQVAsRUFBZixDQXpCMkI7Ozs7aUNBNEJoQixNQUFLO09BQ1QsV0FBVSxLQUFWLFNBRFM7MEJBRWMsS0FBSyxLQUFMLENBQTdCLEtBQU0sSUFGUztPQUVMLGtEQUFlLHFCQUZWOztBQUdoQixPQUFJLGNBQVksU0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBaEIsQ0FBckIsQ0FIWTt1QkFJRixZQUpFO09BSVgsZ0NBSlc7O0FBS2hCLE9BQUksZ0JBQWMsUUFBUSxRQUFRLE1BQVIsR0FBZSxDQUFmLENBQXRCLENBTFk7eUJBTWEsY0FOYjtPQU1YLDhCQU5XO09BTUwsZ0NBTks7T0FNRyxvQ0FOSDs7QUFPaEIsT0FBSSxrQkFBZ0IsU0FBUyxNQUFULENBQWdCLFVBQUMsSUFBRCxFQUFPLENBQVA7V0FBVyxPQUFLLEVBQUUsS0FBRixDQUFRLE1BQVI7SUFBaEIsRUFBK0IsTUFBL0MsQ0FBaEIsQ0FQWTs7T0FTRixnQkFBZSxLQUFLLEtBQUwsQ0FBdEIsT0FUUzs7O0FBV3RCLE9BQUcsZ0JBQWMsZUFBZCxFQUE4QjtBQUN2QixRQUFHLGlCQUFlLFFBQVEsTUFBUixFQUFlOztBQUM3QixhQUFRLElBQVIsQ0FBYSxnQkFBYyxLQUFLLFVBQUwsQ0FBZ0IsUUFBUSxNQUFSLENBQTlCLENBQWIsQ0FENkI7S0FBakMsTUFFSzs7QUFDRCxjQUFTLElBQVQsQ0FBYyxjQUFZLEtBQUssUUFBTCxDQUFjLFNBQVMsTUFBVCxDQUExQixDQUFkLENBREM7QUFFRCxxQkFBYyxZQUFZLE9BQVosQ0FBb0IsQ0FBcEIsQ0FBZCxDQUZDO0tBRkw7QUFNQSxzQkFBZ0IsY0FBYyxNQUFkOzs7O0FBUE8sWUFXdkIsR0FBUyxjQUFjLFFBQWQsQ0FYYztJQUFqQzs7QUFjQSxZQUFTLElBQVQsQ0FBYzs7TUFBTyxHQUFHLFNBQU8sZUFBUCxFQUF3QixRQUFRLGFBQVIsRUFBdUIsT0FBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQWhFO0lBQXVGLElBQXZGO0lBQWQ7O0FBekJzQjs7O1FBOUZIOzs7UUFHYixlQUFhLE9BQU8sTUFBUCxDQUFjO0FBQzNCLFNBQVEsaUJBQVUsTUFBVjtBQUNkLElBQUcsaUJBQVUsTUFBVjtDQUZnQixFQUdkLGNBQUksWUFBSjtBQU5jLFFBMkhiLGVBQWE7QUFDbkIsT0FBTTtBQUNMLFNBQU8sR0FBUDtBQUNBLFVBQVEsR0FBUjtBQUNBLFVBQVEsRUFBUjtFQUhEO0FBS0EsU0FBTztBQUNOLFFBQUssRUFBTDtBQUNBLFNBQU0sRUFBTjtBQUNBLE9BQUksRUFBSjtBQUNBLFVBQU8sRUFBUDs7QUFFQSxVQUFPLEVBQVA7QUFDQSxVQUFPLEVBQVA7O0FBRUEsVUFBTyxDQUFQO0VBVEQ7O0FBakltQixRQThJYixZQUFVO0FBQ2hCLE9BQU0saUJBQVUsS0FBVixDQUFnQjtBQUNyQixTQUFPLGlCQUFVLE1BQVYsQ0FBaUIsVUFBakI7QUFDUCxVQUFRLGlCQUFVLE1BQVYsQ0FBaUIsVUFBakI7RUFGSCxDQUFOO0FBSUEsU0FBUSxpQkFBVSxLQUFWLENBQWdCO0FBQ3ZCLFFBQU0saUJBQVUsTUFBVjtBQUNOLFNBQU8saUJBQVUsTUFBVjtBQUNQLE9BQUssaUJBQVUsTUFBVjtBQUNMLFVBQVEsaUJBQVUsTUFBVjs7QUFFUixVQUFRLGlCQUFVLE1BQVY7QUFDUixVQUFRLGlCQUFVLE1BQVY7O0FBRVIsVUFBUSxpQkFBVSxNQUFWO0VBVEQsQ0FBUjtBQVdBLE9BQU0saUJBQVUsTUFBVjs7a0JBOUphOztJQWtLZjs7Ozs7Ozs7Ozs7MkJBQ0c7aUJBQ3dCLEtBQUssS0FBTCxDQUR4QjtPQUNBLHNCQURBO09BQ08sa0JBRFA7T0FDWSxnQ0FEWjs7QUFFUCxPQUFJLElBQUUsQ0FBRixDQUZHO0FBR1AsVUFDQzs7O0lBRUMsTUFBTSxHQUFOLENBQVUsVUFBQyxJQUFELEVBQU0sQ0FBTixFQUFVO0FBQ25CLFNBQUksVUFBUzs7UUFBTyxHQUFHLENBQUgsRUFBTSxLQUFLLENBQUwsRUFBYjtNQUFxQiw4Q0FBVSxJQUFWLENBQXJCO01BQVQsQ0FEZTtBQUVuQixVQUFJLGFBQVcsR0FBWCxDQUZlO0FBR25CLFlBQU8sT0FBUCxDQUhtQjtLQUFWLENBRlg7SUFERCxDQUhPOzs7O1FBREgiLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxuXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZWQvcGFnZVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIEFueXtcbiAgICBkaXNwbGF5TmFtZT1cInNlY3Rpb25cIlxuXHRcblx0c3RhdGljIGNvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2FudmFzOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdHk6IFByb3BUeXBlcy5udW1iZXJcbiAgICB9LCBBbnkuY29udGV4dFR5cGVzKVxuICAgIFxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb250ZW50fT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge2NhbnZhc309dGhpcy5jb250ZXh0XG5cdFx0Y29uc3Qge3NpemV9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwIHg9eyhjYW52YXMud2lkdGgtc2l6ZS53aWR0aCkvMn0geT17dGhpcy5jb250ZXh0LnBhcmVudC5nZXRDdXJyZW50WSgpfT5cblx0XHRcdFx0e3N1cGVyLnJlbmRlcigpfVxuXG5cdFx0XHRcdDxDb21wb3NlZCByZWY9XCJjb21wb3NlZFwiIHBhZ2VzPXt0aGlzLmNvbXBvc2VkfSBnYXA9e2NhbnZhcy5wYWdlR2FwfSBwYWdlSGVpZ2h0PXtzaXplLmhlaWdodH0vPlxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cdH1cblxuICAgIC8qKlxuICAgICAqIGk6IGNvbHVtbiBub1xuICAgICAqL1xuICAgIF9uZXdDb2x1bW4oaSl7XG5cdFx0Y29uc3Qge3NpemU6e3dpZHRoLCBoZWlnaHR9LCAgbWFyZ2luOnt0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHR9LCBjb2xzOntudW09MSwgc3BhY2UsIGRhdGF9fT10aGlzLnByb3BzXG5cdFx0bGV0IGluZm89e1xuXHRcdFx0eTowLCAgXG5cdFx0XHRoZWlnaHQ6aGVpZ2h0LWJvdHRvbS10b3AsXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuXHRcdH1cblx0XHRsZXQgYXZhaWxhYmxlV2lkdGg9d2lkdGgtbGVmdC1yaWdodFxuICAgICAgICBcblx0XHRpZihudW09PTEpe1xuXHRcdFx0aW5mby53aWR0aD1hdmFpbGFibGVXaWR0aFxuXHRcdFx0aW5mby54PTBcblx0XHR9ZWxzZSBpZihkYXRhKXtcblx0XHRcdGluZm8ueD1kYXRhLnJlZHVjZSgocCwgYSwgaik9PihqPGkgPyBwK2Eud2lkdGgrYS5zcGFjZSA6IHApLDApXG5cdFx0XHRpbmZvLndpZHRoPWRhdGFbaV0ud2lkdGhcblx0XHR9ZWxzZXtcblx0XHRcdGxldCBjb2xXaWR0aD0oYXZhaWxhYmxlV2lkdGgtKG51bS0xKSpzcGFjZSkvMlxuXHRcdFx0aW5mby54PWkqKGNvbFdpZHRoK3NwYWNlKVxuXHRcdFx0aW5mby53aWR0aD1jb2xXaWR0aFxuXHRcdH1cblx0XHRyZXR1cm4gaW5mb1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGkgOiBwYWdlIE5vLCBmb3IgZmlyc3QsIGV2ZW4sIG9kZCBwYWdlXG4gICAgICovXG4gICAgX25ld1BhZ2UoaSl7XG4gICAgICAgIGNvbnN0IHtzaXplLCAgbWFyZ2lufT10aGlzLnByb3BzXG4gICAgICAgIGxldCBpbmZvPXtcbiAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICBtYXJnaW4sXG4gICAgICAgICAgICBjb2x1bW5zOlt0aGlzLl9uZXdDb2x1bW4oMCldLFxuICAgICAgICAgICAgaGVhZGVyOm51bGwsXG4gICAgICAgICAgICBmb290ZXI6bnVsbFxuICAgICAgICB9XG5cdFx0aWYodGhpcy5jb21wb3NlZC5sZW5ndGgpXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMpXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLCBpbmZvKVxuXHRcdHJldHVybiBpbmZvXG4gICAgfVxuXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXtcbiAgICAgICAgY29uc3Qge3dpZHRoOm1pblJlcXVpcmVkVz0wLGhlaWdodDptaW5SZXF1aXJlZEg9MH09cmVxdWlyZWRcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0Y29uc3Qge2NvbHM6e251bTphbGxvd2VkQ29sdW1ucz0xfX09dGhpcy5wcm9wc1xuXHRcdGlmKGNvbXBvc2VkLmxlbmd0aD09MCl7XG5cdFx0XHRjb21wb3NlZC5wdXNoKHRoaXMuX25ld1BhZ2UoKSlcblx0XHR9XG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgbmV2ZXIgY2FuIGZpbmQgbWluIGFyZWFcbiAgICAgICAgd2hpbGUoYXZhaWxhYmxlSGVpZ2h0PD1taW5SZXF1aXJlZEggfHwgd2lkdGg8bWluUmVxdWlyZWRXKXtcbiAgICAgICAgICAgIGlmKGFsbG93ZWRDb2x1bW5zPmNvbHVtbnMubGVuZ3RoKXsvLyBuZXcgY29sdW1uXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKGN1cnJlbnRDb2x1bW49dGhpcy5fbmV3Q29sdW1uKGNvbHVtbnMubGVuZ3RoKSlcbiAgICAgICAgICAgIH1lbHNley8vbmV3IHBhZ2Vcblx0XHRcdFx0Y29tcG9zZWQucHVzaChjdXJyZW50UGFnZT10aGlzLl9uZXdQYWdlKGNvbXBvc2VkLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aWR0aD1jdXJyZW50Q29sdW1uLndpZHRoXG4gICAgICAgICAgICBoZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgICAgIGF2YWlsYWJsZUhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7d2lkdGgsIGhlaWdodDphdmFpbGFibGVIZWlnaHR9XG4gICAgfVxuXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGNvbnN0IHtjb2xzOntudW06YWxsb3dlZENvbHVtbnM9MX19PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgY29uc3Qge2hlaWdodDpjb250ZW50SGVpZ2h0fT1saW5lLnByb3BzXG5cblx0XHRpZihjb250ZW50SGVpZ2h0PmF2YWlsYWJsZUhlaWdodCl7XG4gICAgICAgICAgICBpZihhbGxvd2VkQ29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG4gICAgICAgICAgICAgICAgY29tcG9zZWQucHVzaChjdXJyZW50UGFnZT10aGlzLl9uZXdQYWdlKGNvbXBvc2VkLmxlbmd0aCkpXG4gICAgICAgICAgICAgICAgY3VycmVudENvbHVtbj1jdXJyZW50UGFnZS5jb2x1bW5zWzBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcblxuICAgICAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjdXJyZW50Q29sdW1uLndpZHRoIT1saW5lLndpZHRoXG5cbiAgICAgICAgICAgIGNoaWxkcmVuPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW5cbiAgICAgICAgfVxuXG5cdFx0Y2hpbGRyZW4ucHVzaCg8R3JvdXAgeT17aGVpZ2h0LWF2YWlsYWJsZUhlaWdodH0gaGVpZ2h0PXtjb250ZW50SGVpZ2h0fSBpbmRleD17dGhpcy5jaGlsZHJlbi5sZW5ndGh9PntsaW5lfTwvR3JvdXA+KVxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIGNvbnRlbnRIZWlnaHQgc3RpbGwgPiBhdmFpbGFibGVIZWlnaHRcbiAgICB9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcz17XG5cdFx0c2l6ZToge1xuXHRcdFx0d2lkdGg6IDMwMCxcblx0XHRcdGhlaWdodDogNDAwLFxuXHRcdFx0bWFyZ2luOiAyMFxuXHRcdH0sXG5cdFx0bWFyZ2luOntcblx0XHRcdGxlZnQ6MjAsXG5cdFx0XHRyaWdodDoyMCxcblx0XHRcdHRvcDoyMCxcblx0XHRcdGJvdHRvbToyMCxcblx0XHRcdFxuXHRcdFx0aGVhZGVyOjEwLFxuXHRcdFx0Zm9vdGVyOjEwLFxuXHRcdFx0XG5cdFx0XHRndXR0ZXI6MFxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdHNpemU6IFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHR3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdFx0aGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcblx0XHR9KSxcblx0XHRtYXJnaW46IFByb3BUeXBlcy5zaGFwZSh7XG5cdFx0XHRsZWZ0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0cmlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHR0b3A6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRib3R0b206IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRcblx0XHRcdGhlYWRlcjogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdGZvb3RlcjogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdFxuXHRcdFx0Z3V0dGVyOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdH0pLFxuXHRcdGNvbHM6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuXG5jbGFzcyBDb21wb3NlZCBleHRlbmRzIEdyb3Vwe1xuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7cGFnZXMsIGdhcCwgcGFnZUhlaWdodH09dGhpcy5wcm9wc1xuXHRcdGxldCB5PTBcblx0XHRyZXR1cm4gKFxuXHRcdFx0PEdyb3VwPlxuXHRcdFx0e1xuXHRcdFx0XHRwYWdlcy5tYXAoKHBhZ2UsaSk9Pntcblx0XHRcdFx0XHRsZXQgbmV3UGFnZT0oPEdyb3VwIHk9e3l9IGtleT17aX0+PFBhZ2Ugey4uLnBhZ2V9Lz48L0dyb3VwPilcblx0XHRcdFx0XHR5Kz0ocGFnZUhlaWdodCtnYXApXG5cdFx0XHRcdFx0cmV0dXJuIG5ld1BhZ2Vcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRcdDwvR3JvdXA+XG5cdFx0KVxuXHR9XG59XG4iXX0=