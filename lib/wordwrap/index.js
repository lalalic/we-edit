"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _textComposerTime = 0;

var WordWrapper = function () {
    function WordWrapper(text, style) {
        _classCallCheck(this, WordWrapper);

        var rFonts = style.rFonts;
        var fontSize = style.sz;

        this.style = style;
        this.text = text;
        this.fontFamily = Object.keys(rFonts).map(function (a) {
            return "" + (rFonts[a] || '');
        }).filter(function (a) {
            return a;
        }).join(" ");
        this.size = fontSize;
        this.height = Math.ceil(this.lineHeight());
        this.composed = 0;
    }

    _createClass(WordWrapper, [{
        key: "lineHeight",
        value: function lineHeight() {
            return 25;
        }
    }, {
        key: "stringWidth",
        value: function stringWidth(string) {
            return 200;
        }
    }, {
        key: "next",
        value: function next(_ref) {
            var maxWidth = _ref.width;

            if (maxWidth == undefined) throw new Error("no max width specified when composing text");

            if (this.composed == this.text.length) return null;

            var startAt = Date.now();

            var text = null,
                info = null;
            var width = this.stringWidth(text = this.text.substr(this.composed));
            if (width <= maxWidth) {
                info = { width: width, contentWidth: width, end: this.composed += text.length, children: text };
            } else {
                var smartTypeText = text.substr(0, Math.floor(text.length * maxWidth / width));
                if (smartTypeText.length > 0) {
                    width = this.stringWidth(text = smartTypeText);
                }

                if (width == maxWidth) {
                    info = { width: width, end: this.composed += text.length, children: text };
                } else if (width < maxWidth) {
                    var index = this.composed + text.length,
                        len = this.text.length;
                    while (width < maxWidth && index < len) {
                        width = this.stringWidth(text += this.text.charAt(index++));
                    }
                } else {
                    while (width > maxWidth && text.length) {
                        width = this.stringWidth(text = text.slice(0, -1));
                    }
                }

                if (text.length) {
                    info = { width: maxWidth, contentWidth: width, end: this.composed += text.length, children: text };
                } else {
                    //@TODO: the space is too small, give a placeholder
                    info = { width: maxWidth, contentWidth: 0, end: this.composed += text.length, children: text };
                }
            }

            info.width = Math.ceil(info.width);
            console.info("text composer total time: " + (_textComposerTime += Date.now() - startAt));
            return Object.assign(info, { fontFamily: this.fontFamily });
        }
    }]);

    return WordWrapper;
}();

