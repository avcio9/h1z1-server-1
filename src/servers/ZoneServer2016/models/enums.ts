// ======================================================================
// ======================================================================
//
//   GNU GENERAL PUBLIC LICENSE
//   Version 3, 29 June 2007
//   copyright (C) 2020 - 2021 Quentin Gruber
//   copyright (C) 2021 - 2023 H1emu community
//
//   https://github.com/QuentinGruber/h1z1-server
//   https://www.npmjs.com/package/h1z1-server
//
//   Based on https://github.com/psemu/soe-network
// ======================================================================

export enum ConstructionErrors {
  UNKNOWN,
  OVERLAP,
  BUILD_PERMISSION,
  DEMOLISH_PERMISSION,
  UNKNOWN_PARENT,
  UNKNOWN_SLOT,
  UNKNOWN_CONSTRUCTION,
}

export enum ConstructionPermissionIds {
  BUILD = 1,
  DEMOLISH = 2,
  CONTAINERS = 3,
  VISIT = 4,
}

export enum StringIds {
  TAKE_ITEM = 29,
  OPEN = 31,
  SEARCH = 1191,
  OPEN_AND_LOCK = 8944,
  UNDO_PLACEMENT = 12001,
  OPEN_TARGET = 12156,
  PERMISSIONS = 12979,
  PERMISSIONS_TARGET = 12982,
  OFFROADER = 16,
  PICKUP_TRUCK = 12537,
  ATV = 12552,
  POLICE_CAR = 12538,
}

export enum MovementModifiers {
  RESTED = 1.3,
  SWIZZLE = 1.15,
  SNARED = 0.4,
  BOOTS = 1.15,
}

export enum ContainerErrors {
  NONE = 0,
  IN_USE = 1,
  WRONG_ITEM_TYPE = 2,
  UNKNOWN_CONTAINER = 3,
  UNKNOWN_SLOT = 4,
  NO_ITEM_IN_SLOT = 5,
  INTERACTION_VALIDATION = 6,
  UNKNOWN = 99,

  // custom errors
  DOES_NOT_ACCEPT_ITEMS = 7,
  NOT_MUTABLE = 8,
  NOT_CONSTRUCTED = 9,
  NO_SPACE = 10,
  INVALID_LOADOUT_SLOT = 11,
  NO_PERMISSION = 12,
}

export enum FilterIds {
  COOKING = 2,
  FURNACE = 4,
  WEAPONS = 5,
  HOUSING = 6,
  SURVIVAL = 7,
  COMPONENT = 8,
}

export enum ItemClasses {
  WEAPONS_LONG = 25036,
  WEAPONS_PISTOL = 4096,
  WEAPONS_MELEES = 4098,
  WEAPONS_MELEES0 = 25037,
  WEAPONS_GENERIC = 25054,
}

export enum VehicleIds {
  OFFROADER = 1,
  PICKUP = 2,
  POLICECAR = 3,
  ATV = 5,
  PARACHUTE = 13,
  SPECTATE = 1337,
}

export enum Characters {
  MALE_WHITE = 1,
  MALE_WHITE_BALD = 2,
  FEMALE_WHITE_YOUNG = 3,
  FEMALE_WHITE = 4,
  MALE_BLACK = 5,
  FEMALE_BLACK = 6,
}

export enum LoadoutIds {
  CHARACTER = 3,
  VEHICLE_OFFROADER = 4,
  VEHICLE_PICKUP = 6,
  VEHICLE_POLICECAR = 8,
  VEHICLE_ATV = 14,
}

export enum LoadoutSlots {
  PRIMARY = 1,
  SECONDARY = 3,
  TERTIARY = 4,
  FISTS = 7,
  HEAD = 11,
  ARMOR = 38,
  ITEM2 = 41,
}

export enum EquipSlots {
  HEAD = 1,
  HANDS = 2,
  CHEST = 3,
  LEGS = 4,
  FEET = 5,
  RHAND = 7,
  BACKPACK = 10,
  HAIR = 27,
  FACE = 28,
  EYES = 29,
  ARMOR = 100,
}

export enum EntityTypes {
  INVALID,
  NPC,
  VEHICLE,
  PLAYER,
  OBJECT,
  DOOR,
  EXPLOSIVE,
  CONSTRUCTION_FOUNDATION,
  CONSTRUCTION_DOOR,
  CONSTRUCTION_SIMPLE,
  LOOTABLE_CONSTRUCTION,
  LOOTABLE_PROP,
}

export enum ResourceIds {
  HEALTH = 1,
  HUNGER = 4,
  HYDRATION = 5,
  STAMINA = 6,
  VIRUS = 12,
  BLEEDING = 21,
  COMFORT = 68,
  FUEL = 396,
  CONDITION = 561,
  CONSTRUCTION_CONDITION = 567,
}

