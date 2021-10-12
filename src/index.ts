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

const excludes: string[] = [Key.Control, Key.Shift, Key.Alt];

type Undef<T> = undefined | T;

type BrowserOptions = Partial<{
  capture: Undef<boolean>;
  once: Undef<boolean>;
  passive: Undef<boolean>;
  signal: Undef<AbortSignal>;
}>;

type ShortcutValue = {
  options: ShortcutOptions;
  nativeOptions: BrowserOptions;
  target: (e: KeyboardEvent) => void;
};

type HTMLElementWithEventListener = {
  addEventListener: Window["addEventListener"];
  removeEventListener: Window["removeEventListener"];
};

export const shortcutKeys = (element: HTMLElementWithEventListener) => {
  const shortcutMap: Record<string, ShortcutValue> = {};

  const hasKey = <T, K extends keyof T>(obj: T, key: K) => Object.prototype.hasOwnProperty.call(obj, key);

  const incrementUserAction = (e: KeyboardEvent, options: ShortcutOptions) => {
    const key = e.key.toLowerCase();

    let keys = [];

    if ((e.ctrlKey || e.shiftKey || e.altKey) && excludes.includes(key)) {
      return;
    }

    if (options.multiPlatform && (e.ctrlKey || e.metaKey))
      keys.push(Key.Control);
    else if (e.ctrlKey) keys.push(Key.Control);
    else if (e.metaKey) keys.push(Key.Command);

    if (e.shiftKey) keys.push(Key.Shift);
    if (e.altKey) keys.push(Key.Alt);

    if (key === Key.Space) keys.push("space");
    if (key === Key.Enter) keys.push(Key.Enter);

    if (key) keys.push(key);
    
    keys = keys.map((key) => key.trim()).filter(Boolean);

    const concatKeys = keys.join("+");

    const eventFound = shortcutMap[concatKeys];

    if (eventFound && options.prevent) {
      e.preventDefault();
    }

    return concatKeys;
  };

  const add = (
    shortcut: string | string[],
    handler: (ev: KeyboardEvent) => any,
    options: ShortcutOptions = {
      description: "",
      multiPlatform: true,
      prevent: true,
      eventType: "keydown",
    },
    nativeOptions: BrowserOptions = {
      capture: undefined,
      once: undefined,
      passive: undefined,
      signal: undefined,
    },
  ): void => {
    const shortcuts = Array.isArray(shortcut) ? shortcut : [shortcut];

    shortcuts.forEach((shortcutItem) => {
      const key = shortcutItem.toLowerCase().trim();
      
      shortcutMap[key] = {
        nativeOptions,
        options,
        target: (e) =>
          incrementUserAction(e, options) === key
            ? handler(e)
            : undefined,
      };

      element.addEventListener(
        options.eventType as any,
        shortcutMap[key].target,
        nativeOptions
      );
    });
  };

  const remove = (shortcut: string = "all"): void => {
    if (shortcut === "all") {
      return Object.entries(shortcutMap).forEach(
        ([_, { target, options, nativeOptions }]) => {
          element.removeEventListener(options.eventType as any, target, nativeOptions);
        }
      );
    }
    if (!hasKey(shortcutMap, shortcut)) return;
    return element.removeEventListener(shortcutMap[shortcut].options.eventType as any, shortcutMap[shortcut].target);
  };

  const list = () => shortcutMap;

  return {
    /**
     * @description Add event to element
     * @param shortcut - Required - Shortcut to trigger action. Example: "control+h" or ["control+h", "control+shift+h"]
     * @param handler - Required - Action triggered when shortcut is triggered. Example: () => console.log("hello");
     * @param options - Optional - Extra settings. Read the documentation {@link "https://www.npmjs.com/package/shortcut-keys"}
     */
    add,
    /**
     * @description Remove exists event to element
     * @param shortcut - Optional - Shortcut to trigger action. Example: "control+h" or ["control+h", "control+shift+h"]. When there is no data, all element events will be removed.
     */
    remove,
    /**
     * @description List all events of element
     * @returns Object with all active event information
     */
    list,
  };
};