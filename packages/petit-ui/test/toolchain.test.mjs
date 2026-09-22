import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'

const require = createRequire(import.meta.url)
const cliPackagePath = require.resolve('@tailwindcss/cli/package.json')
const cliPackage = JSON.parse(readFileSync(cliPackagePath, 'utf8'))
const cliPath = resolve(dirname(cliPackagePath), cliPackage.bin.tailwindcss)
const fixturePath = fileURLToPath(new URL('./fixtures/tailwind.css', import.meta.url))
const packageDirectory = fileURLToPath(new URL('../', import.meta.url))

test('Tailwind CLI compiles CSS variables and inline theme aliases', () => {
  const output = execFileSync(process.execPath, [cliPath, '--input', fixturePath], {
    cwd: packageDirectory,
    encoding: 'utf8',
  })
  const css = postcss.parse(output)

  const tokenValues = []
  css.walkDecls('--petit-fixture-color', (declaration) => {
    tokenValues.push(declaration.value)
  })
  assert.deepEqual(tokenValues, ['#123456'])

  const backgroundValues = []
  css.walkRules('.bg-petit-fixture', (rule) => {
    rule.walkDecls('background-color', (declaration) => {
      backgroundValues.push(declaration.value)
    })
  })
  assert.deepEqual(backgroundValues, ['var(--petit-fixture-color)'])

  css.walkAtRules((rule) => {
    assert.ok(
      !['import', 'theme', 'source', 'tailwind'].includes(rule.name),
      `Unexpected uncompiled directive: @${rule.name}`,
    )
  })
})
