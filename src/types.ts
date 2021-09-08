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

export type CommandLevel = {
  commandKey: string;
  commands: Shortcut[];
  action: Function;
  actionName?: string;
};
