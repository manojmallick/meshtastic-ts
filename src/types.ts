export interface MeshNode {
  id: string;
  shortName?: string;
  longName?: string;
  lastHeard?: string;
  snr?: number;
  battery?: number;
  latitude?: number;
  longitude?: number;
}

export interface MeshPacket {
  from: string;
  to: string;
  channel: number;
  payload: string;
  rxTime: string;
  portnum?: string;
}

export interface ConnectionInfo {
  transport: "serial" | "ble" | "mqtt" | "http";
  endpoint: string;
}
