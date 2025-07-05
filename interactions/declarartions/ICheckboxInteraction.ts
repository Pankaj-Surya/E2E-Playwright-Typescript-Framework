import { Locator } from "@playwright/test";


export interface ICheckboxInteraction {

    selectCheckBox(element: Locator, elementName: string, waitTime?: number): Promise<void>;

    unSelectCheckBox(element: Locator, elementName: string, waitTime?: number): Promise<void>;

}