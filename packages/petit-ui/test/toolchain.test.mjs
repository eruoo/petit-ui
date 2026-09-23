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
const packageDirectory = fileURLToPath(new URL('../', import.meta.url))
const tokens = postcss.parse(readFileSync(resolve(packageDirectory, 'src/tokens.css'), 'utf8'))
const colorNames = [
  'background',
  'surface',
  'surface-hover',
  'surface-active',
  'foreground',
  'foreground-muted',
  'foreground-disabled',
  'border',
  'border-strong',
  'focus',
  'primary',
  'primary-hover',
  'primary-active',
  'on-primary',
  'success',
  'on-success',
  'warning',
  'on-warning',
  'error',
  'on-error',
  'surface-accent',
  'border-selected',
  'link',
  'foreground-heading',
  'foreground-accent',
  'surface-accent-strong',
  'surface-accent-soft',
  'surface-band',
]
const radiusValues = { sm: '0.75rem', md: '1rem', lg: '1.5rem', full: '9999px' }

const metricValues = {
  'border-width-frame': '0.625rem',
  'border-width-selected': '0.5rem',
  'font-weight-display': '900',
  'font-weight-strong': '800',
  'font-size-heading': '1.875rem',
  'font-size-label': '1.625rem',
  'font-size-action': '2rem',
}

function declarations(rule) {
  return Object.fromEntries(rule.nodes.map(({ prop, value }) => [prop, value]))
}

function compile(input) {
  const output = execFileSync(process.execPath, [cliPath, '--input', input], {
    cwd: packageDirectory,
    encoding: 'utf8',
  })
  const css = postcss.parse(output)
  css.walkAtRules((rule) => {
    assert.ok(
      !['import', 'theme', 'source', 'tailwind'].includes(rule.name),
      `Unexpected uncompiled directive: @${rule.name}`,
    )
  })
  return css
}

function ruleFor(css, selector) {
  const rules = []
  css.walkRules(selector, (rule) => rules.push(rule))
  assert.equal(rules.length, 1, selector)
  return rules[0]
}

function assertProperty(rule, property, expected) {
  const values = []
  rule.walkDecls(property, ({ value }) => values.push(value))
  assert.deepEqual(values, [expected], `${rule.selector}: ${property}`)
}

