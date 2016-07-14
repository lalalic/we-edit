"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = editable;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    _inherits(_class2, _Content);

    function _class2() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, _class2);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class2)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._id = uuid++, _this.state = { content: _react2.default.Children.toArray(_this.props.children) }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class2, [{
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

        var lastComposed = this.composed.splice(0);

        var clearAll = function clearAll(a) {
          if (_this2.children.length) {
            _this2.children.forEach(function (a) {
              return a._clearComposed4reCompose(true);
            });
            _this2.children.splice(0);
          }
          _this2.lastComposed = null;
        };
        if (fullclear) {
          clearAll();
        } else if (!this._isLastComposedFitIntoParent(lastComposed)) {
          clearAll();
        } else {
          this.lastComposed = lastComposed;
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
        //console.info(`shouldComponentUpdate on ${this.displayName}, with ${this.composed.length==0}`)
        if (this.composed.length == 0) {
          if (this.lastComposed) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBMEJ3Qjs7QUExQnhCOzs7Ozs7Ozs7Ozs7QUFHQSxJQUFJLE9BQUssQ0FBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QlcsU0FBUyxRQUFULENBQWtCLE9BQWxCLEVBQTBCO0FBQ3hDOzs7Ozs7Ozs7Ozs7Ozt1TUFDQyxNQUFJLGNBQ0osUUFBTSxFQUFDLFNBQVEsZ0JBQU0sUUFBTixDQUFlLE9BQWYsQ0FBdUIsTUFBSyxLQUFMLENBQVcsUUFBWCxDQUEvQjs7Ozs7d0NBRVU7QUFDaEIsZUFBTyxLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQW1CLE1BQW5CLENBRFM7Ozs7bUNBSUw7QUFDWCxlQUFPLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FESTs7OzsyQ0FJUTs7O2tDQUlIO0FBQ2IsYUFBSyxjQUFMLENBQW9CLElBQXBCO0FBRGE7Ozs7Ozs7Ozs7OztxQ0FXQyxTQUFRO0FBQ2hCLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUMsSUFBbkMsRUFEZ0I7Ozs7K0NBSUQsV0FBVTs7O0FBQ2xDLFlBQUksZUFBYSxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLENBQWIsQ0FEOEI7O0FBR2xDLFlBQUksV0FBUyxTQUFULFFBQVMsSUFBRztBQUNmLGNBQUcsT0FBSyxRQUFMLENBQWMsTUFBZCxFQUFxQjtBQUN2QixtQkFBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtxQkFBRyxFQUFFLHdCQUFGLENBQTJCLElBQTNCO2FBQUgsQ0FBdEIsQ0FEdUI7QUFFdkIsbUJBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFGdUI7V0FBeEI7QUFJQSxpQkFBSyxZQUFMLEdBQWtCLElBQWxCLENBTGU7U0FBSCxDQUhxQjtBQVVsQyxZQUFHLFNBQUgsRUFBYTtBQUNaLHFCQURZO1NBQWIsTUFFTSxJQUFHLENBQUMsS0FBSyw0QkFBTCxDQUFrQyxZQUFsQyxDQUFELEVBQWlEO0FBQ3pELHFCQUR5RDtTQUFwRCxNQUVBO0FBQ0wsZUFBSyxZQUFMLEdBQWtCLFlBQWxCLENBREs7U0FGQTs7Ozs7Ozs7O21EQVU0QixjQUFhO0FBQy9DLGVBQU8sS0FBUCxDQUQrQzs7Ozs7Ozs7NENBTXBCLFdBQVcsV0FBVyxhQUFZOztBQUVwRCxZQUFHLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBc0IsQ0FBdEIsRUFBd0I7QUFDbkMsY0FBRyxLQUFLLFlBQUwsRUFBa0I7QUFDcEIsaUJBQUssa0JBQUwsR0FEb0I7V0FBckIsTUFHQyxLQUFLLE9BQUwsR0FIRDtTQURRO0FBTUEsZUFBTyxJQUFQLENBUm9EOzs7OzZCQVd4RDs7OztJQXRFYyxRQUFyQixDQUR3QztDQUExQiIsImZpbGUiOiJlZGl0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG5cbnZhciB1dWlkPTBcbi8qKlxuICogIGl0J3MgYSB2ZXJ5IGNvbXBsaWNhdGVkIGpvYiwgc28gd2UgbmVlZCBhIHZlcnkgc2ltcGxlIGRlc2lnbiwgb25lIHNlbnRlbmNlIGRlc2NyaWJlZCBzb2x1dGlvbi4gb3B0aW9uczpcbiAqICAxLiByZW1vdmUgYWxsIGNvbXBvc2VkLCBhbmQgcmUtY29tcG9zZSBhbGxcbiAqICBcdC0gbmVlZCBmaW5kIGEgdGltZSB0byByZWNvbXBvc2VcbiAqICBcdC0gbG9naWMgaXMgbW9zdCBzaW1wbGVcbiAqICBcdC0gcGVyZm9ybWFuY2UgaXMgbW9zdCBiYWRcbiAqXG4gKiAgMi4gcmVtb3ZlIGFsbCBjb21wb3NlZCBmcm9tIHRoaXMgY29udGVudCwgYW5kIHJlLWNvbXBvc2UgcmVtb3ZhbHNcbiAqICBcdC0gTmVlZCBsb2NhdGUgY29tcG9zZWQgb2YgdGhpcyBjb250ZW50IGluIHBhZ2VcbiAqICBcdC0gTmVlZCBmaW5kIGEgdGltZSB0byByZWNvbXBvc2VcbiAqICBcdFx0PiBjb21wb25lbnREaWRVcGRhdGVcbiAqICBcdFx0XHQuIGFueSBzdGF0ZSB1cGRhdGUsXG4gKiAgXHRcdFx0LiBhbmQgY2FyZWZ1bGx5IHR1bmVkIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpXG4gKiAgXHQtIHBlcmZvcm1hbmNlIGlzIGJldHRlciB0aGFuICMxXG4gKlxuICogIDMuIHJlY29tcG9zZSB0aGlzIGNvbnRlbnQsIGFuZCBjaGVjayBpZiBuZXcgY29tcG9zZWQgZml0cyBsYXN0IGNvbXBvc2VkIHNwYWNlIChoaXQgcmF0aW8gaXMgbG93KVxuICogIFx0LSBZZXM6IGp1c3QgcmVwbGFjZVxuICogIFx0LSBObzogIzEsIG9yICMyXG4gKiAgXHQtIGFuZCB0aGVuIGxvb3Agd2l0aCBhbGwgZm9sbG93aW5nIGNvbnRlbnQgd2l0aCB0aGUgc2FtZSBsb2dpY1xuICpcbiAqICBcdDMuYTogcmVjb21wb3NlIHRoaXMgY29udGVudCBsaW5lIGJ5IGxpbmUgLi4uLCBtdWNoIGxvZ2ljcyBoZXJlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVkaXRhYmxlKENvbnRlbnQpe1xuXHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb250ZW50e1xuXHRcdF9pZD11dWlkKytcblx0XHRzdGF0ZT17Y29udGVudDpSZWFjdC5DaGlsZHJlbi50b0FycmF5KHRoaXMucHJvcHMuY2hpbGRyZW4pfVxuXHRcdFxuXHRcdGdldENvbnRlbnRDb3VudCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuc3RhdGUuY29udGVudC5sZW5ndGhcblx0XHR9XG5cdFx0XG5cdFx0Z2V0Q29udGVudCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuc3RhdGUuY29udGVudFxuXHRcdH1cblx0XHRcblx0XHRhcHBlbmRMYXN0Q29tcG9zZWQoKXtcblx0XHRcdFxuXHRcdH1cblxuICAgICAgICByZUNvbXBvc2UoKXtcbiAgICBcdFx0dGhpcy5fcmVDb21wb3NlRnJvbSh0aGlzKS8vIzIgc29sdXRpb25cbiAgICBcdH1cblxuICAgIFx0LyoqXG4gICAgXHQgKiAgaWYgd2l0aCBjb250ZW50XG4gICAgXHQgKiAgXHQ+IHNpbXBseSBhc2sgcGFyZW50IHRvIHJlY29tcG9zZVxuICAgIFx0ICogIGlmIHdpdGhvdXQgY29udGVudFxuICAgIFx0ICogIFx0PiBqdXN0IHJlbW92ZSBhbGwgYW5kIG9mZnNwcmluZyB0byBiZSByZWFkeSB0byByZS1jb21wb3NlXG4gICAgXHQgKiAgXHQ+IHNvbWV3aGVyZSBzb21ldGltZSBpdCB3aWxsIGJlIHRyaWdnZXJlZCB0byByZS1jb21wb3NlXG4gICAgXHQgKi9cbiAgICBcdF9yZUNvbXBvc2VGcm9tKGNvbnRlbnQpe1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5fcmVDb21wb3NlRnJvbSh0aGlzKVxuICAgIFx0fVxuXG5cdFx0X2NsZWFyQ29tcG9zZWQ0cmVDb21wb3NlKGZ1bGxjbGVhcil7XG5cdFx0XHRsZXQgbGFzdENvbXBvc2VkPXRoaXMuY29tcG9zZWQuc3BsaWNlKDApXG5cdFx0XHRcblx0XHRcdGxldCBjbGVhckFsbD1hPT57XG5cdFx0XHRcdGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+YS5fY2xlYXJDb21wb3NlZDRyZUNvbXBvc2UodHJ1ZSkpXG5cdFx0XHRcdFx0dGhpcy5jaGlsZHJlbi5zcGxpY2UoMClcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmxhc3RDb21wb3NlZD1udWxsXG5cdFx0XHR9XG5cdFx0XHRpZihmdWxsY2xlYXIpe1xuXHRcdFx0XHRjbGVhckFsbCgpXG5cdFx0XHR9ZWxzZSBpZighdGhpcy5faXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KGxhc3RDb21wb3NlZCkpe1xuXHRcdFx0XHRjbGVhckFsbCgpXG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdHRoaXMubGFzdENvbXBvc2VkPWxhc3RDb21wb3NlZFxuXHRcdFx0fVxuXHRcdH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogaXMgdGhlcmUgYSB3YXkgdG8ganVzdCBzaW1wbHkgcmUtdXNlIGxhc3QgY29tcG9zZWQ/XG4gICAgICAgICAqL1xuICAgICAgICBfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KGxhc3RDb21wb3NlZCl7XG5cdFx0XHRyZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogb25seSBubyBjb21wb3NlZCBzaG91bGQgYmUgcmUtY29tcG9zZVxuICAgICAgICAgKi9cbiAgICAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCl7XG4gICAgICAgICAgICAvL2NvbnNvbGUuaW5mbyhgc2hvdWxkQ29tcG9uZW50VXBkYXRlIG9uICR7dGhpcy5kaXNwbGF5TmFtZX0sIHdpdGggJHt0aGlzLmNvbXBvc2VkLmxlbmd0aD09MH1gKVxuICAgICAgICAgICAgaWYodGhpcy5jb21wb3NlZC5sZW5ndGg9PTApe1xuXHRcdFx0XHRpZih0aGlzLmxhc3RDb21wb3NlZCl7XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRMYXN0Q29tcG9zZWQoKVxuXHRcdFx0XHR9ZWxzZVxuXHRcdFx0XHRcdHRoaXMuY29tcG9zZSgpXG5cdFx0XHR9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cblx0XHRibHVyKCl7XG5cblx0XHR9XG4gICAgfVxufVxuIl19