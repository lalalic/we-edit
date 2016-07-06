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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O21NQUNqQixjQUFZOzs7Y0FESzs7MkJBU1o7T0FDQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBREE7T0FFQSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRkE7T0FHQSxPQUFNLEtBQUssS0FBTCxDQUFOLEtBSEE7O0FBSVAsVUFDQzs7TUFBTyxHQUFHLENBQUMsT0FBTyxLQUFQLEdBQWEsS0FBSyxLQUFMLENBQWQsR0FBMEIsQ0FBMUIsRUFBNkIsR0FBRyxDQUFILEVBQXZDOytCQWRrQiw4Q0FjbEI7SUFHQyw4QkFBQyxRQUFELElBQVUsS0FBSSxVQUFKLEVBQWUsT0FBTyxLQUFLLFFBQUwsRUFBZSxLQUFLLE9BQU8sT0FBUCxFQUFnQixZQUFZLEtBQUssTUFBTCxFQUFoRixDQUhEO0lBREQsQ0FKTzs7Ozs7Ozs7OzZCQWdCTSxHQUFFO2dCQUM2RSxLQUFLLEtBQUwsQ0FEN0U7NEJBQ1IsS0FEUTtPQUNGLDBCQURFO09BQ0ssNEJBREw7OEJBQ2UsT0FEZjtPQUN1Qix3QkFEdkI7T0FDNEIsOEJBRDVCO09BQ29DLDBCQURwQztPQUMwQyw0QkFEMUM7NEJBQ2tELEtBRGxEO3FDQUN3RCxJQUR4RDtPQUN3RCxzQ0FBSSxvQkFENUQ7T0FDK0QsMEJBRC9EO09BQ3NFLHdCQUR0RTs7QUFFZixPQUFJLE9BQUs7QUFDUixPQUFFLENBQUY7QUFDQSxZQUFPLFNBQU8sTUFBUCxHQUFjLEdBQWQ7QUFDRSxjQUFTLEVBQVQ7SUFITixDQUZXO0FBT2YsT0FBSSxpQkFBZSxRQUFNLElBQU4sR0FBVyxLQUFYLENBUEo7O0FBU2YsT0FBRyxPQUFLLENBQUwsRUFBTztBQUNULFNBQUssS0FBTCxHQUFXLGNBQVgsQ0FEUztBQUVULFNBQUssQ0FBTCxHQUFPLENBQVAs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LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5cbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlZC9wYWdlXCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgQW55e1xuICAgIGRpc3BsYXlOYW1lPVwic2VjdGlvblwiXG5cdFxuXHRzdGF0aWMgY29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0eTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0sIEFueS5jb250ZXh0VHlwZXMpXG4gICAgXG5cblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7Y2FudmFzfT10aGlzLmNvbnRleHRcblx0XHRjb25zdCB7c2l6ZX09dGhpcy5wcm9wc1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8R3JvdXAgeD17KGNhbnZhcy53aWR0aC1zaXplLndpZHRoKS8yfSB5PXswfT5cblx0XHRcdFx0e3N1cGVyLnJlbmRlcigpfVxuXG5cdFx0XHRcdDxDb21wb3NlZCByZWY9XCJjb21wb3NlZFwiIHBhZ2VzPXt0aGlzLmNvbXBvc2VkfSBnYXA9e2NhbnZhcy5wYWdlR2FwfSBwYWdlSGVpZ2h0PXtzaXplLmhlaWdodH0vPlxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cdH1cblxuICAgIC8qKlxuICAgICAqIGk6IGNvbHVtbiBub1xuICAgICAqL1xuICAgIF9uZXdDb2x1bW4oaSl7XG5cdFx0Y29uc3Qge3NpemU6e3dpZHRoLCBoZWlnaHR9LCAgbWFyZ2luOnt0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHR9LCBjb2xzOntudW09MSwgc3BhY2UsIGRhdGF9fT10aGlzLnByb3BzXG5cdFx0bGV0IGluZm89e1xuXHRcdFx0eTowLCAgXG5cdFx0XHRoZWlnaHQ6aGVpZ2h0LWJvdHRvbS10b3AsXG4gICAgICAgICAgICBjaGlsZHJlbjpbXVxuXHRcdH1cblx0XHRsZXQgYXZhaWxhYmxlV2lkdGg9d2lkdGgtbGVmdC1yaWdodFxuICAgICAgICBcblx0XHRpZihudW09PTEpe1xuXHRcdFx0aW5mby53aWR0aD1hdmFpbGFibGVXaWR0aFxuXHRcdFx0aW5mby54PTBcblx0XHR9ZWxzZSBpZihkYXRhKXtcblx0XHRcdGluZm8ueD1kYXRhLnJlZHVjZSgocCwgYSwgaik9PihqPGkgPyBwK2Eud2lkdGgrYS5zcGFjZSA6IHApLDApXG5cdFx0XHRpbmZvLndpZHRoPWRhdGFbaV0ud2lkdGhcblx0XHR9ZWxzZXtcblx0XHRcdGxldCBjb2xXaWR0aD0oYXZhaWxhYmxlV2lkdGgtKG51bS0xKSpzcGFjZSkvMlxuXHRcdFx0aW5mby54PWkqKGNvbFdpZHRoK3NwYWNlKVxuXHRcdFx0aW5mby53aWR0aD1jb2xXaWR0aFxuXHRcdH1cblx0XHRyZXR1cm4gaW5mb1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGkgOiBwYWdlIE5vLCBmb3IgZmlyc3QsIGV2ZW4sIG9kZCBwYWdlXG4gICAgICovXG4gICAgX25ld1BhZ2UoaSl7XG4gICAgICAgIGNvbnN0IHtzaXplLCAgbWFyZ2lufT10aGlzLnByb3BzXG4gICAgICAgIGxldCBpbmZvPXtcbiAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICBtYXJnaW4sXG4gICAgICAgICAgICBjb2x1bW5zOlt0aGlzLl9uZXdDb2x1bW4oMCldLFxuICAgICAgICAgICAgaGVhZGVyOm51bGwsXG4gICAgICAgICAgICBmb290ZXI6bnVsbFxuICAgICAgICB9XG5cdFx0aWYodGhpcy5jb21wb3NlZC5sZW5ndGgpXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMpXG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCh0aGlzLCBpbmZvKVxuXHRcdHJldHVybiBpbmZvXG4gICAgfVxuXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt9KXsgXG4gICAgICAgIGNvbnN0IHt3aWR0aDptaW5SZXF1aXJlZFc9MCxoZWlnaHQ6bWluUmVxdWlyZWRIPTB9PXJlcXVpcmVkXG4gICAgICAgIGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGlmKGNvbXBvc2VkLmxlbmd0aD09MClcblx0XHRcdHRoaXMuY29tcG9zZWQucHVzaCh0aGlzLl9uZXdQYWdlKCkpXG5cdFx0Y29uc3Qge2NvbHM6e251bTphbGxvd2VkQ29sdW1ucz0xfX09dGhpcy5wcm9wc1xuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIG5ldmVyIGNhbiBmaW5kIG1pbiBhcmVhXG4gICAgICAgIHdoaWxlKGF2YWlsYWJsZUhlaWdodDw9bWluUmVxdWlyZWRIIHx8IHdpZHRoPG1pblJlcXVpcmVkVyl7XG4gICAgICAgICAgICBpZihhbGxvd2VkQ29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG5cdFx0XHRcdGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkdGg9Y3VycmVudENvbHVtbi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxuICAgIH1cblxuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRjb25zdCB7Y29sczp7bnVtOmFsbG93ZWRDb2x1bW5zPTF9fT10aGlzLnByb3BzXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIGNvbnN0IHtoZWlnaHQ6Y29udGVudEhlaWdodH09bGluZS5wcm9wc1xuXG5cdFx0aWYoY29udGVudEhlaWdodD5hdmFpbGFibGVIZWlnaHQpe1xuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG5cbiAgICAgICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY3VycmVudENvbHVtbi53aWR0aCE9bGluZS53aWR0aFxuXG4gICAgICAgICAgICBjaGlsZHJlbj1jdXJyZW50Q29sdW1uLmNoaWxkcmVuXG4gICAgICAgIH1cblxuXHRcdGNoaWxkcmVuLnB1c2goPEdyb3VwIHk9e2hlaWdodC1hdmFpbGFibGVIZWlnaHR9IGhlaWdodD17Y29udGVudEhlaWdodH0gaW5kZXg9e3RoaXMuY2hpbGRyZW4ubGVuZ3RofT57bGluZX08L0dyb3VwPilcbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjb250ZW50SGVpZ2h0IHN0aWxsID4gYXZhaWxhYmxlSGVpZ2h0XG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHNpemU6IHtcblx0XHRcdHdpZHRoOiAzMDAsXG5cdFx0XHRoZWlnaHQ6IDQwMCxcblx0XHRcdG1hcmdpbjogMjBcblx0XHR9LFxuXHRcdG1hcmdpbjp7XG5cdFx0XHRsZWZ0OjIwLFxuXHRcdFx0cmlnaHQ6MjAsXG5cdFx0XHR0b3A6MjAsXG5cdFx0XHRib3R0b206MjAsXG5cdFx0XHRcblx0XHRcdGhlYWRlcjoxMCxcblx0XHRcdGZvb3RlcjoxMCxcblx0XHRcdFxuXHRcdFx0Z3V0dGVyOjBcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRzaXplOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRcdGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG5cdFx0fSksXG5cdFx0bWFyZ2luOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0bGVmdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdHJpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0dG9wOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0Ym90dG9tOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0XG5cdFx0XHRoZWFkZXI6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRmb290ZXI6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRcblx0XHRcdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcblx0XHR9KSxcblx0XHRjb2xzOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cblxuY2xhc3MgQ29tcG9zZWQgZXh0ZW5kcyBHcm91cHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge3BhZ2VzLCBnYXAsIHBhZ2VIZWlnaHR9PXRoaXMucHJvcHNcblx0XHRsZXQgeT0wXG5cdFx0cmV0dXJuIChcblx0XHRcdDxHcm91cD5cblx0XHRcdHtcblx0XHRcdFx0cGFnZXMubWFwKChwYWdlLGkpPT57XG5cdFx0XHRcdFx0bGV0IG5ld1BhZ2U9KDxHcm91cCB5PXt5fSBrZXk9e2l9PjxQYWdlIHsuLi5wYWdlfS8+PC9Hcm91cD4pXG5cdFx0XHRcdFx0eSs9KHBhZ2VIZWlnaHQrZ2FwKVxuXHRcdFx0XHRcdHJldHVybiBuZXdQYWdlXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcblx0fVxufVxuIl19