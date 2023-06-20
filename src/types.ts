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
  options: Partial<ShortcutOptions>;
  nativeOptions: BrowserOptions;
  target: EventListener;
};