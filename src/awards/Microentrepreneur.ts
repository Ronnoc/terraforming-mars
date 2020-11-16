import {IAward} from './IAward';
import {Player} from '../Player';
import {Game} from '../Game';
import {CardType} from '../cards/CardType';

export class Microentrepreneur implements IAward {
    public name: string = 'Microentrepreneur';
    public description: string = 'most played project cards cheaper or equal to 10M€ (not events ofcourse)'
    public getScore(player: Player, _game: Game): number {
      return player.playedCards
          .filter((card) => (card.cost <= 10) && (card.cardType === CardType.ACTIVE || card.cardType === CardType.AUTOMATED)).length;
    }
}
