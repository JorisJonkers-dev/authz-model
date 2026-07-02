#!/usr/bin/env node
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generate } from './generate.mjs'

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

async function checkGenerated() {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'authz-model-'))
  const mismatches = []

  try {
    const outputs = await generate({ outputRoot: tempDir })
    for (const output of outputs) {
      const expectedPath = path.join(ROOT_DIR, output.path)
      const actualPath = path.join(tempDir, output.path)
      const [expected, actual] = await Promise.all([
        readFile(expectedPath, 'utf8').catch(() => ''),
        readFile(actualPath, 'utf8'),
      ])
      if (expected !== actual) {
        mismatches.push(output.path)
      }
    }
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }

  if (mismatches.length > 0) {
    throw new Error(`Generated output is stale:\n${mismatches.map((file) => `- ${file}`).join('\n')}`)
  }
}

checkGenerated()
  .then(() => {
    console.log('Generated output is current')
  })
  .catch((error) => {
    console.error(error.message)
    process.exit(1)
  })
