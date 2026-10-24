# meshtastic-ts

An unofficial TypeScript client for HTTP gateways that expose Meshtastic node, message, and packet endpoints. It is not affiliated with or endorsed by Meshtastic.

This prototype currently uses HTTP only. It does not connect directly to radios over serial, Bluetooth LE, or MQTT. Your gateway must provide JSON endpoints at `/nodes`, `/messages`, and `/packets` with the response shapes represented by the exported TypeScript types.

## Requirements

- Node.js with the built-in `fetch` API
- A compatible HTTP gateway

## Install and build

```bash
pnpm install
pnpm build
```

## Usage

After building, import the client from the generated `dist` output:

```ts
import { MeshtasticClient } from "./dist/index.js";

const client = new MeshtasticClient({
  baseUrl: process.env.MESH_GATEWAY_URL ?? "http://localhost:8080",
  token: process.env.MESH_GATEWAY_TOKEN,
});

const { nodes } = await client.nodes.list();
console.log(nodes);

await client.messages.sendText("^all", "Gateway online");

const { packets } = await client.packets.recent();
console.log(packets);
```

`token` is optional and, when supplied, is sent as a Bearer token. The client retries server errors up to two times by default; configure `maxRetries` to change that behavior. Do not commit real gateway credentials.

## Development

```bash
pnpm typecheck
pnpm test
pnpm build
```

## License

Original project content is available under the [PolyForm Noncommercial License 1.0.0](LICENSE). For uses outside the license permissions, contact the rights holder for separate permission. Third-party dependencies remain under their respective licenses.
