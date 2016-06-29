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

var _group = require("../compose/group");

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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Document)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { width: _this.props.width, height: _this.props.height, composedTime: new Date().toLocaleString() }, _this.displayName = "document", _temp), _possibleConstructorReturn(_this, _ret);
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
					null,
					composed.map(function (a, i) {
						var section = _react2.default.createElement(
							_group2.default,
							{ key: new Date().toLocaleString(), y: y },
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


			var found = composed.findIndex(function (a) {
				return a.props._id == section.props._id;
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

			this.setState({ width: width, height: height, composedTime: new Date().toLocaleString() });
		}
	}, {
		key: "_removeAllFrom",
		value: function _removeAllFrom(section) {
			//replace mode for section
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztvTUFDcEIsUUFBTSxFQUFDLE9BQU0sTUFBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFPLE1BQUssS0FBTCxDQUFXLE1BQVgsRUFBbUIsY0FBYSxJQUFJLElBQUosR0FBVyxjQUFYLEVBQWIsVUFDekQsY0FBWTs7O2NBRlE7OzJCQUdUO09BQ0gsV0FBVSxLQUFWLFNBREc7Z0JBRVksS0FBSyxLQUFMLENBRlo7T0FFSCxxQkFGRztPQUVJLHVCQUZKOzs7QUFJVixPQUFJLElBQUUsQ0FBRixDQUpNO0FBS0osVUFDTDs7aUJBQVMsS0FBSyxLQUFMLElBQVksT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBQW5EO0lBQ0UsS0FBSyxLQUFMLENBQVcsUUFBWDtJQUNEO0FBQUMsYUFBRDs7S0FFQyxTQUFTLEdBQVQsQ0FBYSxVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDbkIsVUFBSSxVQUFROztTQUFPLEtBQUssSUFBSSxJQUFKLEdBQVcsY0FBWCxFQUFMLEVBQWtDLEdBQUcsQ0FBSCxFQUF6QztPQUFnRCxDQUFoRDtPQUFSLENBRGU7QUFFbkIsV0FBRyxFQUFFLEtBQUYsQ0FBUSxNQUFSLENBRmdCO0FBR25CLGFBQU8sT0FBUCxDQUhtQjtNQUFQLENBRmQ7S0FGRDtJQVdDLHFEQVhEO0lBREssQ0FMSTs7OztvQ0EyQlM7Z0JBQ2lCLEtBQUssS0FBTCxDQURqQjtPQUNOLHFCQURNO09BQ0EsdUJBREE7T0FDUSx5QkFEUjs7QUFFbkIsVUFBTyxPQUFPLE1BQVAsNEJBaENZLHdEQWdDWixFQUFzQztBQUNuQyxZQUFRLEVBQUMsWUFBRCxFQUFPLGNBQVAsRUFBZSxnQkFBZixFQUFSO0lBREgsQ0FBUCxDQUZtQjs7Ozs7Ozs7O2lDQVVMLFNBQVE7T0FDZixXQUFVLEtBQVYsU0FEZTtpQkFFRixLQUFLLEtBQUwsQ0FGRTtPQUVqQixzQkFGaUI7T0FFVix3QkFGVTs7O0FBSXRCLE9BQUksUUFBTSxTQUFTLFNBQVQsQ0FBbUI7V0FBRyxFQUFFLEtBQUYsQ0FBUSxHQUFSLElBQWEsUUFBUSxLQUFSLENBQWMsR0FBZDtJQUFoQixDQUF6QixDQUprQjtBQUt0QixPQUFHLFNBQU8sQ0FBQyxDQUFELEVBQUc7QUFDWixhQUFTLElBQVQsQ0FBYyxPQUFkLEVBRFk7SUFBYixNQUVLO0FBQ0osYUFBUyxNQUFULENBQWdCLEtBQWhCLEVBQXNCLENBQXRCLEVBQXdCLE9BQXhCLEVBREk7SUFGTDtBQUtBLE9BQUksV0FBUyxTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxJQUFELEVBQU8sQ0FBUDtXQUFXLEtBQUssR0FBTCxDQUFTLElBQVQsRUFBZSxFQUFFLEtBQUYsQ0FBUSxLQUFSO0lBQTFCLEVBQXlDLENBQXpELENBQVQsQ0FWa0I7QUFXdEIsT0FBSSxZQUFVLFNBQVMsTUFBVCxDQUFnQixVQUFDLElBQUQsRUFBTyxDQUFQO1dBQVcsT0FBSyxFQUFFLEtBQUYsQ0FBUSxNQUFSO0lBQWhCLEVBQStCLENBQS9DLENBQVYsQ0FYa0I7O0FBYXRCLE9BQUcsV0FBUyxLQUFULEVBQ0YsUUFBTSxRQUFOLENBREQ7O0FBR0EsT0FBRyxZQUFVLE1BQVYsRUFDRixTQUFPLFlBQVUsS0FBSyxLQUFMLENBQVcsT0FBWCxDQURsQjs7QUFHQSxRQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQUQsRUFBUSxjQUFSLEVBQWdCLGNBQWMsSUFBSSxJQUFKLEdBQVcsY0FBWCxFQUFkLEVBQTlCLEVBbkJzQjs7OztpQ0FzQlIsU0FBUTs7Ozs7UUE5REg7OztTQTBCVixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDbkMsU0FBUSxpQkFBVSxNQUFWO0NBRGEsRUFFdkIsY0FBUyxpQkFBVDtBQTVCZSxTQWtFYixlQUFhO0FBQ25CLFFBQU8sR0FBUDtBQUNBLFNBQU8sR0FBUDtBQUNBLFVBQVMsRUFBVDtBQUNBLFFBQU87QUFDTixjQUFXLFdBQVg7RUFERDs7a0JBdEVtQjs7SUE0RWYiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuaW1wb3J0IEN1cnNvciBmcm9tIFwiLi4vZWRpdG9yL2N1cnNvclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG5cdHN0YXRlPXt3aWR0aDp0aGlzLnByb3BzLndpZHRoLCBoZWlnaHQ6dGhpcy5wcm9wcy5oZWlnaHQsIGNvbXBvc2VkVGltZTpuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCl9XG5cdGRpc3BsYXlOYW1lPVwiZG9jdW1lbnRcIlxuICAgIHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjb21wb3NlZH09dGhpc1xuXHRcdGNvbnN0IHt3aWR0aCwgaGVpZ2h0fT10aGlzLnN0YXRlXG5cblx0XHRsZXQgeT0wXG4gICAgICAgIHJldHVybiAoXG5cdFx0XHQ8c3ZnIHsuLi50aGlzLnByb3BzfSB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSB2aWV3Qm94PXtgMCAwICR7d2lkdGh9ICR7aGVpZ2h0fWB9PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdFx0PENvbXBvc2VkPlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29tcG9zZWQubWFwKChhLGkpPT57XG5cdFx0XHRcdFx0XHRsZXQgc2VjdGlvbj08R3JvdXAga2V5PXtuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCl9IHk9e3l9PnthfTwvR3JvdXA+XG5cdFx0XHRcdFx0XHR5Kz1hLnByb3BzLmhlaWdodFxuXHRcdFx0XHRcdFx0cmV0dXJuIHNlY3Rpb25cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHRcdDwvQ29tcG9zZWQ+XG5cdFx0XHRcdDxDdXJzb3IvPlxuXHRcdFx0PC9zdmc+XG5cdFx0KVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjYW52YXM6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9LEhhc0NoaWxkLmNoaWxkQ29udGV4dFR5cGVzKVxuXG4gICAgZ2V0Q2hpbGRDb250ZXh0KCl7XG4gICAgICAgIGNvbnN0IHt3aWR0aCxoZWlnaHQsIHBhZ2VHYXB9PXRoaXMucHJvcHNcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzdXBlci5nZXRDaGlsZENvbnRleHQoKSx7XG4gICAgICAgICAgICBjYW52YXM6IHt3aWR0aCxoZWlnaHQsIHBhZ2VHYXB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgc3VwcG9ydCBuZXcsIGFuZCByZXBsYWNlIGJ5IF9pZFxuXHQgKi9cblx0YXBwZW5kQ29tcG9zZWQoc2VjdGlvbil7XG5cdFx0Y29uc3Qge2NvbXBvc2VkfT10aGlzXG5cdFx0bGV0IHt3aWR0aCwgaGVpZ2h0fT10aGlzLnN0YXRlXG5cblx0XHRsZXQgZm91bmQ9Y29tcG9zZWQuZmluZEluZGV4KGE9PmEucHJvcHMuX2lkPT1zZWN0aW9uLnByb3BzLl9pZClcblx0XHRpZihmb3VuZD09LTEpe1xuXHRcdFx0Y29tcG9zZWQucHVzaChzZWN0aW9uKVxuXHRcdH1lbHNle1xuXHRcdFx0Y29tcG9zZWQuc3BsaWNlKGZvdW5kLDEsc2VjdGlvbilcblx0XHR9XG5cdFx0bGV0IG1pbldpZHRoPWNvbXBvc2VkLnJlZHVjZSgocHJldiwgYSk9Pk1hdGgubWF4KHByZXYsIGEucHJvcHMud2lkdGgpLDApXG5cdFx0bGV0IG1pbkhlaWdodD1jb21wb3NlZC5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2K2EucHJvcHMuaGVpZ2h0LDApXG5cblx0XHRpZihtaW5XaWR0aD53aWR0aClcblx0XHRcdHdpZHRoPW1pbldpZHRoXG5cblx0XHRpZihtaW5IZWlnaHQ+aGVpZ2h0KVxuXHRcdFx0aGVpZ2h0PW1pbkhlaWdodCt0aGlzLnByb3BzLnBhZ2VHYXBcblxuXHRcdHRoaXMuc2V0U3RhdGUoe3dpZHRoLCBoZWlnaHQsIGNvbXBvc2VkVGltZTogbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpfSlcblx0fVxuXG5cdF9yZW1vdmVBbGxGcm9tKHNlY3Rpb24pe1xuXHRcdC8vcmVwbGFjZSBtb2RlIGZvciBzZWN0aW9uXG5cdH1cblxuXHRzdGF0aWMgZGVmYXVsdFByb3BzPXtcblx0XHR3aWR0aDogNjAwLFxuXHRcdGhlaWdodDoxMDAsXG5cdFx0cGFnZUdhcDogMjAsXG5cdFx0c3R5bGU6IHtcblx0XHRcdGJhY2tncm91bmQ6XCJsaWdodGdyYXlcIlxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBDb21wb3NlZCBleHRlbmRzIEdyb3Vwe31cbiJdfQ==