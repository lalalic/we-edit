"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HasChild = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../composed/group");

var _group2 = _interopRequireDefault(_group);

var _reactAddonsShallowCompare = require("react-addons-shallow-compare");

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var uuid = 0;

var HasChild = exports.HasChild = function (_Component) {
	_inherits(HasChild, _Component);

	function HasChild() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, HasChild);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = { content: _react2.default.Children.toArray(_this.props.children) }, _this.children = [], _this.composed = [], _this._id = uuid++, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(HasChild, [{
		key: "getChildContext",
		value: function getChildContext() {
			return {
				y: this.composed.reduce(function (prev, a) {
					return prev + a.height || a.props.height;
				}, 0),
				parent: this
			};
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props;
			var children = _props.children;

			var others = _objectWithoutProperties(_props, ["children"]);

			var content = this.state.content;

			return _react2.default.createElement(
				_group2.default,
				this.props,
				content
			);
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			this.compose();
		}
	}, {
		key: "compose",
		value: function compose() {
			this._startComposeAt = Date.now();
		}

		/**
   * children should call before composing line,
   * return next line rect {*width, [height]}
   */

	}, {
		key: "nextAvailableSpace",
		value: function nextAvailableSpace() {
			var required = arguments.length <= 0 || arguments[0] === undefined ? { width: 0, height: 0 } : arguments[0];
		}

		/**
      * children should call after a line composed out
      * a chance to add to self's composed
      */

	}, {
		key: "appendComposed",
		value: function appendComposed(line) {}

		/**
   *  child calls context.parent.on1ChildComposed() to notify parent 1 child composed
   *  return
   *  	true: parent's all children composed
   */

	}, {
		key: "on1ChildComposed",
		value: function on1ChildComposed(child) {
			console.info("composed a " + child.displayName + " " + (child.displayName == 'text' ? ":" + (child.state.text || child.props.children) : ''));
			this.children.push(child);
			if (_react2.default.Children.count(this.props.children) == this.children.length) {
				this.onAllChildrenComposed();
			}
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			console.log(this.displayName + "(" + this._id + ") composed within " + (Date.now() - this._startComposeAt) + "ms");
		}
	}]);

	return HasChild;
}(_react.Component);

HasChild.childContextTypes = {
	parent: _react.PropTypes.object,
	x: _react.PropTypes.number,
	y: _react.PropTypes.number,
	width: _react.PropTypes.number,
	height: _react.PropTypes.number
};

var HasParent = function (_HasChild) {
	_inherits(HasParent, _HasChild);

	function HasParent() {
		_classCallCheck(this, HasParent);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(HasParent).apply(this, arguments));
	}

	_createClass(HasParent, [{
		key: "nextAvailableSpace",


		/**
   * children should call before composing line,
   * return next line rect {*width, [height]}
   */
		value: function nextAvailableSpace() {
			var _context$parent;

			return (_context$parent = this.context.parent).nextAvailableSpace.apply(_context$parent, arguments);
		}

		/**
   * children should call after a line composed out
   * a chance to add to self's composed
   */

	}, {
		key: "appendComposed",
		value: function appendComposed() {
			var _context$parent2;

			return (_context$parent2 = this.context.parent).appendComposed.apply(_context$parent2, arguments);
		}

		/**
   *  it's a very complicated job, so we need a very simple design, one sentence described solution. options:
   *  1. remove all composed, and re-compose all
   *  	- need find a time to recompose
   *  	- logic is most simple
   *  	- performance is most bad
   *
   *  2. remove all composed from this content, and re-compose removals
   *  	- Need locate composed of this content in page
   *  	- Need find a time to recompose
   *  		> componentDidUpdate
   *  			. any state update,
   *  			. and carefully tuned shouldComponentUpdate(nextProps, nextState, nextContext)
   *  	- performance is better than #1
   *
   *  3. recompose this content, and check if new composed fits last composed space (hit ratio is low)
   *  	- Yes: just replace
   *  	- No: #1, or #2
   *  	- and then loop with all following content with the same logic
   *
   *  	3.a: recompose this content line by line ..., much logics here
   */

	}, {
		key: "reCompose",
		value: function reCompose() {
			this.composed[0] && this._reComposeFrom(this.composed[0]); //#2 solution
		}

		/**
   *  if with content
   *  	> simply ask parent to recompose
   *  if without content
   *  	> just remove all and offspring to be ready to re-compose
   *  	> somewhere sometime it will be triggered to re-compose
   */

	}, {
		key: "_reComposeFrom",
		value: function _reComposeFrom(content) {
			console.info("remove all from " + this.displayName + " " + (content ? "" : "not") + " including child, and parent");
			if (content) this.context.parent._reComposeFrom(this);else {
				this.composed.splice(0);
				this.children.forEach(function (a) {
					return a._reComposeFrom();
				});
				this.children.splice(0);
			}
		}
		/**
   * only no composed should be re-compose
   */

	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
			console.info("shouldComponentUpdate on " + this.displayName + ", with " + (this.composed.length == 0));
			if (this.composed.length == 0) this.compose();
			return true;
		}
	}, {
		key: "onAllChildrenComposed",
		value: function onAllChildrenComposed() {
			this.context.parent.on1ChildComposed(this);
			_get(Object.getPrototypeOf(HasParent.prototype), "onAllChildrenComposed", this).call(this);
		}
	}]);

	return HasParent;
}(HasChild);

