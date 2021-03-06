import {expect} from 'chai';
import {MineralDeposit} from '../../../src/cards/base/MineralDeposit';
import {Game} from '../../../src/Game';
import {TestPlayers} from '../../TestingUtils';

describe('MineralDeposit', function() {
  it('Should play', function() {
    const card = new MineralDeposit();
    const player = TestPlayers.BLUE.newPlayer();
    const game = new Game('foobar', [player, player], player);
    const action = card.play(player, game);
    expect(action).is.undefined;
    expect(player.steel).to.eq(5);
  });
});
