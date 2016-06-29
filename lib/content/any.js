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

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(HasChild)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._finished = 0, _this.children = [], _this.composed = [], _temp), _possibleConstructorReturn(_this, _ret);
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
			this._finished++;
			this.children.push(child);
			return _react2.default.Children.count(this.props.children) == this._finished;
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
			this._reComposeFrom(this.composed[0], this); //#2 solution
		}
	}, {
		key: "_reComposeFrom",
		value: function _reComposeFrom(reference) {
			//#2
			this._removeAllFrom.apply(this, arguments);
			this.composed.splice(0);
			this._finished = 0;
			this.children.splice(0);
			this.compose();
		}
	}, {
		key: "_removeAllFrom",
		value: function _removeAllFrom(reference) {
			var _context$parent3;

			if (!reference) {
				this.composed.splice(0);
				this._finished = 0;
				this.children.splice(0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZW50L2FueS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRWE7Ozs7Ozs7Ozs7Ozs7O29NQUtaLFlBQVUsU0FDVixXQUFTLFVBQ04sV0FBUzs7O2NBUEE7O29DQVNRO0FBQ2IsVUFBTztBQUNILFlBQU8sSUFBUDtJQURKLENBRGE7Ozs7MkJBTVo7QUFDRCxVQUFPLCtDQUFXLEtBQUssS0FBTCxDQUFsQixDQURDOzs7O3VDQUllO0FBQ2hCLFFBQUssT0FBTCxHQURnQjs7Ozs0QkFJZDs7Ozs7Ozs7O3VDQVEwQztPQUE3QixpRUFBUyxFQUFDLE9BQU0sQ0FBTixFQUFTLFFBQU8sQ0FBUCxrQkFBVTs7Ozs7Ozs7OztpQ0FRakMsTUFBSzs7Ozs7Ozs7OzsyQkFTWCxPQUFNO0FBQ1gsUUFBSyxTQUFMLEdBRFc7QUFFakIsUUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFuQixFQUZpQjtBQUdqQixVQUFPLGdCQUFNLFFBQU4sQ0FBZSxLQUFmLENBQXFCLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FBckIsSUFBMkMsS0FBSyxTQUFMLENBSGpDOzs7O1FBaEROOzs7U0FDRixvQkFBa0I7QUFDckIsU0FBUSxpQkFBVSxNQUFWLENBQWlCLFVBQWpCOzs7SUFxREs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQVNHOzs7QUFDaEIsVUFBTyx3QkFBSyxPQUFMLENBQWEsTUFBYixFQUFvQixrQkFBcEIsd0JBQTBDLFNBQTFDLENBQVAsQ0FEZ0I7Ozs7Ozs7Ozs7bUNBUUo7OztBQUNaLFVBQU8seUJBQUssT0FBTCxDQUFhLE1BQWIsRUFBb0IsY0FBcEIseUJBQXNDLFNBQXRDLENBQVAsQ0FEWTs7Ozt3Q0FJRyxXQUFXLFdBQVcsYUFBWTtBQUN2RCxVQUFPLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBc0IsQ0FBdEIsSUFBMkIseUNBQWUsSUFBZixFQUFxQixTQUFyQixFQUFnQyxTQUFoQyxDQUEzQixDQURnRDs7Ozs7Ozs7O3FDQU9sQyxXQUFXLFdBQVU7QUFDMUMsUUFBSyxTQUFMLEdBRDBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQTBCaEM7QUFDVixRQUFLLGNBQUwsQ0FBb0IsS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFwQixFQUFzQyxJQUF0QztBQURVOzs7aUNBSUksV0FBVTs7QUFDeEIsUUFBSyxjQUFMLGFBQXVCLFNBQXZCLEVBRHdCO0FBRXhCLFFBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFGd0I7QUFHeEIsUUFBSyxTQUFMLEdBQWUsQ0FBZixDQUh3QjtBQUl4QixRQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLEVBSndCO0FBS3hCLFFBQUssT0FBTCxHQUx3Qjs7OztpQ0FRVixXQUFVOzs7QUFDeEIsT0FBRyxDQUFDLFNBQUQsRUFBVztBQUNiLFNBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFEYTtBQUViLFNBQUssU0FBTCxHQUFlLENBQWYsQ0FGYTtBQUdiLFNBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFIYTtJQUFkOztBQU1BLDRCQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQW9CLGNBQXBCLHlCQUFzQyxTQUF0QyxFQVB3Qjs7OzsyQkFVaEIsT0FBTTtBQUNkLGtDQTdFbUIsbURBNkVELE1BQWxCLEVBQXlCO0FBQ3hCLFNBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsUUFBcEIsQ0FBNkIsSUFBN0IsRUFEd0I7QUFFeEIsV0FBTyxJQUFQLENBRndCO0lBQXpCO0FBSUEsVUFBTyxLQUFQLENBTGM7Ozs7UUE1RUs7RUFBa0I7O0FBQWxCLFVBQ1YsZUFBYTtBQUNoQixTQUFRLGlCQUFVLE1BQVY7O2tCQUZLIiwiZmlsZSI6ImFueS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IEdyb3VwIGZyb20gXCIuLi9jb21wb3NlL2dyb3VwXCJcbmltcG9ydCBzaGFsbG93Q29tcGFyZSBmcm9tICdyZWFjdC1hZGRvbnMtc2hhbGxvdy1jb21wYXJlJ1xuXG5leHBvcnQgY2xhc3MgSGFzQ2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcbiAgICAgICAgcGFyZW50OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICB9XG5cdFxuXHRfZmluaXNoZWQ9MFxuXHRjaGlsZHJlbj1bXVxuICAgIGNvbXBvc2VkPVtdXG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhcmVudDp0aGlzXG4gICAgICAgIH1cbiAgICB9XG5cdFxuXHRyZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIDxHcm91cCB7Li4udGhpcy5wcm9wc30vPlxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgIH1cblx0XG5cdGNvbXBvc2UoKXtcblx0XHRcbiAgICB9XG5cdFxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKHJlcXVpcmVkPXt3aWR0aDowLCBoZWlnaHQ6MH0pe1xuXG4gICAgfVxuXHRcblx0LyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZChsaW5lKXtcblxuICAgIH1cblxuXHQvKipcblx0ICogIGNoaWxkIGNhbGxzIGNvbnRleHQucGFyZW50LmZpbmlzaGVkKCkgdG8gbm90aWZ5IHBhcmVudCBmaW5pc2hlZCBjb21wb3NlZCBpdHNlbGZcblx0ICogIHJldHVyblxuXHQgKiAgXHR0cnVlOiBwYXJlbnQncyBjaGlsZHJlbiBhbGwgY29tcG9zZWQsIHVzdWFsbHkgdG8gbm90aWZ5IHBhcmVudCdzIHBhcmVudFxuXHQgKi9cbiAgICBmaW5pc2hlZChjaGlsZCl7XG4gICAgICAgIHRoaXMuX2ZpbmlzaGVkKytcblx0XHR0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpXG5cdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pPT10aGlzLl9maW5pc2hlZFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzUGFyZW50IGV4dGVuZHMgSGFzQ2hpbGR7XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHBhcmVudDogUHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNoaWxkcmVuIHNob3VsZCBjYWxsIGJlZm9yZSBjb21wb3NpbmcgbGluZSxcbiAgICAgKiByZXR1cm4gbmV4dCBsaW5lIHJlY3Qgeyp3aWR0aCwgW2hlaWdodF19XG4gICAgICovXG4gICAgbmV4dEF2YWlsYWJsZVNwYWNlKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRleHQucGFyZW50Lm5leHRBdmFpbGFibGVTcGFjZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2hpbGRyZW4gc2hvdWxkIGNhbGwgYWZ0ZXIgYSBsaW5lIGNvbXBvc2VkIG91dFxuICAgICAqIGEgY2hhbmNlIHRvIGFkZCB0byBzZWxmJ3MgY29tcG9zZWRcbiAgICAgKi9cbiAgICBhcHBlbmRDb21wb3NlZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0LnBhcmVudC5hcHBlbmRDb21wb3NlZCguLi5hcmd1bWVudHMpXG4gICAgfVxuXHRcblx0c2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCl7XG5cdFx0cmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoPT0wIHx8IHNoYWxsb3dDb21wYXJlKHRoaXMsIG5leHRQcm9wcywgbmV4dFN0YXRlKVxuXHR9XG5cdFxuXHQvKipcblx0ICogIHNvbWV3aGVyZSBhbHJlYWR5IGRlY2lkZSB0byB1cGRhdGUgdGhpcyBjb250ZW50LCBzbyB3ZSBuZWVkIHJlLWNvbXBvc2UgdGhpcyBjb250ZW50XG5cdCAqL1xuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSl7XG5cdFx0dGhpcy5yZUNvbXBvc2UoKVxuXHR9XG5cblx0LyoqXG5cdCAqICBpdCdzIGEgdmVyeSBjb21wbGljYXRlZCBqb2IsIHNvIHdlIG5lZWQgYSB2ZXJ5IHNpbXBsZSBkZXNpZ24sIG9uZSBzZW50ZW5jZSBkZXNjcmliZWQgc29sdXRpb24uIG9wdGlvbnM6XG5cdCAqICAxLiByZW1vdmUgYWxsIGNvbXBvc2VkLCBhbmQgcmUtY29tcG9zZSBhbGxcblx0ICogIFx0LSBuZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxuXHQgKiAgXHQtIGxvZ2ljIGlzIG1vc3Qgc2ltcGxlXG5cdCAqICBcdC0gcGVyZm9ybWFuY2UgaXMgbW9zdCBiYWRcblx0ICogIFxuXHQgKiAgMi4gcmVtb3ZlIGFsbCBjb21wb3NlZCBmcm9tIHRoaXMgY29udGVudCwgYW5kIHJlLWNvbXBvc2UgcmVtb3ZhbHNcblx0ICogIFx0LSBOZWVkIGxvY2F0ZSBjb21wb3NlZCBvZiB0aGlzIGNvbnRlbnQgaW4gcGFnZVxuXHQgKiAgXHQtIE5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXG5cdCAqICBcdFx0PiBjb21wb25lbnREaWRVcGRhdGUgXG5cdCAqICBcdFx0XHQuIGFueSBzdGF0ZSB1cGRhdGUsIFxuXHQgKiAgXHRcdFx0LiBhbmQgY2FyZWZ1bGx5IHR1bmVkIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpXG5cdCAqICBcdC0gcGVyZm9ybWFuY2UgaXMgYmV0dGVyIHRoYW4gIzFcblx0ICogIFxuXHQgKiAgMy4gcmVjb21wb3NlIHRoaXMgY29udGVudCwgYW5kIGNoZWNrIGlmIG5ldyBjb21wb3NlZCBmaXRzIGxhc3QgY29tcG9zZWQgc3BhY2UgKGhpdCByYXRpbyBpcyBsb3cpXG5cdCAqICBcdC0gWWVzOiBqdXN0IHJlcGxhY2Vcblx0ICogIFx0LSBObzogIzEsIG9yICMyXG5cdCAqICBcdC0gYW5kIHRoZW4gbG9vcCB3aXRoIGFsbCBmb2xsb3dpbmcgY29udGVudCB3aXRoIHRoZSBzYW1lIGxvZ2ljXG5cdCAqICBcdFxuXHQgKiAgXHQzLmE6IHJlY29tcG9zZSB0aGlzIGNvbnRlbnQgbGluZSBieSBsaW5lIC4uLiwgbXVjaCBsb2dpY3MgaGVyZVxuXHQgKi9cblx0cmVDb21wb3NlKCl7XG5cdFx0dGhpcy5fcmVDb21wb3NlRnJvbSh0aGlzLmNvbXBvc2VkWzBdLCB0aGlzKS8vIzIgc29sdXRpb25cblx0fVxuXHRcblx0X3JlQ29tcG9zZUZyb20ocmVmZXJlbmNlKXsvLyMyXG5cdFx0dGhpcy5fcmVtb3ZlQWxsRnJvbSguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5jb21wb3NlZC5zcGxpY2UoMClcblx0XHR0aGlzLl9maW5pc2hlZD0wXG5cdFx0dGhpcy5jaGlsZHJlbi5zcGxpY2UoMClcblx0XHR0aGlzLmNvbXBvc2UoKVxuXHR9XG5cdFxuXHRfcmVtb3ZlQWxsRnJvbShyZWZlcmVuY2Upe1xuXHRcdGlmKCFyZWZlcmVuY2Upe1xuXHRcdFx0dGhpcy5jb21wb3NlZC5zcGxpY2UoMClcblx0XHRcdHRoaXMuX2ZpbmlzaGVkPTBcblx0XHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKDApXG5cdFx0fVxuXHRcdFx0XG5cdFx0dGhpcy5jb250ZXh0LnBhcmVudC5fcmVtb3ZlQWxsRnJvbSguLi5hcmd1bWVudHMpXG5cdH1cblxuXHRmaW5pc2hlZChjaGlsZCl7XG5cdFx0aWYoc3VwZXIuZmluaXNoZWQoY2hpbGQpKXtcblx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuZmluaXNoZWQodGhpcylcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG59XG4iXX0=