"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HasChild = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _group = require("../compose/group");

var _group2 = _interopRequireDefault(_group);

var _reactAddonsShallowCompare = require("react-addons-shallow-compare");

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {}, _this.children = [], _this.composed = [], _this._id = uuid++, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(HasChild, [{
		key: "getChildContext",
		value: function getChildContext() {
			return {
				parent: this
			};
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(_group2.default, this.props);
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
			console.info("composed a " + child.displayName + " " + (child.displayName == 'inline' ? ":" + (child.state.text || child.props.children) : ''));
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
	parent: _react.PropTypes.object.isRequired
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
			if (this.composed.length == 0) {
				this.compose();
				return true;
			}
			return false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxPQUFLLENBQUw7O0lBQ1M7Ozs7Ozs7Ozs7Ozs7O29NQUtULFFBQU0sVUFDVCxXQUFTLFVBQ04sV0FBUyxVQUNaLE1BQUk7OztjQVJROztvQ0FVUTtBQUNiLFVBQU87QUFDSCxZQUFPLElBQVA7SUFESixDQURhOzs7OzJCQU1aO0FBQ0QsVUFBTywrQ0FBVyxLQUFLLEtBQUwsQ0FBbEIsQ0FEQzs7Ozt1Q0FJZTtBQUNoQixRQUFLLE9BQUwsR0FEZ0I7Ozs7NEJBSWQ7QUFDUixRQUFLLGVBQUwsR0FBcUIsS0FBSyxHQUFMLEVBQXJCLENBRFE7Ozs7Ozs7Ozs7dUNBUTBDO09BQTdCLGlFQUFTLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLGtCQUFVOzs7Ozs7Ozs7O2lDQVFqQyxNQUFLOzs7Ozs7Ozs7O21DQVNILE9BQU07QUFDekIsV0FBUSxJQUFSLGlCQUEyQixNQUFNLFdBQU4sVUFBcUIsTUFBTSxXQUFOLElBQW1CLFFBQW5CLFVBQWtDLE1BQU0sS0FBTixDQUFZLElBQVosSUFBa0IsTUFBTSxLQUFOLENBQVksUUFBWixDQUFwRCxHQUE2RSxFQUE3RSxDQUFoRCxFQUR5QjtBQUV6QixRQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEtBQW5CLEVBRnlCO0FBR3pCLE9BQUcsZ0JBQU0sUUFBTixDQUFlLEtBQWYsQ0FBcUIsS0FBSyxLQUFMLENBQVcsUUFBWCxDQUFyQixJQUEyQyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXFCO0FBQ2xFLFNBQUsscUJBQUwsR0FEa0U7SUFBbkU7Ozs7MENBS3NCO0FBQ3RCLFdBQVEsR0FBUixDQUFlLEtBQUssV0FBTCxTQUFvQixLQUFLLEdBQUwsMkJBQTZCLEtBQUssR0FBTCxLQUFXLEtBQUssZUFBTCxRQUEzRSxFQURzQjs7OztRQXpEWDs7O1NBQ0Ysb0JBQWtCO0FBQ3JCLFNBQVEsaUJBQVUsTUFBVixDQUFpQixVQUFqQjs7O0lBNERLOzs7Ozs7Ozs7Ozs7Ozs7O3VDQVFHOzs7QUFDaEIsVUFBTyx3QkFBSyxPQUFMLENBQWEsTUFBYixFQUFvQixrQkFBcEIsd0JBQTBDLFNBQTFDLENBQVAsQ0FEZ0I7Ozs7Ozs7Ozs7bUNBUUo7OztBQUNaLFVBQU8seUJBQUssT0FBTCxDQUFhLE1BQWIsRUFBb0IsY0FBcEIseUJBQXNDLFNBQXRDLENBQVAsQ0FEWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkEwQlI7QUFDVixRQUFLLFFBQUwsQ0FBYyxDQUFkLEtBQW9CLEtBQUssY0FBTCxDQUFvQixLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQXBCLENBQXBCO0FBRFU7Ozs7Ozs7Ozs7OztpQ0FXSSxTQUFRO0FBQ2hCLFdBQVEsSUFBUixzQkFBZ0MsS0FBSyxXQUFMLFVBQW9CLFVBQVUsRUFBVixHQUFlLEtBQWYsa0NBQXBELEVBRGdCO0FBRXRCLE9BQUcsT0FBSCxFQUNDLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUMsSUFBbkMsRUFERCxLQUVJO0FBQ0gsU0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixFQURHO0FBRUgsU0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtZQUFHLEVBQUUsY0FBRjtLQUFILENBQXRCLENBRkc7QUFHSCxTQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLEVBSEc7SUFGSjs7Ozs7Ozs7d0NBV3dCLFdBQVcsV0FBVyxhQUFZO0FBQ3BELFdBQVEsSUFBUiwrQkFBeUMsS0FBSyxXQUFMLGdCQUEwQixLQUFLLFFBQUwsQ0FBYyxNQUFkLElBQXNCLENBQXRCLENBQW5FLEVBRG9EO0FBRXBELE9BQUcsS0FBSyxRQUFMLENBQWMsTUFBZCxJQUFzQixDQUF0QixFQUF3QjtBQUN2QixTQUFLLE9BQUwsR0FEdUI7QUFFdkIsV0FBTyxJQUFQLENBRnVCO0lBQTNCO0FBSUEsVUFBTyxLQUFQLENBTm9EOzs7OzBDQVNwQztBQUN0QixRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGdCQUFwQixDQUFxQyxJQUFyQyxFQURzQjtBQUV0Qiw4QkE3RW1CLCtEQTZFbkIsQ0FGc0I7Ozs7UUEzRUg7RUFBa0I7O0FBQWxCLFVBQ1YsZUFBYTtBQUNoQixTQUFRLGlCQUFVLE1BQVY7O2tCQUZLIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcbmltcG9ydCBzaGFsbG93Q29tcGFyZSBmcm9tICdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJ1xuXG52YXIgdXVpZD0wXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICB9XG5cbiAgICBzdGF0ZT17fVxuXHRjaGlsZHJlbj1bXVxuICAgIGNvbXBvc2VkPVtdXG5cdF9pZD11dWlkKytcblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGFyZW50OnRoaXNcbiAgICAgICAgfVxuICAgIH1cblxuXHRyZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxHcm91cCB7Li4udGhpcy5wcm9wc30vPlxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblxuXHRjb21wb3NlKCl7XG5cdFx0dGhpcy5fc3RhcnRDb21wb3NlQXQ9RGF0ZS5ub3coKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt3aWR0aDowLCBoZWlnaHQ6MH0pe1xuXG4gICAgfVxuXG5cdC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQobGluZSl7XG5cbiAgICB9XG5cblx0LyoqXG5cdCAqICBjaGlsZCBjYWxscyBjb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKCkgdG8gbm90aWZ5IHBhcmVudCAxIGNoaWxkIGNvbXBvc2VkXG5cdCAqICByZXR1cm5cblx0ICogIFx0dHJ1ZTogcGFyZW50J3MgYWxsIGNoaWxkcmVuIGNvbXBvc2VkXG5cdCAqL1xuICAgIG9uMUNoaWxkQ29tcG9zZWQoY2hpbGQpe1xuXHRcdGNvbnNvbGUuaW5mbyhgY29tcG9zZWQgYSAke2NoaWxkLmRpc3BsYXlOYW1lfSAke2NoaWxkLmRpc3BsYXlOYW1lPT0naW5saW5lJyA/IGA6JHtjaGlsZC5zdGF0ZS50ZXh0fHxjaGlsZC5wcm9wcy5jaGlsZHJlbn1gIDogJyd9YClcblx0XHR0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpXG5cdFx0aWYoUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbik9PXRoaXMuY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdHRoaXMub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0XHR9XG4gICAgfVxuXHRcblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cdFx0Y29uc29sZS5sb2coYCR7dGhpcy5kaXNwbGF5TmFtZX0oJHt0aGlzLl9pZH0pIGNvbXBvc2VkIHdpdGhpbiAke0RhdGUubm93KCktdGhpcy5fc3RhcnRDb21wb3NlQXR9bXNgKVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc1BhcmVudCBleHRlbmRzIEhhc0NoaWxke1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cblx0LyoqXG5cdCAqICBpdCdzIGEgdmVyeSBjb21wbGljYXRlZCBqb2IsIHNvIHdlIG5lZWQgYSB2ZXJ5IHNpbXBsZSBkZXNpZ24sIG9uZSBzZW50ZW5jZSBkZXNjcmliZWQgc29sdXRpb24uIG9wdGlvbnM6XG5cdCAqICAxLiByZW1vdmUgYWxsIGNvbXBvc2VkLCBhbmQgcmUtY29tcG9zZSBhbGxcblx0ICogIFx0LSBuZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxuXHQgKiAgXHQtIGxvZ2ljIGlzIG1vc3Qgc2ltcGxlXG5cdCAqICBcdC0gcGVyZm9ybWFuY2UgaXMgbW9zdCBiYWRcblx0ICpcblx0ICogIDIuIHJlbW92ZSBhbGwgY29tcG9zZWQgZnJvbSB0aGlzIGNvbnRlbnQsIGFuZCByZS1jb21wb3NlIHJlbW92YWxzXG5cdCAqICBcdC0gTmVlZCBsb2NhdGUgY29tcG9zZWQgb2YgdGhpcyBjb250ZW50IGluIHBhZ2Vcblx0ICogIFx0LSBOZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxuXHQgKiAgXHRcdD4gY29tcG9uZW50RGlkVXBkYXRlXG5cdCAqICBcdFx0XHQuIGFueSBzdGF0ZSB1cGRhdGUsXG5cdCAqICBcdFx0XHQuIGFuZCBjYXJlZnVsbHkgdHVuZWQgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dClcblx0ICogIFx0LSBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiAjMVxuXHQgKlxuXHQgKiAgMy4gcmVjb21wb3NlIHRoaXMgY29udGVudCwgYW5kIGNoZWNrIGlmIG5ldyBjb21wb3NlZCBmaXRzIGxhc3QgY29tcG9zZWQgc3BhY2UgKGhpdCByYXRpbyBpcyBsb3cpXG5cdCAqICBcdC0gWWVzOiBqdXN0IHJlcGxhY2Vcblx0ICogIFx0LSBObzogIzEsIG9yICMyXG5cdCAqICBcdC0gYW5kIHRoZW4gbG9vcCB3aXRoIGFsbCBmb2xsb3dpbmcgY29udGVudCB3aXRoIHRoZSBzYW1lIGxvZ2ljXG5cdCAqXG5cdCAqICBcdDMuYTogcmVjb21wb3NlIHRoaXMgY29udGVudCBsaW5lIGJ5IGxpbmUgLi4uLCBtdWNoIGxvZ2ljcyBoZXJlXG5cdCAqL1xuXHRyZUNvbXBvc2UoKXtcblx0XHR0aGlzLmNvbXBvc2VkWzBdICYmIHRoaXMuX3JlQ29tcG9zZUZyb20odGhpcy5jb21wb3NlZFswXSkvLyMyIHNvbHV0aW9uXG5cdH1cblxuXHQvKipcblx0ICogIGlmIHdpdGggY29udGVudFxuXHQgKiAgXHQ+IHNpbXBseSBhc2sgcGFyZW50IHRvIHJlY29tcG9zZVxuXHQgKiAgaWYgd2l0aG91dCBjb250ZW50XG5cdCAqICBcdD4ganVzdCByZW1vdmUgYWxsIGFuZCBvZmZzcHJpbmcgdG8gYmUgcmVhZHkgdG8gcmUtY29tcG9zZVxuXHQgKiAgXHQ+IHNvbWV3aGVyZSBzb21ldGltZSBpdCB3aWxsIGJlIHRyaWdnZXJlZCB0byByZS1jb21wb3NlXG5cdCAqL1xuXHRfcmVDb21wb3NlRnJvbShjb250ZW50KXtcbiAgICAgICAgY29uc29sZS5pbmZvKGByZW1vdmUgYWxsIGZyb20gJHt0aGlzLmRpc3BsYXlOYW1lfSAke2NvbnRlbnQgPyBcIlwiIDogXCJub3RcIn0gaW5jbHVkaW5nIGNoaWxkLCBhbmQgcGFyZW50YClcblx0XHRpZihjb250ZW50KVxuXHRcdFx0dGhpcy5jb250ZXh0LnBhcmVudC5fcmVDb21wb3NlRnJvbSh0aGlzKVxuXHRcdGVsc2V7XG5cdFx0XHR0aGlzLmNvbXBvc2VkLnNwbGljZSgwKVxuXHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PmEuX3JlQ29tcG9zZUZyb20oKSlcblx0XHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKDApXG5cdFx0fVxuXHR9XG4gICAgLyoqXG4gICAgICogb25seSBubyBjb21wb3NlZCBzaG91bGQgYmUgcmUtY29tcG9zZVxuICAgICAqL1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpe1xuICAgICAgICBjb25zb2xlLmluZm8oYHNob3VsZENvbXBvbmVudFVwZGF0ZSBvbiAke3RoaXMuZGlzcGxheU5hbWV9LCB3aXRoICR7dGhpcy5jb21wb3NlZC5sZW5ndGg9PTB9YClcbiAgICAgICAgaWYodGhpcy5jb21wb3NlZC5sZW5ndGg9PTApe1xuICAgICAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXHRcblx0b25BbGxDaGlsZHJlbkNvbXBvc2VkKCl7XG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5vbjFDaGlsZENvbXBvc2VkKHRoaXMpXG5cdFx0c3VwZXIub25BbGxDaGlsZHJlbkNvbXBvc2VkKClcblx0fVxufVxuIl19