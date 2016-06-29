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


var uuid = 0;

var HasParent = function (_HasChild) {
	_inherits(HasParent, _HasChild);

	function HasParent() {
		var _Object$getPrototypeO2;

		var _temp2, _this2, _ret2;

		_classCallCheck(this, HasParent);

		for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			args[_key2] = arguments[_key2];
		}

		return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO2 = Object.getPrototypeOf(HasParent)).call.apply(_Object$getPrototypeO2, [this].concat(args))), _this2), _this2._id = uuid++, _temp2), _possibleConstructorReturn(_this2, _ret2);
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
			this.composed[0] && this._reComposeFrom(this.composed[0]); //#2 solution
		}
	}, {
		key: "_reComposeFrom",
		value: function _reComposeFrom(reference) {
			//#2
			this.composed.splice(0);
			this.children.splice(0);
			this._removeAllFrom.apply(this, arguments);
		}
	}, {
		key: "_removeAllFrom",
		value: function _removeAllFrom(reference) {
			if (reference) this.children.forEach(function (a) {
				return a._removeAllFrom();
			});

			this.composed.splice(0);
			this.children.splice(0);

			if (reference) this.context.parent._removeAllFrom(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWE7Ozs7Ozs7Ozs7Ozs7O29NQUtaLFdBQVMsVUFDTixXQUFTOzs7Y0FOQTs7b0NBUVE7QUFDYixVQUFPO0FBQ0gsWUFBTyxJQUFQO0lBREosQ0FEYTs7OzsyQkFNWjtBQUNELFVBQU8sK0NBQVcsS0FBSyxLQUFMLENBQWxCLENBREM7Ozs7dUNBSWU7QUFDaEIsUUFBSyxPQUFMLEdBRGdCOzs7OzRCQUlkOzs7Ozs7Ozs7dUNBUTBDO09BQTdCLGlFQUFTLEVBQUMsT0FBTSxDQUFOLEVBQVMsUUFBTyxDQUFQLGtCQUFVOzs7Ozs7Ozs7O2lDQVFqQyxNQUFLOzs7Ozs7Ozs7OzJCQVNYLE9BQU07QUFDakIsUUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFuQixFQURpQjtBQUVqQixVQUFPLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBckIsSUFBMkMsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUZqQzs7OztRQS9DTjs7O1NBQ0Ysb0JBQWtCO0FBQ3JCLFNBQVEsaUJBQVUsTUFBVixDQUFpQixVQUFqQjs7OztBQW1EaEIsSUFBSSxPQUFLLENBQUw7O0lBQ2lCOzs7Ozs7Ozs7Ozs7Ozs0TUFLcEIsTUFBSTs7O2NBTGdCOzs7Ozs7O3VDQVVHOzs7QUFDaEIsVUFBTyx3QkFBSyxPQUFMLENBQWEsTUFBYixFQUFvQixrQkFBcEIsd0JBQTBDLFNBQTFDLENBQVAsQ0FEZ0I7Ozs7Ozs7Ozs7bUNBUUo7OztBQUNaLFVBQU8seUJBQUssT0FBTCxDQUFhLE1BQWIsRUFBb0IsY0FBcEIseUJBQXNDLFNBQXRDLENBQVAsQ0FEWTs7Ozt3Q0FJRyxXQUFXLFdBQVcsYUFBWTtBQUN2RCxVQUFPLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBc0IsQ0FBdEIsSUFBMkIseUNBQWUsSUFBZixFQUFxQixTQUFyQixFQUFnQyxTQUFoQyxDQUEzQixDQURnRDs7Ozs7Ozs7O3FDQU9sQyxXQUFXLFdBQVU7QUFDMUMsUUFBSyxTQUFMLEdBRDBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQTBCaEM7QUFDVixRQUFLLFFBQUwsQ0FBYyxDQUFkLEtBQW9CLEtBQUssY0FBTCxDQUFvQixLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQXBCLENBQXBCO0FBRFU7OztpQ0FJSSxXQUFVOztBQUN4QixRQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLEVBRHdCO0FBRXhCLFFBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFGd0I7QUFHeEIsUUFBSyxjQUFMLGFBQXVCLFNBQXZCLEVBSHdCOzs7O2lDQU1WLFdBQVU7QUFDeEIsT0FBRyxTQUFILEVBQ0MsS0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtXQUFHLEVBQUUsY0FBRjtJQUFILENBQXRCLENBREQ7O0FBR0EsUUFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixFQUp3QjtBQUt4QixRQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLEVBTHdCOztBQU94QixPQUFHLFNBQUgsRUFDQyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGNBQXBCLENBQW1DLElBQW5DLEVBREQ7Ozs7MkJBSVEsT0FBTTtBQUNkLGtDQTdFbUIsbURBNkVELE1BQWxCLEVBQXlCO0FBQ3hCLFNBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsUUFBcEIsQ0FBNkIsSUFBN0IsRUFEd0I7QUFFeEIsV0FBTyxJQUFQLENBRndCO0lBQXpCO0FBSUEsVUFBTyxLQUFQLENBTGM7Ozs7UUE1RUs7RUFBa0I7O0FBQWxCLFVBQ1YsZUFBYTtBQUNoQixTQUFRLGlCQUFVLE1BQVY7O2tCQUZLIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcbmltcG9ydCBzaGFsbG93Q29tcGFyZSBmcm9tICdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJ1xuXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICB9XG5cdFxuXHRjaGlsZHJlbj1bXVxuICAgIGNvbXBvc2VkPVtdXG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhcmVudDp0aGlzXG4gICAgICAgIH1cbiAgICB9XG5cdFxuXHRyZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxHcm91cCB7Li4udGhpcy5wcm9wc30vPlxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblx0XG5cdGNvbXBvc2UoKXtcblx0XHRcbiAgICB9XG5cdFxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt3aWR0aDowLCBoZWlnaHQ6MH0pe1xuXG4gICAgfVxuXHRcblx0LyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuXHQvKipcblx0ICogIGNoaWxkIGNhbGxzIGNvbnRleHQucGFyZW50LmZpbmlzaGVkKCkgdG8gbm90aWZ5IHBhcmVudCBmaW5pc2hlZCBjb21wb3NlZCBpdHNlbGZcblx0ICogIHJldHVyblxuXHQgKiAgXHR0cnVlOiBwYXJlbnQncyBjaGlsZHJlbiBhbGwgY29tcG9zZWQsIHVzdWFsbHkgdG8gbm90aWZ5IHBhcmVudCdzIHBhcmVudFxuXHQgKi9cbiAgICBmaW5pc2hlZChjaGlsZCl7XG5cdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKVxuXHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKT09dGhpcy5jaGlsZHJlbi5sZW5ndGhcbiAgICB9XG59XG5cbnZhciB1dWlkPTBcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc1BhcmVudCBleHRlbmRzIEhhc0NoaWxke1xuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICBwYXJlbnQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9XG5cdFxuXHRfaWQ9dXVpZCsrXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYmVmb3JlIGNvbXBvc2luZyBsaW5lLFxuICAgICAqIHJldHVybiBuZXh0IGxpbmUgcmVjdCB7KndpZHRoLCBbaGVpZ2h0XX1cbiAgICAgKi9cbiAgICBuZXh0QXZhaWxhYmxlU3BhY2UoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5wYXJlbnQubmV4dEF2YWlsYWJsZVNwYWNlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjaGlsZHJlbiBzaG91bGQgY2FsbCBhZnRlciBhIGxpbmUgY29tcG9zZWQgb3V0XG4gICAgICogYSBjaGFuY2UgdG8gYWRkIHRvIHNlbGYncyBjb21wb3NlZFxuICAgICAqL1xuICAgIGFwcGVuZENvbXBvc2VkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50LmFwcGVuZENvbXBvc2VkKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cdFxuXHRzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KXtcblx0XHRyZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGg9PTAgfHwgc2hhbGxvd0NvbXBhcmUodGhpcywgbmV4dFByb3BzLCBuZXh0U3RhdGUpXG5cdH1cblx0XG5cdC8qKlxuXHQgKiAgc29tZXdoZXJlIGFscmVhZHkgZGVjaWRlIHRvIHVwZGF0ZSB0aGlzIGNvbnRlbnQsIHNvIHdlIG5lZWQgcmUtY29tcG9zZSB0aGlzIGNvbnRlbnRcblx0ICovXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKXtcblx0XHR0aGlzLnJlQ29tcG9zZSgpXG5cdH1cblxuXHQvKipcblx0ICogIGl0J3MgYSB2ZXJ5IGNvbXBsaWNhdGVkIGpvYiwgc28gd2UgbmVlZCBhIHZlcnkgc2ltcGxlIGRlc2lnbiwgb25lIHNlbnRlbmNlIGRlc2NyaWJlZCBzb2x1dGlvbi4gb3B0aW9uczpcblx0ICogIDEuIHJlbW92ZSBhbGwgY29tcG9zZWQsIGFuZCByZS1jb21wb3NlIGFsbFxuXHQgKiAgXHQtIG5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXG5cdCAqICBcdC0gbG9naWMgaXMgbW9zdCBzaW1wbGVcblx0ICogIFx0LSBwZXJmb3JtYW5jZSBpcyBtb3N0IGJhZFxuXHQgKiAgXG5cdCAqICAyLiByZW1vdmUgYWxsIGNvbXBvc2VkIGZyb20gdGhpcyBjb250ZW50LCBhbmQgcmUtY29tcG9zZSByZW1vdmFsc1xuXHQgKiAgXHQtIE5lZWQgbG9jYXRlIGNvbXBvc2VkIG9mIHRoaXMgY29udGVudCBpbiBwYWdlXG5cdCAqICBcdC0gTmVlZCBmaW5kIGEgdGltZSB0byByZWNvbXBvc2Vcblx0ICogIFx0XHQ+IGNvbXBvbmVudERpZFVwZGF0ZSBcblx0ICogIFx0XHRcdC4gYW55IHN0YXRlIHVwZGF0ZSwgXG5cdCAqICBcdFx0XHQuIGFuZCBjYXJlZnVsbHkgdHVuZWQgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dClcblx0ICogIFx0LSBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiAjMVxuXHQgKiAgXG5cdCAqICAzLiByZWNvbXBvc2UgdGhpcyBjb250ZW50LCBhbmQgY2hlY2sgaWYgbmV3IGNvbXBvc2VkIGZpdHMgbGFzdCBjb21wb3NlZCBzcGFjZSAoaGl0IHJhdGlvIGlzIGxvdylcblx0ICogIFx0LSBZZXM6IGp1c3QgcmVwbGFjZVxuXHQgKiAgXHQtIE5vOiAjMSwgb3IgIzJcblx0ICogIFx0LSBhbmQgdGhlbiBsb29wIHdpdGggYWxsIGZvbGxvd2luZyBjb250ZW50IHdpdGggdGhlIHNhbWUgbG9naWNcblx0ICogIFx0XG5cdCAqICBcdDMuYTogcmVjb21wb3NlIHRoaXMgY29udGVudCBsaW5lIGJ5IGxpbmUgLi4uLCBtdWNoIGxvZ2ljcyBoZXJlXG5cdCAqL1xuXHRyZUNvbXBvc2UoKXtcblx0XHR0aGlzLmNvbXBvc2VkWzBdICYmIHRoaXMuX3JlQ29tcG9zZUZyb20odGhpcy5jb21wb3NlZFswXSkvLyMyIHNvbHV0aW9uXG5cdH1cblx0XG5cdF9yZUNvbXBvc2VGcm9tKHJlZmVyZW5jZSl7Ly8jMlxuXHRcdHRoaXMuY29tcG9zZWQuc3BsaWNlKDApXG5cdFx0dGhpcy5jaGlsZHJlbi5zcGxpY2UoMClcblx0XHR0aGlzLl9yZW1vdmVBbGxGcm9tKC4uLmFyZ3VtZW50cylcblx0fVxuXHRcblx0X3JlbW92ZUFsbEZyb20ocmVmZXJlbmNlKXtcblx0XHRpZihyZWZlcmVuY2UpXG5cdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+YS5fcmVtb3ZlQWxsRnJvbSgpKVxuXHRcdFxuXHRcdHRoaXMuY29tcG9zZWQuc3BsaWNlKDApXG5cdFx0dGhpcy5jaGlsZHJlbi5zcGxpY2UoMClcblx0XHRcblx0XHRpZihyZWZlcmVuY2UpXG5cdFx0XHR0aGlzLmNvbnRleHQucGFyZW50Ll9yZW1vdmVBbGxGcm9tKHRoaXMpXG5cdH1cblxuXHRmaW5pc2hlZChjaGlsZCl7XG5cdFx0aWYoc3VwZXIuZmluaXNoZWQoY2hpbGQpKXtcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuZmluaXNoZWQodGhpcylcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG59XG4iXX0=