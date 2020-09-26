export default packetHandlers;
declare var packetHandlers: {
    ClientIsReady: (server: any, client: any, packet: any) => void;
    "AdminCommand.RunSpeed": (server: any, client: any, packet: any) => void;
    "Loadout.SelectSlot": (server: any, client: any, packet: any) => void;
    GameTimeSync: (server: any, client: any, packet: any) => void;
    Synchronization: (server: any, client: any, packet: any) => void;
    "Command.ExecuteCommand": (server: any, client: any, packet: any, ...args: any[]) => void;
    "Command.SetProfile": (server: any, client: any, packet: any) => void;
    "Command.InteractRequest": (server: any, client: any, packet: any) => void;
    "Command.InteractionSelect": (server: any, client: any, packet: any) => void;
    "Vehicle.Spawn": (server: any, client: any, packet: any) => void;
    "Vehicle.AutoMount": (server: any, client: any, packet: any) => void;
    "AdminCommand.SpawnVehicle": (server: any, client: any, packet: any) => void;
    "ProfileStats.GetPlayerProfileStats": (server: any, client: any, packet: any) => void;
    GetRewardBuffInfo: (server: any, client: any, packet: any) => void;
    GetContinentBattleInfo: (server: any, client: any, packet: any) => void;
    PlayerUpdateUpdatePositionClientToZone: (server: any, client: any, packet: any) => void;
};
