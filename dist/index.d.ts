export declare enum Key {
    Shift = "shift",
    Control = "control",
    Command = "cmd",
    Alt = "alt",
    Space = "space",
    Enter = "enter"
}
declare type ModKeys = Key.Control | Key.Alt | Key.Command | Key.Shift;
export declare type Shortcut = `${ModKeys}+${string}`;
declare type HTMLElementWithEventListener = {
    addEventListener: Window["addEventListener"];
    removeEventListener: Window["removeEventListener"];
};
export declare const shortcutKeys: (element: HTMLElementWithEventListener) => {
    add: (shortcut: Shortcut, handler: Function, prevent?: boolean) => void;
    remove: (shortcut: string) => void;
    shortcutMap: Record<string, (e: KeyboardEvent) => void>;
};
export {};
