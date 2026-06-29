# authz-model

Shared authorization vocabulary constants for JorisJonkers-dev services and
clients.

## What It Is

`authz-model` publishes generated TypeScript and Kotlin constants from the
repository authorization vocabulary. Consumers use the packages instead of
copying role, permission, or claim strings between repositories.

## Local Use

```bash
npm ci
npm run validate
npm run check:generated
./gradlew check
```

## Packages

- npm: `@jorisjonkers-dev/authz-model`
- Maven: `dev.jorisjonkers:authz-model`

Generated Kotlin sources use package `dev.jorisjonkers.authz.model`.

## Links

- [Organization profile](https://github.com/JorisJonkers-dev)
- [Security policy](https://github.com/JorisJonkers-dev/.github/security/policy)
- [License](./LICENSE)

Copyright (c) Joris Jonkers. Source available for viewing only; use, copying,
modification, redistribution, deployment, or reuse is not licensed. See
[LICENSE](./LICENSE).
