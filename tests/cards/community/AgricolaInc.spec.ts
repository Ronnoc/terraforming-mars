import {expect} from 'chai';
import {Research} from '../../../src/cards/base/Research';
import {SolarWindPower} from '../../../src/cards/base/SolarWindPower';
import {CoronaExtractor} from '../../../src/cards/colonies/CoronaExtractor';
import {AgricolaInc} from '../../../src/cards/community/corporations/AgricolaInc';
import {Game} from '../../../src/Game';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {TestPlayers} from '../../TestingUtils';

describe('AgricolaInc', function() {
  let card : AgricolaInc; let player : Player; let game : Game;

  beforeEach(function() {
    card = new AgricolaInc();
    player = TestPlayers.BLUE.newPlayer();
    game = new Game('foobar', [player, player], player);

    card.play(player);
    player.corporationCard = card;
  });

  it('Starts with correct production', function() {
    expect(player.getProduction(Resources.MEGACREDITS)).to.eq(1);
    expect(player.getProduction(Resources.PLANTS)).to.eq(1);
  });

  it('Scores endgame VP correctly', function() {
    expect(card.getVictoryPoints(player, game)).to.eq(-18);

    player.playedCards.push(new SolarWindPower(), new Research(), new CoronaExtractor());
    expect(card.getVictoryPoints(player, game)).to.eq(-11);
  });
});
