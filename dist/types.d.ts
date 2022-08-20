export declare enum Key {
    Shift = "shift",
    Control = "control",
    Command = "cmd",
    Alt = "alt",
    Space = " ",
    Enter = "enter"
}
export declare type ShortcutOptions = {
    prevent: boolean;
    multiPlatform: boolean;
    description: string;
    eventType: keyof WindowEventMap;
};
export declare type Undef<T> = undefined | T;
export declare type BrowserOptions = Partial<{
    capture: Undef<boolean>;
    once: Undef<boolean>;
    passive: Undef<boolean>;
    signal: Undef<AbortSignal>;
}>;
export declare type ShortcutValue = {
    options: ShortcutOptions;
    nativeOptions: BrowserOptions;
    target: (e: KeyboardEvent) => void;
};
export declare type HTMLElementWithEventListener = {
    addEventListener: Window["addEventListener"];
    removeEventListener: Window["removeEventListener"];
};
export declare type ShortcutKeys = (element: HTMLElementWithEventListener) => {
    add: (shortcut: string | string[], handler: (event: KeyboardEvent) => any, options?: ShortcutOptions, nativeOptions?: BrowserOptions) => void;
    remove: (shortcut?: string) => void;
    list: () => Record<string, ShortcutValue>;
};
