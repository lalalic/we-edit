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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Document)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { width: _this.props.width, height: _this.props.height, composed: [] }, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Document, [{
		key: "render",
		value: function render() {
			//const {composed}=this
			var _state = this.state;
			var width = _state.width;
			var height = _state.height;
			var composed = _state.composed;


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
							{ key: i, y: y },
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

			this.setState({ width: width, height: height, composed: composed });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztvTUFDcEIsUUFBTSxFQUFDLE9BQU0sTUFBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFPLE1BQUssS0FBTCxDQUFXLE1BQVgsRUFBbUIsVUFBUyxFQUFUOzs7Y0FEckM7OzJCQUdUOztnQkFFc0IsS0FBSyxLQUFMLENBRnRCO09BRUgscUJBRkc7T0FFSSx1QkFGSjtPQUVZLDJCQUZaOzs7QUFJVixPQUFJLElBQUUsQ0FBRixDQUpNO0FBS0osVUFDTDs7aUJBQVMsS0FBSyxLQUFMLElBQVksT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBQW5EO0lBQ0UsS0FBSyxLQUFMLENBQVcsUUFBWDtJQUNEO0FBQUMsYUFBRDs7S0FFQyxTQUFTLEdBQVQsQ0FBYSxVQUFDLENBQUQsRUFBRyxDQUFILEVBQU87QUFDbkIsVUFBSSxVQUFROztTQUFPLEtBQUssQ0FBTCxFQUFRLEdBQUcsQ0FBSCxFQUFmO09BQXNCLENBQXRCO09BQVIsQ0FEZTtBQUVuQixXQUFHLEVBQUUsS0FBRixDQUFRLE1BQVIsQ0FGZ0I7QUFHbkIsYUFBTyxPQUFQLENBSG1CO01BQVAsQ0FGZDtLQUZEO0lBV0MscURBWEQ7SUFESyxDQUxJOzs7O29DQTJCUztnQkFDaUIsS0FBSyxLQUFMLENBRGpCO09BQ04scUJBRE07T0FDQSx1QkFEQTtPQUNRLHlCQURSOztBQUViLFVBQU8sT0FBTyxNQUFQLDRCQWhDTSx3REFnQ04sRUFBc0M7QUFDekMsWUFBUSxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQWUsZ0JBQWYsRUFBUjtJQURHLENBQVAsQ0FGYTs7Ozs7Ozs7O2lDQVVMLFNBQVE7T0FDZixXQUFVLEtBQVYsU0FEZTtpQkFFRixLQUFLLEtBQUwsQ0FGRTtPQUVqQixzQkFGaUI7T0FFVix3QkFGVTs7O0FBSXRCLE9BQUksUUFBTSxTQUFTLFNBQVQsQ0FBbUI7V0FBRyxFQUFFLEtBQUYsQ0FBUSxHQUFSLElBQWEsUUFBUSxLQUFSLENBQWMsR0FBZDtJQUFoQixDQUF6QixDQUprQjtBQUt0QixPQUFHLFNBQU8sQ0FBQyxDQUFELEVBQUc7QUFDWixhQUFTLElBQVQsQ0FBYyxPQUFkLEVBRFk7SUFBYixNQUVLO0FBQ0osYUFBUyxNQUFULENBQWdCLEtBQWhCLEVBQXNCLENBQXRCLEVBQXdCLE9BQXhCLEVBREk7SUFGTDtBQUtBLE9BQUksV0FBUyxTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxJQUFELEVBQU8sQ0FBUDtXQUFXLEtBQUssR0FBTCxDQUFTLElBQVQsRUFBZSxFQUFFLEtBQUYsQ0FBUSxLQUFSO0lBQTFCLEVBQXlDLENBQXpELENBQVQsQ0FWa0I7QUFXdEIsT0FBSSxZQUFVLFNBQVMsTUFBVCxDQUFnQixVQUFDLElBQUQsRUFBTyxDQUFQO1dBQVcsT0FBSyxFQUFFLEtBQUYsQ0FBUSxNQUFSO0lBQWhCLEVBQStCLENBQS9DLENBQVYsQ0FYa0I7O0FBYXRCLE9BQUcsV0FBUyxLQUFULEVBQ0YsUUFBTSxRQUFOLENBREQ7O0FBR0EsT0FBRyxZQUFVLE1BQVYsRUFDRixTQUFPLFlBQVUsS0FBSyxLQUFMLENBQVcsT0FBWCxDQURsQjs7QUFHQSxRQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQUQsRUFBUSxjQUFSLEVBQWdCLGtCQUFoQixFQUFkLEVBbkJzQjs7OztpQ0FzQlIsU0FBUTs7Ozs7UUE5REg7OztTQTBCVixvQkFBa0IsT0FBTyxNQUFQLENBQWM7QUFDbkMsU0FBUSxpQkFBVSxNQUFWO0NBRGEsRUFFdkIsY0FBUyxpQkFBVDtBQTVCZSxTQWtFYixlQUFhO0FBQ25CLFFBQU8sR0FBUDtBQUNBLFNBQU8sR0FBUDtBQUNBLFVBQVMsRUFBVDtBQUNBLFFBQU87QUFDTixjQUFXLFdBQVg7RUFERDs7a0JBdEVtQjs7SUE0RWYiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SGFzQ2hpbGR9IGZyb20gXCIuL2FueVwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2UvZ3JvdXBcIlxuaW1wb3J0IEN1cnNvciBmcm9tIFwiLi4vZWRpdG9yL2N1cnNvclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG5cdHN0YXRlPXt3aWR0aDp0aGlzLnByb3BzLndpZHRoLCBoZWlnaHQ6dGhpcy5wcm9wcy5oZWlnaHQsIGNvbXBvc2VkOltdfVxuXG4gICAgcmVuZGVyKCl7XG5cdFx0Ly9jb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodCwgY29tcG9zZWR9PXRoaXMuc3RhdGVcblx0XG5cdFx0bGV0IHk9MFxuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PHN2ZyB7Li4udGhpcy5wcm9wc30gd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gdmlld0JveD17YDAgMCAke3dpZHRofSAke2hlaWdodH1gfT5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHRcdDxDb21wb3NlZD5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbXBvc2VkLm1hcCgoYSxpKT0+e1xuXHRcdFx0XHRcdFx0bGV0IHNlY3Rpb249PEdyb3VwIGtleT17aX0geT17eX0+e2F9PC9Hcm91cD5cblx0XHRcdFx0XHRcdHkrPWEucHJvcHMuaGVpZ2h0XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VjdGlvblxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0PC9Db21wb3NlZD5cblx0XHRcdFx0PEN1cnNvci8+XG5cdFx0XHQ8L3N2Zz5cblx0XHQpXG5cbiAgICB9XG5cdFxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2FudmFzOiBQcm9wVHlwZXMub2JqZWN0XG4gICAgfSxIYXNDaGlsZC5jaGlsZENvbnRleHRUeXBlcylcblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICBjb25zdCB7d2lkdGgsaGVpZ2h0LCBwYWdlR2FwfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcbiAgICAgICAgICAgIGNhbnZhczoge3dpZHRoLGhlaWdodCwgcGFnZUdhcH1cbiAgICAgICAgfSlcbiAgICB9XG5cblx0LyoqXG5cdCAqICBzdXBwb3J0IG5ldywgYW5kIHJlcGxhY2UgYnkgX2lkXG5cdCAqL1xuXHRhcHBlbmRDb21wb3NlZChzZWN0aW9uKXtcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRsZXQge3dpZHRoLCBoZWlnaHR9PXRoaXMuc3RhdGVcblx0XHRcblx0XHRsZXQgZm91bmQ9Y29tcG9zZWQuZmluZEluZGV4KGE9PmEucHJvcHMuX2lkPT1zZWN0aW9uLnByb3BzLl9pZClcblx0XHRpZihmb3VuZD09LTEpe1xuXHRcdFx0Y29tcG9zZWQucHVzaChzZWN0aW9uKVxuXHRcdH1lbHNle1xuXHRcdFx0Y29tcG9zZWQuc3BsaWNlKGZvdW5kLDEsc2VjdGlvbilcblx0XHR9XG5cdFx0bGV0IG1pbldpZHRoPWNvbXBvc2VkLnJlZHVjZSgocHJldiwgYSk9Pk1hdGgubWF4KHByZXYsIGEucHJvcHMud2lkdGgpLDApXG5cdFx0bGV0IG1pbkhlaWdodD1jb21wb3NlZC5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2K2EucHJvcHMuaGVpZ2h0LDApXG5cblx0XHRpZihtaW5XaWR0aD53aWR0aClcblx0XHRcdHdpZHRoPW1pbldpZHRoXG5cblx0XHRpZihtaW5IZWlnaHQ+aGVpZ2h0KVxuXHRcdFx0aGVpZ2h0PW1pbkhlaWdodCt0aGlzLnByb3BzLnBhZ2VHYXBcblxuXHRcdHRoaXMuc2V0U3RhdGUoe3dpZHRoLCBoZWlnaHQsIGNvbXBvc2VkfSlcblx0fVxuXHRcblx0X3JlbW92ZUFsbEZyb20oc2VjdGlvbil7XG5cdFx0Ly9yZXBsYWNlIG1vZGUgZm9yIHNlY3Rpb25cblx0fVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHdpZHRoOiA2MDAsXG5cdFx0aGVpZ2h0OjEwMCxcblx0XHRwYWdlR2FwOiAyMCxcblx0XHRzdHlsZToge1xuXHRcdFx0YmFja2dyb3VuZDpcImxpZ2h0Z3JheVwiXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7fVxuIl19