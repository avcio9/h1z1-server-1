// ======================================================================
//
//   GNU GENERAL PUBLIC LICENSE
//   Version 3, 29 June 2007
//   copyright (C) 2020 - 2021 Quentin Gruber
//   copyright (C) 2021 - 2022 H1emu community
//
//   https://github.com/QuentinGruber/h1z1-server
//   https://www.npmjs.com/package/h1z1-server
//
//   Based on https://github.com/psemu/soe-network
// ======================================================================

import {
  LoadoutIds,
  LoadoutSlots,
  ResourceIds,
  ResourceTypes,
} from "../models/enums";
import { ZoneClient2016 } from "./zoneclient";
import { ZoneServer2016 } from "../zoneserver";
import { BaseFullCharacter } from "./basefullcharacter";
import {
  DamageInfo,
  DamageRecord,
  inventoryItem,
  positionUpdate,
} from "../../../types/zoneserver";
import { randomIntFromInterval } from "../../../utils/utils";
const stats = require("../../../../data/2016/sampleData/stats.json");

interface CharacterStates {
  invincibility?: boolean;
  gmHidden?: boolean;
  knockedOut?: boolean;
  inWater?: boolean;
}

interface CharacterMetrics {
  zombiesKilled: number;
  wildlifeKilled: number;
  recipesDiscovered: number;
  startedSurvivingTP: number; // timestamp
}
export class Character2016 extends BaseFullCharacter {
  name?: string;
  spawnLocation?: string;
  resourcesUpdater?: any;
  factionId = 2;
  godMode = false;
  characterStates: CharacterStates;
  isRunning = false;
  isHidden: string = "";
  isBleeding = false;
  isBandaged = false;
  isExhausted = false;
  static isAlive = true;
  public set isAlive(state) {
    this.characterStates.knockedOut = !state;
  }
  public get isAlive() {
    return !this.characterStates.knockedOut;
  }
  isSonic = false;
  isMoving = false;
  actorModelId!: number;
  headActor!: string;
  hairModel!: string;
  isRespawning = false;
  isReady = false;
  creationDate!: string;
  lastLoginDate!: string;
  currentLoadoutSlot = LoadoutSlots.FISTS;
  readonly loadoutId = LoadoutIds.CHARACTER;
  startRessourceUpdater: any;
  healingInterval?: any;
  healingTicks: number;
  healingMaxTicks: number;
  starthealingInterval: any;
  timeouts: any;
  hasConveys: boolean = false;
  positionUpdate?: positionUpdate;
  tempGodMode = false;
  isSpectator = false;
  initialized = false; // if sendself has been sent
  readonly metrics: CharacterMetrics = {
    recipesDiscovered: 0,
    zombiesKilled: 0,
    wildlifeKilled: 0,
    startedSurvivingTP: Date.now(),
  };
  private combatlog: DamageRecord[] = [];
  // characterId of vehicle spawned by /hax drive or spawnvehicle
  ownedVehicle?: string;
  currentInteractionGuid?: string;
  constructor(characterId: string, transientId: number) {
    super(
      characterId,
      transientId,
      0,
      new Float32Array([0, 0, 0, 1]),
      new Float32Array([0, 0, 0, 1])
    );
    this.healingTicks = 0;
    this.healingMaxTicks = 0;
    (this._resources = {
      [ResourceIds.HEALTH]: 10000,
      [ResourceIds.STAMINA]: 600,
      [ResourceIds.HUNGER]: 10000,
      [ResourceIds.HYDRATION]: 10000,
      [ResourceIds.VIRUS]: 0,
      [ResourceIds.COMFORT]: 5000,
      [ResourceIds.BLEEDING]: -40,
    }),
      (this.characterStates = {
        knockedOut: false,
        inWater: false,
      });
    this.timeouts = {};
    this.starthealingInterval = (
      client: ZoneClient2016,
      server: ZoneServer2016
    ) => {
      client.character.healingInterval = setTimeout(() => {
        if (!server._clients[client.sessionId]) {
          return;
        }
        client.character._resources[ResourceIds.HEALTH] += 100;
        if (client.character._resources[ResourceIds.HEALTH] > 10000) {
          client.character._resources[ResourceIds.HEALTH] = 10000;
        }

        server.updateResource(
          client,
          client.character.characterId,
          client.character._resources[ResourceIds.HEALTH],
          ResourceIds.HEALTH
        );
        if (
          client.character.healingTicks++ < client.character.healingMaxTicks
        ) {
          client.character.healingInterval.refresh();
        } else {
          client.character.healingMaxTicks = 0;
          client.character.healingTicks = 0;
          delete client.character.healingInterval;
        }
      }, 1000);
    };

    this.startRessourceUpdater = (
      client: ZoneClient2016,
      server: ZoneServer2016
    ) => {
      const hunger = this._resources[ResourceIds.HUNGER],
        hydration = this._resources[ResourceIds.HYDRATION],
        health = this._resources[ResourceIds.HEALTH],
        virus = this._resources[ResourceIds.VIRUS],
        stamina = this._resources[ResourceIds.STAMINA],
        bleeding = this._resources[ResourceIds.BLEEDING];

      client.character.resourcesUpdater = setTimeout(() => {
        // prototype resource manager
        if (!server._clients[client.sessionId]) {
          return;
        }
        const { isRunning } = client.character;
        if (
          isRunning &&
          (client.vehicle.mountedVehicle == "" ||
            !client.vehicle.mountedVehicle)
        ) {
          client.character._resources[ResourceIds.STAMINA] -= 15;
          client.character.isExhausted =
            client.character._resources[ResourceIds.STAMINA] < 120;
        } else if (!client.character.isBleeding || !client.character.isMoving) {
          client.character._resources[ResourceIds.STAMINA] += 30;
        }

        // todo: modify sprint stat
        client.character._resources[ResourceIds.HUNGER] -= 10;
        client.character._resources[ResourceIds.HYDRATION] -= 20;
        if (client.character._resources[ResourceIds.STAMINA] > 600) {
          client.character._resources[ResourceIds.STAMINA] = 600;
        } else if (client.character._resources[ResourceIds.STAMINA] < 0) {
          client.character._resources[ResourceIds.STAMINA] = 0;
        }
        if (client.character._resources[ResourceIds.BLEEDING] > 0) {
          this.damage(server, {
            entity: "",
            damage:
              Math.ceil(
                client.character._resources[ResourceIds.BLEEDING] / 40
              ) * 100,
          });
        }
        if (client.character._resources[ResourceIds.BLEEDING] > 80) {
          client.character._resources[ResourceIds.BLEEDING] = 80;
        }
        if (client.character._resources[ResourceIds.BLEEDING] < -40) {
          client.character._resources[ResourceIds.BLEEDING] = -40;
        }
        if (client.character._resources[ResourceIds.HUNGER] > 10000) {
          client.character._resources[ResourceIds.HUNGER] = 10000;
        } else if (client.character._resources[ResourceIds.HUNGER] < 0) {
          client.character._resources[ResourceIds.HUNGER] = 0;
          this.damage(server, { entity: "", damage: 100 });
        }
        if (client.character._resources[ResourceIds.HYDRATION] > 10000) {
          client.character._resources[ResourceIds.HYDRATION] = 10000;
        } else if (client.character._resources[ResourceIds.HYDRATION] < 0) {
          client.character._resources[ResourceIds.HYDRATION] = 0;
          this.damage(server, { entity: "", damage: 100 });
        }
        if (client.character._resources[ResourceIds.HEALTH] > 10000) {
          client.character._resources[ResourceIds.HEALTH] = 10000;
        } else if (client.character._resources[ResourceIds.HEALTH] < 0) {
          client.character._resources[ResourceIds.HEALTH] = 0;
        }

        if (client.character._resources[ResourceIds.HUNGER] != hunger) {
          server.updateResourceToAllWithSpawnedEntity(
            client.character.characterId,
            client.character._resources[ResourceIds.HUNGER],
            ResourceIds.HUNGER,
            ResourceTypes.HUNGER,
            server._characters
          );
        }
        if (client.character._resources[ResourceIds.HYDRATION] != hydration) {
          server.updateResourceToAllWithSpawnedEntity(
            client.character.characterId,
            client.character._resources[ResourceIds.HYDRATION],
            ResourceIds.HYDRATION,
            ResourceTypes.HYDRATION,
            server._characters
          );
        }
        if (client.character._resources[ResourceIds.HEALTH] != health) {
          server.updateResourceToAllWithSpawnedEntity(
            client.character.characterId,
            client.character._resources[ResourceIds.HEALTH],
            ResourceIds.HEALTH,
            ResourceTypes.HEALTH,
            server._characters
          );
        }
        if (client.character._resources[ResourceIds.VIRUS] != virus) {
          server.updateResourceToAllWithSpawnedEntity(
            client.character.characterId,
            client.character._resources[ResourceIds.VIRUS],
            ResourceIds.VIRUS,
            ResourceTypes.VIRUS,
            server._characters
          );
        }
        if (client.character._resources[ResourceIds.STAMINA] != stamina) {
          server.updateResourceToAllWithSpawnedEntity(
            client.character.characterId,
            client.character._resources[ResourceIds.STAMINA],
            ResourceIds.STAMINA,
            ResourceTypes.STAMINA,
            server._characters
          );
        }
        if (client.character._resources[ResourceIds.BLEEDING] != bleeding) {
          server.updateResourceToAllWithSpawnedEntity(
            client.character.characterId,
            client.character._resources[ResourceIds.BLEEDING] > 0
              ? client.character._resources[ResourceIds.BLEEDING]
              : 0,
            ResourceIds.BLEEDING,
            ResourceTypes.BLEEDING,
            server._characters
          );
        }

        client.character.resourcesUpdater.refresh();
      }, 3000);
    };
  }
  clearReloadTimeout() {
    const weaponItem = this.getEquippedWeapon();
    if (!weaponItem.weapon?.reloadTimer) return;
    clearTimeout(weaponItem.weapon.reloadTimer);
    weaponItem.weapon.reloadTimer = undefined;
  }
  addCombatlogEntry(entry: DamageRecord) {
    this.combatlog.push(entry);
    if (this.combatlog.length > 10) {
      this.combatlog.shift();
    }
  }
  getCombatLog() {
    return this.combatlog;
  }
  /**
   * Gets the lightweightpc packetfields for use in sendself and addlightweightpc
   */
  pGetLightweight() {
    return {
      ...super.pGetLightweight(),
      rotation: this.state.lookAt,
      identity: {
        characterName: this.name,
      },
    };
  }

