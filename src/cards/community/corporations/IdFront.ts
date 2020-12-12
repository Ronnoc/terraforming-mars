import {CorporationCard} from '../../corporation/CorporationCard';
import {Player} from '../../../Player';
import {Tags} from '../../Tags';
import {Game} from '../../../Game';
import {IProjectCard} from '../../IProjectCard';
import {Resources} from '../../../Resources';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';

export class IdFront implements CorporationCard {
  public name: CardName = CardName.ID_FRONT;
  public tags: Array<Tags> = [];
  public startingMegaCredits: number = 32;
  public cardType: CardType = CardType.CORPORATION;
  public allTags = new Set();

  public onCardPlayed(player: Player, _game: Game, card: IProjectCard) {
    if (card.tags.filter((tag) => tag !== Tags.WILDCARD).length === 0 || !player.isCorporation(this.name)) return undefined;
    let count = 0;
    for (const tag of card.tags.filter((tag) => tag !== Tags.WILDCARD)) {
      if (this.allTags.has(tag)) {
        count += 1;
      }
      if (card.cardType !== CardType.EVENT) {
        this.allTags.add(tag);
      }
    }

    const wildCount = player.getTagCount(Tags.WILDCARD, false, false);
    if (card.tags.length >= count) {
      player.setResource(Resources.MEGACREDITS, 2 * Math.min(card.tags.length, count + wildCount));
    }
    return undefined;
  }


  public play() {
    return undefined;
  }
}
