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
var ShortcutKeys = /** @class */ (function () {
    function ShortcutKeys() {
        var _this = this;
        this.commandsHistory = "";
        this.level = 0;
        this.commandsLevels = {};
        this.commandsMap = new Map();
        this.incrementUserAction = function (e) {
            var key = e.key.toLowerCase();
            var keys = [];
            if ((e.ctrlKey || e.shiftKey || e.altKey) && excludes.includes(key)) {
                return;
            }
            if (e.shiftKey)
                keys.push(Key.Shift);
            if (e.ctrlKey || e.metaKey)
                keys.push(Key.Control);
            if (e.altKey)
                keys.push(Key.Alt);
            if (e.code === Key.Space)
                keys.push(Key.Space);
            if (e.code === Key.Enter)
                keys.push(Key.Enter);
            if (key)
                keys.push(key);
            keys = keys.map(function (key) { return key.trim(); }).filter(Boolean);
            var action = keys.join("+");
            _this.level += keys.length;
            _this.commandsHistory += action;
        };
        this.clearUserAction = function () {
            _this.commandsHistory = "";
            _this.level = 0;
        };
        this.handleEvent = function (e) {
            var _a;
            e.preventDefault();
            _this.incrementUserAction(e);
            var currentLevelList = _this.commandsLevels["" + _this.level];
            if (currentLevelList) {
                if (currentLevelList.includes(_this.commandsHistory)) {
                    (_a = _this.commandsMap.get(_this.commandsHistory)) === null || _a === void 0 ? void 0 : _a.action();
                    _this.clearUserAction();
                }
            }
            else {
                _this.clearUserAction();
            }
        };
        this.isSubscribed = false;
        this.subscribe();
    }
    ShortcutKeys.prototype.subscribe = function () {
        if (!this.isSubscribed && typeof window !== "undefined") {
            this.isSubscribed = true;
            window.addEventListener("keydown", this.handleEvent);
        }
    };
    ShortcutKeys.prototype.unsubscribe = function () {
        if (this.isSubscribed && typeof window !== "undefined") {
            this.isSubscribed = false;
            window.removeEventListener("keydown", this.handleEvent);
        }
    };
    ShortcutKeys.prototype.add = function (combinationsKeys, event, actionName) {
        var _this = this;
        if (actionName === void 0) { actionName = ""; }
        var combinations = combinationsKeys instanceof Array ? combinationsKeys : [combinationsKeys];
        combinations.forEach(function (commandKey) {
            var commandsSplit = commandKey
                .replace(/\s+/g, "")
                .split("+");
            var level = commandsSplit.length;
            if (!_this.commandsLevels.hasOwnProperty(level)) {
                _this.commandsLevels["" + level] = [];
            }
            _this.commandsLevels["" + level].push(commandKey);
            _this.commandsMap.set(commandKey, {
                commandKey: commandKey,
                commands: commandsSplit,
                action: event,
                actionName: actionName,
            });
        });
    };
    ShortcutKeys.prototype.remove = function (combinationsKeys) {
        var _this = this;
        var combinations = combinationsKeys instanceof Array ? combinationsKeys : [combinationsKeys];
        combinations.forEach(function (commandKey) {
            _this.commandsMap.delete(commandKey);
        });
    };
    return ShortcutKeys;
}());
var index = new ShortcutKeys();

export { index as default };