  pGetSendSelf(server: ZoneServer2016, guid = "") {
    return {
      ...this.pGetLightweight(),
      guid: guid,
      hairModel: this.hairModel,
      isRespawning: this.isRespawning,
      gender: this.gender,
      creationDate: this.creationDate,
      lastLoginDate: this.lastLoginDate,
      identity: {
        characterName: this.name,
      },
      inventory: {
        items: this.pGetInventoryItems(server),
        //unknownDword1: 2355
      },
      recipes: server.pGetRecipes(), // todo: change to per-character recipe lists
      stats: stats,
      loadoutSlots: this.pGetLoadoutSlots(),
      equipmentSlots: this.pGetEquipment(),
      characterResources: this.pGetResources(),
      containers: this.pGetContainers(server),
      //unknownQword1: this.characterId,
      //unknownDword38: 1,
      //vehicleLoadoutRelatedQword: this.characterId,
      //unknownQword3: this.characterId,
      //vehicleLoadoutRelatedDword: 1,
      //unknownDword40: 1
    };
  }

  pGetRemoteWeaponData(server: ZoneServer2016, item: inventoryItem) {
    const itemDefinition = server.getItemDefinition(item.itemDefinitionId),
      weaponDefinition = server.getWeaponDefinition(itemDefinition.PARAM1),
      firegroups = weaponDefinition.FIRE_GROUPS;
    return {
      weaponDefinitionId: weaponDefinition.ID,
      equipmentSlotId: this.getActiveEquipmentSlot(item),
      firegroups: firegroups.map((firegroup: any) => {
        const firegroupDef = server.getFiregroupDefinition(
            firegroup.FIRE_GROUP_ID
          ),
          firemodes = firegroupDef?.FIRE_MODES;
        if (!firemodes) {
          console.error(`firegroupDef missing for ${firegroup}`);
        }
        return {
          firegroupId: firegroup.FIRE_GROUP_ID,
          unknownArray1: firegroup
            ? firemodes.map((firemode: any, j: number) => {
                return {
                  unknownDword1: j,
                  unknownDword2: firemode.FIRE_MODE_ID,
                };
              })
            : [], // probably firemodes
        };
      }),
    };
  }

