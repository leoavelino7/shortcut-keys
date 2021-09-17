'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.Key = void 0;
(function (Key) {
    Key["Shift"] = "shift";
    Key["Control"] = "control";
    Key["Command"] = "cmd";
    Key["Alt"] = "alt";
    Key["Space"] = "space";
    Key["Enter"] = "enter";
})(exports.Key || (exports.Key = {}));
var excludes = [exports.Key.Control, exports.Key.Shift, exports.Key.Alt];
var shortcutKeys = function (element) {
    var incrementUserAction = function (e) {
        var key = e.key.toLowerCase();
        var keys = [];
        if ((e.ctrlKey || e.shiftKey || e.altKey) && excludes.includes(key)) {
            return;
        }
        if (e.ctrlKey || e.metaKey)
            keys.push(exports.Key.Control);
        if (e.shiftKey)
            keys.push(exports.Key.Shift);
        if (e.altKey)
            keys.push(exports.Key.Alt);
        if (e.code === exports.Key.Space)
            keys.push(exports.Key.Space);
        if (e.code === exports.Key.Enter)
            keys.push(exports.Key.Enter);
        if (key)
            keys.push(key);
        keys = keys.map(function (key) { return key.trim(); }).filter(Boolean);
        return keys.join("+");
    };
    var shortcutMap = {};
    var add = function (shortcut, handler, prevent) {
        if (prevent === void 0) { prevent = false; }
        shortcutMap[shortcut] = function (e) { return incrementUserAction(e) === shortcut ? handler(e) : undefined; };
        element.addEventListener("keydown", shortcutMap[shortcut], { passive: prevent });
    };
    var remove = function (shortcut) {
        element.removeEventListener("keydown", shortcutMap[shortcut]);
    };
    return { add: add, remove: remove, shortcutMap: shortcutMap };
};

exports.shortcutKeys = shortcutKeys;
