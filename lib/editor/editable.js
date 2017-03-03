"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.default = editable;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _selector = require("./selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
		_inherits(_class2, _Content);

		function _class2() {
			var _ref;

			var _temp, _this, _ret;

			_classCallCheck(this, _class2);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || Object.getPrototypeOf(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.state = { content: _this.props.children.length == 0 ? _this.emptyContent() : _react2.default.Children.toArray(_this.props.children) }, _temp), _possibleConstructorReturn(_this, _ret);
		}

		_createClass(_class2, [{
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
				if (_get(_class2.prototype.__proto__ || Object.getPrototypeOf(_class2.prototype), "componentDidMount", this)) _get(_class2.prototype.__proto__ || Object.getPrototypeOf(_class2.prototype), "componentDidMount", this).apply(this, arguments);
			}
		}, {
			key: "createComposed2Parent",
			value: function createComposed2Parent(props) {
				return _get(_class2.prototype.__proto__ || Object.getPrototypeOf(_class2.prototype), "createComposed2Parent", this).call(this, _extends({}, props, { "data-content": this.id }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOlsiZWRpdGFibGUiLCJDb250ZW50Iiwic3RhdGUiLCJjb250ZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImxlbmd0aCIsImVtcHR5Q29udGVudCIsIkNoaWxkcmVuIiwidG9BcnJheSIsImFyZ3VtZW50cyIsImlkIiwiX3JlQ29tcG9zZUZyb20iLCJjb250ZXh0IiwicGFyZW50IiwiZnVsbGNsZWFyIiwibGFzdENvbXBvc2VkIiwiY29tcHV0ZWQiLCJjb21wb3NlZCIsInNwbGljZSIsImNsZWFyQWxsIiwiZm9yRWFjaCIsImEiLCJfY2xlYXJDb21wb3NlZDRyZUNvbXBvc2UiLCJfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50IiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwibmV4dENvbnRleHQiLCJhcHBlbmRMYXN0Q29tcG9zZWQiLCJjb21wb3NlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7a0JBeUJ3QkEsUTs7QUF6QnhCOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCZSxTQUFTQSxRQUFULENBQWtCQyxPQUFsQixFQUEwQjtBQUN4QztBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBLHVMQUNDQyxLQURELEdBQ08sRUFBQ0MsU0FBUSxNQUFLQyxLQUFMLENBQVdDLFFBQVgsQ0FBb0JDLE1BQXBCLElBQTRCLENBQTVCLEdBQWdDLE1BQUtDLFlBQUwsRUFBaEMsR0FBc0QsZ0JBQU1DLFFBQU4sQ0FBZUMsT0FBZixDQUF1QixNQUFLTCxLQUFMLENBQVdDLFFBQWxDLENBQS9ELEVBRFA7QUFBQTs7QUFBQTtBQUFBO0FBQUEsa0NBR2U7QUFDYixXQUFPLEVBQVA7QUFDQTtBQUxGO0FBQUE7QUFBQSxxQ0FNa0I7QUFDaEIsV0FBTyxLQUFLSCxLQUFMLENBQVdDLE9BQVgsQ0FBbUJHLE1BQTFCO0FBQ0E7QUFSRjtBQUFBO0FBQUEsZ0NBVWE7QUFDWCxXQUFPLEtBQUtKLEtBQUwsQ0FBV0MsT0FBbEI7QUFDQTtBQVpGO0FBQUE7QUFBQSx3Q0FjcUIsQ0FFbkI7QUFoQkY7QUFBQTtBQUFBLHVDQXNCb0I7QUFDbEIsaUNBQWMsSUFBZDtBQUNBLGtIQUNDLHFIQUEyQk8sU0FBM0I7QUFDRDtBQTFCRjtBQUFBO0FBQUEseUNBNEJ1Qk4sS0E1QnZCLEVBNEI2QjtBQUMzQixnSkFBdUNBLEtBQXZDLElBQThDLGdCQUFlLEtBQUtPLEVBQWxFO0FBQ0E7QUE5QkY7QUFBQTtBQUFBLCtCQWdDa0I7QUFDYixTQUFLQyxjQUFMLENBQW9CLElBQXBCLEVBRGEsQ0FDWTtBQUN6Qjs7QUFFRDs7Ozs7Ozs7QUFwQ0o7QUFBQTtBQUFBLGtDQTJDbUJULE9BM0NuQixFQTJDMkI7QUFDaEIsU0FBS1UsT0FBTCxDQUFhQyxNQUFiLENBQW9CRixjQUFwQixDQUFtQyxJQUFuQztBQUNOO0FBN0NMO0FBQUE7QUFBQSw0Q0ErQzBCRyxTQS9DMUIsRUErQ29DO0FBQUE7O0FBQ2xDLFFBQUlDLGVBQWEsS0FBS0MsUUFBTCxDQUFjQyxRQUFkLENBQXVCQyxNQUF2QixDQUE4QixDQUE5QixDQUFqQjs7QUFFQSxRQUFJQyxXQUFTLFNBQVRBLFFBQVMsSUFBRztBQUNmLFNBQUcsT0FBS0gsUUFBTCxDQUFjWixRQUFkLENBQXVCQyxNQUExQixFQUFpQztBQUNoQyxhQUFLVyxRQUFMLENBQWNaLFFBQWQsQ0FBdUJnQixPQUF2QixDQUErQjtBQUFBLGNBQUdDLEVBQUVDLHdCQUFGLENBQTJCLElBQTNCLENBQUg7QUFBQSxPQUEvQjtBQUNBLGFBQUtOLFFBQUwsQ0FBY1osUUFBZCxDQUF1QmMsTUFBdkIsQ0FBOEIsQ0FBOUI7QUFDQTtBQUNELFlBQUtGLFFBQUwsQ0FBY0QsWUFBZCxHQUEyQixJQUEzQjtBQUNBLEtBTkQ7QUFPQSxRQUFHRCxTQUFILEVBQWE7QUFDWks7QUFDQSxLQUZELE1BRU0sSUFBRyxDQUFDLEtBQUtJLDRCQUFMLENBQWtDUixZQUFsQyxDQUFKLEVBQW9EO0FBQ3pESTtBQUNBLEtBRkssTUFFQTtBQUNMLFVBQUtILFFBQUwsQ0FBY0QsWUFBZCxHQUEyQkEsWUFBM0I7QUFDQTtBQUNEOztBQUVLOzs7O0FBbEVQO0FBQUE7QUFBQSxnREFxRW9DQSxZQXJFcEMsRUFxRWlEO0FBQy9DLFdBQU8sS0FBUDtBQUNNO0FBQ0Q7Ozs7QUF4RVA7QUFBQTtBQUFBLHlDQTJFNkJTLFNBM0U3QixFQTJFd0NDLFNBM0V4QyxFQTJFbURDLFdBM0VuRCxFQTJFK0Q7QUFDcEQ7QUFDQSxRQUFHLEtBQUtWLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QlosTUFBdkIsSUFBK0IsQ0FBbEMsRUFBb0M7QUFDNUMsU0FBRyxLQUFLVyxRQUFMLENBQWNELFlBQWpCLEVBQThCO0FBQzdCLFdBQUtZLGtCQUFMO0FBQ0EsTUFGRCxNQUdDLEtBQUtDLE9BQUw7QUFDRDtBQUNRLFdBQU8sSUFBUDtBQUNIO0FBcEZSO0FBQUE7QUFBQSx1QkFrQlM7QUFDUCxXQUFPLEtBQUt6QixLQUFMLENBQVdPLEVBQWxCO0FBQ0E7QUFwQkY7O0FBQUE7QUFBQSxHQUFxQlYsT0FBckI7QUFzRkEiLCJmaWxlIjoiZWRpdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtyZWNvcmRDb250ZW50fSBmcm9tIFwiLi9zZWxlY3RvclwiXHJcblxyXG4vKipcclxuICogIGl0J3MgYSB2ZXJ5IGNvbXBsaWNhdGVkIGpvYiwgc28gd2UgbmVlZCBhIHZlcnkgc2ltcGxlIGRlc2lnbiwgb25lIHNlbnRlbmNlIGRlc2NyaWJlZCBzb2x1dGlvbi4gb3B0aW9uczpcclxuICogIDEuIHJlbW92ZSBhbGwgY29tcG9zZWQsIGFuZCByZS1jb21wb3NlIGFsbFxyXG4gKiAgXHQtIG5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXHJcbiAqICBcdC0gbG9naWMgaXMgbW9zdCBzaW1wbGVcclxuICogIFx0LSBwZXJmb3JtYW5jZSBpcyBtb3N0IGJhZFxyXG4gKlxyXG4gKiAgMi4gcmVtb3ZlIGFsbCBjb21wb3NlZCBmcm9tIHRoaXMgY29udGVudCwgYW5kIHJlLWNvbXBvc2UgcmVtb3ZhbHNcclxuICogIFx0LSBOZWVkIGxvY2F0ZSBjb21wb3NlZCBvZiB0aGlzIGNvbnRlbnQgaW4gcGFnZVxyXG4gKiAgXHQtIE5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXHJcbiAqICBcdFx0PiBjb21wb25lbnREaWRVcGRhdGVcclxuICogIFx0XHRcdC4gYW55IHN0YXRlIHVwZGF0ZSxcclxuICogIFx0XHRcdC4gYW5kIGNhcmVmdWxseSB0dW5lZCBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KVxyXG4gKiAgXHQtIHBlcmZvcm1hbmNlIGlzIGJldHRlciB0aGFuICMxXHJcbiAqXHJcbiAqICAzLiByZWNvbXBvc2UgdGhpcyBjb250ZW50LCBhbmQgY2hlY2sgaWYgbmV3IGNvbXBvc2VkIGZpdHMgbGFzdCBjb21wb3NlZCBzcGFjZSAoaGl0IHJhdGlvIGlzIGxvdylcclxuICogIFx0LSBZZXM6IGp1c3QgcmVwbGFjZVxyXG4gKiAgXHQtIE5vOiAjMSwgb3IgIzJcclxuICogIFx0LSBhbmQgdGhlbiBsb29wIHdpdGggYWxsIGZvbGxvd2luZyBjb250ZW50IHdpdGggdGhlIHNhbWUgbG9naWNcclxuICpcclxuICogIFx0My5hOiByZWNvbXBvc2UgdGhpcyBjb250ZW50IGxpbmUgYnkgbGluZSAuLi4sIG11Y2ggbG9naWNzIGhlcmVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVkaXRhYmxlKENvbnRlbnQpe1xyXG5cdHJldHVybiBjbGFzcyBleHRlbmRzIENvbnRlbnR7XHJcblx0XHRzdGF0ZT17Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVuLmxlbmd0aD09MCA/IHRoaXMuZW1wdHlDb250ZW50KCkgOiBSZWFjdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pfVxyXG5cclxuXHRcdGVtcHR5Q29udGVudCgpe1xyXG5cdFx0XHRyZXR1cm4gW11cclxuXHRcdH1cclxuXHRcdGdldENvbnRlbnRDb3VudCgpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5jb250ZW50Lmxlbmd0aFxyXG5cdFx0fVxyXG5cclxuXHRcdGdldENvbnRlbnQoKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc3RhdGUuY29udGVudFxyXG5cdFx0fVxyXG5cclxuXHRcdGFwcGVuZExhc3RDb21wb3NlZCgpe1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRnZXQgaWQoKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuaWRcclxuXHRcdH1cclxuXHJcblx0XHRjb21wb25lbnREaWRNb3VudCgpe1xyXG5cdFx0XHRyZWNvcmRDb250ZW50KHRoaXMpXHJcblx0XHRcdGlmKHN1cGVyLmNvbXBvbmVudERpZE1vdW50KVxyXG5cdFx0XHRcdHN1cGVyLmNvbXBvbmVudERpZE1vdW50KC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHJcblx0XHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0XHRyZXR1cm4gc3VwZXIuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHsuLi5wcm9wcywgXCJkYXRhLWNvbnRlbnRcIjp0aGlzLmlkfSlcclxuXHRcdH1cclxuXHJcbiAgICAgICAgcmVDb21wb3NlKCl7XHJcbiAgICBcdFx0dGhpcy5fcmVDb21wb3NlRnJvbSh0aGlzKS8vIzIgc29sdXRpb25cclxuICAgIFx0fVxyXG5cclxuICAgIFx0LyoqXHJcbiAgICBcdCAqICBpZiB3aXRoIGNvbnRlbnRcclxuICAgIFx0ICogIFx0PiBzaW1wbHkgYXNrIHBhcmVudCB0byByZWNvbXBvc2VcclxuICAgIFx0ICogIGlmIHdpdGhvdXQgY29udGVudFxyXG4gICAgXHQgKiAgXHQ+IGp1c3QgcmVtb3ZlIGFsbCBhbmQgb2Zmc3ByaW5nIHRvIGJlIHJlYWR5IHRvIHJlLWNvbXBvc2VcclxuICAgIFx0ICogIFx0PiBzb21ld2hlcmUgc29tZXRpbWUgaXQgd2lsbCBiZSB0cmlnZ2VyZWQgdG8gcmUtY29tcG9zZVxyXG4gICAgXHQgKi9cclxuICAgIFx0X3JlQ29tcG9zZUZyb20oY29udGVudCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQuX3JlQ29tcG9zZUZyb20odGhpcylcclxuICAgIFx0fVxyXG5cclxuXHRcdF9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZShmdWxsY2xlYXIpe1xyXG5cdFx0XHRsZXQgbGFzdENvbXBvc2VkPXRoaXMuY29tcHV0ZWQuY29tcG9zZWQuc3BsaWNlKDApXHJcblxyXG5cdFx0XHRsZXQgY2xlYXJBbGw9YT0+e1xyXG5cdFx0XHRcdGlmKHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoKXtcclxuXHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4uZm9yRWFjaChhPT5hLl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSh0cnVlKSlcclxuXHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4uc3BsaWNlKDApXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkPW51bGxcclxuXHRcdFx0fVxyXG5cdFx0XHRpZihmdWxsY2xlYXIpe1xyXG5cdFx0XHRcdGNsZWFyQWxsKClcclxuXHRcdFx0fWVsc2UgaWYoIXRoaXMuX2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudChsYXN0Q29tcG9zZWQpKXtcclxuXHRcdFx0XHRjbGVhckFsbCgpXHJcblx0XHRcdH1lbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZD1sYXN0Q29tcG9zZWRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBpcyB0aGVyZSBhIHdheSB0byBqdXN0IHNpbXBseSByZS11c2UgbGFzdCBjb21wb3NlZD9cclxuICAgICAgICAgKi9cclxuICAgICAgICBfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KGxhc3RDb21wb3NlZCl7XHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvbmx5IG5vIGNvbXBvc2VkIHNob3VsZCBiZSByZS1jb21wb3NlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCl7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKGBzaG91bGRDb21wb25lbnRVcGRhdGUgb24gJHt0aGlzLmRpc3BsYXlOYW1lfSwgd2l0aCAke3RoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wfWApXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wKXtcclxuXHRcdFx0XHRpZih0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZCl7XHJcblx0XHRcdFx0XHR0aGlzLmFwcGVuZExhc3RDb21wb3NlZCgpXHJcblx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdHRoaXMuY29tcG9zZSgpXHJcblx0XHRcdH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcblx0fVxyXG59XHJcbiJdfQ==