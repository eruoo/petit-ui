import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getReleaseMetadata } from './release-metadata.mjs'

test('stable and prerelease versions select the intended npm dist-tag', () => {
  for (const [version, distTag] of [
    ['1.0.0', 'latest'],
    ['0.0.0-alpha', 'alpha'],
    ['0.1.0-alpha.0', 'alpha'],
    ['0.1.0-beta.2', 'beta'],
    ['1.0.0-rc.1', 'rc'],
  ]) {
    assert.deepEqual(
      getReleaseMetadata({ name: 'petit-ui', version }, `refs/tags/petit-ui@${version}`),
      { version, distTag },
    )
  }
})

test('rejects tags that do not identify the exact package version', () => {
  const packageJson = { name: 'petit-ui', version: '0.1.0-alpha.0' }
  for (const ref of [
    'refs/heads/main',
    'refs/tags/v0.1.0-alpha.0',
    'refs/tags/petit-ui@0.1.0',
    undefined,
  ]) {
    assert.throws(() => getReleaseMetadata(packageJson, ref), /release tag must match/)
  }
})

test('rejects other workspace packages and private packages', () => {
  for (const packageJson of [
    { name: 'petit-ui-monorepo', version: '1.0.0', private: true },
    { name: 'petit-ui-site', version: '1.0.0' },
    { name: 'petit-ui', version: '1.0.0', private: true },
  ]) {
    assert.throws(
      () => getReleaseMetadata(packageJson, 'refs/tags/petit-ui@1.0.0'),
      /Only the public petit-ui/,
    )
  }
})

test('rejects malformed versions and unconfigured prerelease channels', () => {
  for (const version of [
    '01.0.0',
    '1.0',
    'v1.0.0',
    '1.0.0-canary.1',
    '1.0.0-alpha.01',
    '1.0.0-alpha.1.2',
    '1.0.0+build',
    '1.0.0\n',
    undefined,
  ]) {
    assert.throws(
      () => getReleaseMetadata({ name: 'petit-ui', version }, `refs/tags/petit-ui@${version}`),
      /Use a stable version/,
    )
  }
})
