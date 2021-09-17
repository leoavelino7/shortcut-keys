var Key;
(function (Key) {
    Key["Shift"] = "shift";
    Key["Control"] = "control";
    Key["Command"] = "cmd";
    Key["Alt"] = "alt";
    Key["Space"] = "space";
    Key["Enter"] = "enter";
})(Key || (Key = {}));
var excludes = [Key.Control, Key.Shift, Key.Alt];
var shortcutKeys = function (element) {
    var incrementUserAction = function (e) {
        var key = e.key.toLowerCase();
        var keys = [];
        if ((e.ctrlKey || e.shiftKey || e.altKey) && excludes.includes(key)) {
            return;
        }
        if (e.ctrlKey || e.metaKey)
            keys.push(Key.Control);
        if (e.shiftKey)
            keys.push(Key.Shift);
        if (e.altKey)
            keys.push(Key.Alt);
        if (e.code === Key.Space)
            keys.push(Key.Space);
        if (e.code === Key.Enter)
            keys.push(Key.Enter);
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

export { Key, shortcutKeys };
