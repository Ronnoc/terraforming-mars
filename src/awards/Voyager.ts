import {IAward} from './IAward';
import {Player} from '../Player';
import {Game} from '../Game';
import {Tags} from '../cards/Tags';

export class Voyager implements IAward {
    public name: string = 'Voyager';
    public description: string = 'Having the most Jovian/Earth/Venus tags in play'
    public getScore(player: Player, _game: Game): number {
      let count = 0;
      count += player.getTagCount(Tags.JOVIAN, false, false);
      count += player.getTagCount(Tags.EARTH, false, false);
      count += player.getTagCount(Tags.VENUS, false, false);
      return count;
    }
}
