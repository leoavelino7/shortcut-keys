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
export declare type CommandLevel = {
    commandKey: string;
    commands: Shortcut[];
    action: Function;
    actionName?: string;
};
export {};
