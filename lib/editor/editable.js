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
      value: function _clearComposed4reCompose() {
        var lastComposed = this.composed.splice(0);
        if (!this._isLastComposedFitIntoParent(lastComposed)) {
          if (this.children.length) {
            this.children.forEach(function (a) {
              return a._clearComposed4reCompose();
            });
            this.children.splice(0);
          }
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
        if (this.composed.length == 0) this.compose();
        return true;
      }
    }, {
      key: "focus",
      value: function focus() {}
    }, {
      key: "blur",
      value: function blur() {}
    }]);

    return _class2;
  }(Content);
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBdUJ3Qjs7Ozs7Ozs7QUF2QnhCLElBQUksT0FBSyxDQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCVyxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMEI7QUFDeEM7Ozs7Ozs7Ozs7Ozs7O3VNQUVDLE1BQUk7Ozs7O2tDQUVhO0FBQ2IsYUFBSyxjQUFMLENBQW9CLElBQXBCO0FBRGE7Ozs7Ozs7Ozs7OztxQ0FXQyxTQUFRO0FBQ2hCLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUMsSUFBbkMsRUFEZ0I7Ozs7aURBSUE7QUFDekIsWUFBSSxlQUFhLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsQ0FBYixDQURxQjtBQUV6QixZQUFHLENBQUMsS0FBSyw0QkFBTCxDQUFrQyxZQUFsQyxDQUFELEVBQWlEO0FBQ25ELGNBQUcsS0FBSyxRQUFMLENBQWMsTUFBZCxFQUFxQjtBQUN2QixpQkFBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtxQkFBRyxFQUFFLHdCQUFGO2FBQUgsQ0FBdEIsQ0FEdUI7QUFFdkIsaUJBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFGdUI7V0FBeEI7U0FERDs7Ozs7Ozs7O21EQVdrQyxjQUFhO0FBQ3RDLGVBQU8sS0FBUCxDQURzQzs7Ozs7Ozs7NENBTXBCLFdBQVcsV0FBVyxhQUFZO0FBQ3BELGdCQUFRLElBQVIsK0JBQXlDLEtBQUssV0FBTCxnQkFBMEIsS0FBSyxRQUFMLENBQWMsTUFBZCxJQUFzQixDQUF0QixDQUFuRSxFQURvRDtBQUVwRCxZQUFHLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBc0IsQ0FBdEIsRUFDQyxLQUFLLE9BQUwsR0FESjtBQUVBLGVBQU8sSUFBUCxDQUpvRDs7Ozs4QkFPdkQ7Ozs2QkFJRDs7OztJQWpEYyxRQUFyQixDQUR3QztDQUExQiIsImZpbGUiOiJlZGl0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1dWlkPTBcbi8qKlxuICogIGl0J3MgYSB2ZXJ5IGNvbXBsaWNhdGVkIGpvYiwgc28gd2UgbmVlZCBhIHZlcnkgc2ltcGxlIGRlc2lnbiwgb25lIHNlbnRlbmNlIGRlc2NyaWJlZCBzb2x1dGlvbi4gb3B0aW9uczpcbiAqICAxLiByZW1vdmUgYWxsIGNvbXBvc2VkLCBhbmQgcmUtY29tcG9zZSBhbGxcbiAqICBcdC0gbmVlZCBmaW5kIGEgdGltZSB0byByZWNvbXBvc2VcbiAqICBcdC0gbG9naWMgaXMgbW9zdCBzaW1wbGVcbiAqICBcdC0gcGVyZm9ybWFuY2UgaXMgbW9zdCBiYWRcbiAqXG4gKiAgMi4gcmVtb3ZlIGFsbCBjb21wb3NlZCBmcm9tIHRoaXMgY29udGVudCwgYW5kIHJlLWNvbXBvc2UgcmVtb3ZhbHNcbiAqICBcdC0gTmVlZCBsb2NhdGUgY29tcG9zZWQgb2YgdGhpcyBjb250ZW50IGluIHBhZ2VcbiAqICBcdC0gTmVlZCBmaW5kIGEgdGltZSB0byByZWNvbXBvc2VcbiAqICBcdFx0PiBjb21wb25lbnREaWRVcGRhdGVcbiAqICBcdFx0XHQuIGFueSBzdGF0ZSB1cGRhdGUsXG4gKiAgXHRcdFx0LiBhbmQgY2FyZWZ1bGx5IHR1bmVkIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpXG4gKiAgXHQtIHBlcmZvcm1hbmNlIGlzIGJldHRlciB0aGFuICMxXG4gKlxuICogIDMuIHJlY29tcG9zZSB0aGlzIGNvbnRlbnQsIGFuZCBjaGVjayBpZiBuZXcgY29tcG9zZWQgZml0cyBsYXN0IGNvbXBvc2VkIHNwYWNlIChoaXQgcmF0aW8gaXMgbG93KVxuICogIFx0LSBZZXM6IGp1c3QgcmVwbGFjZVxuICogIFx0LSBObzogIzEsIG9yICMyXG4gKiAgXHQtIGFuZCB0aGVuIGxvb3Agd2l0aCBhbGwgZm9sbG93aW5nIGNvbnRlbnQgd2l0aCB0aGUgc2FtZSBsb2dpY1xuICpcbiAqICBcdDMuYTogcmVjb21wb3NlIHRoaXMgY29udGVudCBsaW5lIGJ5IGxpbmUgLi4uLCBtdWNoIGxvZ2ljcyBoZXJlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVkaXRhYmxlKENvbnRlbnQpe1xuXHRyZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb250ZW50e1xuXHRcdFxuXHRcdF9pZD11dWlkKytcblxuICAgICAgICByZUNvbXBvc2UoKXtcbiAgICBcdFx0dGhpcy5fcmVDb21wb3NlRnJvbSh0aGlzKS8vIzIgc29sdXRpb25cbiAgICBcdH1cblxuICAgIFx0LyoqXG4gICAgXHQgKiAgaWYgd2l0aCBjb250ZW50XG4gICAgXHQgKiAgXHQ+IHNpbXBseSBhc2sgcGFyZW50IHRvIHJlY29tcG9zZVxuICAgIFx0ICogIGlmIHdpdGhvdXQgY29udGVudFxuICAgIFx0ICogIFx0PiBqdXN0IHJlbW92ZSBhbGwgYW5kIG9mZnNwcmluZyB0byBiZSByZWFkeSB0byByZS1jb21wb3NlXG4gICAgXHQgKiAgXHQ+IHNvbWV3aGVyZSBzb21ldGltZSBpdCB3aWxsIGJlIHRyaWdnZXJlZCB0byByZS1jb21wb3NlXG4gICAgXHQgKi9cbiAgICBcdF9yZUNvbXBvc2VGcm9tKGNvbnRlbnQpe1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5fcmVDb21wb3NlRnJvbSh0aGlzKVxuICAgIFx0fVxuXHRcdFxuXHRcdF9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSgpe1xuXHRcdFx0bGV0IGxhc3RDb21wb3NlZD10aGlzLmNvbXBvc2VkLnNwbGljZSgwKVxuXHRcdFx0aWYoIXRoaXMuX2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudChsYXN0Q29tcG9zZWQpKXtcblx0XHRcdFx0aWYodGhpcy5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaChhPT5hLl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSgpKVxuXHRcdFx0XHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKDApXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGlzIHRoZXJlIGEgd2F5IHRvIGp1c3Qgc2ltcGx5IHJlLXVzZSBsYXN0IGNvbXBvc2VkP1xuICAgICAgICAgKi9cbiAgICAgICAgX2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudChsYXN0Q29tcG9zZWQpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG9ubHkgbm8gY29tcG9zZWQgc2hvdWxkIGJlIHJlLWNvbXBvc2VcbiAgICAgICAgICovXG4gICAgICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpe1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKGBzaG91bGRDb21wb25lbnRVcGRhdGUgb24gJHt0aGlzLmRpc3BsYXlOYW1lfSwgd2l0aCAke3RoaXMuY29tcG9zZWQubGVuZ3RoPT0wfWApXG4gICAgICAgICAgICBpZih0aGlzLmNvbXBvc2VkLmxlbmd0aD09MClcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuXHRcdFxuXHRcdGZvY3VzKCl7XG5cdFx0XHRcblx0XHR9XG5cdFx0XG5cdFx0Ymx1cigpe1xuXHRcdFx0XG5cdFx0fVxuICAgIH1cbn1cbiJdfQ==