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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs7OztvTUFDcEIsUUFBTSxFQUFDLE9BQU0sTUFBSyxLQUFMLENBQVcsS0FBWCxFQUFrQixRQUFPLE1BQUssS0FBTCxDQUFXLE1BQVgsVUFDdEMsY0FBWTs7O2NBRlE7OzJCQUdUO09BQ0gsV0FBVSxLQUFWLFNBREc7Z0JBRVksS0FBSyxLQUFMLENBRlo7T0FFSCxxQkFGRztPQUVJLHVCQUZKOzs7QUFJVixPQUFJLElBQUUsQ0FBRixDQUpNO0FBS0osVUFDTDs7aUJBQVMsS0FBSyxLQUFMLElBQVksT0FBTyxLQUFQLEVBQWMsUUFBUSxNQUFSLEVBQWdCLGtCQUFnQixjQUFTLE1BQXpCLEdBQW5EO0lBQ0UsS0FBSyxLQUFMLENBQVcsUUFBWDtJQUNEO0FBQUMsYUFBRDtPQUFVLEtBQUksVUFBSixFQUFWO0tBRUMsU0FBUyxHQUFULENBQWEsVUFBQyxDQUFELEVBQUcsQ0FBSCxFQUFPO0FBQ25CLFVBQUksVUFBUTs7U0FBTyxLQUFLLEVBQUUsS0FBRixDQUFRLEdBQVIsRUFBYSxLQUFLLEVBQUUsS0FBRixDQUFRLEdBQVIsRUFBYSxHQUFHLENBQUgsRUFBM0M7T0FBa0QsQ0FBbEQ7T0FBUixDQURlO0FBRW5CLFdBQUcsRUFBRSxLQUFGLENBQVEsTUFBUixDQUZnQjtBQUduQixhQUFPLE9BQVAsQ0FIbUI7TUFBUCxDQUZkO0tBRkQ7SUFXQyxxREFYRDtJQURLLENBTEk7Ozs7b0NBMkJTO2dCQUNpQixLQUFLLEtBQUwsQ0FEakI7T0FDTixxQkFETTtPQUNBLHVCQURBO09BQ1EseUJBRFI7O0FBRW5CLFVBQU8sT0FBTyxNQUFQLDRCQWhDWSx3REFnQ1osRUFBc0M7QUFDbkMsWUFBUSxFQUFDLFlBQUQsRUFBTyxjQUFQLEVBQWUsZ0JBQWYsRUFBUjtJQURILENBQVAsQ0FGbUI7Ozs7Ozs7OztpQ0FVTCxTQUFRO09BQ2YsV0FBVSxLQUFWLFNBRGU7aUJBRUYsS0FBSyxLQUFMLENBRkU7T0FFakIsc0JBRmlCO09BRVYsd0JBRlU7T0FHZixNQUFLLFFBQVEsS0FBUixDQUFMLElBSGU7OztBQUt0QixPQUFJLFFBQU0sU0FBUyxTQUFULENBQW1CO1dBQUcsRUFBRSxLQUFGLENBQVEsR0FBUixJQUFhLEdBQWI7SUFBSCxDQUF6QixDQUxrQjtBQU10QixPQUFHLFNBQU8sQ0FBQyxDQUFELEVBQUc7QUFDWixhQUFTLElBQVQsQ0FBYyxPQUFkLEVBRFk7SUFBYixNQUVLO0FBQ0osYUFBUyxNQUFULENBQWdCLEtBQWhCLEVBQXNCLENBQXRCLEVBQXdCLE9BQXhCLEVBREk7SUFGTDtBQUtBLE9BQUksV0FBUyxTQUFTLE1BQVQsQ0FBZ0IsVUFBQyxJQUFELEVBQU8sQ0FBUDtXQUFXLEtBQUssR0FBTCxDQUFTLElBQVQsRUFBZSxFQUFFLEtBQUYsQ0FBUSxLQUFSO0lBQTFCLEVBQXlDLENBQXpELENBQVQsQ0FYa0I7QUFZdEIsT0FBSSxZQUFVLFNBQVMsTUFBVCxDQUFnQixVQUFDLElBQUQsRUFBTyxDQUFQO1dBQVcsT0FBSyxFQUFFLEtBQUYsQ0FBUSxNQUFSO0lBQWhCLEVBQStCLENBQS9DLENBQVYsQ0Faa0I7O0FBY3RCLE9BQUcsV0FBUyxLQUFULEVBQ0YsUUFBTSxRQUFOLENBREQ7O0FBR0EsT0FBRyxZQUFVLE1BQVYsRUFDRixTQUFPLFlBQVUsS0FBSyxLQUFMLENBQVcsT0FBWCxDQURsQjs7QUFHQSxXQUFRLEdBQVIsQ0FBZSxlQUFVLE1BQXpCLEVBcEJzQjtBQXFCdEIsUUFBSyxRQUFMLENBQWMsRUFBQyxZQUFELEVBQVEsY0FBUixFQUFkLEVBckJzQjs7QUF1QnRCLE9BQUcsS0FBSyxJQUFMLENBQVUsUUFBUSxHQUFSLENBQWIsRUFDQyxLQUFLLElBQUwsQ0FBVSxRQUFRLEdBQVIsQ0FBVixDQUF1QixRQUF2QixDQUFnQyxFQUFDLGNBQWEsSUFBSSxJQUFKLEdBQVcsUUFBWCxFQUFiLEVBQWpDLEVBREQ7Ozs7bUNBSWU7Ozs7O1FBbkVJOzs7U0EwQlYsb0JBQWtCLE9BQU8sTUFBUCxDQUFjO0FBQ25DLFNBQVEsaUJBQVUsTUFBVjtDQURhLEVBRXZCLGNBQVMsaUJBQVQ7QUE1QmUsU0F1RWIsZUFBYTtBQUNuQixRQUFPLEdBQVA7QUFDQSxTQUFPLEdBQVA7QUFDQSxVQUFTLEVBQVQ7QUFDQSxRQUFPO0FBQ04sY0FBVyxXQUFYO0VBREQ7O2tCQTNFbUI7O0lBaUZmIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0hhc0NoaWxkfSBmcm9tIFwiLi9hbnlcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcbmltcG9ydCBDdXJzb3IgZnJvbSBcIi4uL2VkaXRvci9jdXJzb3JcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIEhhc0NoaWxke1xuXHRzdGF0ZT17d2lkdGg6dGhpcy5wcm9wcy53aWR0aCwgaGVpZ2h0OnRoaXMucHJvcHMuaGVpZ2h0fVxuXHRkaXNwbGF5TmFtZT1cImRvY3VtZW50XCJcbiAgICByZW5kZXIoKXtcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRjb25zdCB7d2lkdGgsIGhlaWdodH09dGhpcy5zdGF0ZVxuXG5cdFx0bGV0IHk9MFxuICAgICAgICByZXR1cm4gKFxuXHRcdFx0PHN2ZyB7Li4udGhpcy5wcm9wc30gd2lkdGg9e3dpZHRofSBoZWlnaHQ9e2hlaWdodH0gdmlld0JveD17YDAgMCAke3dpZHRofSAke2hlaWdodH1gfT5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHRcdDxDb21wb3NlZCByZWY9XCJjb21wb3NlZFwiPlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y29tcG9zZWQubWFwKChhLGkpPT57XG5cdFx0XHRcdFx0XHRsZXQgc2VjdGlvbj08R3JvdXAgcmVmPXthLnByb3BzLl9pZH0ga2V5PXthLnByb3BzLl9pZH0geT17eX0+e2F9PC9Hcm91cD5cblx0XHRcdFx0XHRcdHkrPWEucHJvcHMuaGVpZ2h0XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VjdGlvblxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0PC9Db21wb3NlZD5cblx0XHRcdFx0PEN1cnNvci8+XG5cdFx0XHQ8L3N2Zz5cblx0XHQpXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9T2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNhbnZhczogUHJvcFR5cGVzLm9iamVjdFxuICAgIH0sSGFzQ2hpbGQuY2hpbGRDb250ZXh0VHlwZXMpXG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgY29uc3Qge3dpZHRoLGhlaWdodCwgcGFnZUdhcH09dGhpcy5wcm9wc1xuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHN1cGVyLmdldENoaWxkQ29udGV4dCgpLHtcbiAgICAgICAgICAgIGNhbnZhczoge3dpZHRoLGhlaWdodCwgcGFnZUdhcH1cbiAgICAgICAgfSlcbiAgICB9XG5cblx0LyoqXG5cdCAqICBzdXBwb3J0IG5ldywgYW5kIHJlcGxhY2UgYnkgX2lkXG5cdCAqL1xuXHRhcHBlbmRDb21wb3NlZChzZWN0aW9uKXtcblx0XHRjb25zdCB7Y29tcG9zZWR9PXRoaXNcblx0XHRsZXQge3dpZHRoLCBoZWlnaHR9PXRoaXMuc3RhdGVcblx0XHRjb25zdCB7X2lkfT1zZWN0aW9uLnByb3BzXG5cblx0XHRsZXQgZm91bmQ9Y29tcG9zZWQuZmluZEluZGV4KGE9PmEucHJvcHMuX2lkPT1faWQpXG5cdFx0aWYoZm91bmQ9PS0xKXtcblx0XHRcdGNvbXBvc2VkLnB1c2goc2VjdGlvbilcblx0XHR9ZWxzZXtcblx0XHRcdGNvbXBvc2VkLnNwbGljZShmb3VuZCwxLHNlY3Rpb24pXG5cdFx0fVxuXHRcdGxldCBtaW5XaWR0aD1jb21wb3NlZC5yZWR1Y2UoKHByZXYsIGEpPT5NYXRoLm1heChwcmV2LCBhLnByb3BzLndpZHRoKSwwKVxuXHRcdGxldCBtaW5IZWlnaHQ9Y29tcG9zZWQucmVkdWNlKChwcmV2LCBhKT0+cHJldithLnByb3BzLmhlaWdodCwwKVxuXG5cdFx0aWYobWluV2lkdGg+d2lkdGgpXG5cdFx0XHR3aWR0aD1taW5XaWR0aFxuXG5cdFx0aWYobWluSGVpZ2h0PmhlaWdodClcblx0XHRcdGhlaWdodD1taW5IZWlnaHQrdGhpcy5wcm9wcy5wYWdlR2FwXG5cdFxuXHRcdGNvbnNvbGUubG9nKGAke3dpZHRofSwgJHtoZWlnaHR9YClcblx0XHR0aGlzLnNldFN0YXRlKHt3aWR0aCwgaGVpZ2h0fSlcblx0XHRcblx0XHRpZih0aGlzLnJlZnNbc2VjdGlvbi5faWRdKVxuXHRcdFx0dGhpcy5yZWZzW3NlY3Rpb24uX2lkXS5zZXRTdGF0ZSh7Y29tcG9zZWRUaW1lOm5ldyBEYXRlKCkudG9TdHJpbmcoKX0pXG5cdH1cblxuXHRfcmVDb21wb3NlRnJvbSgpe1xuXHRcdC8vbmV2ZXIgcmVjb21wb3NlIGZyb20gZG9jdW1lbnRcblx0fVxuXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdHdpZHRoOiA2MDAsXG5cdFx0aGVpZ2h0OjEwMCxcblx0XHRwYWdlR2FwOiAyMCxcblx0XHRzdHlsZToge1xuXHRcdFx0YmFja2dyb3VuZDpcImxpZ2h0Z3JheVwiXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIENvbXBvc2VkIGV4dGVuZHMgR3JvdXB7fVxuIl19