"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

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
      key: "blur",
      value: function blur() {}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOlsiZWRpdGFibGUiLCJDb250ZW50Iiwic3RhdGUiLCJjb250ZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImxlbmd0aCIsImVtcHR5Q29udGVudCIsIkNoaWxkcmVuIiwidG9BcnJheSIsIl9yZUNvbXBvc2VGcm9tIiwiY29udGV4dCIsInBhcmVudCIsImZ1bGxjbGVhciIsImxhc3RDb21wb3NlZCIsImNvbXB1dGVkIiwiY29tcG9zZWQiLCJzcGxpY2UiLCJjbGVhckFsbCIsImZvckVhY2giLCJhIiwiX2NsZWFyQ29tcG9zZWQ0cmVDb21wb3NlIiwiX2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudCIsIm5leHRQcm9wcyIsIm5leHRTdGF0ZSIsIm5leHRDb250ZXh0IiwiYXBwZW5kTGFzdENvbXBvc2VkIiwiY29tcG9zZSIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkF3QndCQSxROztBQXhCeEI7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JlLFNBQVNBLFFBQVQsQ0FBa0JDLE9BQWxCLEVBQTBCO0FBQ3hDO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ05BQ0NDLEtBREQsR0FDTyxFQUFDQyxTQUFRLE1BQUtDLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkMsTUFBcEIsSUFBNEIsQ0FBNUIsR0FBZ0MsTUFBS0MsWUFBTCxFQUFoQyxHQUFzRCxnQkFBTUMsUUFBTixDQUFlQyxPQUFmLENBQXVCLE1BQUtMLEtBQUwsQ0FBV0MsUUFBbEMsQ0FBL0QsRUFEUDtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQ0FPZTtBQUNiLGVBQU8sRUFBUDtBQUNBO0FBVEY7QUFBQTtBQUFBLHdDQVVrQjtBQUNoQixlQUFPLEtBQUtILEtBQUwsQ0FBV0MsT0FBWCxDQUFtQkcsTUFBMUI7QUFDQTtBQVpGO0FBQUE7QUFBQSxtQ0FjYTtBQUNYLGVBQU8sS0FBS0osS0FBTCxDQUFXQyxPQUFsQjtBQUNBO0FBaEJGO0FBQUE7QUFBQSwyQ0FrQnFCLENBRW5CO0FBcEJGO0FBQUE7QUFBQSxrQ0FzQmtCO0FBQ2IsYUFBS08sY0FBTCxDQUFvQixJQUFwQixFQURhLENBQ1k7QUFDekI7O0FBRUQ7Ozs7Ozs7O0FBMUJKO0FBQUE7QUFBQSxxQ0FpQ21CUCxPQWpDbkIsRUFpQzJCO0FBQ2hCLGFBQUtRLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkYsY0FBcEIsQ0FBbUMsSUFBbkM7QUFDTjtBQW5DTDtBQUFBO0FBQUEsK0NBcUMwQkcsU0FyQzFCLEVBcUNvQztBQUFBOztBQUNsQyxZQUFJQyxlQUFhLEtBQUtDLFFBQUwsQ0FBY0MsUUFBZCxDQUF1QkMsTUFBdkIsQ0FBOEIsQ0FBOUIsQ0FBakI7O0FBRUEsWUFBSUMsV0FBUyxTQUFUQSxRQUFTLElBQUc7QUFDZixjQUFHLE9BQUtILFFBQUwsQ0FBY1YsUUFBZCxDQUF1QkMsTUFBMUIsRUFBaUM7QUFDaEMsbUJBQUtTLFFBQUwsQ0FBY1YsUUFBZCxDQUF1QmMsT0FBdkIsQ0FBK0I7QUFBQSxxQkFBR0MsRUFBRUMsd0JBQUYsQ0FBMkIsSUFBM0IsQ0FBSDtBQUFBLGFBQS9CO0FBQ0EsbUJBQUtOLFFBQUwsQ0FBY1YsUUFBZCxDQUF1QlksTUFBdkIsQ0FBOEIsQ0FBOUI7QUFDQTtBQUNELGlCQUFLRixRQUFMLENBQWNELFlBQWQsR0FBMkIsSUFBM0I7QUFDQSxTQU5EO0FBT0EsWUFBR0QsU0FBSCxFQUFhO0FBQ1pLO0FBQ0EsU0FGRCxNQUVNLElBQUcsQ0FBQyxLQUFLSSw0QkFBTCxDQUFrQ1IsWUFBbEMsQ0FBSixFQUFvRDtBQUN6REk7QUFDQSxTQUZLLE1BRUE7QUFDTCxlQUFLSCxRQUFMLENBQWNELFlBQWQsR0FBMkJBLFlBQTNCO0FBQ0E7QUFDRDs7QUFFSzs7OztBQXhEUDtBQUFBO0FBQUEsbURBMkRvQ0EsWUEzRHBDLEVBMkRpRDtBQUMvQyxlQUFPLEtBQVA7QUFDTTtBQUNEOzs7O0FBOURQO0FBQUE7QUFBQSw0Q0FpRTZCUyxTQWpFN0IsRUFpRXdDQyxTQWpFeEMsRUFpRW1EQyxXQWpFbkQsRUFpRStEO0FBQ3BEO0FBQ0EsWUFBRyxLQUFLVixRQUFMLENBQWNDLFFBQWQsQ0FBdUJWLE1BQXZCLElBQStCLENBQWxDLEVBQW9DO0FBQzVDLGNBQUcsS0FBS1MsUUFBTCxDQUFjRCxZQUFqQixFQUE4QjtBQUM3QixpQkFBS1ksa0JBQUw7QUFDQSxXQUZELE1BR0MsS0FBS0MsT0FBTDtBQUNEO0FBQ1EsZUFBTyxJQUFQO0FBQ0g7QUExRVI7QUFBQTtBQUFBLDZCQTRFTyxDQUVMO0FBOUVGO0FBQUE7QUFBQSwwQkFHUztBQUNQLGVBQU8sS0FBS3ZCLEtBQUwsQ0FBV3dCLEVBQWxCO0FBQ0E7QUFMRjtBQUFBO0FBQUEsSUFBcUIzQixPQUFyQjtBQWdGQSIsImZpbGUiOiJlZGl0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuLyoqXHJcbiAqICBpdCdzIGEgdmVyeSBjb21wbGljYXRlZCBqb2IsIHNvIHdlIG5lZWQgYSB2ZXJ5IHNpbXBsZSBkZXNpZ24sIG9uZSBzZW50ZW5jZSBkZXNjcmliZWQgc29sdXRpb24uIG9wdGlvbnM6XHJcbiAqICAxLiByZW1vdmUgYWxsIGNvbXBvc2VkLCBhbmQgcmUtY29tcG9zZSBhbGxcclxuICogIFx0LSBuZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxyXG4gKiAgXHQtIGxvZ2ljIGlzIG1vc3Qgc2ltcGxlXHJcbiAqICBcdC0gcGVyZm9ybWFuY2UgaXMgbW9zdCBiYWRcclxuICpcclxuICogIDIuIHJlbW92ZSBhbGwgY29tcG9zZWQgZnJvbSB0aGlzIGNvbnRlbnQsIGFuZCByZS1jb21wb3NlIHJlbW92YWxzXHJcbiAqICBcdC0gTmVlZCBsb2NhdGUgY29tcG9zZWQgb2YgdGhpcyBjb250ZW50IGluIHBhZ2VcclxuICogIFx0LSBOZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxyXG4gKiAgXHRcdD4gY29tcG9uZW50RGlkVXBkYXRlXHJcbiAqICBcdFx0XHQuIGFueSBzdGF0ZSB1cGRhdGUsXHJcbiAqICBcdFx0XHQuIGFuZCBjYXJlZnVsbHkgdHVuZWQgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dClcclxuICogIFx0LSBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiAjMVxyXG4gKlxyXG4gKiAgMy4gcmVjb21wb3NlIHRoaXMgY29udGVudCwgYW5kIGNoZWNrIGlmIG5ldyBjb21wb3NlZCBmaXRzIGxhc3QgY29tcG9zZWQgc3BhY2UgKGhpdCByYXRpbyBpcyBsb3cpXHJcbiAqICBcdC0gWWVzOiBqdXN0IHJlcGxhY2VcclxuICogIFx0LSBObzogIzEsIG9yICMyXHJcbiAqICBcdC0gYW5kIHRoZW4gbG9vcCB3aXRoIGFsbCBmb2xsb3dpbmcgY29udGVudCB3aXRoIHRoZSBzYW1lIGxvZ2ljXHJcbiAqXHJcbiAqICBcdDMuYTogcmVjb21wb3NlIHRoaXMgY29udGVudCBsaW5lIGJ5IGxpbmUgLi4uLCBtdWNoIGxvZ2ljcyBoZXJlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlZGl0YWJsZShDb250ZW50KXtcclxuXHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb250ZW50e1xyXG5cdFx0c3RhdGU9e2NvbnRlbnQ6dGhpcy5wcm9wcy5jaGlsZHJlbi5sZW5ndGg9PTAgPyB0aGlzLmVtcHR5Q29udGVudCgpIDogUmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKX1cclxuXHJcblx0XHRnZXQgaWQoKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuaWRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0ZW1wdHlDb250ZW50KCl7XHJcblx0XHRcdHJldHVybiBbXVxyXG5cdFx0fVxyXG5cdFx0Z2V0Q29udGVudENvdW50KCl7XHJcblx0XHRcdHJldHVybiB0aGlzLnN0YXRlLmNvbnRlbnQubGVuZ3RoXHJcblx0XHR9XHJcblxyXG5cdFx0Z2V0Q29udGVudCgpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5jb250ZW50XHJcblx0XHR9XHJcblxyXG5cdFx0YXBwZW5kTGFzdENvbXBvc2VkKCl7XHJcblxyXG5cdFx0fVxyXG5cclxuICAgICAgICByZUNvbXBvc2UoKXtcclxuICAgIFx0XHR0aGlzLl9yZUNvbXBvc2VGcm9tKHRoaXMpLy8jMiBzb2x1dGlvblxyXG4gICAgXHR9XHJcblxyXG4gICAgXHQvKipcclxuICAgIFx0ICogIGlmIHdpdGggY29udGVudFxyXG4gICAgXHQgKiAgXHQ+IHNpbXBseSBhc2sgcGFyZW50IHRvIHJlY29tcG9zZVxyXG4gICAgXHQgKiAgaWYgd2l0aG91dCBjb250ZW50XHJcbiAgICBcdCAqICBcdD4ganVzdCByZW1vdmUgYWxsIGFuZCBvZmZzcHJpbmcgdG8gYmUgcmVhZHkgdG8gcmUtY29tcG9zZVxyXG4gICAgXHQgKiAgXHQ+IHNvbWV3aGVyZSBzb21ldGltZSBpdCB3aWxsIGJlIHRyaWdnZXJlZCB0byByZS1jb21wb3NlXHJcbiAgICBcdCAqL1xyXG4gICAgXHRfcmVDb21wb3NlRnJvbShjb250ZW50KXtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5fcmVDb21wb3NlRnJvbSh0aGlzKVxyXG4gICAgXHR9XHJcblxyXG5cdFx0X2NsZWFyQ29tcG9zZWQ0cmVDb21wb3NlKGZ1bGxjbGVhcil7XHJcblx0XHRcdGxldCBsYXN0Q29tcG9zZWQ9dGhpcy5jb21wdXRlZC5jb21wb3NlZC5zcGxpY2UoMClcclxuXHJcblx0XHRcdGxldCBjbGVhckFsbD1hPT57XHJcblx0XHRcdFx0aWYodGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5mb3JFYWNoKGE9PmEuX2NsZWFyQ29tcG9zZWQ0cmVDb21wb3NlKHRydWUpKVxyXG5cdFx0XHRcdFx0dGhpcy5jb21wdXRlZC5jaGlsZHJlbi5zcGxpY2UoMClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWQ9bnVsbFxyXG5cdFx0XHR9XHJcblx0XHRcdGlmKGZ1bGxjbGVhcil7XHJcblx0XHRcdFx0Y2xlYXJBbGwoKVxyXG5cdFx0XHR9ZWxzZSBpZighdGhpcy5faXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KGxhc3RDb21wb3NlZCkpe1xyXG5cdFx0XHRcdGNsZWFyQWxsKClcclxuXHRcdFx0fWVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkPWxhc3RDb21wb3NlZFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGlzIHRoZXJlIGEgd2F5IHRvIGp1c3Qgc2ltcGx5IHJlLXVzZSBsYXN0IGNvbXBvc2VkP1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIF9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQobGFzdENvbXBvc2VkKXtcclxuXHRcdFx0cmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG9ubHkgbm8gY29tcG9zZWQgc2hvdWxkIGJlIHJlLWNvbXBvc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KXtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmluZm8oYHNob3VsZENvbXBvbmVudFVwZGF0ZSBvbiAke3RoaXMuZGlzcGxheU5hbWV9LCB3aXRoICR7dGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTB9YClcclxuICAgICAgICAgICAgaWYodGhpcy5jb21wdXRlZC5jb21wb3NlZC5sZW5ndGg9PTApe1xyXG5cdFx0XHRcdGlmKHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkKXtcclxuXHRcdFx0XHRcdHRoaXMuYXBwZW5kTGFzdENvbXBvc2VkKClcclxuXHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0dGhpcy5jb21wb3NlKClcclxuXHRcdFx0fVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuXHJcblx0XHRibHVyKCl7XHJcblxyXG5cdFx0fVxyXG4gICAgfVxyXG59XHJcbiJdfQ==