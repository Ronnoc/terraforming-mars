import {expect} from 'chai';
import {Research} from '../../../src/cards/base/Research';
import {SubCrustMeasurements} from '../../../src/cards/promo/SubCrustMeasurements';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {TestPlayers} from '../../TestingUtils';

describe('SubCrustMeasurements', function() {
  let card : SubCrustMeasurements; let player : Player; let game : Game;

  beforeEach(function() {
    card = new SubCrustMeasurements();
    player = TestPlayers.BLUE.newPlayer();
    game = new Game('foobar', [player, player], player);
  });

  it('Can\'t play if not enough science tags', function() {
    expect(card.canPlay(player)).is.not.true;
  });

  it('Should play', function() {
    player.playedCards.push(new Research());
    expect(card.canPlay(player)).is.true;

    card.play();
    expect(card.getVictoryPoints()).to.eq(2);
  });

  it('Should take action', function() {
    expect(player.cardsInHand).has.lengthOf(0);
    card.action(player, game);
    expect(player.cardsInHand).has.lengthOf(1);
  });
});
