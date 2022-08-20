import { ShortcutKeys } from "./types";
declare global {
    interface Window {
        shortcutKeys: ShortcutKeys;
    }
}
