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
			var _props = this.props;
			var header = _props.header;
			var footer = _props.footer;

			return _get(Object.getPrototypeOf(Section.prototype), "render", this).call(this);
		}

		/**
   * i: column no
   */

	}, {
		key: "_newColumn",
		value: function _newColumn(i) {
			var _props2 = this.props;
			var _props2$pgSz = _props2.pgSz;
			var width = _props2$pgSz.width;
			var height = _props2$pgSz.height;
			var _props2$pgMar = _props2.pgMar;
			var top = _props2$pgMar.top;
			var bottom = _props2$pgMar.bottom;
			var left = _props2$pgMar.left;
			var right = _props2$pgMar.right;
			var _props2$cols = _props2.cols;
			var _props2$cols$num = _props2$cols.num;
			var num = _props2$cols$num === undefined ? 1 : _props2$cols$num;
			var space = _props2$cols.space;
			var data = _props2$cols.data;

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
			var _props3 = this.props;
			var size = _props3.pgSz;
			var margin = _props3.pgMar;

			var info = {
				size: size,
				margin: margin,
				columns: [this._newColumn(0)],
				header: null,
				footer: null
			};
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
			var composed = this.computed.composed;

			if (composed.length == 0) this.computed.composed.push(this._newPage());
			var _props$cols$num = this.props.cols.num;
			var allowedColumns = _props$cols$num === undefined ? 1 : _props$cols$num;

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
			var composed = this.computed.composed;
			var _props$cols$num2 = this.props.cols.num;
			var allowedColumns = _props$cols$num2 === undefined ? 1 : _props$cols$num2;

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
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			//don't check, and document will check against last page
			this.context.parent.appendComposed(this.computed.composed[this.computed.composed.length - 1]);
			_get(Object.getPrototypeOf(Section.prototype), "onAllChildrenComposed", this).call(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OzsyQkFHWjtnQkFDZSxLQUFLLEtBQUwsQ0FEZjtPQUNBLHVCQURBO09BQ08sdUJBRFA7O0FBRVAscUNBTG1CLDhDQUtuQixDQUZPOzs7Ozs7Ozs7NkJBUU0sR0FBRTtpQkFDNEUsS0FBSyxLQUFMLENBRDVFOzhCQUNSLEtBRFE7T0FDRiwyQkFERTtPQUNLLDZCQURMOytCQUNlLE1BRGY7T0FDc0Isd0JBRHRCO09BQzJCLDhCQUQzQjtPQUNtQywwQkFEbkM7T0FDeUMsNEJBRHpDOzhCQUNpRCxLQURqRDt1Q0FDdUQsSUFEdkQ7T0FDdUQsdUNBQUkscUJBRDNEO09BQzhELDJCQUQ5RDtPQUNxRSx5QkFEckU7O0FBRWYsT0FBSSxPQUFLO0FBQ1IsT0FBRSxDQUFGO0FBQ0EsWUFBTyxTQUFPLE1BQVAsR0FBYyxHQUFkO0FBQ0UsY0FBUyxFQUFUO0lBSE4sQ0FGVztBQU9mLE9BQUksaUJBQWUsUUFBTSxJQUFOLEdBQVcsS0FBWCxDQVBKOztBQVNmLE9BQUcsT0FBSyxDQUFMLEVBQU87QUFDVCxTQUFLLEtBQUwsR0FBVyxjQUFYLENBRFM7QUFFVCxTQUFLLENBQUwsR0FBTyxDQUFQLENBRlM7SUFBVixNQUdNLElBQUcsSUFBSCxFQUFRO0FBQ2IsU0FBSyxDQUFMLEdBQU8sS0FBSyxNQUFMLENBQVksVUFBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQVA7WUFBWSxJQUFFLENBQUYsR0FBTSxJQUFFLEVBQUUsS0FBRixHQUFRLEVBQUUsS0FBRixHQUFVLENBQTFCO0tBQVosRUFBeUMsQ0FBckQsQ0FBUCxDQURhO0FBRWIsU0FBSyxLQUFMLEdBQVcsS0FBSyxDQUFMLEVBQVEsS0FBUixDQUZFO0lBQVIsTUFHRDtBQUNKLFFBQUksV0FBUyxDQUFDLGlCQUFlLENBQUMsTUFB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aUJBQVUsS0FBVixDQUFnQjtBQUNyQixTQUFPLGlCQUFVLE1BQVYsQ0FBaUIsVUFBakI7QUFDUCxVQUFRLGlCQUFVLE1BQVYsQ0FBaUIsVUFBakI7RUFGSCxDQUFOO0FBSUEsUUFBTyxpQkFBVSxLQUFWLENBQWdCO0FBQ3RCLFFBQU0saUJBQVUsTUFBVjtBQUNOLFNBQU8saUJBQVUsTUFBVjtBQUNQLE9BQUssaUJBQVUsTUFBVjtBQUNMLFVBQVEsaUJBQVUsTUFBVjs7QUFFUixVQUFRLGlCQUFVLE1BQVY7QUFDUixVQUFRLGlCQUFVLE1BQVY7O0FBRVIsVUFBUSxpQkFBVSxNQUFWO0VBVEYsQ0FBUDtBQVdBLE9BQU0saUJBQVUsTUFBVjs7a0JBekphIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCBBbnkgZnJvbSBcIi4vYW55XCJcblxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBBbnl7XG4gICAgc3RhdGljIGRpc3BsYXlOYW1lPVwic2VjdGlvblwiXG5cdFxuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7aGVhZGVyLGZvb3Rlcn09dGhpcy5wcm9wc1xuXHRcdHJldHVybiBzdXBlci5yZW5kZXIoKVxuXHR9XG5cbiAgICAvKipcbiAgICAgKiBpOiBjb2x1bW4gbm9cbiAgICAgKi9cbiAgICBfbmV3Q29sdW1uKGkpe1xuXHRcdGNvbnN0IHtwZ1N6Ont3aWR0aCwgaGVpZ2h0fSwgIHBnTWFyOnt0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHR9LCBjb2xzOntudW09MSwgc3BhY2UsIGRhdGF9fT10aGlzLnByb3BzXG5cdFx0bGV0IGluZm89e1xuXHRcdFx0eTowLFxuXHRcdFx0aGVpZ2h0OmhlaWdodC1ib3R0b20tdG9wLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cblx0XHR9XG5cdFx0bGV0IGF2YWlsYWJsZVdpZHRoPXdpZHRoLWxlZnQtcmlnaHRcblxuXHRcdGlmKG51bT09MSl7XG5cdFx0XHRpbmZvLndpZHRoPWF2YWlsYWJsZVdpZHRoXG5cdFx0XHRpbmZvLng9MFxuXHRcdH1lbHNlIGlmKGRhdGEpe1xuXHRcdFx0aW5mby54PWRhdGEucmVkdWNlKChwLCBhLCBqKT0+KGo8aSA/IHArYS53aWR0aCthLnNwYWNlIDogcCksMClcblx0XHRcdGluZm8ud2lkdGg9ZGF0YVtpXS53aWR0aFxuXHRcdH1lbHNle1xuXHRcdFx0bGV0IGNvbFdpZHRoPShhdmFpbGFibGVXaWR0aC0obnVtLTEpKnNwYWNlKS9udW1cblx0XHRcdGluZm8ueD1pKihjb2xXaWR0aCtzcGFjZSlcblx0XHRcdGluZm8ud2lkdGg9Y29sV2lkdGhcblx0XHR9XG5cdFx0cmV0dXJuIGluZm9cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBpIDogcGFnZSBObywgZm9yIGZpcnN0LCBldmVuLCBvZGQgcGFnZVxuICAgICAqL1xuICAgIF9uZXdQYWdlKGkpe1xuICAgICAgICBjb25zdCB7cGdTejpzaXplLCAgcGdNYXI6bWFyZ2lufT10aGlzLnByb3BzXG4gICAgICAgIGxldCBpbmZvPXtcbiAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgICBtYXJnaW4sXG4gICAgICAgICAgICBjb2x1bW5zOlt0aGlzLl9uZXdDb2x1bW4oMCldLFxuICAgICAgICAgICAgaGVhZGVyOm51bGwsXG4gICAgICAgICAgICBmb290ZXI6bnVsbFxuICAgICAgICB9XG5cdFx0cmV0dXJuIGluZm9cbiAgICB9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXMuY29tcHV0ZWRcblx0XHRpZihjb21wb3NlZC5sZW5ndGg9PTApXG5cdFx0XHR0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnB1c2godGhpcy5fbmV3UGFnZSgpKVxuXHRcdGNvbnN0IHtjb2xzOntudW06YWxsb3dlZENvbHVtbnM9MX19PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHt3aWR0aCxoZWlnaHQsIGNoaWxkcmVufT1jdXJyZW50Q29sdW1uXG4gICAgICAgIGxldCBhdmFpbGFibGVIZWlnaHQ9Y2hpbGRyZW4ucmVkdWNlKChwcmV2LCBhKT0+cHJldi1hLnByb3BzLmhlaWdodCxoZWlnaHQpXG5cbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBuZXZlciBjYW4gZmluZCBtaW4gYXJlYVxuICAgICAgICB3aGlsZShhdmFpbGFibGVIZWlnaHQ8PW1pblJlcXVpcmVkSCB8fCB3aWR0aDxtaW5SZXF1aXJlZFcpe1xuICAgICAgICAgICAgaWYoYWxsb3dlZENvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuXHRcdFx0XHRjb21wb3NlZC5wdXNoKGN1cnJlbnRQYWdlPXRoaXMuX25ld1BhZ2UoY29tcG9zZWQubGVuZ3RoKSlcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uPWN1cnJlbnRQYWdlLmNvbHVtbnNbMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpZHRoPWN1cnJlbnRDb2x1bW4ud2lkdGhcbiAgICAgICAgICAgIGhlaWdodD1jdXJyZW50Q29sdW1uLmhlaWdodFxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt3aWR0aCwgaGVpZ2h0OmF2YWlsYWJsZUhlaWdodH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzLmNvbXB1dGVkXG5cdFx0Y29uc3Qge2NvbHM6e251bTphbGxvd2VkQ29sdW1ucz0xfX09dGhpcy5wcm9wc1xuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICBjb25zdCB7aGVpZ2h0OmNvbnRlbnRIZWlnaHR9PWxpbmUucHJvcHNcblxuXHRcdGlmKGNvbnRlbnRIZWlnaHQ+YXZhaWxhYmxlSGVpZ2h0KXtcbiAgICAgICAgICAgIGlmKGFsbG93ZWRDb2x1bW5zPmNvbHVtbnMubGVuZ3RoKXsvLyBuZXcgY29sdW1uXG4gICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKGN1cnJlbnRDb2x1bW49dGhpcy5fbmV3Q29sdW1uKGNvbHVtbnMubGVuZ3RoKSlcbiAgICAgICAgICAgIH1lbHNley8vbmV3IHBhZ2VcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKGN1cnJlbnRQYWdlKVxuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG5cbiAgICAgICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY3VycmVudENvbHVtbi53aWR0aCE9bGluZS53aWR0aFxuXG4gICAgICAgICAgICBjaGlsZHJlbj1jdXJyZW50Q29sdW1uLmNoaWxkcmVuXG4gICAgICAgIH1cblxuXHRcdGNoaWxkcmVuLnB1c2godGhpcy5jcmVhdGVDb21wb3NlZDJQYXJlbnQoe2NoaWxkcmVuOmxpbmUsIGhlaWdodDpjb250ZW50SGVpZ2h0LCB5OiBoZWlnaHQtYXZhaWxhYmxlSGVpZ2h0fSkpXG4gICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY29udGVudEhlaWdodCBzdGlsbCA+IGF2YWlsYWJsZUhlaWdodFxuICAgIH1cblxuXHQvKipcblx0ICogIHNlY3Rpb24gbmVlZG4ndCBhcHBlbmQgdG8gZG9jdW1lbnQsIGJ1dCBnaXZlIGNoYW5jZSBmb3IgZXh0ZW5zaW9uXG5cdCAqL1xuXHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xuXHRcdHJldHVybiA8R3JvdXAgey4uLnByb3BzfS8+XG5cdH1cblxuICAgIG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuICAgICAgICAvL2Rvbid0IGNoZWNrLCBhbmQgZG9jdW1lbnQgd2lsbCBjaGVjayBhZ2FpbnN0IGxhc3QgcGFnZVxuICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMuY29tcHV0ZWQuY29tcG9zZWRbdGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGgtMV0pXG4gICAgICAgIHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHBnU3o6IHtcblx0XHRcdHdpZHRoOiAzMDAsXG5cdFx0XHRoZWlnaHQ6IDQwMFxuXHRcdH0sXG5cdFx0cGdNYXI6e1xuXHRcdFx0bGVmdDoyMCxcblx0XHRcdHJpZ2h0OjIwLFxuXHRcdFx0dG9wOjIwLFxuXHRcdFx0Ym90dG9tOjIwLFxuXG5cdFx0XHRoZWFkZXI6MTAsXG5cdFx0XHRmb290ZXI6MTAsXG5cblx0XHRcdGd1dHRlcjowXG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHByb3BUeXBlcz17XG5cdFx0cGdTejogUHJvcFR5cGVzLnNoYXBlKHtcblx0XHRcdHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG5cdFx0XHRoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxuXHRcdH0pLFxuXHRcdHBnTWFyOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0bGVmdDogUHJvcFR5cGVzLm51bWJlcixcblx0XHRcdHJpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0dG9wOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0Ym90dG9tOiBQcm9wVHlwZXMubnVtYmVyLFxuXG5cdFx0XHRoZWFkZXI6IFByb3BUeXBlcy5udW1iZXIsXG5cdFx0XHRmb290ZXI6IFByb3BUeXBlcy5udW1iZXIsXG5cblx0XHRcdGd1dHRlcjogUHJvcFR5cGVzLm51bWJlcixcblx0XHR9KSxcblx0XHRjb2xzOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cbiJdfQ==