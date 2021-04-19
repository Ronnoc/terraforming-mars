import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {CardRenderItemSize} from '../render/CardRenderItemSize';

export class SolarCosmicRays extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.SOLAR_COSMIC_RAYS,
      cardType: CardType.AUTOMATED,
      tags: [Tags.SPACE],
      cost: 27,

      metadata: {
        cardNumber: 'Q01',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.energy(1)).nbsp;
          b.production((pb) => pb.heat(1).slash().energy(1).any.asterix()).text('MAX 15', CardRenderItemSize.SMALL);
        }),
        description: 'Increase your energy production 1 steps. For each energy production in play, you increase your heat production 1 step[max 15].',
      },
    });
  };
  public play(player: Player) {
    player.addProduction(Resources.ENERGY, 1);
    let alllEnergyProd = 0;
    for (const everyPlayer of player.game.getPlayers()) {
      alllEnergyProd += everyPlayer.getProduction(Resources.ENERGY);
    }
    alllEnergyProd= Math.min(alllEnergyProd, 15);
    player.addProduction(Resources.HEAT, alllEnergyProd);
    return undefined;
  }
}

