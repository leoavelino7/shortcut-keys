export enum Key {
  Shift = "shift",
  Control = "control",
  Command = "cmd",
  Alt = "alt",
  Space = "space",
  Enter = "enter",
}

type ModKeys = Key.Control | Key.Alt | Key.Command | Key.Shift;

export type Shortcut = `${ModKeys}+${string}`;

const excludes: string[] = [Key.Control, Key.Shift, Key.Alt];

type HTMLElementWithEventListener = {
  addEventListener: Window["addEventListener"];
  removeEventListener: Window["removeEventListener"];
};

export const shortcutKeys = (element: HTMLElementWithEventListener) => {
  const incrementUserAction = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    let keys = [];

    if ((e.ctrlKey || e.shiftKey || e.altKey) && excludes.includes(key)) {
      return;
    }

    if (e.ctrlKey || e.metaKey) keys.push(Key.Control);
    if (e.shiftKey) keys.push(Key.Shift);
    if (e.altKey) keys.push(Key.Alt);

    if (e.code === Key.Space) keys.push(Key.Space);
    if (e.code === Key.Enter) keys.push(Key.Enter);

    if (key) keys.push(key);

    keys = keys.map((key) => key.trim()).filter(Boolean);

    return keys.join("+");
  };

  const shortcutMap: Record<string, (e: KeyboardEvent) => void> = {};

  const add = (shortcut: Shortcut, handler: Function, prevent = false) => {
    
    shortcutMap[shortcut] = (e) => incrementUserAction(e) === shortcut ? handler(e) : undefined;
      
    element.addEventListener("keydown", shortcutMap[shortcut], { passive: prevent });
  };

  const remove = (shortcut: string) => {
    element.removeEventListener("keydown", shortcutMap[shortcut]);
  };

  return { add, remove, shortcutMap };
};
