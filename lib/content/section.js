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
		_classCallCheck(this, Section);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Section).apply(this, arguments));
	}

	_createClass(Section, [{
		key: "render",
		value: function render() {
			var content = this.state.content;
			var canvas = this.context.canvas;
			var size = this.props.size;

			return _react2.default.createElement(
				_group2.default,
				{ x: (canvas.width - size.width) / 2, y: 0 },
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

			if (composed.length == 0) this.composed.push(this._newPage());
			var _props$cols$num2 = this.props.cols.num;
			var allowedColumns = _props$cols$num2 === undefined ? 1 : _props$cols$num2;

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

Section.displayName = "section";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQVNaO09BQ0EsVUFBUyxLQUFLLEtBQUwsQ0FBVCxRQURBO09BRUEsU0FBUSxLQUFLLE9BQUwsQ0FBUixPQUZBO09BR0EsT0FBTSxLQUFLLEtBQUwsQ0FBTixLQUhBOztBQUlQLFVBQ0M7O01BQU8sR0FBRyxDQUFDLE9BQU8sS0FBUCxHQUFhLEtBQUssS0FBTCxDQUFkLEdBQTBCLENBQTFCLEVBQTZCLEdBQUcsQ0FBSCxFQUF2QzsrQkFka0IsOENBY2xCO0lBR0MsOEJBQUMsUUFBRCxJQUFVLEtBQUksVUFBSixFQUFlLE9BQU8sS0FBSyxRQUFMLEVBQWUsS0FBSyxPQUFPLE9BQVAsRUFBZ0IsWUFBWSxLQUFLLE1BQUwsRUFBaEYsQ0FIRDtJQURELENBSk87Ozs7Ozs7Ozs2QkFnQk0sR0FBRTtnQkFDNkUsS0FBSyxLQUFMLENBRDdFOzRCQUNSLEtBRFE7T0FDRiwwQkFERTtPQUNLLDRCQURMOzhCQUNlLE9BRGY7T0FDdUIsd0JBRHZCO09BQzRCLDhCQUQ1QjtPQUNvQywwQkFEcEM7T0FDMEMsNEJBRDFDOzRCQUNrRCxLQURsRDtxQ0FDd0QsSUFEeEQ7T0FDd0Qsc0NBQUksb0JBRDVEO09BQytELDBCQUQvRDtPQUNzRSx3QkFEdEU7O0FBRWYsT0FBSSxPQUFLO0FBQ1IsT0FBRSxDQUFGO0FBQ0EsWUFBTyxTQUFPLE1BQVAsR0FBYyxHQUFkO0FBQ0UsY0FBUyxFQUFUO0lBSE4sQ0FGVztBQU9mLE9BQUksaUJBQWUsUUFBTSxJQUFOLEdBQVcsS0FBWCxDQVBKOztBQVNmLE9BQUcsT0FBSyxDQUFMLEVBQU87QUFDVCxTQUFLLEtBQUwsR0FBVyxjQUFYLENBRFM7QUFFVCxTQUFLLENBQUwsR0FBTyxDQUFQLENBRlM7SUFBVixNQUdNLElBQUcsSUFB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bmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEFueSBmcm9tIFwiLi9hbnlcIlxuXG5pbXBvcnQgUGFnZSBmcm9tIFwiLi4vY29tcG9zZWQvcGFnZVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIEFueXtcbiAgICBzdGF0aWMgZGlzcGxheU5hbWU9XCJzZWN0aW9uXCJcblxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0eTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0sIEFueS5jb250ZXh0VHlwZXMpXG5cblxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7Y29udGVudH09dGhpcy5zdGF0ZVxuXHRcdGNvbnN0IHtjYW52YXN9PXRoaXMuY29udGV4dFxuXHRcdGNvbnN0IHtzaXplfT10aGlzLnByb3BzXG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cCB4PXsoY2FudmFzLndpZHRoLXNpemUud2lkdGgpLzJ9IHk9ezB9PlxuXHRcdFx0XHR7c3VwZXIucmVuZGVyKCl9XG5cblx0XHRcdFx0PENvbXBvc2VkIHJlZj1cImNvbXBvc2VkXCIgcGFnZXM9e3RoaXMuY29tcG9zZWR9IGdhcD17Y2FudmFzLnBhZ2VHYXB9IHBhZ2VIZWlnaHQ9e3NpemUuaGVpZ2h0fS8+XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcblx0fVxuXG4gICAgLyoqXG4gICAgICogaTogY29sdW1uIG5vXG4gICAgICovXG4gICAgX25ld0NvbHVtbihpKXtcblx0XHRjb25zdCB7c2l6ZTp7d2lkdGgsIGhlaWdodH0sICBtYXJnaW46e3RvcCwgYm90dG9tLCBsZWZ0LCByaWdodH0sIGNvbHM6e251bT0xLCBzcGFjZSwgZGF0YX19PXRoaXMucHJvcHNcblx0XHRsZXQgaW5mbz17XG5cdFx0XHR5OjAsXG5cdFx0XHRoZWlnaHQ6aGVpZ2h0LWJvdHRvbS10b3AsXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuXHRcdH1cblx0XHRsZXQgYXZhaWxhYmxlV2lkdGg9d2lkdGgtbGVmdC1yaWdodFxuXG5cdFx0aWYobnVtPT0xKXtcblx0XHRcdGluZm8ud2lkdGg9YXZhaWxhYmxlV2lkdGhcblx0XHRcdGluZm8ueD0wXG5cdFx0fWVsc2UgaWYoZGF0YSl7XG5cdFx0XHRpbmZvLng9ZGF0YS5yZWR1Y2UoKHAsIGEsIGopPT4oajxpID8gcCthLndpZHRoK2Euc3BhY2UgOiBwKSwwKVxuXHRcdFx0aW5mby53aWR0aD1kYXRhW2ldLndpZHRoXG5cdFx0fWVsc2V7XG5cdFx0XHRsZXQgY29sV2lkdGg9KGF2YWlsYWJsZVdpZHRoLShudW0tMSkqc3BhY2UpLzJcblx0XHRcdGluZm8ueD1pKihjb2xXaWR0aCtzcGFjZSlcblx0XHRcdGluZm8ud2lkdGg9Y29sV2lkdGhcblx0XHR9XG5cdFx0cmV0dXJuIGluZm9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpIDogcGFnZSBObywgZm9yIGZpcnN0LCBldmVuLCBvZGQgcGFnZVxuICAgICAqL1xuICAgIF9uZXdQYWdlKGkpe1xuICAgICAgICBjb25zdCB7c2l6ZSwgIG1hcmdpbn09dGhpcy5wcm9wc1xuICAgICAgICBsZXQgaW5mbz17XG4gICAgICAgICAgICBzaXplLFxuICAgICAgICAgICAgbWFyZ2luLFxuICAgICAgICAgICAgY29sdW1uczpbdGhpcy5fbmV3Q29sdW1uKDApXSxcbiAgICAgICAgICAgIGhlYWRlcjpudWxsLFxuICAgICAgICAgICAgZm9vdGVyOm51bGxcbiAgICAgICAgfVxuXHRcdGlmKHRoaXMuY29tcG9zZWQubGVuZ3RoKVxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzKVxuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQodGhpcywgaW5mbylcblx0XHRyZXR1cm4gaW5mb1xuICAgIH1cblxuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17fSl7XG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGlmKGNvbXBvc2VkLmxlbmd0aD09MClcblx0XHRcdHRoaXMuY29tcG9zZWQucHVzaCh0aGlzLl9uZXdQYWdlKCkpXG5cdFx0Y29uc3Qge2NvbHM6e251bTphbGxvd2VkQ29sdW1ucz0xfX09dGhpcy5wcm9wc1xuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIG5ldmVyIGNhbiBmaW5kIG1pbiBhcmVhXG4gICAgICAgIHdoaWxlKGF2YWlsYWJsZUhlaWdodDw9bWluUmVxdWlyZWRIIHx8IHdpZHRoPG1pblJlcXVpcmVkVyl7XG4gICAgICAgICAgICBpZihhbGxvd2VkQ29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG5cdFx0XHRcdGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkdGg9Y3VycmVudENvbHVtbi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxuICAgIH1cblxuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRjb25zdCB7Y29sczp7bnVtOmFsbG93ZWRDb2x1bW5zPTF9fT10aGlzLnByb3BzXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIGNvbnN0IHtoZWlnaHQ6Y29udGVudEhlaWdodH09bGluZS5wcm9wc1xuXG5cdFx0aWYoY29udGVudEhlaWdodD5hdmFpbGFibGVIZWlnaHQpe1xuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG5cbiAgICAgICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY3VycmVudENvbHVtbi53aWR0aCE9bGluZS53aWR0aFxuXG4gICAgICAgICAgICBjaGlsZHJlbj1jdXJyZW50Q29sdW1uLmNoaWxkcmVuXG4gICAgICAgIH1cblxuXHRcdGNoaWxkcmVuLnB1c2goPEdyb3VwIHk9e2hlaWdodC1hdmFpbGFibGVIZWlnaHR9IGhlaWdodD17Y29udGVudEhlaWdodH0gaW5kZXg9e3RoaXMuY2hpbGRyZW4ubGVuZ3RofT57bGluZX08L0dyb3VwPilcbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjb250ZW50SGVpZ2h0IHN0aWxsID4gYXZhaWxhYmxlSGVpZ2h0XG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHNpemU6IHtcblx0XHRcdHdpZHRoOiAzMDAsXG5cdFx0XHRoZWlnaHQ6IDQwMCxcblx0XHRcdG1hcmdpbjogMjBcblx0XHR9LFxuXHRcdG1hcmdpbjp7XG5cdFx0XHRsZWZ0OjIwLFxuXHRcdFx0cmlnaHQ6MjAsXG5cdFx0XHR0b3A6MjAsXG5cdFx0XHRib3R0b206MjAsXG5cblx0XHRcdGhlYWRlcjoxMCxcblx0XHRcdGZvb3RlcjoxMCxcblxuXHRcdFx0Z3V0dGVyOjBcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRzaXplOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRcdGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG5cdFx0fSksXG5cdFx0bWFyZ2luOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0bGVmdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdHJpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0dG9wOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0Ym90dG9tOiBQcm9wVHlwZXMubnVtYmVyLFxuXG5cdFx0XHRoZWFkZXI6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRmb290ZXI6IFByb3BUeXBlcy5udW1iZXIsXG5cblx0XHRcdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcblx0XHR9KSxcblx0XHRjb2xzOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cblxuY2xhc3MgQ29tcG9zZWQgZXh0ZW5kcyBHcm91cHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3BhZ2VzLCBnYXAsIHBhZ2VIZWlnaHR9PXRoaXMucHJvcHNcblx0XHRsZXQgeT0wXG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cD5cblx0XHRcdHtcblx0XHRcdFx0cGFnZXMubWFwKChwYWdlLGkpPT57XG5cdFx0XHRcdFx0bGV0IG5ld1BhZ2U9KDxHcm91cCB5PXt5fSBrZXk9e2l9PjxQYWdlIHsuLi5wYWdlfS8+PC9Hcm91cD4pXG5cdFx0XHRcdFx0eSs9KHBhZ2VIZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdHJldHVybiBuZXdQYWdlXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcblx0fVxufVxuIl19