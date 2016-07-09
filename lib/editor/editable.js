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
      key: "blur",
      value: function blur() {}
    }]);

    return _class2;
  }(Content);
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBdUJ3Qjs7Ozs7Ozs7QUF2QnhCLElBQUksT0FBSyxDQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCVyxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMEI7QUFDeEM7Ozs7Ozs7Ozs7Ozs7O3VNQUVDLE1BQUk7Ozs7O2tDQUVhO0FBQ2IsYUFBSyxjQUFMLENBQW9CLElBQXBCO0FBRGE7Ozs7Ozs7Ozs7OztxQ0FXQyxTQUFRO0FBQ2hCLGFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUMsSUFBbkMsRUFEZ0I7Ozs7aURBSUE7QUFDekIsWUFBSSxlQUFhLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsQ0FBYixDQURxQjtBQUV6QixZQUFHLENBQUMsS0FBSyw0QkFBTCxDQUFrQyxZQUFsQyxDQUFELEVBQWlEO0FBQ25ELGNBQUcsS0FBSyxRQUFMLENBQWMsTUFBZCxFQUFxQjtBQUN2QixpQkFBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjtxQkFBRyxFQUFFLHdCQUFGO2FBQUgsQ0FBdEIsQ0FEdUI7QUFFdkIsaUJBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFGdUI7V0FBeEI7U0FERDs7Ozs7Ozs7O21EQVdrQyxjQUFhO0FBQy9DLGVBQU8sS0FBUCxDQUQrQzs7Ozs7Ozs7NENBTXBCLFdBQVcsV0FBVyxhQUFZO0FBQ3BELGdCQUFRLElBQVIsK0JBQXlDLEtBQUssV0FBTCxnQkFBMEIsS0FBSyxRQUFMLENBQWMsTUFBZCxJQUFzQixDQUF0QixDQUFuRSxFQURvRDtBQUVwRCxZQUFHLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBc0IsQ0FBdEIsRUFDQyxLQUFLLE9BQUwsR0FESjtBQUVBLGVBQU8sSUFBUCxDQUpvRDs7Ozs2QkFPeEQ7Ozs7SUE3Q2MsUUFBckIsQ0FEd0M7Q0FBMUIiLCJmaWxlIjoiZWRpdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXVpZD0wXG4vKipcbiAqICBpdCdzIGEgdmVyeSBjb21wbGljYXRlZCBqb2IsIHNvIHdlIG5lZWQgYSB2ZXJ5IHNpbXBsZSBkZXNpZ24sIG9uZSBzZW50ZW5jZSBkZXNjcmliZWQgc29sdXRpb24uIG9wdGlvbnM6XG4gKiAgMS4gcmVtb3ZlIGFsbCBjb21wb3NlZCwgYW5kIHJlLWNvbXBvc2UgYWxsXG4gKiAgXHQtIG5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXG4gKiAgXHQtIGxvZ2ljIGlzIG1vc3Qgc2ltcGxlXG4gKiAgXHQtIHBlcmZvcm1hbmNlIGlzIG1vc3QgYmFkXG4gKlxuICogIDIuIHJlbW92ZSBhbGwgY29tcG9zZWQgZnJvbSB0aGlzIGNvbnRlbnQsIGFuZCByZS1jb21wb3NlIHJlbW92YWxzXG4gKiAgXHQtIE5lZWQgbG9jYXRlIGNvbXBvc2VkIG9mIHRoaXMgY29udGVudCBpbiBwYWdlXG4gKiAgXHQtIE5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXG4gKiAgXHRcdD4gY29tcG9uZW50RGlkVXBkYXRlXG4gKiAgXHRcdFx0LiBhbnkgc3RhdGUgdXBkYXRlLFxuICogIFx0XHRcdC4gYW5kIGNhcmVmdWxseSB0dW5lZCBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KVxuICogIFx0LSBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiAjMVxuICpcbiAqICAzLiByZWNvbXBvc2UgdGhpcyBjb250ZW50LCBhbmQgY2hlY2sgaWYgbmV3IGNvbXBvc2VkIGZpdHMgbGFzdCBjb21wb3NlZCBzcGFjZSAoaGl0IHJhdGlvIGlzIGxvdylcbiAqICBcdC0gWWVzOiBqdXN0IHJlcGxhY2VcbiAqICBcdC0gTm86ICMxLCBvciAjMlxuICogIFx0LSBhbmQgdGhlbiBsb29wIHdpdGggYWxsIGZvbGxvd2luZyBjb250ZW50IHdpdGggdGhlIHNhbWUgbG9naWNcbiAqXG4gKiAgXHQzLmE6IHJlY29tcG9zZSB0aGlzIGNvbnRlbnQgbGluZSBieSBsaW5lIC4uLiwgbXVjaCBsb2dpY3MgaGVyZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlZGl0YWJsZShDb250ZW50KXtcblx0cmV0dXJuIGNsYXNzIGV4dGVuZHMgQ29udGVudHtcblxuXHRcdF9pZD11dWlkKytcblxuICAgICAgICByZUNvbXBvc2UoKXtcbiAgICBcdFx0dGhpcy5fcmVDb21wb3NlRnJvbSh0aGlzKS8vIzIgc29sdXRpb25cbiAgICBcdH1cblxuICAgIFx0LyoqXG4gICAgXHQgKiAgaWYgd2l0aCBjb250ZW50XG4gICAgXHQgKiAgXHQ+IHNpbXBseSBhc2sgcGFyZW50IHRvIHJlY29tcG9zZVxuICAgIFx0ICogIGlmIHdpdGhvdXQgY29udGVudFxuICAgIFx0ICogIFx0PiBqdXN0IHJlbW92ZSBhbGwgYW5kIG9mZnNwcmluZyB0byBiZSByZWFkeSB0byByZS1jb21wb3NlXG4gICAgXHQgKiAgXHQ+IHNvbWV3aGVyZSBzb21ldGltZSBpdCB3aWxsIGJlIHRyaWdnZXJlZCB0byByZS1jb21wb3NlXG4gICAgXHQgKi9cbiAgICBcdF9yZUNvbXBvc2VGcm9tKGNvbnRlbnQpe1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBhcmVudC5fcmVDb21wb3NlRnJvbSh0aGlzKVxuICAgIFx0fVxuXG5cdFx0X2NsZWFyQ29tcG9zZWQ0cmVDb21wb3NlKCl7XG5cdFx0XHRsZXQgbGFzdENvbXBvc2VkPXRoaXMuY29tcG9zZWQuc3BsaWNlKDApXG5cdFx0XHRpZighdGhpcy5faXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KGxhc3RDb21wb3NlZCkpe1xuXHRcdFx0XHRpZih0aGlzLmNoaWxkcmVuLmxlbmd0aCl7XG5cdFx0XHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PmEuX2NsZWFyQ29tcG9zZWQ0cmVDb21wb3NlKCkpXG5cdFx0XHRcdFx0dGhpcy5jaGlsZHJlbi5zcGxpY2UoMClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogaXMgdGhlcmUgYSB3YXkgdG8ganVzdCBzaW1wbHkgcmUtdXNlIGxhc3QgY29tcG9zZWQ/XG4gICAgICAgICAqL1xuICAgICAgICBfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KGxhc3RDb21wb3NlZCl7XG5cdFx0XHRyZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogb25seSBubyBjb21wb3NlZCBzaG91bGQgYmUgcmUtY29tcG9zZVxuICAgICAgICAgKi9cbiAgICAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCl7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oYHNob3VsZENvbXBvbmVudFVwZGF0ZSBvbiAke3RoaXMuZGlzcGxheU5hbWV9LCB3aXRoICR7dGhpcy5jb21wb3NlZC5sZW5ndGg9PTB9YClcbiAgICAgICAgICAgIGlmKHRoaXMuY29tcG9zZWQubGVuZ3RoPT0wKVxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9zZSgpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cblx0XHRibHVyKCl7XG5cblx0XHR9XG4gICAgfVxufVxuIl19