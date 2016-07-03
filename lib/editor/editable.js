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

        return _class;
    }(Content);
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lZGl0b3IvZWRpdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBc0J3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVQsU0FBUyxRQUFULENBQWtCLE9BQWxCLEVBQTBCO0FBQ3JDOzs7QUFDSSwwQkFBYTs7O21HQUNBLFlBREE7O0FBRVQsbUJBQU8sTUFBUCxDQUFjLE1BQUssS0FBTCxFQUFXLEVBQUMsVUFBUyxNQUFLLFFBQUwsRUFBbkM7QUFGUztTQUFiOzs7O3dDQU1XO0FBQ2IscUJBQUssY0FBTCxDQUFvQixJQUFwQjtBQURhOzs7Ozs7Ozs7Ozs7MkNBV0MsU0FBUTtBQUNoQix3QkFBUSxJQUFSLHNCQUFnQyxLQUFLLFdBQUwsVUFBb0IsVUFBVSxFQUFWLEdBQWUsS0FBZixrQ0FBcEQsRUFEZ0I7QUFFdEIsb0JBQUcsT0FBSCxFQUFXO0FBQ1YseUJBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsY0FBcEIsQ0FBbUMsSUFBbkMsRUFEVTtpQkFBWCxNQUVLOztBQUNLLHdCQUFJLGVBQWEsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixDQUFiLENBRFQ7QUFFSyx3QkFBRyxDQUFDLEtBQUssNEJBQUwsQ0FBa0MsWUFBbEMsQ0FBRCxFQUFpRDtBQUNoRCw0QkFBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEVBQXFCO0FBQzdCLGlDQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCO3VDQUFHLEVBQUUsY0FBRjs2QkFBSCxDQUF0QixDQUQ2QjtBQUU3QixpQ0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixFQUY2Qjt5QkFBeEI7cUJBREo7aUJBSlY7Ozs7Ozs7Ozt5REFnQitCLGNBQWE7QUFDdEMsdUJBQU8sS0FBUCxDQURzQzs7Ozs7Ozs7a0RBTXBCLFdBQVcsV0FBVyxhQUFZO0FBQ3BELHdCQUFRLElBQVIsK0JBQXlDLEtBQUssV0FBTCxnQkFBMEIsS0FBSyxRQUFMLENBQWMsTUFBZCxJQUFzQixDQUF0QixDQUFuRSxFQURvRDtBQUVwRCxvQkFBRyxLQUFLLFFBQUwsQ0FBYyxNQUFkLElBQXNCLENBQXRCLEVBQ0MsS0FBSyxPQUFMLEdBREo7QUFFQSx1QkFBTyxJQUFQLENBSm9EOzs7OztNQTFDdkMsUUFBckIsQ0FEcUM7Q0FBMUIiLCJmaWxlIjoiZWRpdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICBpdCdzIGEgdmVyeSBjb21wbGljYXRlZCBqb2IsIHNvIHdlIG5lZWQgYSB2ZXJ5IHNpbXBsZSBkZXNpZ24sIG9uZSBzZW50ZW5jZSBkZXNjcmliZWQgc29sdXRpb24uIG9wdGlvbnM6XG4gKiAgMS4gcmVtb3ZlIGFsbCBjb21wb3NlZCwgYW5kIHJlLWNvbXBvc2UgYWxsXG4gKiAgXHQtIG5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXG4gKiAgXHQtIGxvZ2ljIGlzIG1vc3Qgc2ltcGxlXG4gKiAgXHQtIHBlcmZvcm1hbmNlIGlzIG1vc3QgYmFkXG4gKlxuICogIDIuIHJlbW92ZSBhbGwgY29tcG9zZWQgZnJvbSB0aGlzIGNvbnRlbnQsIGFuZCByZS1jb21wb3NlIHJlbW92YWxzXG4gKiAgXHQtIE5lZWQgbG9jYXRlIGNvbXBvc2VkIG9mIHRoaXMgY29udGVudCBpbiBwYWdlXG4gKiAgXHQtIE5lZWQgZmluZCBhIHRpbWUgdG8gcmVjb21wb3NlXG4gKiAgXHRcdD4gY29tcG9uZW50RGlkVXBkYXRlXG4gKiAgXHRcdFx0LiBhbnkgc3RhdGUgdXBkYXRlLFxuICogIFx0XHRcdC4gYW5kIGNhcmVmdWxseSB0dW5lZCBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUsIG5leHRDb250ZXh0KVxuICogIFx0LSBwZXJmb3JtYW5jZSBpcyBiZXR0ZXIgdGhhbiAjMVxuICpcbiAqICAzLiByZWNvbXBvc2UgdGhpcyBjb250ZW50LCBhbmQgY2hlY2sgaWYgbmV3IGNvbXBvc2VkIGZpdHMgbGFzdCBjb21wb3NlZCBzcGFjZSAoaGl0IHJhdGlvIGlzIGxvdylcbiAqICBcdC0gWWVzOiBqdXN0IHJlcGxhY2VcbiAqICBcdC0gTm86ICMxLCBvciAjMlxuICogIFx0LSBhbmQgdGhlbiBsb29wIHdpdGggYWxsIGZvbGxvd2luZyBjb250ZW50IHdpdGggdGhlIHNhbWUgbG9naWNcbiAqXG4gKiAgXHQzLmE6IHJlY29tcG9zZSB0aGlzIGNvbnRlbnQgbGluZSBieSBsaW5lIC4uLiwgbXVjaCBsb2dpY3MgaGVyZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlZGl0YWJsZShDb250ZW50KXtcbiAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBDb250ZW50e1xuICAgICAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHtjb21wb3NlZDp0aGlzLmNvbXBvc2VkfSkvL2ZvciBkZWJ1Z1xuICAgICAgICB9XG5cblxuICAgICAgICByZUNvbXBvc2UoKXtcbiAgICBcdFx0dGhpcy5fcmVDb21wb3NlRnJvbSh0aGlzKS8vIzIgc29sdXRpb25cbiAgICBcdH1cblxuICAgIFx0LyoqXG4gICAgXHQgKiAgaWYgd2l0aCBjb250ZW50XG4gICAgXHQgKiAgXHQ+IHNpbXBseSBhc2sgcGFyZW50IHRvIHJlY29tcG9zZVxuICAgIFx0ICogIGlmIHdpdGhvdXQgY29udGVudFxuICAgIFx0ICogIFx0PiBqdXN0IHJlbW92ZSBhbGwgYW5kIG9mZnNwcmluZyB0byBiZSByZWFkeSB0byByZS1jb21wb3NlXG4gICAgXHQgKiAgXHQ+IHNvbWV3aGVyZSBzb21ldGltZSBpdCB3aWxsIGJlIHRyaWdnZXJlZCB0byByZS1jb21wb3NlXG4gICAgXHQgKi9cbiAgICBcdF9yZUNvbXBvc2VGcm9tKGNvbnRlbnQpe1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKGByZW1vdmUgYWxsIGZyb20gJHt0aGlzLmRpc3BsYXlOYW1lfSAke2NvbnRlbnQgPyBcIlwiIDogXCJub3RcIn0gaW5jbHVkaW5nIGNoaWxkLCBhbmQgcGFyZW50YClcbiAgICBcdFx0aWYoY29udGVudCl7XG4gICAgXHRcdFx0dGhpcy5jb250ZXh0LnBhcmVudC5fcmVDb21wb3NlRnJvbSh0aGlzKVxuICAgIFx0XHR9ZWxzZXsvL2hlcmUgcGFyZW50IGlzIHJlYWR5IGZvciByZS1jb21wb3NlXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RDb21wb3NlZD10aGlzLmNvbXBvc2VkLnNwbGljZSgwKVxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9pc0xhc3RDb21wb3NlZEZpdEludG9QYXJlbnQobGFzdENvbXBvc2VkKSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuY2hpbGRyZW4ubGVuZ3RoKXtcbiAgICAgICAgICAgIFx0XHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaChhPT5hLl9yZUNvbXBvc2VGcm9tKCkpXG4gICAgICAgICAgICBcdFx0XHR0aGlzLmNoaWxkcmVuLnNwbGljZSgwKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgIFx0XHR9XG4gICAgXHR9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGlzIHRoZXJlIGEgd2F5IHRvIGp1c3Qgc2ltcGx5IHJlLXVzZSBsYXN0IGNvbXBvc2VkP1xuICAgICAgICAgKi9cbiAgICAgICAgX2lzTGFzdENvbXBvc2VkRml0SW50b1BhcmVudChsYXN0Q29tcG9zZWQpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIG9ubHkgbm8gY29tcG9zZWQgc2hvdWxkIGJlIHJlLWNvbXBvc2VcbiAgICAgICAgICovXG4gICAgICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpe1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKGBzaG91bGRDb21wb25lbnRVcGRhdGUgb24gJHt0aGlzLmRpc3BsYXlOYW1lfSwgd2l0aCAke3RoaXMuY29tcG9zZWQubGVuZ3RoPT0wfWApXG4gICAgICAgICAgICBpZih0aGlzLmNvbXBvc2VkLmxlbmd0aD09MClcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvc2UoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==