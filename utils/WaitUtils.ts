import { Locator } from "@playwright/test";
import { time } from "console";
import { WaitStrategy } from "../enums/WaitStrategy";

export class WaitUtils {

    private static readonly DEFAULT_WAIT = 3000;

    static async waitForElement(element: Locator, waitStrategy: WaitStrategy, timeout: number = this.DEFAULT_WAIT) {

        switch (waitStrategy) {
            case WaitStrategy.VISIBLE:
                await element.waitFor({ state: "visible", timeout: timeout });
                break;
            case WaitStrategy.ATTACHED:
                await element.waitFor({ state: "attached", timeout: timeout });
                break;
            case WaitStrategy.DETACHED:
                await element.waitFor({ state: "detached", timeout: timeout });
                break;
            case WaitStrategy.HIDDEN:
                await element.waitFor({ state: "hidden", timeout: timeout });
                break;
            default:
                throw new Error(`❌ Unsupported wait strategy: ${waitStrategy}`);
        }
    }

}