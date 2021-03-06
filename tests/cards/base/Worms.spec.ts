import {expect} from 'chai';
import {Worms} from '../../../src/cards/base/Worms';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestingUtils';

describe('Worms', function() {
  let card : Worms; let player : Player; let game : Game;

  beforeEach(function() {
    card = new Worms();
    player = TestPlayers.BLUE.newPlayer();
    game = new Game('foobar', [player, player], player);
  });

  it('Can\'t play', function() {
    (game as any).oxygenLevel = 3;
    expect(card.canPlay(player, game)).is.not.true;
  });

  it('Should play', function() {
    (game as any).oxygenLevel = 4;
    expect(card.canPlay(player, game)).is.true;
    player.playedCards.push(card);

    card.play(player);
    expect(player.getProduction(Resources.PLANTS)).to.eq(1);
  });
});
