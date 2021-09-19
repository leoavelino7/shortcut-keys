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
    var shortcutMap = {};
    var incrementUserAction = function (e, prevent) {
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
        var concatKeys = keys.join("+");
        var eventFound = shortcutMap[concatKeys];
        if (eventFound && prevent) {
            e.preventDefault();
        }
        return concatKeys;
    };
    var add = function (shortcut, handler, prevent, description) {
        if (prevent === void 0) { prevent = false; }
        if (description === void 0) { description = ""; }
        shortcutMap[shortcut] = {
            description: description,
            target: function (e) {
                return incrementUserAction(e, prevent) === shortcut ? handler(e) : undefined;
            },
        };
        element.addEventListener("keydown", shortcutMap[shortcut].target);
    };
    var remove = function (shortcut) {
        var _a;
        element.removeEventListener("keydown", (_a = shortcutMap[shortcut]) === null || _a === void 0 ? void 0 : _a.target);
    };
    var list = function () { return shortcutMap; };
    return { add: add, remove: remove, list: list };
};

exports.shortcutKeys = shortcutKeys;
