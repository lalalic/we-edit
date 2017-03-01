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

var uuid = 0;
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

      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = _class2.__proto__ || (0, _getPrototypeOf2.default)(_class2)).call.apply(_ref, [this].concat(args))), _this), _this._id = uuid++, _this.state = { content: _this.props.children.length == 0 ? _this.emptyContent() : _react2.default.Children.toArray(_this.props.children) }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
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
    }]);
    return _class2;
  }(Content);
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOlsiZWRpdGFibGUiLCJ1dWlkIiwiQ29udGVudCIsIl9pZCIsInN0YXRlIiwiY29udGVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJlbXB0eUNvbnRlbnQiLCJDaGlsZHJlbiIsInRvQXJyYXkiLCJfcmVDb21wb3NlRnJvbSIsImNvbnRleHQiLCJwYXJlbnQiLCJmdWxsY2xlYXIiLCJsYXN0Q29tcG9zZWQiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwic3BsaWNlIiwiY2xlYXJBbGwiLCJmb3JFYWNoIiwiYSIsIl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSIsIl9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJuZXh0Q29udGV4dCIsImFwcGVuZExhc3RDb21wb3NlZCIsImNvbXBvc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQTBCd0JBLFE7O0FBMUJ4Qjs7Ozs7O0FBR0EsSUFBSUMsT0FBSyxDQUFUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQmUsU0FBU0QsUUFBVCxDQUFrQkUsT0FBbEIsRUFBMEI7QUFDeEM7QUFBQTs7QUFBQTtBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQSxnTkFDQ0MsR0FERCxHQUNLRixNQURMLFFBRUNHLEtBRkQsR0FFTyxFQUFDQyxTQUFRLE1BQUtDLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkMsTUFBcEIsSUFBNEIsQ0FBNUIsR0FBZ0MsTUFBS0MsWUFBTCxFQUFoQyxHQUFzRCxnQkFBTUMsUUFBTixDQUFlQyxPQUFmLENBQXVCLE1BQUtMLEtBQUwsQ0FBV0MsUUFBbEMsQ0FBL0QsRUFGUDtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQ0FJZTtBQUNiLGVBQU8sRUFBUDtBQUNBO0FBTkY7QUFBQTtBQUFBLHdDQU9rQjtBQUNoQixlQUFPLEtBQUtILEtBQUwsQ0FBV0MsT0FBWCxDQUFtQkcsTUFBMUI7QUFDQTtBQVRGO0FBQUE7QUFBQSxtQ0FXYTtBQUNYLGVBQU8sS0FBS0osS0FBTCxDQUFXQyxPQUFsQjtBQUNBO0FBYkY7QUFBQTtBQUFBLDJDQWVxQixDQUVuQjtBQWpCRjtBQUFBO0FBQUEsa0NBbUJrQjtBQUNiLGFBQUtPLGNBQUwsQ0FBb0IsSUFBcEIsRUFEYSxDQUNZO0FBQ3pCOztBQUVEOzs7Ozs7OztBQXZCSjtBQUFBO0FBQUEscUNBOEJtQlAsT0E5Qm5CLEVBOEIyQjtBQUNoQixhQUFLUSxPQUFMLENBQWFDLE1BQWIsQ0FBb0JGLGNBQXBCLENBQW1DLElBQW5DO0FBQ047QUFoQ0w7QUFBQTtBQUFBLCtDQWtDMEJHLFNBbEMxQixFQWtDb0M7QUFBQTs7QUFDbEMsWUFBSUMsZUFBYSxLQUFLQyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLE1BQXZCLENBQThCLENBQTlCLENBQWpCOztBQUVBLFlBQUlDLFdBQVMsU0FBVEEsUUFBUyxJQUFHO0FBQ2YsY0FBRyxPQUFLSCxRQUFMLENBQWNWLFFBQWQsQ0FBdUJDLE1BQTFCLEVBQWlDO0FBQ2hDLG1CQUFLUyxRQUFMLENBQWNWLFFBQWQsQ0FBdUJjLE9BQXZCLENBQStCO0FBQUEscUJBQUdDLEVBQUVDLHdCQUFGLENBQTJCLElBQTNCLENBQUg7QUFBQSxhQUEvQjtBQUNBLG1CQUFLTixRQUFMLENBQWNWLFFBQWQsQ0FBdUJZLE1BQXZCLENBQThCLENBQTlCO0FBQ0E7QUFDRCxpQkFBS0YsUUFBTCxDQUFjRCxZQUFkLEdBQTJCLElBQTNCO0FBQ0EsU0FORDtBQU9BLFlBQUdELFNBQUgsRUFBYTtBQUNaSztBQUNBLFNBRkQsTUFFTSxJQUFHLENBQUMsS0FBS0ksNEJBQUwsQ0FBa0NSLFlBQWxDLENBQUosRUFBb0Q7QUFDekRJO0FBQ0EsU0FGSyxNQUVBO0FBQ0wsZUFBS0gsUUFBTCxDQUFjRCxZQUFkLEdBQTJCQSxZQUEzQjtBQUNBO0FBQ0Q7O0FBRUs7Ozs7QUFyRFA7QUFBQTtBQUFBLG1EQXdEb0NBLFlBeERwQyxFQXdEaUQ7QUFDL0MsZUFBTyxLQUFQO0FBQ007QUFDRDs7OztBQTNEUDtBQUFBO0FBQUEsNENBOEQ2QlMsU0E5RDdCLEVBOER3Q0MsU0E5RHhDLEVBOERtREMsV0E5RG5ELEVBOEQrRDtBQUNwRDtBQUNBLFlBQUcsS0FBS1YsUUFBTCxDQUFjQyxRQUFkLENBQXVCVixNQUF2QixJQUErQixDQUFsQyxFQUFvQztBQUM1QyxjQUFHLEtBQUtTLFFBQUwsQ0FBY0QsWUFBakIsRUFBOEI7QUFDN0IsaUJBQUtZLGtCQUFMO0FBQ0EsV0FGRCxNQUdDLEtBQUtDLE9BQUw7QUFDRDtBQUNRLGVBQU8sSUFBUDtBQUNIO0FBdkVSO0FBQUE7QUFBQSxJQUFxQjNCLE9BQXJCO0FBeUVBIiwiZmlsZSI6ImVkaXRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcblxyXG5cclxudmFyIHV1aWQ9MFxyXG4vKipcclxuICogIGl0J3MgYSB2ZXJ5IGNvbXBsaWNhdGVkIGpvYiwgc28gd2UgbmVlZCBhIHZlcnkgc2ltcGxlIGRlc2lnbiwgb25lIHNlbnRlbmNlIGRlc2NyaWJlZCBzb2x1dGlvbi4gb3B0aW9uczpcclxuICogIDEuIHJlbW92ZSBhbGwgY29tcG9zZWQsIGFuZCByZS1jb21wb3NlIGFsbFxyXG4gKiAgXHQtIG5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXHJcbiAqICBcdC0gbG9naWMgaXMgbW9zdCBzaW1wbGVcclxuICogIFx0LSBwZXJmb3JtYW5jZSBpcyBtb3N0IGJhZFxyXG4gKlxyXG4gKiAgMi4gcmVtb3ZlIGFsbCBjb21wb3NlZCBmcm9tIHRoaXMgY29udGVudCwgYW5kIHJlLWNvbXBvc2UgcmVtb3ZhbHNcclxuICogIFx0LSBOZWVkIGxvY2F0ZSBjb21wb3NlZCBvZiB0aGlzIGNvbnRlbnQgaW4gcGFnZVxyXG4gKiAgXHQtIE5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXHJcbiAqICBcdFx0PiBjb21wb25lbnREaWRVcGRhdGVcclxuICogIFx0XHRcdC4gYW55IHN0YXRlIHVwZGF0ZSxcclxuICogIFx0XHRcdC4gYW5kIGNhcmVmdWxseSB0dW5lZCBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KVxyXG4gKiAgXHQtIHBlcmZvcm1hbmNlIGlzIGJldHRlciB0aGFuICMxXHJcbiAqXHJcbiAqICAzLiByZWNvbXBvc2UgdGhpcyBjb250ZW50LCBhbmQgY2hlY2sgaWYgbmV3IGNvbXBvc2VkIGZpdHMgbGFzdCBjb21wb3NlZCBzcGFjZSAoaGl0IHJhdGlvIGlzIGxvdylcclxuICogIFx0LSBZZXM6IGp1c3QgcmVwbGFjZVxyXG4gKiAgXHQtIE5vOiAjMSwgb3IgIzJcclxuICogIFx0LSBhbmQgdGhlbiBsb29wIHdpdGggYWxsIGZvbGxvd2luZyBjb250ZW50IHdpdGggdGhlIHNhbWUgbG9naWNcclxuICpcclxuICogIFx0My5hOiByZWNvbXBvc2UgdGhpcyBjb250ZW50IGxpbmUgYnkgbGluZSAuLi4sIG11Y2ggbG9naWNzIGhlcmVcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVkaXRhYmxlKENvbnRlbnQpe1xyXG5cdHJldHVybiBjbGFzcyBleHRlbmRzIENvbnRlbnR7XHJcblx0XHRfaWQ9dXVpZCsrXHJcblx0XHRzdGF0ZT17Y29udGVudDp0aGlzLnByb3BzLmNoaWxkcmVuLmxlbmd0aD09MCA/IHRoaXMuZW1wdHlDb250ZW50KCkgOiBSZWFjdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pfVxyXG5cclxuXHRcdGVtcHR5Q29udGVudCgpe1xyXG5cdFx0XHRyZXR1cm4gW11cclxuXHRcdH1cclxuXHRcdGdldENvbnRlbnRDb3VudCgpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5zdGF0ZS5jb250ZW50Lmxlbmd0aFxyXG5cdFx0fVxyXG5cclxuXHRcdGdldENvbnRlbnQoKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc3RhdGUuY29udGVudFxyXG5cdFx0fVxyXG5cclxuXHRcdGFwcGVuZExhc3RDb21wb3NlZCgpe1xyXG5cclxuXHRcdH1cclxuXHJcbiAgICAgICAgcmVDb21wb3NlKCl7XHJcbiAgICBcdFx0dGhpcy5fcmVDb21wb3NlRnJvbSh0aGlzKS8vIzIgc29sdXRpb25cclxuICAgIFx0fVxyXG5cclxuICAgIFx0LyoqXHJcbiAgICBcdCAqICBpZiB3aXRoIGNvbnRlbnRcclxuICAgIFx0ICogIFx0PiBzaW1wbHkgYXNrIHBhcmVudCB0byByZWNvbXBvc2VcclxuICAgIFx0ICogIGlmIHdpdGhvdXQgY29udGVudFxyXG4gICAgXHQgKiAgXHQ+IGp1c3QgcmVtb3ZlIGFsbCBhbmQgb2Zmc3ByaW5nIHRvIGJlIHJlYWR5IHRvIHJlLWNvbXBvc2VcclxuICAgIFx0ICogIFx0PiBzb21ld2hlcmUgc29tZXRpbWUgaXQgd2lsbCBiZSB0cmlnZ2VyZWQgdG8gcmUtY29tcG9zZVxyXG4gICAgXHQgKi9cclxuICAgIFx0X3JlQ29tcG9zZUZyb20oY29udGVudCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5wYXJlbnQuX3JlQ29tcG9zZUZyb20odGhpcylcclxuICAgIFx0fVxyXG5cclxuXHRcdF9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZShmdWxsY2xlYXIpe1xyXG5cdFx0XHRsZXQgbGFzdENvbXBvc2VkPXRoaXMuY29tcHV0ZWQuY29tcG9zZWQuc3BsaWNlKDApXHJcblxyXG5cdFx0XHRsZXQgY2xlYXJBbGw9YT0+e1xyXG5cdFx0XHRcdGlmKHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4ubGVuZ3RoKXtcclxuXHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4uZm9yRWFjaChhPT5hLl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSh0cnVlKSlcclxuXHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4uc3BsaWNlKDApXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkPW51bGxcclxuXHRcdFx0fVxyXG5cdFx0XHRpZihmdWxsY2xlYXIpe1xyXG5cdFx0XHRcdGNsZWFyQWxsKClcclxuXHRcdFx0fWVsc2UgaWYoIXRoaXMuX2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudChsYXN0Q29tcG9zZWQpKXtcclxuXHRcdFx0XHRjbGVhckFsbCgpXHJcblx0XHRcdH1lbHNlIHtcclxuXHRcdFx0XHR0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZD1sYXN0Q29tcG9zZWRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBpcyB0aGVyZSBhIHdheSB0byBqdXN0IHNpbXBseSByZS11c2UgbGFzdCBjb21wb3NlZD9cclxuICAgICAgICAgKi9cclxuICAgICAgICBfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KGxhc3RDb21wb3NlZCl7XHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvbmx5IG5vIGNvbXBvc2VkIHNob3VsZCBiZSByZS1jb21wb3NlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCl7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKGBzaG91bGRDb21wb25lbnRVcGRhdGUgb24gJHt0aGlzLmRpc3BsYXlOYW1lfSwgd2l0aCAke3RoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wfWApXHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wKXtcclxuXHRcdFx0XHRpZih0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZCl7XHJcblx0XHRcdFx0XHR0aGlzLmFwcGVuZExhc3RDb21wb3NlZCgpXHJcblx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdHRoaXMuY29tcG9zZSgpXHJcblx0XHRcdH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19