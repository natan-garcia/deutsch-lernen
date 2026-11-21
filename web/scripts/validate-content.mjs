// Validates every package in content/packages against the JSON Schemas in content/schema.
import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const contentDir = resolve(import.meta.dirname, '../../content')
const read = (path) => JSON.parse(readFileSync(path, 'utf8'))

const ajv = new Ajv2020({ allErrors: true })
addFormats(ajv)
const validateManifest = ajv.compile(read(join(contentDir, 'schema/manifest.schema.json')))
const validators = { vocabulary: ajv.compile(read(join(contentDir, 'schema/vocabulary.schema.json'))) }

let failed = false
const report = (label, validate, data) => {
  if (validate(data)) return console.log(`ok   ${label}`)
  failed = true
  console.error(`FAIL ${label}`)
  for (const e of validate.errors) console.error(`     ${e.instancePath || '/'} ${e.message}`)
}

const packagesDir = join(contentDir, 'packages')
for (const name of readdirSync(packagesDir)) {
  const dir = join(packagesDir, name)
  const manifest = read(join(dir, 'manifest.json'))
  report(`${name}/manifest.json`, validateManifest, manifest)
  for (const [type, file] of Object.entries(manifest.files ?? {})) {
    report(`${name}/${file}`, validators[type], read(join(dir, file)))
  }
}
process.exit(failed ? 1 : 0)
