import {Color} from './Color';
import {SerializedCard} from './SerializedCard';
import {VictoryPointsBreakdown} from './VictoryPointsBreakdown';
import {SerializedTimer} from './SerializedTimer';
import {IProjectCard} from './cards/IProjectCard';
import {CardName} from './CardName';
import {CorporationCard} from './cards/corporation/CorporationCard';

export interface SerializedPlayer {
    actionsTakenThisRound: number;
    actionsThisGeneration: Array<CardName>;
    beginner: boolean;
    canUseHeatAsMegaCredits: boolean;
    cardCost: number;
    cardDiscount: number;
    cardsInHand: Array<IProjectCard>;
    colonyTradeDiscount: number;
    colonyTradeOffset: number;
    colonyVictoryPoints: number;
    color: Color;
    corporationCard: CorporationCard | undefined;
    corporationInitialActionDone: boolean;
    dealtCorporationCards: Array<CorporationCard>;
    dealtPreludeCards: Array<IProjectCard>;
    dealtProjectCards: Array<IProjectCard>;
    draftedCards: Array<IProjectCard>;
    energy: number;
    energyProduction: number;
    fleetSize: number;
    handicap: number;
    hasIncreasedTerraformRatingThisGeneration: boolean;
    hasTurmoilScienceTagBonus: boolean;
    heat: number;
    heatProduction: number;
    heatProductionStepsIncreasedThisGeneration: number;
    id: string;
    lastCardPlayed?: IProjectCard;
    megaCreditProduction: number;
    megaCredits: number;
    name: string;
    oceanBonus: number;
    pickedCorporationCard: CorporationCard | undefined;
    plantProduction: number;
    plants: number;
    plantsNeededForGreenery: number;
    playedCards: Array<SerializedCard>;
    politicalAgendasActionUsedCount: number;
    preludeCardsInHand: Array<IProjectCard>;
    removedFromPlayCards: Array<IProjectCard>;
    removingPlayers: Array<string>;
    scienceTagCount: number;
    steel: number;
    steelProduction: number;
    steelValue: number;
    terraformRating: number;
    terraformRatingAtGenerationStart: number;
    timer: SerializedTimer;
    titanium: number;
    titaniumProduction: number;
    titaniumValue: number;
    // TODO(kberg): change tradesThisTurn to tradeThisGeneration later
    tradesThisGeneration: number;
    turmoilPolicyActionUsed: boolean;
    victoryPointsBreakdown: VictoryPointsBreakdown;
    heatForTemperature: number;
    undoing : boolean ;
    exited : boolean ;// 是否体退
    canExit : boolean ;// 能否体退： 行动阶段、当前行动玩家、没有未执行的拦截器
}
