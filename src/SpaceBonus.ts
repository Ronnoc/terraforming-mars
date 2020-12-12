
export enum SpaceBonus {
    TITANIUM,
    STEEL,
    PLANT,
    DRAW_CARD,
    HEAT,
    OCEAN,

    // Ares-specific
    MEGACREDITS,
    ANIMAL,
    MICROBE,
    POWER,

    // Custom maps / special tiles
    RESTRICTED, // Tiles cannot be placed on these spaces
    COVE, // Spaces that allow both ocean and land tiles to be placed
    TEMPERATURE, // Gives a bonus temperature raise
}
