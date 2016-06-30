"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _any = require("./any");

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _cursor = require("../editor/cursor");

var _cursor2 = _interopRequireDefault(_cursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_HasChild) {
	_inherits(Document, _HasChild);

	function Document() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, Document);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Document)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { width: _this.props.width, height: _this.props.height }, _this.displayName = "document", _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Document, [{
		key: "render",
		value: function render() {
			var composed = this.composed;
			var _state = this.state;
			var width = _state.width;
			var height = _state.height;


			var y = 0;
			return _react2.default.createElement(
				"svg",
				_extends({}, this.props, { width: width, height: height, viewBox: "0 0 " + width + " " + height }),
				this.props.children,
				_react2.default.createElement(
					Composed,
					{ ref: "composed" },
					composed.map(function (a, i) {
						var section = _react2.default.createElement(
							_group2.default,
							{ ref: a.props._id, key: a.props._id, y: y },
							a
						);
						y += a.props.height;
						return section;
					})
				),
				_react2.default.createElement(_cursor2.default, null)
			);
		}
	}, {
		key: "getChildContext",
		value: function getChildContext() {
			var _props = this.props;
			var width = _props.width;
			var height = _props.height;
			var pageGap = _props.pageGap;

			return Object.assign(_get(Object.getPrototypeOf(Document.prototype), "getChildContext", this).call(this), {
				canvas: { width: width, height: height, pageGap: pageGap }
			});
		}

		/**
   *  support new, and replace by _id
   */

	}, {
		key: "appendComposed",
		value: function appendComposed(section) {
			var composed = this.composed;
			var _state2 = this.state;
			var width = _state2.width;
			var height = _state2.height;
			var _id = section.props._id;


			var found = composed.findIndex(function (a) {
				return a.props._id == _id;
			});
			if (found == -1) {
				composed.push(section);
			} else {
				composed.splice(found, 1, section);
			}
			var minWidth = composed.reduce(function (prev, a) {
				return Math.max(prev, a.props.width);
			}, 0);
			var minHeight = composed.reduce(function (prev, a) {
				return prev + a.props.height;
			}, 0);

			if (minWidth > width) width = minWidth;

			if (minHeight > height) height = minHeight + this.props.pageGap;

			console.log(width + ", " + height);
			this.setState({ width: width, height: height });

			if (this.refs[section._id]) this.refs[section._id].setState({ composedTime: new Date().toString() });
		}
	}, {
		key: "_reComposeFrom",
		value: function _reComposeFrom() {
			//never recompose from document
		}
	}]);

	return Document;
}(_any.HasChild);

Document.childContextTypes = Object.assign({
	canvas: _react.PropTypes.object
}, _any.HasChild.childContextTypes);
Document.defaultProps = {
	width: 600,
	height: 100,
	pageGap: 20,
	style: {
		background: "lightgray"
	}
};
exports.default = Document;

