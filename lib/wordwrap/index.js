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
            return "" + rFonts[a];
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
            return Object.assign(info, {
                fontFamily: this.fontFamily,
                fontSize: this.size + "px",
                height: this.height
            });
        }
    }]);

    return WordWrapper;
}();

exports.default = WordWrapper;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93b3Jkd3JhcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxvQkFBa0IsQ0FBbEI7O0lBQ2lCO0FBQ2pCLGFBRGlCLFdBQ2pCLENBQVksSUFBWixFQUFrQixLQUFsQixFQUF3Qjs4QkFEUCxhQUNPOztZQUNuQixTQUFxQixNQUFyQixPQURtQjtZQUNSLFdBQVUsTUFBYixHQURXOztBQUUxQixhQUFLLEtBQUwsR0FBVyxLQUFYLENBRjBCO0FBR3BCLGFBQUssSUFBTCxHQUFVLElBQVYsQ0FIb0I7QUFJcEIsYUFBSyxVQUFMLEdBQWdCLE9BQU8sSUFBUCxDQUFZLE1BQVosRUFBb0IsR0FBcEIsQ0FBd0I7d0JBQU0sT0FBTyxDQUFQO1NBQU4sQ0FBeEIsQ0FBMkMsTUFBM0MsQ0FBa0Q7bUJBQUc7U0FBSCxDQUFsRCxDQUF3RCxJQUF4RCxDQUE2RCxHQUE3RCxDQUFoQixDQUpvQjtBQUsxQixhQUFLLElBQUwsR0FBVSxRQUFWLENBTDBCO0FBTXBCLGFBQUssTUFBTCxHQUFZLEtBQUssSUFBTCxDQUFVLEtBQUssVUFBTCxFQUFWLENBQVosQ0FOb0I7QUFPcEIsYUFBSyxRQUFMLEdBQWMsQ0FBZCxDQVBvQjtLQUF4Qjs7aUJBRGlCOztxQ0FXUjtBQUNYLG1CQUFPLEVBQVAsQ0FEVzs7OztvQ0FJQSxRQUFPO0FBQ2xCLG1CQUFPLEdBQVAsQ0FEa0I7Ozs7bUNBSU07Z0JBQVYsZ0JBQU4sTUFBZ0I7O0FBQ2xCLGdCQUFHLFlBQVUsU0FBVixFQUNSLE1BQU0sSUFBSSxLQUFKLENBQVUsNENBQVYsQ0FBTixDQURLOztBQUdOLGdCQUFHLEtBQUssUUFBTCxJQUFlLEtBQUssSUFBTCxDQUFVLE1BQVYsRUFDUixPQUFPLElBQVAsQ0FEVjs7QUFHTSxnQkFBSSxVQUFRLEtBQUssR0FBTCxFQUFSLENBUGM7O0FBU2xCLGdCQUFJLE9BQUssSUFBTDtnQkFBVSxPQUFLLElBQUwsQ0FUSTtBQVVsQixnQkFBSSxRQUFNLEtBQUssV0FBTCxDQUFpQixPQUFLLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsS0FBSyxRQUFMLENBQXRCLENBQXZCLENBVmM7QUFXbEIsZ0JBQUcsU0FBTyxRQUFQLEVBQWdCO0FBQ2YsdUJBQUssRUFBQyxZQUFELEVBQVEsY0FBYSxLQUFiLEVBQW9CLEtBQUksS0FBSyxRQUFMLElBQWUsS0FBSyxNQUFMLEVBQWEsVUFBUyxJQUFULEVBQWpFLENBRGU7YUFBbkIsTUFFSztBQUNELG9CQUFJLGdCQUFjLEtBQUssTUFBTCxDQUFZLENBQVosRUFBYyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsR0FBWSxRQUFaLEdBQXFCLEtBQXJCLENBQXpCLENBQWQsQ0FESDtBQUVWLG9CQUFHLGNBQWMsTUFBZCxHQUFxQixDQUFyQixFQUF1QjtBQUN6Qiw0QkFBTSxLQUFLLFdBQUwsQ0FBaUIsT0FBSyxhQUFMLENBQXZCLENBRHlCO2lCQUExQjs7QUFJUyxvQkFBRyxTQUFPLFFBQVAsRUFBZ0I7QUFDZiwyQkFBSyxFQUFDLFlBQUQsRUFBUSxLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUE3QyxDQURlO2lCQUFuQixNQUVNLElBQUcsUUFBTSxRQUFOLEVBQWU7QUFDcEIsd0JBQUksUUFBTSxLQUFLLFFBQUwsR0FBYyxLQUFLLE1BQUw7d0JBQWEsTUFBSSxLQUFLLElBQUwsQ0FBVSxNQUFWLENBRHJCO0FBRXBCLDJCQUFNLFFBQU0sUUFBTixJQUFrQixRQUFNLEdBQU47QUFDcEIsZ0NBQU0sS0FBSyxXQUFMLENBQWlCLFFBQU0sS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixPQUFqQixDQUFOLENBQXZCO3FCQURKO2lCQUZFLE1BSUM7QUFDSCwyQkFBTSxRQUFNLFFBQU4sSUFBa0IsS0FBSyxNQUFMO0FBQ3BCLGdDQUFNLEtBQUssV0FBTCxDQUFpQixPQUFLLEtBQUssS0FBTCxDQUFXLENBQVgsRUFBYSxDQUFDLENBQUQsQ0FBbEIsQ0FBdkI7cUJBREo7aUJBTEU7O0FBU04sb0JBQUcsS0FBSyxNQUFMLEVBQVk7QUFDWCwyQkFBSyxFQUFDLE9BQU0sUUFBTixFQUFnQixjQUFjLEtBQWQsRUFBcUIsS0FBSSxLQUFLLFFBQUwsSUFBZSxLQUFLLE1BQUwsRUFBYSxVQUFTLElBQVQsRUFBM0UsQ0FEVztpQkFBZixNQUVLOztBQUNELDJCQUFLLEVBQUMsT0FBTSxRQUFOLEVBQWdCLGNBQWEsQ0FBYixFQUFnQixLQUFJLEtBQUssUUFBTCxJQUFlLEtBQUssTUFBTCxFQUFhLFVBQVMsSUFBVCxFQUF0RSxDQURDO2lCQUZMO2FBbkJKOztBQTBCTixpQkFBSyxLQUFMLEdBQVcsS0FBSyxJQUFMLENBQVUsS0FBSyxLQUFMLENBQXJCLENBckN3QjtBQXNDbEIsb0JBQVEsSUFBUixpQ0FBMEMscUJBQW9CLEtBQUssR0FBTCxLQUFXLE9BQVgsQ0FBOUQsRUF0Q2tCO0FBdUNsQixtQkFBTyxPQUFPLE1BQVAsQ0FBYyxJQUFkLEVBQW1CO0FBQzlCLDRCQUFXLEtBQUssVUFBTDtBQUNYLDBCQUFTLEtBQUssSUFBTCxHQUFVLElBQVY7QUFDVCx3QkFBTyxLQUFLLE1BQUw7YUFISSxDQUFQLENBdkNrQjs7OztXQW5CTCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfdGV4dENvbXBvc2VyVGltZT0wXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JkV3JhcHBlcntcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBzdHlsZSl7XG5cdFx0Y29uc3Qge3JGb250cywgc3o6Zm9udFNpemV9PXN0eWxlXG5cdFx0dGhpcy5zdHlsZT1zdHlsZVxuICAgICAgICB0aGlzLnRleHQ9dGV4dFxuICAgICAgICB0aGlzLmZvbnRGYW1pbHk9T2JqZWN0LmtleXMockZvbnRzKS5tYXAoYT0+YCR7ckZvbnRzW2FdfWApLmZpbHRlcihhPT5hKS5qb2luKFwiIFwiKVxuXHRcdHRoaXMuc2l6ZT1mb250U2l6ZVxuICAgICAgICB0aGlzLmhlaWdodD1NYXRoLmNlaWwodGhpcy5saW5lSGVpZ2h0KCkpXG4gICAgICAgIHRoaXMuY29tcG9zZWQ9MFxuICAgIH1cblx0XG5cdGxpbmVIZWlnaHQoKXtcblx0XHRyZXR1cm4gMjVcblx0fVxuXHRcblx0c3RyaW5nV2lkdGgoc3RyaW5nKXtcblx0XHRyZXR1cm4gMjAwXG5cdH1cblx0XG4gICAgbmV4dCh7d2lkdGg6bWF4V2lkdGh9KXtcbiAgICAgICAgaWYobWF4V2lkdGg9PXVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm5vIG1heCB3aWR0aCBzcGVjaWZpZWQgd2hlbiBjb21wb3NpbmcgdGV4dFwiKVxuXHRcdFxuXHRcdGlmKHRoaXMuY29tcG9zZWQ9PXRoaXMudGV4dC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXHRcbiAgICAgICAgbGV0IHN0YXJ0QXQ9RGF0ZS5ub3coKVxuXG4gICAgICAgIGxldCB0ZXh0PW51bGwsaW5mbz1udWxsXG4gICAgICAgIGxldCB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGhpcy50ZXh0LnN1YnN0cih0aGlzLmNvbXBvc2VkKSlcbiAgICAgICAgaWYod2lkdGg8PW1heFdpZHRoKXtcbiAgICAgICAgICAgIGluZm89e3dpZHRoLCBjb250ZW50V2lkdGg6d2lkdGgsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgc21hcnRUeXBlVGV4dD10ZXh0LnN1YnN0cigwLE1hdGguZmxvb3IodGV4dC5sZW5ndGgqbWF4V2lkdGgvd2lkdGgpKVxuXHRcdFx0aWYoc21hcnRUeXBlVGV4dC5sZW5ndGg+MCl7XG5cdFx0XHRcdHdpZHRoPXRoaXMuc3RyaW5nV2lkdGgodGV4dD1zbWFydFR5cGVUZXh0KVxuXHRcdFx0fVxuXG4gICAgICAgICAgICBpZih3aWR0aD09bWF4V2lkdGgpe1xuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZSBpZih3aWR0aDxtYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4PXRoaXMuY29tcG9zZWQrdGV4dC5sZW5ndGgsIGxlbj10aGlzLnRleHQubGVuZ3RoXG4gICAgICAgICAgICAgICAgd2hpbGUod2lkdGg8bWF4V2lkdGggJiYgaW5kZXg8bGVuKVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQrPXRoaXMudGV4dC5jaGFyQXQoaW5kZXgrKykpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdoaWxlKHdpZHRoPm1heFdpZHRoICYmIHRleHQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD10aGlzLnN0cmluZ1dpZHRoKHRleHQ9dGV4dC5zbGljZSgwLC0xKSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodGV4dC5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIGluZm89e3dpZHRoOm1heFdpZHRoLCBjb250ZW50V2lkdGg6IHdpZHRoLCBlbmQ6dGhpcy5jb21wb3NlZCs9dGV4dC5sZW5ndGgsIGNoaWxkcmVuOnRleHR9XG4gICAgICAgICAgICB9ZWxzZXsvL0BUT0RPOiB0aGUgc3BhY2UgaXMgdG9vIHNtYWxsLCBnaXZlIGEgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgICBpbmZvPXt3aWR0aDptYXhXaWR0aCwgY29udGVudFdpZHRoOjAsIGVuZDp0aGlzLmNvbXBvc2VkKz10ZXh0Lmxlbmd0aCwgY2hpbGRyZW46dGV4dH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHRcdFxuXHRcdGluZm8ud2lkdGg9TWF0aC5jZWlsKGluZm8ud2lkdGgpXG4gICAgICAgIGNvbnNvbGUuaW5mbyhgdGV4dCBjb21wb3NlciB0b3RhbCB0aW1lOiAke190ZXh0Q29tcG9zZXJUaW1lKz0oRGF0ZS5ub3coKS1zdGFydEF0KX1gKVxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihpbmZvLHtcblx0XHRcdFx0Zm9udEZhbWlseTp0aGlzLmZvbnRGYW1pbHksXG5cdFx0XHRcdGZvbnRTaXplOnRoaXMuc2l6ZStcInB4XCIsXG5cdFx0XHRcdGhlaWdodDp0aGlzLmhlaWdodFxuXHRcdFx0fSlcbiAgICB9XG59XG4iXX0=