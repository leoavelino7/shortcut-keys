var Key;
(function (Key) {
    Key["Shift"] = "shift";
    Key["Control"] = "control";
    Key["Command"] = "cmd";
    Key["Alt"] = "alt";
    Key["Space"] = " ";
    Key["Enter"] = "enter";
})(Key || (Key = {}));
var excludes = [Key.Control, Key.Shift, Key.Alt];
var shortcutKeys = function (element) {
    var shortcutMap = {};
    var hasKey = function (obj, key) { return Object.prototype.hasOwnProperty.call(obj, key); };
    var incrementUserAction = function (e, options) {
        var key = e.key.toLowerCase();
        var keys = [];
        if ((e.ctrlKey || e.shiftKey || e.altKey) && excludes.includes(key)) {
            return;
        }
        if (options.multiPlatform && (e.ctrlKey || e.metaKey))
            keys.push(Key.Control);
        else if (e.ctrlKey)
            keys.push(Key.Control);
        else if (e.metaKey)
            keys.push(Key.Command);
        if (e.shiftKey)
            keys.push(Key.Shift);
        if (e.altKey)
            keys.push(Key.Alt);
        if (key === Key.Space)
            keys.push("space");
        if (key === Key.Enter)
            keys.push(Key.Enter);
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
    var add = function (shortcut, handler, options, nativeOptions) {
        if (options === void 0) { options = {
            description: "",
            multiPlatform: true,
            prevent: true,
            eventType: "keydown",
        }; }
        if (nativeOptions === void 0) { nativeOptions = {
            capture: undefined,
            once: undefined,
            passive: undefined,
            signal: undefined,
        }; }
        var shortcuts = Array.isArray(shortcut) ? shortcut : [shortcut];
        shortcuts.forEach(function (shortcutItem) {
            var key = shortcutItem.toLowerCase().trim();
            shortcutMap[key] = {
                nativeOptions: nativeOptions,
                options: options,
                target: function (e) {
                    return incrementUserAction(e, options) === key
                        ? handler(e)
                        : undefined;
                },
            };
            element.addEventListener(options.eventType, shortcutMap[key].target, nativeOptions);
        });
    };
    var remove = function (shortcut) {
        if (shortcut === void 0) { shortcut = "all"; }
        if (shortcut === "all") {
            return Object.entries(shortcutMap).forEach(function (_a) {
                _a[0]; var _b = _a[1], target = _b.target, options = _b.options, nativeOptions = _b.nativeOptions;
                element.removeEventListener(options.eventType, target, nativeOptions);
            });
        }
        if (!hasKey(shortcutMap, shortcut))
            return;
        return element.removeEventListener(shortcutMap[shortcut].options.eventType, shortcutMap[shortcut].target);
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

export { Key, shortcutKeys };