HasParent.contextTypes = {
	parent: _react.PropTypes.object
};
exports.default = HasParent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLE9BQUssQ0FBTDs7SUFDUzs7Ozs7Ozs7Ozs7Ozs7b01BQ1QsUUFBTSxFQUFDLFNBQVEsZ0JBQU0sUUFBTixDQUFlLE9BQWYsQ0FBdUIsTUFBSyxLQUFMLENBQVcsUUFBWCxDQUEvQixVQUNWLFdBQVMsVUFDTixXQUFTLFVBQ1osTUFBSTs7O2NBSlE7O29DQWNRO0FBQ2IsVUFBTztBQUNILE9BQUcsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixVQUFDLElBQUQsRUFBTyxDQUFQO1lBQVcsT0FBSyxFQUFFLE1BQUYsSUFBVSxFQUFFLEtBQUYsQ0FBUSxNQUFSO0tBQTFCLEVBQXlDLENBQTlELENBQUg7QUFDVCxZQUFRLElBQVI7SUFGSyxDQURhOzs7OzJCQU9aO2dCQUNxQixLQUFLLEtBQUwsQ0FEckI7T0FDQSwyQkFEQTs7T0FDYSx3REFEYjs7T0FFQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBRkE7O0FBR0QsVUFBTzs7SUFBVyxLQUFLLEtBQUw7SUFBYSxPQUF4QjtJQUFQLENBSEM7Ozs7dUNBTWU7QUFDaEIsUUFBSyxPQUFMLEdBRGdCOzs7OzRCQUlkO0FBQ1IsUUFBSyxlQUFMLEdBQXFCLEtBQUssR0FBTCxFQUFyQixDQURROzs7Ozs7Ozs7O3VDQVEwQztPQUE3QixpRUFBUyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxrQkFBVTs7Ozs7Ozs7OztpQ0FRakMsTUFBSzs7Ozs7Ozs7OzttQ0FTSCxPQUFNO0FBQ3pCLFdBQVEsSUFBUixpQkFBMkIsTUFBTSxXQUFOLFVBQXFCLE1BQU0sV0FBTixJQUFtQixNQUFuQixVQUFnQyxNQUFNLEtBQU4sQ0FBWSxJQUFaLElBQWtCLE1BQU0sS0FBTixDQUFZLFFBQVosQ0FBbEQsR0FBMkUsRUFBM0UsQ0FBaEQsRUFEeUI7QUFFekIsUUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFuQixFQUZ5QjtBQUd6QixPQUFHLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBckIsSUFBMkMsS0FBSyxRQUFMLENBQWMsTUFBZCxFQUFxQjtBQUNsRSxTQUFLLHFCQUFMLEdBRGtFO0lBQW5FOzs7OzBDQUtzQjtBQUN0QixXQUFRLEdBQVIsQ0FBZSxLQUFLLFdBQUwsU0FBb0IsS0FBSyxHQUFMLDJCQUE2QixLQUFLLEdBQUwsS0FBVyxLQUFLLGVBQUwsUUFBM0UsRUFEc0I7Ozs7UUFoRVg7OztTQU1GLG9CQUFrQjtBQUMzQixTQUFRLGlCQUFVLE1BQVY7QUFDRixJQUFHLGlCQUFVLE1BQVY7QUFDVCxJQUFHLGlCQUFVLE1BQVY7QUFDSCxRQUFPLGlCQUFVLE1BQVY7QUFDUCxTQUFRLGlCQUFVLE1BQVY7OztJQTBEVzs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNBU0c7OztBQUNoQixVQUFPLHdCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLGtCQUFwQix3QkFBMEMsU0FBMUMsQ0FBUCxDQURnQjs7Ozs7Ozs7OzttQ0FRSjs7O0FBQ1osVUFBTyx5QkFBSyxPQUFMLENBQWEsTUFBYixFQUFvQixjQUFwQix5QkFBc0MsU0FBdEMsQ0FBUCxDQURZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQTBCUjtBQUNWLFFBQUssUUFBTCxDQUFjLENBQWQsS0FBb0IsS0FBSyxjQUFMLENBQW9CLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBcEIsQ0FBcEI7QUFEVTs7Ozs7Ozs7Ozs7O2lDQVdJLFNBQVE7QUFDaEIsV0FBUSxJQUFSLHNCQUFnQyxLQUFLLFdBQUwsVUFBb0IsVUFBVSxFQUFWLEdBQWUsS0FBZixrQ0FBcEQsRUFEZ0I7QUFFdEIsT0FBRyxPQUFILEVBQ0MsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixjQUFwQixDQUFtQyxJQUFuQyxFQURELEtBRUk7QUFDSCxTQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLEVBREc7QUFFSCxTQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCO1lBQUcsRUFBRSxjQUFGO0tBQUgsQ0FBdEIsQ0FGRztBQUdILFNBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFIRztJQUZKOzs7Ozs7Ozt3Q0FXd0IsV0FBVyxXQUFXLGFBQVk7QUFDcEQsV0FBUSxJQUFSLCtCQUF5QyxLQUFLLFdBQUwsZ0JBQTBCLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBc0IsQ0FBdEIsQ0FBbkUsRUFEb0Q7QUFFcEQsT0FBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLElBQXNCLENBQXRCLEVBQ0MsS0FBSyxPQUFMLEdBREo7QUFFQSxVQUFPLElBQVAsQ0FKb0Q7Ozs7MENBT3BDO0FBQ3RCLFFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsZ0JBQXBCLENBQXFDLElBQXJDLEVBRHNCO0FBRXRCLDhCQTVFbUIsK0RBNEVuQixDQUZzQjs7OztRQTFFSDtFQUFrQjs7QUFBbEIsVUFDVixlQUFhO0FBQ2hCLFNBQVEsaUJBQVUsTUFBVjs7a0JBRksiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBzaGFsbG93Q29tcGFyZSBmcm9tICdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJ1xuXG52YXIgdXVpZD0wXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e2NvbnRlbnQ6UmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKX1cblx0Y2hpbGRyZW49W11cbiAgICBjb21wb3NlZD1bXVxuXHRfaWQ9dXVpZCsrXG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdHBhcmVudDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgeDogUHJvcFR5cGVzLm51bWJlcixcblx0XHR5OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGhlaWdodDogUHJvcFR5cGVzLm51bWJlclxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeTogdGhpcy5jb21wb3NlZC5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2K2EuaGVpZ2h0fHxhLnByb3BzLmhlaWdodCwwKSxcblx0XHRcdHBhcmVudDogdGhpc1xuICAgICAgICB9XG4gICAgfVxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxHcm91cCB7Li4udGhpcy5wcm9wc30+e2NvbnRlbnR9PC9Hcm91cD5cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICB9XG5cblx0Y29tcG9zZSgpe1xuXHRcdHRoaXMuX3N0YXJ0Q29tcG9zZUF0PURhdGUubm93KClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17d2lkdGg6MCwgaGVpZ2h0OjB9KXtcblxuICAgIH1cblxuXHQvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxuXHQgKiAgcmV0dXJuXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxuXHQgKi9cbiAgICBvbjFDaGlsZENvbXBvc2VkKGNoaWxkKXtcblx0XHRjb25zb2xlLmluZm8oYGNvbXBvc2VkIGEgJHtjaGlsZC5kaXNwbGF5TmFtZX0gJHtjaGlsZC5kaXNwbGF5TmFtZT09J3RleHQnID8gYDoke2NoaWxkLnN0YXRlLnRleHR8fGNoaWxkLnByb3BzLmNoaWxkcmVufWAgOiAnJ31gKVxuXHRcdHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZClcblx0XHRpZihSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKT09dGhpcy5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0dGhpcy5vbkFsbENoaWxkcmVuQ29tcG9zZWQoKVxuXHRcdH1cbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cdFx0Y29uc29sZS5sb2coYCR7dGhpcy5kaXNwbGF5TmFtZX0oJHt0aGlzLl9pZH0pIGNvbXBvc2VkIHdpdGhpbiAke0RhdGUubm93KCktdGhpcy5fc3RhcnRDb21wb3NlQXR9bXNgKVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc1BhcmVudCBleHRlbmRzIEhhc0NoaWxke1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuXHQvKipcblx0ICogIGl0J3MgYSB2ZXJ5IGNvbXBsaWNhdGVkIGpvYiwgc28gd2UgbmVlZCBhIHZlcnkgc2ltcGxlIGRlc2lnbiwgb25lIHNlbnRlbmNlIGRlc2NyaWJlZCBzb2x1dGlvbi4gb3B0aW9uczpcblx0ICogIDEuIHJlbW92ZSBhbGwgY29tcG9zZWQsIGFuZCByZS1jb21wb3NlIGFsbFxuXHQgKiAgXHQtIG5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXG5cdCAqICBcdC0gbG9naWMgaXMgbW9zdCBzaW1wbGVcblx0ICogIFx0LSBwZXJmb3JtYW5jZSBpcyBtb3N0IGJhZFxuXHQgKlxuXHQgKiAgMi4gcmVtb3ZlIGFsbCBjb21wb3NlZCBmcm9tIHRoaXMgY29udGVudCwgYW5kIHJlLWNvbXBvc2UgcmVtb3ZhbHNcblx0ICogIFx0LSBOZWVkIGxvY2F0ZSBjb21wb3NlZCBvZiB0aGlzIGNvbnRlbnQgaW4gcGFnZVxuXHQgKiAgXHQtIE5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXG5cdCAqICBcdFx0PiBjb21wb25lbnREaWRVcGRhdGVcblx0ICogIFx0XHRcdC4gYW55IHN0YXRlIHVwZGF0ZSxcblx0ICogIFx0XHRcdC4gYW5kIGNhcmVmdWxseSB0dW5lZCBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KVxuXHQgKiAgXHQtIHBlcmZvcm1hbmNlIGlzIGJldHRlciB0aGFuICMxXG5cdCAqXG5cdCAqICAzLiByZWNvbXBvc2UgdGhpcyBjb250ZW50LCBhbmQgY2hlY2sgaWYgbmV3IGNvbXBvc2VkIGZpdHMgbGFzdCBjb21wb3NlZCBzcGFjZSAoaGl0IHJhdGlvIGlzIGxvdylcblx0ICogIFx0LSBZZXM6IGp1c3QgcmVwbGFjZVxuXHQgKiAgXHQtIE5vOiAjMSwgb3IgIzJcblx0ICogIFx0LSBhbmQgdGhlbiBsb29wIHdpdGggYWxsIGZvbGxvd2luZyBjb250ZW50IHdpdGggdGhlIHNhbWUgbG9naWNcblx0ICpcblx0ICogIFx0My5hOiByZWNvbXBvc2UgdGhpcyBjb250ZW50IGxpbmUgYnkgbGluZSAuLi4sIG11Y2ggbG9naWNzIGhlcmVcblx0ICovXG5cdHJlQ29tcG9zZSgpe1xuXHRcdHRoaXMuY29tcG9zZWRbMF0gJiYgdGhpcy5fcmVDb21wb3NlRnJvbSh0aGlzLmNvbXBvc2VkWzBdKS8vIzIgc29sdXRpb25cblx0fVxuXG5cdC8qKlxuXHQgKiAgaWYgd2l0aCBjb250ZW50XG5cdCAqICBcdD4gc2ltcGx5IGFzayBwYXJlbnQgdG8gcmVjb21wb3NlXG5cdCAqICBpZiB3aXRob3V0IGNvbnRlbnRcblx0ICogIFx0PiBqdXN0IHJlbW92ZSBhbGwgYW5kIG9mZnNwcmluZyB0byBiZSByZWFkeSB0byByZS1jb21wb3NlXG5cdCAqICBcdD4gc29tZXdoZXJlIHNvbWV0aW1lIGl0IHdpbGwgYmUgdHJpZ2dlcmVkIHRvIHJlLWNvbXBvc2Vcblx0ICovXG5cdF9yZUNvbXBvc2VGcm9tKGNvbnRlbnQpe1xuICAgICAgICBjb25zb2xlLmluZm8oYHJlbW92ZSBhbGwgZnJvbSAke3RoaXMuZGlzcGxheU5hbWV9ICR7Y29udGVudCA/IFwiXCIgOiBcIm5vdFwifSBpbmNsdWRpbmcgY2hpbGQsIGFuZCBwYXJlbnRgKVxuXHRcdGlmKGNvbnRlbnQpXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50Ll9yZUNvbXBvc2VGcm9tKHRoaXMpXG5cdFx0ZWxzZXtcblx0XHRcdHRoaXMuY29tcG9zZWQuc3BsaWNlKDApXG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+YS5fcmVDb21wb3NlRnJvbSgpKVxuXHRcdFx0dGhpcy5jaGlsZHJlbi5zcGxpY2UoMClcblx0XHR9XG5cdH1cbiAgICAvKipcbiAgICAgKiBvbmx5IG5vIGNvbXBvc2VkIHNob3VsZCBiZSByZS1jb21wb3NlXG4gICAgICovXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCl7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhgc2hvdWxkQ29tcG9uZW50VXBkYXRlIG9uICR7dGhpcy5kaXNwbGF5TmFtZX0sIHdpdGggJHt0aGlzLmNvbXBvc2VkLmxlbmd0aD09MH1gKVxuICAgICAgICBpZih0aGlzLmNvbXBvc2VkLmxlbmd0aD09MClcbiAgICAgICAgICAgIHRoaXMuY29tcG9zZSgpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG5cdG9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpe1xuXHRcdHRoaXMuY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCh0aGlzKVxuXHRcdHN1cGVyLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdH1cbn1cbiJdfQ==