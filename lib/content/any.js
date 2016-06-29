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

var HasChild = exports.HasChild = function (_Component) {
	_inherits(HasChild, _Component);

	function HasChild() {
		var _Object$getPrototypeO;

		var _temp, _this, _ret;

		_classCallCheck(this, HasChild);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.children = [], _this.composed = [], _temp), _possibleConstructorReturn(_this, _ret);
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
		value: function compose() {}

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
   *  child calls context.parent.finished() to notify parent finished composed itself
   *  return
   *  	true: parent's children all composed, usually to notify parent's parent
   */

	}, {
		key: "finished",
		value: function finished(child) {
			this.children.push(child);
			return _react2.default.Children.count(this.props.children) == this.children.length;
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
	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
			return this.children.length == 0 || (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
		}

		/**
   *  somewhere already decide to update this content, so we need re-compose this content
   */

	}, {
		key: "componentDidUpdate",
		value: function componentDidUpdate(prevProps, prevState) {
			this.reCompose();
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
			this._reComposeFrom(this.composed[0]); //#2 solution
		}
	}, {
		key: "_reComposeFrom",
		value: function _reComposeFrom(reference) {
			//#2
			this._removeAllFrom.apply(this, arguments);
			this.composed.splice(0);
			this.children.splice(0);
			this.compose();
		}
	}, {
		key: "_removeAllFrom",
		value: function _removeAllFrom(reference) {
			var _context$parent3;

			if (!reference) {
				this.composed.splice(0);
				this.children.splice(0);
				return;
			}

			(_context$parent3 = this.context.parent)._removeAllFrom.apply(_context$parent3, arguments);
		}
	}, {
		key: "finished",
		value: function finished(child) {
			if (_get(Object.getPrototypeOf(HasParent.prototype), "finished", this).call(this, child)) {
				this.context.parent.finished(this);
				return true;
			}
			return false;
		}
	}]);

	return HasParent;
}(HasChild);

