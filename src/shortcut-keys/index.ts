class ShortcutKeys {
  private actionsHistory = "";
  private level = 0;
  private actionsLevels: any = {};
  private actionsMap = new Map();
  private isSubscribed: boolean;

  constructor() {
    this.isSubscribed = false;
    this.subscribe();
  }

  private incrementUserAction = (e: KeyboardEvent) => {
    this.level++;
    let extra = "";

    let extraByCode = false

    if (e.shiftKey) extra = "shift";
    if (e.ctrlKey || e.metaKey) extra = "ctrl";
    if (e.altKey) extra = "alt";
    if (e.code.toLowerCase() === "space") {extra = "space"; extraByCode = true};
    // if (e.code.toLowerCase() === "enter") {extra = "enter"; extraByCode = true};

    const plus = this.level !== 1 || extra ? "+" : "";

    if (extra && !extraByCode) this.level++;

    this.actionsHistory += `${extra}${plus}${e.key}`.toLowerCase();
  };

  private clearUserAction = () => {
    this.actionsHistory = "";
    this.level = 0;
  };
  private getCurrentLevel = () => this.actionsLevels[`${this.level}`];

  private handleEvent = (e: KeyboardEvent) => {
    this.incrementUserAction(e);

    const currentLevelList = this.getCurrentLevel();

    if (currentLevelList) {
      if (currentLevelList.includes(this.actionsHistory)) {
        this.actionsMap.get(this.actionsHistory).action();
        this.clearUserAction();
      }
    } else {
      this.clearUserAction();
    }
  };

  private subscribe() {
    if (!this.isSubscribed) {
      this.isSubscribed = true;
      window.addEventListener("keypress", this.handleEvent);
    }
  }

  unsubscribe() {
    if (this.isSubscribed) {
      this.isSubscribed = false;
      window.removeEventListener("keyup", this.handleEvent);
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

      if (!this.actionsLevels.hasOwnProperty(level)) {
        this.actionsLevels[`${level}`] = [];
      }

      this.actionsLevels[`${level}`].push(commandKey);

      this.actionsMap.set(commandKey, {
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
      this.actionsMap.delete(commandKey);
    });
  }
}

export default new ShortcutKeys();
