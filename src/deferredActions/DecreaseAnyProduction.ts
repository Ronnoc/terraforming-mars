import {Game} from '../Game';
import {Player} from '../Player';
import {Resources} from '../Resources';
import {SelectPlayer} from '../inputs/SelectPlayer';
import {DeferredAction} from './DeferredAction';

export class DecreaseAnyProduction implements DeferredAction {
  constructor(
        public player: Player,
        public game: Game,
        public resource: Resources,
        public count: number = 1,
        public title: string = 'Select player to decrease ' + resource + ' production by ' + count + ' step(s)',
  ) {}

  public execute() {
    if (this.game.isSoloMode()) return undefined;

    let candidates: Array<Player> = [];
    if (this.resource === Resources.MEGACREDITS) {
      candidates = this.game.getPlayers().filter((p) => p.getProduction(this.resource) >= this.count - 5);
    } else {
      candidates = this.game.getPlayers().filter((p) => p.getProduction(this.resource) >= this.count);
    }

    if (candidates.length === 0) {
      return undefined;
    }

    if (candidates.length === 1) {
      candidates[0].addProduction(this.resource, -this.count, this.game, this.player);
      return undefined;
    }

    return new SelectPlayer(
      candidates,
      this.title,
      'Decrease',
      (found: Player) => {
        found.addProduction(this.resource, -this.count, this.game, this.player);
        return undefined;
      },
    );
  }
}