  pGetRemoteWeaponExtraData(server: ZoneServer2016, item: inventoryItem) {
    const itemDefinition = server.getItemDefinition(item.itemDefinitionId),
      weaponDefinition = server.getWeaponDefinition(itemDefinition.PARAM1),
      firegroups = weaponDefinition.FIRE_GROUPS;
    return {
      guid: item.itemGuid,
      unknownByte1: 0, // firegroupIndex (default 0)?
      unknownByte2: 0, // MOST LIKELY firemodeIndex?
      unknownByte3: -1,
      unknownByte4: -1,
      unknownByte5: 1,
      unknownDword1: 0,
      unknownByte6: 0,
      unknownDword2: 0,
      unknownArray1: firegroups.map(() => {
        // same len as firegroups in remoteweapons
        return {
          // setting unknownDword1 makes the 308 sound when fullpc packet it sent
          unknownDword1: 0, //firegroup.FIRE_GROUP_ID,
          unknownBoolean1: false,
          unknownBoolean2: false,
        };
      }),
    };
  }

  pGetRemoteWeaponsData(server: ZoneServer2016) {
    const remoteWeapons: any[] = [];
    Object.values(this._loadout).forEach((item) => {
      if (server.isWeapon(item.itemDefinitionId)) {
        remoteWeapons.push({
          guid: item.itemGuid,
          ...this.pGetRemoteWeaponData(server, item),
        });
      }
    });
    return remoteWeapons;
  }