test('plain CSS exposes complete zero-specificity themes and root-only geometry and type metrics', () => {
  assert.equal(tokens.nodes.length, 3)
  assert.deepEqual(
    tokens.nodes.map(({ type }) => type),
    ['rule', 'rule', 'rule'],
  )
  assert.deepEqual(
    tokens.nodes.map(({ selector }) => selector),
    [":where(:root, [data-theme='light'])", ":where([data-theme='dark'])", ':where(:root)'],
  )
  tokens.walkRules((rule) => {
    assert.ok(rule.nodes.every((node) => node.type === 'decl' && !node.important))
    assert.equal(new Set(rule.nodes.map(({ prop }) => prop)).size, rule.nodes.length)
  })
  for (const rule of tokens.nodes.slice(0, 2)) {
    assert.deepEqual(
      Object.keys(declarations(rule)).sort(),
      colorNames.map((name) => `--petit-color-${name}`).sort(),
    )
    for (const value of Object.values(declarations(rule))) assert.match(value, /^#[0-9a-f]{6}$/)
  }
  assert.deepEqual(
    declarations(tokens.nodes[2]),
    Object.fromEntries([
      ...Object.entries(radiusValues).map(([name, value]) => [`--petit-radius-${name}`, value]),
      ...Object.entries(metricValues).map(([name, value]) => [`--petit-${name}`, value]),
    ]),
  )
})

test('adapter imports only tokens and maps every public variable inline', () => {
  const adapter = postcss.parse(readFileSync(resolve(packageDirectory, 'src/tailwind.css'), 'utf8'))
  assert.equal(adapter.nodes.length, 2)
  const [importRule, theme] = adapter.nodes
  assert.equal(importRule.type, 'atrule')
  assert.equal(importRule.name, 'import')
  assert.equal(importRule.params, "'./tokens.css'")
  assert.equal(theme.type, 'atrule')
  assert.equal(theme.name, 'theme')
  assert.equal(theme.params, 'inline')
  assert.equal(theme.nodes.length, 39)
  assert.ok(theme.nodes.every((node) => node.type === 'decl' && !node.important))
  assert.deepEqual(
    declarations(theme),
    Object.fromEntries([
      ...colorNames.map((name) => [`--color-petit-${name}`, `var(--petit-color-${name})`]),
      ...Object.keys(radiusValues).map((name) => [
        `--radius-petit-${name}`,
        `var(--petit-radius-${name})`,
      ]),
      ...Object.keys(metricValues).map((name) => {
        const parts = name.split('-')
        const level = parts.pop()
        const namespace = name.startsWith('font-size-') ? 'text' : parts.join('-')
        return [`--${namespace}-petit-${level}`, `var(--petit-${name})`]
      }),
    ]),
  )
})

test('real Tailwind entry compiles utilities, state variants, opacity and default theme', () => {
  const css = compile(resolve(packageDirectory, 'test/fixtures/tailwind.css'))
  for (const [selector, property, value] of [
    ['.border-petit-frame', 'border-width', 'var(--petit-border-width-frame)'],
    ['.border-petit-selected', 'border-width', 'var(--petit-border-width-selected)'],
    ['.font-petit-display', 'font-weight', 'var(--petit-font-weight-display)'],
    ['.font-petit-strong', 'font-weight', 'var(--petit-font-weight-strong)'],
    ['.text-petit-heading', 'font-size', 'var(--petit-font-size-heading)'],
    ['.text-petit-label', 'font-size', 'var(--petit-font-size-label)'],
    ['.text-petit-action', 'font-size', 'var(--petit-font-size-action)'],
    ['.text-petit-foreground-accent', 'color', 'var(--petit-color-foreground-accent)'],
    ['.text-petit-foreground-heading', 'color', 'var(--petit-color-foreground-heading)'],
    [
      '.bg-petit-surface-accent-strong',
      'background-color',
      'var(--petit-color-surface-accent-strong)',
    ],
    ['.bg-petit-surface-accent-soft', 'background-color', 'var(--petit-color-surface-accent-soft)'],
    ['.bg-petit-surface-band', 'background-color', 'var(--petit-color-surface-band)'],
    ['.bg-petit-surface-accent', 'background-color', 'var(--petit-color-surface-accent)'],
    ['.border-petit-border-selected', 'border-color', 'var(--petit-color-border-selected)'],
    ['.text-petit-link', 'color', 'var(--petit-color-link)'],
    ['.bg-petit-surface', 'background-color', 'var(--petit-color-surface)'],
    ['.text-petit-foreground', 'color', 'var(--petit-color-foreground)'],
    ['.border-petit-border-strong', 'border-color', 'var(--petit-color-border-strong)'],
    ['.outline-petit-focus', 'outline-color', 'var(--petit-color-focus)'],
    ['.rounded-petit-md', 'border-radius', 'var(--petit-radius-md)'],
    ['.bg-red-500', 'background-color', 'var(--color-red-500)'],
  ])
    assertProperty(ruleFor(css, selector), property, value)

  const opacity = ruleFor(css, '.bg-petit-primary\\/50')
  const opacityValues = []
  opacity.walkDecls('background-color', ({ value }) => opacityValues.push(value))
  assert.deepEqual(opacityValues, [
    'var(--petit-color-primary)',
    'color-mix(in oklab, var(--petit-color-primary) 50%, transparent)',
  ])

  for (const [variant, utility, property, token] of [
    ['hover', 'bg-petit-primary-hover', 'background-color', 'primary-hover'],
    ['active', 'bg-petit-primary-active', 'background-color', 'primary-active'],
    ['focus-visible', 'outline-petit-focus', 'outline-color', 'focus'],
    ['disabled', 'text-petit-foreground-disabled', 'color', 'foreground-disabled'],
  ]) {
    const rule = ruleFor(css, `.${variant}\\:${utility}:${variant}`)
    assertProperty(rule, property, `var(--petit-color-${token})`)
  }
  const dark = ruleFor(css, '.dark\\:bg-red-500')
  assert.equal(dark.parent.name, 'media')
  assert.equal(dark.parent.params, '(prefers-color-scheme: dark)')
  const defaultColors = []
  css.walkDecls('--color-red-500', ({ value }) => defaultColors.push(value))
  assert.equal(defaultColors.length, 1)
  for (const rule of tokens.nodes)
    assert.deepEqual(declarations(ruleFor(css, rule.selector)), declarations(rule))
})

test('adapter alone includes default tokens without importing Tailwind or Preflight', () => {
  const css = compile(resolve(packageDirectory, 'src/tailwind.css'))
  for (const rule of tokens.nodes)
    assert.deepEqual(declarations(ruleFor(css, rule.selector)), declarations(rule))
  css.walkDecls(({ prop }) => assert.ok(prop.startsWith('--petit-')))
})

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/../g)
    .map((channel) => {
      const value = Number.parseInt(channel, 16) / 255
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
    })
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

