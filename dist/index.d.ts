import { Shortcut } from "./types";
declare class ShortcutKeys {
    private commandsHistory;
    private level;
    private commandsLevels;
    private commandsMap;
    private isSubscribed;
    constructor();
    private incrementUserAction;
    private clearUserAction;
    private handleEvent;
    private subscribe;
    unsubscribe(): void;
    add(combinationsKeys: Shortcut | Shortcut[], event: Function, actionName?: string): void;
    remove(combinationsKeys: string | string[]): void;
}
declare const _default: ShortcutKeys;
export default _default;