var Composed = function (_Group) {
	_inherits(Composed, _Group);

	function Composed() {
		_classCallCheck(this, Composed);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Composed).apply(this, arguments));
	}

	return Composed;
}(_group2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztvTUFDcEIsUUFBTSxFQUFDLE9BQU0sTUFBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFPLE1BQUssS0FBTCxDQUFXLE1BQVgsVUFDdEMsY0FBWTs7O2NBRlE7OzJCQUdUO09BQ0gsV0FBVSxLQUFWLFNBREc7Z0JBRVksS0FBSyxLQUFMLENBRlo7T0FFSCxxQkFGRztPQUVJLHVCQUZKOzs7QUFJVixPQUFJLElBQUUsQ0FBRixDQUpNO0FBS0osVUFDTDs7aUJBQVMsS0FBSyxLQUFMLElBQVksT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBQW5EO0lBQ0UsS0FBSyxLQUFMLENBQVcsUUFBWDtJQUNEO0FBQUMsYUFBRDtPQUFVLEtBQUksVUFBSixFQUFWO0tBRUMsU0FBUyxHQUFULENBQWEsVUFBQyxDQUFELEVBQUcsQ0FBSCxFQUFPO0FBQ25CLFVBQUksVUFBUTs7U0FBTyxLQUFLLEVBQUUsS0FBRixDQUFRLEdBQVIsRUFBYSxLQUFLLEVBQUUsS0FBRixDQUFRLEdBQVIsRUFBYSxHQUFHLENBQUgsRUFBM0M7T0FBa0QsQ0FBbEQ7T0FBUixDQURlO0FBRW5CLFdBQUcsRUFBRSxLQUFGLENBQVEsTUFBUixDQUZnQjtBQUduQixhQUFPLE9BQVAsQ0FIbUI7TUFBUCxDQUZkO0tBRkQ7SUFXQyxxREFYRDtJQURLLENBTEk7Ozs7b0NBMkJTO2dCQUNpQixLQUFLLEtBQUwsQ0FEakI7T0FDTixxQkFETTtPQUNBLHVCQURBO09BQ1EseUJBRFI7O0FBRW5CLFVBQU8sT0FBTyxNQUFQLDRCQWhDWSx3REFnQ1osRUFBc0M7QUFDbkMsWUFBUSxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQWUsZ0JBQWYsRUFBUjtJQURILENBQVAsQ0FGbUI7Ozs7Ozs7OztpQ0FVTCxTQUFRO09BQ2YsV0FBVSxLQUFWLFNBRGU7aUJBRUYsS0FBSyxLQUFMLENBRkU7T0FFakIsc0JBRmlCO09BRVYsd0JBRlU7T0FHZixNQUFLLFFBQVEsS0FBUixDQUFMLElBSGU7OztBQUt0QixPQUFJLFFBQU0sU0FBUyxTQUFULENBQW1CO1dBQUcsRUFBRSxLQUFGLENBQVEsR0FBUixJQUFhLEdBQWI7SUFBSCxDQUF6QixDQUxrQjtBQU10QixPQUFHLFNBQU8sQ0FBQyxDQUFELEVBQUc7QUFDWixhQUFTLElBQVQsQ0FBYyxPQUFkLEVBRFk7SUFBYixNQUVLO0FBQ0osYUFBUyxNQUFULENBQWdCLEtBQWhCLEVBQXNCLENBQXRCLEVBQXdCLE9BQXhCLEVBREk7SUFGTDtBQUtBLE9BQUksV0FBUyxTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxJQUFELEVBQU8sQ0FBUDtXQUFXLEtBQUssR0FBTCxDQUFTLElBQVQsRUFBZSxFQUFFLEtBQUYsQ0FBUSxLQUFSO0lBQTFCLEVBQXlDLENBQXpELENBQVQsQ0FYa0I7QUFZdEIsT0FBSSxZQUFVLFNBQVMsTUFBVCxDQUFnQixVQUFDLElBQUQsRUFBTyxDQUFQO1dBQVcsT0FBSyxFQUFFLEtBQUYsQ0FBUSxNQUFSO0lBQWhCLEVBQStCLENBQS9DLENBQVYsQ0Faa0I7O0FBY3RCLE9BQUcsV0FBUyxLQUFULEVBQ0YsUUFBTSxRQUFOLENBREQ7O0FBR0EsT0FBRyxZQUFVLE1BQVYsRUFDRixTQUFPLFlBQVUsS0FBSyxLQUFMLENBQVcsT0FBWCxDQURsQjs7QUFHQSxXQUFRLEdBQVIsQ0FBZSxlQUFVLE1BQXpCLEVBcEJzQjtBQXFCdEIsUUFBSyxRQUFMLENBQWMsRUFBQyxZQUFELEVBQVEsY0FBUixFQUFkLEVBckJzQjs7QUF1QnRCLE9BQUcsS0FBSyxJQUFMLENBQVUsUUFBUSxHQUFSLENBQWIsRUFDQyxLQUFLLElBQUwsQ0FBVSxRQUFRLEdBQVIsQ0FBVixDQUF1QixRQUF2QixDQUFnQyxFQUFDLGNBQWEsSUFBSSxJQUFKLEdBQVcsUUFBWCxFQUFiLEVBQWpDLEVBREQ7Ozs7bUNBSWU7Ozs7O1FBbkVJOzs7U0EwQlYsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ25DLFNBQVEsaUJBQVUsTUFBVjtDQURhLEVBRXZCLGNBQVMsaUJBQVQ7QUE1QmUsU0F1RWIsZUFBYTtBQUNuQixRQUFPLEdBQVA7QUFDQSxTQUFPLEdBQVA7QUFDQSxVQUFTLEVBQVQ7QUFDQSxRQUFPO0FBQ04sY0FBVyxXQUFYO0VBREQ7O2tCQTNFbUI7O0lBaUZmIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0hhc0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlZC9ncm91cFwiXG5pbXBvcnQgQ3Vyc29yIGZyb20gXCIuLi9lZGl0b3IvY3Vyc29yXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBIYXNDaGlsZHtcblx0c3RhdGU9e3dpZHRoOnRoaXMucHJvcHMud2lkdGgsIGhlaWdodDp0aGlzLnByb3BzLmhlaWdodH1cblx0ZGlzcGxheU5hbWU9XCJkb2N1bWVudFwiXG4gICAgcmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0Y29uc3Qge3dpZHRoLCBoZWlnaHR9PXRoaXMuc3RhdGVcblxuXHRcdGxldCB5PTBcbiAgICAgICAgcmV0dXJuIChcblx0XHRcdDxzdmcgey4uLnRoaXMucHJvcHN9IHdpZHRoPXt3aWR0aH0gaGVpZ2h0PXtoZWlnaHR9IHZpZXdCb3g9e2AwIDAgJHt3aWR0aH0gJHtoZWlnaHR9YH0+XG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXHRcdFx0XHQ8Q29tcG9zZWQgcmVmPVwiY29tcG9zZWRcIj5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbXBvc2VkLm1hcCgoYSxpKT0+e1xuXHRcdFx0XHRcdFx0bGV0IHNlY3Rpb249PEdyb3VwIHJlZj17YS5wcm9wcy5faWR9IGtleT17YS5wcm9wcy5faWR9IHk9e3l9PnthfTwvR3JvdXA+XG5cdFx0XHRcdFx0XHR5Kz1hLnByb3BzLmhlaWdodFxuXHRcdFx0XHRcdFx0cmV0dXJuIHNlY3Rpb25cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHRcdDwvQ29tcG9zZWQ+XG5cdFx0XHRcdDxDdXJzb3IvPlxuXHRcdFx0PC9zdmc+XG5cdFx0KVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9LEhhc0NoaWxkLmNoaWxkQ29udGV4dFR5cGVzKVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIGNvbnN0IHt3aWR0aCxoZWlnaHQsIHBhZ2VHYXB9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG4gICAgICAgICAgICBjYW52YXM6IHt3aWR0aCxoZWlnaHQsIHBhZ2VHYXB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgc3VwcG9ydCBuZXcsIGFuZCByZXBsYWNlIGJ5IF9pZFxuXHQgKi9cblx0YXBwZW5kQ29tcG9zZWQoc2VjdGlvbil7XG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0bGV0IHt3aWR0aCwgaGVpZ2h0fT10aGlzLnN0YXRlXG5cdFx0Y29uc3Qge19pZH09c2VjdGlvbi5wcm9wc1xuXG5cdFx0bGV0IGZvdW5kPWNvbXBvc2VkLmZpbmRJbmRleChhPT5hLnByb3BzLl9pZD09X2lkKVxuXHRcdGlmKGZvdW5kPT0tMSl7XG5cdFx0XHRjb21wb3NlZC5wdXNoKHNlY3Rpb24pXG5cdFx0fWVsc2V7XG5cdFx0XHRjb21wb3NlZC5zcGxpY2UoZm91bmQsMSxzZWN0aW9uKVxuXHRcdH1cblx0XHRsZXQgbWluV2lkdGg9Y29tcG9zZWQucmVkdWNlKChwcmV2LCBhKT0+TWF0aC5tYXgocHJldiwgYS5wcm9wcy53aWR0aCksMClcblx0XHRsZXQgbWluSGVpZ2h0PWNvbXBvc2VkLnJlZHVjZSgocHJldiwgYSk9PnByZXYrYS5wcm9wcy5oZWlnaHQsMClcblxuXHRcdGlmKG1pbldpZHRoPndpZHRoKVxuXHRcdFx0d2lkdGg9bWluV2lkdGhcblxuXHRcdGlmKG1pbkhlaWdodD5oZWlnaHQpXG5cdFx0XHRoZWlnaHQ9bWluSGVpZ2h0K3RoaXMucHJvcHMucGFnZUdhcFxuXG5cdFx0Y29uc29sZS5sb2coYCR7d2lkdGh9LCAke2hlaWdodH1gKVxuXHRcdHRoaXMuc2V0U3RhdGUoe3dpZHRoLCBoZWlnaHR9KVxuXG5cdFx0aWYodGhpcy5yZWZzW3NlY3Rpb24uX2lkXSlcblx0XHRcdHRoaXMucmVmc1tzZWN0aW9uLl9pZF0uc2V0U3RhdGUoe2NvbXBvc2VkVGltZTpuZXcgRGF0ZSgpLnRvU3RyaW5nKCl9KVxuXHR9XG5cblx0X3JlQ29tcG9zZUZyb20oKXtcblx0XHQvL25ldmVyIHJlY29tcG9zZSBmcm9tIGRvY3VtZW50XG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR3aWR0aDogNjAwLFxuXHRcdGhlaWdodDoxMDAsXG5cdFx0cGFnZUdhcDogMjAsXG5cdFx0c3R5bGU6IHtcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBDb21wb3NlZCBleHRlbmRzIEdyb3Vwe31cbiJdfQ==