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
			var _props$page = this.props.page;
			var height = _props$page.height;
			var width = _props$page.width;

			return _react2.default.createElement(
				_group2.default,
				{ x: (canvas.width - width) / 2, y: this.context.parent.getCurrentY() },
				_get(Object.getPrototypeOf(Section.prototype), "render", this).call(this),
				_react2.default.createElement(Composed, { ref: "composed", pages: this.composed,
					gap: canvas.pageGap, pageHeight: height })
			);
		}

		/**
   * i: column no
   */

	}, {
		key: "_newColumn",
		value: function _newColumn(i) {
			var _props$page2 = this.props.page;
			var width = _props$page2.width;
			var height = _props$page2.height;
			var margin = _props$page2.margin;
			//@TODO:

			return {
				x: margin,
				y: margin,
				width: width - 2 * margin,
				height: height - 2 * margin,
				children: []
			};
		}

		/**
   * i : page No, for first, even, odd page
   */

	}, {
		key: "_newPage",
		value: function _newPage(i) {
			var _props$page3 = this.props.page;
			var width = _props$page3.width;
			var height = _props$page3.height;
			var margin = _props$page3.margin;

			var info = {
				width: width,
				height: height,
				margin: margin,
				columns: [this._newColumn(0)],
				header: null,
				footer: null
			};

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
				if (this.props.page.columns > columns.length) {
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
		key: "_reComposeFrom",
		value: function _reComposeFrom(content) {
			var _this2 = this;

			var composed = this.composed;
			var targetId = content._id;

			var currentPage = composed[composed.length - 1];
			var _currentPage2 = currentPage;
			var columns = _currentPage2.columns;

			var currentColumn = columns[columns.length - 1];
			var found = -1;
			while (-1 == (found = currentColumn.children.findIndex(function (group) {
				//group/Line
				return group.props.children.props._id == targetId;
			}))) {
				columns.pop();
				if (columns.length) {
					currentColumn = columns[columns.length - 1];
					found = -1;
				} else {
					composed.pop();
					if (composed.length) {
						currentPage = composed[composed.length - 1];
						var _currentPage3 = currentPage;
						columns = _currentPage3.columns;

						currentColumn = columns[columns.length - 1];
						found = -1;
					} else {
						break;
						//throw new Error("you should find the line from section, but not")
					}
				}
			}

			if (found != -1) {
				(function () {
					var index = currentColumn.children[found].props.index;
					currentColumn.children.splice(found);

					var removed = _this2.children.splice(index);

					var composedTime = new Date().toString();
					removed.forEach(function (a, i) {
						a._reComposeFrom();
						/**
       *  do re-compose job
       */
						a.setState({ composedTime: composedTime });
					});
				})();
			} else {
				throw new Error("you should find the line from section, but not");
			}
		}
	}, {
		key: "appendComposed",
		value: function appendComposed(line) {
			var composed = this.composed;

			var currentPage = composed[composed.length - 1];
			var _currentPage4 = currentPage;
			var columns = _currentPage4.columns;

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
				if (this.props.page.columns > columns.length) {
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
	page: {
		width: 300,
		height: 400,
		margin: 20
	}
};
Section.propTypes = {
	page: _react.PropTypes.shape({
		width: _react.PropTypes.number.isRequired,
		height: _react.PropTypes.number.isRequired,
		margin: _react.PropTypes.number.isRequired
	})
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
			var _props = this.props;
			var pages = _props.pages;
			var gap = _props.gap;
			var pageHeight = _props.pageHeight;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L3NlY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7Ozs7O21NQUtqQixjQUFZOzs7Y0FMSzs7MkJBT1o7T0FDQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBREE7T0FFQSxTQUFRLEtBQUssT0FBTCxDQUFSLE9BRkE7cUJBR3NCLEtBQUssS0FBTCxDQUF0QixLQUhBO09BR00sNEJBSE47T0FHYywwQkFIZDs7QUFJUCxVQUNDOztNQUFPLEdBQUcsQ0FBQyxPQUFPLEtBQVAsR0FBYSxLQUFiLENBQUQsR0FBcUIsQ0FBckIsRUFBd0IsR0FBRyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFdBQXBCLEVBQUgsRUFBbEM7K0JBWmtCLDhDQVlsQjtJQUdDLDhCQUFDLFFBQUQsSUFBVSxLQUFJLFVBQUosRUFBZSxPQUFPLEtBQUssUUFBTDtBQUMvQixVQUFLLE9BQU8sT0FBUCxFQUFnQixZQUFZLE1BQVosRUFEdEIsQ0FIRDtJQURELENBSk87Ozs7Ozs7Ozs2QkFpQk0sR0FBRTtzQkFDMEIsS0FBSyxLQUFMLENBQTVCLEtBREU7T0FDSSwyQkFESjtPQUNVLDZCQURWO09BQ2lCOzs7QUFEakIsVUFJRjtBQUNILE9BQUUsTUFBRjtBQUNBLE9BQUUsTUFBRjtBQUNBLFdBQU8sUUFBTSxJQUFFLE1BQUY7QUFDYixZQUFPLFNBQU8sSUFBRSxNQUFGO0FBQ2QsY0FBUyxFQUFUO0lBTEosQ0FKUzs7Ozs7Ozs7OzJCQWdCSixHQUFFO3NCQUM0QixLQUFLLEtBQUwsQ0FBNUIsS0FEQTtPQUNNLDJCQUROO09BQ1ksNkJBRFo7T0FDbUIsNkJBRG5COztBQUVQLE9BQUksT0FBSztBQUNMLGdCQURLO0FBRUwsa0JBRks7QUFHTCxrQkFISztBQUlMLGFBQVEsQ0FBQyxLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBRCxDQUFSO0FB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LEtBQUssQ0FBTCxFQUFiO01BQXFCLDhDQUFVLElBQVYsQ0FBckI7TUFBVCxDQURlO0FBRW5CLFVBQUksYUFBVyxHQUFYLENBRmU7QUFHbkIsWUFBTyxPQUFQLENBSG1CO0tBQVYsQ0FGWDtJQURELENBSE87Ozs7UUFESCIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgQW55IGZyb20gXCIuL2FueVwiXG5cbmltcG9ydCBQYWdlIGZyb20gXCIuLi9jb21wb3NlZC9wYWdlXCJcbmltcG9ydCBHcm91cCBmcm9tIFwiLi4vY29tcG9zZWQvZ3JvdXBcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgQW55e1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNhbnZhczogUHJvcFR5cGVzLm9iamVjdCxcblx0XHR5OiBQcm9wVHlwZXMubnVtYmVyXG4gICAgfSwgQW55LmNvbnRleHRUeXBlcylcbiAgICBkaXNwbGF5TmFtZT1cInNlY3Rpb25cIlxuXHRcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7Y2FudmFzfT10aGlzLmNvbnRleHRcblx0XHRjb25zdCB7cGFnZTp7aGVpZ2h0LCB3aWR0aH19PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gKCBcblx0XHRcdDxHcm91cCB4PXsoY2FudmFzLndpZHRoLXdpZHRoKS8yfSB5PXt0aGlzLmNvbnRleHQucGFyZW50LmdldEN1cnJlbnRZKCl9PlxuXHRcdFx0XHR7c3VwZXIucmVuZGVyKCl9XG5cdFx0XHRcdFxuXHRcdFx0XHQ8Q29tcG9zZWQgcmVmPVwiY29tcG9zZWRcIiBwYWdlcz17dGhpcy5jb21wb3NlZH0gXG5cdFx0XHRcdFx0Z2FwPXtjYW52YXMucGFnZUdhcH0gcGFnZUhlaWdodD17aGVpZ2h0fS8+XG5cdFx0XHQ8L0dyb3VwPlxuXHRcdClcblx0fVxuXG4gICAgLyoqXG4gICAgICogaTogY29sdW1uIG5vXG4gICAgICovXG4gICAgX25ld0NvbHVtbihpKXtcbiAgICAgICAgY29uc3Qge3BhZ2U6e3dpZHRoLGhlaWdodCxtYXJnaW59fT10aGlzLnByb3BzXG4gICAgICAgIC8vQFRPRE86XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6bWFyZ2luLFxuICAgICAgICAgICAgeTptYXJnaW4sXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgtMiptYXJnaW4sXG4gICAgICAgICAgICBoZWlnaHQ6aGVpZ2h0LTIqbWFyZ2luLFxuICAgICAgICAgICAgY2hpbGRyZW46W11cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGkgOiBwYWdlIE5vLCBmb3IgZmlyc3QsIGV2ZW4sIG9kZCBwYWdlXG4gICAgICovXG4gICAgX25ld1BhZ2UoaSl7XG4gICAgICAgIGNvbnN0IHtwYWdlOnt3aWR0aCxoZWlnaHQsbWFyZ2lufX09dGhpcy5wcm9wc1xuICAgICAgICBsZXQgaW5mbz17XG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIG1hcmdpbixcbiAgICAgICAgICAgIGNvbHVtbnM6W3RoaXMuX25ld0NvbHVtbigwKV0sXG4gICAgICAgICAgICBoZWFkZXI6bnVsbCxcbiAgICAgICAgICAgIGZvb3RlcjpudWxsXG4gICAgICAgIH1cblx0XHRcblx0XHR0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKHRoaXMsIGluZm8pXG5cdFx0cmV0dXJuIGluZm9cbiAgICB9XG5cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UocmVxdWlyZWQ9e30pe1xuICAgICAgICBjb25zdCB7d2lkdGg6bWluUmVxdWlyZWRXPTAsaGVpZ2h0Om1pblJlcXVpcmVkSD0wfT1yZXF1aXJlZFxuICAgICAgICBjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRpZihjb21wb3NlZC5sZW5ndGg9PTApe1xuXHRcdFx0Y29tcG9zZWQucHVzaCh0aGlzLl9uZXdQYWdlKCkpXG5cdFx0fVxuICAgICAgICBsZXQgY3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7Y29sdW1uc309Y3VycmVudFBhZ2VcbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuICAgICAgICBsZXQge3dpZHRoLGhlaWdodCwgY2hpbGRyZW59PWN1cnJlbnRDb2x1bW5cbiAgICAgICAgbGV0IGF2YWlsYWJsZUhlaWdodD1jaGlsZHJlbi5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2LWEucHJvcHMuaGVpZ2h0LGhlaWdodClcblxuICAgICAgICAvL0BUT0RPOiB3aGF0IGlmIG5ldmVyIGNhbiBmaW5kIG1pbiBhcmVhXG4gICAgICAgIHdoaWxlKGF2YWlsYWJsZUhlaWdodDw9bWluUmVxdWlyZWRIIHx8IHdpZHRoPG1pblJlcXVpcmVkVyl7XG4gICAgICAgICAgICBpZih0aGlzLnByb3BzLnBhZ2UuY29sdW1ucz5jb2x1bW5zLmxlbmd0aCl7Ly8gbmV3IGNvbHVtblxuICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaChjdXJyZW50Q29sdW1uPXRoaXMuX25ld0NvbHVtbihjb2x1bW5zLmxlbmd0aCkpXG4gICAgICAgICAgICB9ZWxzZXsvL25ldyBwYWdlXG5cdFx0XHRcdGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2lkdGg9Y3VycmVudENvbHVtbi53aWR0aFxuICAgICAgICAgICAgaGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG4gICAgICAgICAgICBhdmFpbGFibGVIZWlnaHQ9Y3VycmVudENvbHVtbi5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3dpZHRoLCBoZWlnaHQ6YXZhaWxhYmxlSGVpZ2h0fVxuICAgIH1cblxuXHRfcmVDb21wb3NlRnJvbShjb250ZW50KXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0Y29uc3Qge19pZDogdGFyZ2V0SWR9PWNvbnRlbnRcbiAgICAgICAgbGV0IGN1cnJlbnRQYWdlPWNvbXBvc2VkW2NvbXBvc2VkLmxlbmd0aC0xXVxuICAgICAgICBsZXQge2NvbHVtbnN9PWN1cnJlbnRQYWdlXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uPWNvbHVtbnNbY29sdW1ucy5sZW5ndGgtMV1cblx0XHRsZXQgZm91bmQ9LTFcblx0XHR3aGlsZSgtMT09KGZvdW5kPWN1cnJlbnRDb2x1bW4uY2hpbGRyZW4uZmluZEluZGV4KGdyb3VwPT57Ly9ncm91cC9MaW5lXG5cdFx0XHRyZXR1cm4gZ3JvdXAucHJvcHMuY2hpbGRyZW4ucHJvcHMuX2lkPT10YXJnZXRJZFxuXHRcdH0pKSl7XG5cdFx0XHRjb2x1bW5zLnBvcCgpXG5cdFx0XHRpZihjb2x1bW5zLmxlbmd0aCl7XG5cdFx0XHRcdGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXVxuXHRcdFx0XHRmb3VuZD0tMVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGNvbXBvc2VkLnBvcCgpXG5cdFx0XHRcdGlmKGNvbXBvc2VkLmxlbmd0aCl7XG5cdFx0XHRcdFx0Y3VycmVudFBhZ2U9Y29tcG9zZWRbY29tcG9zZWQubGVuZ3RoLTFdO1xuXHRcdFx0XHRcdCh7Y29sdW1uc309Y3VycmVudFBhZ2UpO1xuXHRcdFx0XHRcdGN1cnJlbnRDb2x1bW49Y29sdW1uc1tjb2x1bW5zLmxlbmd0aC0xXTtcblx0XHRcdFx0XHRmb3VuZD0tMVxuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHQvL3Rocm93IG5ldyBFcnJvcihcInlvdSBzaG91bGQgZmluZCB0aGUgbGluZSBmcm9tIHNlY3Rpb24sIGJ1dCBub3RcIilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKGZvdW5kIT0tMSl7XG5cdFx0XHRjb25zdCBpbmRleD1jdXJyZW50Q29sdW1uLmNoaWxkcmVuW2ZvdW5kXS5wcm9wcy5pbmRleFxuXHRcdFx0Y3VycmVudENvbHVtbi5jaGlsZHJlbi5zcGxpY2UoZm91bmQpXG5cblx0XHRcdGNvbnN0IHJlbW92ZWQ9dGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgpXG5cblx0XHRcdGNvbnN0IGNvbXBvc2VkVGltZT1uZXcgRGF0ZSgpLnRvU3RyaW5nKClcblx0XHRcdHJlbW92ZWQuZm9yRWFjaCgoYSxpKT0+e1xuXHRcdFx0XHRhLl9yZUNvbXBvc2VGcm9tKClcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqICBkbyByZS1jb21wb3NlIGpvYlxuXHRcdFx0XHQgKi9cblx0XHRcdFx0YS5zZXRTdGF0ZSh7Y29tcG9zZWRUaW1lfSlcblx0XHRcdH0pXG5cdFx0fWVsc2V7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJ5b3Ugc2hvdWxkIGZpbmQgdGhlIGxpbmUgZnJvbSBzZWN0aW9uLCBidXQgbm90XCIpXG5cdFx0fVxuXHR9XG5cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcbiAgICAgICAgY29uc3Qge2NvbXBvc2VkfT10aGlzXG4gICAgICAgIGxldCBjdXJyZW50UGFnZT1jb21wb3NlZFtjb21wb3NlZC5sZW5ndGgtMV1cbiAgICAgICAgbGV0IHtjb2x1bW5zfT1jdXJyZW50UGFnZVxuICAgICAgICBsZXQgY3VycmVudENvbHVtbj1jb2x1bW5zW2NvbHVtbnMubGVuZ3RoLTFdXG4gICAgICAgIGxldCB7d2lkdGgsaGVpZ2h0LCBjaGlsZHJlbn09Y3VycmVudENvbHVtblxuICAgICAgICBsZXQgYXZhaWxhYmxlSGVpZ2h0PWNoaWxkcmVuLnJlZHVjZSgocHJldiwgYSk9PnByZXYtYS5wcm9wcy5oZWlnaHQsaGVpZ2h0KVxuXG4gICAgICAgIGNvbnN0IHtoZWlnaHQ6Y29udGVudEhlaWdodH09bGluZS5wcm9wc1xuXG5cdFx0aWYoY29udGVudEhlaWdodD5hdmFpbGFibGVIZWlnaHQpe1xuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5wYWdlLmNvbHVtbnM+Y29sdW1ucy5sZW5ndGgpey8vIG5ldyBjb2x1bW5cbiAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goY3VycmVudENvbHVtbj10aGlzLl9uZXdDb2x1bW4oY29sdW1ucy5sZW5ndGgpKVxuICAgICAgICAgICAgfWVsc2V7Ly9uZXcgcGFnZVxuICAgICAgICAgICAgICAgIGNvbXBvc2VkLnB1c2goY3VycmVudFBhZ2U9dGhpcy5fbmV3UGFnZShjb21wb3NlZC5sZW5ndGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW49Y3VycmVudFBhZ2UuY29sdW1uc1swXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXZhaWxhYmxlSGVpZ2h0PWN1cnJlbnRDb2x1bW4uaGVpZ2h0XG5cbiAgICAgICAgICAgIC8vQFRPRE86IHdoYXQgaWYgY3VycmVudENvbHVtbi53aWR0aCE9bGluZS53aWR0aFxuXG4gICAgICAgICAgICBjaGlsZHJlbj1jdXJyZW50Q29sdW1uLmNoaWxkcmVuXG4gICAgICAgIH1cblxuXHRcdGNoaWxkcmVuLnB1c2goPEdyb3VwIHk9e2hlaWdodC1hdmFpbGFibGVIZWlnaHR9IGhlaWdodD17Y29udGVudEhlaWdodH0gaW5kZXg9e3RoaXMuY2hpbGRyZW4ubGVuZ3RofT57bGluZX08L0dyb3VwPilcbiAgICAgICAgLy9AVE9ETzogd2hhdCBpZiBjb250ZW50SGVpZ2h0IHN0aWxsID4gYXZhaWxhYmxlSGVpZ2h0XG4gICAgfVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHBhZ2U6IHtcblx0XHRcdHdpZHRoOiAzMDAsXG5cdFx0XHRoZWlnaHQ6IDQwMCxcblx0XHRcdG1hcmdpbjogMjBcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRwYWdlOiBQcm9wVHlwZXMuc2hhcGUoe1xuXHRcdFx0d2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcblx0XHRcdGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXHRcdFx0bWFyZ2luOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcblx0XHR9KVxuXHR9XG59XG5cbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtwYWdlcywgZ2FwLCBwYWdlSGVpZ2h0fT10aGlzLnByb3BzXG5cdFx0bGV0IHk9MFxuXHRcdHJldHVybiAoXG5cdFx0XHQ8R3JvdXA+XG5cdFx0XHR7XG5cdFx0XHRcdHBhZ2VzLm1hcCgocGFnZSxpKT0+e1xuXHRcdFx0XHRcdGxldCBuZXdQYWdlPSg8R3JvdXAgeT17eX0ga2V5PXtpfT48UGFnZSB7Li4ucGFnZX0vPjwvR3JvdXA+KVxuXHRcdFx0XHRcdHkrPShwYWdlSGVpZ2h0K2dhcClcblx0XHRcdFx0XHRyZXR1cm4gbmV3UGFnZVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdFx0PC9Hcm91cD5cblx0XHQpXG5cdH1cbn1cbiJdfQ==