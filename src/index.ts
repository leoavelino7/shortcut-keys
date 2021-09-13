import { CommandLevel, Key, Shortcut } from "./types";

const excludes: string[] = [Key.Control, Key.Shift, Key.Alt];

class ShortcutKeys {
  private commandsHistory = "";
  private level = 0;
  private commandsLevels: Record<string, string[]> = {};
  private commandsMap = new Map<string, CommandLevel>();
  private isSubscribed: boolean;

  constructor() {
    this.isSubscribed = false;
    this.subscribe();
  }

  private incrementUserAction = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    let keys = [];

    if ((e.ctrlKey || e.shiftKey || e.altKey) && excludes.includes(key)) {
      return;
    }

    if (e.shiftKey) keys.push(Key.Shift);
    if (e.ctrlKey || e.metaKey) keys.push(Key.Control);
    if (e.altKey) keys.push(Key.Alt);

    if (e.code === Key.Space) keys.push(Key.Space);
    if (e.code === Key.Enter) keys.push(Key.Enter);

    if (key) keys.push(key);

    keys = keys.map((key) => key.trim()).filter(Boolean);

    const action = keys.join("+");

    this.level += keys.length;

    this.commandsHistory += action;
  };

  private clearUserAction = () => {
    this.commandsHistory = "";
    this.level = 0;
  };

  private handleEvent = (e: KeyboardEvent) => {
    e.preventDefault();

    this.incrementUserAction(e);

    const currentLevelList = this.commandsLevels[`${this.level}`];

    if (currentLevelList) {
      if (currentLevelList.includes(this.commandsHistory)) {
        this.commandsMap.get(this.commandsHistory)?.action();
        this.clearUserAction();
      }
    } else {
      this.clearUserAction();
    }
  };

  private subscribe() {
    if (!this.isSubscribed && typeof window !== "undefined") {
      this.isSubscribed = true;
      window.addEventListener("keydown", this.handleEvent);
    }
  }

  unsubscribe() {
    if (this.isSubscribed && typeof window !== "undefined") {
      this.isSubscribed = false;
      window.removeEventListener("keydown", this.handleEvent);
    }
  }

  add(
    combinationsKeys: Shortcut | Shortcut[],
    event: Function,
    actionName: string = ""
  ) {
    const combinations =
      combinationsKeys instanceof Array ? combinationsKeys : [combinationsKeys];

    combinations.forEach((commandKey) => {
      const commandsSplit = commandKey
        .replace(/\s+/g, "")
        .split("+") as Shortcut[];
      const level = commandsSplit.length;

      if (!this.commandsLevels.hasOwnProperty(level)) {
        this.commandsLevels[`${level}`] = [];
      }

      this.commandsLevels[`${level}`].push(commandKey);

      this.commandsMap.set(commandKey, {
        commandKey,
        commands: commandsSplit,
        action: event,
        actionName,
      });
    });
  }

  remove(combinationsKeys: string | string[]) {
    const combinations =
      combinationsKeys instanceof Array ? combinationsKeys : [combinationsKeys];
    combinations.forEach((commandKey) => {
      this.commandsMap.delete(commandKey);
    });
  }
}

export default new ShortcutKeys();
