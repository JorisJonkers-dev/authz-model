#!/usr/bin/env node
import Ajv2020 from 'ajv/dist/2020.js'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const DEFAULT_SCHEMA_PATH = path.join(ROOT_DIR, 'schema/authz-model.schema.json')
const DEFAULT_MODEL_PATH = path.join(ROOT_DIR, 'model/personal-stack.sample.json')

export class ValidationError extends Error {
  constructor(errors) {
    super(`Vocabulary validation failed:\n${errors.map((error) => `- ${error}`).join('\n')}`)
    this.name = 'ValidationError'
    this.errors = errors
  }
}

export async function loadJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'))
}

export async function validateModel({ schemaPath = DEFAULT_SCHEMA_PATH, modelPath = DEFAULT_MODEL_PATH } = {}) {
  const [schema, model] = await Promise.all([loadJson(schemaPath), loadJson(modelPath)])
  const ajv = new Ajv2020({ allErrors: true, strict: true })
  const validate = ajv.compile(schema)
  const valid = validate(model)
  const errors = []

  if (!valid) {
    for (const error of validate.errors ?? []) {
      const location = error.instancePath || '/'
      errors.push(`${location} ${error.message}`)
    }
  }

  errors.push(...validateSemanticRules(model))

  if (errors.length > 0) {
    throw new ValidationError(errors)
  }

  return { schema, model }
}

function validateSemanticRules(model) {
  const errors = []
  const roleKeys = new Set(model.roles.map((role) => role.key))
  const permissionKeys = new Set(model.permissions.map((permission) => permission.key))
  const recordIds = new Set()

  for (const [collectionName, records] of Object.entries(recordCollections(model))) {
    collectUnique(records, 'id', collectionName, errors, recordIds)
    collectUnique(records, 'key', collectionName, errors)
  }

  collectUnique(model.roles, 'authorityValue', 'roles', errors)
  collectUnique(model.permissions, 'authorityValue', 'permissions', errors)
  collectUnique(model.claims, 'name', 'claims', errors, undefined, (claim) => `${claim.channel}:${claim.name}`)

  for (const role of model.roles) {
    const expected = `${model.authorityFormats.rolePrefix}${role.key}`
    if (role.authorityValue !== expected) {
      errors.push(`roles.${role.key}.authorityValue must be ${expected}`)
    }
  }

  for (const permission of model.permissions) {
    const expected = `${model.authorityFormats.servicePermissionPrefix}${permission.key}`
    if (permission.authorityValue !== expected) {
      errors.push(`permissions.${permission.key}.authorityValue must be ${expected}`)
    }
  }

  for (const group of model.groups) {
    for (const cause of group.causes) {
      if (cause.type === 'role' && !roleKeys.has(cause.key)) {
        errors.push(`groups.${group.key} references unknown role ${cause.key}`)
      }
      if (cause.type === 'permission' && !permissionKeys.has(cause.key)) {
        errors.push(`groups.${group.key} references unknown permission ${cause.key}`)
      }
    }
  }

  const hostAliases = new Map()
  for (const hostGate of model.hostGates) {
    if (!permissionKeys.has(hostGate.permissionKey)) {
      errors.push(`hostGates.${hostGate.key} references unknown permission ${hostGate.permissionKey}`)
    }
    for (const alias of hostGate.aliases) {
      const normalized = alias.toLowerCase()
      if (alias !== normalized) {
        errors.push(`hostGates.${hostGate.key} alias ${alias} must be lowercase`)
      }
      const existing = hostAliases.get(normalized)
      if (existing) {
        errors.push(`host alias ${alias} is used by both ${existing} and ${hostGate.key}`)
      }
      hostAliases.set(normalized, hostGate.key)
    }
  }

  for (const [collectionName, records] of Object.entries(recordCollections(model))) {
    for (const record of records) {
      if (record.status === 'replaced' && !record.replacementId) {
        errors.push(`${collectionName}.${record.key}.replacementId is required when status is replaced`)
      }
      if (record.replacementId && !recordIds.has(record.replacementId)) {
        errors.push(`${collectionName}.${record.key}.replacementId references unknown record ${record.replacementId}`)
      }
    }
  }

  return errors
}

function recordCollections(model) {
  return {
    roles: model.roles,
    claims: model.claims,
    permissions: model.permissions,
    groups: model.groups,
    hostGates: model.hostGates,
  }
}

function collectUnique(records, field, collectionName, errors, externalSet, selector) {
  const seen = externalSet ?? new Set()
  for (const record of records) {
    const value = selector ? selector(record) : record[field]
    if (seen.has(value)) {
      errors.push(`${collectionName} contains duplicate ${field} ${value}`)
    }
    seen.add(value)
  }
}

function parseArgs(argv) {
  const options = {}
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--schema') {
      options.schemaPath = path.resolve(argv[++index])
    } else if (arg === '--model') {
      options.modelPath = path.resolve(argv[++index])
    }
  }
  return options
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  validateModel(parseArgs(process.argv.slice(2)))
    .then(({ model }) => {
      console.log(`Validated ${model.modelId} ${model.version}`)
    })
    .catch((error) => {
      console.error(error.message)
      process.exit(1)
    })
}
