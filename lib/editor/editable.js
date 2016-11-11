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
    }, {
      key: "blur",
      value: function blur() {}
    }]);
    return _class2;
  }(Content);
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOlsiZWRpdGFibGUiLCJ1dWlkIiwiQ29udGVudCIsIl9pZCIsInN0YXRlIiwiY29udGVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJlbXB0eUNvbnRlbnQiLCJDaGlsZHJlbiIsInRvQXJyYXkiLCJfcmVDb21wb3NlRnJvbSIsImNvbnRleHQiLCJwYXJlbnQiLCJmdWxsY2xlYXIiLCJsYXN0Q29tcG9zZWQiLCJjb21wdXRlZCIsImNvbXBvc2VkIiwic3BsaWNlIiwiY2xlYXJBbGwiLCJmb3JFYWNoIiwiYSIsIl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSIsIl9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQiLCJuZXh0UHJvcHMiLCJuZXh0U3RhdGUiLCJuZXh0Q29udGV4dCIsImFwcGVuZExhc3RDb21wb3NlZCIsImNvbXBvc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQTBCd0JBLFE7O0FBMUJ4Qjs7Ozs7O0FBR0EsSUFBSUMsT0FBSyxDQUFUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQmUsU0FBU0QsUUFBVCxDQUFrQkUsT0FBbEIsRUFBMEI7QUFDeEM7QUFBQTs7QUFBQTtBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQSxnTkFDQ0MsR0FERCxHQUNLRixNQURMLFFBRUNHLEtBRkQsR0FFTyxFQUFDQyxTQUFRLE1BQUtDLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkMsTUFBcEIsSUFBNEIsQ0FBNUIsR0FBZ0MsTUFBS0MsWUFBTCxFQUFoQyxHQUFzRCxnQkFBTUMsUUFBTixDQUFlQyxPQUFmLENBQXVCLE1BQUtMLEtBQUwsQ0FBV0MsUUFBbEMsQ0FBL0QsRUFGUDtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQ0FJZTtBQUNiLGVBQU8sRUFBUDtBQUNBO0FBTkY7QUFBQTtBQUFBLHdDQU9rQjtBQUNoQixlQUFPLEtBQUtILEtBQUwsQ0FBV0MsT0FBWCxDQUFtQkcsTUFBMUI7QUFDQTtBQVRGO0FBQUE7QUFBQSxtQ0FXYTtBQUNYLGVBQU8sS0FBS0osS0FBTCxDQUFXQyxPQUFsQjtBQUNBO0FBYkY7QUFBQTtBQUFBLDJDQWVxQixDQUVuQjtBQWpCRjtBQUFBO0FBQUEsa0NBbUJrQjtBQUNiLGFBQUtPLGNBQUwsQ0FBb0IsSUFBcEIsRUFEYSxDQUNZO0FBQ3pCOztBQUVEOzs7Ozs7OztBQXZCSjtBQUFBO0FBQUEscUNBOEJtQlAsT0E5Qm5CLEVBOEIyQjtBQUNoQixhQUFLUSxPQUFMLENBQWFDLE1BQWIsQ0FBb0JGLGNBQXBCLENBQW1DLElBQW5DO0FBQ047QUFoQ0w7QUFBQTtBQUFBLCtDQWtDMEJHLFNBbEMxQixFQWtDb0M7QUFBQTs7QUFDbEMsWUFBSUMsZUFBYSxLQUFLQyxRQUFMLENBQWNDLFFBQWQsQ0FBdUJDLE1BQXZCLENBQThCLENBQTlCLENBQWpCOztBQUVBLFlBQUlDLFdBQVMsU0FBVEEsUUFBUyxJQUFHO0FBQ2YsY0FBRyxPQUFLSCxRQUFMLENBQWNWLFFBQWQsQ0FBdUJDLE1BQTFCLEVBQWlDO0FBQ2hDLG1CQUFLUyxRQUFMLENBQWNWLFFBQWQsQ0FBdUJjLE9BQXZCLENBQStCO0FBQUEscUJBQUdDLEVBQUVDLHdCQUFGLENBQTJCLElBQTNCLENBQUg7QUFBQSxhQUEvQjtBQUNBLG1CQUFLTixRQUFMLENBQWNWLFFBQWQsQ0FBdUJZLE1BQXZCLENBQThCLENBQTlCO0FBQ0E7QUFDRCxpQkFBS0YsUUFBTCxDQUFjRCxZQUFkLEdBQTJCLElBQTNCO0FBQ0EsU0FORDtBQU9BLFlBQUdELFNBQUgsRUFBYTtBQUNaSztBQUNBLFNBRkQsTUFFTSxJQUFHLENBQUMsS0FBS0ksNEJBQUwsQ0FBa0NSLFlBQWxDLENBQUosRUFBb0Q7QUFDekRJO0FBQ0EsU0FGSyxNQUVBO0FBQ0wsZUFBS0gsUUFBTCxDQUFjRCxZQUFkLEdBQTJCQSxZQUEzQjtBQUNBO0FBQ0Q7O0FBRUs7Ozs7QUFyRFA7QUFBQTtBQUFBLG1EQXdEb0NBLFlBeERwQyxFQXdEaUQ7QUFDL0MsZUFBTyxLQUFQO0FBQ007QUFDRDs7OztBQTNEUDtBQUFBO0FBQUEsNENBOEQ2QlMsU0E5RDdCLEVBOER3Q0MsU0E5RHhDLEVBOERtREMsV0E5RG5ELEVBOEQrRDtBQUNwRDtBQUNBLFlBQUcsS0FBS1YsUUFBTCxDQUFjQyxRQUFkLENBQXVCVixNQUF2QixJQUErQixDQUFsQyxFQUFvQztBQUM1QyxjQUFHLEtBQUtTLFFBQUwsQ0FBY0QsWUFBakIsRUFBOEI7QUFDN0IsaUJBQUtZLGtCQUFMO0FBQ0EsV0FGRCxNQUdDLEtBQUtDLE9BQUw7QUFDRDtBQUNRLGVBQU8sSUFBUDtBQUNIO0FBdkVSO0FBQUE7QUFBQSw2QkF5RU8sQ0FFTDtBQTNFRjtBQUFBO0FBQUEsSUFBcUIzQixPQUFyQjtBQTZFQSIsImZpbGUiOiJlZGl0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5cclxuXHJcbnZhciB1dWlkPTBcclxuLyoqXHJcbiAqICBpdCdzIGEgdmVyeSBjb21wbGljYXRlZCBqb2IsIHNvIHdlIG5lZWQgYSB2ZXJ5IHNpbXBsZSBkZXNpZ24sIG9uZSBzZW50ZW5jZSBkZXNjcmliZWQgc29sdXRpb24uIG9wdGlvbnM6XHJcbiAqICAxLiByZW1vdmUgYWxsIGNvbXBvc2VkLCBhbmQgcmUtY29tcG9zZSBhbGxcclxuICogIFx0LSBuZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxyXG4gKiAgXHQtIGxvZ2ljIGlzIG1vc3Qgc2ltcGxlXHJcbiAqICBcdC0gcGVyZm9ybWFuY2UgaXMgbW9zdCBiYWRcclxuICpcclxuICogIDIuIHJlbW92ZSBhbGwgY29tcG9zZWQgZnJvbSB0aGlzIGNvbnRlbnQsIGFuZCByZS1jb21wb3NlIHJlbW92YWxzXHJcbiAqICBcdC0gTmVlZCBsb2NhdGUgY29tcG9zZWQgb2YgdGhpcyBjb250ZW50IGluIHBhZ2VcclxuICogIFx0LSBOZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxyXG4gKiAgXHRcdD4gY29tcG9uZW50RGlkVXBkYXRlXHJcbiAqICBcdFx0XHQuIGFueSBzdGF0ZSB1cGRhdGUsXHJcbiAqICBcdFx0XHQuIGFuZCBjYXJlZnVsbHkgdHVuZWQgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dClcclxuICogIFx0LSBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiAjMVxyXG4gKlxyXG4gKiAgMy4gcmVjb21wb3NlIHRoaXMgY29udGVudCwgYW5kIGNoZWNrIGlmIG5ldyBjb21wb3NlZCBmaXRzIGxhc3QgY29tcG9zZWQgc3BhY2UgKGhpdCByYXRpbyBpcyBsb3cpXHJcbiAqICBcdC0gWWVzOiBqdXN0IHJlcGxhY2VcclxuICogIFx0LSBObzogIzEsIG9yICMyXHJcbiAqICBcdC0gYW5kIHRoZW4gbG9vcCB3aXRoIGFsbCBmb2xsb3dpbmcgY29udGVudCB3aXRoIHRoZSBzYW1lIGxvZ2ljXHJcbiAqXHJcbiAqICBcdDMuYTogcmVjb21wb3NlIHRoaXMgY29udGVudCBsaW5lIGJ5IGxpbmUgLi4uLCBtdWNoIGxvZ2ljcyBoZXJlXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlZGl0YWJsZShDb250ZW50KXtcclxuXHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb250ZW50e1xyXG5cdFx0X2lkPXV1aWQrK1xyXG5cdFx0c3RhdGU9e2NvbnRlbnQ6dGhpcy5wcm9wcy5jaGlsZHJlbi5sZW5ndGg9PTAgPyB0aGlzLmVtcHR5Q29udGVudCgpIDogUmVhY3QuQ2hpbGRyZW4udG9BcnJheSh0aGlzLnByb3BzLmNoaWxkcmVuKX1cclxuXHJcblx0XHRlbXB0eUNvbnRlbnQoKXtcclxuXHRcdFx0cmV0dXJuIFtdXHJcblx0XHR9XHJcblx0XHRnZXRDb250ZW50Q291bnQoKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuc3RhdGUuY29udGVudC5sZW5ndGhcclxuXHRcdH1cclxuXHJcblx0XHRnZXRDb250ZW50KCl7XHJcblx0XHRcdHJldHVybiB0aGlzLnN0YXRlLmNvbnRlbnRcclxuXHRcdH1cclxuXHJcblx0XHRhcHBlbmRMYXN0Q29tcG9zZWQoKXtcclxuXHJcblx0XHR9XHJcblxyXG4gICAgICAgIHJlQ29tcG9zZSgpe1xyXG4gICAgXHRcdHRoaXMuX3JlQ29tcG9zZUZyb20odGhpcykvLyMyIHNvbHV0aW9uXHJcbiAgICBcdH1cclxuXHJcbiAgICBcdC8qKlxyXG4gICAgXHQgKiAgaWYgd2l0aCBjb250ZW50XHJcbiAgICBcdCAqICBcdD4gc2ltcGx5IGFzayBwYXJlbnQgdG8gcmVjb21wb3NlXHJcbiAgICBcdCAqICBpZiB3aXRob3V0IGNvbnRlbnRcclxuICAgIFx0ICogIFx0PiBqdXN0IHJlbW92ZSBhbGwgYW5kIG9mZnNwcmluZyB0byBiZSByZWFkeSB0byByZS1jb21wb3NlXHJcbiAgICBcdCAqICBcdD4gc29tZXdoZXJlIHNvbWV0aW1lIGl0IHdpbGwgYmUgdHJpZ2dlcmVkIHRvIHJlLWNvbXBvc2VcclxuICAgIFx0ICovXHJcbiAgICBcdF9yZUNvbXBvc2VGcm9tKGNvbnRlbnQpe1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50Ll9yZUNvbXBvc2VGcm9tKHRoaXMpXHJcbiAgICBcdH1cclxuXHJcblx0XHRfY2xlYXJDb21wb3NlZDRyZUNvbXBvc2UoZnVsbGNsZWFyKXtcclxuXHRcdFx0bGV0IGxhc3RDb21wb3NlZD10aGlzLmNvbXB1dGVkLmNvbXBvc2VkLnNwbGljZSgwKVxyXG5cclxuXHRcdFx0bGV0IGNsZWFyQWxsPWE9PntcclxuXHRcdFx0XHRpZih0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmxlbmd0aCl7XHJcblx0XHRcdFx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLmZvckVhY2goYT0+YS5fY2xlYXJDb21wb3NlZDRyZUNvbXBvc2UodHJ1ZSkpXHJcblx0XHRcdFx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnNwbGljZSgwKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLmNvbXB1dGVkLmxhc3RDb21wb3NlZD1udWxsXHJcblx0XHRcdH1cclxuXHRcdFx0aWYoZnVsbGNsZWFyKXtcclxuXHRcdFx0XHRjbGVhckFsbCgpXHJcblx0XHRcdH1lbHNlIGlmKCF0aGlzLl9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQobGFzdENvbXBvc2VkKSl7XHJcblx0XHRcdFx0Y2xlYXJBbGwoKVxyXG5cdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWQ9bGFzdENvbXBvc2VkXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogaXMgdGhlcmUgYSB3YXkgdG8ganVzdCBzaW1wbHkgcmUtdXNlIGxhc3QgY29tcG9zZWQ/XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgX2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudChsYXN0Q29tcG9zZWQpe1xyXG5cdFx0XHRyZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogb25seSBubyBjb21wb3NlZCBzaG91bGQgYmUgcmUtY29tcG9zZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpe1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUuaW5mbyhgc2hvdWxkQ29tcG9uZW50VXBkYXRlIG9uICR7dGhpcy5kaXNwbGF5TmFtZX0sIHdpdGggJHt0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MH1gKVxyXG4gICAgICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MCl7XHJcblx0XHRcdFx0aWYodGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWQpe1xyXG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRMYXN0Q29tcG9zZWQoKVxyXG5cdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHR0aGlzLmNvbXBvc2UoKVxyXG5cdFx0XHR9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG5cclxuXHRcdGJsdXIoKXtcclxuXHJcblx0XHR9XHJcbiAgICB9XHJcbn1cclxuIl19