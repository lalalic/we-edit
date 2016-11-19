"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = editable;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _selector = require("./selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function editable(Content) {
	return function (_Content) {
		(0, _inherits3.default)(_class2, _Content);

		function _class2() {
			var _ref;

			var _temp, _this, _ret;

			(0, _classCallCheck3.default)(this, _class2);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.state = { content: _this.props.children.length == 0 ? _this.emptyContent() : _react2.default.Children.toArray(_this.props.children) }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
		}

		(0, _createClass3.default)(_class2, [{
			key: "emptyContent",
			value: function emptyContent() {
				return [];
			}
		}, {
			key: "getContentCount",
			value: function getContentCount() {
				return this.state.content.length;
			}
		}, {
			key: "getContent",
			value: function getContent() {
				return this.state.content;
			}
		}, {
			key: "appendLastComposed",
			value: function appendLastComposed() {}
		}, {
			key: "componentDidMount",
			value: function componentDidMount() {
				(0, _selector.recordContent)(this);
				if ((0, _get3.default)(_class2.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class2.prototype), "componentDidMount", this)) (0, _get3.default)(_class2.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class2.prototype), "componentDidMount", this).apply(this, arguments);
			}
		}, {
			key: "createComposed2Parent",
			value: function createComposed2Parent(props) {
				return (0, _get3.default)(_class2.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class2.prototype), "createComposed2Parent", this).call(this, (0, _extends3.default)({}, props, { "data-content": this.id }));
			}
		}, {
			key: "reCompose",
			value: function reCompose() {
				this._reComposeFrom(this); //#2 solution
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
				this.context.parent._reComposeFrom(this);
			}
		}, {
			key: "_clearComposed4reCompose",
			value: function _clearComposed4reCompose(fullclear) {
				var _this2 = this;

				var lastComposed = this.computed.composed.splice(0);

				var clearAll = function clearAll(a) {
					if (_this2.computed.children.length) {
						_this2.computed.children.forEach(function (a) {
							return a._clearComposed4reCompose(true);
						});
						_this2.computed.children.splice(0);
					}
					_this2.computed.lastComposed = null;
				};
				if (fullclear) {
					clearAll();
				} else if (!this._isLastComposedFitIntoParent(lastComposed)) {
					clearAll();
				} else {
					this.computed.lastComposed = lastComposed;
				}
			}

			/**
    * is there a way to just simply re-use last composed?
    */

		}, {
			key: "_isLastComposedFitIntoParent",
			value: function _isLastComposedFitIntoParent(lastComposed) {
				return false;
			}
			/**
    * only no composed should be re-compose
    */

		}, {
			key: "shouldComponentUpdate",
			value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
				//console.info(`shouldComponentUpdate on ${this.displayName}, with ${this.computed.composed.length==0}`)
				if (this.computed.composed.length == 0) {
					if (this.computed.lastComposed) {
						this.appendLastComposed();
					} else this.compose();
				}
				return true;
			}
		}, {
			key: "id",
			get: function get() {
				return this.props.id;
			}
		}]);
		return _class2;
	}(Content);
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOlsiZWRpdGFibGUiLCJDb250ZW50Iiwic3RhdGUiLCJjb250ZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImxlbmd0aCIsImVtcHR5Q29udGVudCIsIkNoaWxkcmVuIiwidG9BcnJheSIsImFyZ3VtZW50cyIsImlkIiwiX3JlQ29tcG9zZUZyb20iLCJjb250ZXh0IiwicGFyZW50IiwiZnVsbGNsZWFyIiwibGFzdENvbXBvc2VkIiwiY29tcHV0ZWQiLCJjb21wb3NlZCIsInNwbGljZSIsImNsZWFyQWxsIiwiZm9yRWFjaCIsImEiLCJfY2xlYXJDb21wb3NlZDRyZUNvbXBvc2UiLCJfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50IiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwibmV4dENvbnRleHQiLCJhcHBlbmRMYXN0Q29tcG9zZWQiLCJjb21wb3NlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQXlCd0JBLFE7O0FBekJ4Qjs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQmUsU0FBU0EsUUFBVCxDQUFrQkMsT0FBbEIsRUFBMEI7QUFDeEM7QUFBQTs7QUFBQTtBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQSw2TUFDQ0MsS0FERCxHQUNPLEVBQUNDLFNBQVEsTUFBS0MsS0FBTCxDQUFXQyxRQUFYLENBQW9CQyxNQUFwQixJQUE0QixDQUE1QixHQUFnQyxNQUFLQyxZQUFMLEVBQWhDLEdBQXNELGdCQUFNQyxRQUFOLENBQWVDLE9BQWYsQ0FBdUIsTUFBS0wsS0FBTCxDQUFXQyxRQUFsQyxDQUEvRCxFQURQO0FBQUE7O0FBQUE7QUFBQTtBQUFBLGtDQUdlO0FBQ2IsV0FBTyxFQUFQO0FBQ0E7QUFMRjtBQUFBO0FBQUEscUNBTWtCO0FBQ2hCLFdBQU8sS0FBS0gsS0FBTCxDQUFXQyxPQUFYLENBQW1CRyxNQUExQjtBQUNBO0FBUkY7QUFBQTtBQUFBLGdDQVVhO0FBQ1gsV0FBTyxLQUFLSixLQUFMLENBQVdDLE9BQWxCO0FBQ0E7QUFaRjtBQUFBO0FBQUEsd0NBY3FCLENBRW5CO0FBaEJGO0FBQUE7QUFBQSx1Q0FzQm9CO0FBQ2xCLGlDQUFjLElBQWQ7QUFDQSx3SUFDQywySUFBMkJPLFNBQTNCO0FBQ0Q7QUExQkY7QUFBQTtBQUFBLHlDQTRCdUJOLEtBNUJ2QixFQTRCNkI7QUFDM0Isb0xBQXVDQSxLQUF2QyxJQUE4QyxnQkFBZSxLQUFLTyxFQUFsRTtBQUNBO0FBOUJGO0FBQUE7QUFBQSwrQkFnQ2tCO0FBQ2IsU0FBS0MsY0FBTCxDQUFvQixJQUFwQixFQURhLENBQ1k7QUFDekI7O0FBRUQ7Ozs7Ozs7O0FBcENKO0FBQUE7QUFBQSxrQ0EyQ21CVCxPQTNDbkIsRUEyQzJCO0FBQ2hCLFNBQUtVLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkYsY0FBcEIsQ0FBbUMsSUFBbkM7QUFDTjtBQTdDTDtBQUFBO0FBQUEsNENBK0MwQkcsU0EvQzFCLEVBK0NvQztBQUFBOztBQUNsQyxRQUFJQyxlQUFhLEtBQUtDLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsTUFBdkIsQ0FBOEIsQ0FBOUIsQ0FBakI7O0FBRUEsUUFBSUMsV0FBUyxTQUFUQSxRQUFTLElBQUc7QUFDZixTQUFHLE9BQUtILFFBQUwsQ0FBY1osUUFBZCxDQUF1QkMsTUFBMUIsRUFBaUM7QUFDaEMsYUFBS1csUUFBTCxDQUFjWixRQUFkLENBQXVCZ0IsT0FBdkIsQ0FBK0I7QUFBQSxjQUFHQyxFQUFFQyx3QkFBRixDQUEyQixJQUEzQixDQUFIO0FBQUEsT0FBL0I7QUFDQSxhQUFLTixRQUFMLENBQWNaLFFBQWQsQ0FBdUJjLE1BQXZCLENBQThCLENBQTlCO0FBQ0E7QUFDRCxZQUFLRixRQUFMLENBQWNELFlBQWQsR0FBMkIsSUFBM0I7QUFDQSxLQU5EO0FBT0EsUUFBR0QsU0FBSCxFQUFhO0FBQ1pLO0FBQ0EsS0FGRCxNQUVNLElBQUcsQ0FBQyxLQUFLSSw0QkFBTCxDQUFrQ1IsWUFBbEMsQ0FBSixFQUFvRDtBQUN6REk7QUFDQSxLQUZLLE1BRUE7QUFDTCxVQUFLSCxRQUFMLENBQWNELFlBQWQsR0FBMkJBLFlBQTNCO0FBQ0E7QUFDRDs7QUFFSzs7OztBQWxFUDtBQUFBO0FBQUEsZ0RBcUVvQ0EsWUFyRXBDLEVBcUVpRDtBQUMvQyxXQUFPLEtBQVA7QUFDTTtBQUNEOzs7O0FBeEVQO0FBQUE7QUFBQSx5Q0EyRTZCUyxTQTNFN0IsRUEyRXdDQyxTQTNFeEMsRUEyRW1EQyxXQTNFbkQsRUEyRStEO0FBQ3BEO0FBQ0EsUUFBRyxLQUFLVixRQUFMLENBQWNDLFFBQWQsQ0FBdUJaLE1BQXZCLElBQStCLENBQWxDLEVBQW9DO0FBQzVDLFNBQUcsS0FBS1csUUFBTCxDQUFjRCxZQUFqQixFQUE4QjtBQUM3QixXQUFLWSxrQkFBTDtBQUNBLE1BRkQsTUFHQyxLQUFLQyxPQUFMO0FBQ0Q7QUFDUSxXQUFPLElBQVA7QUFDSDtBQXBGUjtBQUFBO0FBQUEsdUJBa0JTO0FBQ1AsV0FBTyxLQUFLekIsS0FBTCxDQUFXTyxFQUFsQjtBQUNBO0FBcEJGO0FBQUE7QUFBQSxHQUFxQlYsT0FBckI7QUFzRkEiLCJmaWxlIjoiZWRpdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7cmVjb3JkQ29udGVudH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuXG4vKipcbiAqICBpdCdzIGEgdmVyeSBjb21wbGljYXRlZCBqb2IsIHNvIHdlIG5lZWQgYSB2ZXJ5IHNpbXBsZSBkZXNpZ24sIG9uZSBzZW50ZW5jZSBkZXNjcmliZWQgc29sdXRpb24uIG9wdGlvbnM6XG4gKiAgMS4gcmVtb3ZlIGFsbCBjb21wb3NlZCwgYW5kIHJlLWNvbXBvc2UgYWxsXG4gKiAgXHQtIG5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXG4gKiAgXHQtIGxvZ2ljIGlzIG1vc3Qgc2ltcGxlXG4gKiAgXHQtIHBlcmZvcm1hbmNlIGlzIG1vc3QgYmFkXG4gKlxuICogIDIuIHJlbW92ZSBhbGwgY29tcG9zZWQgZnJvbSB0aGlzIGNvbnRlbnQsIGFuZCByZS1jb21wb3NlIHJlbW92YWxzXG4gKiAgXHQtIE5lZWQgbG9jYXRlIGNvbXBvc2VkIG9mIHRoaXMgY29udGVudCBpbiBwYWdlXG4gKiAgXHQtIE5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXG4gKiAgXHRcdD4gY29tcG9uZW50RGlkVXBkYXRlXG4gKiAgXHRcdFx0LiBhbnkgc3RhdGUgdXBkYXRlLFxuICogIFx0XHRcdC4gYW5kIGNhcmVmdWxseSB0dW5lZCBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KVxuICogIFx0LSBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiAjMVxuICpcbiAqICAzLiByZWNvbXBvc2UgdGhpcyBjb250ZW50LCBhbmQgY2hlY2sgaWYgbmV3IGNvbXBvc2VkIGZpdHMgbGFzdCBjb21wb3NlZCBzcGFjZSAoaGl0IHJhdGlvIGlzIGxvdylcbiAqICBcdC0gWWVzOiBqdXN0IHJlcGxhY2VcbiAqICBcdC0gTm86ICMxLCBvciAjMlxuICogIFx0LSBhbmQgdGhlbiBsb29wIHdpdGggYWxsIGZvbGxvd2luZyBjb250ZW50IHdpdGggdGhlIHNhbWUgbG9naWNcbiAqXG4gKiAgXHQzLmE6IHJlY29tcG9zZSB0aGlzIGNvbnRlbnQgbGluZSBieSBsaW5lIC4uLiwgbXVjaCBsb2dpY3MgaGVyZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlZGl0YWJsZShDb250ZW50KXtcblx0cmV0dXJuIGNsYXNzIGV4dGVuZHMgQ29udGVudHtcblx0XHRzdGF0ZT17Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVuLmxlbmd0aD09MCA/IHRoaXMuZW1wdHlDb250ZW50KCkgOiBSZWFjdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pfVxuXG5cdFx0ZW1wdHlDb250ZW50KCl7XG5cdFx0XHRyZXR1cm4gW11cblx0XHR9XG5cdFx0Z2V0Q29udGVudENvdW50KCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5jb250ZW50Lmxlbmd0aFxuXHRcdH1cblxuXHRcdGdldENvbnRlbnQoKXtcblx0XHRcdHJldHVybiB0aGlzLnN0YXRlLmNvbnRlbnRcblx0XHR9XG5cblx0XHRhcHBlbmRMYXN0Q29tcG9zZWQoKXtcblxuXHRcdH1cblxuXHRcdGdldCBpZCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuaWRcblx0XHR9XG5cblx0XHRjb21wb25lbnREaWRNb3VudCgpe1xuXHRcdFx0cmVjb3JkQ29udGVudCh0aGlzKVxuXHRcdFx0aWYoc3VwZXIuY29tcG9uZW50RGlkTW91bnQpXG5cdFx0XHRcdHN1cGVyLmNvbXBvbmVudERpZE1vdW50KC4uLmFyZ3VtZW50cylcblx0XHR9XG5cblx0XHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xuXHRcdFx0cmV0dXJuIHN1cGVyLmNyZWF0ZUNvbXBvc2VkMlBhcmVudCh7Li4ucHJvcHMsIFwiZGF0YS1jb250ZW50XCI6dGhpcy5pZH0pXG5cdFx0fVxuXG4gICAgICAgIHJlQ29tcG9zZSgpe1xuICAgIFx0XHR0aGlzLl9yZUNvbXBvc2VGcm9tKHRoaXMpLy8jMiBzb2x1dGlvblxuICAgIFx0fVxuXG4gICAgXHQvKipcbiAgICBcdCAqICBpZiB3aXRoIGNvbnRlbnRcbiAgICBcdCAqICBcdD4gc2ltcGx5IGFzayBwYXJlbnQgdG8gcmVjb21wb3NlXG4gICAgXHQgKiAgaWYgd2l0aG91dCBjb250ZW50XG4gICAgXHQgKiAgXHQ+IGp1c3QgcmVtb3ZlIGFsbCBhbmQgb2Zmc3ByaW5nIHRvIGJlIHJlYWR5IHRvIHJlLWNvbXBvc2VcbiAgICBcdCAqICBcdD4gc29tZXdoZXJlIHNvbWV0aW1lIGl0IHdpbGwgYmUgdHJpZ2dlcmVkIHRvIHJlLWNvbXBvc2VcbiAgICBcdCAqL1xuICAgIFx0X3JlQ29tcG9zZUZyb20oY29udGVudCl7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50Ll9yZUNvbXBvc2VGcm9tKHRoaXMpXG4gICAgXHR9XG5cblx0XHRfY2xlYXJDb21wb3NlZDRyZUNvbXBvc2UoZnVsbGNsZWFyKXtcblx0XHRcdGxldCBsYXN0Q29tcG9zZWQ9dGhpcy5jb21wdXRlZC5jb21wb3NlZC5zcGxpY2UoMClcblxuXHRcdFx0bGV0IGNsZWFyQWxsPWE9Pntcblx0XHRcdFx0aWYodGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4uZm9yRWFjaChhPT5hLl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSh0cnVlKSlcblx0XHRcdFx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnNwbGljZSgwKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkPW51bGxcblx0XHRcdH1cblx0XHRcdGlmKGZ1bGxjbGVhcil7XG5cdFx0XHRcdGNsZWFyQWxsKClcblx0XHRcdH1lbHNlIGlmKCF0aGlzLl9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQobGFzdENvbXBvc2VkKSl7XG5cdFx0XHRcdGNsZWFyQWxsKClcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWQ9bGFzdENvbXBvc2VkXG5cdFx0XHR9XG5cdFx0fVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpcyB0aGVyZSBhIHdheSB0byBqdXN0IHNpbXBseSByZS11c2UgbGFzdCBjb21wb3NlZD9cbiAgICAgICAgICovXG4gICAgICAgIF9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQobGFzdENvbXBvc2VkKXtcblx0XHRcdHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvbmx5IG5vIGNvbXBvc2VkIHNob3VsZCBiZSByZS1jb21wb3NlXG4gICAgICAgICAqL1xuICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KXtcbiAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKGBzaG91bGRDb21wb25lbnRVcGRhdGUgb24gJHt0aGlzLmRpc3BsYXlOYW1lfSwgd2l0aCAke3RoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wfWApXG4gICAgICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MCl7XG5cdFx0XHRcdGlmKHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkKXtcblx0XHRcdFx0XHR0aGlzLmFwcGVuZExhc3RDb21wb3NlZCgpXG5cdFx0XHRcdH1lbHNlXG5cdFx0XHRcdFx0dGhpcy5jb21wb3NlKClcblx0XHRcdH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblx0fVxufVxuIl19