import { appendFile, readFile } from 'node:fs/promises'

// Keep release channels explicit so a prerelease cannot move the latest tag.
const releaseVersion =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-(alpha|beta|rc)(?:\.(0|[1-9]\d*))?)?$/

export function getReleaseMetadata(packageJson, ref) {
  if (packageJson.name !== 'petit-ui' || packageJson.private) {
    throw new Error('Only the public petit-ui package can be released')
  }

  const match = typeof packageJson.version === 'string' && releaseVersion.exec(packageJson.version)
  if (!match || match[0] !== packageJson.version) {
    throw new Error(
      'Use a stable version or an alpha, beta, or rc prerelease with an optional numeric suffix',
    )
  }

  if (ref !== `refs/tags/petit-ui@${packageJson.version}`) {
    throw new Error('The release tag must match packages/petit-ui/package.json exactly')
  }

  return { version: packageJson.version, distTag: match[4] || 'latest' }
}

if (import.meta.main) {
  const packageJson = JSON.parse(
    await readFile(new URL('../../packages/petit-ui/package.json', import.meta.url), 'utf8'),
  )
  const { version, distTag } = getReleaseMetadata(packageJson, process.env.GITHUB_REF)
  if (!process.env.GITHUB_OUTPUT) {
    throw new Error('GITHUB_OUTPUT is required to pass release metadata to the publish step')
  }
  await appendFile(process.env.GITHUB_OUTPUT, `version=${version}\ndist_tag=${distTag}\n`)
  console.log(`Validated petit-ui@${version} for npm dist-tag ${distTag}`)
}
