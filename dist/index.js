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
    var incrementUserAction = function (e, options) {
        var key = e.key.toLowerCase();
        var keys = [];
        if ((e.ctrlKey || e.shiftKey || e.altKey) && excludes.includes(key)) {
            return;
        }
        if (options.multiPlatform && (e.ctrlKey || e.metaKey))
            keys.push(exports.Key.Control);
        else if (e.ctrlKey)
            keys.push(exports.Key.Control);
        else if (e.metaKey)
            keys.push(exports.Key.Command);
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
        if (eventFound && options.prevent) {
            e.preventDefault();
        }
        return concatKeys;
    };
    var add = function (shortcut, handler, options) {
        if (options === void 0) { options = {
            description: "",
            multiPlatform: true,
            prevent: true,
        }; }
        var shortcuts = typeof shortcut === "object" ? shortcut : [shortcut];
        shortcuts.forEach(function (shortcutItem) {
            shortcutMap[shortcutItem] = {
                options: options,
                target: function (e) {
                    return incrementUserAction(e, options) === shortcutItem
                        ? handler(e)
                        : undefined;
                },
            };
            element.addEventListener("keydown", shortcutMap[shortcutItem].target);
        });
    };
    var remove = function (shortcut) {
        var _a;
        if (shortcut === void 0) { shortcut = "all"; }
        if (shortcutMap) {
            if (shortcut === "all") {
                Object.entries(shortcutMap).forEach(function (_a) {
                    _a[0]; var target = _a[1].target;
                    element.removeEventListener("keydown", target);
                });
            }
            else {
                element.removeEventListener("keydown", (_a = shortcutMap[shortcut]) === null || _a === void 0 ? void 0 : _a.target);
            }
        }
    };
    var list = function () { return shortcutMap; };
    return {
        /**
         * @description Add event to element
         * @param shortcut - Required - Shortcut to trigger action. Example: "control+h" or ["control+h", "control+shift+h"]
         * @param handler - Required - Action triggered when shortcut is triggered. Example: () => console.log("hello");
         * @param options - Optional - Extra settings. Read the documentation {@link "https://www.npmjs.com/package/shortcut-keys"}
         */
        add: add,
        /**
         * @description Remove exists event to element
         * @param shortcut - Optional - Shortcut to trigger action. Example: "control+h" or ["control+h", "control+shift+h"]. When there is no data, all element events will be removed.
         */
        remove: remove,
        /**
         * @description List all events of element
         * @returns Object with all active event information
         */
        list: list,
    };
};

exports.shortcutKeys = shortcutKeys;