exports.default = WordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxvQkFBa0IsQ0FBbEI7O0lBQ2lCO0FBQ2pCLGFBRGlCLFdBQ2pCLENBQVksSUFBWixFQUFrQixLQUFsQixFQUF3Qjs4QkFEUCxhQUNPOztZQUNuQixTQUFxQixNQUFyQixPQURtQjtZQUNSLFdBQVUsTUFBYixHQURXOztBQUUxQixhQUFLLEtBQUwsR0FBVyxLQUFYLENBRjBCO0FBR3BCLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FIb0I7QUFJcEIsYUFBSyxVQUFMLEdBQWdCLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsR0FBcEIsQ0FBd0I7eUJBQU0sT0FBTyxDQUFQLEtBQVcsRUFBWDtTQUFOLENBQXhCLENBQStDLE1BQS9DLENBQXNEO21CQUFHO1NBQUgsQ0FBdEQsQ0FBNEQsSUFBNUQsQ0FBaUUsR0FBakUsQ0FBaEIsQ0FKb0I7QUFLMUIsYUFBSyxJQUFMLEdBQVUsUUFBVixDQUwwQjtBQU1wQixhQUFLLE1BQUwsR0FBWSxLQUFLLElBQUwsQ0FBVSxLQUFLLFVBQUwsRUFBVixDQUFaLENBTm9CO0FBT3BCLGFBQUssUUFBTCxHQUFjLENBQWQsQ0FQb0I7S0FBeEI7O2lCQURpQjs7cUNBV1I7QUFDWCxtQkFBTyxFQUFQLENBRFc7Ozs7b0NBSUEsUUFBTztBQUNsQixtQkFBTyxHQUFQLENBRGtCOzs7O21DQUlNO2dCQUFWLGdCQUFOLE1BQWdCOztBQUNsQixnQkFBRyxZQUFVLFNBQVYsRUFDUixNQUFNLElBQUksS0FBSixDQUFVLDRDQUFWLENBQU4sQ0FESzs7QUFHTixnQkFBRyxLQUFLLFFBQUwsSUFBZSxLQUFLLElBQUwsQ0FBVSxNQUFWLEVBQ1IsT0FBTyxJQUFQLENBRFY7O0FBR00sZ0JBQUksVUFBUSxLQUFLLEdBQUwsRUFBUixDQVBjOztBQVNsQixnQkFBSSxPQUFLLElBQUw7Z0JBQVUsT0FBSyxJQUFMLENBVEk7QUFVbEIsZ0JBQUksUUFBTSxLQUFLLFdBQUwsQ0FBaUIsT0FBSyxLQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLEtBQUssUUFBTCxDQUF0QixDQUF2QixDQVZjO0FBV2xCLGdCQUFHLFNBQU8sUUFBUCxFQUFnQjtBQUNmLHVCQUFLLEVBQUMsWUFBRCxFQUFRLGNBQWEsS0FBYixFQUFvQixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUFqRSxDQURlO2FBQW5CLE1BRUs7QUFDRCxvQkFBSSxnQkFBYyxLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWMsS0FBSyxLQUFMLENBQVcsS0FBSyxNQUFMLEdBQVksUUFBWixHQUFxQixLQUFyQixDQUF6QixDQUFkLENBREg7QUFFVixvQkFBRyxjQUFjLE1BQWQsR0FBcUIsQ0FBckIsRUFBdUI7QUFDekIsNEJBQU0sS0FBSyxXQUFMLENBQWlCLE9BQUssYUFBTCxDQUF2QixDQUR5QjtpQkFBMUI7O0FBSVMsb0JBQUcsU0FBTyxRQUFQLEVBQWdCO0FBQ2YsMkJBQUssRUFBQyxZQUFELEVBQVEsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBN0MsQ0FEZTtpQkFBbkIsTUFFTSxJQUFHLFFBQU0sUUFBTixFQUFlO0FBQ3BCLHdCQUFJLFFBQU0sS0FBSyxRQUFMLEdBQWMsS0FBSyxNQUFMO3dCQUFhLE1BQUksS0FBSyxJQUFMLENBQVUsTUFBVixDQURyQjtBQUVwQiwyQkFBTSxRQUFNLFFBQU4sSUFBa0IsUUFBTSxHQUFOO0FBQ3BCLGdDQUFNLEtBQUssV0FBTCxDQUFpQixRQUFNLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsT0FBakIsQ0FBTixDQUF2QjtxQkFESjtpQkFGRSxNQUlDO0FBQ0gsMkJBQU0sUUFBTSxRQUFOLElBQWtCLEtBQUssTUFBTDtBQUNwQixnQ0FBTSxLQUFLLFdBQUwsQ0FBaUIsT0FBSyxLQUFLLEtBQUwsQ0FBVyxDQUFYLEVBQWEsQ0FBQyxDQUFELENBQWxCLENBQXZCO3FCQURKO2lCQUxFOztBQVNOLG9CQUFHLEtBQUssTUFBTCxFQUFZO0FBQ1gsMkJBQUssRUFBQyxPQUFNLFFBQU4sRUFBZ0IsY0FBYyxLQUFkLEVBQXFCLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQTNFLENBRFc7aUJBQWYsTUFFSzs7QUFDRCwyQkFBSyxFQUFDLE9BQU0sUUFBTixFQUFnQixjQUFhLENBQWIsRUFBZ0IsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBdEUsQ0FEQztpQkFGTDthQW5CSjs7QUEwQk4saUJBQUssS0FBTCxHQUFXLEtBQUssSUFBTCxDQUFVLEtBQUssS0FBTCxDQUFyQixDQXJDd0I7QUFzQ2xCLG9CQUFRLElBQVIsaUNBQTBDLHFCQUFvQixLQUFLLEdBQUwsS0FBVyxPQUFYLENBQTlELEVBdENrQjtBQXVDbEIsbUJBQU8sT0FBTyxNQUFQLENBQWMsSUFBZCxFQUFtQixFQUFDLFlBQVcsS0FBSyxVQUFMLEVBQS9CLENBQVAsQ0F2Q2tCOzs7O1dBbkJMIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF90ZXh0Q29tcG9zZXJUaW1lPTBcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmRXcmFwcGVye1xuICAgIGNvbnN0cnVjdG9yKHRleHQsIHN0eWxlKXtcblx0XHRjb25zdCB7ckZvbnRzLCBzejpmb250U2l6ZX09c3R5bGVcblx0XHR0aGlzLnN0eWxlPXN0eWxlXG4gICAgICAgIHRoaXMudGV4dD10ZXh0XG4gICAgICAgIHRoaXMuZm9udEZhbWlseT1PYmplY3Qua2V5cyhyRm9udHMpLm1hcChhPT5gJHtyRm9udHNbYV18fCcnfWApLmZpbHRlcihhPT5hKS5qb2luKFwiIFwiKVxuXHRcdHRoaXMuc2l6ZT1mb250U2l6ZVxuICAgICAgICB0aGlzLmhlaWdodD1NYXRoLmNlaWwodGhpcy5saW5lSGVpZ2h0KCkpXG4gICAgICAgIHRoaXMuY29tcG9zZWQ9MFxuICAgIH1cblxuXHRsaW5lSGVpZ2h0KCl7XG5cdFx0cmV0dXJuIDI1XG5cdH1cblxuXHRzdHJpbmdXaWR0aChzdHJpbmcpe1xuXHRcdHJldHVybiAyMDBcblx0fVxuXG4gICAgbmV4dCh7d2lkdGg6bWF4V2lkdGh9KXtcbiAgICAgICAgaWYobWF4V2lkdGg9PXVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIG1heCB3aWR0aCBzcGVjaWZpZWQgd2hlbiBjb21wb3NpbmcgdGV4dFwiKVxuXG5cdFx0aWYodGhpcy5jb21wb3NlZD09dGhpcy50ZXh0Lmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgbGV0IHN0YXJ0QXQ9RGF0ZS5ub3coKVxuXG4gICAgICAgIGxldCB0ZXh0PW51bGwsaW5mbz1udWxsXG4gICAgICAgIGxldCB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkKSlcbiAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcbiAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgc21hcnRUeXBlVGV4dD10ZXh0LnN1YnN0cigwLE1hdGguZmxvb3IodGV4dC5sZW5ndGgqbWF4V2lkdGgvd2lkdGgpKVxuXHRcdFx0aWYoc21hcnRUeXBlVGV4dC5sZW5ndGg+MCl7XG5cdFx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD1zbWFydFR5cGVUZXh0KVxuXHRcdFx0fVxuXG4gICAgICAgICAgICBpZih3aWR0aD09bWF4V2lkdGgpe1xuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZSBpZih3aWR0aDxtYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMuY29tcG9zZWQrdGV4dC5sZW5ndGgsIGxlbj10aGlzLnRleHQubGVuZ3RoXG4gICAgICAgICAgICAgICAgd2hpbGUod2lkdGg8bWF4V2lkdGggJiYgaW5kZXg8bGVuKVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXRoaXMudGV4dC5jaGFyQXQoaW5kZXgrKykpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGV4dC5zbGljZSgwLC0xKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGV4dC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZXsvL0BUT0RPOiB0aGUgc3BhY2UgaXMgdG9vIHNtYWxsLCBnaXZlIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aDptYXhXaWR0aCwgY29udGVudFdpZHRoOjAsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cdFx0aW5mby53aWR0aD1NYXRoLmNlaWwoaW5mby53aWR0aClcbiAgICAgICAgY29uc29sZS5pbmZvKGB0ZXh0IGNvbXBvc2VyIHRvdGFsIHRpbWU6ICR7X3RleHRDb21wb3NlclRpbWUrPShEYXRlLm5vdygpLXN0YXJ0QXQpfWApXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGluZm8se2ZvbnRGYW1pbHk6dGhpcy5mb250RmFtaWx5fSlcbiAgICB9XG59XG4iXX0=