  pGetRemoteWeaponsExtraData(server: ZoneServer2016) {
    const remoteWeaponsExtra: any[] = [];
    Object.values(this._loadout).forEach((item) => {
      if (server.isWeapon(item.itemDefinitionId)) {
        remoteWeaponsExtra.push(this.pGetRemoteWeaponExtraData(server, item));
      }
    });
    return remoteWeaponsExtra;
  }

  resetMetrics() {
    this.metrics.zombiesKilled = 0;
    this.metrics.wildlifeKilled = 0;
    this.metrics.recipesDiscovered = 0;
    this.metrics.startedSurvivingTP = Date.now();
  }

  damage(server: ZoneServer2016, damageInfo: DamageInfo) {
    const client = server.getClientByCharId(this.characterId),
      damage = damageInfo.damage,
      oldHealth = this._resources[ResourceIds.HEALTH];
    if (!client) return;

    if (!this.godMode && this.isAlive) {
      if (damage < 100) {
        return;
      }
      if (damageInfo.causeBleed) {
        if (randomIntFromInterval(0, 100) < damage / 100 && damage > 500) {
          this._resources[ResourceIds.BLEEDING] += 41;
          if (damage > 4000) {
            this._resources[ResourceIds.BLEEDING] += 41;
          }
          server.updateResourceToAllWithSpawnedEntity(
            this.characterId,
            this._resources[ResourceIds.BLEEDING],
            ResourceIds.BLEEDING,
            ResourceTypes.BLEEDING,
            server._characters
          );
        }
      }
      this._resources[ResourceIds.HEALTH] -= damage;
      if (this._resources[ResourceIds.HEALTH] <= 0) {
        this._resources[ResourceIds.HEALTH] = 0;
        server.killCharacter(client, damageInfo);
      }
      server.updateResource(
        client,
        this.characterId,
        this._resources[ResourceIds.HEALTH],
        ResourceIds.HEALTH
      );

      const sourceEntity = server.getEntity(damageInfo.entity);
      if (!sourceEntity) return;

      const orientation =
        Math.atan2(
          this.state.position[2] - sourceEntity.state.position[2],
          this.state.position[0] - sourceEntity.state.position[0]
        ) *
          -1 -
        1.4;
      server.sendData(client, "ClientUpdate.DamageInfo", {
        transientId: 0,
        orientationToSource: orientation,
        unknownDword2: 100,
      });

      const damageRecord = server.generateDamageRecord(
        this.characterId,
        damageInfo,
        oldHealth
      );
      this.addCombatlogEntry(damageRecord);
      server.combatLog(client);

      const sourceClient = server.getClientByCharId(damageInfo.entity);
      if (!sourceClient?.character) return;
      sourceClient.character.addCombatlogEntry(damageRecord);
      server.combatLog(sourceClient);
    }
  }

  OnFullCharacterDataRequest(server: ZoneServer2016, client: ZoneClient2016) {
    server.sendData(client, "LightweightToFullPc", {
      useCompression: false,
      fullPcData: {
        transientId: this.transientId,
        attachmentData: this.pGetAttachmentSlots(),
        headActor: this.headActor,
        hairModel: this.hairModel,
        resources: { data: this.pGetResources() },
        remoteWeapons: { data: this.pGetRemoteWeaponsData(server) },
      },
      positionUpdate: {
        ...this.positionUpdate,
        sequenceTime: server.getGameTime(),
      },
      stats: stats.map((stat: any) => {
        return stat.statData;
      }),
      remoteWeaponsExtra: this.pGetRemoteWeaponsExtraData(server),
    });

    // needed so all weapons replicate reload and projectile impact
    Object.values(this._loadout).forEach((item) => {
      if (!server.isWeapon(item.itemDefinitionId)) return;
      server.sendRemoteWeaponUpdateData(
        client,
        this.transientId,
        item.itemGuid,
        "Update.SwitchFireMode",
        {
          firegroupIndex: 0,
          firemodeIndex: 0,
        }
      );
    });

    server.sendData(client, "Character.WeaponStance", {
      characterId: this.characterId,
      stance: this.positionUpdate?.stance,
    });

    if (this.onReadyCallback) {
      this.onReadyCallback(client);
      delete this.onReadyCallback;
    }
  }

  OnProjectileHit(
    server: ZoneServer2016,
    client: ZoneClient2016,
    damageInfo: DamageInfo
  ) {
    server;
    client;
    damageInfo;
    // TODO
  }
}
