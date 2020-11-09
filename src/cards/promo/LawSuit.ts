import {Game} from '../../Game';
import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {CardType} from '../CardType';
import {Tags} from '../Tags';
import {SelectPlayer} from '../../inputs/SelectPlayer';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';

export class LawSuit implements IProjectCard {
    public cost = 2;
    public tags = [Tags.EARTH];
    public cardType = CardType.EVENT;
    public name = CardName.LAW_SUIT;
    public hasRequirements = false;

    public canPlay(player: Player) {
      return player.removingPlayers.length > 0;
    }

    public play(player: Player, game: Game) {
      return new SelectPlayer(game.getPlayersById(player.removingPlayers), 'Select player to sue (steal 3 MC from)', 'Steal MC', (suedPlayer: Player) => {
        player.setResource(Resources.MEGACREDITS, Math.min(3, suedPlayer.getResource(Resources.MEGACREDITS)));
        suedPlayer.setResource(Resources.MEGACREDITS, -3, game, player);
        const cardIndex = player.playedCards.findIndex((element) => element.name === this.name);
        player.playedCards.splice(cardIndex, 1);
        suedPlayer.playedCards.push(this);
        return undefined;
      });
    }

    public getVictoryPoints() {
      return -1;
    }
}

