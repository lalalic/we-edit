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
        _inherits(Editor, _Content);

        function Editor() {
            _classCallCheck(this, Editor);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Editor).apply(this, arguments));

            Object.assign(_this.state, { composed: _this.composed }); //for debug
            return _this;
        }

        _createClass(Editor, [{
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
        }]);

        return Editor;
    }(Content);
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBc0J3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVQsU0FBUyxRQUFULENBQWtCLE9BQWxCLEVBQTBCO0FBQ3JDO2tCQUFhOztBQUNULGlCQURTLE1BQ1QsR0FBYTtrQ0FESixRQUNJOzsrRUFESixvQkFFSSxZQURBOztBQUVULG1CQUFPLE1BQVAsQ0FBYyxNQUFLLEtBQUwsRUFBVyxFQUFDLFVBQVMsTUFBSyxRQUFMLEVBQW5DO0FBRlM7U0FBYjs7cUJBRFM7O3dDQU9FO0FBQ2IscUJBQUssY0FBTCxDQUFvQixJQUFwQjtBQURhOzs7Ozs7Ozs7Ozs7MkNBV0MsU0FBUTtBQUNoQix3QkFBUSxJQUFSLHNCQUFnQyxLQUFLLFdBQUwsVUFBb0IsVUFBVSxFQUFWLEdBQWUsS0FBZixrQ0FBcEQsRUFEZ0I7QUFFdEIsb0JBQUcsT0FBSCxFQUFXO0FBQ1YseUJBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUMsSUFBbkMsRUFEVTtpQkFBWCxNQUVLOztBQUNLLHdCQUFJLGVBQWEsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixDQUFiLENBRFQ7QUFFSyx3QkFBRyxDQUFDLEtBQUssNEJBQUwsQ0FBa0MsWUFBbEMsQ0FBRCxFQUFpRDtBQUNoRCw0QkFBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXFCO0FBQzdCLGlDQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCO3VDQUFHLEVBQUUsY0FBRjs2QkFBSCxDQUF0QixDQUQ2QjtBQUU3QixpQ0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixFQUY2Qjt5QkFBeEI7cUJBREo7aUJBSlY7Ozs7Ozs7Ozt5REFnQitCLGNBQWE7QUFDdEMsdUJBQU8sS0FBUCxDQURzQzs7Ozs7Ozs7a0RBTXBCLFdBQVcsV0FBVyxhQUFZO0FBQ3BELHdCQUFRLElBQVIsK0JBQXlDLEtBQUssV0FBTCxnQkFBMEIsS0FBSyxRQUFMLENBQWMsTUFBZCxJQUFzQixDQUF0QixDQUFuRSxFQURvRDtBQUVwRCxvQkFBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLElBQXNCLENBQXRCLEVBQ0MsS0FBSyxPQUFMLEdBREo7QUFFQSx1QkFBTyxJQUFQLENBSm9EOzs7O2VBMUMvQztNQUFlLFFBQTVCLENBRHFDO0NBQTFCIiwiZmlsZSI6ImVkaXRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAgaXQncyBhIHZlcnkgY29tcGxpY2F0ZWQgam9iLCBzbyB3ZSBuZWVkIGEgdmVyeSBzaW1wbGUgZGVzaWduLCBvbmUgc2VudGVuY2UgZGVzY3JpYmVkIHNvbHV0aW9uLiBvcHRpb25zOlxuICogIDEuIHJlbW92ZSBhbGwgY29tcG9zZWQsIGFuZCByZS1jb21wb3NlIGFsbFxuICogIFx0LSBuZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxuICogIFx0LSBsb2dpYyBpcyBtb3N0IHNpbXBsZVxuICogIFx0LSBwZXJmb3JtYW5jZSBpcyBtb3N0IGJhZFxuICpcbiAqICAyLiByZW1vdmUgYWxsIGNvbXBvc2VkIGZyb20gdGhpcyBjb250ZW50LCBhbmQgcmUtY29tcG9zZSByZW1vdmFsc1xuICogIFx0LSBOZWVkIGxvY2F0ZSBjb21wb3NlZCBvZiB0aGlzIGNvbnRlbnQgaW4gcGFnZVxuICogIFx0LSBOZWVkIGZpbmQgYSB0aW1lIHRvIHJlY29tcG9zZVxuICogIFx0XHQ+IGNvbXBvbmVudERpZFVwZGF0ZVxuICogIFx0XHRcdC4gYW55IHN0YXRlIHVwZGF0ZSxcbiAqICBcdFx0XHQuIGFuZCBjYXJlZnVsbHkgdHVuZWQgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dClcbiAqICBcdC0gcGVyZm9ybWFuY2UgaXMgYmV0dGVyIHRoYW4gIzFcbiAqXG4gKiAgMy4gcmVjb21wb3NlIHRoaXMgY29udGVudCwgYW5kIGNoZWNrIGlmIG5ldyBjb21wb3NlZCBmaXRzIGxhc3QgY29tcG9zZWQgc3BhY2UgKGhpdCByYXRpbyBpcyBsb3cpXG4gKiAgXHQtIFllczoganVzdCByZXBsYWNlXG4gKiAgXHQtIE5vOiAjMSwgb3IgIzJcbiAqICBcdC0gYW5kIHRoZW4gbG9vcCB3aXRoIGFsbCBmb2xsb3dpbmcgY29udGVudCB3aXRoIHRoZSBzYW1lIGxvZ2ljXG4gKlxuICogIFx0My5hOiByZWNvbXBvc2UgdGhpcyBjb250ZW50IGxpbmUgYnkgbGluZSAuLi4sIG11Y2ggbG9naWNzIGhlcmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZWRpdGFibGUoQ29udGVudCl7XG4gICAgcmV0dXJuIGNsYXNzIEVkaXRvciBleHRlbmRzIENvbnRlbnR7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUse2NvbXBvc2VkOnRoaXMuY29tcG9zZWR9KS8vZm9yIGRlYnVnXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJlQ29tcG9zZSgpe1xuICAgIFx0XHR0aGlzLl9yZUNvbXBvc2VGcm9tKHRoaXMpLy8jMiBzb2x1dGlvblxuICAgIFx0fVxuXG4gICAgXHQvKipcbiAgICBcdCAqICBpZiB3aXRoIGNvbnRlbnRcbiAgICBcdCAqICBcdD4gc2ltcGx5IGFzayBwYXJlbnQgdG8gcmVjb21wb3NlXG4gICAgXHQgKiAgaWYgd2l0aG91dCBjb250ZW50XG4gICAgXHQgKiAgXHQ+IGp1c3QgcmVtb3ZlIGFsbCBhbmQgb2Zmc3ByaW5nIHRvIGJlIHJlYWR5IHRvIHJlLWNvbXBvc2VcbiAgICBcdCAqICBcdD4gc29tZXdoZXJlIHNvbWV0aW1lIGl0IHdpbGwgYmUgdHJpZ2dlcmVkIHRvIHJlLWNvbXBvc2VcbiAgICBcdCAqL1xuICAgIFx0X3JlQ29tcG9zZUZyb20oY29udGVudCl7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oYHJlbW92ZSBhbGwgZnJvbSAke3RoaXMuZGlzcGxheU5hbWV9ICR7Y29udGVudCA/IFwiXCIgOiBcIm5vdFwifSBpbmNsdWRpbmcgY2hpbGQsIGFuZCBwYXJlbnRgKVxuICAgIFx0XHRpZihjb250ZW50KXtcbiAgICBcdFx0XHR0aGlzLmNvbnRleHQucGFyZW50Ll9yZUNvbXBvc2VGcm9tKHRoaXMpXG4gICAgXHRcdH1lbHNley8vaGVyZSBwYXJlbnQgaXMgcmVhZHkgZm9yIHJlLWNvbXBvc2VcbiAgICAgICAgICAgICAgICBsZXQgbGFzdENvbXBvc2VkPXRoaXMuY29tcG9zZWQuc3BsaWNlKDApXG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuX2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudChsYXN0Q29tcG9zZWQpKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jaGlsZHJlbi5sZW5ndGgpe1xuICAgICAgICAgICAgXHRcdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKGE9PmEuX3JlQ29tcG9zZUZyb20oKSlcbiAgICAgICAgICAgIFx0XHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKDApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgXHRcdH1cbiAgICBcdH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogaXMgdGhlcmUgYSB3YXkgdG8ganVzdCBzaW1wbHkgcmUtdXNlIGxhc3QgY29tcG9zZWQ/XG4gICAgICAgICAqL1xuICAgICAgICBfaXNMYXN0Q29tcG9zZWRGaXRJbnRvUGFyZW50KGxhc3RDb21wb3NlZCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogb25seSBubyBjb21wb3NlZCBzaG91bGQgYmUgcmUtY29tcG9zZVxuICAgICAgICAgKi9cbiAgICAgICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCl7XG4gICAgICAgICAgICBjb25zb2xlLmluZm8oYHNob3VsZENvbXBvbmVudFVwZGF0ZSBvbiAke3RoaXMuZGlzcGxheU5hbWV9LCB3aXRoICR7dGhpcy5jb21wb3NlZC5sZW5ndGg9PTB9YClcbiAgICAgICAgICAgIGlmKHRoaXMuY29tcG9zZWQubGVuZ3RoPT0wKVxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9zZSgpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxufVxuIl19