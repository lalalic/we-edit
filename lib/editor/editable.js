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
        console.info("remove all from " + this.displayName + " " + (content ? "" : "not") + " including child, and parent");
        if (content) {
          this.context.parent._reComposeFrom(this);
        } else {
          //here parent is ready for re-compose
          var lastComposed = this.composed.splice(0);
          if (!this._isLastComposedFitIntoParent(lastComposed)) {
            if (this.children.length) {
              this.children.forEach(function (a) {
                return a._reComposeFrom();
              });
              this.children.splice(0);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBdUJ3Qjs7Ozs7Ozs7QUF2QnhCLElBQUksT0FBSyxDQUFMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCVyxTQUFTLFFBQVQsQ0FBa0IsT0FBbEIsRUFBMEI7QUFDeEM7Ozs7Ozs7Ozs7Ozs7O3VNQUVDLE1BQUk7Ozs7O2tDQUVhO0FBQ2IsYUFBSyxjQUFMLENBQW9CLElBQXBCO0FBRGE7Ozs7Ozs7Ozs7OztxQ0FXQyxTQUFRO0FBQ2hCLGdCQUFRLElBQVIsc0JBQWdDLEtBQUssV0FBTCxVQUFvQixVQUFVLEVBQVYsR0FBZSxLQUFmLGtDQUFwRCxFQURnQjtBQUV0QixZQUFHLE9BQUgsRUFBVztBQUNWLGVBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUMsSUFBbkMsRUFEVTtTQUFYLE1BRUs7O0FBQ0ssY0FBSSxlQUFhLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsQ0FBYixDQURUO0FBRUssY0FBRyxDQUFDLEtBQUssNEJBQUwsQ0FBa0MsWUFBbEMsQ0FBRCxFQUFpRDtBQUNoRCxnQkFBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXFCO0FBQzdCLG1CQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCO3VCQUFHLEVBQUUsY0FBRjtlQUFILENBQXRCLENBRDZCO0FBRTdCLG1CQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLEVBRjZCO2FBQXhCO1dBREo7U0FKVjs7Ozs7Ozs7O21EQWdCK0IsY0FBYTtBQUN0QyxlQUFPLEtBQVAsQ0FEc0M7Ozs7Ozs7OzRDQU1wQixXQUFXLFdBQVcsYUFBWTtBQUNwRCxnQkFBUSxJQUFSLCtCQUF5QyxLQUFLLFdBQUwsZ0JBQTBCLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBc0IsQ0FBdEIsQ0FBbkUsRUFEb0Q7QUFFcEQsWUFBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLElBQXNCLENBQXRCLEVBQ0MsS0FBSyxPQUFMLEdBREo7QUFFQSxlQUFPLElBQVAsQ0FKb0Q7Ozs7OEJBT3ZEOzs7NkJBSUQ7Ozs7SUFsRGMsUUFBckIsQ0FEd0M7Q0FBMUIiLCJmaWxlIjoiZWRpdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXVpZD0wXG4vKipcbiAqICBpdCdzIGEgdmVyeSBjb21wbGljYXRlZCBqb2IsIHNvIHdlIG5lZWQgYSB2ZXJ5IHNpbXBsZSBkZXNpZ24sIG9uZSBzZW50ZW5jZSBkZXNjcmliZWQgc29sdXRpb24uIG9wdGlvbnM6XG4gKiAgMS4gcmVtb3ZlIGFsbCBjb21wb3NlZCwgYW5kIHJlLWNvbXBvc2UgYWxsXG4gKiAgXHQtIG5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXG4gKiAgXHQtIGxvZ2ljIGlzIG1vc3Qgc2ltcGxlXG4gKiAgXHQtIHBlcmZvcm1hbmNlIGlzIG1vc3QgYmFkXG4gKlxuICogIDIuIHJlbW92ZSBhbGwgY29tcG9zZWQgZnJvbSB0aGlzIGNvbnRlbnQsIGFuZCByZS1jb21wb3NlIHJlbW92YWxzXG4gKiAgXHQtIE5lZWQgbG9jYXRlIGNvbXBvc2VkIG9mIHRoaXMgY29udGVudCBpbiBwYWdlXG4gKiAgXHQtIE5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXG4gKiAgXHRcdD4gY29tcG9uZW50RGlkVXBkYXRlXG4gKiAgXHRcdFx0LiBhbnkgc3RhdGUgdXBkYXRlLFxuICogIFx0XHRcdC4gYW5kIGNhcmVmdWxseSB0dW5lZCBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KVxuICogIFx0LSBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiAjMVxuICpcbiAqICAzLiByZWNvbXBvc2UgdGhpcyBjb250ZW50LCBhbmQgY2hlY2sgaWYgbmV3IGNvbXBvc2VkIGZpdHMgbGFzdCBjb21wb3NlZCBzcGFjZSAoaGl0IHJhdGlvIGlzIGxvdylcbiAqICBcdC0gWWVzOiBqdXN0IHJlcGxhY2VcbiAqICBcdC0gTm86ICMxLCBvciAjMlxuICogIFx0LSBhbmQgdGhlbiBsb29wIHdpdGggYWxsIGZvbGxvd2luZyBjb250ZW50IHdpdGggdGhlIHNhbWUgbG9naWNcbiAqXG4gKiAgXHQzLmE6IHJlY29tcG9zZSB0aGlzIGNvbnRlbnQgbGluZSBieSBsaW5lIC4uLiwgbXVjaCBsb2dpY3MgaGVyZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlZGl0YWJsZShDb250ZW50KXtcblx0cmV0dXJuIGNsYXNzIGV4dGVuZHMgQ29udGVudHtcblx0XHRcblx0XHRfaWQ9dXVpZCsrXG5cbiAgICAgICAgcmVDb21wb3NlKCl7XG4gICAgXHRcdHRoaXMuX3JlQ29tcG9zZUZyb20odGhpcykvLyMyIHNvbHV0aW9uXG4gICAgXHR9XG5cbiAgICBcdC8qKlxuICAgIFx0ICogIGlmIHdpdGggY29udGVudFxuICAgIFx0ICogIFx0PiBzaW1wbHkgYXNrIHBhcmVudCB0byByZWNvbXBvc2VcbiAgICBcdCAqICBpZiB3aXRob3V0IGNvbnRlbnRcbiAgICBcdCAqICBcdD4ganVzdCByZW1vdmUgYWxsIGFuZCBvZmZzcHJpbmcgdG8gYmUgcmVhZHkgdG8gcmUtY29tcG9zZVxuICAgIFx0ICogIFx0PiBzb21ld2hlcmUgc29tZXRpbWUgaXQgd2lsbCBiZSB0cmlnZ2VyZWQgdG8gcmUtY29tcG9zZVxuICAgIFx0ICovXG4gICAgXHRfcmVDb21wb3NlRnJvbShjb250ZW50KXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgcmVtb3ZlIGFsbCBmcm9tICR7dGhpcy5kaXNwbGF5TmFtZX0gJHtjb250ZW50ID8gXCJcIiA6IFwibm90XCJ9IGluY2x1ZGluZyBjaGlsZCwgYW5kIHBhcmVudGApXG4gICAgXHRcdGlmKGNvbnRlbnQpe1xuICAgIFx0XHRcdHRoaXMuY29udGV4dC5wYXJlbnQuX3JlQ29tcG9zZUZyb20odGhpcylcbiAgICBcdFx0fWVsc2V7Ly9oZXJlIHBhcmVudCBpcyByZWFkeSBmb3IgcmUtY29tcG9zZVxuICAgICAgICAgICAgICAgIGxldCBsYXN0Q29tcG9zZWQ9dGhpcy5jb21wb3NlZC5zcGxpY2UoMClcbiAgICAgICAgICAgICAgICBpZighdGhpcy5faXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KGxhc3RDb21wb3NlZCkpe1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aCl7XG4gICAgICAgICAgICBcdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+YS5fcmVDb21wb3NlRnJvbSgpKVxuICAgICAgICAgICAgXHRcdFx0dGhpcy5jaGlsZHJlbi5zcGxpY2UoMClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICBcdFx0fVxuICAgIFx0fVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpcyB0aGVyZSBhIHdheSB0byBqdXN0IHNpbXBseSByZS11c2UgbGFzdCBjb21wb3NlZD9cbiAgICAgICAgICovXG4gICAgICAgIF9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQobGFzdENvbXBvc2VkKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvbmx5IG5vIGNvbXBvc2VkIHNob3VsZCBiZSByZS1jb21wb3NlXG4gICAgICAgICAqL1xuICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgc2hvdWxkQ29tcG9uZW50VXBkYXRlIG9uICR7dGhpcy5kaXNwbGF5TmFtZX0sIHdpdGggJHt0aGlzLmNvbXBvc2VkLmxlbmd0aD09MH1gKVxuICAgICAgICAgICAgaWYodGhpcy5jb21wb3NlZC5sZW5ndGg9PTApXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblx0XHRcblx0XHRmb2N1cygpe1xuXHRcdFx0XG5cdFx0fVxuXHRcdFxuXHRcdGJsdXIoKXtcblx0XHRcdFxuXHRcdH1cbiAgICB9XG59XG4iXX0=