HasParent.contextTypes = {
	parent: _react.PropTypes.object
};
exports.default = HasParent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWE7Ozs7Ozs7Ozs7Ozs7O29NQUtaLFdBQVMsVUFDTixXQUFTOzs7Y0FOQTs7b0NBUVE7QUFDYixVQUFPO0FBQ0gsWUFBTyxJQUFQO0lBREosQ0FEYTs7OzsyQkFNWjtBQUNELFVBQU8sK0NBQVcsS0FBSyxLQUFMLENBQWxCLENBREM7Ozs7dUNBSWU7QUFDaEIsUUFBSyxPQUFMLEdBRGdCOzs7OzRCQUlkOzs7Ozs7Ozs7dUNBUTBDO09BQTdCLGlFQUFTLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLGtCQUFVOzs7Ozs7Ozs7O2lDQVFqQyxNQUFLOzs7Ozs7Ozs7OzJCQVNYLE9BQU07QUFDakIsUUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFuQixFQURpQjtBQUVqQixVQUFPLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBckIsSUFBMkMsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUZqQzs7OztRQS9DTjs7O1NBQ0Ysb0JBQWtCO0FBQ3JCLFNBQVEsaUJBQVUsTUFBVixDQUFpQixVQUFqQjs7O0lBbURLOzs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FTRzs7O0FBQ2hCLFVBQU8sd0JBQUssT0FBTCxDQUFhLE1BQWIsRUFBb0Isa0JBQXBCLHdCQUEwQyxTQUExQyxDQUFQLENBRGdCOzs7Ozs7Ozs7O21DQVFKOzs7QUFDWixVQUFPLHlCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLGNBQXBCLHlCQUFzQyxTQUF0QyxDQUFQLENBRFk7Ozs7d0NBSUcsV0FBVyxXQUFXLGFBQVk7QUFDdkQsVUFBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkLElBQXNCLENBQXRCLElBQTJCLHlDQUFlLElBQWYsRUFBcUIsU0FBckIsRUFBZ0MsU0FBaEMsQ0FBM0IsQ0FEZ0Q7Ozs7Ozs7OztxQ0FPbEMsV0FBVyxXQUFVO0FBQzFDLFFBQUssU0FBTCxHQUQwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkEwQmhDO0FBQ1YsUUFBSyxjQUFMLENBQW9CLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBcEI7QUFEVTs7O2lDQUlJLFdBQVU7O0FBQ3hCLFFBQUssY0FBTCxhQUF1QixTQUF2QixFQUR3QjtBQUV4QixRQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLEVBRndCO0FBR3hCLFFBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFId0I7QUFJeEIsUUFBSyxPQUFMLEdBSndCOzs7O2lDQU9WLFdBQVU7OztBQUN4QixPQUFHLENBQUMsU0FBRCxFQUFXO0FBQ2IsU0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixFQURhO0FBRWIsU0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixFQUZhO0FBR2IsV0FIYTtJQUFkOztBQU1BLDRCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLGNBQXBCLHlCQUFzQyxTQUF0QyxFQVB3Qjs7OzsyQkFVaEIsT0FBTTtBQUNkLGtDQTVFbUIsbURBNEVELE1BQWxCLEVBQXlCO0FBQ3hCLFNBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsUUFBcEIsQ0FBNkIsSUFBN0IsRUFEd0I7QUFFeEIsV0FBTyxJQUFQLENBRndCO0lBQXpCO0FBSUEsVUFBTyxLQUFQLENBTGM7Ozs7UUEzRUs7RUFBa0I7O0FBQWxCLFVBQ1YsZUFBYTtBQUNoQixTQUFRLGlCQUFVLE1BQVY7O2tCQUZLIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcbmltcG9ydCBzaGFsbG93Q29tcGFyZSBmcm9tICdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJ1xuXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICB9XG5cdFxuXHRjaGlsZHJlbj1bXVxuICAgIGNvbXBvc2VkPVtdXG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhcmVudDp0aGlzXG4gICAgICAgIH1cbiAgICB9XG5cdFxuXHRyZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxHcm91cCB7Li4udGhpcy5wcm9wc30vPlxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblx0XG5cdGNvbXBvc2UoKXtcblx0XHRcbiAgICB9XG5cdFxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt3aWR0aDowLCBoZWlnaHQ6MH0pe1xuXG4gICAgfVxuXHRcblx0LyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuXHQvKipcblx0ICogIGNoaWxkIGNhbGxzIGNvbnRleHQucGFyZW50LmZpbmlzaGVkKCkgdG8gbm90aWZ5IHBhcmVudCBmaW5pc2hlZCBjb21wb3NlZCBpdHNlbGZcblx0ICogIHJldHVyblxuXHQgKiAgXHR0cnVlOiBwYXJlbnQncyBjaGlsZHJlbiBhbGwgY29tcG9zZWQsIHVzdWFsbHkgdG8gbm90aWZ5IHBhcmVudCdzIHBhcmVudFxuXHQgKi9cbiAgICBmaW5pc2hlZChjaGlsZCl7XG5cdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKVxuXHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKT09dGhpcy5jaGlsZHJlbi5sZW5ndGhcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc1BhcmVudCBleHRlbmRzIEhhc0NoaWxke1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBiZWZvcmUgY29tcG9zaW5nIGxpbmUsXG4gICAgICogcmV0dXJuIG5leHQgbGluZSByZWN0IHsqd2lkdGgsIFtoZWlnaHRdfVxuICAgICAqL1xuICAgIG5leHRBdmFpbGFibGVTcGFjZSgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5uZXh0QXZhaWxhYmxlU3BhY2UoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGFmdGVyIGEgbGluZSBjb21wb3NlZCBvdXRcbiAgICAgKiBhIGNoYW5jZSB0byBhZGQgdG8gc2VsZidzIGNvbXBvc2VkXG4gICAgICovXG4gICAgYXBwZW5kQ29tcG9zZWQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQuYXBwZW5kQ29tcG9zZWQoLi4uYXJndW1lbnRzKVxuICAgIH1cblx0XG5cdHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpe1xuXHRcdHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aD09MCB8fCBzaGFsbG93Q29tcGFyZSh0aGlzLCBuZXh0UHJvcHMsIG5leHRTdGF0ZSlcblx0fVxuXHRcblx0LyoqXG5cdCAqICBzb21ld2hlcmUgYWxyZWFkeSBkZWNpZGUgdG8gdXBkYXRlIHRoaXMgY29udGVudCwgc28gd2UgbmVlZCByZS1jb21wb3NlIHRoaXMgY29udGVudFxuXHQgKi9cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpe1xuXHRcdHRoaXMucmVDb21wb3NlKClcblx0fVxuXG5cdC8qKlxuXHQgKiAgaXQncyBhIHZlcnkgY29tcGxpY2F0ZWQgam9iLCBzbyB3ZSBuZWVkIGEgdmVyeSBzaW1wbGUgZGVzaWduLCBvbmUgc2VudGVuY2UgZGVzY3JpYmVkIHNvbHV0aW9uLiBvcHRpb25zOlxuXHQgKiAgMS4gcmVtb3ZlIGFsbCBjb21wb3NlZCwgYW5kIHJlLWNvbXBvc2UgYWxsXG5cdCAqICBcdC0gbmVlZCBmaW5kIGEgdGltZSB0byByZWNvbXBvc2Vcblx0ICogIFx0LSBsb2dpYyBpcyBtb3N0IHNpbXBsZVxuXHQgKiAgXHQtIHBlcmZvcm1hbmNlIGlzIG1vc3QgYmFkXG5cdCAqICBcblx0ICogIDIuIHJlbW92ZSBhbGwgY29tcG9zZWQgZnJvbSB0aGlzIGNvbnRlbnQsIGFuZCByZS1jb21wb3NlIHJlbW92YWxzXG5cdCAqICBcdC0gTmVlZCBsb2NhdGUgY29tcG9zZWQgb2YgdGhpcyBjb250ZW50IGluIHBhZ2Vcblx0ICogIFx0LSBOZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxuXHQgKiAgXHRcdD4gY29tcG9uZW50RGlkVXBkYXRlIFxuXHQgKiAgXHRcdFx0LiBhbnkgc3RhdGUgdXBkYXRlLCBcblx0ICogIFx0XHRcdC4gYW5kIGNhcmVmdWxseSB0dW5lZCBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KVxuXHQgKiAgXHQtIHBlcmZvcm1hbmNlIGlzIGJldHRlciB0aGFuICMxXG5cdCAqICBcblx0ICogIDMuIHJlY29tcG9zZSB0aGlzIGNvbnRlbnQsIGFuZCBjaGVjayBpZiBuZXcgY29tcG9zZWQgZml0cyBsYXN0IGNvbXBvc2VkIHNwYWNlIChoaXQgcmF0aW8gaXMgbG93KVxuXHQgKiAgXHQtIFllczoganVzdCByZXBsYWNlXG5cdCAqICBcdC0gTm86ICMxLCBvciAjMlxuXHQgKiAgXHQtIGFuZCB0aGVuIGxvb3Agd2l0aCBhbGwgZm9sbG93aW5nIGNvbnRlbnQgd2l0aCB0aGUgc2FtZSBsb2dpY1xuXHQgKiAgXHRcblx0ICogIFx0My5hOiByZWNvbXBvc2UgdGhpcyBjb250ZW50IGxpbmUgYnkgbGluZSAuLi4sIG11Y2ggbG9naWNzIGhlcmVcblx0ICovXG5cdHJlQ29tcG9zZSgpe1xuXHRcdHRoaXMuX3JlQ29tcG9zZUZyb20odGhpcy5jb21wb3NlZFswXSkvLyMyIHNvbHV0aW9uXG5cdH1cblx0XG5cdF9yZUNvbXBvc2VGcm9tKHJlZmVyZW5jZSl7Ly8jMlxuXHRcdHRoaXMuX3JlbW92ZUFsbEZyb20oLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuY29tcG9zZWQuc3BsaWNlKDApXG5cdFx0dGhpcy5jaGlsZHJlbi5zcGxpY2UoMClcblx0XHR0aGlzLmNvbXBvc2UoKVxuXHR9XG5cdFxuXHRfcmVtb3ZlQWxsRnJvbShyZWZlcmVuY2Upe1xuXHRcdGlmKCFyZWZlcmVuY2Upe1xuXHRcdFx0dGhpcy5jb21wb3NlZC5zcGxpY2UoMClcblx0XHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKDApXG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdFx0XHRcblx0XHR0aGlzLmNvbnRleHQucGFyZW50Ll9yZW1vdmVBbGxGcm9tKC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdGZpbmlzaGVkKGNoaWxkKXtcblx0XHRpZihzdXBlci5maW5pc2hlZChjaGlsZCkpe1xuXHRcdFx0dGhpcy5jb250ZXh0LnBhcmVudC5maW5pc2hlZCh0aGlzKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn1cbiJdfQ==