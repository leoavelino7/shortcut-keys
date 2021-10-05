export enum Key {
  Shift = "shift",
  Control = "control",
  Command = "cmd",
  Alt = "alt",
  Space = "space",
  Enter = "enter",
}

export type ShortcutOptions = {
  prevent: boolean;
  multiPlatform: boolean;
  description: string;
  eventType: keyof WindowEventMap;
};

const excludes: string[] = [Key.Control, Key.Shift, Key.Alt];

type ShortcutValue = {
  options: ShortcutOptions;
  target: (e: KeyboardEvent) => void;
};

type HTMLElementWithEventListener = {
  addEventListener: Window["addEventListener"];
  removeEventListener: Window["removeEventListener"];
};

export const shortcutKeys = (element: HTMLElementWithEventListener) => {
  const shortcutMap: Record<string, ShortcutValue> = {};

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

    if (e.code === Key.Space) keys.push(Key.Space);
    if (e.code === Key.Enter) keys.push(Key.Enter);

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
    handler: Function,
    options: ShortcutOptions = {
      description: "",
      multiPlatform: true,
      prevent: true,
      eventType: "keydown",
    }
  ) => {
    const shortcuts = typeof shortcut === "object" ? shortcut : [shortcut];

    shortcuts.forEach((shortcutItem) => {
      shortcutMap[shortcutItem] = {
        options: options,
        target: (e) =>
          incrementUserAction(e, options) === shortcutItem
            ? handler(e)
            : undefined,
      };

      element.addEventListener(
        options.eventType as any,
        shortcutMap[shortcutItem].target
      );
    });
  };

  const remove = (shortcut: string = "all") => {
    if (shortcutMap) {
      if (shortcut === "all") {
        Object.entries(shortcutMap).forEach(([_, { target, options }]) => {
          element.removeEventListener(options.eventType as any, target);
        });
      } else {
        element.removeEventListener(
          shortcutMap[shortcut].options.eventType as any,
          shortcutMap[shortcut]?.target
        );
      }
    }
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
