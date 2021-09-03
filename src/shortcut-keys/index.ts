interface CommandLevel {
  commandKey: string;
  commands: string[];
  action: Function;
  actionName?: string;
}

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
    this.level++;
    let extra = "";

    if (e.ctrlKey && e.key === "Control") return;
    if (e.shiftKey && e.key === "Shift") return;

    if (e.shiftKey) extra = "shift";
    if (e.ctrlKey || e.metaKey) extra = "ctrl";
    if (e.altKey) extra = "alt";
    if (e.code.toLowerCase() === "space") extra = "space";
    if (e.code.toLowerCase() === "enter") extra = "enter";

    const plus = this.level !== 1 || extra ? "+" : "";

    let action = `${extra}${plus}${e.key}`.toLowerCase();

    console.log("ac:", action.slice(-1));

    if (action.slice(-1) === "+") {
      action = action.slice(0, -1);
    }

    // console.log(action.slice(0, -1));

    this.commandsHistory += action;
  };

  private clearUserAction = () => {
    this.commandsHistory = "";
    this.level = 0;
  };
  private getCurrentLevel = () => this.commandsLevels[`${this.level}`];

  private handleEvent = (e: KeyboardEvent) => {
    e.preventDefault();

    this.incrementUserAction(e);

    const currentLevelList = this.getCurrentLevel();

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
    if (!this.isSubscribed) {
      this.isSubscribed = true;
      window.addEventListener("keydown", this.handleEvent);
    }
  }

  unsubscribe() {
    if (this.isSubscribed) {
      this.isSubscribed = false;
      window.removeEventListener("keydown", this.handleEvent);
    }
  }

  add(
    combinationsKeys: string | string[],
    event: Function,
    actionName: string = ""
  ) {
    const combinations =
      combinationsKeys instanceof Array ? combinationsKeys : [combinationsKeys];

    combinations.forEach((commandKey) => {
      const commandsSplit = commandKey
        .replace(/\s+/g, "")
        .toLowerCase()
        .split("+");
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
