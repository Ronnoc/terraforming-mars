import {expect} from 'chai';
import {PoliticalUprising} from '../../../src/cards/community/preludes/PoliticalUprising';
import {Game, GameOptions} from '../../../src/Game';
import {OrOptions} from '../../../src/inputs/OrOptions';
import {Player} from '../../../src/Player';
import {PartyName} from '../../../src/turmoil/parties/PartyName';
import {setCustomGameOptions} from '../../TestingUtils';
import {TestPlayers} from '../../TestingUtils';

describe('PoliticalUprising', function() {
  let card : PoliticalUprising; let player : Player; let game : Game;

  beforeEach(function() {
    card = new PoliticalUprising();
    player = TestPlayers.BLUE.newPlayer();

    const gameOptions = setCustomGameOptions() as GameOptions;
    game = new Game('foobar', [player, player], player, gameOptions);
  });

  it('Should play', function() {
    card.play(player, game);
    expect(game.deferredActions).has.lengthOf(4);

    while (game.deferredActions.length) {
      const orOptions = game.deferredActions.next()!.execute() as OrOptions;
      orOptions.options[0].cb();
      game.deferredActions.shift();
    }

    const turmoil = game.turmoil!;
    const marsFirst = turmoil.getPartyByName(PartyName.MARS)!;
    expect(marsFirst.delegates.filter((d) => d === player.id)).has.lengthOf(4);
    expect(player.cardsInHand).has.lengthOf(1);
  });
});
