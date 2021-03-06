import {expect} from 'chai';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {GeothermalVent} from '../../../src/cards/community/preludes/GeothermalVent';
import {Game} from '../../../src/Game';
import {TestPlayers} from '../../TestingUtils';

describe('GeothermalVent', function() {
  let card : GeothermalVent; let player : Player; let game: Game;

  beforeEach(function() {
    card = new GeothermalVent();
    player = TestPlayers.BLUE.newPlayer();
    game = new Game('foobar', [player, player], player);
  });

  it('Should play', function() {
    const initialTR = player.getTerraformRating();
    card.play(player, game);

    expect(player.getProduction(Resources.HEAT)).to.eq(2);
    expect(game.getTemperature()).to.eq(-26);
    expect(player.getTerraformRating()).to.eq(initialTR + 2);
  });
});
