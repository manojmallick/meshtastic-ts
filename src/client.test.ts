import { beforeEach, describe, expect, it, vi } from "vitest";
import { MeshtasticClient, ApiError } from "./index.js";

describe("MeshtasticClient", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("lists active mesh nodes", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({ nodes: [{ id: "!abc1234", shortName: "Hill", longName: "Hilltop Relay" }] }),
          { status: 200 },
        ),
      ),
    );
    const c = new MeshtasticClient({ baseUrl: "http://mesh" });
    const { nodes } = await c.nodes.list();
    expect(nodes[0]!.id).toBe("!abc1234");
    expect(nodes[0]!.shortName).toBe("Hill");
  });

  it("sends text message across mesh network", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({ ok: true }),
          { status: 200 },
        ),
      ),
    );
    const c = new MeshtasticClient({ baseUrl: "http://mesh" });
    const res = await c.messages.sendText("^all", "Base station online");
    expect(res).toEqual({ ok: true });
  });

  it("queries recent mesh packet log", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            packets: [
              { id: "pkt_101", fromNode: "!node1", toNode: "^all", payload: "Test packet", timestamp: "2026-07-22T12:00:00Z" },
            ],
          }),
          { status: 200 },
        ),
      ),
    );
    const c = new MeshtasticClient({ baseUrl: "http://mesh" });
    const { packets } = await c.packets.recent();
    expect(packets.length).toBe(1);
    expect(packets[0].payload).toBe("Test packet");
  });

  it("errors on 500 status after retries exhausted", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("Gateway unavailable", { status: 503 })),
    );
    const c = new MeshtasticClient({ baseUrl: "http://mesh", maxRetries: 0 });
    await expect(c.packets.recent()).rejects.toBeInstanceOf(ApiError);
  });
});
