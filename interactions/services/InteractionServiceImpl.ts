import { Locator } from "@playwright/test";
import { IInteractionService } from "./IInteractionService";
import { ICheckboxInteraction } from "../declarartions/ICheckboxInteraction";
import { CheckboxInteraction } from "../implementations/CheckboxInteraction";

export class InteractionServiceImpl implements IInteractionService {

    private readonly checkboxInteraction: ICheckboxInteraction;

    constructor() {
        this.checkboxInteraction = new CheckboxInteraction();
    }

    async selectCheckBox(element: Locator, elementName: string, waitTime?: number): Promise<void> {
        await this.checkboxInteraction.selectCheckBox(element, elementName, waitTime);
    }

    async unSelectCheckBox(element: Locator, elementName: string, waitTime?: number): Promise<void> {
        await this.checkboxInteraction.unSelectCheckBox(element, elementName, waitTime);
    }

}