export enum ResourceTypes {
  HEALTH = 1,
  HUNGER = 4,
  HYDRATION = 5,
  STAMINA = 6,
  VIRUS = 12,
  BLEEDING = 21,
  COMFORT = 68,
  FUEL = 50,
  CONDITION = 1,
}

export enum Items {
  //#region WEAPONS
  WEAPON_AR15 = 10,
  WEAPON_AK47 = 2229,
  WEAPON_SHOTGUN = 2663,
  WEAPON_CROWBAR = 82,
  WEAPON_COMBATKNIFE = 84,
  WEAPON_MACHETE01 = 83,
  WEAPON_KATANA = 2961,
  WEAPON_BAT_WOOD = 1724,
  WEAPON_GUITAR = 1733,
  WEAPON_AXE_WOOD = 58,
  WEAPON_AXE_FIRE = 1745,
  WEAPON_HAMMER = 1536,
  WEAPON_HATCHET = 3,
  WEAPON_PIPE = 1448,
  WEAPON_BAT_ALUM = 1721,
  WEAPON_BOW_MAKESHIFT = 113,
  WEAPON_BOW_WOOD = 1720,
  WEAPON_BOW_RECURVE = 1986,
  WEAPON_1911 = 2,
  WEAPON_M9 = 1997,
  WEAPON_308 = 1373,
  WEAPON_BINOCULARS = 1542,
  WEAPON_CROSSBOW = 2246,
  WEAPON_R380 = 1991,
  WEAPON_MOLOTOV = 14,
  WEAPON_MAGNUM = 1718,
  WEAPON_FLASHLIGHT = 1380,
  WEAPON_WRENCH = 1538,
  WEAPON_BRANCH = 1725,
  WEAPON_FISTS = 85,
  WEAPON_FIRST_AID = 78,
  WEAPON_FROSTBITE = 3445,
  WEAPON_BLAZE = 3446,
  WEAPON_NAGAFENS_RAGE = 3448,
  WEAPON_PURGE = 3449,
  WEAPON_REAPER = 3450,
  WEAPON_HAMMER_DEMOLITION = 1903,
  WEAPON_TORCH = 5,
  WEAPON_TORCH_ETHANOL = 1389,
  WEAPON_HATCHET_MAKESHIFT = 1708,
  WEAPON_AK47_MODIFIED = 2399,
  WEAPON_SPEAR = 1382,
  WEAPON_REMOVER = 1776,
  //#endregion

  //#region AMMO
  AMMO_223 = 1429,
  AMMO_12GA = 1511,
  AMMO_45 = 1428,
  AMMO_9MM = 1998, // TODO = assign it to a spawner
  AMMO_308 = 1469,
  AMMO_380 = 1992,
  AMMO_762 = 2325,
  AMMO_44 = 1719,
  AMMO_ARROW = 112,
  AMMO_ARROW_EXPLOSIVE = 138,
  AMMO_ARROW_FLAMING = 1434,
  //#endregion

  //#region PERISHABLE
  ANTIBIOTICS = 1388,
  VITAMINS = 1512,
  FIRST_AID = 2424,
  BANDAGE = 24,
  BANDAGE_DRESSED = 2214,
  GAUZE = 1751,
  SWIZZLE = 1709,
  GROUND_COFFEE = 56, // TODO = expand with more canned food types
  CANNED_FOOD01 = 7,
  BLACKBERRY = 105,
  BLACKBERRY_JUICE = 1361,
  BLACKBERRY_PIE = 1706,
  BLACKBERRY_PIE_SLICE = 1726,
  BLACKBERRY_HANDFUL = 3214,
  WATER_PURE = 1371,
  WATER_STAGNANT = 1535,
  WATER_DIRTY = 1368,
  MRE_APPLE = 1402, // TODO = add other MRE types
  SANDWICH_BEAR = 1459,
  STEAK_BEAR = 1451,
  SURVIVAL_BREAD = 1456,
  MEAT_BEAR = 1450,
  COFFEE = 55,
  COFFEE_SUGAR = 71,
  STEAK_RABBIT = 117,
  MEAT_RABBIT = 116,
  SANDWICH_RABBIT = 1457,
  STEW_RABBIT = 118,
  CORN = 107,
  CORN_ROASTED = 1387,
  JERKY_DEER = 21,
  MEAT_VENISON = 20,
  SANDWICH_DEER = 1460,
  STEAK_DEER = 61,
  HONEY = 2192,
  MOONSHINE = 1386,
  COLD_MEDICINE = 1742,
  SURVIVAL_BORSCHT = 1379,
  SANDWICH_WOLF = 1458,
  STEAK_WOLF = 1343,
  MEAT_WOLF = 1342,
  //#endregion

