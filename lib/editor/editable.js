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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOlsiZWRpdGFibGUiLCJDb250ZW50Iiwic3RhdGUiLCJjb250ZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImxlbmd0aCIsImVtcHR5Q29udGVudCIsIkNoaWxkcmVuIiwidG9BcnJheSIsImlkIiwiX3JlQ29tcG9zZUZyb20iLCJjb250ZXh0IiwicGFyZW50IiwiZnVsbGNsZWFyIiwibGFzdENvbXBvc2VkIiwiY29tcHV0ZWQiLCJjb21wb3NlZCIsInNwbGljZSIsImNsZWFyQWxsIiwiZm9yRWFjaCIsImEiLCJfY2xlYXJDb21wb3NlZDRyZUNvbXBvc2UiLCJfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50IiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwibmV4dENvbnRleHQiLCJhcHBlbmRMYXN0Q29tcG9zZWQiLCJjb21wb3NlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQXdCd0JBLFE7O0FBeEJ4Qjs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQmUsU0FBU0EsUUFBVCxDQUFrQkMsT0FBbEIsRUFBMEI7QUFDeEM7QUFBQTs7QUFBQTtBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQSxnTkFDQ0MsS0FERCxHQUNPLEVBQUNDLFNBQVEsTUFBS0MsS0FBTCxDQUFXQyxRQUFYLENBQW9CQyxNQUFwQixJQUE0QixDQUE1QixHQUFnQyxNQUFLQyxZQUFMLEVBQWhDLEdBQXNELGdCQUFNQyxRQUFOLENBQWVDLE9BQWYsQ0FBdUIsTUFBS0wsS0FBTCxDQUFXQyxRQUFsQyxDQUEvRCxFQURQO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHFDQUdlO0FBQ2IsZUFBTyxFQUFQO0FBQ0E7QUFMRjtBQUFBO0FBQUEsd0NBTWtCO0FBQ2hCLGVBQU8sS0FBS0gsS0FBTCxDQUFXQyxPQUFYLENBQW1CRyxNQUExQjtBQUNBO0FBUkY7QUFBQTtBQUFBLG1DQVVhO0FBQ1gsZUFBTyxLQUFLSixLQUFMLENBQVdDLE9BQWxCO0FBQ0E7QUFaRjtBQUFBO0FBQUEsMkNBY3FCLENBRW5CO0FBaEJGO0FBQUE7QUFBQSw0Q0FzQnVCQyxLQXRCdkIsRUFzQjZCO0FBQzNCLHdMQUF1Q0EsS0FBdkMsSUFBOEMsZ0JBQWUsS0FBS00sRUFBbEU7QUFDQTtBQXhCRjtBQUFBO0FBQUEsa0NBMEJrQjtBQUNiLGFBQUtDLGNBQUwsQ0FBb0IsSUFBcEIsRUFEYSxDQUNZO0FBQ3pCOztBQUVEOzs7Ozs7OztBQTlCSjtBQUFBO0FBQUEscUNBcUNtQlIsT0FyQ25CLEVBcUMyQjtBQUNoQixhQUFLUyxPQUFMLENBQWFDLE1BQWIsQ0FBb0JGLGNBQXBCLENBQW1DLElBQW5DO0FBQ047QUF2Q0w7QUFBQTtBQUFBLCtDQXlDMEJHLFNBekMxQixFQXlDb0M7QUFBQTs7QUFDbEMsWUFBSUMsZUFBYSxLQUFLQyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLE1BQXZCLENBQThCLENBQTlCLENBQWpCOztBQUVBLFlBQUlDLFdBQVMsU0FBVEEsUUFBUyxJQUFHO0FBQ2YsY0FBRyxPQUFLSCxRQUFMLENBQWNYLFFBQWQsQ0FBdUJDLE1BQTFCLEVBQWlDO0FBQ2hDLG1CQUFLVSxRQUFMLENBQWNYLFFBQWQsQ0FBdUJlLE9BQXZCLENBQStCO0FBQUEscUJBQUdDLEVBQUVDLHdCQUFGLENBQTJCLElBQTNCLENBQUg7QUFBQSxhQUEvQjtBQUNBLG1CQUFLTixRQUFMLENBQWNYLFFBQWQsQ0FBdUJhLE1BQXZCLENBQThCLENBQTlCO0FBQ0E7QUFDRCxpQkFBS0YsUUFBTCxDQUFjRCxZQUFkLEdBQTJCLElBQTNCO0FBQ0EsU0FORDtBQU9BLFlBQUdELFNBQUgsRUFBYTtBQUNaSztBQUNBLFNBRkQsTUFFTSxJQUFHLENBQUMsS0FBS0ksNEJBQUwsQ0FBa0NSLFlBQWxDLENBQUosRUFBb0Q7QUFDekRJO0FBQ0EsU0FGSyxNQUVBO0FBQ0wsZUFBS0gsUUFBTCxDQUFjRCxZQUFkLEdBQTJCQSxZQUEzQjtBQUNBO0FBQ0Q7O0FBRUs7Ozs7QUE1RFA7QUFBQTtBQUFBLG1EQStEb0NBLFlBL0RwQyxFQStEaUQ7QUFDL0MsZUFBTyxLQUFQO0FBQ007QUFDRDs7OztBQWxFUDtBQUFBO0FBQUEsNENBcUU2QlMsU0FyRTdCLEVBcUV3Q0MsU0FyRXhDLEVBcUVtREMsV0FyRW5ELEVBcUUrRDtBQUNwRDtBQUNBLFlBQUcsS0FBS1YsUUFBTCxDQUFjQyxRQUFkLENBQXVCWCxNQUF2QixJQUErQixDQUFsQyxFQUFvQztBQUM1QyxjQUFHLEtBQUtVLFFBQUwsQ0FBY0QsWUFBakIsRUFBOEI7QUFDN0IsaUJBQUtZLGtCQUFMO0FBQ0EsV0FGRCxNQUdDLEtBQUtDLE9BQUw7QUFDRDtBQUNRLGVBQU8sSUFBUDtBQUNIO0FBOUVSO0FBQUE7QUFBQSwwQkFrQlM7QUFDUCxlQUFPLEtBQUt4QixLQUFMLENBQVdNLEVBQWxCO0FBQ0E7QUFwQkY7QUFBQTtBQUFBLElBQXFCVCxPQUFyQjtBQWdGQSIsImZpbGUiOiJlZGl0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuLyoqXHJcbiAqICBpdCdzIGEgdmVyeSBjb21wbGljYXRlZCBqb2IsIHNvIHdlIG5lZWQgYSB2ZXJ5IHNpbXBsZSBkZXNpZ24sIG9uZSBzZW50ZW5jZSBkZXNjcmliZWQgc29sdXRpb24uIG9wdGlvbnM6XHJcbiAqICAxLiByZW1vdmUgYWxsIGNvbXBvc2VkLCBhbmQgcmUtY29tcG9zZSBhbGxcclxuICogIFx0LSBuZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxyXG4gKiAgXHQtIGxvZ2ljIGlzIG1vc3Qgc2ltcGxlXHJcbiAqICBcdC0gcGVyZm9ybWFuY2UgaXMgbW9zdCBiYWRcclxuICpcclxuICogIDIuIHJlbW92ZSBhbGwgY29tcG9zZWQgZnJvbSB0aGlzIGNvbnRlbnQsIGFuZCByZS1jb21wb3NlIHJlbW92YWxzXHJcbiAqICBcdC0gTmVlZCBsb2NhdGUgY29tcG9zZWQgb2YgdGhpcyBjb250ZW50IGluIHBhZ2VcclxuICogIFx0LSBOZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxyXG4gKiAgXHRcdD4gY29tcG9uZW50RGlkVXBkYXRlXHJcbiAqICBcdFx0XHQuIGFueSBzdGF0ZSB1cGRhdGUsXHJcbiAqICBcdFx0XHQuIGFuZCBjYXJlZnVsbHkgdHVuZWQgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dClcclxuICogIFx0LSBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiAjMVxyXG4gKlxyXG4gKiAgMy4gcmVjb21wb3NlIHRoaXMgY29udGVudCwgYW5kIGNoZWNrIGlmIG5ldyBjb21wb3NlZCBmaXRzIGxhc3QgY29tcG9zZWQgc3BhY2UgKGhpdCByYXRpbyBpcyBsb3cpXHJcbiAqICBcdC0gWWVzOiBqdXN0IHJlcGxhY2VcclxuICogIFx0LSBObzogIzEsIG9yICMyXHJcbiAqICBcdC0gYW5kIHRoZW4gbG9vcCB3aXRoIGFsbCBmb2xsb3dpbmcgY29udGVudCB3aXRoIHRoZSBzYW1lIGxvZ2ljXHJcbiAqXHJcbiAqICBcdDMuYTogcmVjb21wb3NlIHRoaXMgY29udGVudCBsaW5lIGJ5IGxpbmUgLi4uLCBtdWNoIGxvZ2ljcyBoZXJlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlZGl0YWJsZShDb250ZW50KXtcclxuXHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb250ZW50e1xyXG5cdFx0c3RhdGU9e2NvbnRlbnQ6dGhpcy5wcm9wcy5jaGlsZHJlbi5sZW5ndGg9PTAgPyB0aGlzLmVtcHR5Q29udGVudCgpIDogUmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKX1cclxuXHRcdFxyXG5cdFx0ZW1wdHlDb250ZW50KCl7XHJcblx0XHRcdHJldHVybiBbXVxyXG5cdFx0fVxyXG5cdFx0Z2V0Q29udGVudENvdW50KCl7XHJcblx0XHRcdHJldHVybiB0aGlzLnN0YXRlLmNvbnRlbnQubGVuZ3RoXHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0Q29udGVudCgpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5jb250ZW50XHJcblx0XHR9XHJcblxyXG5cdFx0YXBwZW5kTGFzdENvbXBvc2VkKCl7XHJcblxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRnZXQgaWQoKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuaWRcclxuXHRcdH1cclxuXHJcblx0XHRjcmVhdGVDb21wb3NlZDJQYXJlbnQocHJvcHMpe1xyXG5cdFx0XHRyZXR1cm4gc3VwZXIuY3JlYXRlQ29tcG9zZWQyUGFyZW50KHsuLi5wcm9wcywgXCJkYXRhLWNvbnRlbnRcIjp0aGlzLmlkfSlcclxuXHRcdH1cclxuXHJcbiAgICAgICAgcmVDb21wb3NlKCl7XHJcbiAgICBcdFx0dGhpcy5fcmVDb21wb3NlRnJvbSh0aGlzKS8vIzIgc29sdXRpb25cclxuICAgIFx0fVxyXG5cclxuICAgIFx0LyoqXHJcbiAgICBcdCAqICBpZiB3aXRoIGNvbnRlbnRcclxuICAgIFx0ICogIFx0PiBzaW1wbHkgYXNrIHBhcmVudCB0byByZWNvbXBvc2VcclxuICAgIFx0ICogIGlmIHdpdGhvdXQgY29udGVudFxyXG4gICAgXHQgKiAgXHQ+IGp1c3QgcmVtb3ZlIGFsbCBhbmQgb2Zmc3ByaW5nIHRvIGJlIHJlYWR5IHRvIHJlLWNvbXBvc2VcclxuICAgIFx0ICogIFx0PiBzb21ld2hlcmUgc29tZXRpbWUgaXQgd2lsbCBiZSB0cmlnZ2VyZWQgdG8gcmUtY29tcG9zZVxyXG4gICAgXHQgKi9cclxuICAgIFx0X3JlQ29tcG9zZUZyb20oY29udGVudCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQuX3JlQ29tcG9zZUZyb20odGhpcylcclxuICAgIFx0fVxyXG5cclxuXHRcdF9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZShmdWxsY2xlYXIpe1xyXG5cdFx0XHRsZXQgbGFzdENvbXBvc2VkPXRoaXMuY29tcHV0ZWQuY29tcG9zZWQuc3BsaWNlKDApXHJcblxyXG5cdFx0XHRsZXQgY2xlYXJBbGw9YT0+e1xyXG5cdFx0XHRcdGlmKHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoKXtcclxuXHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4uZm9yRWFjaChhPT5hLl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSh0cnVlKSlcclxuXHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4uc3BsaWNlKDApXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkPW51bGxcclxuXHRcdFx0fVxyXG5cdFx0XHRpZihmdWxsY2xlYXIpe1xyXG5cdFx0XHRcdGNsZWFyQWxsKClcclxuXHRcdFx0fWVsc2UgaWYoIXRoaXMuX2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudChsYXN0Q29tcG9zZWQpKXtcclxuXHRcdFx0XHRjbGVhckFsbCgpXHJcblx0XHRcdH1lbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZD1sYXN0Q29tcG9zZWRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBpcyB0aGVyZSBhIHdheSB0byBqdXN0IHNpbXBseSByZS11c2UgbGFzdCBjb21wb3NlZD9cclxuICAgICAgICAgKi9cclxuICAgICAgICBfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KGxhc3RDb21wb3NlZCl7XHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvbmx5IG5vIGNvbXBvc2VkIHNob3VsZCBiZSByZS1jb21wb3NlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCl7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKGBzaG91bGRDb21wb25lbnRVcGRhdGUgb24gJHt0aGlzLmRpc3BsYXlOYW1lfSwgd2l0aCAke3RoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wfWApXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wKXtcclxuXHRcdFx0XHRpZih0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZCl7XHJcblx0XHRcdFx0XHR0aGlzLmFwcGVuZExhc3RDb21wb3NlZCgpXHJcblx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdHRoaXMuY29tcG9zZSgpXHJcblx0XHRcdH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcblx0fVxyXG59XHJcbiJdfQ==