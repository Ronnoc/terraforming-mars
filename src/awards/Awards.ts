import { Landlord } from "./Landlord";
import { Banker } from "./Banker";
import { Scientist } from "./Scientist";
import { Thermalist } from "./Thermalist";
import { Miner } from "./Miner";
import { Venuphile } from "./Venuphile"
import { IAward } from "./IAward";
import { Industrialist } from './Industrialist';
import { Celebrity } from './Celebrity';
import { DesertSettler } from './DesertSettler';
import { EstateDealer } from './EstateDealer';
import { Benefactor } from './Benefactor';
import { Cultivator } from './Cultivator';
import { Magnate } from './Magnate';
import { SpaceBaron } from './SpaceBaron';
import { Excentric } from './Excentric';
import { Contractor } from './Contractor';
import { Voyager } from './Voyager';
import { Microentrepreneur } from './Microentrepreneur';

export const ORIGINAL_AWARDS: Array<IAward> = [
    new Landlord(),
    new Scientist(),
    new Banker(),
    new Thermalist(),
    new Miner()
]

export const VENUS_AWARDS: Array<IAward> = [
    new Venuphile()
]

export const ELYSIUM_AWARDS: Array<IAward> = [
    new Celebrity(),
    new Industrialist(),
    new DesertSettler(),
    new EstateDealer(),
    new Benefactor()
]  

export const HELLAS_AWARDS: Array<IAward> = [
    new Cultivator(),
    new Magnate(),
    new SpaceBaron(),
    new Excentric(),
    new Contractor()
] 

export const FAN_AWARDS: Array<IAward> = [
    new Voyager(),
    new Microentrepreneur(),
]

/* Award List
most card
Celebrity.ts:    public description: string = "Most cards in play (not events) with a cost of at least 20 megacredits"
Magnate.ts:    public description: string = "Most automated cards in play (green cards)"
*MicroEntrepreneur - most played project cards cheaper or equal to 10M€ (not events ofcourse)

most tag??
Contractor.ts:    public description: string = "Most building tags (event cards do not count)"
Scientist.ts:    public description: string = "Having the most science tags in play"
SpaceBaron.ts:    public description: string = "Most space tags (event cards do not count)"
Venuphile.ts:    public description: string = "Having the most Venus tags in play"
*Voyager - most Jovian/Earth/Venus symbols
TODO Enviromentalist - most bio symbols

most production??
Banker.ts:    public description: string = "Having the highest MC production"

most resources??
Industrialist.ts:    public description: string = "Having most steel and energy resources"
Miner.ts:    public description: string = "Having the most steel and titanium resource cubes"
Thermalist.ts:    public description: string = "Having the most heat resource cubes"

most tiles??
Cultivator.ts:    public description: string = "Most greenery tiles"
DesertSettler.ts:    public description: string = "Most tiles south of the equator (the four bottom rows)"
EstateDealer.ts:    public description: string = "Most tiles adjacent to ocean tiles"
Landlord.ts:    public description: string = "Owning the most tiles in play"
TODO Equatorialist - most tiles on the very outter edge areas

else??
Benefactor.ts:    public description: string = "Highest terraform rating"
Excentric.ts:    public description: string = "Most resources on cards"
*/