test('actual light and dark declarations satisfy all specified default contrast pairs', () => {
  const surfaces = ['background', 'surface', 'surface-hover', 'surface-active']
  const pairs = []
  const add = (foregrounds, backgrounds, minimum) => {
    for (const foreground of foregrounds)
      for (const background of backgrounds) pairs.push([foreground, background, minimum])
  }
  add(['foreground', 'foreground-muted'], surfaces, 4.5)
  add(
    ['foreground'],
    ['surface-accent', 'surface-accent-strong', 'surface-accent-soft', 'surface-band'],
    4.5,
  )
  add(
    ['foreground-heading'],
    ['background', 'surface', 'surface-accent', 'surface-accent-soft', 'surface-band'],
    4.5,
  )
  add(['link', 'success', 'warning', 'error'], surfaces.slice(0, 2), 4.5)
  add(['on-primary'], ['primary', 'primary-hover', 'primary-active'], 4.5)
  for (const status of ['success', 'warning', 'error']) add([`on-${status}`], [status], 4.5)
  add(['border-strong', 'focus'], [...surfaces, 'surface-accent'], 3)
  add(['border-selected'], ['background', 'surface'], 3)
  add(['foreground-accent'], ['background', 'surface'], 3)
  assert.equal(pairs.length, 45)
  for (const rule of tokens.nodes.slice(0, 2)) {
    const values = declarations(rule)
    const themePairs =
      rule === tokens.nodes[0] ? [...pairs, ['border-selected', 'border', 3]] : pairs
    for (const [foreground, background, minimum] of themePairs) {
      const a = luminance(values[`--petit-color-${foreground}`])
      const b = luminance(values[`--petit-color-${background}`])
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
      assert.ok(
        ratio >= minimum,
        `${rule.selector}: ${foreground}/${background} = ${ratio} < ${minimum}`,
      )
    }
  }
})

test('package exposes only the public CSS entries and metadata', () => {
  const pkg = JSON.parse(readFileSync(resolve(packageDirectory, 'package.json'), 'utf8'))
  assert.deepEqual(pkg.exports, {
    './tokens.css': './src/tokens.css',
    './tailwind.css': './src/tailwind.css',
    './package.json': './package.json',
  })
  for (const [entry, target] of Object.entries(pkg.exports)) {
    assert.equal(require.resolve(`petit-ui/${entry.slice(2)}`), resolve(packageDirectory, target))
  }
  for (const entry of ['petit-ui', 'petit-ui/src/tokens.css']) {
    assert.throws(() => require.resolve(entry), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' })
  }
  assert.deepEqual(pkg.files, ['src/tokens.css', 'src/tailwind.css'])
  assert.deepEqual(pkg.sideEffects, ['**/*.css'])
  assert.equal(Object.keys(pkg.dependencies ?? {}).length, 0)
  assert.deepEqual(pkg.peerDependencies, { tailwindcss: '^4.0.0' })
  assert.deepEqual(pkg.peerDependenciesMeta, { tailwindcss: { optional: true } })
})
