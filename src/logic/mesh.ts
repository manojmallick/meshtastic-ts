import type { BaseClient } from "../client.js";
import type { MeshNode, MeshPacket } from "../types.js";

export function listNodes(client: BaseClient): Promise<{ nodes: MeshNode[] }> {
  return client.request("/nodes");
}

export function sendText(
  client: BaseClient,
  to: string,
  text: string,
  channel = 0,
): Promise<{ ok: boolean }> {
  return client.request("/messages", {
    method: "POST",
    body: JSON.stringify({ to, text, channel }),
  });
}

export function recentPackets(
  client: BaseClient,
): Promise<{ packets: MeshPacket[] }> {
  return client.request("/packets");
}
