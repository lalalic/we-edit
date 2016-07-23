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

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class2)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._id = uuid++, _this.state = { content: _this.props.children.length == 0 ? _this.emptyContent() : _react2.default.Children.toArray(_this.props.children) }, _temp), _possibleConstructorReturn(_this, _ret);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBMEJ3Qjs7QUExQnhCOzs7Ozs7Ozs7Ozs7QUFHQSxJQUFJLE9BQUssQ0FBTDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QlcsU0FBUyxRQUFULENBQWtCLE9BQWxCLEVBQTBCO0FBQ3hDOzs7Ozs7Ozs7Ozs7Ozt1TUFDQyxNQUFJLGNBQ0osUUFBTSxFQUFDLFNBQVEsTUFBSyxLQUFMLENBQVcsUUFBWCxDQUFvQixNQUFwQixJQUE0QixDQUE1QixHQUFnQyxNQUFLLFlBQUwsRUFBaEMsR0FBc0QsZ0JBQU0sUUFBTixDQUFlLE9BQWYsQ0FBdUIsTUFBSyxLQUFMLENBQVcsUUFBWCxDQUE3RTs7Ozs7cUNBRUQ7QUFDYixlQUFPLEVBQVAsQ0FEYTs7Ozt3Q0FHRztBQUNoQixlQUFPLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsTUFBbkIsQ0FEUzs7OzttQ0FJTDtBQUNYLGVBQU8sS0FBSyxLQUFMLENBQVcsT0FBWCxDQURJOzs7OzJDQUlROzs7a0NBSUg7QUFDYixhQUFLLGNBQUwsQ0FBb0IsSUFBcEI7QUFEYTs7Ozs7Ozs7Ozs7O3FDQVdDLFNBQVE7QUFDaEIsYUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixjQUFwQixDQUFtQyxJQUFuQyxFQURnQjs7OzsrQ0FJRCxXQUFVOzs7QUFDbEMsWUFBSSxlQUFhLEtBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsTUFBdkIsQ0FBOEIsQ0FBOUIsQ0FBYixDQUQ4Qjs7QUFHbEMsWUFBSSxXQUFTLFNBQVQsUUFBUyxJQUFHO0FBQ2YsY0FBRyxPQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLEVBQThCO0FBQ2hDLG1CQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE9BQXZCLENBQStCO3FCQUFHLEVBQUUsd0JBQUYsQ0FBMkIsSUFBM0I7YUFBSCxDQUEvQixDQURnQztBQUVoQyxtQkFBSyxRQUFMLENBQWMsUUFBZCxDQUF1QixNQUF2QixDQUE4QixDQUE5QixFQUZnQztXQUFqQztBQUlBLGlCQUFLLFFBQUwsQ0FBYyxZQUFkLEdBQTJCLElBQTNCLENBTGU7U0FBSCxDQUhxQjtBQVVsQyxZQUFHLFNBQUgsRUFBYTtBQUNaLHFCQURZO1NBQWIsTUFFTSxJQUFHLENBQUMsS0FBSyw0QkFBTCxDQUFrQyxZQUFsQyxDQUFELEVBQWlEO0FBQ3pELHFCQUR5RDtTQUFwRCxNQUVBO0FBQ0wsZUFBSyxRQUFMLENBQWMsWUFBZCxHQUEyQixZQUEzQixDQURLO1NBRkE7Ozs7Ozs7OzttREFVNEIsY0FBYTtBQUMvQyxlQUFPLEtBQVAsQ0FEK0M7Ozs7Ozs7OzRDQU1wQixXQUFXLFdBQVcsYUFBWTs7QUFFcEQsWUFBRyxLQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLE1BQXZCLElBQStCLENBQS9CLEVBQWlDO0FBQzVDLGNBQUcsS0FBSyxRQUFMLENBQWMsWUFBZCxFQUEyQjtBQUM3QixpQkFBSyxrQkFBTCxHQUQ2QjtXQUE5QixNQUdDLEtBQUssT0FBTCxHQUhEO1NBRFE7QUFNQSxlQUFPLElBQVAsQ0FSb0Q7Ozs7NkJBV3hEOzs7O0lBekVjLFFBQXJCLENBRHdDO0NBQTFCIiwiZmlsZSI6ImVkaXRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXG5cblxudmFyIHV1aWQ9MFxuLyoqXG4gKiAgaXQncyBhIHZlcnkgY29tcGxpY2F0ZWQgam9iLCBzbyB3ZSBuZWVkIGEgdmVyeSBzaW1wbGUgZGVzaWduLCBvbmUgc2VudGVuY2UgZGVzY3JpYmVkIHNvbHV0aW9uLiBvcHRpb25zOlxuICogIDEuIHJlbW92ZSBhbGwgY29tcG9zZWQsIGFuZCByZS1jb21wb3NlIGFsbFxuICogIFx0LSBuZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxuICogIFx0LSBsb2dpYyBpcyBtb3N0IHNpbXBsZVxuICogIFx0LSBwZXJmb3JtYW5jZSBpcyBtb3N0IGJhZFxuICpcbiAqICAyLiByZW1vdmUgYWxsIGNvbXBvc2VkIGZyb20gdGhpcyBjb250ZW50LCBhbmQgcmUtY29tcG9zZSByZW1vdmFsc1xuICogIFx0LSBOZWVkIGxvY2F0ZSBjb21wb3NlZCBvZiB0aGlzIGNvbnRlbnQgaW4gcGFnZVxuICogIFx0LSBOZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxuICogIFx0XHQ+IGNvbXBvbmVudERpZFVwZGF0ZVxuICogIFx0XHRcdC4gYW55IHN0YXRlIHVwZGF0ZSxcbiAqICBcdFx0XHQuIGFuZCBjYXJlZnVsbHkgdHVuZWQgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dClcbiAqICBcdC0gcGVyZm9ybWFuY2UgaXMgYmV0dGVyIHRoYW4gIzFcbiAqXG4gKiAgMy4gcmVjb21wb3NlIHRoaXMgY29udGVudCwgYW5kIGNoZWNrIGlmIG5ldyBjb21wb3NlZCBmaXRzIGxhc3QgY29tcG9zZWQgc3BhY2UgKGhpdCByYXRpbyBpcyBsb3cpXG4gKiAgXHQtIFllczoganVzdCByZXBsYWNlXG4gKiAgXHQtIE5vOiAjMSwgb3IgIzJcbiAqICBcdC0gYW5kIHRoZW4gbG9vcCB3aXRoIGFsbCBmb2xsb3dpbmcgY29udGVudCB3aXRoIHRoZSBzYW1lIGxvZ2ljXG4gKlxuICogIFx0My5hOiByZWNvbXBvc2UgdGhpcyBjb250ZW50IGxpbmUgYnkgbGluZSAuLi4sIG11Y2ggbG9naWNzIGhlcmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdGFibGUoQ29udGVudCl7XG5cdHJldHVybiBjbGFzcyBleHRlbmRzIENvbnRlbnR7XG5cdFx0X2lkPXV1aWQrK1xuXHRcdHN0YXRlPXtjb250ZW50OnRoaXMucHJvcHMuY2hpbGRyZW4ubGVuZ3RoPT0wID8gdGhpcy5lbXB0eUNvbnRlbnQoKSA6IFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbil9XG5cblx0XHRlbXB0eUNvbnRlbnQoKXtcblx0XHRcdHJldHVybiBbXVxuXHRcdH1cblx0XHRnZXRDb250ZW50Q291bnQoKXtcblx0XHRcdHJldHVybiB0aGlzLnN0YXRlLmNvbnRlbnQubGVuZ3RoXG5cdFx0fVxuXG5cdFx0Z2V0Q29udGVudCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuc3RhdGUuY29udGVudFxuXHRcdH1cblxuXHRcdGFwcGVuZExhc3RDb21wb3NlZCgpe1xuXG5cdFx0fVxuXG4gICAgICAgIHJlQ29tcG9zZSgpe1xuICAgIFx0XHR0aGlzLl9yZUNvbXBvc2VGcm9tKHRoaXMpLy8jMiBzb2x1dGlvblxuICAgIFx0fVxuXG4gICAgXHQvKipcbiAgICBcdCAqICBpZiB3aXRoIGNvbnRlbnRcbiAgICBcdCAqICBcdD4gc2ltcGx5IGFzayBwYXJlbnQgdG8gcmVjb21wb3NlXG4gICAgXHQgKiAgaWYgd2l0aG91dCBjb250ZW50XG4gICAgXHQgKiAgXHQ+IGp1c3QgcmVtb3ZlIGFsbCBhbmQgb2Zmc3ByaW5nIHRvIGJlIHJlYWR5IHRvIHJlLWNvbXBvc2VcbiAgICBcdCAqICBcdD4gc29tZXdoZXJlIHNvbWV0aW1lIGl0IHdpbGwgYmUgdHJpZ2dlcmVkIHRvIHJlLWNvbXBvc2VcbiAgICBcdCAqL1xuICAgIFx0X3JlQ29tcG9zZUZyb20oY29udGVudCl7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucGFyZW50Ll9yZUNvbXBvc2VGcm9tKHRoaXMpXG4gICAgXHR9XG5cblx0XHRfY2xlYXJDb21wb3NlZDRyZUNvbXBvc2UoZnVsbGNsZWFyKXtcblx0XHRcdGxldCBsYXN0Q29tcG9zZWQ9dGhpcy5jb21wdXRlZC5jb21wb3NlZC5zcGxpY2UoMClcblxuXHRcdFx0bGV0IGNsZWFyQWxsPWE9Pntcblx0XHRcdFx0aWYodGhpcy5jb21wdXRlZC5jaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHRcdHRoaXMuY29tcHV0ZWQuY2hpbGRyZW4uZm9yRWFjaChhPT5hLl9jbGVhckNvbXBvc2VkNHJlQ29tcG9zZSh0cnVlKSlcblx0XHRcdFx0XHR0aGlzLmNvbXB1dGVkLmNoaWxkcmVuLnNwbGljZSgwKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkPW51bGxcblx0XHRcdH1cblx0XHRcdGlmKGZ1bGxjbGVhcil7XG5cdFx0XHRcdGNsZWFyQWxsKClcblx0XHRcdH1lbHNlIGlmKCF0aGlzLl9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQobGFzdENvbXBvc2VkKSl7XG5cdFx0XHRcdGNsZWFyQWxsKClcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0dGhpcy5jb21wdXRlZC5sYXN0Q29tcG9zZWQ9bGFzdENvbXBvc2VkXG5cdFx0XHR9XG5cdFx0fVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpcyB0aGVyZSBhIHdheSB0byBqdXN0IHNpbXBseSByZS11c2UgbGFzdCBjb21wb3NlZD9cbiAgICAgICAgICovXG4gICAgICAgIF9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQobGFzdENvbXBvc2VkKXtcblx0XHRcdHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvbmx5IG5vIGNvbXBvc2VkIHNob3VsZCBiZSByZS1jb21wb3NlXG4gICAgICAgICAqL1xuICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KXtcbiAgICAgICAgICAgIC8vY29uc29sZS5pbmZvKGBzaG91bGRDb21wb25lbnRVcGRhdGUgb24gJHt0aGlzLmRpc3BsYXlOYW1lfSwgd2l0aCAke3RoaXMuY29tcHV0ZWQuY29tcG9zZWQubGVuZ3RoPT0wfWApXG4gICAgICAgICAgICBpZih0aGlzLmNvbXB1dGVkLmNvbXBvc2VkLmxlbmd0aD09MCl7XG5cdFx0XHRcdGlmKHRoaXMuY29tcHV0ZWQubGFzdENvbXBvc2VkKXtcblx0XHRcdFx0XHR0aGlzLmFwcGVuZExhc3RDb21wb3NlZCgpXG5cdFx0XHRcdH1lbHNlXG5cdFx0XHRcdFx0dGhpcy5jb21wb3NlKClcblx0XHRcdH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuXHRcdGJsdXIoKXtcblxuXHRcdH1cbiAgICB9XG59XG4iXX0=