  //#region CONSTRUCTION
  GROUND_TAMPER = 124,
  SHACK = 1433,
  SHACK_SMALL = 1440,
  SHACK_BASIC = 1468,
  SHELTER = 150,
  SHELTER_LARGE = 153,
  SHELTER_UPPER_LARGE = 1897,
  SHELTER_UPPER = 1898,
  FOUNDATION = 1378,
  FOUNDATION_EXPANSION = 2336,
  FOUNDATION_RAMP = 2269,
  FOUNDATION_STAIRS = 2270,
  METAL_GATE = 148,
  DOOR_METAL = 1881,
  DOOR_WOOD = 1435,
  METAL_WALL = 149,
  METAL_WALL_UPPER = 1896,
  DOOR_BASIC = 1470,
  LANDMINE = 74,
  IED = 1699,
  PUNJI_STICKS = 98,
  //PUNJI_STICK_ROW = // NEED TO FIND THIS IN ITEM DEFINITIONS
  SNARE = 1415,
  ANIMAL_TRAP = 91,
  BARBED_WIRE = 108,
  BARBEQUE = 1447,
  BEE_BOX = 2034,
  CAMPFIRE = 15,
  CANDLE = 1904,
  DEW_COLLECTOR = 97,
  FURNACE = 64,
  LOOKOUT_TOWER = 2272,
  METAL_DOORWAY = 1969,
  REPAIR_BOX = 2792,
  SLEEPING_MAT = 51,
  STORAGE_BOX = 1982,
  STRUCTURE_STAIRS = 154,
  STRUCTURE_STAIRS_UPPER = 1900,
  WORKBENCH = 1891,
  WORKBENCH_WEAPON = 3778,
  BARRICADE = 122,
  //#endregion

  //#region COMPONENT
  SHARD_METAL = 114,
  SHARD_BRASS = 3780,
  SHARD_PLASTIC = 3775,
  GUNPOWDER_REFINED = 3805,
  ALLOY_LEAD = 3779,
  PROTOTYPE_MECHANISM = 3455,
  PROTOTYPE_TRIGGER_ASSEMBLY = 3456,
  PROTOTYPE_RECEIVER = 3457,
  NAIL = 135,
  BACKPACK_FRAME = 1466,
  METAL_BRACKET = 141,
  ANIMAL_FAT = 72,
  FLOUR = 1455,
  WAX = 2193,
  PHONE_DEAD = 2635,
  PHONE_BATTERY = 2637,
  PHONE_CHARGED = 2636,
  CORN_MASH = 1385,
  YEAST = 1445,
  DEER_SCENT = 1462,
  DEER_BLADDER = 1463,
  DUCT_TAPE = 134,
  TRAP_IGNITION_KIT = 2831,
  SALINE = 77,
  WHEAT = 1438,
  TWINE = 142,
  GUN_PART = 1890,
  REPAIR_KIT_GUN = 1895,
  UPGRADE_KIT_GUN = 2419,
  CHARCOAL = 26,
  METAL_BAR = 39,
  ANTI_VIRAL_BOTTLE = 2671,
  HANDWRITTEN_NOTE_CAROLINE = 2611,
  ANTI_VIRAL_BOTTLE_EMPTY = 2612,
  GRENADE_SONIC_BROKEN = 3040,
  VIAL_H1Z1_B_PLASMA = 3041,
  VIAL_H1Z1_REDUCER = 2498,
  BATTERIES_AA = 2833,
  BRAIN_TREATED = 2643,
  BRAIN_INFECTED = 2642,
  SYRINGE_INFECTED_BLOOD = 1510,
  EMPTY_SPECIMEN_BAG = 2641,
  //#endregion

  TRAP_FIRE = 2812,
  TRAP_FLASH = 2810,
  TRAP_GAS = 2811,
  TRAP_SHOCK = 2832,

