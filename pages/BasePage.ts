import { IInteractionService } from '../interactions/services/IInteractionService';
import { InteractionServiceImpl } from '../interactions/services/InteractionServiceImpl';

export class BasePage {

    readonly interaction: IInteractionService;

    constructor() {
        this.interaction = new InteractionServiceImpl();
    }

}