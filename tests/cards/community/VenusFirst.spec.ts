import {expect} from 'chai';
import {VenusFirst} from '../../../src/cards/community/preludes/VenusFirst';
import {Tags} from '../../../src/cards/Tags';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {setCustomGameOptions} from '../../TestingUtils';
import {TestPlayers} from '../../TestingUtils';

describe('VenusFirst', function() {
  let card : VenusFirst; let player : Player; let game : Game;

  beforeEach(function() {
    card = new VenusFirst();
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = setCustomGameOptions();
    game = new Game('foobar', [player, player], player, gameOptions);
  });

  it('Should play', function() {
    card.play(player, game);
    expect(game.getVenusScaleLevel()).to.eq(4);
    expect(player.cardsInHand).has.lengthOf(2);

    player.cardsInHand.forEach((card) => expect(card.tags.indexOf(Tags.VENUS)).not.to.eq(-1));
  });
});
