# meshtastic-ts — ship & npm release guide

## Pitch

**Typed TypeScript client SDK (`MeshtasticClient`)** for Meshtastic off-grid mesh radio networks. Connect web applications, fleet management systems, and emergency response tools to HTTP/MQTT/Serial Meshtastic gateway nodes with full TypeScript type safety.

Thesis: **Open-source SDK** (`npm install meshtastic-ts`) powering off-grid comms and pairs with MeshPost for fleet telemetry.

## 10-minute demo

```bash
cd meshtastic-ts
pnpm install
pnpm build
```

1. Initialize `MeshtasticClient` pointing at local or network Meshtastic HTTP gateway:
   ```typescript
   import { MeshtasticClient } from "meshtastic-ts";

   const client = new MeshtasticClient({
     baseUrl: "http://meshtastic.local",
   });
   ```

2. List active mesh nodes on the network:
   ```typescript
   const { nodes } = await client.nodes.list();
   console.log(`Discovered ${nodes.length} node(s):`);
   for (const node of nodes) {
     console.log(`- [${node.shortName}] ${node.longName} (${node.id})`);
   }
   ```

3. Broadcast text message to mesh:
   ```typescript
   const result = await client.messages.sendText("^all", "Base station check-in");
   console.log(`Message queued:`, result);
   ```

4. Inspect recent packet logs:
   ```typescript
   const packets = await client.packets.recent();
   console.log(`Recent packets: ${packets.length}`);
   ```

## npm Publishing & Release Pipeline

The SDK is pre-configured for automated npm publishing via **Changesets** and **tsup**:

```bash
# Generate a release changeset
pnpm changeset

# Commit changeset metadata
git commit -am "docs: add release changeset"
```

Merging to `main` triggers `.github/workflows/deploy-npm-publish.yml` which publishes `dist/index.js`, `dist/index.cjs`, and `dist/index.d.ts` directly to the npm registry.

## Verification

```bash
pnpm typecheck
pnpm test
```

## Pitch one-liner

"Type-safe off-grid mesh communications in TypeScript — `meshtastic-ts` connects web apps and node gateways to Meshtastic radios."
