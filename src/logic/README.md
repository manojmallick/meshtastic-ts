# src/logic

This is where the wrapped API's actual endpoints live — `users.ts` and `repos.ts` are the
example (wrapping GitHub's public REST API). Add a new file per resource, then wire it into
`ApiClient` in `src/index.ts`. `client.ts`/`errors.ts` (retry, auth, error normalization) are
generic HTTP mechanics and don't need to change per API.
