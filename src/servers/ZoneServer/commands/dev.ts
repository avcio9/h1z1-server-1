import { Client } from "types/zoneserver";
import { ZoneServer } from "../zoneserver";

const debug = require("debug")("zonepacketHandlers");

const dev: any = {
  testpacket: function (server: ZoneServer, client: Client, args: any[]) {
    const packetName = args[1];
    server.sendData(client, "ClientUpdate.StartTimer", {
      stringId: 0,
      time: 0,
    });
  },
  d: function (server: ZoneServer, client: Client, args: any[]) { // quick disconnect
    server.sendData(client, "CharacterSelectSessionResponse", {
      status: 1,
      sessionId: client.loginSessionId,
    });
  },
  testNpc: function (server: ZoneServer, client: Client, args: any[]) {
    const characterId = server.generateGuid();
    server.sendData(client, "PlayerUpdate.AddLightweightNpc", {
      characterId: characterId,
      modelId: 9001,
      transientId: server.getTransientId(client, characterId),
      position: client.character.state.position,
      extraModel: "SurvivorMale_Ivan_AviatorHat_Base.adr",
      attachedObject: {
        unknown1: "0x0000000000000000",
        unknownVector2: client.character.state.position,
        unknownVector3: [0, 0, 0, 0],
        unknown4: 0,
        unknown33: 0,
      },
      color: { r: 0, g: 0, b: 0 },
      array5: [{ unknown1: 0 }],
      array17: [{ unknown1: 0 }],
      array18: [{ unknown1: 0 }],
    });
    /* setInterval(() => {
      server.sendData(client, "PlayerUpdate.SeekTarget", {
        characterId: characterId,
        TargetCharacterId: client.character.characterId,
        position: client.character.state.position,
      });
    }, 500);*/
  },
  testVehicle: function (server: ZoneServer, client: Client, args: any[]) {
    const characterId = server.generateGuid();
    const vehicleData = {
      npcData:  {
        guid: server.generateGuid(),
        transientId: 1,
        modelId: 7225,
        scale: [1, 1, 1, 1],
        position: client.character.state.position,
        attachedObject: {},
        color: {},
        unknownArray1: [],
        array5: [{ unknown1: 0 }],
        array17: [{ unknown1: 0 }],
        array18: [{ unknown1: 0 }],
      },
      unknownGuid1: characterId,
      unknownDword1: 0,
      unknownDword2: 0,
      positionUpdate: server.createPositionUpdate(
        new Float32Array([0, 0, 0, 0]),
        [0, 0, 0, 0]
      ),
      unknownString1: "",
    };

    server.sendData(client, "PlayerUpdate.AddLightweightVehicle", vehicleData);
  },
  findModel: function (server: ZoneServer, client: Client, args: any[]) {
    const models = require("../../../../data/dataSources/Models.json");
    const wordFilter = args[1];
    if (wordFilter) {
      const result = models.filter((word: any) =>
        word?.MODEL_FILE_NAME?.toLowerCase().includes(wordFilter.toLowerCase())
      );
      server.sendChatText(client, `Found models for ${wordFilter}:`);
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        server.sendChatText(client, `${element.ID} ${element.MODEL_FILE_NAME}`);
      }
    } else {
      server.sendChatText(client, `missing word filter`);
    }
  },
  reloadPackets: function (server: ZoneServer, client: Client, args: any[]) {
    if (args[1]) {
      server.reloadPackets(client, args[1]);
    } else {
      server.reloadPackets(client);
    }
  },
  reloadMongo: function (server: ZoneServer, client: Client, args: any[]) {
    server._soloMode
      ? server.sendChatText(client, "Can't do that in solomode...")
      : server.reloadMongoData(client);
  },
};

export default dev;
