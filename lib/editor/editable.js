"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = editable;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        _inherits(_class, _Content);

        function _class() {
            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));

            Object.assign(_this.state, { composed: _this.composed }); //for debug
            return _this;
        }

        _createClass(_class, [{
            key: "reCompose",
            value: function reCompose() {
                this.composed[0] && this._reComposeFrom(this.composed[0]); //#2 solution
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
                if (content) this.context.parent._reComposeFrom(this);else {
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
        }]);

        return _class;
    }(Content);
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBc0J3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVQsU0FBUyxRQUFULENBQWtCLE9BQWxCLEVBQTBCO0FBQ3JDOzs7QUFDSSwwQkFBYTs7O21HQUNBLFlBREE7O0FBRVQsbUJBQU8sTUFBUCxDQUFjLE1BQUssS0FBTCxFQUFXLEVBQUMsVUFBUyxNQUFLLFFBQUwsRUFBbkM7QUFGUztTQUFiOzs7O3dDQU1XO0FBQ2IscUJBQUssUUFBTCxDQUFjLENBQWQsS0FBb0IsS0FBSyxjQUFMLENBQW9CLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBcEIsQ0FBcEI7QUFEYTs7Ozs7Ozs7Ozs7OzJDQVdDLFNBQVE7QUFDaEIsd0JBQVEsSUFBUixzQkFBZ0MsS0FBSyxXQUFMLFVBQW9CLFVBQVUsRUFBVixHQUFlLEtBQWYsa0NBQXBELEVBRGdCO0FBRXRCLG9CQUFHLE9BQUgsRUFDQyxLQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLGNBQXBCLENBQW1DLElBQW5DLEVBREQsS0FFSTs7QUFDTSx3QkFBSSxlQUFhLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsQ0FBYixDQURWO0FBRU0sd0JBQUcsQ0FBQyxLQUFLLDRCQUFMLENBQWtDLFlBQWxDLENBQUQsRUFBaUQ7QUFDaEQsNEJBQUcsS0FBSyxRQUFMLENBQWMsTUFBZCxFQUFxQjtBQUM3QixpQ0FBSyxRQUFMLENBQWMsT0FBZCxDQUFzQjt1Q0FBRyxFQUFFLGNBQUY7NkJBQUgsQ0FBdEIsQ0FENkI7QUFFN0IsaUNBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsRUFGNkI7eUJBQXhCO3FCQURKO2lCQUpWOzs7Ozs7Ozs7eURBZ0IrQixjQUFhO0FBQ3RDLHVCQUFPLEtBQVAsQ0FEc0M7Ozs7Ozs7O2tEQU1wQixXQUFXLFdBQVcsYUFBWTtBQUNwRCx3QkFBUSxJQUFSLCtCQUF5QyxLQUFLLFdBQUwsZ0JBQTBCLEtBQUssUUFBTCxDQUFjLE1BQWQsSUFBc0IsQ0FBdEIsQ0FBbkUsRUFEb0Q7QUFFcEQsb0JBQUcsS0FBSyxRQUFMLENBQWMsTUFBZCxJQUFzQixDQUF0QixFQUNDLEtBQUssT0FBTCxHQURKO0FBRUEsdUJBQU8sSUFBUCxDQUpvRDs7Ozs7TUExQ3ZDLFFBQXJCLENBRHFDO0NBQTFCIiwiZmlsZSI6ImVkaXRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAgaXQncyBhIHZlcnkgY29tcGxpY2F0ZWQgam9iLCBzbyB3ZSBuZWVkIGEgdmVyeSBzaW1wbGUgZGVzaWduLCBvbmUgc2VudGVuY2UgZGVzY3JpYmVkIHNvbHV0aW9uLiBvcHRpb25zOlxuICogIDEuIHJlbW92ZSBhbGwgY29tcG9zZWQsIGFuZCByZS1jb21wb3NlIGFsbFxuICogIFx0LSBuZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxuICogIFx0LSBsb2dpYyBpcyBtb3N0IHNpbXBsZVxuICogIFx0LSBwZXJmb3JtYW5jZSBpcyBtb3N0IGJhZFxuICpcbiAqICAyLiByZW1vdmUgYWxsIGNvbXBvc2VkIGZyb20gdGhpcyBjb250ZW50LCBhbmQgcmUtY29tcG9zZSByZW1vdmFsc1xuICogIFx0LSBOZWVkIGxvY2F0ZSBjb21wb3NlZCBvZiB0aGlzIGNvbnRlbnQgaW4gcGFnZVxuICogIFx0LSBOZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxuICogIFx0XHQ+IGNvbXBvbmVudERpZFVwZGF0ZVxuICogIFx0XHRcdC4gYW55IHN0YXRlIHVwZGF0ZSxcbiAqICBcdFx0XHQuIGFuZCBjYXJlZnVsbHkgdHVuZWQgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dClcbiAqICBcdC0gcGVyZm9ybWFuY2UgaXMgYmV0dGVyIHRoYW4gIzFcbiAqXG4gKiAgMy4gcmVjb21wb3NlIHRoaXMgY29udGVudCwgYW5kIGNoZWNrIGlmIG5ldyBjb21wb3NlZCBmaXRzIGxhc3QgY29tcG9zZWQgc3BhY2UgKGhpdCByYXRpbyBpcyBsb3cpXG4gKiAgXHQtIFllczoganVzdCByZXBsYWNlXG4gKiAgXHQtIE5vOiAjMSwgb3IgIzJcbiAqICBcdC0gYW5kIHRoZW4gbG9vcCB3aXRoIGFsbCBmb2xsb3dpbmcgY29udGVudCB3aXRoIHRoZSBzYW1lIGxvZ2ljXG4gKlxuICogIFx0My5hOiByZWNvbXBvc2UgdGhpcyBjb250ZW50IGxpbmUgYnkgbGluZSAuLi4sIG11Y2ggbG9naWNzIGhlcmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdGFibGUoQ29udGVudCl7XG4gICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgQ29udGVudHtcbiAgICAgICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSx7Y29tcG9zZWQ6dGhpcy5jb21wb3NlZH0pLy9mb3IgZGVidWdcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmVDb21wb3NlKCl7XG4gICAgXHRcdHRoaXMuY29tcG9zZWRbMF0gJiYgdGhpcy5fcmVDb21wb3NlRnJvbSh0aGlzLmNvbXBvc2VkWzBdKS8vIzIgc29sdXRpb25cbiAgICBcdH1cblxuICAgIFx0LyoqXG4gICAgXHQgKiAgaWYgd2l0aCBjb250ZW50XG4gICAgXHQgKiAgXHQ+IHNpbXBseSBhc2sgcGFyZW50IHRvIHJlY29tcG9zZVxuICAgIFx0ICogIGlmIHdpdGhvdXQgY29udGVudFxuICAgIFx0ICogIFx0PiBqdXN0IHJlbW92ZSBhbGwgYW5kIG9mZnNwcmluZyB0byBiZSByZWFkeSB0byByZS1jb21wb3NlXG4gICAgXHQgKiAgXHQ+IHNvbWV3aGVyZSBzb21ldGltZSBpdCB3aWxsIGJlIHRyaWdnZXJlZCB0byByZS1jb21wb3NlXG4gICAgXHQgKi9cbiAgICBcdF9yZUNvbXBvc2VGcm9tKGNvbnRlbnQpe1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKGByZW1vdmUgYWxsIGZyb20gJHt0aGlzLmRpc3BsYXlOYW1lfSAke2NvbnRlbnQgPyBcIlwiIDogXCJub3RcIn0gaW5jbHVkaW5nIGNoaWxkLCBhbmQgcGFyZW50YClcbiAgICBcdFx0aWYoY29udGVudClcbiAgICBcdFx0XHR0aGlzLmNvbnRleHQucGFyZW50Ll9yZUNvbXBvc2VGcm9tKHRoaXMpXG4gICAgXHRcdGVsc2V7Ly9oZXJlIHBhcmVudCBpcyByZWFkeSBmb3IgcmUtY29tcG9zZVxuICAgICAgICAgICAgICAgIGxldCBsYXN0Q29tcG9zZWQ9dGhpcy5jb21wb3NlZC5zcGxpY2UoMClcbiAgICAgICAgICAgICAgICBpZighdGhpcy5faXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KGxhc3RDb21wb3NlZCkpe1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmNoaWxkcmVuLmxlbmd0aCl7XG4gICAgICAgICAgICBcdFx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goYT0+YS5fcmVDb21wb3NlRnJvbSgpKVxuICAgICAgICAgICAgXHRcdFx0dGhpcy5jaGlsZHJlbi5zcGxpY2UoMClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICBcdFx0fVxuICAgIFx0fVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpcyB0aGVyZSBhIHdheSB0byBqdXN0IHNpbXBseSByZS11c2UgbGFzdCBjb21wb3NlZD9cbiAgICAgICAgICovXG4gICAgICAgIF9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQobGFzdENvbXBvc2VkKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBvbmx5IG5vIGNvbXBvc2VkIHNob3VsZCBiZSByZS1jb21wb3NlXG4gICAgICAgICAqL1xuICAgICAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgc2hvdWxkQ29tcG9uZW50VXBkYXRlIG9uICR7dGhpcy5kaXNwbGF5TmFtZX0sIHdpdGggJHt0aGlzLmNvbXBvc2VkLmxlbmd0aD09MH1gKVxuICAgICAgICAgICAgaWYodGhpcy5jb21wb3NlZC5sZW5ndGg9PTApXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb3NlKClcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=