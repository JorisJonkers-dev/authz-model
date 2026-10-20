# authz-model

> [!WARNING]
> **Deprecated.** authz-model is legacy auth-api's vocabulary: `ROLE_` and
> `SERVICE_` authorities and host gates. Nothing in the estate depends on it any
> more, and the repository will be archived.
>
> Read who is calling from identity's
> [Principal contract](https://github.com/JorisJonkers-dev/identity/tree/main/contract/principal)
> through your language's adapter, and check the App Roles deploy-kit generates
> for your Client:
>
> | language   | adapter                                                                                     |
> | ---------- | ------------------------------------------------------------------------------------------- |
> | Go         | `github.com/JorisJonkers-dev/go-commons/identity`                                           |
> | Kotlin     | `kotlin-spring-commons`, package `com.jorisjonkers.personalstack.common.identity.principal` |
> | TypeScript | `@jorisjonkers-dev/principal` in vue-web-commons                                            |
> | Python     | `jorisjonkers_commons.identity` in python-commons                                           |
> | Rust       | `jorisjonkers_commons::identity` in rust-commons                                            |
>
> Every exported constant and type is marked deprecated with the same pointer.

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
