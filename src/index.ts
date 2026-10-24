import { BaseClient, type ClientOptions } from "./client.js";
import { listNodes, recentPackets, sendText } from "./logic/mesh.js";
import type { MeshNode, MeshPacket, ConnectionInfo } from "./types.js";

export { ApiError } from "./errors.js";
export { BaseClient, type ClientOptions } from "./client.js";
export type { MeshNode, MeshPacket, ConnectionInfo };

/**
 * Typed Meshtastic client — HTTP gateway today; serial/BLE transports next.
 * Pairs with MeshPost for hosted fleet telemetry.
 */
export class MeshtasticClient extends BaseClient {
  constructor(options: ClientOptions = {}) {
    super(options);
  }

  nodes = {
    list: () => listNodes(this),
  };

  messages = {
    sendText: (to: string, text: string, channel?: number) =>
      sendText(this, to, text, channel),
  };

  packets = {
    recent: () => recentPackets(this),
  };
}

export class ApiClient extends MeshtasticClient {}
