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
			if (this.state.content.length == this.children.length) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLE9BQUssQ0FBTDs7SUFDUzs7Ozs7Ozs7Ozs7Ozs7b01BQ1QsUUFBTSxFQUFDLFNBQVEsZ0JBQU0sUUFBTixDQUFlLE9BQWYsQ0FBdUIsTUFBSyxLQUFMLENBQVcsUUFBWCxDQUEvQixVQUNWLFdBQVMsVUFDTixXQUFTLFVBQ1osTUFBSTs7O2NBSlE7O29DQWNRO0FBQ2IsVUFBTztBQUNILE9BQUcsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixVQUFDLElBQUQsRUFBTyxDQUFQO1lBQVcsT0FBSyxFQUFFLE1BQUYsSUFBVSxFQUFFLEtBQUYsQ0FBUSxNQUFSO0tBQTFCLEVBQXlDLENBQTlELENBQUg7QUFDVCxZQUFRLElBQVI7SUFGSyxDQURhOzs7OzJCQU9aO2dCQUNxQixLQUFLLEtBQUwsQ0FEckI7T0FDQSwyQkFEQTs7T0FDYSx3REFEYjs7T0FFQSxVQUFTLEtBQUssS0FBTCxDQUFULFFBRkE7O0FBR0QsVUFBTzs7SUFBVyxLQUFLLEtBQUw7SUFBYSxPQUF4QjtJQUFQLENBSEM7Ozs7dUNBTWU7QUFDaEIsUUFBSyxPQUFMLEdBRGdCOzs7OzRCQUlkO0FBQ1IsUUFBSyxlQUFMLEdBQXFCLEtBQUssR0FBTCxFQUFyQixDQURROzs7Ozs7Ozs7O3VDQVEwQztPQUE3QixpRUFBUyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxrQkFBVTs7Ozs7Ozs7OztpQ0FRakMsTUFBSzs7Ozs7Ozs7OzttQ0FTSCxPQUFNO0FBQ3pCLFdBQVEsSUFBUixpQkFBMkIsTUFBTSxXQUFOLFVBQXFCLE1BQU0sV0FBTixJQUFtQixNQUFuQixVQUFnQyxNQUFNLEtBQU4sQ0FBWSxJQUFaLElBQWtCLE1BQU0sS0FBTixDQUFZLFFBQVosQ0FBbEQsR0FBMkUsRUFBM0UsQ0FBaEQsRUFEeUI7QUFFekIsUUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFuQixFQUZ5QjtBQUd6QixPQUFHLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsTUFBbkIsSUFBMkIsS0FBSyxRQUFMLENBQWMsTUFBZCxFQUFxQjtBQUNsRCxTQUFLLHFCQUFMLEdBRGtEO0lBQW5EOzs7OzBDQUtzQjtBQUN0QixXQUFRLEdBQVIsQ0FBZSxLQUFLLFdBQUwsU0FBb0IsS0FBSyxHQUFMLDJCQUE2QixLQUFLLEdBQUwsS0FBVyxLQUFLLGVBQUwsUUFBM0UsRUFEc0I7Ozs7UUFoRVg7OztTQU1GLG9CQUFrQjtBQUMzQixTQUFRLGlCQUFVLE1BQVY7QUFDRixJQUFHLGlCQUFVLE1BQVY7QUFDVCxJQUFHLGlCQUFVLE1BQVY7QUFDSCxRQUFPLGlCQUFVLE1BQVY7QUFDUCxTQUFRLGlCQUFVLE1BQVY7OztJQTBEVzs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNBU0c7OztBQUNoQixVQUFPLHdCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLGtCQUFwQix3QkFBMEMsU0FBMUMsQ0FBUCxDQURnQjs7Ozs7Ozs7OzttQ0FRSjs7O0FBQ1osVUFBTyx5QkFBSyxPQUFMLENBQWEsTUFBYixFQUFvQixjQUFwQix5QkFBc0MsU0FBdEMsQ0FBUCxDQURZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQTBCUjtBQUNWLFFBQUssUUFBTCxDQUFjLENBQWQsS0FBb0IsS0FBSyxjQUFMLENBQW9CLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBcEIsQ0FBcEI7QUFEVTs7Ozs7Ozs7Ozs7O2lDQVdJLFNBQVE7QUFDaEIsV0FBUSxJQUFSLHNCQUFnQyxLQUFLLFdBQUwsVUFBb0IsVUFBVSxFQUFWLEdBQWUsS0FBZixrQ0FBcEQsRUFEZ0I7QUFFdEIsT0FBRyxPQUFILEVBQ0MsS0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixjQUFwQixDQUFtQyxJQUFuQyxFQURELEtBRUk7QUFDSCxTQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLEVBREc7QUFFSCxTQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCO1lBQUcsRUFBRSxjQUFGO0tBQUgsQ0FBdEIsQ0FGRztBQUdILFNBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFIRztJQUZKOzs7Ozs7Ozt3Q0FXd0IsV0FBVyxXQUFXLGFBQVk7QUFDcEQsV0FBUSxJQUFSLCtCQUF5QyxLQUFLLFdBQUwsZ0JBQTBCLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBc0IsQ0FBdEIsQ0FBbkUsRUFEb0Q7QUFFcEQsT0FBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLElBQXNCLENBQXRCLEVBQ0MsS0FBSyxPQUFMLEdBREo7QUFFQSxVQUFPLElBQVAsQ0FKb0Q7Ozs7MENBT3BDO0FBQ3RCLFFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsZ0JBQXBCLENBQXFDLElBQXJDLEVBRHNCO0FBRXRCLDhCQTVFbUIsK0RBNEVuQixDQUZzQjs7OztRQTFFSDtFQUFrQjs7QUFBbEIsVUFDVixlQUFhO0FBQ2hCLFNBQVEsaUJBQVUsTUFBVjs7a0JBRksiLCJmaWxlIjoiYW55LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgR3JvdXAgZnJvbSBcIi4uL2NvbXBvc2VkL2dyb3VwXCJcbmltcG9ydCBzaGFsbG93Q29tcGFyZSBmcm9tICdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJ1xuXG52YXIgdXVpZD0wXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e2NvbnRlbnQ6UmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKX1cblx0Y2hpbGRyZW49W11cbiAgICBjb21wb3NlZD1bXVxuXHRfaWQ9dXVpZCsrXG5cbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xuXHRcdHBhcmVudDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgICAgeDogUHJvcFR5cGVzLm51bWJlcixcblx0XHR5OiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuXHRcdGhlaWdodDogUHJvcFR5cGVzLm51bWJlclxuICAgIH1cblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeTogdGhpcy5jb21wb3NlZC5yZWR1Y2UoKHByZXYsIGEpPT5wcmV2K2EuaGVpZ2h0fHxhLnByb3BzLmhlaWdodCwwKSxcblx0XHRcdHBhcmVudDogdGhpc1xuICAgICAgICB9XG4gICAgfVxuXG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjaGlsZHJlbiwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge2NvbnRlbnR9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIDxHcm91cCB7Li4udGhpcy5wcm9wc30+e2NvbnRlbnR9PC9Hcm91cD5cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICB9XG5cblx0Y29tcG9zZSgpe1xuXHRcdHRoaXMuX3N0YXJ0Q29tcG9zZUF0PURhdGUubm93KClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZShyZXF1aXJlZD17d2lkdGg6MCwgaGVpZ2h0OjB9KXtcblxuICAgIH1cblxuXHQvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKGxpbmUpe1xuXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgY2hpbGQgY2FsbHMgY29udGV4dC5wYXJlbnQub24xQ2hpbGRDb21wb3NlZCgpIHRvIG5vdGlmeSBwYXJlbnQgMSBjaGlsZCBjb21wb3NlZFxuXHQgKiAgcmV0dXJuXG5cdCAqICBcdHRydWU6IHBhcmVudCdzIGFsbCBjaGlsZHJlbiBjb21wb3NlZFxuXHQgKi9cbiAgICBvbjFDaGlsZENvbXBvc2VkKGNoaWxkKXtcblx0XHRjb25zb2xlLmluZm8oYGNvbXBvc2VkIGEgJHtjaGlsZC5kaXNwbGF5TmFtZX0gJHtjaGlsZC5kaXNwbGF5TmFtZT09J3RleHQnID8gYDoke2NoaWxkLnN0YXRlLnRleHR8fGNoaWxkLnByb3BzLmNoaWxkcmVufWAgOiAnJ31gKVxuXHRcdHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZClcblx0XHRpZih0aGlzLnN0YXRlLmNvbnRlbnQubGVuZ3RoPT10aGlzLmNoaWxkcmVuLmxlbmd0aCl7XG5cdFx0XHR0aGlzLm9uQWxsQ2hpbGRyZW5Db21wb3NlZCgpXG5cdFx0fVxuICAgIH1cblxuXHRvbkFsbENoaWxkcmVuQ29tcG9zZWQoKXtcblx0XHRjb25zb2xlLmxvZyhgJHt0aGlzLmRpc3BsYXlOYW1lfSgke3RoaXMuX2lkfSkgY29tcG9zZWQgd2l0aGluICR7RGF0ZS5ub3coKS10aGlzLl9zdGFydENvbXBvc2VBdH1tc2ApXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzUGFyZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXG5cdC8qKlxuXHQgKiAgaXQncyBhIHZlcnkgY29tcGxpY2F0ZWQgam9iLCBzbyB3ZSBuZWVkIGEgdmVyeSBzaW1wbGUgZGVzaWduLCBvbmUgc2VudGVuY2UgZGVzY3JpYmVkIHNvbHV0aW9uLiBvcHRpb25zOlxuXHQgKiAgMS4gcmVtb3ZlIGFsbCBjb21wb3NlZCwgYW5kIHJlLWNvbXBvc2UgYWxsXG5cdCAqICBcdC0gbmVlZCBmaW5kIGEgdGltZSB0byByZWNvbXBvc2Vcblx0ICogIFx0LSBsb2dpYyBpcyBtb3N0IHNpbXBsZVxuXHQgKiAgXHQtIHBlcmZvcm1hbmNlIGlzIG1vc3QgYmFkXG5cdCAqXG5cdCAqICAyLiByZW1vdmUgYWxsIGNvbXBvc2VkIGZyb20gdGhpcyBjb250ZW50LCBhbmQgcmUtY29tcG9zZSByZW1vdmFsc1xuXHQgKiAgXHQtIE5lZWQgbG9jYXRlIGNvbXBvc2VkIG9mIHRoaXMgY29udGVudCBpbiBwYWdlXG5cdCAqICBcdC0gTmVlZCBmaW5kIGEgdGltZSB0byByZWNvbXBvc2Vcblx0ICogIFx0XHQ+IGNvbXBvbmVudERpZFVwZGF0ZVxuXHQgKiAgXHRcdFx0LiBhbnkgc3RhdGUgdXBkYXRlLFxuXHQgKiAgXHRcdFx0LiBhbmQgY2FyZWZ1bGx5IHR1bmVkIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpXG5cdCAqICBcdC0gcGVyZm9ybWFuY2UgaXMgYmV0dGVyIHRoYW4gIzFcblx0ICpcblx0ICogIDMuIHJlY29tcG9zZSB0aGlzIGNvbnRlbnQsIGFuZCBjaGVjayBpZiBuZXcgY29tcG9zZWQgZml0cyBsYXN0IGNvbXBvc2VkIHNwYWNlIChoaXQgcmF0aW8gaXMgbG93KVxuXHQgKiAgXHQtIFllczoganVzdCByZXBsYWNlXG5cdCAqICBcdC0gTm86ICMxLCBvciAjMlxuXHQgKiAgXHQtIGFuZCB0aGVuIGxvb3Agd2l0aCBhbGwgZm9sbG93aW5nIGNvbnRlbnQgd2l0aCB0aGUgc2FtZSBsb2dpY1xuXHQgKlxuXHQgKiAgXHQzLmE6IHJlY29tcG9zZSB0aGlzIGNvbnRlbnQgbGluZSBieSBsaW5lIC4uLiwgbXVjaCBsb2dpY3MgaGVyZVxuXHQgKi9cblx0cmVDb21wb3NlKCl7XG5cdFx0dGhpcy5jb21wb3NlZFswXSAmJiB0aGlzLl9yZUNvbXBvc2VGcm9tKHRoaXMuY29tcG9zZWRbMF0pLy8jMiBzb2x1dGlvblxuXHR9XG5cblx0LyoqXG5cdCAqICBpZiB3aXRoIGNvbnRlbnRcblx0ICogIFx0PiBzaW1wbHkgYXNrIHBhcmVudCB0byByZWNvbXBvc2Vcblx0ICogIGlmIHdpdGhvdXQgY29udGVudFxuXHQgKiAgXHQ+IGp1c3QgcmVtb3ZlIGFsbCBhbmQgb2Zmc3ByaW5nIHRvIGJlIHJlYWR5IHRvIHJlLWNvbXBvc2Vcblx0ICogIFx0PiBzb21ld2hlcmUgc29tZXRpbWUgaXQgd2lsbCBiZSB0cmlnZ2VyZWQgdG8gcmUtY29tcG9zZVxuXHQgKi9cblx0X3JlQ29tcG9zZUZyb20oY29udGVudCl7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhgcmVtb3ZlIGFsbCBmcm9tICR7dGhpcy5kaXNwbGF5TmFtZX0gJHtjb250ZW50ID8gXCJcIiA6IFwibm90XCJ9IGluY2x1ZGluZyBjaGlsZCwgYW5kIHBhcmVudGApXG5cdFx0aWYoY29udGVudClcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuX3JlQ29tcG9zZUZyb20odGhpcylcblx0XHRlbHNle1xuXHRcdFx0dGhpcy5jb21wb3NlZC5zcGxpY2UoMClcblx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaChhPT5hLl9yZUNvbXBvc2VGcm9tKCkpXG5cdFx0XHR0aGlzLmNoaWxkcmVuLnNwbGljZSgwKVxuXHRcdH1cblx0fVxuICAgIC8qKlxuICAgICAqIG9ubHkgbm8gY29tcG9zZWQgc2hvdWxkIGJlIHJlLWNvbXBvc2VcbiAgICAgKi9cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KXtcbiAgICAgICAgY29uc29sZS5pbmZvKGBzaG91bGRDb21wb25lbnRVcGRhdGUgb24gJHt0aGlzLmRpc3BsYXlOYW1lfSwgd2l0aCAke3RoaXMuY29tcG9zZWQubGVuZ3RoPT0wfWApXG4gICAgICAgIGlmKHRoaXMuY29tcG9zZWQubGVuZ3RoPT0wKVxuICAgICAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxufVxuIl19