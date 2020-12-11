import {CardName} from '../CardName';
import {GameModule} from '../GameModule';

export interface ICardFactory<T> {
    cardName: CardName;
    cardName_ori ?: CardName;
    Factory: new () => T;
    compatibility ?: GameModule ;
}
