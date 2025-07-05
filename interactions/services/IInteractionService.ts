import { Locator } from "@playwright/test";

export interface IInteractionService {

    selectCheckBox(element: Locator, elementName: string, waitTime?: number): Promise<void>;

    unSelectCheckBox(element: Locator, elementName: string, waitTime?: number): Promise<void>;

}