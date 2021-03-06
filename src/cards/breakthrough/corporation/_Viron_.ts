
import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Game} from '../../../Game';
import {Tags} from '../../Tags';
import {ICard} from '../../ICard';
import {SelectCard} from '../../../inputs/SelectCard';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';

export class _Viron_ implements ICard, CorporationCard {
  public name: CardName = CardName._VIRON_;
  public tags: Array<Tags> = [Tags.WILDCARD];
  public startingMegaCredits: number = 48;
  public cardType: CardType = CardType.CORPORATION;

  private getActionCards(player: Player, game: Game): Array<ICard> {
    const result: Array<ICard> = [];
    for (const playedCard of player.playedCards) {
      if (
        playedCard.action !== undefined &&
        playedCard.canAct !== undefined &&
        player.getActionsThisGeneration().has(playedCard.name) &&
        playedCard.canAct(player, game)) {
        result.push(playedCard);
      }
    }
    return result;
  }

  public canAct(player: Player, game: Game): boolean {
    return this.getActionCards(player, game).length > 0 && !player.getActionsThisGeneration().has(this.name);
  }

  public action(player: Player, game: Game) {
    if (this.getActionCards(player, game).length === 0) {
      return undefined;
    }

    return new SelectCard(
      'Perform again an action from a played card',
      'Take action',
      this.getActionCards(player, game),
      (foundCards: Array<ICard>) => {
        const foundCard = foundCards[0];
        game.log('${0} used ${1} action with ${2}', (b) => b.player(player).card(foundCard).card(this));
        return foundCard.action!(player, game);
      },
    );
  }

  public play() {
    return undefined;
  }
}
