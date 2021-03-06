import {expect} from 'chai';
import {LavaTubeSettlement} from '../../../src/cards/prelude/LavaTubeSettlement';
import {Game} from '../../../src/Game';
import {SelectSpace} from '../../../src/inputs/SelectSpace';
import {Player} from '../../../src/Player';
import {Resources} from '../../../src/Resources';
import {SpaceName} from '../../../src/SpaceName';
import {SpaceType} from '../../../src/SpaceType';
import {TileType} from '../../../src/TileType';
import {resetBoard, TestPlayers} from '../../TestingUtils';

describe('LavaTubeSettlement', function() {
  let card : LavaTubeSettlement; let player : Player; let game : Game;

  beforeEach(function() {
    card = new LavaTubeSettlement();
    player = TestPlayers.BLUE.newPlayer();
    game = new Game('foobar', [player], player);
    resetBoard(game);
  });

  after(function() {
    resetBoard(game);
  });

  it('Can\'t play without energy production', function() {
    expect(card.canPlay(player, game)).is.not.true;
  });

  it('Can\'t play if no volcanic spaces left', function() {
    player.addProduction(Resources.ENERGY);
    game.addTile(player, SpaceType.LAND, game.getSpace(SpaceName.THARSIS_THOLUS), {tileType: TileType.LAVA_FLOWS});
    game.addTile(player, SpaceType.LAND, game.getSpace(SpaceName.ARSIA_MONS), {tileType: TileType.LAVA_FLOWS});
    game.addTile(player, SpaceType.LAND, game.getSpace(SpaceName.PAVONIS_MONS), {tileType: TileType.LAVA_FLOWS});

    const anotherPlayer = TestPlayers.RED.newPlayer();
    game.getSpace(SpaceName.ASCRAEUS_MONS).player = anotherPlayer; // land claim

    expect(card.canPlay(player, game)).is.not.true;
  });

  it('Should play', function() {
    player.addProduction(Resources.ENERGY);
    expect(card.canPlay(player, game)).is.true;

    card.play(player, game);
    const selectSpace = game.deferredActions.next()!.execute() as SelectSpace;
    selectSpace.cb(selectSpace.availableSpaces[0]);

    expect(selectSpace.availableSpaces[0].tile && selectSpace.availableSpaces[0].tile.tileType).to.eq(TileType.CITY);
    expect(selectSpace.availableSpaces[0].player).to.eq(player);
    expect(player.getProduction(Resources.ENERGY)).to.eq(0);
  });
});
