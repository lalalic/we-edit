"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = editable;

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

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class2)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._id = uuid++, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class2, [{
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
        console.info("shouldComponentUpdate on " + this.displayName + ", with " + (this.composed.length == 0));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBdUJ3Qjs7Ozs7Ozs7QUF2QnhCLElBQUksT0FBSyxDQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCVyxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMEI7QUFDeEM7Ozs7Ozs7Ozs7Ozs7O3VNQUVDLE1BQUk7Ozs7OzJDQUVnQjs7O2tDQUlIO0FBQ2IsYUFBSyxjQUFMLENBQW9CLElBQXBCO0FBRGE7Ozs7Ozs7Ozs7OztxQ0FXQyxTQUFRO0FBQ2hCLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUMsSUFBbkMsRUFEZ0I7Ozs7K0NBSUQsV0FBVTs7O0FBQ2xDLFlBQUksZUFBYSxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLENBQWIsQ0FEOEI7O0FBR2xDLFlBQUksV0FBUyxTQUFULFFBQVMsSUFBRztBQUNmLGNBQUcsT0FBSyxRQUFMLENBQWMsTUFBZCxFQUFxQjtBQUN2QixtQkFBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtxQkFBRyxFQUFFLHdCQUFGLENBQTJCLElBQTNCO2FBQUgsQ0FBdEIsQ0FEdUI7QUFFdkIsbUJBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFGdUI7V0FBeEI7QUFJQSxpQkFBSyxZQUFMLEdBQWtCLElBQWxCLENBTGU7U0FBSCxDQUhxQjtBQVVsQyxZQUFHLFNBQUgsRUFBYTtBQUNaLHFCQURZO1NBQWIsTUFFTSxJQUFHLENBQUMsS0FBSyw0QkFBTCxDQUFrQyxZQUFsQyxDQUFELEVBQWlEO0FBQ3pELHFCQUR5RDtTQUFwRCxNQUVBO0FBQ0wsZUFBSyxZQUFMLEdBQWtCLFlBQWxCLENBREs7U0FGQTs7Ozs7Ozs7O21EQVU0QixjQUFhO0FBQy9DLGVBQU8sS0FBUCxDQUQrQzs7Ozs7Ozs7NENBTXBCLFdBQVcsV0FBVyxhQUFZO0FBQ3BELGdCQUFRLElBQVIsK0JBQXlDLEtBQUssV0FBTCxnQkFBMEIsS0FBSyxRQUFMLENBQWMsTUFBZCxJQUFzQixDQUF0QixDQUFuRSxFQURvRDtBQUVwRCxZQUFHLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBc0IsQ0FBdEIsRUFBd0I7QUFDbkMsY0FBRyxLQUFLLFlBQUwsRUFBa0I7QUFDcEIsaUJBQUssa0JBQUwsR0FEb0I7V0FBckIsTUFHQyxLQUFLLE9BQUwsR0FIRDtTQURRO0FBTUEsZUFBTyxJQUFQLENBUm9EOzs7OzZCQVd4RDs7OztJQTlEYyxRQUFyQixDQUR3QztDQUExQiIsImZpbGUiOiJlZGl0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1dWlkPTBcbi8qKlxuICogIGl0J3MgYSB2ZXJ5IGNvbXBsaWNhdGVkIGpvYiwgc28gd2UgbmVlZCBhIHZlcnkgc2ltcGxlIGRlc2lnbiwgb25lIHNlbnRlbmNlIGRlc2NyaWJlZCBzb2x1dGlvbi4gb3B0aW9uczpcbiAqICAxLiByZW1vdmUgYWxsIGNvbXBvc2VkLCBhbmQgcmUtY29tcG9zZSBhbGxcbiAqICBcdC0gbmVlZCBmaW5kIGEgdGltZSB0byByZWNvbXBvc2VcbiAqICBcdC0gbG9naWMgaXMgbW9zdCBzaW1wbGVcbiAqICBcdC0gcGVyZm9ybWFuY2UgaXMgbW9zdCBiYWRcbiAqXG4gKiAgMi4gcmVtb3ZlIGFsbCBjb21wb3NlZCBmcm9tIHRoaXMgY29udGVudCwgYW5kIHJlLWNvbXBvc2UgcmVtb3ZhbHNcbiAqICBcdC0gTmVlZCBsb2NhdGUgY29tcG9zZWQgb2YgdGhpcyBjb250ZW50IGluIHBhZ2VcbiAqICBcdC0gTmVlZCBmaW5kIGEgdGltZSB0byByZWNvbXBvc2VcbiAqICBcdFx0PiBjb21wb25lbnREaWRVcGRhdGVcbiAqICBcdFx0XHQuIGFueSBzdGF0ZSB1cGRhdGUsXG4gKiAgXHRcdFx0LiBhbmQgY2FyZWZ1bGx5IHR1bmVkIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpXG4gKiAgXHQtIHBlcmZvcm1hbmNlIGlzIGJldHRlciB0aGFuICMxXG4gKlxuICogIDMuIHJlY29tcG9zZSB0aGlzIGNvbnRlbnQsIGFuZCBjaGVjayBpZiBuZXcgY29tcG9zZWQgZml0cyBsYXN0IGNvbXBvc2VkIHNwYWNlIChoaXQgcmF0aW8gaXMgbG93KVxuICogIFx0LSBZZXM6IGp1c3QgcmVwbGFjZVxuICogIFx0LSBObzogIzEsIG9yICMyXG4gKiAgXHQtIGFuZCB0aGVuIGxvb3Agd2l0aCBhbGwgZm9sbG93aW5nIGNvbnRlbnQgd2l0aCB0aGUgc2FtZSBsb2dpY1xuICpcbiAqICBcdDMuYTogcmVjb21wb3NlIHRoaXMgY29udGVudCBsaW5lIGJ5IGxpbmUgLi4uLCBtdWNoIGxvZ2ljcyBoZXJlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVkaXRhYmxlKENvbnRlbnQpe1xuXHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb250ZW50e1xuXG5cdFx0X2lkPXV1aWQrK1xuXHRcdFxuXHRcdGFwcGVuZExhc3RDb21wb3NlZCgpe1xuXHRcdFx0XG5cdFx0fVxuXG4gICAgICAgIHJlQ29tcG9zZSgpe1xuICAgIFx0XHR0aGlzLl9yZUNvbXBvc2VGcm9tKHRoaXMpLy8jMiBzb2x1dGlvblxuICAgIFx0fVxuXG4gICAgXHQvKipcbiAgICBcdCAqICBpZiB3aXRoIGNvbnRlbnRcbiAgICBcdCAqICBcdD4gc2ltcGx5IGFzayBwYXJlbnQgdG8gcmVjb21wb3NlXG4gICAgXHQgKiAgaWYgd2l0aG91dCBjb250ZW50XG4gICAgXHQgKiAgXHQ+IGp1c3QgcmVtb3ZlIGFsbCBhbmQgb2Zmc3ByaW5nIHRvIGJlIHJlYWR5IHRvIHJlLWNvbXBvc2VcbiAgICBcdCAqICBcdD4gc29tZXdoZXJlIHNvbWV0aW1lIGl0IHdpbGwgYmUgdHJpZ2dlcmVkIHRvIHJlLWNvbXBvc2VcbiAgICBcdCAqL1xuICAgIFx0X3JlQ29tcG9zZUZyb20oY29udGVudCl7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50Ll9yZUNvbXBvc2VGcm9tKHRoaXMpXG4gICAgXHR9XG5cblx0XHRfY2xlYXJDb21wb3NlZDRyZUNvbXBvc2UoZnVsbGNsZWFyKXtcblx0XHRcdGxldCBsYXN0Q29tcG9zZWQ9dGhpcy5jb21wb3NlZC5zcGxpY2UoMClcblx0XHRcdFxuXHRcdFx0bGV0IGNsZWFyQWxsPWE9Pntcblx0XHRcdFx0aWYodGhpcy5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaChhPT5hLl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSh0cnVlKSlcblx0XHRcdFx0XHR0aGlzLmNoaWxkcmVuLnNwbGljZSgwKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMubGFzdENvbXBvc2VkPW51bGxcblx0XHRcdH1cblx0XHRcdGlmKGZ1bGxjbGVhcil7XG5cdFx0XHRcdGNsZWFyQWxsKClcblx0XHRcdH1lbHNlIGlmKCF0aGlzLl9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQobGFzdENvbXBvc2VkKSl7XG5cdFx0XHRcdGNsZWFyQWxsKClcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0dGhpcy5sYXN0Q29tcG9zZWQ9bGFzdENvbXBvc2VkXG5cdFx0XHR9XG5cdFx0fVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpcyB0aGVyZSBhIHdheSB0byBqdXN0IHNpbXBseSByZS11c2UgbGFzdCBjb21wb3NlZD9cbiAgICAgICAgICovXG4gICAgICAgIF9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQobGFzdENvbXBvc2VkKXtcblx0XHRcdHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvbmx5IG5vIGNvbXBvc2VkIHNob3VsZCBiZSByZS1jb21wb3NlXG4gICAgICAgICAqL1xuICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgc2hvdWxkQ29tcG9uZW50VXBkYXRlIG9uICR7dGhpcy5kaXNwbGF5TmFtZX0sIHdpdGggJHt0aGlzLmNvbXBvc2VkLmxlbmd0aD09MH1gKVxuICAgICAgICAgICAgaWYodGhpcy5jb21wb3NlZC5sZW5ndGg9PTApe1xuXHRcdFx0XHRpZih0aGlzLmxhc3RDb21wb3NlZCl7XG5cdFx0XHRcdFx0dGhpcy5hcHBlbmRMYXN0Q29tcG9zZWQoKVxuXHRcdFx0XHR9ZWxzZVxuXHRcdFx0XHRcdHRoaXMuY29tcG9zZSgpXG5cdFx0XHR9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cblx0XHRibHVyKCl7XG5cblx0XHR9XG4gICAgfVxufVxuIl19