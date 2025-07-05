import { Locator } from "@playwright/test";
import { ICheckboxInteraction } from "../declarartions/ICheckboxInteraction";
import { WaitUtils } from "../../utils/WaitUtils";
import { WaitStrategy } from "../../enums/WaitStrategy";

export class CheckboxInteraction implements ICheckboxInteraction {

    async selectCheckBox(element: Locator, elementName: string, waitTime?: number): Promise<void> {
        // await element.waitFor({ state: "visible", timeout: waitTime });
        await WaitUtils.waitForElement(element, WaitStrategy.VISIBLE, waitTime);
        const isChecked = await element.isChecked();
        if (!isChecked) {
            await element.check();
            console.log(`${elementName} checkbox selected - ${element}`);
        }
    }

    async unSelectCheckBox(element: Locator, elementName: string, waitTime?: number): Promise<void> {
        await WaitUtils.waitForElement(element, WaitStrategy.VISIBLE, waitTime);
        const isChecked = await element.isChecked();
        if (isChecked) {
            await element.check();
            console.log(`${elementName} checkbox selected - ${element}`);
        }
    }

}