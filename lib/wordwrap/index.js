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
            return "'" + rFonts[a] + "'";
        }).join(" ");
        this.size = fontSize;
        this.height = this.lineHeight();
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
                text = text.substr(0, Math.floor(text.length * maxWidth / width));
                width = this.stringWidth(text);

                if (width == maxWidth) {
                    info = { width: width, end: this.composed += text.length, children: text };
                } else if (width < maxWidth) {
                    var index = this.composed + text.length,
                        len = this.text.length;
                    while (width > maxWidth && index < len) {
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

            console.info("text composer total time: " + (_textComposerTime += Date.now() - startAt));
            return Object.assign(info, {
                fontFamily: this.fontFamily,
                fontSize: this.size,
                height: this.height
            });
        }
    }]);

    return WordWrapper;
}();

exports.default = WordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxvQkFBa0IsQ0FBbEI7O0lBQ2lCO0FBQ2pCLGFBRGlCLFdBQ2pCLENBQVksSUFBWixFQUFrQixLQUFsQixFQUF3Qjs4QkFEUCxhQUNPOztZQUNuQixTQUFxQixNQUFyQixPQURtQjtZQUNSLFdBQVUsTUFBYixHQURXOztBQUUxQixhQUFLLEtBQUwsR0FBVyxLQUFYLENBRjBCO0FBR3BCLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FIb0I7QUFJcEIsYUFBSyxVQUFMLEdBQWdCLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsR0FBcEIsQ0FBd0I7eUJBQU8sT0FBTyxDQUFQO1NBQVAsQ0FBeEIsQ0FBNkMsSUFBN0MsQ0FBa0QsR0FBbEQsQ0FBaEIsQ0FKb0I7QUFLMUIsYUFBSyxJQUFMLEdBQVUsUUFBVixDQUwwQjtBQU1wQixhQUFLLE1BQUwsR0FBWSxLQUFLLFVBQUwsRUFBWixDQU5vQjtBQU9wQixhQUFLLFFBQUwsR0FBYyxDQUFkLENBUG9CO0tBQXhCOztpQkFEaUI7O3FDQVdSO0FBQ1gsbUJBQU8sRUFBUCxDQURXOzs7O29DQUlBLFFBQU87QUFDbEIsbUJBQU8sR0FBUCxDQURrQjs7OzttQ0FJTTtnQkFBVixnQkFBTixNQUFnQjs7QUFDbEIsZ0JBQUcsWUFBVSxTQUFWLEVBQ1IsTUFBTSxJQUFJLEtBQUosQ0FBVSw0Q0FBVixDQUFOLENBREs7O0FBR04sZ0JBQUcsS0FBSyxRQUFMLElBQWUsS0FBSyxJQUFMLENBQVUsTUFBVixFQUNSLE9BQU8sSUFBUCxDQURWOztBQUdNLGdCQUFJLFVBQVEsS0FBSyxHQUFMLEVBQVIsQ0FQYzs7QUFTbEIsZ0JBQUksT0FBSyxJQUFMO2dCQUFVLE9BQUssSUFBTCxDQVRJO0FBVWxCLGdCQUFJLFFBQU0sS0FBSyxXQUFMLENBQWlCLE9BQUssS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixLQUFLLFFBQUwsQ0FBdEIsQ0FBdkIsQ0FWYztBQVdsQixnQkFBRyxTQUFPLFFBQVAsRUFBZ0I7QUFDZix1QkFBSyxFQUFDLFlBQUQsRUFBUSxjQUFhLEtBQWIsRUFBb0IsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBakUsQ0FEZTthQUFuQixNQUVLO0FBQ0QsdUJBQUssS0FBSyxNQUFMLENBQVksQ0FBWixFQUFjLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxHQUFZLFFBQVosR0FBcUIsS0FBckIsQ0FBekIsQ0FBTCxDQURDO0FBRUQsd0JBQU0sS0FBSyxXQUFMLENBQWlCLElBQWpCLENBQU4sQ0FGQzs7QUFJRCxvQkFBRyxTQUFPLFFBQVAsRUFBZ0I7QUFDZiwyQkFBSyxFQUFDLFlBQUQsRUFBUSxLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUE3QyxDQURlO2lCQUFuQixNQUVNLElBQUcsUUFBTSxRQUFOLEVBQWU7QUFDcEIsd0JBQUksUUFBTSxLQUFLLFFBQUwsR0FBYyxLQUFLLE1BQUw7d0JBQWEsTUFBSSxLQUFLLElBQUwsQ0FBVSxNQUFWLENBRHJCO0FBRXBCLDJCQUFNLFFBQU0sUUFBTixJQUFrQixRQUFNLEdBQU47QUFDcEIsZ0NBQU0sS0FBSyxXQUFMLENBQWlCLFFBQU0sS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixPQUFqQixDQUFOLENBQXZCO3FCQURKO2lCQUZFLE1BSUM7QUFDSCwyQkFBTSxRQUFNLFFBQU4sSUFBa0IsS0FBSyxNQUFMO0FBQ3BCLGdDQUFNLEtBQUssV0FBTCxDQUFpQixPQUFLLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFDLENBQUQsQ0FBbEIsQ0FBdkI7cUJBREo7aUJBTEU7O0FBU04sb0JBQUcsS0FBSyxNQUFMLEVBQVk7QUFDWCwyQkFBSyxFQUFDLE9BQU0sUUFBTixFQUFnQixjQUFjLEtBQWQsRUFBcUIsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBM0UsQ0FEVztpQkFBZixNQUVLOztBQUNELDJCQUFLLEVBQUMsT0FBTSxRQUFOLEVBQWdCLGNBQWEsQ0FBYixFQUFnQixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUF0RSxDQURDO2lCQUZMO2FBakJKOztBQXdCQSxvQkFBUSxJQUFSLGlDQUEwQyxxQkFBb0IsS0FBSyxHQUFMLEtBQVcsT0FBWCxDQUE5RCxFQW5Da0I7QUFvQ2xCLG1CQUFPLE9BQU8sTUFBUCxDQUFjLElBQWQsRUFBbUI7QUFDOUIsNEJBQVcsS0FBSyxVQUFMO0FBQ1gsMEJBQVMsS0FBSyxJQUFMO0FBQ1Qsd0JBQU8sS0FBSyxNQUFMO2FBSEksQ0FBUCxDQXBDa0I7Ozs7V0FuQkwiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX3RleHRDb21wb3NlclRpbWU9MFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29yZFdyYXBwZXJ7XG4gICAgY29uc3RydWN0b3IodGV4dCwgc3R5bGUpe1xuXHRcdGNvbnN0IHtyRm9udHMsIHN6OmZvbnRTaXplfT1zdHlsZVxuXHRcdHRoaXMuc3R5bGU9c3R5bGVcbiAgICAgICAgdGhpcy50ZXh0PXRleHRcbiAgICAgICAgdGhpcy5mb250RmFtaWx5PU9iamVjdC5rZXlzKHJGb250cykubWFwKGE9PmAnJHtyRm9udHNbYV19J2ApLmpvaW4oXCIgXCIpXG5cdFx0dGhpcy5zaXplPWZvbnRTaXplXG4gICAgICAgIHRoaXMuaGVpZ2h0PXRoaXMubGluZUhlaWdodCgpXG4gICAgICAgIHRoaXMuY29tcG9zZWQ9MFxuICAgIH1cblx0XG5cdGxpbmVIZWlnaHQoKXtcblx0XHRyZXR1cm4gMjVcblx0fVxuXHRcblx0c3RyaW5nV2lkdGgoc3RyaW5nKXtcblx0XHRyZXR1cm4gMjAwXG5cdH1cblx0XG4gICAgbmV4dCh7d2lkdGg6bWF4V2lkdGh9KXtcbiAgICAgICAgaWYobWF4V2lkdGg9PXVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIG1heCB3aWR0aCBzcGVjaWZpZWQgd2hlbiBjb21wb3NpbmcgdGV4dFwiKVxuXHRcdFxuXHRcdGlmKHRoaXMuY29tcG9zZWQ9PXRoaXMudGV4dC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXHRcbiAgICAgICAgbGV0IHN0YXJ0QXQ9RGF0ZS5ub3coKVxuXG4gICAgICAgIGxldCB0ZXh0PW51bGwsaW5mbz1udWxsXG4gICAgICAgIGxldCB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkKSlcbiAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcbiAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0ZXh0PXRleHQuc3Vic3RyKDAsTWF0aC5mbG9vcih0ZXh0Lmxlbmd0aCptYXhXaWR0aC93aWR0aCkpXG4gICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQpXG5cbiAgICAgICAgICAgIGlmKHdpZHRoPT1tYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1lbHNlIGlmKHdpZHRoPG1heFdpZHRoKXtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXg9dGhpcy5jb21wb3NlZCt0ZXh0Lmxlbmd0aCwgbGVuPXRoaXMudGV4dC5sZW5ndGhcbiAgICAgICAgICAgICAgICB3aGlsZSh3aWR0aD5tYXhXaWR0aCAmJiBpbmRleDxsZW4pXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dCs9dGhpcy50ZXh0LmNoYXJBdChpbmRleCsrKSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2hpbGUod2lkdGg+bWF4V2lkdGggJiYgdGV4dC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD10ZXh0LnNsaWNlKDAsLTEpKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0ZXh0Lmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgaW5mbz17d2lkdGg6bWF4V2lkdGgsIGNvbnRlbnRXaWR0aDogd2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1lbHNley8vQFRPRE86IHRoZSBzcGFjZSBpcyB0b28gc21hbGwsIGdpdmUgYSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6MCwgZW5kOnRoaXMuY29tcG9zZWQrPXRleHQubGVuZ3RoLCBjaGlsZHJlbjp0ZXh0fVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5pbmZvKGB0ZXh0IGNvbXBvc2VyIHRvdGFsIHRpbWU6ICR7X3RleHRDb21wb3NlclRpbWUrPShEYXRlLm5vdygpLXN0YXJ0QXQpfWApXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGluZm8se1xuXHRcdFx0XHRmb250RmFtaWx5OnRoaXMuZm9udEZhbWlseSxcblx0XHRcdFx0Zm9udFNpemU6dGhpcy5zaXplLFxuXHRcdFx0XHRoZWlnaHQ6dGhpcy5oZWlnaHRcblx0XHRcdH0pXG4gICAgfVxufVxuIl19