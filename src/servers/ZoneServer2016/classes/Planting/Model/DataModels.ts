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

//The furrows contains 2 furrow and also 4 holes in that;
import { Euler, Vector4 } from "./TypeModels";
import { MoveToByParent } from "../Utils";
import { generateRandomGuid } from "../../../../../utils/utils";

export class Furrows {
  //There's 4 holes in per furrows.
  public TimerInstance?: number;
  public Holes: Hole[];
  constructor(
    public Owner: string,
    public Position: Vector4,
    public Rotation: Euler,
    public CreateTime: number,
    public Duration: number,
    holes: Hole[],
    public Id: string
  ) {
    if (holes) {
      this.Holes = holes;
    } else {
      this.Holes = [];
      for (let i = 0; i < 4; i++) {
        const posRot = this.createHolePosRot(this.Position, this.Rotation, i);
        const currentHole = new Hole(
          null,
          posRot.NewPos,
          posRot.NewRot,
          0,
          generateRandomGuid()
        );
        this.Holes.push(currentHole);
      }
    }
    // this.CreateTime = CreateTime ? CreateTime : Date.now();
    // this.ExpirationTime = ExpirationTime ? ExpirationTime : this.CreateTime + 1000 * 60 * 60;
  }

  private createHolePosRot = (
    parentPos: Vector4,
    parentRot: Euler,
    holeIndex: number
  ): { NewPos: Vector4; NewRot: Euler } => {
    // todo maybe not just 45deg is right and maybe pos and rot param will receive from placement request
    return MoveToByParent(
      parentPos,
      parentRot,
      new Euler(-Math.PI / 4 + (-Math.PI / 4) * holeIndex, 0, 0),
      0.3
    );
  };
}

export class Hole {
  public LastFertilizeTime?: number;
  //also as spawnerId
  public CreateTime: number;
  constructor(
    public InsideCropsPile: CropsPile | null,
    public Position: Vector4,
    public Rotation: Euler,
    public FertilizerDuration: number,
    public Id: string
  ) {
    this.CreateTime = Date.now();
  }
}

export enum SeedType {
  Corn = 1417,
  Corn2 = 1987,
  Wheat = 1419,
  Wheat2 = 1988,
}
export interface ObjectInHole {
  Name: string;
  Guid: string;
}
export class Seed implements ObjectInHole {
  public Name: string;
  public TimeToGrown: number;
  constructor(
    public Type: SeedType,
    public SwingTime: number,
    public Guid: string
  ) {
    switch (this.Type) {
      case SeedType.Wheat:
      case SeedType.Wheat2:
        this.Name = "Wheat Seed";
        this.TimeToGrown = 40000;
        break;
      case SeedType.Corn2:
      case SeedType.Corn:
      default:
        this.Name = "Corn Seed";
        this.TimeToGrown = 30000;
        break;
    }
    // this.Guid = getGuidStr();
  }
}

export class Fertilizer {}

export enum CropsPileStatus {
  Sowed = "Sowed",
  Sapling = "Sapling",
  Growing = "Growing",
  Grown = "Grown",
}

interface LootAbleProduct {
  Name: string;
  ItemDefinitionId: number;
  Count: number;
}
export class CropsPile implements ObjectInHole {
  get Name() {
    return this.EmbryoSeed.Name + " " + this.Status.toString();
  }
  public LootAbleProducts: LootAbleProduct[];
  constructor(
    public EmbryoSeed: Seed,
    public Status: CropsPileStatus,
    public Guid: string
  ) {
    this.LootAbleProducts = [];
  }
}
