import * as constants from '../../../constants';
import {Tags} from '../../Tags';
import {Player} from '../../../Player';
import {Game} from '../../../Game';
import {CorporationCard} from '../../corporation/CorporationCard';
import {ResourceType} from '../../../ResourceType';
import {ICard, IActionCard, IResourceCard} from '../../ICard';
import {SelectCard} from '../../../inputs/SelectCard';
import {CardName} from '../../../CardName';
import {CardType} from '../../CardType';
import {LogHelper} from '../../../components/LogHelper';
import {AndOptions} from '../../../inputs/AndOptions';
import {SelectAmount} from '../../../inputs/SelectAmount';
import {SelectOption} from '../../../inputs/SelectOption';


export class _StormCraftIncorporated_ implements IActionCard, CorporationCard, IResourceCard {
  public name: CardName = CardName._STORMCRAFT_INCORPORATED_;
  public tags: Array<Tags> = [Tags.JOVIAN];
  public startingMegaCredits: number = 48;
  public cardType: CardType = CardType.CORPORATION;
  public resourceType: ResourceType = ResourceType.FLOATER;
  public resourceCount: number = 0;

  public play() {
    return undefined;
  }
  public getVictoryPoints(player: Player) {
    return player.getTagCount(Tags.JOVIAN, false, false);
  }
  public canAct(): boolean {
    return true;
  }

  public action(player: Player, game: Game) {
    const floaterCards = player.getResourceCards(ResourceType.FLOATER);
    if (floaterCards.length === 1) {
      this.resourceCount++;
      LogHelper.logAddResource(game, player, this);
      return undefined;
    }

    return new SelectCard(
      'Select card to add 1 floater',
      'Add floater',
      floaterCards,
      (foundCards: Array<ICard>) => {
        player.addResourceTo(foundCards[0], 1);
        LogHelper.logAddResource(game, player, foundCards[0]);
        return undefined;
      },
    );
  }

  public convertHeatIntoTemperature(game: Game, player: Player): SelectOption {
    const floatersToHeat = 2;
    let heatAmount: number;
    let floaterAmount: number;
    const raiseTempOptions = new AndOptions(
      () => {
        const total = heatAmount + (floaterAmount * floatersToHeat);
        if (total < constants.HEAT_FOR_TEMPERATURE) {
          throw new Error(`Need to pay ${constants.HEAT_FOR_TEMPERATURE} heat`);
        }
        if (total > constants.HEAT_FOR_TEMPERATURE) {
          throw new Error(`Only need to pay ${constants.HEAT_FOR_TEMPERATURE} heat`);
        }
        player.removeResourceFrom(this, floaterAmount);
        player.heat -= heatAmount;
        game.increaseTemperature(player, 1);
        game.log('${0} converted heat into temperature', (b) => b.player(player));
        return undefined;
      },
      new SelectAmount('Select amount of heat to spend', 'Spend heat', (amount: number) => {
        heatAmount = amount;
        return undefined;
      }, 0, Math.min(player.heat, constants.HEAT_FOR_TEMPERATURE)),
      new SelectAmount('Select amount of floaters on corporation to spend', 'Spend floaters', (amount: number) => {
        floaterAmount = amount;
        return undefined;
      }, 0, Math.min(this.resourceCount, constants.HEAT_FOR_TEMPERATURE / floatersToHeat)),
    );
    raiseTempOptions.title = 'Select resource amounts to raise temp';

    return new SelectOption(`Convert ${constants.HEAT_FOR_TEMPERATURE} heat into temperature`, 'Convert heat', () => {
      return raiseTempOptions;
    });
  }
}
