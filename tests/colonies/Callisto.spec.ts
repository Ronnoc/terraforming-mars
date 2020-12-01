import {expect} from 'chai';
import {Callisto} from '../../src/colonies/Callisto';
import {Game} from '../../src/Game';
import {Player} from '../../src/Player';
import {Resources} from '../../src/Resources';
import {TestPlayers} from '../TestingUtils';


describe('Callisto', function() {
  let callisto: Callisto; let player: Player; let player2: Player; let game: Game;

  beforeEach(function() {
    callisto = new Callisto();
    player = TestPlayers.BLUE.newPlayer();
    player2 = TestPlayers.RED.newPlayer();
    game = new Game('foobar', [player, player2], player);
    game.gameOptions.coloniesExtension = true;
    game.colonies.push(callisto);
  });

  it('Should build', function() {
    callisto.addColony(player, game);
    expect(player.getProduction(Resources.ENERGY)).to.eq(1);
    expect(player2.getProduction(Resources.ENERGY)).to.eq(0);
  });

  it('Should trade', function() {
    callisto.trade(player, game);
    expect(player.energy).to.eq(2);
    expect(player2.energy).to.eq(0);
  });

  it('Should give trade bonus', function() {
    callisto.addColony(player, game);

    callisto.trade(player2, game);
    game.deferredActions.runAll(() => {});

    expect(player.getProduction(Resources.ENERGY)).to.eq(1);
    expect(player2.getProduction(Resources.ENERGY)).to.eq(0);
    expect(player.energy).to.eq(3);
    expect(player2.energy).to.eq(2);
  });
});