  BACKPACK_FRAMED = 2111,
  BACKPACK_SATCHEL = 1432,
  BACKPACK_MILITARY_TAN = 2124,
  BACKPACK_BLUE_ORANGE = 2038,
  HELMET_MOTORCYCLE = 2170, // TODO = expand with other default helmet colors
  HAT_CAP = 12, // TODO = expand with other cap colors
  SHIRT_DEFAULT = 2088, // TODO = expand with other default shirts
  PANTS_DEFAULT = 2177, // TODO = expand with other default pants
  CONVEYS_BLUE = 2217, // TODO = expand with other convey colors
  HAT_BEANIE = 2162,
  SUGAR = 57,
  BATTERY = 1696,
  SPARKPLUGS = 1701,
  SALT = 22,
  LIGHTER = 1436,
  BOW_DRILL = 1452,
  WATER_EMPTY = 1353,
  FUEL_BIOFUEL = 73,
  FUEL_ETHANOL = 1384,
  WOOD_PLANK = 109,
  METAL_SHEET = 46,
  METAL_SCRAP = 48,
  TARP = 155,
  WOOD_LOG = 16,
  WOOD_STICK = 111,
  GROUND_TILLER = 1383,
  FERTILIZER = 25,
  SEED_CORN = 1987,
  SEED_WHEAT = 1988,
  VIAL_EMPTY = 2510,
  SYRINGE_EMPTY = 1508,
  GHILLIE_SUIT = 92,
  GHILLIE_SUIT_TAN = 2570,
  HELMET_TACTICAL = 2172,
  RESPIRATOR = 2148,
  NV_GOGGLES = 1700,
  GUNPOWDER = 11,
  KEVLAR_DEFAULT = 2271,
  ARMOR_PLATED = 2205,
  ARMOR_WOODEN = 2204,
  CLOTH = 23,
  METAL_PIPE = 47,
  GRENADE_SMOKE = 2236,
  GRENADE_FLASH = 2235,
  GRENADE_GAS = 2237,
  GRENADE_HE = 65,
  GRENADE_SCREAM = 3022,
  MAP = 1985,
  COMPASS = 1441,
  FLARE = 1804,
  FLARE_PARACHUTE = 1906,
  FLARE_SMOKE = 1672,
  BACKPACK_RASTA = 2393,
  WAIST_PACK = 1803,
  FANNY_PACK_DEV = 1,
  VEHICLE_KEY = 3460,
  CODED_MESSAGE = 2722,
  AIRDROP_CODE = 2675,
  BANDANA_BASIC = 2323,
  GLOVES_FINGERLESS = 2324,
  HAND_SHOVEL = 1697,
  COMPASS_IMPROVISED = 1444,
  SKINNING_KNIFE = 110,
  RIGGED_LIGHT = 1748,
  SYRINGE_H1Z1_REDUCER = 1464,

  HEADLIGHTS_OFFROADER = 9,
  HEADLIGHTS_PICKUP = 1728,
  HEADLIGHTS_POLICE = 1730,
  HEADLIGHTS_ATV = 2595,

  TURBO_OFFROADER = 90,
  TURBO_PICKUP = 1729,
  TURBO_POLICE = 1731,
  TURBO_ATV = 2727,

  VEHICLE_HOTWIRE = 3458,
  VEHICLE_MOTOR_OFFROADER = 1344,
  VEHICLE_MOTOR_PICKUP = 1712,
  VEHICLE_MOTOR_POLICECAR = 1722,
  VEHICLE_MOTOR_ATV = 2594,

  VEHICLE_HORN = 1858,
  VEHICLE_HORN_POLICECAR = 1735,
  VEHICLE_SIREN_POLICECAR = 1732,

  // NOT USED FOR NOW
  VEHICLE_CONTAINER_OFFROADER = 1541,
  VEHICLE_CONTAINER_PICKUP = 1783,
  VEHICLE_CONTAINER_POLICECAR = 1723,
  VEHICLE_CONTAINER_ATV = 2728,

  CONTAINER_DROPPED_ITEMS = 5001,
  CONTAINER_VEHICLE_OFFROADER = 5002,
  CONTAINER_VEHICLE_PICKUP = 5003,
  CONTAINER_VEHICLE_POLICECAR = 5004,
  CONTAINER_VEHICLE_ATV = 5005,
  CONTAINER_STORAGE = 5006,
  CONTAINER_WRECKED_VAN = 5007,
  CONTAINER_WRECKED_CAR = 5008,
  CONTAINER_WRECKED_TRUCK = 5009,
  CONTAINER_WEAPONS_LOCKER = 5010,
  CONTAINER_DESK = 5011,
  CONTAINER_CABINETS = 5012,
  CONTAINER_TOOL_CABINETS = 5013,
  CONTAINER_DUMPSTER = 5014,
  CONTAINER_FILE_CABINET = 5015,
  CONTAINER_LOCKER = 5016,
  CONTAINER_FRIDGE = 5017,
  CONTAINER_OTTOMAN = 5018,
  CONTAINER_DRESSER = 5019,
  CONTAINER_ARMOIRE = 5020,
  CONTAINER_CABINETS_BATHROOM = 5021,
  CONTAINER_CABINETS_CUBE = 5022,
  CONTAINER_CABINETS_KITCHEN = 5023,
  CONTAINER_GARBAGE_CAN = 5024,
}
