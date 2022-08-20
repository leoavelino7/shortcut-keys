export enum Key {
  Shift = "shift",
  Control = "control",
  Command = "cmd",
  Alt = "alt",
  Space = " ",
  Enter = "enter",
}

export type ShortcutOptions = {
  prevent: boolean;
  multiPlatform: boolean;
  description: string;
  eventType: keyof WindowEventMap;
};

export type Undef<T> = undefined | T;

export type BrowserOptions = Partial<{
  capture: Undef<boolean>;
  once: Undef<boolean>;
  passive: Undef<boolean>;
  signal: Undef<AbortSignal>;
}>;

export type ShortcutValue = {
  options: ShortcutOptions;
  nativeOptions: BrowserOptions;
  target: (e: KeyboardEvent) => void;
};

export type HTMLElementWithEventListener = {
  addEventListener: Window["addEventListener"];
  removeEventListener: Window["removeEventListener"];
};

export type ShortcutKeys = (element: HTMLElementWithEventListener) => {
  add: (
    shortcut: string | string[],
    handler: (event: KeyboardEvent) => any,
    options?: ShortcutOptions,
    nativeOptions?: BrowserOptions
  ) => void;
  remove: (shortcut?: string) => void;
  list: () => Record<string, ShortcutValue>;
};
